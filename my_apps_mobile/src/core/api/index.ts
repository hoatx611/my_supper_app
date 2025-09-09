import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ENV } from '../../config/env';

class ApiService {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: ENV.API_BASE_URL,
      timeout: ENV.API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        
        if (ENV.DEBUG_MODE) {
          console.log('API Request:', config);
        }
        
        return config;
      },
      (error) => {
        console.error('API Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (ENV.DEBUG_MODE) {
          console.log('API Response:', response);
        }
        return response;
      },
      (error) => {
        console.error('API Response Error:', error);
        
        // Handle common errors
        if (error.response?.status === 401) {
          // Handle unauthorized access
          this.handleUnauthorized();
        }
        
        return Promise.reject(error);
      }
    );
  }

  private getAuthToken(): string | null {
    // Get token from storage
    // This will be implemented when storage module is ready
    return null;
  }

  private handleUnauthorized() {
    // Handle unauthorized access
    // This will be implemented when auth module is ready
    console.log('Unauthorized access detected');
  }

  // HTTP Methods
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.delete<T>(url, config);
    return response.data;
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.patch<T>(url, data, config);
    return response.data;
  }
}

export const apiService = new ApiService();
export default apiService;
