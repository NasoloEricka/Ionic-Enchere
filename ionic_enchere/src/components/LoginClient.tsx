import { IonButton, IonInput, IonItem, IonLabel, useIonAlert } from "@ionic/react";
import { Console } from "console";
import OneSignal from "onesignal-cordova-plugin";
import { useRef, useState } from "react";
import { useHistory } from "react-router";

const LoginClient = () => {
    const history = useHistory();
    var logins = useRef<HTMLIonInputElement>(null);
    var mdp = useRef<HTMLIonInputElement>(null);
    const [presentAlert] = useIonAlert();
    const [userData,setUserData]=useState(null);

    
    function authentificate(data:any) {
        if(data==undefined){
            presentAlert({
                header: 'Connexion',
                message: 'Informations non valides',
                buttons: ['OK'],
            })
        }
        else{
            sessionStorage.setItem("user",JSON.stringify(data));
            history.push('/listenchere');
        }
    }

    function verifyData(data:any){
        if(data.data!=undefined){
            authentificate(data.data);
            return data.data;
        }
        authentificate(undefined);
        return undefined;

    }

    const getUserData=()=>{
        var user = logins.current?.value;
        var password = mdp.current?.value;
        console.log(user);
        fetch('https://webservice-enchere-production-665e.up.railway.app/utilisateur', {       
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({logins:user,mdp:password})
        }).then(response => response.json())
        .then(data => setUserData(verifyData(data)));
      }
    
    return (
        <form className="ion-padding myform">
            <IonLabel className='formtitle'>Login Client</IonLabel>
            <IonItem className='inputitem'>
                <IonLabel position="floating">Username</IonLabel>
                <IonInput ref={logins} value="johndoe" />
            </IonItem>
            <IonItem className='inputitem'>
                <IonLabel position="floating">Password</IonLabel>
                <IonInput ref={mdp} type="password" value="123"/>
            </IonItem>
            <IonButton className="ion-margin-top inputitem" type="button" expand="block" onClick={getUserData}>
                Login
            </IonButton>
            <IonButton className="ion-margin-top inputitem" onClick={()=>history.push('/inscription')} type="button" expand="block" >S'inscrire</IonButton>

        </form>
    )
}

export default LoginClient