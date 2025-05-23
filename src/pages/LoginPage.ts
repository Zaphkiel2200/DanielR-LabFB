class LoginPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot!.innerHTML = `
            <style>
                * {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }

                :host {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background: linear-gradient(to right, #f5f7fa 0%, #c3cfe2 100%);
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }

                .login-container {
                    width: 100%;
                    max-width: 400px;
                    padding: 2.5rem;
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
                    position: relative;
                    overflow: hidden;
                }

                .login-container::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 5px;
                    background: linear-gradient(to right, #4b6cb7, #182848);
                }

                h2 {
                    margin-bottom: 1.5rem;
                    color: #2c3e50;
                    text-align: center;
                    font-weight: 600;
                }

                .form-group {
                    margin-bottom: 1.25rem;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 0.5rem;
                    color: #34495e;
                    font-size: 0.9rem;
                    font-weight: 500;
                }

                .form-group input {
                    width: 100%;
                    padding: 0.75rem 1rem;
                    border: 1px solid #dfe6e9;
                    border-radius: 6px;
                    font-size: 0.95rem;
                    transition: border-color 0.3s;
                }

                .form-group input:focus {
                    outline: none;
                    border-color: #4b6cb7;
                    box-shadow: 0 0 0 2px rgba(75, 108, 183, 0.2);
                }

                .toggle-password {
                    display: flex;
                    align-items: center;
                    margin-top: 0.5rem;
                    gap: 0.5rem;
                    font-size: 0.85rem;
                    color: #7f8c8d;
                }

                .toggle-password input {
                    width: auto;
                }

                button {
                    width: 100%;
                    padding: 0.75rem;
                    margin-top: 1rem;
                    background: linear-gradient(to right, #4b6cb7, #182848);
                    color: white;
                    border: none;
                    border-radius: 6px;
                    font-size: 1rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                button:hover {
                    opacity: 0.9;
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(75, 108, 183, 0.4);
                }

                .forgot-password {
                    display: block;
                    text-align: center;
                    margin-top: 1rem;
                    color: #4b6cb7;
                    font-size: 0.85rem;
                    text-decoration: none;
                }

                .forgot-password:hover {
                    text-decoration: underline;
                }

                .register-link {
                    text-align: center;
                    margin-top: 1.5rem;
                    font-size: 0.9rem;
                    color: #7f8c8d;
                }

                .register-link a {
                    color: #4b6cb7;
                    text-decoration: none;
                    font-weight: 500;
                }

                .register-link a:hover {
                    text-decoration: underline;
                }
            </style>
            <div class="login-container">
                <h2>Iniciar Sesión</h2>
                <form id="login-form">
                    <div class="form-group">
                        <label for="email">Correo electrónico</label>
                        <input type="email" id="email" name="email" placeholder="tucorreo@ejemplo.com" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Contraseña</label>
                        <input type="password" id="password" name="password" placeholder="Ingresa tu contraseña" required>
                        <div class="toggle-password">
                            <input type="checkbox" id="show-password">
                            <label for="show-password">Mostrar contraseña</label>
                        </div>
                    </div>
                    <button type="submit">Acceder</button>
                    <a href="#" class="forgot-password">¿Olvidaste tu contraseña?</a>
                    <div class="register-link">
                        ¿No tienes una cuenta? <a href="#" id="register-link">Regístrate</a>
                    </div>
                </form>
            </div>
        `;

        const form = this.shadowRoot!.querySelector<HTMLFormElement>('#login-form')!;
        const passwordInput = form.querySelector<HTMLInputElement>('#password')!;
        const showPasswordCheckbox = form.querySelector<HTMLInputElement>('#show-password')!;
        const registerLink = this.shadowRoot!.querySelector('#register-link')!;

        showPasswordCheckbox.addEventListener('change', () => {
            passwordInput.type = showPasswordCheckbox.checked ? 'text' : 'password';
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.email.value;
            const password = form.password.value;
            console.log('Login submitted with:', { email, password });
        });

        registerLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent('navigate', {
                detail: { page: 'register' },
                bubbles: true,
                composed: true
            }));
        });
    }
}

export default LoginPage;