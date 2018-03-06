var canvas = document.getElementById("canvas-jogo");
canvas.width = 480;
canvas.height = 320;
canvas.style.border = '1px solid black';
var contexto = canvas.getContext("2d"); 

/* VARIÁVEIS GLOBAIS */
//Posição inicial da bola
var x = canvas.width/2;
var y = canvas.height-30;

//Velocidade da bola
var dx = 2;
var dy = -2;

//Raio da bola
var raioBola = 10;

//Base (controlada pelo jogador)
var baseAltura = 10;
var baseLargura = 75;
var baseX = (canvas.width-baseLargura)/2;

//Estado dos controladores do jogo
var teclaEsquerdaPressionada = false;
var teclaDireitaPressionada = false;

function desenhaBola(){
	contexto.beginPath();
	contexto.arc(x, y, raioBola, 0, Math.PI*2);
	contexto.fillStyle = "#0095DD";
	contexto.fill();
	contexto.closePath();
}

function desenhaBase() {
  contexto.beginPath();
  contexto.rect(baseX, canvas.height-baseAltura, baseLargura, baseAltura);
  contexto.fillStyle = "#ff1200";
  contexto.fill();
  contexto.closePath();
}
	 
function desenha() {	
	contexto.clearRect(0, 0, canvas.width, canvas.height);
	desenhaBola();
	desenhaBase();
	//Colisão com borda direita e esquerda
	if(x + dx > canvas.width - raioBola || x + dx < raioBola){
    dx = -dx;
	}
	//Colisão com borda superior
	if(y + dy < raioBola){
		dy = -dy;
	}
	//Colisão com a borda inferior
	else if(y + dy > canvas.height - raioBola){
		//Caso esteja na direção da base, altera o movimento da bola
		if(x > baseX && x < baseX + baseLargura){
			dy = -dy;
		}
		//Senão termina o jogo
		else{
			//Imprime mensagem de gameover
			console.error("Fim do Jogo! Perdeu!");
			//Recarrega a página
			document.location.reload();
		}
	}
	
	x += dx;
  y += dy;

  	//Move a base controlada pelo jogador
	if(teclaDireitaPressionada && baseX < canvas.width - baseLargura){
		baseX += 7;
	}else if(teclaEsquerdaPressionada && baseX > 0){
		baseX -= 7;
	}
}

document.addEventListener("keydown", trataTeclaBaixo, false);
document.addEventListener("keyup", trataTeclaCima, false);

//Funções que tratam os eventos keydown e keyup
function trataTeclaBaixo(evento){
	//Se o keyCode == Seta para Direita
	if(evento.keyCode == 39) {
		teclaDireitaPressionada = true;
	}
	//Se o keyCode == Seta para Esquerda
	else if(evento.keyCode == 37){
		teclaEsquerdaPressionada = true;
	}
}

function trataTeclaCima(evento){
//Se o keyCode == Seta para Direita
  if(evento.keyCode == 39){
      teclaDireitaPressionada = false;
  }
//Se o keyCode == Seta para Esquerda
  else if(evento.keyCode == 37){
      teclaEsquerdaPressionada = false;
  }
}

function interactions(){
	var buttonPlay = document.querySelector('.btn-play');
	var allInputs = document.querySelectorAll('.menu-list input');

	allInputs.forEach(function(element, index){
		element.addEventListener('change', function(){
			dx = element.value;
			dy = - element.value;
			canvas.focus();
		});
	});
	buttonPlay.addEventListener('click', function(){
		setInterval(desenha, 10);
	});
}

interactions();