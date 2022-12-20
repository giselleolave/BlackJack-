
(()=>{
    'use strict'
    let deck         =[];
const tipos      = ['C','S','H','D'];
const especiales = ['A','J','Q','K'];

let puntosJugador =0,
    puntosComputadora=0;
//Referencias HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener   = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
const puntosHTML   = document.querySelectorAll('small');




//Crear nueva baraja
const crearDeck = () =>{

    for( let i = 2; i <=10; i++ ){
        for (let tipo of tipos) {
            deck.push( i + tipo)   
        }       
    }
    for ( let tipo of tipos){
        for(let esp of especiales){
            deck.push( esp + tipo)
        }
    }

 //desornedenar cartas   
    deck = _.shuffle( deck );
    console.log(deck);
    return deck;
}

crearDeck();

//Pedir Carta

const pedirCarta = () =>{
    if( deck.length === 0){
        throw 'No hay mas cartas en la baraja'
    }

    let carta = deck.pop();
    return carta;
}

//pedirCarta();
const valorCarta = ( carta )=>{

    const valor = carta.substring(0,carta.length -1);
    return (isNaN(valor)) ?
           (valor ==='A') ? 11 : 10
           : valor * 1;
}

//Turno de la computadora
const turnoComputadora = (puntosMinimos) => {
   do{
        const carta    = pedirCarta();
        puntosComputadora  = puntosComputadora + valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora;
        const imgCarta = document.createElement('img');
        imgCarta.src   = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('cartas');
        divCartasComputadora.append(imgCarta);
        if( puntosMinimos > 21 ){
            break;
        }
        
   } while((puntosComputadora < puntosMinimos) && (puntosMinimos <=21));

   setTimeout(()=> {
        if( puntosComputadora === puntosMinimos ){
            alert('Nadie gana :c');
        } else if ( puntosMinimos > 21 ){
            alert('Computadora gana');
        } else if ( puntosComputadora > 21 ){
            alert('Jugador gana');
        } else {
            alert('Computadora gana');
        }    
    },10 );
}
//Eventos
btnPedir.addEventListener('click',()=>{
    const carta    = pedirCarta();
    puntosJugador  = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;
    const imgCarta = document.createElement('img');
    imgCarta.src   = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('cartas');
    divCartasJugador.append(imgCarta);

    if( puntosJugador > 21){
        console.log('Has Perdido');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }else if( puntosJugador === 21){
        console.warn('Ganaste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }
});

btnDetener.addEventListener('click',()=>{
    btnPedir.disabled   = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener('click',()=>{
    console.clear();
    deck = crearDeck();
    puntosComputadora = 0;
    puntosJugador = 0;
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;
    divCartasComputadora.innerHTML ='';
    divCartasJugador.innerHTML ='';
    btnPedir.disabled   = false;
    btnDetener.disabled = false;

});
})();












