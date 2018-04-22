/*
 * Práctica de Laboratorio 3
 * Desarollo de videojuegos mediante tecnologías web
 * Curso: 2017/18
 * Alumnos: Santi Baidez Ayuste & Daniel García Baameiro
 * http://localhost:8080/dvi/practica3/
 */

window.addEventListener("load", function() {
	var Q = window.Q = Quintus()
	.include("Sprites, Scenes, Input, UI, Touch, TMX, Anim, 2D, Audio")
	.setup({
		width: 320,
		height: 480
	})
	.controls()
	.touch()
	.enableSound();
		
	Q.load(["mario_small.png","mario_small.json", "goomba.png", "goomba.json", "bloopa.png", "bloopa.json","music_main.ogg", "music_die.ogg", "music_level_complete.ogg", "coin.ogg", "jump.ogg", "bump.ogg"], function(){
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
				sprite: "MarioAnimation",
				jumpSpeed: -525,
				speed: 235
			});
			this.add('2d, platformerControls, animation');
		},
		step: function(dt) {
			if(Q.inputs['up'] && !this.p.jumping) {
				Q.audio.play("jump.ogg")
			}
			
			if(this.p.x <= 17) {
				this.p.x = 18
			}
			if(this.p.x >= 6990) {
				this.p.x = 6989
			}
			if(this.p.y > 1000){
				marioDeath(this);
			}
			if(this.p.vx > 0) {
				this.play("run_right"); 
			} else if(this.p.vx < 0) {
				this.play("run_left");
			} else {
				this.play("stand_" + this.p.direction);
			}
			if(this.p.jumping && this.p.landed < 0){
				this.play("jump_" + this.p.direction);
			}		    	
		}
	});
	function marioDeath(mario) {
		Q.audio.play("music_die.ogg");
		mario.p.x = 102;
		mario.p.y = 849;
	}
	
	Q.animations("MarioAnimation", {
		stand_right: { frames: [0], loop: false },
		stand_left: { frames: [14], loop: false },
		run_right: { frames: [1, 2, 3], rate: 1/8 },
		run_left: { frames: [15,16,17], rate: 1/8 },
		jump_right: { frames: [4], loop: false },
		jump_left: { frames: [18], loop: false },
		death: { frames: [12], loop: false, rate: 1/4 }
	});
	
	//ENEMIGO GOOMBA
	Q.Sprite.extend("Goomba",{
		init: function(p){
			this._super(p, {
				sheet: 'goomba',
				sprite: "GoombaAnimation",
				vx: 100
			});
			this.add('2d, aiBounce, animation, defaultEnemy');
			this.play("walk");
		},
	});
	
	//ANIMACION GOOMBA
	Q.animations("GoombaAnimation", {
		walk: { frames: [0, 1], rate: 1/6},
		death: { frames: [2], loop: false, rate : 1/10, trigger: "destroy"}
	});


	//ENEMIGO BLOOPA
	Q.Sprite.extend("Bloopa",{
		init: function(p){
			this._super(p, {
				sheet: 'bloopa',
				sprite: "BloopaAnimation"
			});
			this.add('2d, aiBounce, animation, defaultEnemy');
			this.on("bump.bottom",this,"stomp");
		},
		
		stomp: function(collision) {
			this.p.vy = -400;
			this.play("jump");	
		}

	});
	
	//ANIMACION BLOOPA
	Q.animations("BloopaAnimation", {
		jump: { frames: [0, 1, 0], rate: 1/4, loop: false },
		death: { frames: [0, 1, 2], loop: false, rate : 1/8, trigger: "destroy"}
	});
	
	//DEFAULT ENEMY
	Q.component("defaultEnemy", {
		added: function(){
			this.entity.on("bump.top", function(collision) {
				if(collision.obj.isA("Mario")) {
					this.play("death");
					collision.obj.p.vy = -300;
					Q.audio.play("bump.ogg");
				}
			});
			this.entity.on("bump.left, bump.right, bump.bottom", function(collision) {
				if(collision.obj.isA("Mario")) {
					marioDeath(collision.obj);
				}
			});
			
			this.entity.on("destroy", function(){ 
				this.destroy(); 
			});
		}
	});
	
	
	
	//ESCENAS
	function cargarEscena() {
		Q.scene("level1", function(stage) {
			Q.stageTMX("smb_level1.tmx",stage);
			var mario = stage.insert(new Q.Mario({x: 102, y: 849}));
			var goomba = stage.insert(new Q.Goomba({x: 748, y: 849}));
			var bloopa = stage.insert(new Q.Bloopa({x: 1088, y: 800}));
			var bloopa = stage.insert(new Q.Bloopa({x: 1190, y: 800}));
			var goomba = stage.insert(new Q.Goomba({x: 1600, y: 849}));
			Q.audio.play("music_main.ogg", { loop: true});
			stage.add("viewport").follow(mario);
			stage.viewport.offsetX = -50;
			stage.viewport.offsetY = 170;
		});
	}
	
	function cargarMuerte() {
		Q.scene("muerte", function(stage) {});
	}
	
	function cargarVictoria() {
		Q.scene("victoria", function(stage) {});
	}
	
	function cargarDerrota() {
		Q.scene("derrota", function(stage) {});
	}
	
	cargarEscena();
	Q.loadTMX("smb_level1.tmx", function() {
		Q.stageScene("level1");
	});
});