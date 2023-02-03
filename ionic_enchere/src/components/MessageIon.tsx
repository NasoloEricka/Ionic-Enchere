import { IonButton, IonToast } from "@ionic/react";
import { useState } from "react";

interface MessageIonProps{
    message:any;
}

const MessageIon:React.FC<MessageIonProps> =({message})=>{
    const [showToast, setShowToast] = useState(true);

    return (
        <IonToast isOpen={showToast} onDidDismiss={() => setShowToast(false)} message={message} duration={1500} />
    );
}

export default MessageIon;