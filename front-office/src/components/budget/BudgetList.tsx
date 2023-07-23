import React, { useEffect, useState } from 'react';
import { Budget, getAllBudgetOfTheMonthByFamilleId } from '../../data/budget.service';
import { IonButton, IonLabel, IonProgressBar, IonSpinner } from '@ionic/react';
import { getMembreByToken } from '../../data/membre.service';
import './BudgetList.css';
import ModalBudget from './ModalBudget';
import GrMoney from 'react-icons/gr';
import { formatAmount } from '../../utils/Util';
const BudgetList: React.FC = () => {
  const [famille, setFamille] = useState(0);
  const [budgets, setBudgets] = useState<Budget[]>([]);
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
      getAllBudgetOfTheMonthByFamilleId(famille)
        .then(response => {
          const budgetsData = Array.isArray(response.data) ? response.data : (response.data as any).budgets;
          setBudgets(budgetsData);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des budgets', error);
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
                <h3 style={{ fontSize: '15px', fontWeight: 'bold' }}>Ce mois</h3>
                <ModalBudget/>
                </div>
            {budgets.map(budget => (
                <div id="budget-item" key={key++}>
                    <div id="top-budget">
                        <div id="type">
                            <IonLabel>{budget.typedepense}</IonLabel>
                        </div>
                        <div id="montant-budget">
                            <IonLabel> {formatAmount(budget.montant_budget)} Ar</IonLabel>
                        </div>
                    </div>
                    <div id="progress-budget">
                    <IonProgressBar value={budget.somme_depenses/budget.montant_budget}></IonProgressBar>                    </div>
                    <div id="bottom-budget">
                        <div id="sommedepense-budget">
                            <IonLabel>Dépense {formatAmount(budget.somme_depenses)} Ar</IonLabel>
                        </div>
                        <div id="reste-budget">
                            <IonLabel>Reste {formatAmount(budget.reste_budget)} Ar</IonLabel>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </>
  );
};

export default BudgetList;
