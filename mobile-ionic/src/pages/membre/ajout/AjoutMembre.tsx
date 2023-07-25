import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import './AjoutMembre.css';
import MembreForm from "../../../components/membre/MembreForm";
import { useParams } from 'react-router';

const AjoutMembre: React.FC = () => {
    const { familleId } = useParams<{ familleId: string }>();
    return (
        <IonPage style={{'padding':'15px'}}>
            <IonContent fullscreen>
                <MembreForm familleId={familleId} />
            </IonContent>
        </IonPage>
    );
};

export default AjoutMembre;
