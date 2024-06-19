const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const db = require('./db');
const saveUser = require('./saveUser');
const twilio = require('twilio');
const accountSid = 'AC0202e7a70e05d86934f3924ab0888458'; // Seu Account SID da Twilio
const authToken = 'd854603a294c87444311db40e850b8f9';   // Seu Auth Token da Twilio

const client = new twilio(accountSid, authToken);

// Para iniciar nodemon twilio.js
// Para iniciar o ngrok, ngrok http 3000

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar o body parser para processar POST requests como JSON
app.use(bodyParser.json());

// Rota para receber webhooks do Twilio Studio
app.post('/webhook', (req, res) => {
    const fromNumber = req.body.From;
    const name = req.body.userInput;

    if (fromNumber) {
        console.log("Número recebido:", fromNumber);
        storedNumber = fromNumber;
    }

    if (name === null || name === undefined) {
        nome = null;
    } else {
        nome = name;
    }

    if (nome && storedNumber) {
        console.log("Nome recebido:", nome);
        const fromNumberCopy = storedNumber;
        saveUser(fromNumberCopy, nome)
            .then(numberExist => {
                storedNumber = null;
                console.log(numberExist);
                if (numberExist === true) {
                    res.sendStatus(404)
                    client.messages.create({
                        body: 'Numero ja cadastrado',
                        to: `${fromNumberCopy}`,  // Número do destinatário
                        from: '+1(415)523-8886' // Seu número na Twilio
                    })
                    .then((message) => console.log(message.sid))
                    .catch((error) => console.error(error));
                } else {
                    res.sendStatus(200);
                }
            })
            .catch(err => {
                // lidar com o erro
            });
    }

    res.sendStatus(200);
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}/webhook`);
});
