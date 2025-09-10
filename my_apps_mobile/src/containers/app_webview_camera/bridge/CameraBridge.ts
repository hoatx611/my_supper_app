import { NativeModules, NativeEventEmitter, Alert, Platform } from 'react-native';
import { launchCamera, ImagePickerResponse, MediaType } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

interface CameraBridgeInterface {
  takePicture: () => Promise<string>;
  onPictureTaken: (callback: (imageUri: string) => void) => void;
  removePictureListener: () => void;
}

class CameraBridge implements CameraBridgeInterface {
  private eventEmitter: NativeEventEmitter | null = null;
  private pictureListener: any = null;

  constructor() {
    // Initialize event emitter if native module exists
    if (NativeModules.CameraModule) {
      this.eventEmitter = new NativeEventEmitter(NativeModules.CameraModule);
    }
  }

  /**
   * Request camera permission
   */
  private async requestCameraPermission(): Promise<boolean> {
    try {
      const permission = Platform.OS === 'ios' 
        ? PERMISSIONS.IOS.CAMERA 
        : PERMISSIONS.ANDROID.CAMERA;

      const result = await request(permission);
      
      if (result === RESULTS.GRANTED) {
        console.log('Camera permission granted');
        return true;
      } else {
        console.log('Camera permission denied:', result);
        Alert.alert(
          'Permission Required',
          'Camera permission is required to take photos. Please enable it in settings.',
          [{ text: 'OK' }]
        );
        return false;
      }
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      return false;
    }
  }

  /**
   * Take a picture using device camera
   * @returns Promise<string> - Base64 image data
   */
  async takePicture(): Promise<string> {
    // Request camera permission first
    const hasPermission = await this.requestCameraPermission();
    if (!hasPermission) {
      throw new Error('Camera permission denied');
    }

    return new Promise((resolve, reject) => {
      const options = {
        mediaType: 'photo' as MediaType,
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
        quality: 0.8,
        saveToPhotos: true,
      };

      launchCamera(options, async (response: ImagePickerResponse) => {
        if (response.didCancel) {
          console.log('User cancelled camera');
          reject(new Error('User cancelled'));
        } else if (response.errorMessage) {
          console.log('Camera Error: ', response.errorMessage);
          reject(new Error(response.errorMessage));
        } else if (response.assets && response.assets[0]) {
          const imageUri = response.assets[0].uri;
          if (imageUri) {
            console.log('Captured image URI:', imageUri);
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
          reject(new Error('No image captured'));
        }
      });
    });
  }

  /**
   * Listen for picture taken events
   * @param callback - Function to call when picture is taken
   */
  onPictureTaken(callback: (imageUri: string) => void): void {
    if (!this.eventEmitter) {
      console.warn('Event emitter not available');
      return;
    }

    this.pictureListener = this.eventEmitter.addListener(
      'onPictureTaken',
      (data: { imageUri: string }) => {
        callback(data.imageUri);
      }
    );
  }

  /**
   * Remove picture taken listener
   */
  removePictureListener(): void {
    if (this.pictureListener) {
      this.pictureListener.remove();
      this.pictureListener = null;
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

export const cameraBridge = new CameraBridge();
export default cameraBridge;
