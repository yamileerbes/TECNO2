class cuadros {
  constructor(pX, pY, pCambio) {
    this.x = pX;
    this.y = pY;
    this.cambio = pCambio; // ya viene asignado
    
  }

  dibujar() {
    let angulo = 0;

    if (cambioLugar < 50) {
      angulo = 0;
    } else if (cambioLugar < 100) {
      angulo = HALF_PI;
    } else if (cambioLugar < 150) {
      angulo = PI;
    } else {
      angulo = PI + HALF_PI;
    }

    push();
    translate(this.x + anchocuadros / 2, this.y + anchocuadros / 2);
    rotate(angulo);
    imageMode(CENTER);
    image(mosaicosPNG[this.cambio], 0, 0, anchocuadros, anchocuadros);
    pop();
  }
}
