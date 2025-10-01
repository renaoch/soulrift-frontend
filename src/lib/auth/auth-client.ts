import { apiClient } from '../../app/api/client';
import { cacheManager } from '../cache/cache-manager';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  authMethod: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  tokens?: AuthTokens;
  errors?: any[];
}

class AuthClient {
  private static instance: AuthClient;
  private tokens: AuthTokens | null = null;

  constructor() {
    // Load tokens from localStorage on initialization
    this.loadTokensFromStorage();
  }

  static getInstance(): AuthClient {
    if (!AuthClient.instance) {
      AuthClient.instance = new AuthClient();
    }
    return AuthClient.instance;
  }

  private loadTokensFromStorage(): void {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('auth_tokens');
        if (stored) {
          const tokens = JSON.parse(stored);
          // Check if tokens are still valid
          if (tokens.expiresAt > Date.now()) {
            this.tokens = tokens;
          } else {
            // Clear expired tokens
            localStorage.removeItem('auth_tokens');
          }
        }
      } catch (error) {
        console.error('Error loading tokens from storage:', error);
        localStorage.removeItem('auth_tokens');
      }
    }
  }

  private saveTokensToStorage(tokens: AuthTokens): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('auth_tokens', JSON.stringify(tokens));
        this.tokens = tokens;
      } catch (error) {
        console.error('Error saving tokens to storage:', error);
      }
    }
  }

  private clearTokensFromStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_tokens');
      this.tokens = null;
    }
  }

  private getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {};
    
    if (this.tokens?.accessToken) {
      headers['Authorization'] = `Bearer ${this.tokens.accessToken}`;
    }
    
    return headers;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!(this.tokens?.accessToken && this.tokens.expiresAt > Date.now());
  }

  // Get current access token
  getAccessToken(): string | null {
    if (this.tokens?.accessToken && this.tokens.expiresAt > Date.now()) {
      return this.tokens.accessToken;
    }
    return null;
  }

  // Login method
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Clear any existing auth cache
      cacheManager.invalidate('auth:');

      const response = await apiClient.login({
        email: credentials.email,
        password: credentials.password,
      });
      console.log("res: ",response)
      if (response.success && response.user) {
        // Create mock tokens (adjust based on your backend response)
        const tokens: AuthTokens = {
          accessToken: `token_${Date.now()}`, // Replace with actual token from response
          refreshToken: `refresh_${Date.now()}`, // Replace with actual refresh token
          expiresAt: Date.now() + (24 * 60 * 60 * 1000), // 24 hours from now
        };

        // Save tokens if remember me is checked or for session
        if (credentials.rememberMe) {
          this.saveTokensToStorage(tokens);
        } else {
          // Just keep in memory for session
          this.tokens = tokens;
        }

        // Cache user data
        cacheManager.set('auth:current_user', response.user, 300); // 5 minutes

        return {
          ...response,
          tokens,
        };
      }

      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Register method
  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      // Clear any existing auth cache
      cacheManager.invalidate('auth:');

      const response = await apiClient.register(userData);

      if (response.success) {
        // Don't auto-login after registration
        // User should verify email first
        return response;
      }

      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  // Logout method
  async logout(): Promise<void> {
    try {
      // Call logout endpoint (if needed)
      await apiClient.logout();
    } catch (error) {
      console.error('Logout API error:', error);
      // Continue with local logout even if API fails
    } finally {
      // Clear local storage and cache
      this.clearTokensFromStorage();
      cacheManager.invalidate(); // Clear all cache
    }
  }

  // Reset password method
  async resetPassword(email: string): Promise<AuthResponse> {
    try {
      const response = await apiClient.resetPassword(email);
      return response;
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  }

  // Update password method
  async updatePassword(userId: string, password: string): Promise<AuthResponse> {
    try {
      const response = await apiClient.updatePassword({ userId, password });
      
      if (response.success) {
        // Optionally force re-login after password update
        this.clearTokensFromStorage();
      }
      
      return response;
    } catch (error) {
      console.error('Update password error:', error);
      throw error;
    }
  }

  // Get current user from cache or API
  async getCurrentUser(): Promise<User | null> {
    if (!this.isAuthenticated()) {
      return null;
    }

    // Try to get from cache first
    const cachedUser = cacheManager.get<User>('auth:current_user');
    if (cachedUser) {
      return cachedUser;
    }

    try {
      // If not in cache, make API call (implement this endpoint in your backend)
      const headers = this.getAuthHeaders();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.user) {
          // Cache the user data
          cacheManager.set('auth:current_user', data.user, 300); // 5 minutes
          return data.user;
        }
      }
      
      // If API call fails, clear tokens
      this.clearTokensFromStorage();
      return null;
    } catch (error) {
      console.error('Get current user error:', error);
      this.clearTokensFromStorage();
      return null;
    }
  }

  // Refresh token method (if your backend supports it)
  async refreshAccessToken(): Promise<boolean> {
    if (!this.tokens?.refreshToken) {
      return false;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: this.tokens.refreshToken,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.tokens) {
          this.saveTokensToStorage(data.tokens);
          return true;
        }
      }

      // If refresh fails, clear tokens
      this.clearTokensFromStorage();
      return false;
    } catch (error) {
      console.error('Token refresh error:', error);
      this.clearTokensFromStorage();
      return false;
    }
  }

  // Validate session method
  async validateSession(): Promise<boolean> {
    if (!this.isAuthenticated()) {
      return false;
    }

    // Check if token is close to expiring (within 5 minutes)
    if (this.tokens && this.tokens.expiresAt - Date.now() < 5 * 60 * 1000) {
      // Try to refresh token
      return await this.refreshAccessToken();
    }

    return true;
  }

  // Get user profile (cached)
  async getUserProfile(): Promise<User | null> {
    const cacheKey = 'auth:user_profile';
    
    // Check cache first
    const cachedProfile = cacheManager.get<User>(cacheKey);
    if (cachedProfile) {
      return cachedProfile;
    }

    // Fetch from API
    const user = await this.getCurrentUser();
    if (user) {
      cacheManager.set(cacheKey, user, 600); // Cache for 10 minutes
    }
    
    return user;
  }

  // Update user profile
  async updateUserProfile(updates: Partial<User>): Promise<AuthResponse> {
    if (!this.isAuthenticated()) {
      throw new Error('Not authenticated');
    }

    try {
      const headers = this.getAuthHeaders();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify(updates),
      });

      const data = await response.json();
      
      if (data.success && data.user) {
        // Update cache
        cacheManager.set('auth:current_user', data.user, 300);
        cacheManager.set('auth:user_profile', data.user, 600);
      }

      return data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }

  // Check if email exists (for registration validation)
  async checkEmailExists(email: string): Promise<boolean> {
    const cacheKey = `auth:email_check:${email}`;
    
    // Check cache first (short TTL)
    const cached = cacheManager.get<boolean>(cacheKey);
    if (cached !== null) {
      return cached;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/check-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      const exists = data.exists || false;
      
      // Cache result for 60 seconds
      cacheManager.set(cacheKey, exists, 60);
      
      return exists;
    } catch (error) {
      console.error('Check email error:', error);
      return false;
    }
  }
}

// Export singleton instance
export const authClient = AuthClient.getInstance();

// Export the class for testing or custom instances
export { AuthClient };
