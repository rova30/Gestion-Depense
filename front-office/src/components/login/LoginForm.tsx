import React, { useState } from 'react';
import './LoginForm.css';
import { IonButton, IonInput, IonRow, IonCol, IonItem } from "@ionic/react";
import Swal from 'sweetalert';
import {loginService} from '../../data/login.service'
import {Link} from "react-router-dom";

const LoginForm: React.FC = () => {
    const [login, setLogin] = useState("");
    const [mdp, setMdp] = useState("");
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        loginService(login, mdp)
            .then(response => {
                console.log('Connexion réussie', response.data);
                sessionStorage.setItem('token', response.data.token);
                localStorage.removeItem('famille');
                Swal('Succès', 'Connexion réussie.', 'success').then(() => {
                    window.location.href = '/accueil';
                });
            })
            .catch(error => {
                console.error('Connexion échouée', error);
                if (error.response && error.response.data && error.response.data.message) {
                    Swal('Erreur', error.response.data.message, 'error');
                } else {
                    Swal('Erreur', 'Connexion échouée.', 'error');
                }
            });
    };

    return (
        <div id="container">
            <div id="form">
                <form onSubmit={handleSubmit}>
                    <IonRow>
                        <IonCol size="12">
                            <div id="title">
                                <h1>Connectez-vous</h1>
                            </div>
                        </IonCol>
                        <IonCol size="12" style={{ 'marginTop': '15px' }}>
                            <IonItem>
                                <IonInput
                                    label="Email"
                                    labelPlacement="floating"
                                    placeholder="Entrer votre email"
                                    name="login"
                                    type="email"
                                    value={login}
                                    onIonChange={(e) => setLogin(e.detail.value!)}
                                ></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol size="12" style={{ 'marginTop': '15px' }}>
                            <IonItem>
                                <IonInput
                                    label="Mot de passe"
                                    labelPlacement="floating"
                                    placeholder="********"
                                    name="mdp"
                                    type="password"
                                    value={mdp}
                                    onIonChange={(e) => setMdp(e.detail.value!)}
                                ></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol size="12" style={{ 'marginTop': '15px' }}>
                            <IonButton type="submit" id="custom-button">Se connecter</IonButton>
                        </IonCol>
                        <IonCol size="12" style={{ 'marginTop': '15px' }}>
                            <Link style={{'textDecoration':'none'}} to="/nouveau-membre">Pas encore de compte ?</Link>
                        </IonCol>
                    </IonRow>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
