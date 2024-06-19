const mysql = require('mysql2');

// Configurações da conexão
const connection = mysql.createConnection({
    host: '127.0.0.1', 
    user: 'root',
    password: 'senha',
    database: 'banco',
    port: 3306
});

// Estabelecer a conexão
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL!');
});

module.exports = connection;

// Fechar a conexão quando o Node.js encerrar
process.on('SIGINT', () => {
    connection.end((err) => {
        if (err) {
        console.error('Erro ao encerrar a conexão com o banco de dados:', err);
        } else {
        console.log('Conexão com o banco de dados encerrada.');
        }
        process.exit();
    });
});
