import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import './AjoutFamille.css';
import FamilleForm from "../../../components/famille/FamilleForm";

const AjoutFamille: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <FamilleForm />
            </IonContent>
        </IonPage>
    );
};

export default AjoutFamille;
