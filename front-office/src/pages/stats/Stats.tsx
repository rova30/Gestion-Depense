import React from 'react';
import {IonContent, IonPage} from '@ionic/react';
import './Stats.css';
import Layout from "../../components/layout/Layout";
import StatComponent from "../../components/stats/StatComponent";
import StatDepense from '../../components/dashboard/StatDepense';

const Stats: React.FC = () => {
    return (
        <Layout
            render={() => (
                <>
                <IonPage>
                <IonContent fullscreen>
                    <StatComponent />
                    <StatDepense/>
                </IonContent>
                </IonPage>
                </>
            )}
            title={"Stats"}
        ></Layout>
    );
};

export default Stats;
