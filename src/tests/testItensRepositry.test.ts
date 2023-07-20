import itensRepository from "../repositories/itensRepository";

// Apontando para base que terá suites dos testes
describe('itensRepository', () =>{
    let repository: itensRepository = new itensRepository();

    test('Consultar item, deve retornar um item', async () =>{
        const id = 14;
        const result = await repository.consultarItem(id);

        expect(result).toEqual([
            {
                id: 14,
                nome:'Minha mudança 2.0',
                descricao: 'nova ataulização 2.0'
            }
        ]);
    })

});

