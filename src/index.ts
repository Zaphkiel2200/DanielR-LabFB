import RootElement from './Root/Root';
import './components/Header';
import './components/LoginPage';
import './components/RegisterPage';
import './components/TaskList';
import './components/TaskCard';

import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../FirebaseConfig';

initializeApp(firebaseConfig);

document.body.appendChild(new RootElement());