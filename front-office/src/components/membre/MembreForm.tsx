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
import {Famille} from "../../data/famille.service";
import SelectRole from "../role/SelectRole";
import SelectSexe from "../sexe/SelectSexe";

const MembreForm: React.FC = () => {
    const [famille, setFamille] = useState<Famille | null>(null);

    useEffect(() => {
        const storedFamille = localStorage.getItem('famille');
        if (storedFamille) {
            setFamille(JSON.parse(storedFamille));
        }
    }, []);
    return (
        <IonContent fullscreen>
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
                        ></IonInput>
                    </IonItem>
                </IonCol>
                <IonCol size="12">
                    <IonItem style={{'paddingRight':'32px'}}>
                        <SelectRole/>
                    </IonItem>
                </IonCol>
                <IonCol size="12">
                    <IonItem style={{'paddingRight':'32px'}}>
                        <IonLabel>Date de naissance</IonLabel>
                        <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
                        <IonModal keepContentsMounted={true}>
                            <IonDatetime id="datetime" presentation="date"></IonDatetime>
                        </IonModal>
                    </IonItem>
                </IonCol>
                <IonCol size="12">
                    <IonItem style={{'paddingRight':'32px'}}>
                        <SelectSexe/>
                    </IonItem>
                </IonCol>
                <IonCol size="12">
                    <IonItem className="centered-input">
                        <IonInput
                            label="Email"
                            labelPlacement="floating"
                            placeholder="Entrer votre email"
                            name="email"
                            type="email"
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
                        ></IonInput>
                    </IonItem>
                </IonCol>
                <IonCol size="12">
                    <IonItem className="centered-input">
                        <IonInput
                            label="Confirmer votre mot de passe"
                            labelPlacement="floating"
                            placeholder="********"
                            name="confirmation_mdp"
                            type="password"
                        ></IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
            <IonCol size="12" style={{'paddingRight':'32px','paddingLeft':'15px','marginTop':'25px'}}>
                <IonButton id="custom-button">
                    Valider
                </IonButton>
            </IonCol>
            </IonRow>
        </IonContent>
    );
};

export default MembreForm;
