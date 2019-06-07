import { adicionarDespesa, calcularTotal, isDespesaValida, obterDespesaPorId, editarDespesa, listarDespesas, excluirDespesa, limparDespesas } from "../services/DespesasService";

describe('Testes do serviço de despesas', () => {

    it('deve calcular o valor total das despesas corretamente', () => {
        const despesas = [{ total: 3 }, { total: 5 }];
        const total = calcularTotal(despesas);
        expect(total).toEqual("8.00");
    });

    it('deve identificar uma despesa inválida corretamente', () => {
        const despesa = {
            valor: 9.0,
            total: 9.0,
            quantidade: 1,
            descricao: 'Despesa test',
            vendedor: 'Mercado XPTO',
            origem: 'MERCADO',
            tipo: 'CARNE',
            data: '01/10/2019',
            medida: 'Peso',
            marca: 'Marca XPTO'
        };

        const valida = isDespesaValida(despesa);

        expect(valida).toEqual(true);
    });

    it('deve incluir despesas corretamente', () => {
        const despesaNova = adicionarDespesa({ descricao: 'DESPESA TESTE', data: '10/10/2019', valor: 10, quantidade: 1 });
        const despesa = obterDespesaPorId(despesaNova.id);
        expect(despesa.descricao).toEqual('DESPESA TESTE');
    });

    it('deve editar despesas corretamente', () => {
        const despesa = { descricao: 'DESPESA TESTE', data: '10/10/2019', valor: 10, quantidade: 1 };
        const despesaNova = adicionarDespesa(despesa);
        const despesaEdicao = obterDespesaPorId(despesaNova.id);
        expect(despesaEdicao.descricao).toEqual('DESPESA TESTE');

        const expected = 'DESPESA EDITADA';
        despesaEdicao.descricao = expected;
        editarDespesa(despesaEdicao);

        const despesaEditada = obterDespesaPorId(despesaNova.id);
        expect(despesaEditada.descricao).toEqual(expected);
    });

    it('deve excluir a despesa corretamente', () => {
        limparDespesas();
        const despesa = { descricao: 'DESPESA TESTE', data: '10/10/2019', valor: 10, quantidade: 1 };
        const despesaAdicionada = adicionarDespesa(despesa);
        expect(listarDespesas().length).toEqual(1);

        excluirDespesa(despesaAdicionada.id);
        expect(listarDespesas().length).toEqual(0);
    });
})