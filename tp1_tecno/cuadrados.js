class cuadros {
  constructor(pX, pY, pCambio) {
    this.x = pX;
    this.y = pY;
    this.cambio = pCambio; // ya viene asignado

  }

  dibujar() {
    
    push();
    translate(this.x + anchocuadros / 2, this.y + anchocuadros / 2);
    imageMode(CENTER);
    image(mosaicos0[this.cambio], 0, 0, anchocuadros, anchocuadros);
    pop();
  }
}
