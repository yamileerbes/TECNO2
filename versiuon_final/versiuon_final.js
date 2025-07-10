
// variables de configuracion

let AMP_MIN = 0.001;
let AMP_MAX = 0.1;
let audioContext;

//variables para controlar el sonido
let mic, fft;
let amp = 0.01;
let gestorSenial; // declarando un gestor de señal para amortitguar, suavizar o filtrar la señal de amplitud
let ampCruda; // variable para almacenar la amplitud del sonido de entrada SIN PROCESAR / DIRECTA DEL MIC
let amortguacion = 0.95; //calibrar el factor (porcentaje) de amortiguación (0 = nada amortiguado || 1 = todo amoritiguado)
let detectagrave;
 let detectaagudo;

//Cambia el tamaño de la grilla

let anchocuadros = 114;
let anchorombos = 57;

// variables de color y modificacion

let cambioColorGlobal; //hace que los cuadrados y rombos cambien de color y ligeramente de brillo
let saturacionRombos = []; //selecciona que rombos son blancos, negros o de color
let coloresCuadros = []; //almacena los colores asignados a cada cuadrado
let cantidad = 3;
let mosaicosPNG = [];
 

/*PRELOAD/////////////////////////////////////////////////////////////////////////////////////////*/

function preload(){
  
  for( let i=0 ; i<cantidad ; i++ ){
   let nombre = "data/mosaico"+nf( i )+".png";
   mosaicosPNG[i] = loadImage( nombre );
 }
}

/*SETUP///////////////////////////////////////////////////////////////////////////////////////////*/

function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 360, 100,100);
  audioContext = getAudioContext();
  mic = new p5.AudioIn(); // crear un nuevo objeto de tipo AudioIn
  mic.start(); // inicializo el audio incluyencto la función de analisis de frecuencia
   gestorAmp =  new GestorSenial(AMP_MIN, AMP_MAX); // inciializo el gestor de amplitud con los umbrales mínimo y máximo de la señal de entrada
  gestorAmp.f = amortguacion;
  userStartAudio();
    // Inicializa el fft para analizar las frecuencias
  fft = new p5.FFT();
  fft.setInput(mic);


 
  

  // Pre-asignamos los colores para todos los cuadrados
  for (let x1 = 0; x1 < anchocuadros*16; x1 += anchocuadros) {
    for (let y1 = 0; y1 < anchocuadros*8; y1 += anchocuadros*2) {
      coloresCuadros.push(random());
    }
  }
  
  
  // Pre-asignamos los colores para todos los rombos

  for (let x = anchorombos-anchorombos/3; x < anchorombos*12; x += anchorombos*2) {
    for (let y = anchorombos-anchorombos/3; y < anchorombos*12; y += anchorombos*2) {
      saturacionRombos.push(random([0, 1, 2]));
    } 
  }
}

/*DRAW/////////////////////////////////////////////////////////*/

function draw() {
  background(0)

  //amp = mic.getLevel();
if (mic){
ampCruda = mic.getLevel(); // señal de entrada de mic DIRECTA
}
  gestorAmp.actualizar(ampCruda); // el gestor está procesando la señal de entrada (ampmlitud cruda / directa)
  amp = gestorAmp.filtrada; // cargo en mi variable amp la señal ya filtrada/amortiguada que me devuelve el gestor

  // Analizar las frecuencias
  let spectrum = fft.analyze();

  // Detecta y devuelve valor de graves y agudos 
  let grave = fft.getEnergy(20, 200); 
  let agudo = fft.getEnergy(300, 600); 
   detectagrave = map(grave,20,200,0,3);
  detectaagudo = map(agudo,400,900,3,6);
console.log(detectagrave + "," + detectaagudo);
 // cambioColorGlobal= map(amp,AMP_MIN,AMP_MAX,0,200);

  cambioColorGlobal= map(amp,0,1,0,255);
  cambioLugar=  map(amp,0,1,0,255);
  cuadros1();
  rombo(); 


/*LOS MARQUITOS, SE PORTAN MUY BIEN Y NO DAN PROBLEMAS*/
  marcos(41,8,96,150);
  marcos(165,2,83,105);
  fill(255);

}


/*FUNCION DE LOS MARCOS, HACE LOS MARCOS (DUH)////////////////////////////////////////////////////*/

function marcos(color,saturacion,brillo,grosor){
  push();
  stroke(color,saturacion,brillo)
  strokeWeight(grosor);
  line(0,0,width,0)
  line(width,0,width,height);
  line(width,height,0,height);
  line(0,height,0,0);
  pop();
}

/*FUNCION DE LOS CUADRADOS, HORIZONTALES Y DESPUES VERTICALES////////////////////////////////////*/

function cuadros1() {
  let index = 0;
  let cambioSecuencia = 0;
  for (let x1 = 0; x1 < anchocuadros * 4; x1 += anchocuadros) {
    for (let y1 = 0; y1 < anchocuadros * 4; y1 += anchocuadros) {
      const cuadro = new cuadros(
        x1 + 75,
        y1 + 75,
        cambioSecuencia % mosaicosPNG.length // asigna 0 1 2 3 0 1 2 3
      );
      cuadro.dibujar();
      cambioSecuencia++;
    }
  }
}

/*FUNCION DE LOS ROMBOS/////////////////////////////////////////////////////////////////////////*/

function rombo() {
  let index = 0;
  for (let x = anchorombos-anchorombos/3; x < anchorombos*8; x += anchorombos*2) {
    for (let y = anchorombos-anchorombos/3; y < anchorombos*8; y += anchorombos*2) {
      const rombo = new rombos(x, y, saturacionRombos[index++]);
      rombo.dibujar();
    }
  }
}
