import { IonButtons, IonCard, IonContent, IonHeader, IonItem, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react'
import { useHistory } from 'react-router'
import LoginClient from '../components/LoginClient'
import SoldeComponent from '../components/SoldeComponent'

type Props = {}

const Solde = (props: Props) => {
  const history = useHistory();

  useIonViewWillEnter(() => {
    if(sessionStorage.getItem('user') === undefined){
      history.push('/login')
    }
  })

  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>Rechargement de compte</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent fullscreen>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">Rechargement de compte</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonCard>
      <SoldeComponent/>
      </IonCard>
    </IonContent>
    </IonPage>

  )
}

export default Solde;