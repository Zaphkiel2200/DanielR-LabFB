import { AppPages } from '../types';

class Header extends HTMLElement {
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
                header {
                    background: linear-gradient(to right, #4b6cb7, #182848);
                    color: white;
                    padding: 1rem 2rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                }
                
                .logo {
                    font-size: 1.5rem;
                    font-weight: bold;
                }
                
                nav {
                    display: flex;
                    gap: 1rem;
                }
                
                button {
                    background: transparent;
                    border: 1px solid white;
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                
                button:hover {
                    background: rgba(255, 255, 255, 0.1);
                }
                
                .user-info {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
            </style>
            <header>
                <div class="logo">Gestor de Tareas</div>
                <nav id="auth-buttons">
                    <button id="login-btn">Iniciar Sesión</button>
                    <button id="register-btn">Registrarse</button>
                </nav>
                <div class="user-info" id="user-info" style="display: none;">
                    <span id="user-email"></span>
                    <button id="logout-btn">Cerrar Sesión</button>
                </div>
            </header>
        `;

        const loginBtn = this.shadowRoot!.getElementById('login-btn')!;
        const registerBtn = this.shadowRoot!.getElementById('register-btn')!;
        const logoutBtn = this.shadowRoot!.getElementById('logout-btn')!;

        loginBtn.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('navigate', {
                detail: { page: 'login' },
                bubbles: true,
                composed: true
            }));
        });

        registerBtn.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('navigate', {
                detail: { page: 'register' },
                bubbles: true,
                composed: true
            }));
        });

        logoutBtn.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('logout', {
                bubbles: true,
                composed: true
            }));
        });
    }

    updateAuthState(isAuthenticated: boolean, email?: string) {
        const authButtons = this.shadowRoot!.getElementById('auth-buttons')!;
        const userInfo = this.shadowRoot!.getElementById('user-info')!;
        const userEmail = this.shadowRoot!.getElementById('user-email')!;

        if (isAuthenticated && email) {
            authButtons.style.display = 'none';
            userInfo.style.display = 'flex';
            userEmail.textContent = email;
        } else {
            authButtons.style.display = 'flex';
            userInfo.style.display = 'none';
        }
    }
}

customElements.define('app-header', Header);

export default Header;