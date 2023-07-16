import express from 'express'
import cors from 'cors'
import itensRouter from './routers/itens-router';

// Definindo porta do servidor
const PORT = process.env.PORT || 4000;

// Host do servidor
const HOSTNAME = process.env.HOSTNAME || 'http://localhost'

// App Express
// export const app = express(); //caso seja necessário importar o objeto em outro arquivo

const app = express();

// JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint raiz 
app.get('/', (req, res) => {
    res.send('Bem-vindo!')
});

// Cors 
app.use(cors({
    origin: ['htpp://localhots:3000']//Permite que a porta 3000 acessa a api
}));

// Rotas 
app.use('/api', itensRouter); // pega as rotas criadas

// Resposta para outras requisições
app.use((req, res) =>{
    res.send(404);
});

// Iniciando o servidor
const server = app.listen(PORT, () =>{
    console.log(`Servidor ouvindo/rodando na porta ${PORT}`);
})

process.on('SIGINT', () =>{
    server.close();
    console.log("Servidor finalizado.");
});