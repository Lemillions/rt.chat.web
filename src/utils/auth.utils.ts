export class AuthUtils {
    static emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // password tem que ter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial
    static passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    static validateEmail(email: string): boolean {
        return this.emailRegex.test(email);
    }

    static validatePassword(password: string): boolean {
        return this.passwordRegex.test(password);
    }
}