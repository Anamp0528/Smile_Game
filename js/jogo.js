//declaraçao das variaveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

// captura os botoes pelos ids e adiciona um evento de clique
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('jogarnovamente');

// função que zera os valores das variáveis controladoras
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;
  jogarNovamente();
  atualizaPlacar(0, 0);
  btnJogarNovamente.className = 'visivel';
  btnReiniciar.className = 'invisivel';
}

// função jogar novamente
function jogarNovamente() {
  jogar = true;
  let divis = document.getElementsByTagName("div");
  for (let i = 0; i < divis.length; i++) {
    if (divis[i].id == 1 || divis[i].id == 2 || divis[i].id == 3 || divis[i].id == 4 || divis[i].id == 5) {
      divis[i].className = "inicial";
      divis[i].innerHTML = divis[i].id;
    }
  }

  let imagem = document.getElementById("imagem");
  if (imagem != null) {
    imagem.remove();
  }

  let imagemErro = document.getElementById("imagemErro");
  if (imagemErro != null) {
    imagemErro.remove();
  }
}

// função que atualiza o placar
function atualizaPlacar(acertos, tentativas) {
  desempenho = (acertos / tentativas) * 100;
  document.getElementById("resposta").innerHTML =
    " Acertos: " + acertos +
    " Tentativas: " + tentativas +
    " Desempenho: " + Math.round(desempenho) + "%";
}

// função unificada para mostrar resultado
function mostrarResultado(obj, acertou) {
  obj.innerHTML = "";
  obj.className = acertou ? "acertou" : "errou";

  const img = new Image(100);
  img.id = acertou ? "imagem" : "imagemErro";
  img.src = acertou
    ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBBizV7-xFBv7Fq1oll4F1QVqGqO_0mcy8rA&s"
    : "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQUEQYeiKkhn687htVNpGATyROPyOpuBIyrRpJrWMXaa1p-w5dFOT-z_znAjv0Tw8LC9nopCkxT-mGLoJZJt1RISSSlXVE5_mzjQAt2QzIC5Q";

  obj.appendChild(img);
}

// função que verifica se acertou
function verifica(obj) {
  if (jogar) {
    jogar = false;
    tentativas++;

    if (tentativas == 5) {
      btnJogarNovamente.className = 'invisvel';
      btnReiniciar.className = 'visivel';
    }

    let sorteado = Math.floor(Math.random() * 5);

    if (obj.id == sorteado) {
      mostrarResultado(obj, true);
      acertos++;
    } else {
      mostrarResultado(obj, false);
      const objSorteado = document.getElementById(sorteado);
      mostrarResultado(objSorteado, true);
    }

    atualizaPlacar(acertos, tentativas);
  } else {
    alert('Clique em "Jogar novamente"');
  }
}

// adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);