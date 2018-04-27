# Práctica de laboratorio 3 #
## Super Mario Bros ##

#### Alumnos: ####

-   Santiago Baidez Ayuste
-   Daniel García Baameiro
	
# Listado de las mecánicas que se han implementado. #
En primer lugar, indicar que conforme iba creciendo el juego, se hacía más difícil identificar cada parte del mismo, por eso se ha dividido la programación en 3 ficheros diferenciados. Uno donde se cargan los recursos y se lanza la pantalla principal **(smbgame.js)**

En otro fichero, se han creado todos los sprites que tendremos disponibles en el juego, con sus animaciones **(smbsprites.js)**.

Y finalmente, las escenas se han creado en otro fichero a parte **(smbscenes.js)**.
Así se hace más fácil identificar cada apartado del juego tanto para añadir nuevos elementos, como corregir o depurar errores.

## Fichero smbgame.js: ##

Este fichero, define el objeto Quintus, incluyendo todos sus módulos (y los otros ficheros que hemos creado).
Se activan los controles por teclado, eventos de touch y se activa el sonido, ya que se usará en la práctica.

Durante toda la práctica, vamos incluyendo en Q.load todos los recursos (como imágenes, audio o json) que nos hacen falta para desarrollar el juego. Se hace uso de la función compileSheets para decirle a Quintus qué json corresponde con cada hoja de sprites.

Finalmente se carga el menú principal del juego para dar comienzo a la partida.

## Fichero smbsprites.js: ##

En este fichero, hemos definido todos los sprites que vamos a utilizar en el juego.
### Jugador Mario ###
Empezamos creando el Sprite de Mario. En la función step le asignan diferentes animaciones según lo que
estemos haciendo, ya sea estar quieto, correr, saltar o incluso cuando morimos.
Se le establece un límite izquierdo que no puede traspasar el jugador y también se ha limitado hasta dónde puede ir el viewport.
También se ha establecido un límite inferior, para que cuando Mario caiga al vacío muera.
Finalmente, creamos la animación de muerte de Mario. Vemos que primero cambia el sprite, luego
realiza un movimiento hacia arriba y después cae hacia la parte inferior de la pantalla, desapareciendo.

### Enemigo Goomba ###
Una vez tenemos a Mario, creamos los distintos enemigos así como sus animaciones y los objetos con los
que puede interaccionar Mario. Empezamos con *Goomba*, tiene un movimiento muy sencillo, anda en un sentido y si choca con algún obstáculo éste cambia. Salvo cuando choca con Mario, que dependiendo de la zona donde colisione, morirá *Goomba* o Mario.

### Enemigo Bloopa ###
El enemigo *Bloopa* es un calamar cuyo movimiento es de tipo salto. Para ello, se llama a una función que ejecuta un salto cada vez que colisiona con su base. Esto lo hace saltar sin parar. Del mismo modo que con *Goomba*, si Mario colisiona en su parte superior, este se elimina, si colisiona en cualquier otro punto, Mario pierde una vida.

### Enemigo Koopa ###
A continuación, vemos a *Koopa*. Tiene un comportamiento exactamente igual al de *Goomba* pero con
una diferencia. Cuando gira, el sprite cambia, al otro sentido, ya que si no, parecería que anda de espaldas.
Esto lo hemos conseguido haciendo que la animación duplique sprites del movimiento de un sentido, pero con la opción `flip: x` activa, para que se vean los sprites invertidos.

### defaultEnemy ###
*defaultEnemy* se crea para reutilizar el código en los 3 primeros enemigos descritos: *Goomba*, *Koopa*
y *Bloopa*. Se crea el componente para que ocurra lo mismo con cualquiera de los enemigos a los que se
le añade. En este caso, se programa para que si un enemigo colisiona con Mario, éste muera, salvo cuando
Mario colisiona en la parte superior del enemigo, que entonces es el enemigo el que desaparece de la escena.

### Enemigo Piranha ###
Este enemigo es similar a los anteriores, pero con una peculiaridad, Mario no puede "matarlo". Cualquier colisión con Mario, termina con la muerte del fontanero. Se usan los sprites para darle movimiento, aunque este enemigo es estático y siempre se posiciona en la superficie de una tubería. Por eso no lo vemos en el segundo nivel.

