/*************************
  * Objetivo: Projeto Final
  * Data: 29/11/2024
  * Autor: Rafa
  * Versão: 1.0
*************************/

var alunos = require ('./alunos')
var cursos = require ('./cursos')

const listarCursos = function(){
    let curse = []
    
    cursos.cursos.forEach(function(item){
        curse.push(item)
    })
    return curse
}
//console.log(listarCursos())

const listarAlunos = function(){
    let aluno = []

    alunos.alunos.forEach(function(item){
        aluno.push(item)
    })
    return aluno
}
//console.log(listarAlunos())

const getMatriculaAlunos = function(matricula){
    let entrada = String(matricula)
    let registro = null

    alunos.alunos.forEach(function(item){
        if(item.matricula === entrada){
            registro = item
        }
    })
    return registro
}
//console.log(getMatriculaAlunos('20151001001'))

const getAlunosCurso = function(curso) {
    let listaCursos = String(curso).toUpperCase()
    let alunosdoCurso = []

    alunos.alunos.forEach(function(item) {
        item.curso.forEach(function(nomeCurso) {
            if(listaCursos == nomeCurso.sigla) {
                alunosdoCurso.push(
                                    {
                                        foto: item.foto,
                                        nome: item.nome,
                                        matricula: item.matricula,
                                        sexo: item.sexo,
                                        curso: nomeCurso.sigla,                                       
                                        status: item.status
                                    }
                                    )
            }
        })
    })
    return alunosdoCurso
}
//console.log(getAlunosCurso('ds'))

const getAlunosStatus = function(status){
    let entradaStatus = String(status).toUpperCase()
    let registro = {
        status: entradaStatus,
        alunos: []
    }
    alunos.alunos.forEach(function(item){
        if(String(item.status).toUpperCase()===entradaStatus){
            item.curso.forEach(function(siglaCurso){
                registro.alunos.push({
                    matricula: item.matricula,
                    nome: item.nome,
                    curso: siglaCurso.sigla
            })
           
            })
        }
    })
    return registro.alunos.length > 0 ? registro: "Nenhum aluno encontrado com o status especificado"
}
//console.log(getAlunosStatus('Cursando'))

const getAlunosPorCursoEStatus = function(curso, status) {
        let cursoDoAluno = String(curso).toUpperCase()
        let statusDoAluno = String(status).toUpperCase()
        let registro = []
        let validacao = false
    
        alunos.alunos.forEach(function(item) {
            item.curso.forEach(function(sgl) {
                if(cursoDoAluno == sgl.sigla.toUpperCase()) {
                    let aluno = {
                                    foto: item.foto,
                                    nome: item.nome,
                                    matricula: item.matricula,
                                    sexo: item.sexo,
                                    curso: {
                                                nome: sgl.nome,
                                                sigla: sgl.sigla,
                                                icone: sgl.icone,
                                                carga: sgl.carga,
                                                conclusao: sgl.conclusao,
                                                disciplinas: []
                                            },
                                }
                    sgl.disciplinas.forEach(function(stsDis) {
                        if(statusDoAluno == stsDis.status.toUpperCase()) {
                            aluno.curso.disciplinas.push(
                                                    {
                                                        nome: stsDis.nome,
                                                        carga: stsDis.carga,
                                                        media: stsDis.media,
                                                        status_disciplina: stsDis.status
                                                    }
                                                )
                        }                                                          
                            validacao = true     
                    })
                    if (aluno.curso.disciplinas.length > 0) {
                        registro.push(aluno)
                    }
                }
            })
        })
        if(validacao == true) {
            return registro
        } else {
            return false
        }
  };
  
//console.log(getAlunosPorCursoEStatus('DS', 'exame'));

const getAlunosMatriculadosCurso = function(curso, ano) {
    let cursoA = String(curso).toUpperCase()
    let registro = []
    let validacao = false

    alunos.alunos.forEach(function(item){
        item.curso.forEach(function(siglaCurso){
            if(cursoA == siglaCurso.sigla.toUpperCase()) {
                if(ano == siglaCurso.conclusao) {
                    registro.push(item)
                    validacao = true
                }
            }
        })
    })
    if(validacao == false) {
        return validacao
    } else {
        return registro
    }
}

//console.log(getAlunosMatriculadosCurso('ds', 2024))

module.exports = {
    listarCursos,
    listarAlunos,
    getMatriculaAlunos,
    getAlunosCurso,
    getAlunosStatus,
    getAlunosPorCursoEStatus,
    getAlunosMatriculadosCurso
}