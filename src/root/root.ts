import { AppPages } from './types';
import Header from './components/Header';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import TaskList from './components/TaskList';

class RootElement extends HTMLElement {
    private currentPage: AppPages = 'login';
    private header: Header;
    private loginPage: LoginPage;
    private registerPage: RegisterPage;
    private taskList: TaskList;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        this.header = new Header();
        this.loginPage = new LoginPage();
        this.registerPage = new RegisterPage();
        this.taskList = new TaskList();
    }

    connectedCallback() {
        this.render();
        this.setupListeners();
    }

    render() {
        this.shadowRoot!.innerHTML = `
            <style>
                :host {
                    display: block;
                    height: 100vh;
                }
                
                .container {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }
                
                .content {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 20px;
                }
            </style>
            <div class="container">
                <app-header></app-header>
                <div class="content" id="content"></div>
            </div>
        `;

        this.updateContent();
    }

    private updateContent() {
        const content = this.shadowRoot!.getElementById('content')!;
        content.innerHTML = '';

        switch (this.currentPage) {
            case 'login':
                content.appendChild(this.loginPage);
                break;
            case 'register':
                content.appendChild(this.registerPage);
                break;
            case 'tasks':
                content.appendChild(this.taskList);
                break;
        }
    }

    private setupListeners() {
        this.addEventListener('navigate', (e: CustomEvent) => {
            this.currentPage = e.detail.page;
            this.updateContent();
        });

        this.addEventListener('login-success', () => {
            this.currentPage = 'tasks';
            this.updateContent();
        });

        this.addEventListener('logout', () => {
            this.currentPage = 'login';
            this.updateContent();
        });
    }
}

customElements.define('root-element', RootElement);