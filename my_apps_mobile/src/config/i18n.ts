import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      // Common
      common: {
        ok: 'OK',
        cancel: 'Cancel',
        save: 'Save',
        delete: 'Delete',
        edit: 'Edit',
        back: 'Back',
        next: 'Next',
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        retry: 'Retry',
      },
      
      // Navigation
      navigation: {
        home: 'Home',
        profile: 'Profile',
        settings: 'Settings',
        accounts: 'Accounts',
        hello: 'Hello',
      },
      
      // Auth
      auth: {
        login: 'Login',
        logout: 'Logout',
        register: 'Register',
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        forgotPassword: 'Forgot Password?',
        loginSuccess: 'Login successful',
        loginError: 'Login failed',
      },
      
      // Hello App
      hello: {
        title: 'Hello World',
        message: 'Welcome to My Super App!',
        buttonText: 'Say Hello',
      },
      
      // Accounts App
      accounts: {
        title: 'Accounts',
        addAccount: 'Add Account',
        accountList: 'Account List',
        noAccounts: 'No accounts found',
      },
    },
  },
  
  vi: {
    translation: {
      // Common
      common: {
        ok: 'OK',
        cancel: 'Hủy',
        save: 'Lưu',
        delete: 'Xóa',
        edit: 'Sửa',
        back: 'Quay lại',
        next: 'Tiếp theo',
        loading: 'Đang tải...',
        error: 'Lỗi',
        success: 'Thành công',
        retry: 'Thử lại',
      },
      
      // Navigation
      navigation: {
        home: 'Trang chủ',
        profile: 'Hồ sơ',
        settings: 'Cài đặt',
        accounts: 'Tài khoản',
        hello: 'Xin chào',
      },
      
      // Auth
      auth: {
        login: 'Đăng nhập',
        logout: 'Đăng xuất',
        register: 'Đăng ký',
        email: 'Email',
        password: 'Mật khẩu',
        confirmPassword: 'Xác nhận mật khẩu',
        forgotPassword: 'Quên mật khẩu?',
        loginSuccess: 'Đăng nhập thành công',
        loginError: 'Đăng nhập thất bại',
      },
      
      // Hello App
      hello: {
        title: 'Xin chào thế giới',
        message: 'Chào mừng đến với My Super App!',
        buttonText: 'Chào hỏi',
      },
      
      // Accounts App
      accounts: {
        title: 'Tài khoản',
        addAccount: 'Thêm tài khoản',
        accountList: 'Danh sách tài khoản',
        noAccounts: 'Không tìm thấy tài khoản nào',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en',
    
    // React Native specific configuration
    compatibilityJSON: 'v3', // Use v3 format to avoid Intl API issues
    
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    
    react: {
      useSuspense: false,
    },
    
    // Disable pluralization to avoid Intl API issues
    pluralSeparator: '_',
    contextSeparator: '_',
    
    // Additional React Native optimizations
    debug: __DEV__,
    saveMissing: false,
    missingKeyHandler: false,
  });

export default i18n;
