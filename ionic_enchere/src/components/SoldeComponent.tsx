import { IonButton, IonInput, IonItem, IonLabel, useIonAlert } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";

const SoldeComponent = () => {
    const history = useHistory();
    var solde = useRef<HTMLIonInputElement>(null);
    const [presentAlert] = useIonAlert();
    const[userid,setUserid]=useState();
    
    function authentificate() {
        var montant = solde.current?.value;
        console.log(montant);
        if (montant) {
          getUserData(montant);
          presentAlert({
            header: 'Succès',
            message: 'Demande de recharge envoyé',
            buttons: ['OK'],
        })
        }
        else{
            presentAlert({
                header: ' Erreur',
                message: 'Demande de recharge refusé',
                buttons: ['OK'],
            })

        }
    }

    function initiateData(){
        var user = JSON.parse(sessionStorage.getItem("user")!).id;
        setUserid(user);
    }

    useEffect(()=>{
        if(sessionStorage.getItem("user")!=undefined){
            initiateData();
        }
        else{
            history.push("/login")
        }
    },[])

    const getUserData=(montant:any)=>{
        fetch('https://webservice-enchere-production-665e.up.railway.app/soldeUtilisateur', {       
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({idutilisateur:userid,solde:montant})
        }).then(response => response.json())
        .then(data => console.log(data));
      }
    
    return (
        <form className="ion-padding myform">
            <IonLabel className='formtitle'>Recharger mon compte</IonLabel>
            <IonItem className='inputitem'>
                <IonLabel position="floating">montant</IonLabel>
                <IonInput ref={solde}  type="number"/>
            </IonItem>
            <IonButton className="ion-margin-top inputitem" type="button" expand="block" onClick={authentificate}>
                Recharger mon compte
            </IonButton>
        </form>
    )
}

export default SoldeComponent