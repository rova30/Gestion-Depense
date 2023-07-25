import React from 'react';
import './AccueilComponent.css';
import {IonCol, IonGrid, IonRow} from "@ionic/react";
import Transactions from './transactions/Transactions';
import Hero from './header/Hero';
import Hello from './hello/Hello';


const AccueilComponent: React.FC = () => {
    return (
            <>
                <IonGrid style={{'paddingLeft':'22px'}}>
                    <IonRow>              
                        <IonCol size='12'>
                            <Hello/>
                        </IonCol>
                    </IonRow>
                </IonGrid>  

                <IonGrid>
                    <IonRow>              
                        <IonCol size='12'>
                            <Hero/>
                        </IonCol>
                    </IonRow>
                </IonGrid>  
                <IonGrid  style={{'padding':'14px'}}>
                    <IonRow>              
                        <IonCol size='12'>
                            <Transactions/>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </>
    );
};

export default AccueilComponent;
