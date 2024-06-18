const express = require("express"); //iniciando o express
const router = express.Router(); //configurando a primeira parte da rota
const { v4: uuidv4 } = require('uuid'); // iniciando o uuid
const cors = require('cors'); //trazendo o pacote cors, que permite consumir esta API no front end

const conectarBancoDeDados = require('./bancoDeDados'); // ligando ao arquivo banco de dados
conectarBancoDeDados(); // chamando a função que conecta banco de dados

const Mulher = require('./mulherModel');

const app = express(); //iniciando o app
app.use(express.json());
app.use(cors());

const porta = 3333; //criando a porta

//GET
async function mostrarMulheres(request, response) {
    try {
        const mulheresVindasDoBancoDeDados = await Mulher.find();

        response.json(mulheresVindasDoBancoDeDados);
    } catch (e) {
        console.log(e);
    }
}

//POST
async function criarMulher(request, response) {
    const novaMulher = new Mulher({
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao
    })

    try {
        const mulherCriada = await novaMulher.save();
        response.status(201).json(mulherCriada);
    } catch (e) {
        console.log(e);
    }
}

//PATCH
async function corrigirMulher(request, response) {
    try {
        const mulherEncontrada = await Mulher.findById(request.params.id);

        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome;
        }

        if (request.body.imagem) {
            mulherEncontrada.imagem = request.body.imagem;
        }

        if (request.body.minibio) {
            mulherEncontrada.minibio = request.body.minibio;
        }

        if (request.body.citacao) {
            mulherEncontrada.citacao = request.body.citacao;
        }

        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save();

        response.json(mulherAtualizadaNoBancoDeDados);
    } catch (e) {
        console.log(e);
    }
    
}

//DELETE
async function deletarMulher(request, response) {
    try {
        await Mulher.findByIdAndDelete(request.params.id);

        response.json({mensagem: "Mulher deletada com sucesso!"});
    } catch (e) {
        console.log(e);
    }
}

//PORTA
function mostrarPorta() {
    console.log("Servidor criado e rodando na porta ", porta);
}

app.use(router.get("/mulheres", mostrarMulheres)); //configurando rota GET /mulheres
app.use(router.post("/mulheres", criarMulher)); //configurando rota POST /mulheres
app.use(router.patch("/mulheres/:id", corrigirMulher)); //configurando rota PATCH /mulheres
app.use(router.delete("/mulheres/:id", deletarMulher)); //configurando rota DELETE /mulheres
app.listen(porta, mostrarPorta); //servidor ouvindo a porta