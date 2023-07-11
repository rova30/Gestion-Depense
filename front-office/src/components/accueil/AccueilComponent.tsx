import React from 'react';
import './AccueilComponent.css';
import {IonCol, IonContent, IonGrid, IonRow} from "@ionic/react";
import Depense from "./depense/Depense";
import Revenu from "./revenu/Revenu";
import Dashboard from './dashboard/Dashboard';


const AccueilComponent: React.FC = () => {
    return (
            <>
                <IonGrid className="custom-grid">
                    <IonRow>    
                        <IonCol sizeXl='6' sizeLg='6' sizeMd='6' sizeSm='6' sizeXs='6'>
                            <Revenu/>
                        </IonCol>
                        <IonCol sizeXl='6' sizeLg='6' sizeMd='6' sizeSm='6' sizeXs='6'>
                            <Depense/>
                        </IonCol>
                    </IonRow>
                </IonGrid>  
                <IonGrid>
                    <IonRow>              
                        <IonCol>
                            <Dashboard/>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </>
    );
};

export default AccueilComponent;
