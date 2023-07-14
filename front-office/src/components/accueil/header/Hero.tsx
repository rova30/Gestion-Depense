import React from 'react';
import './Hero.css';
import {IonCol, IonGrid, IonRow} from "@ionic/react";
import Depense from "../depense/Depense";
import Revenu from "../revenu/Revenu";
import CaisseComponent from '../caisse/Caisse';
import {RiMoneyDollarCircleFill} from 'react-icons/ri'

const Hero: React.FC = () => {
    return (
            <>
                <IonGrid>
                    <IonRow>      
                        <IonCol size="12">
                            <div id="card-hero">
                            <div id="top">
                            <div id="icon">
                                <RiMoneyDollarCircleFill size="55px" />
                            </div>
                            <div id="right-hero">
                            <h3>Ce mois</h3>
                            <div id="depense-revenu">
                                    <div id="depense">
                                        <Depense/>
                                    </div>
                                    <div id="revenu">
                                        <Revenu/>
                                    </div>
                            </div>
                            </div>
                            </div>
                            <div id="caisse">
                                <CaisseComponent/>
                            </div>
                            </div>
                        </IonCol>        
                    </IonRow>
                </IonGrid>
            </>
    );
};

export default Hero;
