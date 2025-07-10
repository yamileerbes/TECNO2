class rombos{
      
  constructor(pX,pY,sColor){
      this.x = pX;
      this.y = pY;
      this.mod = cambioLugar/50;
      this.ancho = 30+this.mod;
      this.valor = sColor;
      this.colorFinal = color(0,0,0);

  }
  
  dibujar(){
    push();
    if(this.valor == 0){
      this.colorFinal = color(0,0,0);
    } else if(this.valor == 1){
      this.colorFinal = color(0,0,100);
    } else if(this.valor == 2){
      this.colorFinal = color(160,50,80);
    }
      //mapeo la sicion del mouseY en el height y te devuelve un angulo pi
     let angulo =0 ;
        if (detectagrave > 1){
      angulo = 180;
     }  if (detectagrave > 2){
      angulo = 0;
     }  if (detectaagudo >= 3){
      angulo = 180;
     }  if (detectaagudo >= 4){
      angulo = 0;
     } 
     //hago que el 0,0 este en el centro de cada rombo
    translate(64 + this.x - this.mod + this.ancho, 94 + this.y );
    //ROTAN LOS ROMBOSS  
    rotate(0+angulo);
        
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