### Princesa ###
La meta de cada nivel es la princesa. Consta únicamente de una imagen. El sprite queda esperando la colisión con Mario para terminar el nivel y pasar al siguiente. Este sprite, por lo tanto, carga la escena de *victoria*, que veremos más adelante.

### Mushrooms ###
Se ha creado este sprite para conseguir lo opuesto a la muerte de Mario, ganar vidas. Es un sprite muy sencillo que se genera cuando un *Coinbox* contiene una seta. Lo único que hace este sprite es moverse en una dirección y rebotar si encuentra obstáculos. Espera la colisión con Mario para incrementar las vidas del jugador.

### Platform ###
Este sprite se ha creado exclusivamente para el segundo nivel. Es una plataforma que ayuda a Mario a salvar largas distancias donde sólo hay vacío. Se le asignan límites izquierdo y derecho para que se mueva entre ellos. Y además se le ha añadido un comportamiento frente a la colisión superior con Mario, ya que tiene que dar la sensación de transportar al jugador y esto no lo haría si no se hubiera añadido este comportamiento.
Para ello, se le suma a la componente 'x' de Mario, la velocidad de la plataforma dividido entre 60, que hace que Mario se mantenga estático sobre la misma. 

### Coin ###
El sprite *Coin* define las monedas del juego. Primero se le quita la gravedad, para que las
monedas floten en el aire. Se le asigna una animación que produce el efecto de estar brillando. Y se le indica la
animación a realizar en caso de que colisione Mario con una moneda. En este caso, la moneda tiene que
subir una pequeña distancia y desaparecer. Además, para que la colisión con Mario no produzca movimiento en el jugador, se le indica a la moneda que es un sensor con: `sensor: true`.

### CoinBox ###
Parecido al anterior sprite, pero algo más complejo, es *CoinBox*. Se ha creado este sprite para mostrar las cajas que contienen elementos como monedas o setas en su interior.
Se ha creado la animación de brillo, similar a la de *Coin* y se le han creado 2 variables nuevas: `coinsInside`,
para indicar las monedas que incluye una *CoinBox* y `mushroom`, que indicaría que contiene una seta en
su interior.

En el primer caso, al colisionar Mario con la base del *CoinBox*, se actualizan las monedas
recogidas por Mario y también se incrementarían los puntos en 200. En el segundo caso, se genera una seta justo encima de la *CoinBox*. En ambos casos, mientas haya algún elemento en la caja, esta realizará una pequeña
animación de subida y bajada cada vez que la golpeemos en la base.

### Elementos del HUD ###
Hemos creado un pequeño Sprite que nos servirá para usarlo a modo de marcador de vidas restantes.
Es la imagen de Mario que aparece arriba a la derecha.

### Elementos de puntuación ###
Se trata de elementos que hacen aparición cuando Mario coge una moneda, golpea una *CoinBox* o mata un enemigo. Los que se han implementado son:

#### 1up ####
Lo vemos cuando Mario colisiona con la seta de *1up*. Surge de la seta y desaparece yendo hacia arriba.

#### 100 point ####
Lo vemos cuando Mario acaba con un enemigo. Surge del enemigo y desaparece yendo hacia arriba.

#### 200 point ####
Lo vemos cuando Mario coge una moneda o golpea un *CoinBox* (con moneda o seta). Surge de la moneda o la *CoinBox* y desaparece yendo hacia arriba.

#### Coin spinner ####
El *Coin Spinner*, es una pequeña moneda que surge de un *CoinBox* cuando, quedando monedas dentro, Mario lo golpea y consigue la moneda del interior.

## Fichero 'smbscenes.js': ##

Aquí encontramos todas las escenas creadas para el desarrollo del juego. Pasamos a describir el objetivo de cada una de las escenas creadas.

### Menú inicial ###

