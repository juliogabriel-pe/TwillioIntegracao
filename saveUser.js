const db = require('./db');

function saveUser(fromNumber, name) {
    const query = `INSERT INTO users (numberCell, namePerson) VALUES (?,?)`;

    if (fromNumber) {

        const regex = /whatsapp:\+(\d+)/;
        const fromNumberRegex = fromNumber.match(regex);
        var FromNumber = parseInt(fromNumberRegex[1]);
    } else {
        FromNumber = fromNumber;
    }
    var Name = name.trim();

    return new Promise((resolve, reject) => {
        db.query(query, [FromNumber, Name], (err, results) => {
            if (err) {
                console.error('Erro ao inserir usuário:', err);
                if (err.code === 'ER_DUP_ENTRY') {
                    resolve(true);
                } else {
                    reject(err);
                }
            } else {
                console.log('Usuário inserido com sucesso:', results);
                resolve(false);
            }
        });
    });
};

module.exports = saveUser;