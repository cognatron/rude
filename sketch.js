// Variables globales de p5.js:

/*global

preload,
createCanvas,
background,
push,
pop,
translate,
scale,
rotateX,
rotateY,
rotate,
loadImage,
image,
frameRate,
mouseMoved,
draw,
setup,

*/

////// Lienzo

var ancho = 400;
var alto = 400;

////// Personaje

var rude = {

  // Animación

  freqAnim: 3,
  cuadro: 0,
  varFrame: null,
  cicloG: [],
  cicloB: [],
  cabeza: null,
  anim: null,
  rot: null,

  // Dirección

  arribaTemp: null,
  abajoTemp: null,
  derechaTemp: null,
  izquierdaTemp: null,
  transX: null,
  transY: null,
  varX: null,
  varY: null,

  // Suavizado

  xG: 0,
  yG: 0,
  suavizado: 0.4, // 0.5


  // Función: control suavizado

  suave: function() {
    this.xG += (mouseX - this.xG) * this.suavizado;
    this.yG += (mouseY - this.yG) * this.suavizado;
  },

  // Función: define ciclo de animación

  camina: function() {
    this.anim = rude.cicloG[rude.cuadro];
  },

  // Función: control de personaje

  control: function() {

    // Abajo

    if (mouseY > pmouseY) {
      this.transX = 128;
      this.transY = 128;
      this.rot = PI;
      this.varX = -(this.xG);
      this.varY = -(this.yG);
      this.varFrame = this.anim;
      //
      this.arribaTemp = false;
      this.abajoTemp = true;
      this.derechaTemp = false;
      this.izquierdaTemp = false;
    }

    // Abajo reposo

    if (this.abajoTemp == true) {
      this.transX = 128;
      this.transY = 128;
      this.rot = PI;
      this.varX = -(this.xG);
      this.varY = -(this.yG);
      this.varFrame = this.cicloG[1];
    }

    // Arriba

    if (mouseY < pmouseY) {
      this.transX = -128;
      this.transY = -128;
      this.rot = null;
      this.varX = this.xG;
      this.varY = this.yG;
      this.varFrame = this.anim;
      //
      this.arribaTemp = true;
      this.abajoTemp = false;
      this.derechaTemp = false;
      this.izquierdaTemp = false;
    }

    // Arriba reposo

    if (this.arribaTemp == true) {
      this.transX = -128;
      this.transY = -128;
      this.varX = this.xG;
      this.varY = this.yG;
      this.varFrame = this.cicloG[1];
    }

    // Derecha

    if (mouseX > pmouseX) {
      this.transX = 128;
      this.transY = -128;
      this.rot = HALF_PI;
      this.varX = this.yG;
      this.varY = -(this.xG);
      this.varFrame = this.anim;
      //
      this.arribaTemp = false;
      this.abajoTemp = false;
      this.derechaTemp = true;
      this.izquierdaTemp = false;
    }

    // Derecha reposo

    if (this.derechaTemp == true) {
      this.transX = 128;
      this.transY = -128
      this.rot = HALF_PI;
      this.varX = this.yG;
      this.varY = -(this.xG);
      this.varFrame = this.cicloG[1];
    }

    // Izquierda

    if (mouseX < pmouseX) {
      this.transX = -128;
      this.transY = 128;
      this.rot = PI + HALF_PI;
      this.varX = -(this.yG);
      this.varY = this.xG;
      this.varFrame = this.anim;
      //
      this.arribaTemp = false;
      this.abajoTemp = false;
      this.derechaTemp = false;
      this.izquierdaTemp = true;
    }

    // Izquierda reposo

    if (this.izquierdaTemp == true) {
      this.transX = -128;
      this.transY = 128;
      this.rot = PI + HALF_PI;
      this.varX = -(this.yG);
      this.varY = this.xG;
      this.varFrame = this.cicloG[1];
    }
  },

  // Función: render

  render: function() {
    this.cabeza = h2;
    push();
    //Cuerpo
    translate(this.transX, this.transY);
    rotate(this.rot);
    image(this.anim, this.varX, this.varY);
    //Cabeza
    image(this.cabeza, this.varX, this.varY);
    pop();
  },

  // Función: loop de animación
  looping: function() {
    this.anim = this.cicloG[this.cuadro];
    this.cuadro++;
    if (this.cuadro == this.cicloG.length) {
      this.cuadro = 0;
    }
  }

}

////// Carga assets

function preload() {

  // Carga cabezas

  h2 = loadImage("assets/head-02.png");

  // Carga ciclo G

  for (var i = 0; i < rude.freqAnim; i++) {
    var nombreG = "assets/girl-walk-" + (i + 1) + ".png";
    rude.cicloG[i] = loadImage(nombreG);
    console.log(nombreG);
    console.log(rude.cicloG.length);
  }

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(14);
}


function draw() {
  background(220);

  push();
  rude.suave();
  rude.camina();
  rude.control();
  rude.render();
  pop();

}

function mouseMoved() {
  rude.looping();
}