### Level 1 ###
En *Level 1*, hemos incluido todos los enemigos, *Coin* y *CoinBox* que queríamos que aparecieran en el nivel. Se han desarrollado 2 pequeñas funciones para ubicar los *Coin* y *CoinBox* de una manera más sencilla. A esas funciones, podemos pasarles directamente las coordenadas (en tamaño del patrón del mapa creado en *Tiled*) y nos ubica los elementos en el punto que deseamos, sin tener que calcular a mano el punto exacto. Como vemos, las monedas tienen un desplazamiento de 17px en cada eje, pero los *CoinBox* tienen 18px de desplazamiento en su eje 'y', esto se hace para facilitar la colisión de un *CoinBox* cuando está junto a bloques de ladrillos. Probando el juego, se nos hacía muy difícil golpearlos y por eso se decidió hacer la modificación. Para ello, también se ha modificado el sprite del *Coinbox*, dejando un píxel transparente en su base, para que en apariencia, los bloques y los *CoinBox* se vean alineados.

Finalmente, se añade el viewport, que seguirá a Mario en el eje 'x' (con un límite izquierdo) y centrado a nuestro gusto.
### Level 2 ###
Al igual que el primer nivel, en *Level 2* hemos incluido todos los elementos que queríamos que apareciesen en la partida. Además de los anteriores, aquí tenemos un elemento nuevo, los *Platforms* que tienen que ayudar a Mario a salvar distancias largas.

### Escena de muerte ###
Cuando el jugador colisiona con un enemigo o cae al vacío muere y se llama a esta escena. Se mostrará una *box* con texto y un botón. Si el jugador tiene vidas restantes, al pulsar el botón, volverá al principio del nivel y seguirá la partida. Si el jugador se ha quedado sin vidas, se pasará a la escena de derrota.

### Escena de derrota ###
Esta escena, se muestra cuando Mario se ha quedado sin vidas. Aquí se muestra un fondo que se ha diseñado para el caso, simulando el juego original. Aquí se seguirá mostrando el hud, para que el usuario vea la puntuación que ha conseguido y las monedas recogidas. Este fondo actúa a modo de botón. Cuando el usuario pulse sobre el mismo, se regresará al menú de inicio para volver a iniciar una partida, reseteando las vidas, puntos y monedas.

### Escena de victoria ###
En esta escena, se muestra una *box* que le indica al usuario que ha ganado. Si está en el nivel 1, le indicará *Next level* y lo llevará al nivel 2 del juego. Si ya ha terminado el segundo nivel, le indicará *Play again* para permitirle empezar otra partida de nuevo. Esto se ha hecho así porque sólo existen 2 niveles. En una ejecución normal con más niveles, el jugador iría pasando de un nivel a otro hasta llegar al final.

### Marcador de puntuación ###
En este marcador, se muestran 2 textos. Uno de ellos es "MARIO" y otro indica los puntos que ha ido recogiendo el jugador. Como hemos visto, las monedas y *CoinBox* dan 200 puntos y los enemigos eliminados, dan 100 puntos.
Este segundo texto, se va actualizando en cada cambio de puntuación.

### Marcador de monedas recogidas ###
Al igual que en el caso anterior, este marcador, se va actualizando cada vez que el jugador recoge una moneda. También tiene un sprite de una moneda (pero más pequeña que las del juego) para indicar gráficamente que se trata de este elemento el que se está contabilizando en este marcador.

### Marcador de vidas restantes ###
Idéntico al anterior, pero con las vidas restantes del jugador. Cada vez que Mario pierde una vida, se resta del marcador y cada vez que coge una seta *1up*, se incrementa en una unidad.

### initGame() ###
Aquí, se paran los sonidos que estuvieran reproduciéndose y lanza la música principal.
Carga la escena que corresponda y los distintos marcadores.

### startGame() ###
startGame() carga el mapa tmx que corresponda y lanza la escena de menú en caso de ser el inicio del juego o el comienzo del nivel 2 si ya se ha superado el primer nivel. 

## Sonido ##
A lo largo del desarrollo del juego se ha ido haciendo uso de las funciones `Q.audio.play()` y `Q.audio.stop()` para reproducir los sonidos escogidos en cada evento. Podríamos numerar aquí todos los sonidos utilizados, pero se puede comprobar más fácilmente jugando una partida al juego.