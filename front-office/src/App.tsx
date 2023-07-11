import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Bienvenue from "./pages/bienvenue/Bienvenue";
import AjoutFamille from "./pages/famille/ajout/AjoutFamille";
import AjoutMembre from "./pages/membre/ajout/AjoutMembre";
import Login from "./pages/membre/login/Login";
import Accueil from "./pages/accueil/Accueil";
import Depense from './pages/depense/Depense';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/bienvenue">
          <Bienvenue />
        </Route>
        <Route exact path="/nouvelle-famille">
          <AjoutFamille />
        </Route>
        <Route exact path="/nouveau-membre">
          <AjoutMembre />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/accueil">
          <Accueil />
        </Route>
        <Route exact path="/depense">
          <Depense />
        </Route>

        <Route exact path="/">
          <Redirect to="/bienvenue" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
