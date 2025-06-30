let mic, fft;

function setup() {
  createCanvas(400, 400);

  // Inicializa el micrófono
  mic = new p5.AudioIn();
  mic.start();
   userStartAudio();
  // Inicializa el FFT (Fast Fourier Transform) para el análisis de frecuencias
  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  background(200);

  // Analizar las frecuencias
  let spectrum = fft.analyze();
  
  // Visualización del espectro de frecuencias
  noStroke();
  fill(0, 255, 0);
  
  // Dibujar el espectro
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let y = map(spectrum[i], 0, 255, height, 0);
    rect(x, y, width / spectrum.length, height - y);
  }

  // Detecta y devuelve valor de graves y agudos 
  let grave = fft.getEnergy(20, 200); 
  let agudo = fft.getEnergy(500, 1000); 
  
  fill(255, 0, 0);
  textSize(16);
  text("Graves: "+grave,10,30);
  text("Agudos: " +agudo,10,60);
}
