import { IonDatetime, IonInput, IonItem, IonLabel } from "@ionic/react";

interface InputIonProps {
    lab: any;
    refer:any;
    type:any;
}

const InputIon: React.FC<InputIonProps> =({lab,refer,type})=>{
    return (
        <IonItem className='inputitem'>
           <IonLabel>{lab}</IonLabel>
            <IonInput type={type} ref={refer} />
        </IonItem>
    );
}

export default InputIon; 