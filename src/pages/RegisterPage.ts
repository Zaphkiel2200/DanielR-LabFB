class RegisterPage extends HTMLElement {
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
                    padding: 2rem 0;
                }

                .register-container {
                    width: 100%;
                    max-width: 500px;
                    padding: 2.5rem;
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
                    position: relative;
                    overflow: hidden;
                }

                .register-container::before {
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

                .form-row {
                    display: flex;
                    gap: 1rem;
                }

                .form-row .form-group {
                    flex: 1;
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

                .login-link {
                    text-align: center;
                    margin-top: 1.5rem;
                    font-size: 0.9rem;
                    color: #7f8c8d;
                }

                .login-link a {
                    color: #4b6cb7;
                    text-decoration: none;
                    font-weight: 500;
                }

                .login-link a:hover {
                    text-decoration: underline;
                }

                @media (max-width: 600px) {
                    .form-row {
                        flex-direction: column;
                        gap: 0;
                    }
                    
                    .register-container {
                        padding: 1.5rem;
                        margin: 0 1rem;
                    }
                }
            </style>
            <div class="register-container">
                <h2>Crear Cuenta</h2>
                <form id="register-form">
                    <div class="form-group">
                        <label for="email">Correo electrónico</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="firstName">Nombre</label>
                            <input type="text" id="firstName" name="firstName" required>
                        </div>
                        <div class="form-group">
                            <label for="lastName">Apellido</label>
                            <input type="text" id="lastName" name="lastName" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="username">Nombre de usuario</label>
                        <input type="text" id="username" name="username" required>
                    </div>
                    <div class="form-group">
                        <label for="dob">Fecha de nacimiento</label>
                        <input type="date" id="dob" name="dob" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Contraseña</label>
                        <input type="password" id="password" name="password" required>
                        <div class="toggle-password">
                            <input type="checkbox" id="show-password">
                            <label for="show-password">Mostrar contraseña</label>
                        </div>
                    </div>
                    <button type="submit">Registrarse</button>
                    <div class="login-link">
                        ¿Ya tienes una cuenta? <a href="#" id="login-link">Inicia sesión</a>
                    </div>
                </form>
            </div>
        `;

        const form = this.shadowRoot!.querySelector<HTMLFormElement>('#register-form')!;
        const passwordInput = form.querySelector<HTMLInputElement>('#password')!;
        const showPasswordCheckbox = form.querySelector<HTMLInputElement>('#show-password')!;
        const loginLink = this.shadowRoot!.querySelector('#login-link')!;

        showPasswordCheckbox.addEventListener('change', () => {
            passwordInput.type = showPasswordCheckbox.checked ? 'text' : 'password';
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = {
                email: form.email.value,
                username: form.username.value,
                firstName: form.firstName.value,
                lastName: form.lastName.value,
                dob: form.dob.value,
                password: form.password.value,
            };
            console.log('Registro enviado:', data);

            this.dispatchEvent(new CustomEvent('register', {
                detail: data,
                bubbles: true,
                composed: true,
            }));
        });

        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent('navigate', {
                detail: { page: 'login' },
                bubbles: true,
                composed: true
            }));
        });
    }
}

export default RegisterPage;
