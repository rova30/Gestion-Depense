import React, { useEffect, useState } from 'react';
import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonPopover, IonRefresher, IonRefresherContent, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar, RefresherEventDetail } from '@ionic/react';
import { HiCash, HiHome, HiOutlineLogout, HiOutlineMenuAlt2 } from 'react-icons/hi';
import { GiPayMoney } from 'react-icons/gi';
import { IoStatsChart } from 'react-icons/io5';
import { TbReportMoney } from 'react-icons/tb';
import { useLocation } from 'react-router-dom';
import './Layout.css';
import '../theme/custom-tab-bar.css';
import '../theme/variables.css';
import {BsPeopleFill, BsPersonFill} from 'react-icons/bs';
import { BiTransfer } from 'react-icons/bi';
function Layout(props: {
  title: string,
  render: () => JSX.Element
}): JSX.Element {

  const { render, title } = props;
  const [activeItem, setActiveItem] = useState("");
  const location = useLocation();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    console.log("Déconnexion réussie");
    window.location.replace('/login');
    }

  useEffect(() => {
    const path = location.pathname;
    if (path === "/accueil") {
      setActiveItem("accueil");
    } else if (path === "/revenu") {
      setActiveItem("revenu");
    } else if (path === "/depense") {
      setActiveItem("depense");
    }
  }, [location]);


  return (
    <>
      <IonMenu contentId="main-content" id="menu">
        <IonHeader className="ion-no-border">
          <IonToolbar id="menu-toolbar">
            
            <IonTitle>
                <IonLabel style={{'fontWeight':'bold'}}>
                  Home<span style={{'color':'#A691F2'}}>Finance</span>
                </IonLabel>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList id="menu-ion-list">
            <IonMenuToggle id="menu-toggle">
              <IonItem
                routerLink="/accueil"
                lines="none"
                id="menu-item"
                className={activeItem === "accueil" ? "active-item" : ""}
                onClick={() => setActiveItem("accueil")}
              >
                <HiHome size="22px" />&nbsp;&nbsp;
                <IonLabel>
                  Accueil
                </IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle id="menu-toggle">
              <IonItem
                routerLink="/budget"
                lines="none"
                id="menu-item"
                className={activeItem === "budget" ? "active-item" : ""}
                onClick={() => setActiveItem("budget")}
              >
                <TbReportMoney size="22px" />&nbsp;&nbsp;
                <IonLabel>
                  Budget
                </IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle id="menu-toggle">
              <IonItem
                routerLink="/transaction"
                lines="none"
                id="menu-item"
                className={activeItem === "transaction" ? "active-item" : ""}
                onClick={() => setActiveItem("transaction")}
              >
                <BiTransfer size="22px" />&nbsp;&nbsp;
                <IonLabel>
                  Transaction
                </IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle id="menu-toggle">
              <IonItem
                routerLink="/membre"
                lines="none"
                id="menu-item"
                className={activeItem === "membre" ? "active-item" : ""}
                onClick={() => setActiveItem("membre")}
              >
                <BsPeopleFill size="22px" />&nbsp;&nbsp;
                <IonLabel>
                  Membre
                </IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
        <IonFooter>
        <hr/>
          <IonToolbar id="menu-toolbar">
            <IonItem
                onClick={handleLogout}
                lines="none"
                id="logout-menu-item"
                >
                <HiOutlineLogout size="22px"/>&nbsp;&nbsp;
                <IonLabel>
                  Se déconnecter
                </IonLabel>
            </IonItem>
          </IonToolbar>
        </IonFooter>
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton>
                <HiOutlineMenuAlt2 color="#6A66F2" />
              </IonMenuButton>
            </IonButtons>
            <IonTitle style={{ 'fontSize': '17px','fontWeight':'bold' }}>{title}</IonTitle>
            <IonButtons slot="end" style={{'marginRight':'20px'}}>
            <IonButton id="profile">
              <BsPersonFill style={{'fontSize': '17px'}}/>
            </IonButton>
          </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonPopover
          trigger="profile"
          size="auto"
        >
        <IonList>
        <IonItem button lines="none" routerLink='/profil'>
            <BsPersonFill/>&nbsp;
            Mon Profil
          </IonItem>
          <IonItem button lines="none" onClick={handleLogout}>
            <HiOutlineLogout/>&nbsp;
            Déconnexion
          </IonItem>
        </IonList>
      </IonPopover>
        <IonContent className="ion-padding">
          <IonTabs>
            <IonRouterOutlet>
              {render()}
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="accueil" href="/accueil">
                <HiHome size="22px" />
                <IonLabel style={{ 'fontFamily': 'QuickSand' }}>Accueil</IonLabel>
              </IonTabButton>

              <IonTabButton tab="depense" href="/depense">
                <GiPayMoney size="22px" />
                <IonLabel style={{ 'fontFamily': 'QuickSand' }}>Dépense</IonLabel>
              </IonTabButton>

              <IonTabButton tab="revenu" href="/revenu">
                <HiCash size="22px" />
                <IonLabel style={{ 'fontFamily': 'QuickSand' }}>Revenu</IonLabel>
              </IonTabButton>

              <IonTabButton tab="stats" href="/stats">
                <IoStatsChart size="22px" />
                <IonLabel style={{ 'fontFamily': 'QuickSand' }}>Stats</IonLabel>
              </IonTabButton>

            </IonTabBar>
          </IonTabs>
        </IonContent>
      </IonPage>
    </>
  );
}

export default Layout;
