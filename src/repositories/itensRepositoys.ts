import { resolve } from "path";
import Item from "../models/item";
import conn from "./database";
import { error } from "console";
import { rejects } from "assert";


export default class itensRepository{


    // Criando Função assícrona
    public async consultarItem(id: number) { 
        // Criando promise, passando a função resolver para caso de suceso e reject para falha
        // Retorna o resultado da promise
         return new Promise((resolve, reject) =>{
            conn.query(`SELECT * FROM item WHERE id = ${id}`, (error, results) => {
                if(error){
                    console.error('Erro ao executar a consulta: ' +error.message);
                    reject(); // Dispara uma exeção na chamada da função
                }else if((results as any[]).length == 0){
                    console.error();
                    reject();
                }else{
                    console.log(results);   
                    resolve(results);
                }
            })
        })
    }

    public async listarItens(){
        return new Promise((resolve, reject) =>{
            conn.query(`SELECT * FROM item`, (error, results) =>{
                if(error){
                    console.error('Erro ao executar consulta: ' +error.message);
                    reject();
                }else if((results as any[]).length == 0){
                    console.error('Nenhum item cadastrado na tabela. ');
                    reject();
                }else{
                    console.log(results);
                    resolve(results);
                }
            })
        })
    }

    public async criarItem(item: Item){
        return new Promise((resolve, reject) => {
            conn.query(`INSERT INTO item (nome, descricao) VALUES ('${item.nome}', '${item.descricao}')`, (error) =>{
                if(error){
                    console.error('Não foi possível criar o item: ' +error.message);
                    reject();
                }else{
                    console.log(item);
                    resolve(item);
                }
            })
        })
    }

    public async deletarItem(id: number){
        return new Promise((resolve, reject) =>{
            conn.query(`SELECT * FROM item WHERE id = ${id}`, (error, result) => {
                if (error) {
                    console.error('Erro ao realizar a consulta: ' + error.message);
                    reject();
                } else if ((result as any[]).length == 0) {
                    console.error('Item não existe na base de dados. ');
                    reject();
                } else {
                    conn.query(`DELETE FROM item WHERE id = ${id}`);
                    console.log('Item deletado com sucesso. ');
                    resolve('Item deletado com sucesso. ');
                }
            })
        })
    }

    public async atualizarItem(item: Item){
        return new Promise((resolve, reject) =>{
            if(item.id != null){
                conn.query(`SELECT * FROM item WHERE id = ${item.id}`, (error, results1) =>{
                    if(error){
                        console.error('Error ao realizar consulta: '+error.message);
                        reject();
                    }else if((results1 as any[]).length == 0){
                        console.error('Item não exite na base de dados.');
                        reject();
                    }else{
                        conn.query(`UPDATE item SET nome='${item.nome}', descricao='${item.descricao}' WHERE id = ${item.id}`, (error, results2) =>{
                            if(error){
                                console.error('Erro ao realizar consulta: ' +error.message);
                                reject();
                            }else{
                                console.log(results1);
                                console.log(item);
                                console.log(results2);
                                resolve(results2);
                            }
                        });
                    }
                })
            }
        })
    }
}
