import React from 'react';
import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import './Profil.css';
import Layout from '../../components/layout/Layout';
import Banner from '../../components/profil/Banner';
import MyTransaction from '../../components/profil/MyTransaction';

const Profil: React.FC = () => {
    return (
        <Layout
            render={() => (
                <IonPage>
                    <IonContent fullscreen>
                        <IonGrid style={{'padding':'14px'}}>
                            <IonRow>
                                <IonCol size="12">
                                    <Banner/>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol size="12">
                                    <MyTransaction/>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonContent>
                </IonPage>
            )}
            title={"Profil"}
        ></Layout>
    );
};

export default Profil;
