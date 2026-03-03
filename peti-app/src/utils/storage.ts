import { AppState, AuthState } from '../types';

const STORAGE_KEY = 'peti-app-state';
const AUTH_KEY = 'peti-auth-state';

export const storage = {
  saveState: (state: Omit<AppState, 'auth'>): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save state to localStorage:', error);
    }
  },

  loadState: (): Omit<AppState, 'auth'> | null => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Failed to load state from localStorage:', error);
      return null;
    }
  },

  saveAuth: (auth: AuthState): void => {
    try {
      localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
    } catch (error) {
      console.error('Failed to save auth to localStorage:', error);
    }
  },

  loadAuth: (): AuthState | null => {
    try {
      const saved = localStorage.getItem(AUTH_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Failed to load auth from localStorage:', error);
      return null;
    }
  },

  clearAll: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(AUTH_KEY);
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  }
};
