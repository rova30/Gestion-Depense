import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import './Budget.css';
import Layout from "../../components/layout/Layout";
import BudgetList from '../../components/budget/BudgetList';

const Depense: React.FC = () => {
    return (
        <Layout
            render={() => (
                <IonPage>
                    <IonContent fullscreen>
                        <BudgetList/>
                    </IonContent>
                </IonPage>
            )}
            title={"Budget"}
        ></Layout>
    );
};

export default Depense;
