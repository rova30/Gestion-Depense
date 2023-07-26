import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import './Login.css';
import LoginForm from "../../../components/login/LoginForm";

const Login: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <LoginForm />
            </IonContent>
        </IonPage>
    );
};

export default Login;
