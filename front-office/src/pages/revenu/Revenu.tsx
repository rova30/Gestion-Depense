import React from 'react';
import { IonContent, IonPage} from '@ionic/react';
import './Revenu.css';
import Layout from "../../components/layout/Layout";
import RevenuForm from '../../components/accueil/revenu/RevenuForm';

const Revenu: React.FC = () => {
    return (
        <Layout
            render={() => (
                <IonPage>
                    <IonContent fullscreen>
                        <RevenuForm/>
                    </IonContent>
                </IonPage>
            )}
            title={"Revenu"}
        ></Layout>
    );
};

export default Revenu;
