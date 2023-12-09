import { useMutation } from '@tanstack/react-query';
import { LoginRequestType } from './schemaHandler';
import { loginUser } from './axiosHandler';
import { useAuthStore } from '../store/authStore';

export const loginMutation = () => useMutation({
    mutationKey: ['user/login'],
    mutationFn: (request: LoginRequestType) => loginUser(request),
    onSuccess(data) {
        const setToken = useAuthStore((state) => state.setBearerToken);
        setToken(data.access_token);
    },
});
