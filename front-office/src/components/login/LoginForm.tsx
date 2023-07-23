import React, { useEffect, useState } from 'react';
import './LoginForm.css';
import { IonButton, IonInput, IonRow, IonCol, IonItem } from "@ionic/react";
import Swal from 'sweetalert';
import {loginService} from '../../data/login.service'
import {Link} from "react-router-dom";
import GoogleLogin from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';
import { gapi } from 'gapi-script';

const LoginForm: React.FC = () => {
    const [login, setLogin] = useState("");
    const [mdp, setMdp] = useState("");


    const clientId = "511930498918-66soc3c8soqeoi9io0nffpjtj7rvqi1v.apps.googleusercontent.com";

    const handleGoogleLoginSuccess = (res : any) => {
        console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
        const googleUser = res?.profileObj;
        setLogin(googleUser?.email || '');

    }

    useEffect(() => {
        function start() {
          gapi.client.init({
            clientId: clientId,
            scope: ""
          })
        }
    
        gapi.load('client:auth2', start);
      });
    
    const handleGoogleLoginFailure = (res : any) => {
        console.log("LOGIN FAILED! res: ", res);
    }

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
                        <IonItem lines='none' id="input-form">
                                <IonInput
                                    id = "auth-form"
                                    label="Email"
                                    style={{'textAlign':'left'}}
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
                        <IonItem lines='none' id="input-form">
                                <IonInput
                                    id = "auth-form"
                                    label="Mot de passe"
                                    labelPlacement="floating"
                                    style={{'textAlign':'left'}}
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
                            <GoogleLogin
                                clientId={clientId}
                                render={(renderProps) => (
                                    <button
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    style={{
                                        backgroundColor:'white',
                                        marginTop: '10px',
                                        width: '100%',
                                        color: 'black',
                                        display: 'flex',
                                        justifyContent: 'center', // Centrer horizontalement le contenu (le label)
                                        alignItems: 'center', // Centrer verticalement le contenu (le label)
                                        textAlign: 'center', // Centrer le texte à l'intérieur du bouton
                                        padding: '10px 20px', // Ajoutez un padding pour plus d'espace autour du texte
                                        borderRadius: '15px',
                                        height: '50px',
                                        fontSize: '14px',
                                        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 4px 24px'

                                    }}
                            >
                            <FcGoogle size={17}/>&nbsp;
                            Se connecter avec Google
                            </button>
                                )}                    
                                onSuccess={handleGoogleLoginSuccess}
                                onFailure={handleGoogleLoginFailure}
                                cookiePolicy={'single_host_origin'}
                            />
                    </IonCol>
                    </IonRow>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
