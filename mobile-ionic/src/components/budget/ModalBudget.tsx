import React, { useState, useEffect } from 'react';
import {
  IonButtons,
  IonButton,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonItem,
  IonInput,
  useIonModal,
} from '@ionic/react';
import { OverlayEventDetail } from '@ionic/core/components';
import SelectTypeDepense from '../typeDepense/SelectTypeDepense';
import { createBudget } from '../../data/budget.service';
import { getMembreByToken } from '../../data/membre.service';
import Swal from "sweetalert";


const ModalExample = ({
  onDismiss,
}: {
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
}) => {
    const [famille, setFamille] = useState(0);
    const [type, setType] = useState("");
    const handleTypeChange = (value: string) => {
        setType(value);
    };
    const [montant, setMontant] = useState("");

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        getMembreByToken(token)
            .then(response => {
                setFamille(response.data.membre.famille_id);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération du membre', error);
            });
    }, []);


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        createBudget(famille,parseInt(type),parseFloat(montant))
        .then(response => {
            console.log('Nouveau budget ajouté', response.data);
            Swal('Succès', 'Nouveau budget ajouté.', 'success').then(() => {
                window.location.href = '/budget';
            });
        })
        .catch(error => {
            console.error('Erreur lors de l\'ajout d\'un nouveau budget', error);
            if (error.response && error.response.data && error.response.data.message) {
                Swal('Erreur', error.response.data.message, 'error');
            } else {
                Swal('Erreur', 'Erreur lors de l\'ajout d\'un nouveau budget.', 'error');
            }
        });

    };
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
        <IonTitle style={{ 'fontSize': '17px','fontWeight':'bold' }}>Nouveau Budget</IonTitle>
          <IonButtons slot="end">
            <IonButton color="medium" onClick={() => onDismiss(null, 'cancel')}>
              Annuler
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
      <form onSubmit={handleSubmit} id="form-container">
        <IonItem lines='none' id="input-form">
            <SelectTypeDepense onChange={handleTypeChange}/>
        </IonItem>
        <IonItem lines='none' id="input-form">
            <IonInput
                label="Montant"
                labelPlacement="floating"
                placeholder="Entrer le montant"
                name="montant"
                value={montant}
                onIonChange={(e) => setMontant(e.detail.value!)}
            ></IonInput>
        </IonItem>
        <IonButton type='submit' id="valid-button">
            Enregistrer
        </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

function ModalBudget() {
  const [present, dismiss] = useIonModal(ModalExample, {
    onDismiss: (data: string, role: string) => dismiss(data, role),
  });
  const [message, setMessage] = useState('This modal example uses the modalController to present and dismiss modals.');
  function openModal() {
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === 'confirm') {
          setMessage(`Hello, ${ev.detail.data}!`);
        }
      },
    });
  }

  return (
    <IonButton expand="block" id="button-ajouter" onClick={() => openModal()}>
        +
    </IonButton>
  );
}

export default ModalBudget;

