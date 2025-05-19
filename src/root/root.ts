import { auth } from './services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './components/header/header';

export class AppRoot extends HTMLElement {
  private header: CustomHeader;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.header = document.createElement('custom-header') as CustomHeader;
  }

  connectedCallback() {
    this.render();
    this.setupAuthListener();
  }

  private setupAuthListener() {
    onAuthStateChanged(auth, (user) => {
      this.header.setUser(user);
      this.renderContent(user);
    });
  }

  private renderContent(user: any) {
    const content = this.shadowRoot?.querySelector('#content');
    if (!content) return;

    if (user) {
      content.innerHTML = `
        <main class="app-container">
          <custom-header></custom-header>
          <div class="content">
            <h2>Bienvenido, ${user.email}</h2>
            <!-- Aquí irían los componentes de tareas -->
            <task-manager></task-manager>
          </div>
        </main>
      `;
    } else {
      content.innerHTML = `
        <auth-screen></auth-screen>
      `;
    }
  }

  render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          height: 100vh;
        }
        
        #content {
          height: 100%;
        }
      </style>
      
      <div id="content">
        <custom-header></custom-header>
        <auth-screen></auth-screen>
      </div>
    `;

    this.shadowRoot.querySelector('custom-header')?.replaceWith(this.header);
  }
}

customElements.define('app-root', AppRoot);