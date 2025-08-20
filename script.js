let tamanho;
let numNavios;
let navios = [];
let acertos = 0;
let fimDeJogo = false;
let tentativas = 0;
let musicaIniciada = false;

const nomeJogador = prompt("Qual seu nome, combatente?");
const musicaFundo = document.getElementById('musicaFundo');
const somAcerto = document.getElementById('somAcerto');
const somErro = document.getElementById('somErro');
const btnComecarJogo = document.getElementById('btnComecarJogo');
const somVitoria = document.getElementById('somVitoria');

let escolhaValida = false;
while(!escolhaValida) {
  const respostaNivel = prompt(
    "Escolha o nivel de dificuldade:\n\n" +
    "1 - Fácil (5x5, 3 navios)\n" +
    "2 - Médio (10x10, 8 navios) \n" +
    "3 - Dificil (15x15, 14 navios)"
  );

  switch(respostaNivel) {
    case '1':
      tamanho = 5;
      numNavios = 3;
      escolhaValida = true;
      console.log("Nivel Facil escolhido");
      break;
    case '2':
      tamanho = 10;
      numNavios = 8;
      escolhaValida = true;
      console.log("Nivel Medio escolhido");
      break;
    case '3':
      tamanho = 15;
      numNavios = 14;
      escolhaValida = true;
      console.log("Nivel Dificil escolhido")
      break;
    default:
      if(respostaNivel === null){
        alert("Jogo Cancelado. até a proxima, combatente");
        throw new Error("Jogo cancelado pelo usuario.")
      } else {
        alert("Opcao inválida! Pro favor, digite 1, 2 ou 3.");
      }
  }
}

btnComecarJogo.style.display = 'block';
btnComecarJogo.addEventListener('click', () => {
  musicaFundo.volume = 0.2;
  musicaFundo.play();

  btnComecarJogo.style.display = 'none';

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

  navios = gerarNavios();
}, { once: true});

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

  somVitoria.currentTime = 0;
  somVitoria.play();

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

    somAcerto.currenteTime = 0;
    somAcerto.play();

    if(acertos === numNavios) {
      fimDeJogo = true;
      reinciarJogo();
    }
  } else {
    console.log("Errou!");
    celula.textContent = '🌊';
    tentativas ++;

    somErro.currentTime = 0;
    somErro.play();
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
