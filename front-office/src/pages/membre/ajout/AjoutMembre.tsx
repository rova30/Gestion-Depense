import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import './AjoutMembre.css';
import MembreForm from "../../../components/membre/MembreForm";

const AjoutMembre: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <MembreForm />
            </IonContent>
        </IonPage>
    );
};

export default AjoutMembre;
