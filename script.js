const botonempezar = document.getElementById("botoniniciar")
const contenedorletra = document.getElementById("contenedorletra")
const letraingresada = document.getElementById("inputletra")
const imgahorcado = document.getElementById("imgahorcado")

const inicializarJuego= () =>{
    const palabrasadivinar= ["fortnite", "spiderman", "jojos", "balatro"]
    const palabraA= palabrasadivinar[Math.floor(Math.random * palabrasadivinar.length)]

    let palabraOculta= palabraA.split('')
    let letrasAdivinadas = palabraOculta.map(()=> "_")
    let intentosRestantes = 6
    let letrasIncorrectas = []

    const objetodeljuego = {
        palabraOculta: palabraOculta,
        letrasAdivinadas: letrasAdivinadas,
        intentosRestantes: intentosRestantes,
        letrasIncorrectas: letrasIncorrectas
    }

    return objetodeljuego
}

const imgsahorcado= (errores)=> {
    const rutaImagenes ={
        5: '02.jpeg',
        4: '03.jpeg',
        3: '04.jpeg',
        2: '05.jpeg',
        1: '06.jpeg',
        0: '07.jpeg'
    }

    if(rutaImagenes.hasOwnProperty(errores)){
        imgahorcado.src = `./img-ahorcado-main${rutaImagenes[errores]}`
    }
    else {
        console.error("Numero de errores no valido: ", errores)
    }
}

const actualizarjuego = (juego) =>{
    document.getElementById('pAdivinar').innerHTML = `Palabra: $(juego.letrasAdivinadas.join(' '))}`
    document.getElementById('nIntentos').innerHTML =`Intentos restantes: $(juego.intentosRestantes}`
    document.getElementById('errores').innerHTML = `Letras incorrectas: $(juego.letrasIncorrectas.join(', '))}`
    imgahorcado(juego.intentosRestantes)
}

const adivinarLetrta = (juego, letra) =>{
    letra = letra.toLowerCase()

    if(juego.palabraOculta.incluides(letra)){
        for(let i=0; i < palabraOculta.length; i++){
            if(juego.palabraOculta[i]===letra){


            juego.letrasAdivinadas[i]= letra
            document.getElementById("inputLetra").value=""
        }
        }
    }else{
        juego.intentosRestantes--;
        juego.letrasIncorrectas.push(letra);
        imgahorcado(juego.intentosRestantes)
        document.getElementById("inputLetra").value="";
    }

    if (juego.intentosRestantes ==0) {
        alert("¡Perdiste! El personaje esta completamente ahorcado");
        alert(`La palabra correcta era: $juego.palabraOculta.join('')}`)

    }else if (!juego.letrasAdivinadas.incluides("_")){
        alert("¡Ganaste! has adivinado la palabra correctamente.")
    }

    actualizarinterfaz(juego);
};

const teclapresionada = (event) => {
    if (event.key == "Enter") {
        const letraingresada = letraingresada.value.toLowerCase
        if(letraingresada === null || letraingresada === ""){
            alert("por favor ingresa una letra valida");
        return;
    }

    if (letraingresada.lenght !==1 || !(/a-zA-Z/).test(letraingresada)) {
        alert("Por favor ingresa una sola letra.");
        return;

    }

    adivinarLetrta(juego, letraingresada);
    letraingresada.value = "";

    }
};

function empezar(){
    botoniniciar.style.display = "none";
    contenedorletra.style.display = "block";
    imgahorcado.style.display = "block";
    juego = inicializarJuego();

    letraingresada.addEventListener('keypress',  teclapresionada);
}

botoniniciar.addEventListener('click', empezar);