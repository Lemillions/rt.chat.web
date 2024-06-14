import { useState } from 'react';
import { LoginRequest, LoginResponse } from '../../types/auth';
import './index.sass'
import { useMutation } from '@tanstack/react-query';
import { AuthUtils } from '../../utils/auth.utils';
import { useNotification } from '../../contexts/notification.context';
import { ApiError } from '../../types/error';
import { useAuth } from '../../hooks/use-auth.hook';

export default function Login() {
    const { login } = useAuth();
    const { showNotification } = useNotification();
    const [form, setForm] = useState<LoginRequest>({
        email: '',
        password: ''
    });

    const [formError, setFormError] = useState<LoginRequest>({
        email: '',
        password: ''
    });

    const loginMutation = useMutation<LoginResponse, ApiError, LoginRequest>({
        mutationFn: (form: LoginRequest) => login(form),
        onError: (error: ApiError) => {
            const message = Array.isArray(error.response.data.message) ? error.response.data.message[0] : error.response.data.message;
            showNotification(message, 'error');
        }
    });

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (AuthUtils.validateEmail(e.target.value)) {
            setFormError({ ...formError, email: '' });
        }
        setForm({ ...form, email: e.target.value });
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length < 8) {
            setFormError({ ...formError, password: '' });
        }
        setForm({ ...form, password: e.target.value });
    }

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Previne o comportamento padrão de recarregar a página

        const emailValid = AuthUtils.validateEmail(form.email);
        const passwordValid = form.password.length >= 8;

        if (!emailValid || !passwordValid) {
            setFormError({
                email: emailValid ? '' : 'E-mail inválido',
                password: passwordValid ? '' : 'Senha tem que ter no mínimo 8 caracteres'
            });
            return;
        }

        loginMutation.mutate(form);
    }

    const notCanSubmit = loginMutation.isPending || form.email === '' || form.password === '' || formError.email !== '' || formError.password !== '';

    return (
        <div>
            <form id="login-card" onSubmit={submitForm}>
                <h2>Entrar</h2>
                <div className='form-item'>
                    <label htmlFor='email' className='form-label'>E-mail:</label>
                    <input id="email" className={`form-input ${formError.email && 'error'}`} onChange={handleEmailChange} />
                    <span className='form-error'>{formError.email}</span>
                </div>
                <div className='form-item'>
                    <label htmlFor="password" className='form-label'>Senha:</label>
                    <input type="password" id="password" className={`form-input ${formError.password && 'error'}`} onChange={handlePasswordChange} />
                    <span className='form-error'>{formError.password}</span>
                </div>
                <button id="form-submit" type='submit' disabled={notCanSubmit}>Entrar</button>
                <span className='text-register'>Não tem uma conta ? <a href="/register">Cadastre-se</a></span>
            </form>
        </div>
    );
}
