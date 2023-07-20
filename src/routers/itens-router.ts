import express from 'express'
import Item from '../models/item'
import itensRepository from '../repositories/itensRepository'

// Criando verbos https para itens
const itensRouter = express.Router();
const repository = new itensRepository();

itensRouter.post('/criarItem/', async (req, res) =>{
    const item: Item = req.body;

    try{
        await repository.criarItem(item);
        res.json(item);
    }catch{
       res.send("Não foi possível salvar o item");
    }
});

itensRouter.get('/listarItens', async (req, res) =>{
    try{
        const listaItens = await repository.listarItens();
        res.json(listaItens);
    }catch{
        res.send('Não foi possível listar itens');
    }
});

itensRouter.get('/consultarItem/:id', async (req, res) => {
    const id: number = Number.parseInt(req.params.id);
  
    try {
      const item = await repository.consultarItem(id); // Esperando o resultado da consulta e resposta da promise
      res.json(item);
    }catch{
      res.send('Não foi possível consultar o item');
    }
});
  
itensRouter.put('/atualizarItem/', async (req, res) =>{
    const item: Item = req.body;

    try{
        res.json(await repository.atualizarItem(item));
    }catch{
        res.send('Não foi possível realizar atualização. ');
    }
});

itensRouter.delete('/deletarItem/:id', async (req, res) =>{
    const id: number = Number.parseInt(req.params.id);
    
    try{
        res.send(await repository.deletarItem(id));
    }catch{
        res.send('Item não econtrado. ');
    }

});

export default itensRouter;