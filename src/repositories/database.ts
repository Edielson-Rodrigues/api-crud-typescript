import mysql from 'mysql2'

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'naruto5566',
    database: 'itens'
});

conn.connect((error) =>{
    if(error){
        console.error("Não foi possível estabelecer conexão com o banco");
    }else{
        console.log("Conexão estabelecida com a base de dados");
    }
});

export default conn;