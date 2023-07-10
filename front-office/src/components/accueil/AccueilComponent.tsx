import React from 'react';
import './AccueilComponent.css';
import {IonCol, IonRow} from "@ionic/react";
import Depense from "./depense/Depense";
import Revenu from "./revenu/Revenu";
import Dashboard from './dashboard/Dashboard';


const AccueilComponent: React.FC = () => {
    return (
        <div id="container">
            <IonRow>
                <IonCol size="6">
                    <Depense/>
                </IonCol>
                <IonCol size="6">
                    <Revenu/>
                </IonCol>            
                <IonCol size="12">
                    <Dashboard/>
                </IonCol>
            </IonRow>
        </div>
    );
};

export default AccueilComponent;
