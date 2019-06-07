import { save, update, remove, getStore, findById } from "./LocalStorageService";
import { dateToString } from "../utils/DateUtils";
import { Messages } from "../constants";

const STORAGE_COMPRAS = 'STORAGE_COMPRAS';

/**
 * @param {{ data: string, descricao: string, itens: {data:string}[] }} compras 
 */
export const adicionarCompras = dados => {
    validarCompras(dados); 
    return save(STORAGE_COMPRAS, formatarCompras(dados));
}

export const editarCompras = dados => update(STORAGE_COMPRAS, dados);

export const excluirCompras = id => remove(STORAGE_COMPRAS, id);

/** @returns {any[]} */
export const listarCompras = () => getStore(STORAGE_COMPRAS);

/** @returns {{id:nuber}} */
export const obterComprasPorId = id => findById(STORAGE_COMPRAS, id);

export const formatarCompras = dados => {
    dados.data = dateToString(dados.data);
    return dados;
}

export const validarCompras = dados => {
    if (!dados || !dados.data || !dados.descricao) {
        const error = { message: Messages.COMUM.ERRO.FORMULARIO };
        throw error;
    }
}