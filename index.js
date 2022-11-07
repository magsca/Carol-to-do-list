//getElementById usado para localizar e retornar um elemento HTML baseado no valor de sua propriedade id
//Cria uma variável LISTA, NOMETAREFA que armazena o elemento id passado como parâmetro LISTA-TAREFA
const lista = document.getElementById("lista-tarefas")
const nomeTarefa = document.getElementById("nome-tarefa")
//apenas sequências de caracteres podem ser armazenadas com localStorage para guardar um objeto, primeiro deverá converter esse objeto em string
//JSON.parse() LÊ UM ITEM recebe uma string JSON e a transforma em um objeto JavaScript
//JSON.stringify() CRIA UM ITEM
//LocalStorage JavaScript armazena dados localmente no navegador do usuário e pode adquirir acesso a esses dados praticamente em tempo real
//Os dados são mantidos até que o usuário, ou aplicativo web, limpe o cache do navegador.
const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [ ]// está acessando o localStorage, pegando a string TAREFAS e transformando em objeto 

const iniciar = () => {
//Adiciona as tarefas do local storage na lista
//forEach percorre cada tarefa e executa a função abaixo para cada elemento.
    tarefas.forEach((tarefa) => {
        const item = novoItem(tarefa);
        lista.appendChild(item); //acrescenta novo item na lista
        adicionaEventos(tarefa); 
    });
};

const adicionarTarefa = () => {
//checa se o campo de texto não está vazio
if (nomeTarefa.value.length > 0) {
//cria um novo objeto tarefa
const novaTarefa = novoObjetoTarefa(nomeTarefa.value);

//cria novo item HTML para a lista
const item = novoItem(novaTarefa);
lista.appendChild(item); //acrescenta este item na lista
adicionaEventos(novaTarefa);
atualizaLocalStorage();
nomeTarefa.value = "";
}
};

const novoObjetoTarefa = (tarefa, status = "incompleto") => {
    const novoObjetoTarefa = {
        id: Date.now(),
        tarefa,
        status,
    };
// adiciona à lista de tarefas
tarefas.push(novoObjetoTarefa);
return novoObjetoTarefa;
};

const novoItem = (tarefa) => {
//cria os elementos HTML a serem adicionados
const li = document.createElement("li");
const span = document.createElement("span");
const checkBox = document.createElement("input"); //criando a função do botão com checkbox
const botaoDeletar = document.createElement("button") //criando a função botão para deletar
span.innerText = tarefa.tarefa; //inner.Text retorna somente o texto, sem formatações ou elementos html
checkBox.type = "checkbox";
botaoDeletar.innerText = "X";
botaoDeletar.className = "delete";

//setAttribute adiciona/ modifica o valor de um atributo.
li.setAttribute("id", tarefa.id); 

//Se a tarefa estiver completa, marca o checkbox e adicionar a classe "completa"
if (tarefa.status === "completo") {
checkBox.checked = true;
span.className = "completa";
} else { //PQ "" VAZIO ABAIXO
checkBox.checked = false;
span.className = "";
}
//Adiciona os elementos criados na lista
li.appendChild(checkBox);
li.appendChild(span);
li.appendChild(botaoDeletar);

return li;
};

const adicionaEventos = (tarefa) => {
const elemento = document.getElementById(tarefa.id);
const checkBox = elemento.querySelector("input[type=checkbox]");
const botaoDeletar = elemento.querySelector("button.delete");
const span = elemento.querySelector("span");

    //Adiciona evento ao checkbox; addEvent - Adiciona uma função que será disparada quando ocorrer determinado evento no objeto.
    checkBox.addEventListener("change", () => {
        if (checkBox.checked) {
            span.className = "completa";
            tarefa.status = "completo";
        } else {
            span.className = "";
            tarefa.status = "incompleto";
        }
// update tarefas agora com valor
tarefas.find((t) => t.id === tarefa.id).status = tarefa.status;

atualizaLocalStorage();
});

//adiciona evento ao botão de deletar
botaoDeletar.addEventListener("click", () => {
//remove o elemento da lista
elemento.remove();
//remove o elemento da lista de tarefas
tarefas.splice(tarefas.indexOf(tarefa), 1);

atualizaLocalStorage();
});
};

const atualizaLocalStorage = () => {
    //atualiza o local storage com a lista de tarefas
    localStorage.clear();
    console.log("🚀 ~ atualizaLocalStorage ~ tarefas", tarefas);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

iniciar();
