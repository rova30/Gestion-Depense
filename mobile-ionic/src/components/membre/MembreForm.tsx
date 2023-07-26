import React, {useEffect, useState} from 'react';
import './MembreForm.css';
import {
    IonButton,
    IonCol, IonContent,
    IonDatetime, IonDatetimeButton,
    IonInput,
    IonItem, IonLabel, IonModal,
    IonRow
} from "@ionic/react";
import SelectRole from "../role/SelectRole";
import SelectSexe from "../sexe/SelectSexe";
import Swal from "sweetalert";
import {createMembre} from "../../data/membre.service";
import {Famille, getFamilleById} from "../../data/famille.service";
import {Link} from "react-router-dom";
import { GoogleLogin } from '@leecheuk/react-google-login';
import { gapi} from 'gapi-script';
import { FcGoogle } from 'react-icons/fc';

 interface AjoutMembreProps {
  familleId: string; // Vous pouvez ajuster le type en fonction de votre cas d'utilisation (string, number, etc.).
}
const MembreForm: React.FC<AjoutMembreProps> = ({ familleId }) => {
    const chaine = familleId;
    const tableauDeMots = chaine.split(':');
    const famille_id = tableauDeMots.join('');

    const [famille, setFamille] = useState<Famille>();

    useEffect(() => {
        getFamilleById(parseInt(famille_id))
          .then(response => {
            setFamille(response.data.famille);
            console.log(famille);
          })
          .catch(error => {
            console.error('Erreur lors de la récupération de la famille', error);
          });
      }, []);
    

    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");

    const [role, setRole] = useState("");
    const handleRoleChange = (value: string) => {
        setRole(value);
    };


    const [date, setDate] = useState("");
    const handleDateChange = (event: CustomEvent) => {
        const newDate = event.detail.value;
        setDate(newDate);
    };
    const [sexe, setSexe] = useState("");
    const handleSexeChange = (value: string) => {
        setSexe(value);
    };

    const [login, setLogin] = useState("");
    const [mdp, setMdp] = useState("");
    const [confirmation, setConfirmation] = useState("");

    const clientId = "511930498918-66soc3c8soqeoi9io0nffpjtj7rvqi1v.apps.googleusercontent.com";

    const handleGoogleLoginSuccess = (res : any) => {
        console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
        const googleUser = res?.profileObj;
        setNom(googleUser?.familyName || '');
        setPrenom(googleUser?.givenName || '');
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
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(familleId);
        createMembre(famille?.id,nom,prenom,parseInt(role),date,parseInt(sexe),login,mdp,confirmation)
            .then(response => {
                console.log('Membre ajouté avec succès', response.data);
                Swal('Succès', 'Nouveau membre ajouté.', 'success').then(() => {
                    window.location.href = '/login';
                });
            })
            .catch(error => {
                console.error('Erreur lors de l\'ajout du nouveau membre', error);
                if (error.response && error.response.data && error.response.data.message) {
                    Swal('Erreur', error.response.data.message, 'error');
                } else {
                    Swal('Erreur', 'Erreur lors de l\'ajout du nouveau membre.', 'error');
                }
            });
    };

    return (
        <IonContent fullscreen>
            <form onSubmit={handleSubmit} id="container-membre">
                <IonRow>
                    <IonCol size="12">
                        <div id="title">
                            <h1>Nouveau membre</h1>
                            <h4>Famille {famille?.nom}</h4>
                        </div>
                    </IonCol>
                    <IonCol size="6">
                        <IonItem id="membre-form" lines='none'>
                            <IonInput
                                label="Nom"
                                labelPlacement="floating"
                                placeholder="Entrer votre nom"
                                name="nom"
                                value={nom}
                                onIonChange={(e) => setNom(e.detail.value!)}
                            ></IonInput>
                        </IonItem>
                    </IonCol>
                    <IonCol size="6">
                        <IonItem id="membre-form" lines='none'>
                            <IonInput
                                label="Prénom"
                                labelPlacement="floating"
                                placeholder="Entrer votre prénom"
                                name="prenom"
                                value={prenom}
                                onIonChange={(e) => setPrenom(e.detail.value!)}
                            ></IonInput>
                        </IonItem>
                    </IonCol>
                    <IonCol size="12">
                        <IonItem id="membre-form" lines='none'>
                            <IonLabel>Date de naissance</IonLabel>
                            <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
                            <IonModal keepContentsMounted={true}>
                                <IonDatetime
                                    id="datetime"
                                    presentation="date"
                                    name="date_naissance"
                                    onIonChange={handleDateChange}
                                ></IonDatetime>
                            </IonModal>
                        </IonItem>
                    </IonCol>
                    <IonCol size="6">
                        <IonItem id="membre-form" lines='none'>
                            <SelectSexe onChange={handleSexeChange}/>
                        </IonItem>
                    </IonCol>
                    <IonCol size="6">
                        <IonItem id="membre-form" lines='none'>
                            <SelectRole onChange={handleRoleChange} />
                        </IonItem>
                    </IonCol>

                    <IonCol size="12">
                        <IonItem id="membre-form" lines='none'>
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
                    <IonCol size="12">
                        <IonItem id="membre-form" lines='none'>
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
                    <IonCol size="12">
                        <IonItem id="membre-form" lines='none'>
                            <IonInput
                                label="Confirmer votre mot de passe"
                                labelPlacement="floating"
                                placeholder="********"
                                name="confirmation"
                                type="password"
                                value={confirmation}
                                onIonChange={(e) => setConfirmation(e.detail.value!)}
                            ></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                <IonCol size="12" style={{'marginTop':'25px'}}>
                    <IonButton id="custom-button" type="submit">
                        Valider
                    </IonButton>
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
                          S&apos;inscrire avec Google
                        </button>
                    )}                    
                    onSuccess={handleGoogleLoginSuccess}
                    onFailure={handleGoogleLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    />
                </IonCol>
                <IonCol size="12" style={{ 'marginTop': '15px' }} id="link">
                    <Link style={{'textDecoration':'none'}} to="/login">Se connecter à un compte existant</Link>
                </IonCol>
                </IonRow>
            </form>
        </IonContent>
    );
};

export default MembreForm;
