const express = require("express"); //iniciando o express
const router = express.Router(); //configurando a primeira parte da rota
const { v4: uuidv4 } = require('uuid'); // iniciando o uuid

const app = express(); //iniciando o app
app.use(express,express.json());
const porta = 3333; //criando a porta

//criando lista inicial de mulheres
const mulheres = [
    {
        id: '1',
        nome: "Ana Marçal",
        imagem: "https://github.com/analumarcal.png",
        minibio: "Desenvolvedora de Software"
    },
    {
        id: '2',
        nome: "Simara Conceição",
        imagem: "https://github.com/simaraconceicao.png",
        minibio: "Desenvolvedora e Instrutora"
    }
];

//GET
function mostrarMulheres(request, response) {
    response.json(mulheres);
}

//POST
function criarMulher(request, response) {
    const novaMulher = {
        id: uuidv4(),
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio
    }
    
    mulheres.push(novaMulher);

    response.json(mulheres);
}

//PORTA
function mostrarPorta() {
    console.log("Servidor criado e rodando na porta ", porta);
}

app.use(router.get("/mulheres", mostrarMulheres)); //configurando rota GET /mulheres
app.use(router.post('/mulheres', criarMulher)); //configurando rota post /mulheres
app.listen(porta, mostrarPorta); //servidor ouvindo a porta