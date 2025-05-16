    //declaraçao das variaveis globais
    let desempenho = 0;
    let tentativas = 0;
    let acertos = 0;
    let jogar = true;

    //captura os botoes pelos ids e adiciona um evento de clique
    const btnReiniciar = document.getElementById('reiniciar');
    const btnJogarNovamente = document.getElementById('joganovamente');

    //funçao que zera os valores das variáveis controladoras
    function reiniciar() {
      desempenho = 0;
      tentativas = 0;
      acertos = 0;
      jogar = true;
      jogarNovamente();
      atualizaPlacar(0, 0);
      //mostra o botao jogarnovamente alterando a classe css (className)
      btnJogarNovamente.className = 'visivel';
      //oculta o botao reiniciar alterando a classe css (className)
      btnReiniciar.className = 'invisivel';
    }

    //funçao jogar novamente
    function jogarNovamente() {
      jogar = true;//variável jogar volta a ser verdadeira
      //armazenamos todas as div na variável divis (getElementsByTagName)
      let divis = document.getElementsByTagName("div");
      //percorremos todas as divs armazenadas
      for (i = 0; i < divis.length; i++) {
        //verificamos se sao as divs com ids 0 ou 1 ou 2
        if (divis[i].id == 1 || divis[i].id == 2 || divis[i].id == 3 || divis[i].id == 4 || divis[i].id == 5){
          //alteramos a classe css das divs 0, 1 e 2 (className)
          divis[i].className = "inicial";
          divis[i].innerHTML = divis[i].id;
        }
        
      }

      //armazenamos a imagem do Smile na variável imagem (getElementById)
      let imagem = document.getElementById("imagem");
      //se a imagem nao for vazia (se ela existir)
      if (imagem != "") {
        //removemos a imagem do Smile,
        imagem.remove();
      }
      let imagemErro = document.getElementById("imagemErro");
      //se a imagem nao for vazia (se ela existir)
      if (imagemErro != "") {
        //removemos a imagem do Smile
        imagemErro.remove();
      }
      
    }

    //funçao que atualiza o placar
    function atualizaPlacar(acertos, tentativas) {
      //calcula o desempenho em porcentagem
      desempenho = (acertos / tentativas) * 100;
      //escreve o placar com os valores atualizados (innerHTML)
      document.getElementById("resposta").innerHTML = "Placar - Acertos: " + acertos + " Tentativas: " + tentativas + " Desempenho: " + Math.round(desempenho) + "%";

    }
   
    

    //funçao executada quando o jogador acertou
    function acertou(obj) {
      //altera a classe CSS da <div> escolhida pelo jogador (className)
      obj.className = "acertou";
      //Criar uma constante img que armazena um novo objeto imagem com largura de 100px
      const img = new Image(100);
      img.id = "imagem";
      //altera o atributo src (source) da imagem criada
      img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBBizV7-xFBv7Fq1oll4F1QVqGqO_0mcy8rA&s";
      //adiciona a imagem criada na div (obj) escolhida pelo jogador (appendChild)
      obj.appendChild(img);
    }
    function errou(obj) {
      obj.innerHTML="";
      obj.className = "errou";
      const img = new Image(100);
      img.id = "imagemErro";
      img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Red_X.svg/1024px-Red_X.svg.png"; // Imagem de erro
      obj.appendChild(img);
    }

    
    //Função que sorteia um número aleatório entre 0 e 2 e verifica se o jogador acertou
    function verifica(obj) {
      if (jogar) {
        jogar = false;
        tentativas++;
        
        let sorteado = Math.floor(Math.random() * 6);
        if (obj.id == sorteado) {
          acertou(obj);
          acertos++;
        } else {
          errou(obj);
          const objSorteado = document.getElementById(sorteado);
          acertou(objSorteado);
        }
        atualizaPlacar(acertos, tentativas);
if (tentativas == 5) {
  btnJogarNovamente.className = 'invisvel';
  btnReiniciar.className = 'visivel';
}

      } else {
        alert('Clique em "Jogar novamente"');
      }
    }

//adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);