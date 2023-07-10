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
import {Famille} from "../../data/famille.service";
import {Link} from "react-router-dom";

const MembreForm: React.FC = () => {
    const [famille, setFamille] = useState<Famille | null>(null);

    useEffect(() => {
        const storedFamille = localStorage.getItem('famille');
        if (storedFamille) {
            setFamille(JSON.parse(storedFamille).famille);
        }
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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

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
            <form onSubmit={handleSubmit}>
                <IonRow>
                    <IonCol size="12">
                        <div id="title">
                            <h1>Nouveau membre</h1>
                            <h4>Famille {famille?.nom}</h4>
                        </div>
                    </IonCol>
                    <IonCol size="12">
                        <IonItem className="centered-input">
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
                    <IonCol size="12">
                        <IonItem className="centered-input">
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
                        <IonItem style={{'paddingRight':'32px'}}>
                            <SelectRole onChange={handleRoleChange} />
                        </IonItem>
                    </IonCol>
                    <IonCol size="12">
                        <IonItem style={{'paddingRight':'32px'}}>
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
                    <IonCol size="12">
                        <IonItem style={{'paddingRight':'32px'}}>
                            <SelectSexe onChange={handleSexeChange}/>
                        </IonItem>
                    </IonCol>
                    <IonCol size="12">
                        <IonItem className="centered-input">
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
                        <IonItem className="centered-input">
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
                        <IonItem className="centered-input">
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
                <IonCol size="12" style={{'paddingRight':'32px','paddingLeft':'15px','marginTop':'25px'}}>
                    <IonButton id="custom-button" type="submit">
                        Valider
                    </IonButton>
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
