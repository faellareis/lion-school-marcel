/*
Objetivo: API para manipular dados de alunos e cursos
Data: 04/12/2024
Autor: Rafa
Versão: 1.0
*/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Crontol-Allow-Methods', 'GET')

    app.use(cors())

    next()
})

let LionSchool = require('./modulo/funcoes.js')

app.get('/v1/lion-school/cursos',cors(),async function (request, response){

       let uf = request.params.sigla

        let dados = LionSchool.listarCursos(uf)
        
        if(dados){
            response.status(200)
            response.json(dados)
        }else{
            response.status(404) 
            response.json({'status': 404, 'message': 'Curso não localizado.'})
        }
   })

   app.get('/v1/lion-school/alunos/filtro', cors(), async function (request, response) {
    const status = request.query.status;
    const curso = request.query.curso;
    const statusB = request.query.statusB;
    const cursoB = request.query.cursoB;
    const ano = request.query.ano;

    let resultados = [];

    if (status) {
        // Chama a função para buscar alunos com o status especificado.
        const alunosStatus = LionSchool.getAlunosStatus(status);
         // Verifica se a função retornou resultados válidos.
         // Isso permite combinar os resultados de diferentes filtros em um único array.
        if (alunosStatus && alunosStatus.length > 0) resultados.push(...alunosStatus);
    }

    if (curso && statusB) {
        const alunosPorCursoEStatus = LionSchool.getAlunosPorCursoEStatus(curso, statusB);
        if (alunosPorCursoEStatus && alunosPorCursoEStatus.length > 0) resultados.push(...alunosPorCursoEStatus);
    }

    if (cursoB && ano) {
        const alunosMatriculados = LionSchool.getAlunosMatriculadosCurso(cursoB, ano);
        if (alunosMatriculados && alunosMatriculados.length > 0) resultados.push(...alunosMatriculados);
    }

    if (resultados.length > 0) {
        response.status(200).json(resultados);
    } else {
        response.status(404).json({ 'status': 404, 'message': 'Nenhum aluno encontrado com os critérios especificados.' });
    }
});

app.get('/v1/lion-school/alunos',cors(),async function (request, response){

    let uf = request.params.sigla

     let dados = LionSchool.listarAlunos(uf)
     
     if(dados){
         response.status(200)
         response.json(dados)
     }else{
         response.status(404) 
         response.json({'status': 404, 'message': 'Aluno não localizado.'})
     }
})

app.get('/v1/lion-school/alunos/cursos/:cursos',cors(),async function (request, response){

    let uf = request.params.cursos

     let dados = LionSchool.getAlunosCurso(uf)

     if(dados){
         response.status(200)
         response.json(dados)
     }else{
         response.status(404) 
         response.json({'status': 404, 'message': 'Curso não localizado.'})
     }
})

app.get('/v1/lion-school/alunos/:matricula',cors(),async function (request, response){

    let uf = request.params.matricula

     let dados = LionSchool.getMatriculaAlunos(uf)
     
     if(dados){
         response.status(200)
         response.json(dados)
     }else{
         response.status(404) 
         response.json({'status': 404, 'message': 'Aluno não localizado.'})
     }
})

app.get('/v1/lion-school/status/:curso/:status',cors(),async function (request, response) {
    
    let uf = request.params.curso
    let uf2 = request.params.status

    let dados = LionSchool.getAlunosPorCursoEStatus(uf, uf2)
     
     if(dados){
         response.status(200)
         response.json(dados)
     }else{
         response.status(404) 
         response.json({'status': 404, 'message': 'Status não localizado.'})
     }
})

app.get('/v1/lion-school/alunos/:curso/:ano',cors(),async function (request, response) {
    
    let uf = request.params.curso
    let uf2 = request.params.ano

    let dados = LionSchool.getAlunosMatriculadosCurso(uf, uf2)
     
     if(dados){
         response.status(200)
         response.json(dados)
     }else{
         response.status(404) 
         response.json({'status': 404, 'message': 'Status não localizado.'})
     }
})

app.listen('8080', function() {
    console.log('API aguardando requisições...')
})