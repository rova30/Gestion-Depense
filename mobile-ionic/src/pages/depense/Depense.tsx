import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import './Depense.css';
import Layout from "../../components/layout/Layout";
import DepenseForm from '../../components/accueil/depense/DepenseForm';

const Depense: React.FC = () => {
    return (
        <Layout
            render={() => (
                <IonPage>
                    <IonContent fullscreen>
                        <DepenseForm/>
                    </IonContent>
                </IonPage>
            )}
            title={"Dépense"}
        ></Layout>
    );
};

export default Depense;
