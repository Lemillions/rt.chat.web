import { useState } from 'react';
import { RegisterRequest, RegisterResponse } from '../../types/auth';
import './index.sass'
import { useMutation } from '@tanstack/react-query';
import { AuthService } from '../../services/auth.service';
import { AuthUtils } from '../../utils/auth.utils';
import { useNotification } from '../../contexts/notification.context';
import { ApiError } from '../../types/error';
import { useNavigate } from 'react-router-dom'

export default function Register() {
    // mover para outra pagina
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const [form, setForm] = useState<RegisterRequest>({
        email: '',
        password: '',
        username: ''
    });

    const [formError, setFormError] = useState<RegisterRequest>({
        email: '',
        password: '',
        username: ''
    });

    const registerMutation = useMutation<RegisterResponse, ApiError, RegisterRequest>({
        mutationFn: (form: RegisterRequest) => AuthService.register(form),
        onSuccess: () => {
            showNotification('Cadastro realizado com sucesso', 'success');
            navigate('/');
        },
        onError: (error: ApiError) => {
            const message = Array.isArray(error.response.data.message) ? error.response.data.message[0] : error.response.data.message;
            showNotification(message, 'error');
        }
    });

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length < 3) {
            setFormError({ ...formError, username: '' });
        }
        setForm({ ...form, username: e.target.value });
    }

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
        const usernameValid = form.username.length >= 3;

        if (!emailValid || !passwordValid) {
            setFormError({
                email: emailValid ? '' : 'E-mail inválido',
                password: passwordValid ? '' : 'Senha tem que ter no mínimo 8 caracteres',
                username: usernameValid ? '' : 'Nome de usuário tem que ter no mínimo 3 caracteres'
            });
            return;
        }

        registerMutation.mutate(form);
    }

    const notCanSubmit = registerMutation.isPending || form.email === '' || form.password === '' || formError.email !== '' || formError.password !== '';

    return (
        <div>
            <form id="login-card" onSubmit={submitForm}>
                <h2>Cadastrar</h2>
                <div className='form-item'>
                    <label htmlFor='username' className='form-label'>Nome de usuário:</label>
                    <input id="username" className={`form-input ${formError.username && 'error'}`} onChange={handleUsernameChange} />
                    <span className='form-error'>{formError.username}</span>
                </div>
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
                <button id="form-submit" type='submit' disabled={notCanSubmit}>Cadastrar</button>
                <span className='text-register'>Ja tem uma conta ? <a href="/">Entre</a></span>
            </form>
        </div>
    );
}
