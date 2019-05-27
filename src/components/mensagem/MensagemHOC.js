import { Mensagem } from "./Mensagem";
import React, { useState } from 'react';
import { monitorarToast } from "../../services/MensagemService";

export const MensagemHOC = () => {
    const [mensagem, setMensagem] = useState("");
    monitorarToast(setMensagem);
    return <Mensagem texto={mensagem} hide={()=> setMensagem("")} />
}