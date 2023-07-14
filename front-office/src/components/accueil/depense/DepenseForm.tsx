import React, {useEffect, useState} from 'react';
import './DepenseForm.css';
import {
    IonButton,
    IonCol, IonContent,
    IonDatetime, IonDatetimeButton,
    IonInput,
    IonItem, IonLabel, IonModal,
    IonRow
} from "@ionic/react";
import Swal from "sweetalert";
import SelectTypeDepense from '../../typeDepense/SelectTypeDepense';
import { createDepense } from '../../../data/depense.service';
import { getMembreByToken, Membre } from '../../../data/membre.service';

const DepenseForm: React.FC = () => {
    const [famille, setFamille] = useState(0);
    const [membre, setMembre] = useState<Membre | null>(null);

    const [montant, setMontant] = useState("");

    const [type, setType] = useState("");
    const handleTypeChange = (value: string) => {
        setType(value);
    };


    const [date, setDate] = useState("");
    const handleDateChange = (event: CustomEvent) => {
        const newDate = event.detail.value;
        setDate(newDate);
    };

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        getMembreByToken(token)
            .then(response => {
                setFamille(response.data.membre.famille_id);
                setMembre(response.data.membre);
                console.log('fefe'+membre)
            })
            .catch(error => {
                console.error('Erreur lors de la récupération du membre', error);
            });
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        createDepense(famille,membre?.id,parseInt(type),parseFloat(montant),date)
        .then(response => {
            console.log('Nouvelle dépense ajoutée', response.data);
            Swal('Succès', 'Nouvelle dépense ajoutée.', 'success').then(() => {
                window.location.href = '/accueil';
            });
        })
        .catch(error => {
            console.error('Erreur lors de l\'ajout d\'une nouvelle dépénse', error);
            if (error.response && error.response.data && error.response.data.message) {
                Swal('Erreur', error.response.data.message, 'error');
            } else {
                Swal('Erreur', 'Erreur lors de l\'ajout d\'une nouvelle dépénse.', 'error');
            }
        });

    };

    return (
        <IonContent fullscreen>
            <form onSubmit={handleSubmit}>
                <IonRow>
                    <IonCol size="12">
                        <div id="title">
                            <h1>Nouvelle dépense</h1>
                        </div>
                    </IonCol>
                    <IonCol size="12">
                        <IonItem className="centered-input">
                            <SelectTypeDepense onChange={handleTypeChange}/>
                        </IonItem>
                    </IonCol>
                    <IonCol size="12">
                        <IonItem className="centered-input">
                            <IonInput
                                label="Montant"
                                labelPlacement="floating"
                                placeholder="Entrer le montant"
                                name="montant"
                                value={montant}
                                onIonChange={(e) => setMontant(e.detail.value!)}
                            ></IonInput>
                        </IonItem>
                    </IonCol>
                    <IonCol size="12">
                        <IonItem style={{'paddingRight':'32px'}}>
                            <IonLabel>Date de dépense</IonLabel>
                            <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
                            <IonModal keepContentsMounted={true}>
                                <IonDatetime
                                    id="datetime"
                                    name="date"
                                    onIonChange={handleDateChange}
                                ></IonDatetime>
                            </IonModal>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                <IonCol size="12" style={{'paddingRight':'32px','paddingLeft':'15px','marginTop':'25px'}}>
                    <IonButton id="custom-button" type="submit">
                        Enregistrer
                    </IonButton>
                </IonCol>
                </IonRow>
            </form>
        </IonContent>
    );
};

export default DepenseForm;
