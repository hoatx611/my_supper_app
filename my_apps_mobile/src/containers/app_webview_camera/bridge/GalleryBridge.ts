import { NativeModules, NativeEventEmitter, Alert, Platform } from 'react-native';
import { launchImageLibrary, ImagePickerResponse, MediaType } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

interface GalleryBridgeInterface {
  selectImage: () => Promise<string>;
  selectMultipleImages: () => Promise<string[]>;
  onImageSelected: (callback: (imageUri: string) => void) => void;
  onImagesSelected: (callback: (imageUris: string[]) => void) => void;
  removeImageListener: () => void;
  removeImagesListener: () => void;
}

class GalleryBridge implements GalleryBridgeInterface {
  private eventEmitter: NativeEventEmitter | null = null;
  private imageListener: any = null;
  private imagesListener: any = null;

  constructor() {
    // Initialize event emitter if native module exists
    if (NativeModules.GalleryModule) {
      this.eventEmitter = new NativeEventEmitter(NativeModules.GalleryModule);
    }
  }

  /**
   * Request storage permission
   */
  private async requestStoragePermission(): Promise<boolean> {
    try {
      let permission;
      if (Platform.OS === 'ios') {
        permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
      } else {
        // For Android 13+ (API 33+), use READ_MEDIA_IMAGES
        if (Platform.Version >= 33) {
          permission = PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
        } else {
          permission = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
        }
      }

      const result = await request(permission);
      
      if (result === RESULTS.GRANTED) {
        console.log('Storage permission granted');
        return true;
      } else {
        console.log('Storage permission denied:', result);
        Alert.alert(
          'Permission Required',
          'Storage permission is required to access photos. Please enable it in settings.',
          [{ text: 'OK' }]
        );
        return false;
      }
    } catch (error) {
      console.error('Error requesting storage permission:', error);
      return false;
    }
  }

  /**
   * Select a single image from gallery
   * @returns Promise<string> - Base64 image data
   */
  async selectImage(): Promise<string> {
    // Request storage permission first
    const hasPermission = await this.requestStoragePermission();
    if (!hasPermission) {
      throw new Error('Storage permission denied');
    }

    return new Promise((resolve, reject) => {
      const options = {
        mediaType: 'photo' as MediaType,
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
        quality: 0.8,
      };

      launchImageLibrary(options, async (response: ImagePickerResponse) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
          reject(new Error('User cancelled'));
        } else if (response.errorMessage) {
          console.log('ImagePicker Error: ', response.errorMessage);
          reject(new Error(response.errorMessage));
        } else if (response.assets && response.assets[0]) {
          const imageUri = response.assets[0].uri;
          if (imageUri) {
            console.log('Selected image URI:', imageUri);
            try {
              // Convert image to base64 for WebView
              const base64 = await RNFS.readFile(imageUri, 'base64');
              const base64ImageUri = `data:image/jpeg;base64,${base64}`;
              console.log('Converted to base64, length:', base64.length);
              resolve(base64ImageUri);
            } catch (error) {
              console.error('Error converting image to base64:', error);
              reject(error);
            }
          } else {
            reject(new Error('No image URI found'));
          }
        } else {
          reject(new Error('No image selected'));
        }
      });
    });
  }

  /**
   * Select multiple images from gallery
   * @returns Promise<string[]> - Array of image URIs
   */
  async selectMultipleImages(): Promise<string[]> {
    try {
      if (!NativeModules.GalleryModule) {
        throw new Error('Gallery module not available');
      }
      
      const imageUris = await NativeModules.GalleryModule.selectMultipleImages();
      return imageUris;
    } catch (error) {
      console.error('Error selecting images:', error);
      throw error;
    }
  }

  /**
   * Listen for single image selected events
   * @param callback - Function to call when image is selected
   */
  onImageSelected(callback: (imageUri: string) => void): void {
    if (!this.eventEmitter) {
      console.warn('Event emitter not available');
      return;
    }

    this.imageListener = this.eventEmitter.addListener(
      'onImageSelected',
      (data: { imageUri: string }) => {
        callback(data.imageUri);
      }
    );
  }

  /**
   * Listen for multiple images selected events
   * @param callback - Function to call when images are selected
   */
  onImagesSelected(callback: (imageUris: string[]) => void): void {
    if (!this.eventEmitter) {
      console.warn('Event emitter not available');
      return;
    }

    this.imagesListener = this.eventEmitter.addListener(
      'onImagesSelected',
      (data: { imageUris: string[] }) => {
        callback(data.imageUris);
      }
    );
  }

  /**
   * Remove single image selected listener
   */
  removeImageListener(): void {
    if (this.imageListener) {
      this.imageListener.remove();
      this.imageListener = null;
    }
  }

  /**
   * Remove multiple images selected listener
   */
  removeImagesListener(): void {
    if (this.imagesListener) {
      this.imagesListener.remove();
      this.imagesListener = null;
    }
  }

  /**
   * Send message to WebView
   * @param message - Message to send
   */
  sendMessageToWebView(message: any): void {
    if (NativeModules.WebViewBridge) {
      NativeModules.WebViewBridge.sendMessage(JSON.stringify(message));
    }
  }
}

export const galleryBridge = new GalleryBridge();
export default galleryBridge;
