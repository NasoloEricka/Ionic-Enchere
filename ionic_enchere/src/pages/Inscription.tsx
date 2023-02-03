import { IonButton, IonButtons, IonCard, IonContent, IonHeader, IonItem, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonAlert } from "@ionic/react";
import { useRef } from "react";
import InputIon from "../components/InputIon";

const Inscription=()=>{
    const nom=useRef<HTMLIonInputElement>();
    const prenom=useRef<HTMLIonInputElement>();
    const tel=useRef<HTMLIonInputElement>();
    const logins=useRef<HTMLIonInputElement>();
    const mdp=useRef<HTMLIonInputElement>();
    const [presentAlert]=useIonAlert();

    function verifyStatutAdd(data:any){
        if(data.success!=undefined){
          presentAlert({
            header: 'Succès',
            message: data.success.message,
            buttons: ['OK'],
          })
          
        }else{
          presentAlert({
            header: 'Erreur',
            message: data.erreur.message,
            buttons: ['OK'],
        })
        }
    }

    function inscriptionutilisateur(){
        const myjson={nom:nom.current?.value,prenom:prenom.current?.value,tel:tel.current?.value,logins:logins.current?.value,mdp:mdp.current?.value}
        fetch('https://webservice-enchere-production-665e.up.railway.app/utilisateura', {       
                method:'POST',
                headers: {"Access-Control-Allow-Origin": "*",'Content-Type': 'application/json'},
                body: JSON.stringify(myjson)
        }).then(response => response.json())
        .then(data => verifyStatutAdd(data));
    }

    return(
        <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Inscription Utilisateur</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Inscription Utilisateur</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonCard>
          <form>
                <InputIon lab={"Nom: "} type={"text"} refer={nom} />
                <InputIon lab={"Prenom: "} type={"text"} refer={prenom} />
                <InputIon lab={"Tel: "} type={"text"} refer={tel} />
                <InputIon lab={"Logins: "} type={"text"} refer={logins} />
                <InputIon lab={"Mot de passe: "} type={"password"} refer={mdp} />
                <IonItem>
                 <center>
                <IonButton size="default" onClick={inscriptionutilisateur}>S'incrire</IonButton>
                </center> 
                </IonItem>
            </form>
            </IonCard>
        </IonContent>
       
      </IonPage>
    )
}

export default Inscription;