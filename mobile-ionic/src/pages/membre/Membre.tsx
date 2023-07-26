import React from 'react';
import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import './Membre.css';
import Layout from '../../components/layout/Layout';
import MembreList from '../../components/membre/MembreList';

const Membre: React.FC = () => {
    return (
        <Layout
            render={() => (
                <IonPage>
                    <IonContent fullscreen>
                        <IonGrid style={{'padding':'14px'}}>
                            <IonRow>
                                <IonCol size="12">
                                    <MembreList/>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonContent>
                </IonPage>
            )}
            title={"Membre"}
        ></Layout>
    );
};

export default Membre;
