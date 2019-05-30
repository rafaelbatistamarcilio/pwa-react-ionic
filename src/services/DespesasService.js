import { excelToJson } from "./ExcelService";
import { getStore, setData } from "./LocalStorageService";
import { toast } from "./MensagemService";

const STORAGE_DESPESAS = 'STORAGE_DESPESAS';

export const isDespesaValida = despesa => {
    return  despesa && despesa.valor && despesa.total && despesa.quantidade && despesa.descricao && despesa.vendedor && 
            despesa.origem && despesa.tipo && despesa.data && despesa.medida && despesa.marca;
}

export const adicionarDespesa = despesa => {
    const despesas = getStore(STORAGE_DESPESAS);
    despesa.id = new Date().getTime();
    despesa.quantidade = Number(despesa.quantidade).toFixed(2);
    despesa.valor = Number(despesa.valor).toFixed(2);
    despesa.total = (despesa.quantidade * despesa.valor).toFixed(2);
    despesa.data = despesa.data.substr(0,10).split('-').reverse().join('/')
    despesas.push(despesa);
    setData(STORAGE_DESPESAS, despesas);
}

export const excluirDespesa = id => {
    const tamanhoOriginal = getStore(STORAGE_DESPESAS).length;
    const despesas = getStore(STORAGE_DESPESAS).filter(despesa => despesa.id !== id);
    if (despesas.length !== tamanhoOriginal) {
        setData(STORAGE_DESPESAS, despesas);
        return true;
    }
    return false;
}

export const importarDespesas = async selectorFiles => {
    const dados = await excelToJson(selectorFiles.item(0));
    const despesas = construirDespesas(dados);
    let storage = getStore(STORAGE_DESPESAS);
    storage = storage.concat(despesas);
    setData(STORAGE_DESPESAS, storage);
    toast('Dados importados');
}

const construirDespesas = planilha => {
    let despesas = [];
    planilha.forEach((dadosDespesa) => despesas.push(construirDespesa(dadosDespesa)))
    return despesas;
}

const construirDespesa = dadosDespesa => {
    let despesa = {};
    Object.keys(dadosDespesa).forEach(key => despesa[key.toLocaleLowerCase()] = dadosDespesa[key]);
    despesa.id = new Date().getTime() + '-' + Math.random();
    despesa.total = Number(despesa.total.replace('R$ ', ''));
    despesa.valor = Number(despesa.valor.replace('R$ ', ''));
    return despesa;
}

export const limparDespesas = () => setData(STORAGE_DESPESAS, null)

/**
 * @returns {any[]}
 */
export const listarDespesas = () => getStore(STORAGE_DESPESAS);

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