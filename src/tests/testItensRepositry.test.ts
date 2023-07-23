import Item from "../models/item";
import conn from "../repositories/database";
import itensRepository from "../repositories/itensRepository";

// Apontando para base que terá suites dos testes
describe('itensRepository', () =>{
    let repository: itensRepository = new itensRepository();

    test('Consultar item, deve retornar um item específico, caso o mesmo exista no banco', async () =>{
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

    test('Listar itens, deve retornar todos os itens cadastros no banco', async () =>{
        const result = await repository.listarItens();

        expect(result).toEqual([
            {
                "id": 13,
                "nome": "Edielson",
                "descricao": "eu mesmo"
            },
            {
                "id": 14,
                "nome": "Minha mudança 2.0",
                "descricao": "nova ataulização 2.0"
            },
            {
                "id": 26,
                "nome": "Minha mudança 2.0",
                "descricao": "nova ataulização 2.0"
            }
        ]);
    })


    test('Cria um novo item e o registra no banco, caso o mesmo respeite as regras', async () =>{
        const item: Item = {
            nome: "Edielson",
            descricao: "Item teste"
        }

        const result = await repository.criarItem(item);

        expect(result).toEqual(item);
    })

    /**
     * Implementar o rollback
     */
    // test('Deleta um item de acordo com seu ID', async () =>{
    //     const id: number = 14;
    //     const connection = await conn.connect();
         
        // try{
        //     // Iniciando a transação
        //     const result = await repository.deletarItem(id);
        //     expect(result).toMatch('Item deletado com sucesso.');
        // }catch(error){

        // }
    // })

    test('Atualiza um item de acordo com seu id', async () =>{
        const item: Item = {
            "id": 13,
            "nome": "Edielson",
            "descricao": "eu mesmo"
        }
        const result = await repository.atualizarItem(item);

        expect(result).toEqual({
            "fieldCount": 0,
            "affectedRows": 1,
            "insertId": 0,
            "info": "Rows matched: 1  Changed: 0  Warnings: 0",
            "serverStatus": 2,
            "warningStatus": 0,
            "changedRows": 0
        });
    })
});

