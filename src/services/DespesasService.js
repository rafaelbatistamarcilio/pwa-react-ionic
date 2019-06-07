import { excelToJson } from "./ExcelService";
import { getStore, setData, save, update, remove, findById, addAll } from "./LocalStorageService";
import { toast } from "./MensagemService";
import { dateToString } from "../utils/DateUtils";
import { toMoney, clearMoney, generateId } from "../utils/MathUtils";

const STORAGE_DESPESAS = 'STORAGE_DESPESAS';

export const adicionarDespesa = despesa => save(STORAGE_DESPESAS, formatarDespesa(despesa))

export const editarDespesa = despesa => update(STORAGE_DESPESAS, despesa);

export const excluirDespesa = id => remove(STORAGE_DESPESAS, id);

/** @returns {any[]} */
export const listarDespesas = () => getStore(STORAGE_DESPESAS);

/** @returns {{id:nuber}} */
export const obterDespesaPorId = id => findById(STORAGE_DESPESAS, id);

export const isDespesaValida = despesa => {
    return despesa != null && despesa.valor != null && despesa.total != null && despesa.quantidade != null &&
        despesa.descricao != null && despesa.vendedor != null && despesa.origem != null && despesa.tipo != null &&
        despesa.data != null && despesa.medida != null && despesa.marca != null;
}

export const formatarDespesa = despesa => {
    despesa.quantidade = toMoney(despesa.quantidade);
    despesa.valor = toMoney(despesa.valor);
    despesa.total = calcularTotalDespesa(despesa);
    despesa.data = dateToString(despesa.data);
    return despesa;
}

export const calcularTotalDespesa = despesa => (despesa.quantidade * despesa.valor).toFixed(2);

export const importarDespesas = async selectorFiles => {
    const dados = await excelToJson(selectorFiles.item(0));
    const despesas = tratarDadosDespesas(dados);
    addAll(STORAGE_DESPESAS, despesas)
    toast('Dados importados');
}

const tratarDadosDespesas = planilha => {
    let despesas = [];
    planilha.forEach((dadosDespesa) => despesas.push(tratarDadosDespesa(dadosDespesa)))
    return despesas;
}

const tratarDadosDespesa = dadosDespesa => {
    let despesa = {};
    Object.keys(dadosDespesa).forEach(key => despesa[key.toLocaleLowerCase()] = dadosDespesa[key]);
    despesa.id = generateId();
    despesa.total = clearMoney(despesa.total);
    despesa.valor = clearMoney(despesa.valor);
    return despesa;
}

export const limparDespesas = () => setData(STORAGE_DESPESAS, null)

export const filtrarDespesas = filtros => {
    return getStore(STORAGE_DESPESAS).filter(item => {
        let possuiDescricao = true;
        let possuiTipo = true;
        let possuiOrigem = true;
        let possuiDataInicio = true;
        let possuiDataFim = true;

        if (filtros.descricao && item.descricao.toUpperCase().indexOf(filtros.descricao.toUpperCase()) === -1) {
            possuiDescricao = false;
        }

        if (filtros.tipo && item.tipo.toUpperCase().indexOf(filtros.tipo.toUpperCase()) === -1) {
            possuiTipo = false;
        }

        if (filtros.origem && item.origem.toUpperCase().indexOf(filtros.origem.toUpperCase()) === -1) {
            possuiOrigem = false;
        }

        if (filtros.dataInicio) {
            const dataInicio = filtros.dataInicio.substr(0, 10).split('-').join('');
            const data = item.data.split('/').reverse().join('');
            if (data < dataInicio) {
                possuiDataInicio = false;
            }
        }

        if (filtros.dataFim) {
            const dataFim = filtros.dataFim.substr(0, 10).split('-').join('');
            const data = item.data.split('/').reverse().join('');
            if (data > dataFim) {
                possuiDataFim = false;
            }
        }

        return possuiDescricao && possuiTipo && possuiOrigem && possuiDataInicio && possuiDataFim;
    })
}

const fintrarUnicos = (value, index, self) => self.indexOf(value) === index;

/** @returns {any[]} */
export const mapearColunas = () => {
    return {
        tipos: listarTipos(),
        origens: listarOrigens(),
        descricoes: listarDescricoes(),
        vendedores: listarVendedores(),
        marcas: listarMarcas(),
        medidas: listarMedidas()
    }
};

/** @returns {string[]} */
export const listarTipos = () => listarDespesas().map(despesa => despesa.tipo).filter(fintrarUnicos);

/** @returns {string[]} */
export const listarOrigens = () => listarDespesas().map(despesa => despesa.origem).filter(fintrarUnicos);

/** @returns {string[]} */
export const listarDescricoes = () => listarDespesas().map(despesa => despesa.descricao).filter(fintrarUnicos);

/** @returns {string[]} */
export const listarVendedores = () => listarDespesas().map(despesa => despesa.vendedor).filter(fintrarUnicos);

/** @returns {string[]} */
export const listarMarcas = () => listarDespesas().map(despesa => despesa.marca).filter(fintrarUnicos);

/** @returns {string[]} */
export const listarMedidas = () => listarDespesas().map(despesa => despesa.medida).filter(fintrarUnicos);

export const calcularTotal = itens => (itens && itens.length) ? itens.reduce((total, item) => total + Number(item.total), 0).toFixed(2) : 0;