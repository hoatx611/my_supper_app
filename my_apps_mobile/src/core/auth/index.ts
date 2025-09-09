import { ENV } from '../../config/env';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
}

class AuthService {
  private authState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: false,
  };

  private listeners: Array<(state: AuthState) => void> = [];

  // Subscribe to auth state changes
  subscribe(listener: (state: AuthState) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Notify all listeners of state changes
  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.authState));
  }

  // Get current auth state
  getAuthState(): AuthState {
    return { ...this.authState };
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.authState.isAuthenticated;
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.authState.user;
  }

  // Get current token
  getToken(): string | null {
    return this.authState.token;
  }

  // Login
  async login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
      this.authState.loading = true;
      this.notifyListeners();

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock successful login
      const mockUser: User = {
        id: '1',
        email,
        name: 'John Doe',
        role: 'user',
      };

      const mockToken = 'mock-jwt-token';

      this.authState = {
        isAuthenticated: true,
        user: mockUser,
        token: mockToken,
        loading: false,
      };

      // Store token in storage
      await this.storeToken(mockToken);
      await this.storeUser(mockUser);

      this.notifyListeners();
      return { success: true };
    } catch (error) {
      this.authState.loading = false;
      this.notifyListeners();
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Login failed' 
      };
    }
  }

  // Logout
  async logout(): Promise<void> {
    this.authState = {
      isAuthenticated: false,
      user: null,
      token: null,
      loading: false,
    };

    // Clear stored data
    await this.clearStoredData();
    this.notifyListeners();
  }

  // Register
  async register(email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> {
    try {
      this.authState.loading = true;
      this.notifyListeners();

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock successful registration
      const mockUser: User = {
        id: '1',
        email,
        name,
        role: 'user',
      };

      const mockToken = 'mock-jwt-token';

      this.authState = {
        isAuthenticated: true,
        user: mockUser,
        token: mockToken,
        loading: false,
      };

      // Store token in storage
      await this.storeToken(mockToken);
      await this.storeUser(mockUser);

      this.notifyListeners();
      return { success: true };
    } catch (error) {
      this.authState.loading = false;
      this.notifyListeners();
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Registration failed' 
      };
    }
  }

  // Initialize auth state from storage
  async initializeAuth(): Promise<void> {
    try {
      this.authState.loading = true;
      this.notifyListeners();

      const token = await this.getStoredToken();
      const user = await this.getStoredUser();

      if (token && user) {
        this.authState = {
          isAuthenticated: true,
          user,
          token,
          loading: false,
        };
      } else {
        this.authState.loading = false;
      }

      this.notifyListeners();
    } catch (error) {
      this.authState.loading = false;
      this.notifyListeners();
      console.error('Failed to initialize auth:', error);
    }
  }

  // Storage methods (will be implemented with storage module)
  private async storeToken(token: string): Promise<void> {
    // TODO: Implement with storage module
    console.log('Storing token:', token);
  }

  private async storeUser(user: User): Promise<void> {
    // TODO: Implement with storage module
    console.log('Storing user:', user);
  }

  private async getStoredToken(): Promise<string | null> {
    // TODO: Implement with storage module
    return null;
  }

  private async getStoredUser(): Promise<User | null> {
    // TODO: Implement with storage module
    return null;
  }

  private async clearStoredData(): Promise<void> {
    // TODO: Implement with storage module
    console.log('Clearing stored auth data');
  }
}

export const authService = new AuthService();
export default authService;
