// Camera Demo JavaScript
class CameraDemo {
    constructor() {
        this.isLoading = false;
        this.init();
    }

    init() {
        console.log('Camera Demo initialized');
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Listen for messages from React Native
        document.addEventListener('message', (event) => {
            this.handleNativeMessage(event);
        });

        // Also listen for window messages (alternative method)
        window.addEventListener('message', (event) => {
            this.handleNativeMessage(event);
        });

        // Handle page load
        document.addEventListener('DOMContentLoaded', () => {
            console.log('DOM loaded, Camera Demo ready');
        });
    }

    handleNativeMessage(event) {
        try {
            const data = JSON.parse(event.data);
            console.log('Received message from React Native:', data);

            switch (data.type) {
                case 'IMAGE_RESULT':
                    this.showResult(data.imageUri, data.source);
                    break;
                case 'ERROR':
                    this.showError(data.message);
                    break;
                default:
                    console.log('Unknown message type:', data.type);
            }
        } catch (error) {
            console.error('Error parsing message from React Native:', error);
        }
    }

    // Function to take picture
    takePicture() {
        if (this.isLoading) {
            console.log('Already processing...');
            return;
        }

        console.log('Taking picture...');
        this.setLoading(true);
        
        // Send message to React Native
        this.sendMessageToNative({
            type: 'TAKE_PICTURE'
        });
    }

    // Function to select image from gallery
    selectImage() {
        if (this.isLoading) {
            console.log('Already processing...');
            return;
        }

        console.log('Selecting image...');
        this.setLoading(true);
        
        // Send message to React Native
        this.sendMessageToNative({
            type: 'SELECT_IMAGE'
        });
    }

    // Send message to React Native
    sendMessageToNative(message) {
        try {
            if (window.ReactNativeWebView) {
                window.ReactNativeWebView.postMessage(JSON.stringify(message));
            } else {
                console.warn('ReactNativeWebView not available');
                this.setLoading(false);
                this.showError('Không thể kết nối với ứng dụng');
            }
        } catch (error) {
            console.error('Error sending message to React Native:', error);
            this.setLoading(false);
            this.showError('Lỗi khi gửi thông điệp');
        }
    }

    // Show result with image
    showResult(imageUri, source) {
        this.setLoading(false);
        
        const resultDiv = document.getElementById('result');
        const resultContent = document.getElementById('resultContent');
        
        if (!resultDiv || !resultContent) {
            console.error('Result elements not found');
            return;
        }

        let sourceText = '';
        let sourceIcon = '';
        
        if (source === 'camera') {
            sourceText = 'Ảnh đã chụp';
            sourceIcon = '📷';
        } else if (source === 'gallery') {
            sourceText = 'Ảnh đã chọn';
            sourceIcon = '🖼️';
        }

        resultContent.innerHTML = `
            <div class="result-header">
                <span class="source-icon">${sourceIcon}</span>
                <span class="source-text">${sourceText}</span>
            </div>
            <div class="image-container">
                <img src="${imageUri}" alt="${sourceText}" onload="this.style.opacity=1" onerror="this.style.display='none'">
            </div>
            <div class="image-info">
                <p><strong>Đường dẫn:</strong> ${imageUri}</p>
                <p><strong>Nguồn:</strong> ${source === 'camera' ? 'Camera' : 'Thư viện ảnh'}</p>
            </div>
        `;
        
        resultDiv.classList.add('show');
        
        // Scroll to result
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Show error message
    showError(message) {
        this.setLoading(false);
        
        const resultDiv = document.getElementById('result');
        const resultContent = document.getElementById('resultContent');
        
        if (!resultDiv || !resultContent) {
            console.error('Result elements not found');
            return;
        }

        resultContent.innerHTML = `
            <div class="error-message">
                <span class="error-icon">❌</span>
                <span class="error-text">${message}</span>
            </div>
        `;
        
        resultDiv.classList.add('show');
    }

    // Set loading state
    setLoading(loading) {
        this.isLoading = loading;
        const buttons = document.querySelectorAll('.button');
        
        buttons.forEach(button => {
            if (loading) {
                button.disabled = true;
                button.style.opacity = '0.6';
                button.style.cursor = 'not-allowed';
                
                // Add loading spinner
                const text = button.querySelector('.text');
                if (text) {
                    text.innerHTML = '<span class="loading"></span> Đang xử lý...';
                }
            } else {
                button.disabled = false;
                button.style.opacity = '1';
                button.style.cursor = 'pointer';
                
                // Restore original text
                const text = button.querySelector('.text');
                if (text) {
                    if (button.classList.contains('primary')) {
                        text.innerHTML = 'Chụp ảnh';
                    } else if (button.classList.contains('secondary')) {
                        text.innerHTML = 'Chọn ảnh';
                    }
                }
            }
        });
    }
}

// Global functions for onclick handlers
function takePicture() {
    if (window.cameraDemo) {
        window.cameraDemo.takePicture();
    }
}

function selectImage() {
    if (window.cameraDemo) {
        window.cameraDemo.selectImage();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.cameraDemo = new CameraDemo();
});

// Fallback initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.cameraDemo = new CameraDemo();
    });
} else {
    window.cameraDemo = new CameraDemo();
}
