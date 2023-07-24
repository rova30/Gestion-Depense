import React, { useState } from 'react';
import './FamilleForm.css';
import { IonButton, IonInput, IonRow, IonCol } from "@ionic/react";
import { createFamille } from "../../data/famille.service";
import Swal from 'sweetalert';

const FamilleForm: React.FC = () => {
    const [nom, setNom] = useState("");
    const [responsable, setResponsable] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        createFamille(nom,responsable)
            .then(response => {
                const famille = response.data.famille;
                console.log('Famille créée avec succès', famille);
                localStorage.setItem('famille', JSON.stringify(famille));
                Swal('Succès', 'La famille a été créée avec succès.', 'success').then(() => {
                    console.log(famille.id);
                    window.location.href = '/nouveau-membre/:'+famille.id;
                });
            })
            .catch(error => {
                console.error('Erreur lors de la création de la famille', error);
                Swal('Erreur', 'Erreur lors de la création de la famille.', 'error');
            });
    };

    return (
        <div id="container">
            <div id="form">
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="_token" value="{{ csrf_token() }}" />
                    <meta name="csrf-token" content="{{ csrf_token() }}" />
                    <IonRow className="ion-align-items-center">
                        <IonCol size="12">
                            <h1>Nouvelle famille</h1>
                        </IonCol>
                        <IonCol size="12" style={{ 'marginTop': '15px' }}>
                            <IonInput
                                label="Nom"
                                id = "auth-form"
                                labelPlacement="floating"
                                placeholder="Entrer le nom de famille"
                                className="centered-text"
                                name="nom"
                                style={{'textAlign':'left'}}
                                fill='outline'
                                value={nom}
                                onIonChange={(e) => setNom(e.detail.value!)}
                            ></IonInput>
                        </IonCol>
                        <IonCol size="12" style={{ 'marginTop': '15px' }}>
                            <IonInput
                                label="Responsable"
                                id = "auth-form"
                                labelPlacement="floating"
                                placeholder="Entrer l'email du responsable"
                                className="centered-text"
                                name="responsable"
                                fill='outline'
                                style={{'textAlign':'left'}}
                                type="email"
                                value={responsable}
                                onIonChange={(e) => setResponsable(e.detail.value!)}
                            ></IonInput>
                        </IonCol>
                        <IonCol size="12" style={{ 'marginTop': '15px' }}>
                            <IonButton type="submit" id="custom-button">Enregistrer</IonButton>
                        </IonCol>
                    </IonRow>
                </form>
            </div>
        </div>
    );
};

export default FamilleForm;
