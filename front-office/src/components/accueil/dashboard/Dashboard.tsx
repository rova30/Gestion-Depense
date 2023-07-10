import React from 'react';
import './Depense.css';
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
} from "@ionic/react";


const Dashboard: React.FC = () => {
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Dépénse mensuelle</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>35 000 Ar</IonCardContent>
        </IonCard>
    );
};

export default Dashboard;
