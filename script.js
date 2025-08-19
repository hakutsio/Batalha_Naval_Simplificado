const nomeJogador = prompt("Qual seu nome, combatente?");

           const respostaTamanho = prompt("Digite o tamanho do tabuleiro: ", "5");
           const tamanho = parseInt(respostaTamanho);

//const tamanho = 5;
const numNavios = 3;
let navios = [];
let acertos = 0;
let fimDeJogo = false;
let tentativas = 0;



// Gerar tabuleiro (já implementado)
const tabuleiro = document.getElementById("tabuleiro");
       tabuleiro.style.gridTemplateColumns = `repeat(${tamanho}, 60px)`;
       tabuleiro.style.gridTemplateRows = `repeat(${tamanho}, 60px)`;  


for (let y = 0; y < tamanho; y++) {
  for (let x = 0; x < tamanho; x++) {
    const celula = document.createElement("div");
    celula.classList.add("celula");
    celula.dataset.x = x;
    celula.dataset.y = y;
    celula.addEventListener("click", aoClicarNaCelula);
    tabuleiro.appendChild(celula);
  }
}

function resetarTabuleiro(){
  acertos = 0;
  tentativas = 0;
  navios = gerarNavios();

  const todasAsCelulas = document.querySelectorAll('.celula');
  todasAsCelulas.forEach(celula => {
    celula.textContent = '';
    celula.classList.remove('clicada');
  });
}

function reinciarJogo() {
  if(tentativas < 2){
    setTimeout(() => {
      alert(`BOA, ${nomeJogador}! QUE MAAAAQUINAAA, UMA VERDADEIRA BESTAAA ENJAULADA apenas ${tentativas + acertos} jogadas!`)
      resetarTabuleiro();
    }, 500);
  } else if (tentativas >= 2 && tentativas < 10) {
    setTimeout(() => {
      alert(`foi bom, ${nomeJogador}, esperava mais, mais ok sei das suas limitações, foram um total de ${tentativas + acertos} jogadas`)
      resetarTabuleiro();
    }, 500);
  } else {
    setTimeout(() => {
      alert(`OXEE pensei que não ia acerta nunca, mais o que vale é a intenção não é mesmo ${nomeJogador}, parabens pelas ${tentativas + acertos} jogadas, apenas kkkkkk`)
      resetarTabuleiro();
    }, 500);
  }
}

// ==========================
// Função para gerar navios
// ==========================
// TODO: Gerar 3 posições aleatórias únicas para os navios
function gerarNavios() {
  const posicoes = [];

  while (posicoes.length < numNavios) {
    let x = Math.floor(Math.random() * tamanho);

    let y = Math.floor(Math.random() * tamanho);

    let posicaoJaExiste = false;

    for(let i = 0; i < posicoes.length; i++){
       const posicaoExiste = posicoes[i];

      if (posicaoExiste.x === x && posicaoExiste.y === y){
        console.log("encontrado uma duplicata gerando outro!!")
        posicaoJaExiste = true;
        break;
      }
    };

    if(posicaoJaExiste === false){
      posicoes.push({ x: x, y: y});
    }
  }

  console.log("posicoes aleatorias posicoes", posicoes);
  return posicoes; // Deve retornar array de objetos {x, y}
}

// Chamada inicial da função (não altere)
navios = gerarNavios();

// ==============================
// Função para tratar cliques
// ==============================
// TODO: Verificar se o clique foi acerto ou erro
// TODO: Marcar visualmente o resultado (💥 ou 🌊)
// TODO: Impedir clique repetido
// TODO: Encerrar jogo ao afundar todos os navios

function aoClicarNaCelula(event) {
  const celula = event.currentTarget;
  const x = parseInt(celula.dataset.x);
  const y = parseInt(celula.dataset.y);

  if(celula.classList.contains('clicada')) {
    console.log("Essa célula já foi clicada!");
    return;
  }

  celula.classList.add('clicada');
  console.log(`Você clicou na célula X: ${x}, Y:${y}`);

  const acertou = navios.some(navio => navio.x === x && navio.y === y);

  if(acertou){
    console.log("acertou!");
    celula.textContent = '💥';
    acertos ++;

    if(acertos === numNavios) {
      fimDeJogo = true;
      reinciarJogo();
    }
  } else {
    console.log("Errou!");
    celula.textContent = '🌊';
    tentativas ++;
  }
}
  // IMPLEMENTAR: lógica de verificação de acerto, erro, e finalização
// ==============================
// Testes Unitários no Console
// ==============================
// TODO: Testar se gerarNavios funciona corretamente
function testarGeracaoDeNavios() {
  const n = gerarNavios();

  // Teste 1 - quantidade correta
  console.log("Teste 1 - Quantidade correta:", n.length === numNavios);

  // Teste 2 - posições únicas
  const unicos = new Set(n.map(p => `${p.x},${p.y}`));
  console.log("Teste 2 - Sem repetições:", unicos.size === numNavios);

  // Teste 3 - dentro do tabuleiro
  const dentroDosLimites = n.every(p => p.x >= 0 && p.x < tamanho && p.y >= 0 && p.y < tamanho);
  console.log("Teste 3 - Dentro do tabuleiro:", dentroDosLimites);
}

// Descomente para testar
 //testarGeracaoDeNavios();
