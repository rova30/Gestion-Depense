import React, { useEffect, useState } from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonModal, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import './MembreList.css';
import 'moment/locale/fr';
import 'moment-timezone';
import { getAllMembreByFamilleId, getMembreByToken, MembreView } from '../../data/membre.service';
import emailjs from 'emailjs-com';

const MembreList: React.FC = () => {
  const [famille, setFamille] = useState(0);
  const [membres, setMembres] = useState<MembreView[]>([]);
  const [familleChargee, setFamilleChargee] = useState(false);
  let key = 0;
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const sendInvitationEmail = () => {
    if (!email) {
      console.error('Veuillez saisir une adresse e-mail.');
      return;
    }

    setIsLoading(true);
    // Vous devez obtenir vos propres informations d'identification auprès de https://www.emailjs.com/
    const emailJsUserId = 'D9DohatvIaXMkHg3s';
    const emailJsServiceId = 'service_27ojfdn';
    const emailJsTemplateId = 'template_nrs0typ';

    const emailParams = {
      to_email: email,
      to_name: email,
      subject: 'Invitation à rejoindre notre famille',
      message: 'Bonjour, Vous êtes invité à rejoindre notre famille. Cliquez sur le lien pour vous inscrire...',
      famille_id:famille
    };
    

    emailjs.send(emailJsServiceId, emailJsTemplateId, emailParams, emailJsUserId)
      .then((response) => {
        console.log('Invitation envoyée avec succès!', response);
        // Réinitialiser l'état de l'e-mail après l'envoi de l'invitation (facultatif)
        setEmail('');
        // Fermer la popup après l'envoi de l'invitation
        closeModal();
      })
      .catch((error) => {
        console.error('Erreur lors de l\'envoi de l\'invitation', error);
        // Vous pouvez afficher un message d'erreur à l'utilisateur ici si nécessaire
      })    
      .finally(() => {
        setIsLoading(false); // Cacher le spinner une fois que l'envoi est terminé (succès ou échec)
      });
  };
  
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
      getAllMembreByFamilleId(famille)
        .then(response => {
          const membresData = Array.isArray(response.data) ? response.data : (response.data as any).membres;
          setMembres(membresData);
          console.log(membres);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des membres', error);
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

  if(isLoading) {
    return (
      <div className="spinner-container" style={{ textAlign: 'center' }}>
        <IonSpinner name="circular" />
      </div>
    );
  }

  return (
    <>
      <div id="container-transaction">
        <div id="container-title">
          <h3 style={{ fontSize: '15px', fontWeight: 'bold' }}>Tous les membres</h3>
          <IonButton id="button-ajouter" onClick={openModal}>+</IonButton>
        </div>
        {membres.map(membre => (
          <div id="transaction-item" key={key++}>
            <div id="left">
            <div id="icon">
              <IonImg src={membre.photo} style={{'width':'30px'}}></IonImg>
              </div>
              <div id="left-item">
                  <div id="membre">
                  <IonLabel style={{'fontSize':'16px','fontWeight':'bold'}}>{membre.prenom}</IonLabel>
                </div>
                <div id="type-transaction">
                  <IonLabel style={{'fontSize':'12px'}}>{membre.role}</IonLabel>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <IonModal isOpen={showModal} onDidDismiss={closeModal}>
        <IonHeader className="ion-no-border">
          <IonToolbar>
          <IonTitle style={{ 'fontSize': '17px','fontWeight':'bold' }}>
              Ajouter un membre
            </IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={closeModal} color="medium">
                Annuler
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div style={{'marginTop':'35px','padding':'15px'}}>
            <IonItem lines='none' id="input-form">
              <IonInput
                label="Email"
                labelPlacement="floating"
                required
                type="email"
                placeholder="Entrez l'adresse e-mail"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonButton onClick={sendInvitationEmail}  id="valid-button">Envoyer l&apos;invitation</IonButton>
          </div>
        </IonContent>
      </IonModal>
    </>
  );
};

export default MembreList;
