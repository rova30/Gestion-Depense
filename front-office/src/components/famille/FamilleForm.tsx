import React, { useState } from 'react';
import './FamilleForm.css';
import { IonButton, IonInput, IonRow, IonCol, IonItem } from "@ionic/react";
import { createFamille } from "../../data/famille.service";
import Swal from 'sweetalert';

const FamilleForm: React.FC = () => {
    const [nom, setNom] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        createFamille(nom)
            .then(response => {
                const famille = response.data;
                console.log('Famille créée avec succès', famille);
                localStorage.setItem('famille', JSON.stringify(famille));
                Swal('Succès', 'La famille a été créée avec succès.', 'success').then(() => {
                    window.location.href = '/nouveau-membre';
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
                            <h1>Ajouter une nouvelle famille</h1>
                        </IonCol>
                        <IonCol size="12" style={{ 'marginTop': '15px' }}>
                            <IonItem className="centered-input">
                                <IonInput
                                    label="Nom"
                                    labelPlacement="floating"
                                    placeholder="Entrer le nom de famille"
                                    className="centered-text"
                                    name="nom"
                                    value={nom}
                                    onIonChange={(e) => setNom(e.detail.value!)}
                                ></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol size="12" style={{ 'marginTop': '15px' }}>
                            <IonButton type="submit">Enregistrer</IonButton>
                        </IonCol>
                    </IonRow>
                </form>
            </div>
        </div>
    );
};

export default FamilleForm;
