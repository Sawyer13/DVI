/*
 * Práctica de Laboratorio 3
 * Desarollo de videojuegos mediante tecnologías web
 * Curso: 2017/18
 * Alumnos: Santi Baidez Ayuste & Daniel García Baameiro
 * http://localhost:8080/dvi/practica3/
 */

window.addEventListener("load", function() {
	var Q = window.Q = Quintus()
	.include("Sprites, Scenes, Input, UI, Touch, TMX, Anim, 2D")
	.setup({
		width: 320,
		height: 480
	})
	.controls()
	.touch();
		
	Q.load(["mario_small.png","mario_small.json", "goomba.png", "goomba.json", "bloopa.png", "bloopa.json"], function(){
		Q.compileSheets("mario_small.png","mario_small.json");
		Q.compileSheets("goomba.png", "goomba.json");
		Q.compileSheets("bloopa.png", "bloopa.json");
		Q.stageScene("level1");
	});
	
	//JUGADOR MARIO
	Q.Sprite.extend("Mario",{
		init: function(p){
			this._super(p, {
				sheet: 'marioR',
			});
			this.add('2d,platformerControls');
		},
		step: function(dt) {
			if(this.p.y > 1000){
				this.p.x = 20;
				this.p.y = 450;
			}
		}
	});
	
	//ENEMIGO GOOMBA
	Q.Sprite.extend("Goomba",{
		init: function(p){
			this._super(p, {
				sheet: 'goomba',
				vx: 100
			});
			this.add('2d, aiBounce');
			this.on("bump.top",function(collision) {
				if(collision.obj.isA("Mario")) { 
					this.destroy();
				}
			});
			this.on("bump.left, bump.right, bump.bottom",function(collision) {
				if(collision.obj.isA("Mario")) {
					collision.obj.p.x = 51;
					collision.obj.p.y = 520;
				}
			});
		},
	});
	
	//ENEMIGO BLOOPA
	Q.Sprite.extend("Bloopa",{
		init: function(p){
			this._super(p, {
				sheet: 'bloopa',
				vy: -100
			});
			this.add('2d, aiBounce');
			this.on("bump.top",function(collision) {
				if(collision.obj.isA("Mario")) { 
					this.destroy();
				}
			});
			this.on("bump.left, bump.right, bump.bottom",function(collision) {
				if(collision.obj.isA("Mario")) {
					collision.obj.p.x = 51;
					collision.obj.p.y = 520;
				}
			});
		},
	});
	
	Q.scene("level1", function(stage) {
		Q.stageTMX("level.tmx",stage);
		var mario = stage.insert(new Q.Mario({x: 150, y: 380}));
		var goomba = stage.insert(new Q.Goomba({x: 1600, y: 380}));
		var bloopa = stage.insert(new Q.Bloopa({x: 200, y: 380}));
		stage.add("viewport").follow(mario);
		stage.viewport.offsetX = -50;
		stage.viewport.offsetY = 170;
	});
	
	Q.loadTMX("level.tmx", function() {
		Q.stageScene("level1");
	});
});