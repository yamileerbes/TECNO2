class rombos{
      
  constructor(pX,pY,sColor){
      this.x = pX;
      this.y = pY;
      this.mod = cambioColorGlobal/50;
      this.ancho = 30+this.mod;
      this.valor = sColor;
      this.colorFinal = color(0,0,0);
    this.anguloActual = 0;
    this.anguloObjetivo = 0;
  }
  
  dibujar(){
    
    if(this.valor == 0 || this.valor == 3){
      this.colorFinal = color(0,0,0);
    } else if(this.valor == 1){
      this.colorFinal = color(0,0,100);
    } else if(this.valor == 2){
      this.colorFinal = color(200,84,62);
    }
    if (detectagrave > 1.9 ){
    this.anguloObjetivo = amp;
    }else{
      this.anguloObjetivo =0;
    }
    // Suavizamos la transición usando lerp
    this.anguloActual = lerp(this.anguloActual, this.anguloObjetivo, 0.5);  // podés cambiar 0.1 por 0.05 si querés más suavidad
console.log( this.anguloActual);
    push();
    translate(64 + this.x - this.mod + this.ancho, 94 + this.y);
    rotate(this.anguloActual);
    noStroke();
    fill(this.colorFinal);
    quad(
     -this.ancho - this.mod, 0,                 // izquierda
    0, -this.ancho - this.mod,                 // arriba
    this.ancho + this.mod, 0,                  // derecha
   0, this.ancho + this.mod                   // abajo
    );
    pop();
  }
}
