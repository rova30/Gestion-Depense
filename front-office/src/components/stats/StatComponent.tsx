import React from 'react';
import './StatComponent.css';
import {IonCol, IonGrid, IonRow} from "@ionic/react";
import ApexChart from '../dashboard/ApexChart';


const StatComponent: React.FC = () => {
    return (
            <>
                <IonGrid  style={{'padding':'15px'}}>
                    <IonRow>              
                        <IonCol>
                            <ApexChart/>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </>
    );
};

export default StatComponent;
