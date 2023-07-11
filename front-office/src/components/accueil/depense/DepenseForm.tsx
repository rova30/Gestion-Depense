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
import { Famille } from '../../../data/famille.service';
import SelectTypeDepense from '../../typeDepense/SelectTypeDepense';

const DepenseForm: React.FC = () => {
    const [famille, setFamille] = useState<Famille | null>(null);

    const [type, setType] = useState("");
    const handleTypeChange = (value: string) => {
        setType(value);
    };


    useEffect(() => {
        const storedFamille = localStorage.getItem('famille');
        if (storedFamille) {
            setFamille(JSON.parse(storedFamille).famille);
        }
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
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
                                    presentation="date"
                                    name="date_depense"
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
