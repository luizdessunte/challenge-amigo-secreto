// Array para armazenar os nomes dos amigos
let amigos = [];

// Função para adicionar um novo amigo à lista
function adicionarAmigo() {
  // Captura o valor do campo de entrada e remove espaços extras
  let nomeAmigo = document.getElementById("amigo").value.trim();

  // Valida se o campo está vazio
  if (nomeAmigo === "") {
    alert("Por favor, insira um nome.");
    return; // Interrompe a execução se não for informado nome
  }

  // Verifica se o nome já foi adicionado (ignorando letras maiúsculas/minúsculas)
  if (amigos.some((amigo) => amigo.toLowerCase() === nomeAmigo.toLowerCase())) {
    alert("Este nome já foi adicionado!");
    return;
  }

  // Adiciona o nome válido ao array de amigos usando .push()
  amigos.push(nomeAmigo);

  // Limpa o campo de entrada redefinindo para string vazia
  document.getElementById("amigo").value = "";

  // Reposiciona o cursor no campo de entrada
  document.getElementById("amigo").focus();

  // Atualiza a lista de amigos na interface
  atualizarLista();
}

function atualizarLista() {
  // Seleciona o elemento da lista HTML (ul) pela ID "listaAmigos"
  let listaAmigos = document.getElementById("listaAmigos");

  // Limpa a lista anterior para evitar duplicados
  listaAmigos.innerHTML = "";

  // Percorre cada nome do array 'amigos'
  amigos.forEach(function (amigo) {
    // Cria um novo elemento de lista (li) para cada amigo
    let itemLista = document.createElement("li");

    // Define o texto do item da lista como o nome do amigo
    itemLista.textContent = amigo;

    // Adiciona o item da lista à lista de amigos
    listaAmigos.appendChild(itemLista);
  });

  // Se houver ao menos um nome, mostra o quadrado; caso contrário, oculta-o
  let resultadoElement = document.getElementById("resultado");
  if (amigos.length > 0) {
    resultadoElement.style.display = "block";
  } else {
    resultadoElement.style.display = "none";
  }
}

// Foi adicionada esta função para embaralhar uma array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function sortearAmigo() {
  if (amigos.length < 3) {
    alert("É necessário inserir pelo menos 3 nomes para iniciar o sorteio!");
    return;
  }
  let sorteados = amigos.slice();
  do {
    shuffleArray(sorteados);
  } while (sorteados.some((nome, i) => nome === amigos[i]));

  let resultadoElement = document.getElementById("resultado");
  resultadoElement.innerHTML = "";
  for (let i = 0; i < amigos.length; i++) {
    let itemResultado = document.createElement("li");
    itemResultado.innerHTML = `${amigos[i]} <span class="highlight-sorteou">Sorteou</span> ${sorteados[i]}`;
    resultadoElement.appendChild(itemResultado);
  }
}

function reiniciarJogo() {
  // Reinicia o array de amigos e limpa a interface
  amigos = [];
  document.getElementById("listaAmigos").innerHTML = "";
  document.getElementById("resultado").innerHTML = "";
}

// Modal: open automatically when page loads (optional)
window.addEventListener("load", function () {
  document.getElementById("modalSobre").style.display = "block";
});

// Modal: open when clicking the "Sobre" link
document
  .getElementById("openModal")
  .addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("modalSobre").style.display = "block";
  });

// Modal: close when clicking on the close button
document.querySelector(".modal-close").addEventListener("click", function () {
  document.getElementById("modalSobre").style.display = "none";
});

// Modal: close when clicking outside the modal content
window.addEventListener("click", function (event) {
  if (event.target === document.getElementById("modalSobre")) {
    document.getElementById("modalSobre").style.display = "none";
  }
});
