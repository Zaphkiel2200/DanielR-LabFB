import { AppRoot } from './root';
import './components/auth/auth';
import './components/tasks/task-manager';

customElements.define('app-root', AppRoot);

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');
  if (app) {
    app.innerHTML = '<app-root></app-root>';
  }
});

window.addEventListener('error', (event) => {
  console.error('Error global:', event.error);
});

export * from './services/firebase';
export * from './components/header/header';