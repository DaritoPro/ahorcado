const botonIniciar = document.getElementById('botoniniciar');
const contenedorLetra = document.getElementById('contenedorLetra');
const letraIngresada = document.getElementById("inputLetra");
const imgAhorcado = document.getElementById("imgahorcado");

let juego = null; // Variable global para el estado del juego

const inicializarJuego = () => {
    const palabrasAdivinar = ["fortnite", "spiderman", "jojos", "balatro", "rey", "queen", "minecraft", "jugar", "tractor", "thanos", "esternocleidomastioideo"];
    const palabraA = palabrasAdivinar[Math.floor(Math.random() * palabrasAdivinar.length)];

    let palabraOculta = palabraA.split('');
    let letrasAdivinadas = palabraOculta.map(() => "_");
    let intentosRestantes = 6;
    let letrasIncorrectas = [];

    return {
        palabraOculta: palabraOculta,
        letrasAdivinadas: letrasAdivinadas,
        intentosRestantes: intentosRestantes,
        letrasIncorrectas: letrasIncorrectas
    };
};

const imgAhorcadoFn = (errores) => {
    const rutaImagenes = {
        6: '01.jpeg',
        5: '02.jpeg',
        4: '03.jpeg',
        3: '04.jpeg',
        2: '05.jpeg',
        1: '06.jpeg',
        0: '07.jpeg'
    };

    if (rutaImagenes.hasOwnProperty(errores)) {
        imgAhorcado.src = `./ahorcado-main/${rutaImagenes[errores]}`;
    } else {
        console.error("Número de errores no válido: ", errores);
    }
};

const actualizarJuego = (juego) => {
    document.getElementById('pAdivinar').innerHTML = `Palabra: ${juego.letrasAdivinadas.join(' ')}`;
    document.getElementById('nIntentos').innerHTML = `Intentos restantes: ${juego.intentosRestantes}`;
    document.getElementById('errores').innerHTML = `Letras incorrectas: ${juego.letrasIncorrectas.join(', ')}`;
    imgAhorcadoFn(juego.intentosRestantes);
};

const adivinarLetra = (juego, letra) => {
    letra = letra.toLowerCase();

    if (juego.palabraOculta.includes(letra)) {
        for (let i = 0; i < juego.palabraOculta.length; i++) {
            if (juego.palabraOculta[i] === letra) {
                juego.letrasAdivinadas[i] = letra;
            }
        }
    } else {
        if (!juego.letrasIncorrectas.includes(letra)) {
            juego.intentosRestantes--;
            juego.letrasIncorrectas.push(letra);
        }
    }

    if (juego.intentosRestantes === 0) {
        alert("¡Perdiste! El personaje está completamente ahorcado.");
        alert(`La palabra correcta era: ${juego.palabraOculta.join('')}`);
        letraIngresada.removeEventListener('keypress', teclaPresionada);
        botonIniciar.style.display = "block";
        contenedorLetra.style.display = "none";
        imgAhorcadoFn(0);
        return;
    } else if (!juego.letrasAdivinadas.includes("_")) {
        alert("¡Ganaste! Has adivinado la palabra correctamente.");
        letraIngresada.removeEventListener('keypress', teclaPresionada);
        botonIniciar.style.display = "block";
        contenedorLetra.style.display = "none";
        return;
    }

    actualizarJuego(juego);
};

const teclaPresionada = (event) => {
    if (event.key === "Enter") {
        const letra = letraIngresada.value.toLowerCase();
        if (!letra || letra === "") {
            alert("Por favor ingresa una letra válida");
            return;
        }

        if (letra.length !== 1 || !(/[a-zA-ZñÑ]/).test(letra)) {
            alert("Por favor ingresa una sola letra.");
            return;
        }

        adivinarLetra(juego, letra);
        letraIngresada.value = "";
    }
};

function empezar() {
    botonIniciar.style.display = "none";
    contenedorLetra.style.display = "block";
    imgAhorcado.style.display = "block";
    juego = inicializarJuego();
    actualizarJuego(juego);
    letraIngresada.value = "";
    letraIngresada.focus();
    letraIngresada.addEventListener('keypress', teclaPresionada);
}

botonIniciar.addEventListener('click', empezar);