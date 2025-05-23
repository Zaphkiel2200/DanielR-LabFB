class DashboardPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    min-height: 100vh;
                    background-color: #f8f9fa;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }

                .dashboard-header {
                    background: linear-gradient(to right, #4b6cb7, #182848);
                    color: white;
                    padding: 1.5rem 2rem;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .dashboard-header h1 {
                    margin: 0;
                    font-size: 1.5rem;
                    font-weight: 600;
                }

                .user-menu {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .user-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background-color: rgba(255, 255, 255, 0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .user-avatar:hover {
                    background-color: rgba(255, 255, 255, 0.3);
                }

                .dashboard-content {
                    display: grid;
                    grid-template-columns: 250px 1fr;
                    min-height: calc(100vh - 72px);
                }

                .sidebar {
                    background: white;
                    padding: 1.5rem;
                    border-right: 1px solid #e9ecef;
                }

                .nav-menu {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .nav-item {
                    margin-bottom: 0.5rem;
                }

                .nav-link {
                    display: flex;
                    align-items: center;
                    padding: 0.75rem 1rem;
                    color: #495057;
                    text-decoration: none;
                    border-radius: 6px;
                    transition: all 0.3s;
                }

                .nav-link:hover, .nav-link.active {
                    background-color: #e9f0ff;
                    color: #4b6cb7;
                }

                .nav-link i {
                    margin-right: 0.75rem;
                    font-size: 1.1rem;
                }

                .main-content {
                    padding: 2rem;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                }

                .stat-card {
                    background: white;
                    border-radius: 8px;
                    padding: 1.5rem;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
                    transition: transform 0.3s, box-shadow 0.3s;
                }

                .stat-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                }

                .stat-card h3 {
                    margin: 0 0 0.5rem;
                    font-size: 0.9rem;
                    color: #6c757d;
                    font-weight: 500;
                }

                .stat-card p {
                    margin: 0;
                    font-size: 1.75rem;
                    font-weight: 600;
                    color: #2c3e50;
                }

                .recent-activity {
                    background: white;
                    border-radius: 8px;
                    padding: 1.5rem;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
                }

                .recent-activity h2 {
                    margin: 0 0 1.5rem;
                    font-size: 1.25rem;
                    color: #2c3e50;
                }

                .activity-item {
                    display: flex;
                    padding: 1rem 0;
                    border-bottom: 1px solid #e9ecef;
                }

                .activity-item:last-child {
                    border-bottom: none;
                }

                .activity-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background-color: #e9f0ff;
                    color: #4b6cb7;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 1rem;
                    flex-shrink: 0;
                }

                .activity-content {
                    flex-grow: 1;
                }

                .activity-title {
                    font-weight: 500;
                    margin-bottom: 0.25rem;
                    color: #2c3e50;
                }

                .activity-time {
                    font-size: 0.85rem;
                    color: #6c757d;
                }

                @media (max-width: 768px) {
                    .dashboard-content {
                        grid-template-columns: 1fr;
                    }

                    .sidebar {
                        display: none;
                    }

                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
            <div class="dashboard-header">
                <h1>Panel de Control</h1>
                <div class="user-menu">
                    <div class="user-avatar">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="dashboard-content">
                <div class="sidebar">
                    <ul class="nav-menu">
                        <li class="nav-item">
                            <a href="#" class="nav-link active">
                                <i>📊</i> Resumen
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link">
                                <i>📝</i> Proyectos
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link">
                                <i>👥</i> Equipo
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link">
                                <i>⚙️</i> Configuración
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="main-content">
                    <div class="stats-grid">
                        <div class="stat-card">
                            <h3>Proyectos Activos</h3>
                            <p>12</p>
                        </div>
                        <div class="stat-card">
                            <h3>Tareas Completadas</h3>
                            <p>84</p>
                        </div>
                        <div class="stat-card">
                            <h3>Miembros del Equipo</h3>
                            <p>8</p>
                        </div>
                        <div class="stat-card">
                            <h3>Productividad</h3>
                            <p>92%</p>
                        </div>
                    </div>
                    <div class="recent-activity">
                        <h2>Actividad Reciente</h2>
                        <div class="activity-item">
                            <div class="activity-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div>
                            <div class="activity-content">
                                <div class="activity-title">Nuevo proyecto creado</div>
                                <div class="activity-time">Hace 2 horas</div>
                            </div>
                        </div>
                        <div class="activity-item">
                            <div class="activity-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                            </div>
                            <div class="activity-content">
                                <div class="activity-title">Tarea completada</div>
                                <div class="activity-time">Hace 5 horas</div>
                            </div>
                        </div>
                        <div class="activity-item">
                            <div class="activity-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                            </div>
                            <div class="activity-content">
                                <div class="activity-title">Nuevo miembro añadido</div>
                                <div class="activity-time">Ayer a las 3:45 PM</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

export default DashboardPage;