
import PubSub from 'pubsub-js';

export const toast = mensagem => PubSub.publish('toast', { mensagem: mensagem });

export const monitorarMensagens = (canal, onMessagem) =>  PubSub.subscribe(canal, (label, dados) => onMessagem(dados.mensagem))

export const monitorarToast = onMessagem => monitorarMensagens('toast', onMessagem)