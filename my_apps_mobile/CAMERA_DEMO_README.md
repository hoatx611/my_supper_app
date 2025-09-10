# 📸 Camera Demo - Mini App Container

## 🎯 Tính năng

### ✅ **Đã hoàn thành:**
1. **Navigation System** - Bottom tab navigation với 4 tabs
2. **Camera Bridge** - Chụp ảnh thực sự từ camera thiết bị
3. **Gallery Bridge** - Chọn ảnh từ thư viện ảnh thiết bị
4. **WebView Integration** - Giao diện HTML/JS/CSS đẹp mắt
5. **Real Image Picker** - Sử dụng `react-native-image-picker`

## 📱 **Cách sử dụng:**

### 1. **Mở ứng dụng**
- Chạy `npm run android` để build và cài đặt
- Mở ứng dụng trên thiết bị Android

### 2. **Truy cập Camera Demo**
- Nhấn vào tab **📷 Camera** ở bottom navigation
- Sẽ hiển thị WebView với giao diện đẹp

### 3. **Chụp ảnh**
- Nhấn nút **"📷 Chụp ảnh"**
- Ứng dụng sẽ mở camera thiết bị
- Chụp ảnh và nhấn "Done"
- Ảnh sẽ hiển thị trong WebView

### 4. **Chọn ảnh từ thư viện**
- Nhấn nút **"🖼️ Chọn ảnh"**
- Ứng dụng sẽ mở thư viện ảnh
- Chọn ảnh và nhấn "Done"
- Ảnh sẽ hiển thị trong WebView

## 🔧 **Technical Details:**

### **Bridge Architecture:**
```
WebView (HTML/JS) ↔ React Native Bridge ↔ Native Image Picker
```

### **Files Structure:**
```
src/containers/app_webview_camera/
├── bridge/
│   ├── CameraBridge.ts      # Camera functionality
│   └── GalleryBridge.ts     # Gallery functionality
├── screens/
│   └── WebViewScreen.tsx    # Main WebView screen
└── assets/
    ├── demo_cam.html        # HTML structure
    ├── demo_cam.css         # Styling
    └── demo_cam.js          # JavaScript logic
```

### **Dependencies:**
- `react-native-image-picker` - Native image picker
- `react-native-webview` - WebView component
- `react-native-fs` - File system access for base64 conversion
- `react-native-permissions` - Runtime permission handling
- `@react-navigation/native` - Navigation (optional)

### **Permissions:**
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
<uses-permission android:name="android.permission.READ_INTERNAL_STORAGE" />
```

## 🚀 **Features:**

### **Camera:**
- ✅ Mở camera thiết bị
- ✅ Chụp ảnh với chất lượng cao
- ✅ Lưu ảnh vào thư viện
- ✅ Hiển thị ảnh trong WebView

### **Gallery:**
- ✅ Mở thư viện ảnh
- ✅ Chọn ảnh từ thiết bị
- ✅ Hiển thị ảnh đã chọn
- ✅ Hỗ trợ cancel operation

### **WebView:**
- ✅ Giao diện đẹp với gradient
- ✅ Responsive design
- ✅ Loading states
- ✅ Error handling
- ✅ Bridge communication

## 🎨 **UI/UX:**
- Modern gradient background
- Smooth animations
- Loading indicators
- Error messages
- Responsive buttons
- Professional styling

## 🔄 **Workflow:**
1. User clicks button in WebView
2. JavaScript sends message to React Native
3. React Native opens native image picker
4. User selects/captures image
5. Image URI returned to React Native
6. **React Native converts image to base64** (for WebView compatibility)
7. React Native sends base64 result back to WebView
8. WebView displays the image using base64 data URI

## 🔧 **Technical Fixes:**

### **Fix 1: WebView Image Display**
**Problem:** WebView cannot access `file://` URIs
- Original URI: `file:///data/user/0/com.my_apps_mobile/cache/...`
- WebView security restrictions prevent access to local files

**Solution:** Convert to Base64
- Read image file using `react-native-fs`
- Convert to base64 string
- Create data URI: `data:image/jpeg;base64,{base64String}`
- WebView can display base64 images directly

### **Fix 2: Runtime Permissions**
**Problem:** `react-native-image-picker` requires runtime permissions
- Error: "This library does not require Manifest.permission.CAMERA, if you add this permission in manifest then you have to obtain the same"

**Solution:** Request permissions before use
- Use `react-native-permissions` to request camera permission
- Use `react-native-permissions` to request storage permission
- Handle permission denied cases gracefully
- Show user-friendly error messages

## 📝 **Notes:**
- Ảnh được lưu với chất lượng 80%
- Kích thước tối đa: 2000x2000px
- Hỗ trợ cancel operation
- Error handling cho tất cả cases
- Cross-platform compatible

## 🐛 **Troubleshooting:**
- Nếu không mở được camera: Kiểm tra permissions
- Nếu không hiển thị ảnh: Kiểm tra file path
- Nếu WebView không load: Kiểm tra HTML content
- Nếu bridge không hoạt động: Kiểm tra message format
