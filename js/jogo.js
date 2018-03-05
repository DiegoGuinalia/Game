var canvas = document.getElementById("canvas-jogo"); 
canvas.width = 480;
canvas.height = 320; 
var contexto = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var raioBola = 10;

function desenhaBola(){
 contexto.beginPath();
 contexto.arc(x, y, raioBola, 0, Math.PI*2);
 contexto.fillStyle = "#0095DD";
 contexto.fill();
 contexto.closePath();
}

function desenha() {	
	contexto.clearRect(0, 0, canvas.width, canvas.height);
	desenhaBola();
	//Colisão com borda direita e esquerda
	if(x + dx > canvas.width - raioBola || x + dx < raioBola){
	    dx = -dx;
	}
	 
	//Colisão com borda inferior e superior
	if(y + dy > canvas.height - raioBola || y + dy < raioBola){
	    dy = -dy;
	}
	x += dx;
  y += dy;
}

setInterval(desenha, 10);
