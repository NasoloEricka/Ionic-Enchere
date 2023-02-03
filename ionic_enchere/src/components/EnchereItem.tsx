import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem } from "@ionic/react";

interface EnchereItemProps{
    enchere:any;
}

const EnchereItem: React.FC<EnchereItemProps>=({enchere})=>{
    const statut=["En cours","Terminee"]
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardSubtitle>{enchere.datedebut} - {enchere.datefin}</IonCardSubtitle>
                <IonCardTitle>{enchere.nomproduit}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <IonItem>
                    <strong>Categorie : </strong>
                    {enchere.categorie.typecategorie}
                </IonItem>
                <IonItem>
                    <strong>Auteur : </strong>
                    {enchere.utilisateur.nom} {enchere.utilisateur.prenom}
                </IonItem>
                <IonItem>
                    <strong>Prix de depart : </strong>
                    {enchere.prixmin} Ar
                </IonItem>
                <IonItem>
                    <strong>Prix d'enchere: </strong>
                    {enchere.prix} Ar
                </IonItem>
                <IonItem>
                    <strong>Statut: </strong>
                    {statut[enchere.statut]}
                </IonItem>
            </IonCardContent>
        </IonCard>
    )
}

export default EnchereItem;