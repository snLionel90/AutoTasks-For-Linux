//HOUBA!! TTT sn.Lionel90
//https://editor.p5js.org/snLionel90/sketches/mvorvcOyr

let board = [ //este es ek tablero
  ['','',''],
  ['','',''],
  ['','','']
];

//variables de jugadores y disponibilidad
let players = ['X','O'];
let currentPlayer;
let available =[];

// en la funcion setup configura,os el panel
function setup() {
  createCanvas(400, 400);
  
  //asignamos una velocidad de fotogramas
  frameRate(3);
  
  //hacemos los turnos de cada jugador y el inicio de la partida de forma aleatoria
  currentPlayer = floor(random(players.length));

  //Activamos el casillero con doble iteradr for
  for (let j=0;j<3;j++){
    for (let i=0; i<3; i++){
      available.push([i,j]);
    }
  }
  
}

//creamos la funcion de igualar para todas las casillas
//asi se desterminara quien es el ganador

function equals(a,b,c){
  return  a==b && b==c && a !=''; //
}

//aahora instanciamos la funcion de comprobar e ganador 
function winCheck (){
  let winner = null; //a nulo
  //comprobamos si existen fichas iguales en:
  
  //alineacion horizontall
  
  for (let i=0; i<3; i++){
    if (equals(board[i][0],board[i][1],board[i][2])){
      winner = board [i][0];
      
    }
  }
  
  //alineacion vertical
  
  for (let i=0; i<3; i++){
    if (equals(board[0][i],board[1][i],board[2][i])){
      winner = board [0][i];
      
    }
  }
  
  //alineacion diagonal
  
    if (equals(board[0][0],board[1][1],board[2][2])){
      winner = board [0][0];
      
    }
    if (equals(board[2][0],board[1][1],board[0][2])){
      winner = board [2][0];
      
    }
    //si no hay ganador en ninguna de las formas o que da tablas, se reinicia el juego y continua la ronda
    //y si lo hay se detiene y muestra un cartel de GANADOR
    
    if (winner == null && available.length==0){
        return 'empate';
    }else{
        return winner;
    } 
}

//funcion de turno nuevo, para alternar los jugadores en la partida
function newTurn(){
      let index = floor(random(available.length));
      let spot = available.splice(index,1)[0];
      let i=spot[0];
      let j= spot[1];
      board [i][j] = players[currentPlayer];
      currentPlayer=(currentPlayer +1) % players.length; 
}
  
//en la funcion draw dibujamos el panel declarado anteriormente
function draw() {
  background(220);
  let w= width/3; //division horizontall
  let h= height/3; //division vertical
  strokeWeight(2); //grosor de lineas
  
  line (w,0,w, height); //lineas verticales
  line (w*2, 0, w*2, height)
  
  //lineas horizontales
  line (0,h,width,h);
  line (0,h*2,width,h*2);
  
  //definimos el punto y crux instanciandolo con bucle for
  for (let j=0;j<3;j++){
    for (let i=0;i<3;i++){
      let x = w*i +w/2;
      let y = h*j +h/2;
      let spot = board [i][j];
      textSize(30);
      
      //mostramos todo en pantalla
      let r=w/4;
      if (spot== players[1]){
        
        noFill();
        ellipse(x,y,r*2);
        
      }else if (spot==players[0]){
        line(x-r,y-r,x+r,y+r) //primera diagonal de la X
        line(x+r,y-r,x-r,y+r) //segunda diagonal de la X
      }
      
    }
  }
  
  //resultado de ganador o perdedor mostrado en pantalla usando una etiqueta HTML
  let result = winCheck();
  if (result !=null){
    noLoop(); //se corta el flujo 
    let resultP = createP('');
    resultP.style('font-size','32pt'); //tamaño de letra
    
    if (resultP =='empate'){ //si hay empate lo mustra en pantalla
      resultP.html('Empatee');
      
    }else {
      resultP.html('${result} Ganador!');
    }
    //dksjd
  } else{
    newTurn();
  }  
}