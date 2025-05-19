import { auth } from '../../services/firebase';
import { signOut } from 'firebase/auth';

export class CustomHeader extends HTMLElement {
  private user: any;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.user = null;
  }

  setUser(user: any) {
    this.user = user;
    this.render();
  }

  private handleLogout = () => {
    signOut(auth).then(() => {
      window.dispatchEvent(new CustomEvent('auth-change', { detail: { user: null } }));
    }).catch((error) => {
      console.error('Logout error:', error);
    });
  };

  connectedCallback() {
    this.render();
    this.shadowRoot?.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).id === 'logout-btn') {
        this.handleLogout();
      }
    });
  }

  render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        header {
          background: var(--white);
          box-shadow: var(--shadow-sm);
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .brand {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .brand h1 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--primary);
        }
        
        .user-menu {
          display: flex;
          align-items: center;
          gap: 1rem;
          position: relative;
        }
        
        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: var(--primary-light);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }
        
        .dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          box-shadow: var(--shadow-md);
          border-radius: var(--radius-sm);
          padding: 0.5rem 0;
          min-width: 150px;
          display: none;
        }
        
        .dropdown.show {
          display: block;
        }
        
        .dropdown-item {
          padding: 0.5rem 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .dropdown-item:hover {
          background: var(--light);
        }
      </style>
      
      <header>
        <div class="brand">
          <i class="fas fa-tasks" style="color: var(--primary); font-size: 1.5rem;"></i>
          <h1>TaskFlow</h1>
        </div>
        
        ${this.user ? `
        <div class="user-menu">
          <div class="avatar">${this.user.email.charAt(0).toUpperCase()}</div>
          <span>${this.user.email}</span>
          <button id="logout-btn" class="dropdown-item">
            <i class="fas fa-sign-out-alt"></i> Salir
          </button>
        </div>
        ` : ''}
      </header>
    `;
  }
}

customElements.define('custom-header', CustomHeader);