import { useMutation } from '@tanstack/react-query';
import { LoginRequestType } from './schemaHandler';
import { loginUser } from './axiosHandler';

export const loginMutation = () => useMutation({
    mutationKey: ['user/login'],
    mutationFn: (request: LoginRequestType) => loginUser(request),
});
