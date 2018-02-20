/**
 * MemoryGame es la clase que representa nuestro juego. Contiene un array con la cartas del juego,
 * el número de cartas encontradas (para saber cuándo hemos terminado el juego) y un texto con el mensaje
 * que indica en qué estado se encuentra el juego
 */
var MemoryGame = MemoryGame || {};

/**
 * Constructora de MemoryGame
 */
MemoryGame = function(gs) {
	this.gs = gs;
	this.cartas = [];
	this.cartasEncontradas = [];
	this.mensajeEstado;
	
   /**
	* Inicializa el juego creando las cartas (recuerda que son 2 de cadatipo de carta), 
	* desordenándolas y comenzando el bucle de juego.
	*/
	this.initGame = function() {
		this.mensajeEstado = "Memory Game";
		this.creaCartas();
		this.desordenaCartas();
		this.loop();
		
	}
	
   /**
    * Dibuja el juego, esto es: (1) escribe el mensaje con el estado actual del juego y 
	* (2) pide a cada una de las cartas del tablero que se dibujen.
	*/
	this.draw = function() {

	}
	
   /**
	* Es el bucle del juego.
	*/
	this.loop = function() {
		
	}
	
   /**
    * Este método se llama cada vez que el jugador pulsa sobre
	* alguna de las cartas (identificada por el número que ocupan en el array de cartas
	* del juego). Es el responsable de voltear la carta y, si hay dos volteadas, comprobar
	* si son la misma (en cuyo caso las marcará como encontradas). En caso de no ser
	* la misma las volverá a poner boca abajo
	*/
	this.onClick = function(cardId) {
		
	}
	
   /**
	* Este método crea 8 pares de cartas de las disponibles
	*/
	this.creaCartas = function() {
		this.cartas = [
			new 
		]
	}
	
   /**
	* Este método desordena las cartas de manera aleatoria
	*/
	this.desordenaCartas = function() {
		
	}
	
	
};



/**
 * Constructora de las cartas del juego. Recibe como parámetro el nombre del sprite que representa la carta.
 * Dos cartas serán iguales si tienen el mismo sprite.
 * La carta puede guardar la posición que ocupa dentro del tablero para luego poder dibujarse
 * @param {string} id Nombre del sprite que representa la carta
 */
MemoryGameCard = function(id) {
	
	this.nombre = id;
	this.volteada = false;
	this.encontrada = false;
	
   /** 
	* Da la vuelta a la carta, cambiando el estado de la misma
	*/
	this.flip() {
		if (this.volteada == false) {
			this.volteada = true;
		}
		else { 
		this.volteada = false;
		}
	}
	
   /** 
	* Marca una carta como encontrada, cambiando el estado de la misma
	*/
	this.found() {
		this.encontrada = true;
	}
	 
   /**
	* Compara dos cartas, devolviendo true si ambas representan la misma carta
	*/
	this.compareTo(otherCard) {
		return this.nombre == otherCard.nombre;
	}
	
   /**
	* Dibuja la carta de acuerdo al estado en el que se encuentra.
	* Recibe como parámetros el servidor gráfico y la posición en la que se encuentra en
	* el array de cartas del juego (necesario para dibujar una carta).
	*/
	this.draw(gs, pos) {
		// Si no está volteada, se ve la cara trasera.
		if(this.volteada = false) {
			gs.draw("back",pos);
		}
		// En caso contrario, se ve la cara de su id.
		else {
			gs.draw(this.nombre,pos);
		}
	}
};