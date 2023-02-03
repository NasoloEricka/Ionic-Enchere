import {
  IonButton,
  IonCard,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useHistory, useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';
import { useEffect } from 'react';
import OneSignal from 'onesignal-cordova-plugin';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Liste des encheres',
    url: '/listenchere',
    iosIcon: mailOutline,
    mdIcon: mailSharp
  },
  {
    title: 'Recharger mon compte',
    url: '/Solde',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp
  },
  {
    title: 'Ajouter une enchere',
    url: '/enchere',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp
  }
];

const Menu: React.FC = () => {
  const history=useHistory();
  const user=JSON.parse(sessionStorage.getItem('user')!);


  async function deconnectNotif(){
    const appId="f43c166c-4351-40de-8114-d992abf563f4";
    OneSignal.setAppId(appId);
    OneSignal.removeExternalUserId();
}

  function deconnect(){
    sessionStorage.removeItem('user');
    deconnectNotif()
    history.push('/login');
  }  

  function compDeconnect(){
    if(sessionStorage.getItem('user')===null){
      return (<IonItem onClick={()=>{history.push('/login')}}>
              <IonLabel>Login</IonLabel>
            </IonItem>)
    }
    else{
      return (<IonItem onClick={deconnect}>
              <IonLabel>Deconnexion</IonLabel>
            </IonItem>)

    }
  }


      return (
        <IonMenu contentId="main">
          <IonContent>
              <IonList>
              <IonListHeader>Enchere</IonListHeader>
              <IonNote>Bienvenue {user?.nom} {user?.prenom}</IonNote>
              {appPages.map((appPage, index) => {
                return (
                  <IonMenuToggle auto-hide="true">  
                    <IonItem routerLink={appPage.url} routerDirection="none">
                      <IonLabel>{appPage.title}</IonLabel>
                    </IonItem>
                  </IonMenuToggle>
                );
              })}
              {compDeconnect()}
              </IonList>

          </IonContent>
        </IonMenu>
      );


};

export default Menu;
