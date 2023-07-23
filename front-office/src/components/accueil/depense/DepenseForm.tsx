import React, { useEffect, useState } from 'react';
import './DepenseForm.css';
import {
  IonButton,
  IonCol,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonRow
} from "@ionic/react";
import SelectTypeDepense from '../../typeDepense/SelectTypeDepense';
import { createDepense } from '../../../data/depense.service';
import { getMembreByToken, Membre } from '../../../data/membre.service';
import Swal from 'sweetalert';

const DepenseForm: React.FC = () => {

  const [famille, setFamille] = useState(0);
  const [membre, setMembre] = useState<Membre | null>(null);
  const [montant, setMontant] = useState("");
  const [type, setType] = useState("");
  const handleTypeChange = (value: string) => {
    setType(value);
  };


  const [date, setDate] = useState("");
  const handleDateChange = (event: CustomEvent) => {
    const newDate = event.detail.value;
    setDate(newDate);
  };

  const [libelle, setLibelle] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    getMembreByToken(token)
      .then(response => {
        setFamille(response.data.membre.famille_id);
        setMembre(response.data.membre);
        console.log('fefe' + membre)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du membre', error);
      });
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    Swal({
      title: 'Attention',
      text: 'Êtes-vous sûr de vouloir ajouter cette dépense ?',
      icon: 'warning',
      buttons: ['Annuler', 'Confirmer'],
    }).then((result) => {
      if (result) {
        // Utilisateur a cliqué sur "Confirmer"
        createDepense(famille, membre?.id, parseInt(type), parseFloat(montant), date, libelle)
          .then(response => {
            console.log('Nouvelle dépense ajoutée', response.data);
            Swal('Succès', 'Requête confirmée.', 'success').then(() => {
              window.location.href = '/accueil';
            });
          })
          .catch(error => {
            console.error('Une erreur s\'est produite', error);
          });
      } else {
        // Utilisateur a cliqué sur "Annuler" ou a fermé la boîte de dialogue
        Swal('Info','Enregistrement annulé', 'info');
      }
    });
  };

  return (
    <IonContent fullscreen>
      <form onSubmit={handleSubmit} id="form-container">
        <IonRow>
          <IonCol size="12">
            <div id="title">
              <h1>Nouvelle dépense</h1>
            </div>
          </IonCol>
          <IonCol size="12">
            <IonItem lines='none' id="input-form">
              <SelectTypeDepense onChange={handleTypeChange} />
            </IonItem>
          </IonCol>
          <IonCol size="12">
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
          </IonCol>
          <IonCol size="12">
            <IonItem lines='none' id="input-form">
              <IonLabel>Date de dépense</IonLabel>
              <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
              <IonModal keepContentsMounted={true}>
                <IonDatetime
                  id="datetime"
                  name="date"
                  onIonChange={handleDateChange}
                ></IonDatetime>
              </IonModal>
            </IonItem>
          </IonCol>
          <IonCol size="12">
            <IonItem id="input-form" lines='none'>
              <IonInput
                label="Libellé"
                labelPlacement="floating"
                value={libelle}
                onIonChange={(e) => setLibelle(e.detail.value!)}
                placeholder="Ajouter un libellé"
                maxlength={20}
              ></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="12">
            <IonButton id="valid-button" type="submit">
              Enregistrer
            </IonButton>
          </IonCol>
        </IonRow>
      </form>
    </IonContent>
  );
};

export default DepenseForm;
