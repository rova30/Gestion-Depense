import React, { useEffect, useState } from 'react';
import { IonIcon, IonLabel, IonSpinner } from '@ionic/react';
import './MyTransaction.css';
import { ellipse } from 'ionicons/icons';
import 'moment/locale/fr';
import 'moment-timezone';
import { getMembreByToken } from '../../data/membre.service';
import { getAllTransactionByMembreId, Transaction } from '../../data/transaction.service';
import { formatAmount, formatTime } from '../../utils/Util';

const MyTransaction: React.FC = () => {
  const [famille, setFamille] = useState(0);
  const [membre, setMembre] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [familleChargee, setFamilleChargee] = useState(false);
  let key = 0;

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    getMembreByToken(token)
      .then(response => {
        setMembre(response.data.membre.id);
        setFamille(response.data.membre.famille_id);
        setFamilleChargee(true);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du membre', error);
      });
  }, []);

  useEffect(() => {
    if (familleChargee) {
      getAllTransactionByMembreId(famille,membre)
        .then(response => {
          const transcationsData = Array.isArray(response.data) ? response.data : (response.data as any).mytransactions;
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
          <h3 style={{ fontSize: '15px', fontWeight: 'bold' }}>Mes transactions</h3>
        </div>
        {transactions.map(transaction => (
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
      </div>
    </>
  );
};

export default MyTransaction;
