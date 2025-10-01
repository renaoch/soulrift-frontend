import { useAuthStore } from '../lib/auth/auth-store';
import { useAuth as useAuthContext } from '../lib/auth/auth-context';

export const useAuth = () => {
  const authStore = useAuthStore();
  const authActions = useAuthContext();
  
  return {
    ...authStore,
    ...authActions,
  };
};
