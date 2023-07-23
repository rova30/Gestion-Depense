import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import './Bienvenue.css';
import Banner from "../../components/banner/Banner";

const Bienvenue: React.FC = () => {
    return (
        <IonPage style={{'padding':'15px'}}>
            <IonContent fullscreen>
                <Banner />
            </IonContent>
        </IonPage>
    );
};

export default Bienvenue;
