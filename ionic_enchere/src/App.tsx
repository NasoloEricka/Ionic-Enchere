import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact, useIonViewWillEnter } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, useHistory } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';

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
import FormAddEnchere from './pages/FormAddEnchere';
import Inscription from './pages/Inscription';
import ListEnchere from './pages/ListEnchere';

import OneSignal from "onesignal-cordova-plugin"
import Login from './pages/Login';
import Solde from './pages/Solde';

setupIonicReact();


const App: React.FC = () => {
  const history=useHistory();
  
  const appId="f43c166c-4351-40de-8114-d992abf563f4";

  const OneSignalInit=()=>{
    OneSignal.setAppId(appId);
    OneSignal.setNotificationOpenedHandler(
      function (jsonData) {
        console.log("notificationOpenedCallback:\n " + JSON.stringify(jsonData));
      }      
    );
  }

  OneSignalInit();


  return (
    <IonApp>
      <IonReactRouter>
      <Menu />

        <IonSplitPane contentId="main">
          <IonRouterOutlet id="main">

            <Route path="/" exact={true}>
              <Redirect to="/login" />
            </Route>
            <Route path="/enchere" exact={true}>
              <FormAddEnchere />
            </Route>
            <Route path="/inscription" exact={true}>
              <Inscription />
            </Route>
            <Route path="/login" exact={true}>
              <Login />
            </Route>
            <Route path="/listenchere" exact={true}>
              <ListEnchere />
            </Route>
            <Route path="/Solde" exact={true}>
              <Solde />
            </Route>

          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
