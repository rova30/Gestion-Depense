import React from 'react';
import {IonContent, IonPage, IonRefresher, IonRefresherContent} from '@ionic/react';
import './Accueil.css';
import Layout from "../../components/layout/Layout";
import AccueilComponent from "../../components/accueil/AccueilComponent";

const Accueil: React.FC = () => {
    return (
        <Layout
            render={() => (
                <>
                <IonPage>
                <IonContent fullscreen>
                <AccueilComponent />
                </IonContent>
                </IonPage>
                </>
            )}
            title={"Accueil"}
        ></Layout>
    );
};

export default Accueil;
