import { store } from '../flux/Store';
import './Root.css';

class Root extends HTMLElement {
    private unsubscribe: () => void;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.unsubscribe = () => {};
    }

    connectedCallback() {
        this.render();
        this.setupNavigation();
    }

    disconnectedCallback() {
        this.unsubscribe();
    }

    private setupNavigation() {
        this.unsubscribe = store.subscribe(() => {
            this.updateView();
        });
        store.load();
        this.updateView();
    }

    private updateView() {
        const state = store.getState();
        const path = state.currentPath || '/';

        this.shadowRoot!.innerHTML = `
            <style>
                :host {
                    display: block;
                    min-height: 100vh;
                }
                
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                }
            </style>
            <div class="container">
                ${this.getViewForPath(path)}
            </div>
        `;
    }

    private getViewForPath(path: string): string {
        switch (path) {
            case '/':
                return '<landing-page></landing-page>';
            case '/login':
                return '<login-page></login-page>';
            case '/register':
                return '<register-page></register-page>';
            case '/dashboard':
                return '<dashboard-page></dashboard-page>';
            default:
                return '<landing-page></landing-page>';
        }
    }

    render() {
        this.updateView();
    }
}

export default Root;