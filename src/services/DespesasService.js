import { excelToJson } from "./ExcelService";
import { getStore, setData } from "./LocalStorageService";

const STORAGE_DESPESAS = 'STORAGE_DESPESAS';

export const importarDespesas = async selectorFiles => {
    const dados = await excelToJson(selectorFiles.item(0));
    const despesas = construirDespesas(dados);
    let storage = getStore(STORAGE_DESPESAS);
    storage = storage.concat(despesas);
    setData(STORAGE_DESPESAS, storage);
}

const construirDespesas = planilha => {
    let despesas = [];
    planilha.forEach((dadosDespesa) => despesas.push(construirDespesa(dadosDespesa)))
    return despesas;
}

const construirDespesa = dadosDespesa => {
    let despesa = {};
    Object.keys(dadosDespesa).forEach(key => despesa[key.toLocaleLowerCase()] = dadosDespesa[key]);
    despesa.id = new Date().getTime() + Math.random();
    despesa.total = Number(despesa.total.replace('R$ ', ''));
    despesa.valor = Number(despesa.valor.replace('R$ ', ''));
    return despesa;
}

/**
 * @returns {any[]}
 */
export const listarDespesas = () => getStore(STORAGE_DESPESAS);

export const filtrarDespesas = filtros => {
    return getStore(STORAGE_DESPESAS).filter(item => {

        let possuiDescricao = true;
        let possuiTipo = true;
        let possuiOrigem = true;

        if (filtros.descricao && item.descricao.toUpperCase().indexOf(filtros.descricao.toUpperCase()) === -1) {
            possuiDescricao = false;
        }

        if (filtros.tipo && item.tipo.toUpperCase().indexOf(filtros.tipo.toUpperCase()) === -1) {
            possuiTipo = false;
        }

        if (filtros.origem && item.origem.toUpperCase().indexOf(filtros.origem.toUpperCase()) === -1) {
            possuiOrigem = false;
        }

        return possuiDescricao && possuiTipo && possuiOrigem;
    })
}

const fintrarUnicos = (value, index, self) => self.indexOf(value) === index;

/** @returns {any[]} */
export const mapearColunas = () => {
    return {
        tipos: listarTipos(),
        origens: listarOrigens(),
        descricoes: listarDescricoes()
    }
};

/** @returns {string[]} */
export const listarTipos = () => listarDespesas().map(despesa => despesa.tipo).filter(fintrarUnicos);

/** @returns {string[]} */
export const listarOrigens = () => listarDespesas().map(despesa => despesa.origem).filter(fintrarUnicos);

/** @returns {string[]} */
export const listarDescricoes = () => listarDespesas().map(despesa => despesa.descricao).filter(fintrarUnicos);