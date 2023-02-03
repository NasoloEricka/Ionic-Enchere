import { IonButton, IonButtons, IonCard, IonContent, IonHeader, IonItem, IonLabel, IonMenuButton, IonPage, IonTitle, IonToast, IonToolbar, useIonAlert, useIonViewWillEnter } from "@ionic/react";
import { useEffect, useRef, useState } from "react"
import InputIon from "../components/InputIon"
import ListDeroulante from "../components/ListDeroulante";
import MessageIon from "../components/MessageIon";
import {CameraResultType, CameraSource } from '@capacitor/camera';
import { useHistory } from "react-router";
import {Plugins} from '@capacitor/core'


const FormAddEnchere:React.FC =()=>{
    const {Camera} =Plugins;
    const history=useHistory();
    const  name  = "Ajouter une enchere";
    const nomproduit=useRef<HTMLIonInputElement>();
    const idcategorie=useRef<HTMLIonInputElement>();
    const datedebut=useRef<HTMLIonInputElement>();
    const datefin=useRef<HTMLIonInputElement>();
    const prixmin=useRef<HTMLIonInputElement>();
    const [allcategorie,setallcategorie]=useState([]);
    const [allimage,setallimage]=useState<any>([]);
    const [presentAlert] = useIonAlert();

    function resetImage(){
        setallimage([]);
    }

    function verifyStatutAdd(data:any){
        if(data.success!=undefined){
          presentAlert({
            header: 'Succès',
            message: data.success.message,
            
            buttons: ['OK'],
          })
          history.push('/enchere');
        }else{
          presentAlert({
            header: 'Erreur',
            message: data.erreur.message,
            buttons: ['OK'],
        })
        history.push('/enchere');
        }
    }

    function initiateData(){
        const url='https://webservice-backoffice-production.up.railway.app/categorie';
        fetch(url, {       
            method:'GET',
            headers: {"Access-Control-Allow-Origin": "*",'Content-Type': 'application/json'},
        }).then(response => response.json())
        .then(data => setallcategorie(data.data));
    
    }

    function checkIn(){
        if(nomproduit.current?.value==undefined || idcategorie.current?.value==undefined || datedebut.current?.value==undefined || datefin.current?.value==undefined || prixmin.current?.value==undefined){
            presentAlert({
                header: 'Erreur',
                message: 'Veuillez remplir tous les champs',
                buttons: ['OK'],
            })
        }
        else if(allimage.length==0){
            presentAlert({
                header: 'Erreur',
                message: 'Veuillez ajouter au moins une image',
                buttons: ['OK'],
            })
        }
        else if(new Date(datedebut.current?.value) > new Date(datefin.current?.value)){
            presentAlert({
                header: 'Erreur',
                message: 'La date de fin doit etre superieur a la date de debut',
                buttons: ['OK'],
            })
        }
        else if(prixmin.current?.value<0){
            presentAlert({
                header: 'Erreur',
                message: 'Le prix minimum doit etre superieur a 0',
                buttons: ['OK'],
            })
        }
        else{
            saveEnchere();
        }
    }

    function saveEnchere(){
      let idutilisateur=JSON.parse(sessionStorage.getItem("user") as string).id;
        const myjson={nomproduit:nomproduit.current?.value,idcategorie:idcategorie.current?.value,datedebut:datedebut.current?.value,
            datefin:datefin.current?.value,prixmin:prixmin.current?.value,prix:prixmin.current?.value,idutilisateur:idutilisateur,allimage:allimage}
        fetch('https://webservice-enchere-production-665e.up.railway.app/enchere', {       
                method:'POST',
                headers: {"Access-Control-Allow-Origin": "*",'Content-Type': 'application/json'},
                body: JSON.stringify(myjson)
        }).then(response => response.json())
        .then(data => verifyStatutAdd(data));
    }

    async function ajoutImage(){
      const test=await Camera.getPhoto({
        quality:90,
        source:CameraSource.Photos,
        resultType:CameraResultType.DataUrl,
        
      });
      setallimage([...allimage,{base8:test.dataUrl}]);
    }

    useEffect(()=>{
        initiateData();
    },[allimage])

    useIonViewWillEnter(()=>{
      if(sessionStorage.getItem('user')==undefined){
          history.push('/login');
      }
  
    })


    return (
        <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">{name}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonCard>
          <form>
                <InputIon lab={"Nom Produit: "} type={"text"} refer={nomproduit} />
                <ListDeroulante lab={"Categorie :"} allcomp={allcategorie} refer={idcategorie}/>
                <InputIon lab={"Date debut"} type={"datetime-local"} refer={datedebut} />
                <InputIon lab={"Date fin :"} type={"datetime-local"} refer={datefin} />
                <InputIon lab={"Prix Minimum :"} type={"number"} refer={prixmin} />
                <IonItem className='inputitem'>
                <IonLabel>Image de l'enchere:  (Nb d'image:{(allimage.length)})</IonLabel>
                </IonItem>
                <IonItem className='inputitem'>
                <IonButton onClick={ajoutImage}>Ajouter Image</IonButton>
                <IonButton onClick={resetImage}>Reinitialiser</IonButton>
                </IonItem>
                <IonItem>
                 <center>
                <IonButton size="default" onClick={checkIn}>Ajouter enchere</IonButton>
                </center> 
                </IonItem>
            </form>
            </IonCard>
        </IonContent>
       
      </IonPage>
    )
}

export default FormAddEnchere;