import { IonButton, IonButtons, IonCard, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react'
import LoginClient from '../components/LoginClient'

type Props = {}

const Login = (props: Props) => {


  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>Login Utilisateur</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent fullscreen>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">Login Utilisateur</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonCard>
      <LoginClient />
        </IonCard>
    </IonContent>
   
  </IonPage>

  )
}

export default Login;