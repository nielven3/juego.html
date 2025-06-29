document.addEventListener('DOMContentLoaded', () => {
  // 📦 Referencias del DOM
  const tina = document.getElementById('doña-tina');
  const donLucho = document.getElementById('don-lucho');
  const container = document.getElementById('game-container');
  const tecito = document.getElementById('tecito');
  const calcetin1 = document.getElementById('calcetin1');
  const mensaje = document.getElementById('mensaje');
  const energiaBarra = document.getElementById('energia');
  const rejilla = document.getElementById('rejilla');
  const closet = document.getElementById('closet');
  const puerta = document.getElementById('puerta-electrica');
  const enfermera = document.getElementById('enfermera');
  const tiempoRestante = document.getElementById('tiempo-restante');

  // ⚙️ Variables de estado
  let energia = 100;
  let tiempo = 90;
  let escondida = false;
  const moveStep = 20;

  // 🔍 Colisión rectangular
  function checkColision(a, b) {
    const r1 = a.getBoundingClientRect();
    const r2 = b.getBoundingClientRect();
    return !(r1.right < r2.left || r1.left > r2.right || r1.bottom < r2.top || r1.top > r2.bottom);
  }

  // ⏱️ Cronómetro de cuenta regresiva
  const cronometro = setInterval(() => {
    tiempo--;
    tiempoRestante.textContent = tiempo;
    if (tiempo <= 0) {
      clearInterval(cronometro);
      mensaje.textContent = '⏳ ¡Se acabó el tiempo!';
      setTimeout(() => location.reload(), 2000);
    }
  }, 1000);

  // 🎮 Movimiento de personajes
  document.addEventListener('keydown', (e) => {
    moverTina(e);
    moverLucho(e);
  });

  // 👵 Movimiento y lógica de Tina
  function moverTina(e) {
    const top = tina.offsetTop;
    const left = tina.offsetLeft;
    const rect = tina.getBoundingClientRect();

    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      switch (e.key) {
        case 'ArrowUp':    if (top > 0) tina.style.top = `${top - moveStep}px`; break;
        case 'ArrowDown':  if (top + rect.height + moveStep < container.clientHeight) tina.style.top = `${top + moveStep}px`; break;
        case 'ArrowLeft':  if (left > 0) tina.style.left = `${left - moveStep}px`; break;
        case 'ArrowRight': if (left + rect.width + moveStep < container.clientWidth) tina.style.left = `${left + moveStep}px`; break;
      }

      if (tecito && checkColision(tina, tecito)) {
        tecito.style.display = 'none';
        mensaje.textContent = '☕ ¡Tina se revitalizó!';
        tina.style.boxShadow = '0 0 12px 4px gold';
      }

      if (calcetin1 && checkColision(tina, calcetin1)) {
        energia -= 20;
        energiaBarra.value = energia;
        mensaje.textContent = '🧦 ¡Cuidado con los calcetines!';
        tina.style.backgroundColor = '#f08080';

        setTimeout(() => {
          tina.style.backgroundColor = '#dda15e';
          mensaje.textContent = '🔇 Muévete con cuidado, Tina…';
        }, 1500);

        if (energia <= 0) {
          mensaje.textContent = '😢 ¡Tina colapsó!';
          setTimeout(() => location.reload(), 1800);
        }
      }

      if (rejilla && checkColision(tina, rejilla)) {
        mensaje.textContent = '🌀 Tina se desliza por la rejilla…';
        tina.style.top = '40px';
        tina.style.left = '40px';
      }

      if (closet && checkColision(tina, closet)) {
        escondida = true;
        mensaje.textContent = '🫣 ¡Tina está escondida!';
        tina.style.opacity = '0.3';
      } else {
        escondida = false;
        tina.style.opacity = '1';
      }

      if (!escondida && enfermera && checkColision(tina, enfermera)) {
        mensaje.textContent = '🚨 ¡La enfermera te pilló!';
        setTimeout(() => location.reload(), 1500);
      }
    }
  }

  // 👨‍🔧 Movimiento de Don Lucho (WASD)
  function moverLucho(e) {
    if (!donLucho) return;
    const top = donLucho.offsetTop;
    const left = donLucho.offsetLeft;
    const rect = donLucho.getBoundingClientRect();

    switch (e.key.toLowerCase()) {
      case 'w': if (top > 0) donLucho.style.top = `${top - moveStep}px`; break;
      case 's': if (top + rect.height + moveStep < container.clientHeight) donLucho.style.top = `${top + moveStep}px`; break;
      case 'a': if (left > 0) donLucho.style.left = `${left - moveStep}px`; break;
      case 'd': if (left + rect.width + moveStep < container.clientWidth) donLucho.style.left = `${left + moveStep}px`; break;
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // 📦 Elementos del DOM
  const tina = document.getElementById('doña-tina');
  const donLucho = document.getElementById('don-lucho');
  const container = document.getElementById('game-container');
  const tecito = document.getElementById('tecito');
  const calcetin1 = document.getElementById('calcetin1');
  const mensaje = document.getElementById('mensaje');
  const energiaBarra = document.getElementById('energia');
  const rejilla = document.getElementById('rejilla');
  const closet = document.getElementById('closet');
  const enfermera = document.getElementById('enfermera');
  const puertaTina = document.getElementById('puerta-de-tina');
  const palancaTina = document.getElementById('palanca-tina');
  const puertaFinal = document.getElementById('puerta-final');
  const tiempoRestante = document.getElementById('tiempo-restante');

  // ⚙️ Variables
  let energia = 100;
  let escondida = false;
  let salidaDesbloqueada = false;
  let tiempo = 90;
  const moveStep = 20;

  // 🔍 Colisión
  function checkColision(a, b) {
    const r1 = a.getBoundingClientRect();
    const r2 = b.getBoundingClientRect();
    return !(r1.right < r2.left || r1.left > r2.right || r1.bottom < r2.top || r1.top > r2.bottom);
  }

  // ⏱️ Cronómetro
  const cronometro = setInterval(() => {
    tiempo--;
    if (tiempoRestante) tiempoRestante.textContent = tiempo;
    if (tiempo <= 0) {
      clearInterval(cronometro);
      mensaje.textContent = '⏳ ¡Se acabó el tiempo!';
      setTimeout(() => location.reload(), 2000);
    }
  }, 1000);

  // 🎮 Movimiento general
  document.addEventListener('keydown', (e) => {
    moverTina(e);
    moverLucho(e);
    revisarColisiones();
  });

  // 👵 Tina (flechas)
  function moverTina(e) {
    const top = tina.offsetTop;
    const left = tina.offsetLeft;
    const rect = tina.getBoundingClientRect();

    switch (e.key) {
      case 'ArrowUp': if (top > 0) tina.style.top = `${top - moveStep}px`; break;
      case 'ArrowDown': if (top + rect.height + moveStep < container.clientHeight) tina.style.top = `${top + moveStep}px`; break;
      case 'ArrowLeft': if (left > 0) tina.style.left = `${left - moveStep}px`; break;
      case 'ArrowRight': if (left + rect.width + moveStep < container.clientWidth) tina.style.left = `${left + moveStep}px`; break;
    }
  }

// 👴 Don Lucho (movimiento con WASD)
function moverLucho(e) {
  if (!donLucho) return;
  const top = donLucho.offsetTop;
  const left = donLucho.offsetLeft;
  const rect = donLucho.getBoundingClientRect();

  switch (e.key.toLowerCase()) {
    case 'w':
      if (top > 0) donLucho.style.top = `${top - moveStep}px`;
      break;
    case 's':
      if (top + rect.height + moveStep < container.clientHeight) donLucho.style.top = `${top + moveStep}px`;
      break;
    case 'a':
      if (left > 0) donLucho.style.left = `${left - moveStep}px`;
      break;
    case 'd':
      if (left + rect.width + moveStep < container.clientWidth) donLucho.style.left = `${left + moveStep}px`;
      break;
  }
}

// 💥 Revisión de colisiones y eventos de juego
function revisarColisiones() {
  // ☕ Té energizante
  if (tecito && checkColision(tina, tecito)) {
    tecito.remove();
    mensaje.textContent = '☕ ¡Doña Tina se revitalizó!';
    tina.style.boxShadow = '0 0 12px 4px gold';
  }

  // 🧦 Calcetín explosivo
  if (calcetin1 && checkColision(tina, calcetin1)) {
    energia -= 20;
    energiaBarra.value = energia;
    tina.style.backgroundColor = '#f08080';
    tina.style.boxShadow = '0 0 10px red';
    mensaje.textContent = '🧦 ¡Pisaste un calcetín ruidoso! Energía -20';

    setTimeout(() => {
      tina.style.backgroundColor = '#dda15e';
      tina.style.boxShadow = '0 0 5px #000';
      mensaje.textContent = '🔇 Muévete con cuidado…';
    }, 1500);

    if (energia <= 0) {
      mensaje.textContent = '😵 ¡Tina colapsó!';
      setTimeout(() => location.reload(), 2000);
    }
  }

  // 🫣 Escondite
  if (closet && checkColision(tina, closet)) {
    escondida = true;
    mensaje.textContent = '🫣 ¡Tina está escondida!';
    tina.style.opacity = '0.3';
  } else {
    escondida = false;
    tina.style.opacity = '1';
  }

  // 🚨 Enfermera robot
  if (!escondida && enfermera && checkColision(tina, enfermera)) {
    mensaje.textContent = '🚨 ¡La enfermera te pilló!';
    tina.style.backgroundColor = '#000';
    setTimeout(() => location.reload(), 1500);
  }

  // 🌀 Rejilla de escape
  if (rejilla && checkColision(tina, rejilla)) {
    mensaje.textContent = '🌀 Tina se desliza por la rejilla…';
    tina.style.top = '40px';
    tina.style.left = '40px';
  }

  // 🔧 Reparación de puerta (Don Lucho)
  if (puertaTina && checkColision(donLucho, puertaTina)) {
    puertaTina.classList.add('reparada');
    mensaje.textContent = '🔧 Don Lucho habilitó la puerta';
  }

  // ⚡ Activar palanca (Tina)
  if (palancaTina && checkColision(tina, palancaTina)) {
    palancaTina.classList.add('activada');
    salidaDesbloqueada = true;
    mensaje.textContent = '⚡ Tina activó la palanca';
  }

  // 🏁 Victoria
  if (
    checkColision(tina, puertaFinal) &&
    puertaTina.classList.contains('reparada') &&
    salidaDesbloqueada
  ) {
    puertaFinal.classList.add('abierta');
    mensaje.textContent = '🎉 ¡Victoria! Tina y Lucho escaparon 😄';
    clearInterval(cronometro);
    setTimeout(() => location.reload(), 4000);
  }
}

// 🌅 Recuerdo nostálgico (poder especial)
const btnNostalgia = document.getElementById('btn-nostalgia');

btnNostalgia.addEventListener('click', () => {
  document.body.style.filter = 'grayscale(80%) sepia(60%)';
  mensaje.textContent = '🎻 Doña Tina recuerda su juventud... ¡La enfermera se detiene!';

  if (enfermera) enfermera.style.animation = 'none';

  setTimeout(() => {
    document.body.style.filter = 'none';
    if (enfermera) enfermera.style.animation = '';
  }, 3000);
});

// 🧭 Cámara sigue a Tina
tina.scrollIntoView({
  behavior: 'smooth',
  block: 'center',
  inline: 'center'
});

// 🎬 Inicio del nivel tras intro tipo cómic
const intro = document.getElementById('intro-comic');
const btnIniciar = document.getElementById('comenzar-juego');

btnIniciar.addEventListener('click', () => {
  intro.style.display = 'none';
});



 });

 const musica = document.getElementById('musica-fondo');
const btnMusica = document.getElementById('musica-toggle');

btnMusica.addEventListener('click', () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});
btnIniciar.addEventListener('click', () => {
  intro.style.display = 'none';
  musica.play();
});
function reproducirSonido(nombreArchivo) {
  const audio = new Audio(`sonidos/${nombreArchivo}`);
  audio.play();
}
if (tecito && checkColision(tina, tecito)) {
  tecito.style.display = 'none';
  mensaje.textContent = '☕ ¡Doña Tina se revitalizó!';
  tina.style.boxShadow = '0 0 12px 4px gold';
  reproducirSonido('toma-te.mp3');
}

if (!escondida && enfermera && checkColision(tina, enfermera)) {
  mensaje.textContent = '🚨 ¡La enfermera te vio!';
  tina.style.backgroundColor = '#000';
  reproducirSonido('grito-enfermera.mp3');
  setTimeout(() => location.reload(), 1500);
}
const llaveMaestra = document.getElementById('llave-maestra');

if (llaveMaestra && checkColision(tina, llaveMaestra)) {
  llaveMaestra.remove();
  mensaje.textContent = '🔑 ¡Tina encontró la llave maestra!';
  salidaDesbloqueada = true;
  puertaTina.classList.add('reparada'); // simula apertura
}
btnComenzar.addEventListener("click", iniciarJuego);
btnComenzar.addEventListener("touchstart", iniciarJuego);
function iniciarJuego() {
  document.getElementById("intro-comic").style.display = "none";
  document.querySelector("header").style.display = "block";
  document.getElementById("game-container").style.display = "block";
  document.getElementById("dialogo-box").style.display = "block";
  document.getElementById("controles-tactiles").style.display = "flex";
  document.getElementById("musica-toggle").style.display = "inline-block";
}













