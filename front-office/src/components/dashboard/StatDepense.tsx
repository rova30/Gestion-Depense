import React, { useEffect, useState } from 'react';
import {  IonCol, IonIcon, IonLabel, IonProgressBar, IonRow, IonSpinner } from '@ionic/react';
import { getMembreByToken } from '../../data/membre.service';
import './StatDepense.css';
import { formatNumber } from '../../utils/Util';
import { DepenseParCategorie, getTotalDepenseAnnuelParCategorie } from '../../data/depense.service';
import { ellipse } from 'ionicons/icons';
const StatDepense: React.FC = () => {
  const [famille, setFamille] = useState(0);
  const [depenses, setDepenses] = useState<DepenseParCategorie[]>([]);
  const [somme, setSomme] = useState(0);
  const [familleChargee, setFamilleChargee] = useState(false);


  let key = 0;

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    getMembreByToken(token)
      .then(response => {
        setFamille(response.data.membre.famille_id);
        setFamilleChargee(true);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du membre', error);
      });
  }, []);

  useEffect(() => {
    if (familleChargee) {
      getTotalDepenseAnnuelParCategorie(famille)
        .then(response => {
          const depenseData = Array.isArray(response.data) ? response.data : (response.data as any).depenses;
          setSomme(response.data.somme[0].sum); 
          setDepenses(depenseData);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des dépenses', error);
        });
    }
  }, [famille, familleChargee]);


  if (!familleChargee) {
    return (
      <div className="spinner-container" style={{ textAlign: 'center' }}>
        <IonSpinner name="dots" />
      </div>
    );
  }

    return (
    <>
        <div id="container-budget">
            <div id="container-title">
                <h3 style={{ fontSize: '15px', fontWeight: 'bold' }}>Cette année</h3>
            </div>
            {depenses.map(depense => (
                <div id="depense-item" key={key++}>
                    <IonRow>
                    <IonCol size="1">
                    <div id="icon">
                        <IonIcon
                        id="icon"
                        icon={ellipse}
                        style={{ color:'#F20587','marginTop':'50%'}}
                        ></IonIcon>
                    </div>
                    </IonCol>
                    <IonCol size="11">
                    <div id="top-depense">
                        <div id="type">
                            <IonLabel>{depense.typedepense}</IonLabel>
                        </div>
                        <div id="montant-depense">
                            <IonLabel> {formatNumber(depense.total_depense)}</IonLabel>
                        </div>
                    </div>
                    <div id="progress-depense">
                        <IonProgressBar id="progress-depense" value={depense.total_depense/somme}></IonProgressBar>     
                        <IonLabel>{formatNumber((depense.total_depense/somme)*100)}%</IonLabel>   
                    </div>
                    </IonCol>
                    </IonRow>
                </div>

            ))}
        </div>
    </>
  );
};

export default StatDepense;
