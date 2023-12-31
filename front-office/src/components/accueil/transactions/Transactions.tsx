import React, { useEffect, useState } from 'react';
import { Transaction, getAllTransactionByFamilleId } from '../../../data/transaction.service';
import { IonButton, IonIcon, IonLabel, IonSpinner } from '@ionic/react';
import { getMembreByToken } from '../../../data/membre.service';
import './Transactions.css';
import { ellipse } from 'ionicons/icons';
import 'moment/locale/fr';
import 'moment-timezone';
import { formatAmount, formatTime } from '../../../utils/Util';

const Transactions: React.FC = () => {
  const [famille, setFamille] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
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
      getAllTransactionByFamilleId(famille)
        .then(response => {
          const transcationsData = Array.isArray(response.data) ? response.data : (response.data as any).transactions;
          setTransactions(transcationsData);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des transactions', error);
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
      <div id="container-transaction">
        <div id="container-title">
          <h3 style={{ fontSize: '15px', fontWeight: 'bold' }}>Dernières transactions</h3>
        </div>
        {transactions.slice(0, 5).map(transaction => (
          <div id="transaction-item" key={key++}>
            <div id="left">
              <div id="icon">
                <IonIcon
                  id="icon"
                  icon={ellipse}
                  style={{ color: transaction.type_transaction === 'Dépense' ? '#F20587' : '#07F2B0'}}
                ></IonIcon>
              </div>
              <div id="left-item">
                <div id="membre">
                  <IonLabel style={{'fontSize':'16px','fontWeight':'bold'}}>{transaction.prenom}</IonLabel>
                </div>
                <div id="type-transaction">
                  <IonLabel style={{'fontSize':'12px'}}>{transaction.type}</IonLabel>
                </div>
              </div>
            </div>
            <div id="right">
              <div id="montant">
                <IonLabel style={{'fontWeight':'bold'}}>Ar {formatAmount(transaction.montant)}</IonLabel>
              </div>
              <div id="date">
                <IonLabel style={{'fontSize':'12px'}}>{formatTime(transaction.date_transaction)}</IonLabel>
              </div>
            </div>
          </div>
        ))}
        <div  id="voir-plus">
          <IonButton id="voir-button" routerLink='/transaction'>
              Voir plus
          </IonButton>
        </div>
      </div>
    </>
  );
};

export default Transactions;
