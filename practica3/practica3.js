/*
 * Práctica de Laboratorio 3
 * Desarollo de videojuegos mediante tecnologías web
 * Curso: 2017/18
 * Alumnos: Santi Baidez Ayuste & Daniel García Baameiro
 *
 */

window.addEventListener("load", function() {
	//Punto 3.1 Carga del objeto Quintus
	var Q = window.Q = Quintus()
	.include("Sprites, Scenes, Input, UI, Touch, TMX, Anim, 2D")
	.setup({
		width: 320,
		height: 480
	})
	.controls()
	.touch();
	
	//Punto 3.2 Carga del objeto TMX	
	Q.scene("level1", function(stage) {
		Q.stageTMX("level.tmx",stage);
		stage.add("viewport");
		stage.centerOn(150,380);
	});
	Q.loadTMX("level.tmx", function() {
		Q.stageScene("level1");
	});
	
});