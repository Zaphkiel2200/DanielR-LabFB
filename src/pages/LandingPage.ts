class LandingPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot!.innerHTML = `
            <style>
                :host {
                    display: block;
                    height: 100vh;
                    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
                    position: relative;
                    overflow: hidden;
                }

                h1 {
                    color: white;
                    text-align: center;
                    margin: 0;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-family: 'Arial', sans-serif;
                    font-size: 3.5rem;
                    font-weight: 700;
                    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
                    z-index: 2;
                }

                .background-pattern {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
                    background-size: 30px 30px;
                    opacity: 0.5;
                }

                .cta-button {
                    position: absolute;
                    top: 65%;
                    left: 50%;
                    transform: translateX(-50%);
                    padding: 12px 30px;
                    background-color: rgba(255, 255, 255, 0.2);
                    color: white;
                    border: 2px solid white;
                    border-radius: 30px;
                    font-size: 1.1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    z-index: 2;
                }

                .cta-button:hover {
                    background-color: white;
                    color: #1e3c72;
                }

                @media (max-width: 768px) {
                    h1 {
                        font-size: 2.5rem;
                        width: 90%;
                    }
                }
            </style>
            <div class="background-pattern"></div>
            <h1>Bienvenido a Nuestra Plataforma</h1>
            <button class="cta-button">Explorar</button>
        `;

        const ctaButton = this.shadowRoot!.querySelector('.cta-button');
        ctaButton?.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('navigate', {
                detail: { page: 'login' },
                bubbles: true,
                composed: true
            }));
        });
    }
}

export default LandingPage;