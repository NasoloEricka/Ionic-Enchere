import { IonButtons, IonContent, IonHeader, IonItem, IonItemSliding, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import EnchereItem from "../components/EnchereItem";

const ListEnchere=()=>{
  const history=useHistory();
  const[allenchere,setallenchere]=useState([]);

    function initiateData(){
        const url='https://webservice-enchere-production-665e.up.railway.app/enchere';
        fetch(url, {       
            method:'GET',
            headers: {"Access-Control-Allow-Origin": "*",'Content-Type': 'application/json'},
        }).then(response => response.json())
        .then(data => setallenchere(data.data));
    }
    
  useIonViewWillEnter(()=>{
    if(sessionStorage.getItem('user')==undefined){
        history.push('/login');
    }
    else{
      initiateData();
    }

  })

    return (
        <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Liste enchere</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Liste enchere</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonList>
            <IonItemSliding>
            {allenchere.map((enchere:any)=>
                <IonItem lines="none">
                    <EnchereItem enchere={enchere} key={enchere.id}/>
                </IonItem>
            )}
            </IonItemSliding>
        </IonList>
        </IonContent>
      </IonPage>
        
    )

}   
export default ListEnchere;