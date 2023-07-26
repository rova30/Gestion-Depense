import React from 'react';
import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import './Transaction.css';
import TransactionList from '../../components/accueil/transactions/TransactionList';
import Layout from '../../components/layout/Layout';

const Transaction: React.FC = () => {
    return (
        <Layout
            render={() => (
                <IonPage>
                    <IonContent fullscreen>
                        <IonGrid style={{'padding':'14px'}}>
                            <IonRow>
                                <IonCol size="12">
                                    <TransactionList/>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonContent>
                </IonPage>
            )}
            title={"Transaction"}
        ></Layout>
    );
};

export default Transaction;
