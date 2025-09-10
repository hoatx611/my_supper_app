import React, { useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { cameraBridge } from '../bridge/CameraBridge';
import { galleryBridge } from '../bridge/GalleryBridge';

const { width, height } = Dimensions.get('window');

export const WebViewScreen: React.FC = () => {
  const webViewRef = useRef<WebView>(null);

  // HTML content for the demo
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Camera Demo</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                margin: 0;
                padding: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
            
            .container {
                background: white;
                border-radius: 20px;
                padding: 30px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                text-align: center;
                max-width: 400px;
                width: 100%;
            }
            
            h1 {
                color: #333;
                margin-bottom: 30px;
                font-size: 24px;
            }
            
            .button {
                background: #007AFF;
                color: white;
                border: none;
                padding: 15px 30px;
                border-radius: 10px;
                font-size: 16px;
                font-weight: 600;
                margin: 10px;
                cursor: pointer;
                transition: all 0.3s ease;
                width: 200px;
            }
            
            .button:hover {
                background: #0056CC;
                transform: translateY(-2px);
            }
            
            .button:active {
                transform: translateY(0);
            }
            
            .button.secondary {
                background: #34C759;
            }
            
            .button.secondary:hover {
                background: #28A745;
            }
            
            .result {
                margin-top: 20px;
                padding: 15px;
                background: #f8f9fa;
                border-radius: 10px;
                border-left: 4px solid #007AFF;
                display: none;
            }
            
            .result.show {
                display: block;
            }
            
            .result img {
                max-width: 100%;
                border-radius: 10px;
                margin-top: 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>📸 Camera Demo</h1>
            <button class="button" onclick="takePicture()">📷 Chụp ảnh</button>
            <button class="button secondary" onclick="selectImage()">🖼️ Chọn ảnh</button>
            <div id="result" class="result">
                <h3>Kết quả:</h3>
                <div id="resultContent"></div>
            </div>
        </div>
        
        <script>
            // Function to take picture
            function takePicture() {
                console.log('Taking picture...');
                window.ReactNativeWebView.postMessage(JSON.stringify({
                    type: 'TAKE_PICTURE'
                }));
            }
            
            // Function to select image from gallery
            function selectImage() {
                console.log('Selecting image...');
                window.ReactNativeWebView.postMessage(JSON.stringify({
                    type: 'SELECT_IMAGE'
                }));
            }
            
            // Function to show result
            function showResult(imageUri, type) {
                const resultDiv = document.getElementById('result');
                const resultContent = document.getElementById('resultContent');
                
                if (type === 'camera') {
                    resultContent.innerHTML = '<p><strong>Ảnh đã chụp:</strong></p><img src="' + imageUri + '" alt="Captured Image">';
                } else if (type === 'gallery') {
                    resultContent.innerHTML = '<p><strong>Ảnh đã chọn:</strong></p><img src="' + imageUri + '" alt="Selected Image">';
                }
                
                resultDiv.classList.add('show');
            }
            
            // Listen for messages from React Native
            document.addEventListener('message', function(event) {
                try {
                    const data = JSON.parse(event.data);
                    if (data.type === 'IMAGE_RESULT') {
                        showResult(data.imageUri, data.source);
                    }
                } catch (error) {
                    console.error('Error parsing message:', error);
                }
            });
            
            // Also listen for window messages (alternative method)
            window.addEventListener('message', function(event) {
                try {
                    const data = JSON.parse(event.data);
                    if (data.type === 'IMAGE_RESULT') {
                        showResult(data.imageUri, data.source);
                    }
                } catch (error) {
                    console.error('Error parsing window message:', error);
                }
            });
        </script>
    </body>
    </html>
  `;

  const handleWebViewMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      
      switch (data.type) {
        case 'TAKE_PICTURE':
          handleTakePicture();
          break;
        case 'SELECT_IMAGE':
          handleSelectImage();
          break;
        default:
          console.log('Unknown message type:', data.type);
      }
    } catch (error) {
      console.error('Error parsing WebView message:', error);
    }
  };

  const handleTakePicture = async () => {
    try {
      const imageUri = await cameraBridge.takePicture();
      
      // Send result back to WebView
      const message = JSON.stringify({
        type: 'IMAGE_RESULT',
        imageUri: imageUri,
        source: 'camera'
      });
      
      webViewRef.current?.postMessage(message);
    } catch (error) {
      console.error('Error taking picture:', error);
      if (error.message === 'User cancelled') {
        // User cancelled, don't show error
        return;
      }
      Alert.alert('Lỗi', 'Không thể chụp ảnh. Vui lòng thử lại.');
    }
  };

  const handleSelectImage = async () => {
    try {
      const imageUri = await galleryBridge.selectImage();
      
      // Send result back to WebView
      const message = JSON.stringify({
        type: 'IMAGE_RESULT',
        imageUri: imageUri,
        source: 'gallery'
      });
      
      webViewRef.current?.postMessage(message);
    } catch (error) {
      console.error('Error selecting image:', error);
      if (error.message === 'User cancelled') {
        // User cancelled, don't show error
        return;
      }
      Alert.alert('Lỗi', 'Không thể chọn ảnh. Vui lòng thử lại.');
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ html: htmlContent }}
        style={styles.webview}
        onMessage={handleWebViewMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  webview: {
    flex: 1,
    width: width,
    height: height,
  },
});
