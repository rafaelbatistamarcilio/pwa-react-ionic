import { calcularTotal, isDespesaValida, listarDespesas, adicionarDespesa } from "../services/DespesasService";

describe('Testes do serviço de despesas', () => {

    it('deve calcular o valor total das despesas corretamente', () => {
        const despesas = [{
            total: 3
        }, {
            total: 5
        }];

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

    it('deve incluier despesas corretamente', () => {
        adicionarDespesa({ descricao: 'DESPESA TESTE', data: '10/10/2019', valor: 10, quantidade: 1 });
        const despesas = listarDespesas();
        expect(despesas.length).toEqual(1);
        expect(despesas[0].descricao).toEqual('DESPESA TESTE');
    });
})