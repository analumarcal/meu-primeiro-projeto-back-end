const express = require("express");
const router = express.Router();

const app = express();
const porta = 3333;

const mulheres = [
    {
        nome: "Ana Marçal",
        imagem: "https://github.com/analumarcal.png",
        minibio: "Desenvolvedora de Software"
    },
    {
        nome: "Simara Conceição",
        imagem: "https://github.com/simaraconceicao.png",
        minibio: "Desenvolvedora e Instrutora"
    }
];

function mostrarMulheres(request, response) {
    response.json(mulheres);
}

function mostrarPorta() {
    console.log("Servidor criado e rodando na porta ", porta);
}

app.use(router.get("/mulheres", mostrarMulheres))
app.listen(porta, mostrarPorta);