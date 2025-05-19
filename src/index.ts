import Root from "./Root/Root";
import Header from "./components/Header/Header";
import SupabaseComponent from "./components/SupabaseComponent";
import DashboardPage from "./pages/DashboardPage";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

customElements.define('root-element', Root);

//Common Elements
customElements.define('header-element', Header);

// Landing
customElements.define('landing-page', LandingPage);

// Login Page
customElements.define('login-page', LoginPage);

// Register Page
customElements.define('register-page', RegisterPage);

// Dashboard Page
customElements.define('dashboard-page', DashboardPage);

// Supabase Page
customElements.define('supabase-element', SupabaseComponent);
