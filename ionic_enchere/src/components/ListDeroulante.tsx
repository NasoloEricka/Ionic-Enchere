import { IonItem, IonItemOption, IonItemOptions, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";

interface ListDeroulanteProps{
    lab:any;
    refer:any;
    allcomp:any;
}


const ListDeroulante:React.FC<ListDeroulanteProps> =({lab,allcomp,refer})=>{
    return (
        <IonItem>
           <IonLabel>{lab}</IonLabel>
                <IonSelect ref={refer}>
                    {allcomp.map((item:any)=>{
                        return(
                            <IonSelectOption value={item.id}>{item.typeCategorie}</IonSelectOption>
                        )
                    })}
                </IonSelect>
        </IonItem>
    );
}

export default ListDeroulante;