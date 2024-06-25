
import React, { useEffect, useRef, useState} from 'react';
import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs"; // Importa Kaboom

import axios from 'axios';

let PUNTAJE = 0

const Game = () => {
    const [preguntas, setPreguntas] = useState([]);
    const [indicePregunta, setIndicePregunta] = useState(0);
    const [puntaje, setPuntaje] = useState(0);
	
	const gameContainerRef = useRef(null);
	useEffect(() => {
	  if (gameContainerRef.current) {
		// Initialize Kaplay.js with the DOM element reference
		const k = kaboom({
		  global: true,
		  width: 1400,
          height: 880,
		  canvas: gameContainerRef.current,
		  background: [141, 183, 255],        
		});
		


// load assets platformer, funciona con live server, no path
k.loadSprite("bean", "https://kaboomjs.com/sprites/bean.png");
k.loadSprite("bag", "/sprites/bag.png");
k.loadSprite("ghosty", "/sprites/ghosty.png");
k.loadSprite("spike", "/sprites/spike.png");
k.loadSprite("grass", "/sprites/grass.png");
k.loadSprite("steel", "/sprites/steel.png");
k.loadSprite("prize", "/sprites/jumpy.png");
k.loadSprite("apple", "/sprites/apple.png");
k.loadSprite("portal", "/sprites/portal.png");
k.loadSprite("coin", "/sprites/coin.png");


//SPRITES NUEVAS, cargadas desde carpeta, son de kaboom
k.loadSprite("btfly", "/sprites/btfly.png");
k.loadSprite("cloud", "/sprites/cloud.png");
k.loadSprite("door", "/sprites/door.png");
k.loadSprite("key", "/sprites/key.png");
k.loadSprite("moon", "/sprites/moon.png");
k.loadSprite("sun", "/sprites/sun.png");
k.loadSprite("gigagantrum", "/sprites/gigagantrum.png");
k.loadSprite("lightening", "/sprites/lightening.png");
// SPRITES MARIO
k.loadSprite("blue-brick", "/sprites/blue-brick.png");
k.loadSprite("blue-evil-shroom", "/sprites/blue-evil-shroom.png");
k.loadSprite("blue-steel", "/sprites/blue-steel.png");
k.loadSprite("blue-wall", "/sprites/blue-wall.png");
k.loadSprite("brick", "/sprites/brick.png");
k.loadSprite("evil-shroom", "/sprites/evil-shroom.png");
k.loadSprite("mushm", "/sprites/mushroom-mario.png");
k.loadSprite("pipe", "/sprites/pipe.png");
k.loadSprite("red-wall", "/sprites/red-wall.png");
k.loadSprite("surprise", "/sprites/surprise.png");
k.loadSprite("unboxed", "/sprites/unboxed.png");
k.loadSprite("flower", "/sprites/flower.png");
// SPRITES EXTRA zelda
k.loadSprite("stairs", "/sprites/stairs.png");
k.loadSprite("skeleton", "/sprites/skeleton.png");
k.loadSprite("linternas", "/sprites/linternas.png");
k.loadSprite("peligro", "/sprites/peligro.png");
// SPRITES PERSONALIZADAS XHISFIRE
k.loadSprite("chi", "/sprites/chi2.png");
k.loadSprite("cofre", "/sprites/cofre.png");
k.loadSprite("sign", "/sprites/1874317.png");
k.loadSprite("pink-grass", "/sprites/pink-grass.png");
k.loadSprite("pink-tree", "/sprites/pink-tree.png");
k.loadSprite("purple-heart", "/sprites/purple-heart.png");
k.loadSprite("tree2", "/sprites/tree2.png");
//sprites selva
k.loadSprite("ladder1", "/sprites/ladder1.png");
k.loadSprite("ladder2", "/sprites/ladder2.png");
k.loadSprite("ladder3", "/sprites/ladder3.png");
k.loadSprite("bridge1", "/sprites/bridge1.png");
k.loadSprite("bridge2", "/sprites/bridge2.png");
k.loadSprite("bridge3", "/sprites/bridge3.png");
k.loadSprite("grass-forest", "/sprites/grass-forest.png");
k.loadSprite("rock-block", "/sprites/rock-block.png");
k.loadSprite("tree-f", "/sprites/tree-f.png");
k.loadSprite("tree-f1", "/sprites/tree-f1.png");
k.loadSprite("tree-f2", "/sprites/tree-f2.png");
k.loadSprite("cueva", "/sprites/cueva.png");
k.loadSprite("rama", "/sprites/rama.png");
k.loadSprite("plant", "/sprites/plant.png");
// sprites hielo
k.loadSprite("ice-thin", "/sprites/ice1.png");
// k.loadSprite("ice", "/sprites/ice.png");
k.loadSprite("ice2", "/sprites/ice2.png");
k.loadSprite("ice-tierra", "/sprites/ice3.png");
k.loadSprite("ice-blanco", "/sprites/ice-blanco.jpg");
k.loadSprite("casa", "/sprites/casa.png");
k.loadSprite("quarzo-celeste", "/sprites/quarzo-celeste.png");
k.loadSprite("quarzo-rosa", "/sprites/quarzo-rosa.png");
k.loadSprite("ice-tree", "/sprites/ice-tree.png");
k.loadSprite("ice-tree2", "/sprites/ice-tree2.png");
k.loadSprite("snow-man", "/sprites/snow-man.png");



// FONDOS
k.loadSprite("montaña", "/sprites/Fondo1Montaña.png");
k.loadSprite("mar", "/sprites/Fondo2Mar.png");
k.loadSprite("bosque", "/sprites/Fondo3Bosque.png");
k.loadSprite("nieve", "/sprites/Fondo5Nieve.png");
k.loadSprite("espacio", "/sprites/Fondo6Espacio.png");
k.loadSprite("anaranjado", "/sprites/Anaranjado1.png");
k.loadSprite("fondo", "/sprites/fondo.jpg");



//---------------------------------------------------------------------------------------------------------------------






k.setGravity(2500)

// custom component controlling enemy patrol movement
function patrol(speed = 60, dir = -1) {
	return {
		id: "patrol",
		require: [ "pos", "area" ],
		add() {
			this.on("collide", (obj, col) => {
				if (col.isLeft() || col.isRight()) {
					dir = -dir
				}
			})
		},
		update() {
			this.move(speed * dir, 0)
		},
	}
}

// define some constants
const JUMP_FORCE = 1220  //1320
const MOVE_SPEED = 480
const FALL_DEATH = 2400
const BIG_JUMP_FORCE = 1600
let CURRENT_JUMP_FORCE = JUMP_FORCE



// custom component that makes stuff grow big
function big() {
	let timer = 0
	let isBig = false
	let destScale = 1
	return {
		// component id / name
		id: "big",
		// it requires the scale component
		require: [ "scale" ],
		// this runs every frame
		update() {
			if (isBig) {
				timer -= dt()
				if (timer <= 0) {
					this.smallify()
					
				}
			}
			this.scale = this.scale.lerp(vec2(destScale), dt() * 6)
		},
		// custom methods
		isBig() {
			return isBig
		},
		smallify() {
			destScale = 1
			timer = 0
			isBig = false
			CURRENT_JUMP_FORCE = JUMP_FORCE
		},
		biggify(time) {
			destScale = 2
			timer = time
			isBig = true
			CURRENT_JUMP_FORCE = BIG_JUMP_FORCE
		},
	}
}


const LEVELS = [
	
	
     // nivel nieve completo, demasiado grande, NO PONER
	// [   
		
	// 	"ñ ñ                                               ",
	// 	"ñ ñ          $           (                        ",
	//  "ñ ñ          $          hh      $                 ",
	// 	"ñ ñ          $                   $                ",
	// 	"ñ ñ          $                    $               ",
	// 	"ñ ñ          $     h              $               ",
	// 	"ñ ñ  $z$           ñ              $               ",
	// 	"ñ ñ hhhhh         hñ                              ",
	// 	"ñ ñ               ññh                             ",
	// 	"ñ ñ              hñññ                             ",
	// 	"ñ ñ   (   {j i > ññññ ¨  i   >  z    j  ¨i    : ¨ ",
	// 	"ñ ñjjjjjjj|jjjjjjññññjjjjjjjjjjjjjjjjj{jjjjjjjjjjj",
	// 	"ñ ñ       |       ñ$$$$$$             |           ",
	// 	"ñ ñ   ($  |     $ ñ$$($$$             |           ",
	// 	"ñ ñ   ll  |       ñ$$$$$$             |           ",
	// 	"ñ ñ       } ${  ¨ ñññññññ             } ;         ",
	// 	"ñ ñ     $ññññ|ñññññ                   lll{        ",
	// 	"ñ ñ    ;ññ   |              ll           |        ",
	// 	"ñ ñ,,,ññ     |                           |        ",
	//  "ñ ñññññ      |                           |  ,$$$, ",
	// 	"ñ            }  [~~~~](                  |  lllll ",
	// 	"ñ     ( ¨    lll     ll                  |        ",
	// 	"ñ     lll      ;                         |    $   ",
	// 	"ñ           $hhh!                        |        ",
	// 	"ñ   ;$ g  $ hñññh    $ ( $        h,g , >}    (  ,",
	// 	"ñhhhhhhhhhhhñññññ,,,,hhhhhhh;    ;ññhhhhhhhhhhhhhh",
	// 	"ñññññññññññññññññññññññññññññ > >ñññññññññññññññññ",
	// 	"ññññññññññññññññññññññññññññññññññññññññññññññññññ",
	// ],
	

// 	// nivel selva, listo
// 	[   
		
// 		"                                                ",
// 		"    ¿       $   $($  $                           ",
// 		"                            q + q      ($a       ",
// 		"                            ¬¬¬¬¬    {¬¬¬¬      ",
// 		"            [~~~~~~~]                |          ",
// 		"          ¬¬        ¬¬    $          |          ",
// 		"     ( q                  $          |          ",
// 		"    {¬¬¬                  $         v}          ",
// 		"    |                  (  $         ¬¬          ",
// 		"    |     $$           °  $                ($$  ",
// 		"    |     ¬¬¬          °u $       $        ¬¬¬  ",
// 		"    |                  °  $                     ",
// 		"    |                  °  $                     ",
// 		" a  }   ^^  vv   r  >  °  (v av     r   g g    r",
// 		"¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬    ¬¬¬¬¬¬¬¬¬¬¬¬¬",	
// 	],

// 	// nivel rosadito
//     [  
//     " /              c           ",  
//     "                            ",                                    
//     "    c              c        ",
//     "           6             o  ",
//     "   1   1*_1_                ",
//     "                            ",
//     "                  (         ",
//     "  f )  f  e   e f _    ! i i",
//     "___________________    444s4",
// ],

// // nivel mario underground
// [
//     "£  .                           £",
//     "£                              £",
//     "£                              £",
//     "£                              £",
//     "£   1*1*11          x x        £",
//     "£                 x x x        £",
//     "£               x x x x x  @   £",
//     "£      b   b  x x xtx xtx      £",
//     "55555555555555555555555555555555",
// ],

// // // nivel mar
// [
//     "     0      o",
//     "?   ==       ",
//     "        $$   ",
//     "  %    ===   ",
//     "             ",
//     "    ^^ f> = @",
//     " ============",
// ],
	// [
	// 	"  ¡                       $",
	// 	"                          $",
	// 	"                          $",
	// 	"                          $",
	// 	"                          $",
	// 	"           $$         =   $",
	// 	"  %      ====         =   $",
	// 	"                      =   $",
	// 	"                      =    ",
	// 	"       ^^      = >    =   @",
	// 	"===========================",
	// ],

// 	// nivel spikes
// 	[   
// 		"   `                             ",
// 		"      $    $    $    $     $     ",
// 		"      $    $    $    $     $     ",
// 		"                                 ",
// 		"                                 ",
// 		"                                 ",
// 		"                           (     ",
// 		"                           =     ",
// 		"  ^^^^>^^^^>^^^^>^^^^>^^^^^     @",
// 		" ================================",
// 	],
	
// 	// nivel nieve interior (subterraneo), PENULTIMO NIVEL
// 	[ 
// 	 "ñ ñ      .                                      ",
// 		"ñ ñjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj@jjjjjjjjj",
// 		"ñ ñ               ñ$$$$$$             |         ",
// 		"ñ ñ   ($        $ ñ$$($$$             |         ",
// 		"ñ ñ   ll          ñ$$$$$$             |         ",
// 		"ñ ñ         ${  ¨ ñññññññ             } ;       ",
// 		"ñ ñ     $ñññ |ñññññ                   lll{      ",
// 		"ñ ñ    ;ññ   |              ll           |      ",
// 		"ñ ñ,,,ññ     |                           |      ",
// 	 "ñ ñññññ      |                           | ,$$$,",
// 		"ñ            }  [~~~~](                  | lllll",
// 		"ñ     ( ¨    lll     ll                  |      ",
// 		"ñ     lll      ;                         |   $  ",
// 		"ñ           $hhh!                        |      ",
// 		"ñ   ;$ g  $ hñññh    $ ( $        h,g    }   ( ,",
// 		"ñhhhhhhhhhhhñññññ,,,,hhhhhhh;    ;ññhhhhhhhhhhhh",
// 		"ñññññññññññññññññññññññññññññ >> ñññññññññññññññ",
// 		"ññññññññññññññññññññññññññññññññññññññññññññññññ",
// 	],
    
	// nivel nieve exterior, ULTIMO NIVEL (es como que llego a su casita)
	[   
		
		"        w                       w                  ",
		"                                                  ",
		"             $           (                        ",
	    "             $          hh      $                 ",
		"             $                   $                ",
		"             $                    $               ",
		"             $     h              $               ",
		"     $z$           ñ              $               ",
		"    hhhhh         hñ                              ",
		"                  ññh                             ",
		"                 hñññ                             ",
		"      (      i > ññññ ¨  i   >  z       ¨i    : ¨ ",
		"jjjjjjjjjjjjjjjjjññññjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
	],
]

const estatico= k.body({ isStatic: true })
const hide = offscreen({ hide: true })
// define what each symbol means in the level graph
const levelConf = {
	tileWidth: 64,
	tileHeight: 64,
	tiles: {
		"=": () => [k.sprite("grass"), estatico, k.area(), k.anchor("bot"), hide, "platform"],
		"0": () => [k.sprite("bag"), k.area(), hide, k.anchor("bot")],
		"$": () => [k.sprite("coin"), k.area(), k.pos(0, -15), k.anchor("bot"), hide, "coin"],
		"%": () => [k.sprite("prize"), estatico,  k.area(), k.anchor("bot"), hide, "prize"],
		"^": () => [k.sprite("spike"), k.area(), k.anchor("bot"), hide, "danger"],
		"#": () => [k.sprite("apple"), k.area(), k.anchor("bot"), k.body(), hide, "apple"],
		">": () => [k.sprite("ghosty"), k.area(), k.anchor("bot"), k.body(), patrol(), hide, "enemy"],
		"@": () => [k.sprite("portal"), k.area(), k.scale(2), k.anchor("bot"), k.pos(0, -12), hide, "portal"],
		"p": () => [k.sprite("pipe"), estatico, k.area({ scale: 0.5 }), k.scale(2), k.anchor("bot"), hide, "stairs"],
		"s": () => [k.sprite("stairs"), k.area({ scale: 1.2 }), k.scale(1.4), k.pos(0, 5), k.anchor("bot"), hide, "stairs"],
		"3": () => [k.sprite("btfly"), k.area(), k.pos(0, -9), k.anchor("bot"), hide],
		"f": () => [k.sprite("flower"), k.anchor("bot"), hide],
		"c": () => [k.sprite("cloud"), k.area(), k.scale(2), k.pos(0, -9), k.anchor("bot"), hide],
		"g": () => [k.sprite("gigagantrum"), k.area(), k.anchor("bot"), k.body(), patrol(), hide, "dangerous"],
		"d": () => [k.sprite("door"), k.area({ scale: 0.5 }), k.anchor("bot"), k.pos(0, -12), hide, "portal"],
		"k": () => [k.sprite("key"), k.area(), k.pos(0, -9), k.anchor("bot"), hide],
		"1": () => [k.sprite("surprise"), estatico, k.area(), k.scale(3.2), k.anchor("bot"), hide, "coin-surprise"],
		"*": () => [k.sprite("surprise"), estatico, k.area(), k.scale(3.2), k.anchor("bot"), hide, "prize"],
		"2": () => [k.sprite("unboxed"), estatico, k.area(), k.scale(3.2), k.anchor("bot"), hide, "platform"],
		"4": () => [k.sprite("brick"), estatico, k.area(), k.scale(3.2), k.anchor("bot"), hide, "platform"],
		"5": () => [k.sprite("blue-brick"), estatico, k.area(), k.scale(1.6), k.anchor("bot"), hide, "platform"],
		"x": () => [k.sprite("blue-steel"), estatico, k.area({ scale: 0.8 }), k.scale(1.6), k.anchor("bot"), hide, "platform"],
		"£": () => [k.sprite("blue-wall"), k.area(), k.scale(1.6), k.anchor("bot"), hide, "platform"],
		"t": () => [k.sprite("skeleton"), k.area(), k.anchor("bot"), k.body(), patrol(), hide, "danger"],
		"e": () => [k.sprite("evil-shroom"), k.area({ scale: 0.5 }), k.scale(3.2), k.anchor("bot"), k.body(), patrol(), hide, "dangerous"],
		"b": () => [k.sprite("blue-evil-shroom"), k.area({ scale: 0.8 }), k.scale(1.6), k.anchor("bot"), k.body(), patrol(), hide, "dangerous"],
		"y": () => [k.sprite("mushm"), k.area(), k.scale(3.2), k.anchor("bot"), k.body(), patrol(), hide],
		"i": () => [k.sprite("linternas"), k.area(), k.anchor("bot"), hide],
		"!": () => [k.sprite("sign"), k.area(), k.scale(0.15), k.pos(0, 10), k.anchor("bot"), hide],
		"(": () => [k.sprite("cofre"), k.area(), k.pos(0, 8), k.anchor("bot"), hide, "cofre"],
		"_": () => [k.sprite("pink-grass"), estatico, k.area(), k.scale(0.042), k.anchor("bot"), hide, "platform", ],
		"6": () => [k.sprite("pink-tree"), k.area(), k.scale(0.4), k.pos(0, 3), k.anchor("bot"), hide],
		"8": () => [k.sprite("purple-heart"), k.area(), k.scale(0.1), k.anchor("bot"), k.body(), hide, "apple"],
		")": () => [k.sprite("tree2"), k.area(), k.pos(0, 15), k.anchor("bot"), hide],
		"¬": () => [k.sprite("grass-forest"), estatico , k.area(), k.scale(0.18), k.pos(0, -25), k.anchor("bot"), hide, "platform"],
		"[": () => [k.sprite("bridge1"), estatico, k.area({ scale: 0.18 }), k.pos(-20, 28), k.scale(0.3), k.anchor("bot"), hide],
		"~": () => [k.sprite("bridge2"), estatico, k.area({ scale: 0.3 }), k.pos(-20, 30), k.scale(0.3), k.anchor("bot"), hide],
		"]": () => [k.sprite("bridge3"), estatico, k.area({ scale: 0.1 }), k.pos(-20, 12), k.scale(0.3), k.anchor("bot"), hide],
		"{": () => [k.sprite("ladder1"), k.area(), k.scale(0.27), k.pos(0, -8), k.anchor("bot"), hide, "ladder"],
		"|": () => [k.sprite("ladder2"), k.area(), k.scale(0.14), k.anchor("bot"), hide, "ladder"],
		"}": () => [k.sprite("ladder3"), k.area(), k.scale(0.14), k.pos(0, 10), k.anchor("bot"), hide, "ladder"],
		"°": () => [k.sprite("rock-block"), estatico, k.area(), k.scale(0.18), k.anchor("bot"), hide, "platform"],
		"+": () => [k.sprite("cueva"), k.area({ scale: 0.3 }), k.scale(2), k.anchor("bot"), k.pos(0, 15), hide, "portal"],
		"a": () => [k.sprite("tree-f"), k.area(), k.scale(2.2), k.pos(0, 3), k.anchor("bot"), hide],
		"q": () => [k.sprite("tree-f1"), k.area(), k.scale(2.2), k.pos(0, 3), k.anchor("bot"), hide],
		"r": () => [k.sprite("tree-f2"), estatico, k.area({ scale: 0.6 }), k.scale(0.5), k.pos(0, 3), k.anchor("bot"), hide, 'platform'],
		"u": () => [k.sprite("rama"), k.pos(-4, 15), k.anchor("bot"), hide],
		"v": () => [k.sprite("plant"), k.scale(0.4), k.pos(0, -40), hide],
		"l": () => [k.sprite("ice-thin"), estatico, k.area({ scale: 0.8 }), k.pos(0, -20), k.scale(0.3), k.anchor("bot"), hide,],
		"h": () => [k.sprite("ice2"), estatico, k.area({ scale: 1 }), k.pos(0, 5), k.scale(1.2), k.anchor("bot"), hide,],
		"j": () => [k.sprite("ice-tierra"), estatico, k.area({ scale: 0.8 }), k.pos(0, 0), k.scale(0.8), k.anchor("bot"), hide,],
		"i": () => [k.sprite("ice-tree"), k.area(), k.scale(0.5), k.pos(0, 0), k.anchor("bot"), hide,],
		"ñ": () => [k.sprite("ice-blanco"), estatico, k.area({ scale: 1 }), k.pos(0, -18), k.scale(4.6), k.anchor("bot"), hide,],
		",": () => [k.sprite("quarzo-rosa"), k.area({ scale: 0.4 }), k.scale(0.15), k.pos(0, 0), k.anchor("bot"), hide, "danger",],
		";": () => [k.sprite("quarzo-celeste"), k.area(), k.scale(0.4), k.pos(0, 10), k.anchor("bot"), hide,],
		":": () => [k.sprite("casa"), k.area({ scale: 0.2 }), k.scale(1.1), k.anchor("bot"), k.pos(-100, 20), hide, "portal",],
		"w": () => [k.sprite("fondo"), k.anchor("bot"), k.pos(-200, 900), k.scale(2.5), hide,],
		"z": () => [k.sprite("ice-tree2"), k.area(), k.pos(0, 0), k.scale(1), k.anchor("bot"), hide,],
		"¨": () => [k.sprite("snow-man"), k.area(), k.scale(0.3), k.pos(0, 15), k.anchor("bot"), hide,],
		"/": () => [k.sprite("montaña"), k.anchor("bot"), k.pos(1000, 1200), k.scale(2)],
		"?": () => [k.sprite("mar"), k.anchor("bot"), k.pos(1000, 900), k.scale(2)],
		"¿": () => [k.sprite("bosque"), k.anchor("bot"), k.pos(1100, 1100), k.scale(2.1)],
		"¡": () => [k.sprite("nieve"), k.anchor("bot"), k.pos(800, 1100), k.scale(1.8)],
		".": () => [k.sprite("espacio"), k.anchor("bot"), k.pos(800, 1100), k.scale(2)],
		"`": () => [k.sprite("anaranjado"), k.anchor("bot"), k.pos(800, 1100), k.scale(3)],

		// "&":
		// "<":
		// "7":
		// "<":
		


	},  
}

//---------------------------------------------------------------------------------------------------------------------------------



scene("game", ({ levelId, coins, score } = { levelId: 0, coins: 0, score: 0}) => {

	PUNTAJE = score
	// add level to scene
	const level = addLevel(LEVELS[levelId ?? 0], levelConf)


	// define player object
	const player = k.add([
		k.sprite("chi"),
		k.pos(64, 0),
		k.area(),
		k.scale(0.5),
		// makes it fall to gravity and jumpable
		k.body(),
		// the custom component we defined above
		big(),
		k.anchor("bot"),
	])

	


	// action() runs every frame
	player.onUpdate(() => {
		// center camera to player
		camPos(player.pos)
		// check fall death
		if (player.pos.y >= FALL_DEATH) {
			go("lose")
		}
	})

	player.onBeforePhysicsResolve((collision) => {
		if (collision.target.is(["platform", "soft"]) && player.isJumping()) {
			collision.preventResolution()
		}
	})

	player.onPhysicsResolve(() => {
		// Set the viewport center to player.pos
		camPos(player.pos)
	})

	// if player onCollide with any obj with "danger" tag, lose
	player.onCollide("danger", () => {
		go("lose")
		
	})

	player.onCollide("portal", () => {
		
		if (levelId + 1 < LEVELS.length) {
			go("game", {
				levelId: levelId + 1,
				coins: coins,
				score: score, 
				
			})

		} else {
			go("win")
		}
	})

	player.onCollide('stairs', () => {
		onKeyPress('down', () => {
			if (levelId + 1 < LEVELS.length) {
				go("game", {
					levelId: levelId + 1,
					coins: coins,
					score: score, 
				})
			} else {
				go("win")
			}
		})
	})

	player.onCollideUpdate("ladder", (ladder) => {
		if (isKeyDown("up")) {
			player.move(0, 300)
			player.pos.y += -5
			player.jump(0)
		}
	
		if (isKeyReleased("up")) {
			player.move(0, 0); 
			player.pos.y += -5
		}
	})

	

	

	player.onGround((l) => {
		if (l.is("enemy")) {
			player.jump(JUMP_FORCE * 1.5)
			k.destroy(l)
			addKaboom(player.pos)
			
		}
	})

	player.onCollide(("enemy", "dangerous"), (e, col) => {
		// if it's not from the top, die
		if (!col.isBottom()) {
			go("lose")
			
		}
	})

	// Si toca el cofre, aparece corazon
	player.onCollide((obj) => {
		if (obj.is("cofre")) {
			const apple = level.spawn("8", obj.tilePos.sub(0, 1)) 
			apple.jump()
			
			destroy(obj)
			
		}
		
	})


	
	player.onGround((l) => {
		if (l.is("dangerous")) {
			destroy(l)
			k.addKaboom(player.pos)
			
		}
	})

	

	// grow an apple if player's head bumps into an obj with "prize" tag
	player.onHeadbutt((obj) => {
		if (obj.is("prize") ) {
			const apple = level.spawn("8", obj.tilePos.sub(0, 1)) //ahora es corazon
			apple.jump()
			
		}
		if (obj.is('coin-surprise')) {
			level.spawn('$', obj.tilePos.sub(0, 1))
			destroy(obj)
			level.spawn('2', obj.tilePos.sub(0, 0))
		}
		if (obj.is('mushroom-surprise')) {  //aun no se usa
			level.spawn('y', obj.tilePos.sub(0, 1))
		    destroy(obj)
		    level.spawn('2', obj.tilePos.sub(0, 0))
		}
	})


// --------------------------------------------------------------------------------------------------------------------




async function obtenerPreguntas() {
    try {
        const response = await axios.get('http://localhost:7000/api/admin/mostrar-preguntas');
        return response.data.data; // Asumiendo que la respuesta tiene la estructura { data: { data: [...] } }
    } catch (error) {
        console.error('Error al obtener preguntas:', error);
        return [];
    }
}

let questions = [];
let currentQuestionIndex = 0;
let questionVisible = false;

// Función para obtener una pregunta aleatoria
function obtenerPreguntaAleatoria() {
    currentQuestionIndex = Math.floor(Math.random() * questions.length);
    return questions[currentQuestionIndex] ;
}

async function showQuestion() {
    if (questions.length === 0) {
        questions = await obtenerPreguntas();
    }

    if (questions.length === 0) {
        console.error('No hay preguntas disponibles');
        return;
    }

    questionVisible = true;
    const question = obtenerPreguntaAleatoria();
    const questionElem = document.getElementById('question');
    const optionAElem = document.getElementById('optionA');
    const optionBElem = document.getElementById('optionB');
    const optionCElem = document.getElementById('optionC');
    const optionDElem = document.getElementById('optionD');

    questionElem.innerText = question.titulo;
    optionAElem.innerText = question.opcionA;
    optionBElem.innerText = question.opcionB;
    optionCElem.innerText = question.opcionC;
    optionDElem.innerText = question.opcionD;

    document.getElementById('question-container').style.display = 'block';
}

function hideQuestion() {
    questionVisible = false;
    document.getElementById('question-container').style.display = 'none';
    player.move(MOVE_SPEED, 0);
}




// Función para verificar la respuesta
function checkAnswer(answer) {
    const question = questions[currentQuestionIndex];
	const correcta = question.correcta
	// console.log(question.correcta)
	// console.log(answer)

    if (answer === correcta) {
        player.biggify(6);
        hideQuestion();
        score += 1; // Incrementa el puntaje
		scoreLabel.text = "Puntaje: " + score
		PUNTAJE = score
        // document.getElementById('score').innerText = "Puntaje: " + score; // Actualiza el texto del puntaje en la interfaz
        k.add([
            text("¡Correcto! ¡Haz click para moverte!"), 
        ]);
    } else {
        hideQuestion();
        k.add([
            text("¡Incorrecto! ¡Haz click para moverte!"), 
        ]);
    }
    onKeyPress(() => {
        player.move(MOVE_SPEED, 0);
    });
}

// Eventos de clic para los botones de respuesta
document.getElementById('optionA').addEventListener('click', () => checkAnswer('opcionA'));
document.getElementById('optionB').addEventListener('click', () => checkAnswer('opcionB'));
document.getElementById('optionC').addEventListener('click', () => checkAnswer('opcionC'));
document.getElementById('optionD').addEventListener('click', () => checkAnswer('opcionD'));

player.onCollide("apple", (a) => {
    destroy(a);
    showQuestion();
});






// ------------------------------------------------------------------------------------------------------------------------






	let coinPitch = 0
// creo que coinPitch es para el sonido de moneda, pero yo no escucho nada...
	onUpdate(() => {
		if (coinPitch > 0) {
			coinPitch = Math.max(0, coinPitch - dt() * 100)
		}
	})

	player.onCollide("coin", (c) => {
		destroy(c)
		
		coinPitch += 100
		coins += 1
		coinsLabel.text = "Monedas: " + coins
	})

	const coinsLabel = k.add([
		k.text("Monedas: ",  coins),
		k.pos(24, 24),
		k.fixed(),
	])

	const scoreLabel = k.add([
		k.text("Puntaje: ", score),
		k.pos(24, 64),
		k.fixed(),
	])

	function jump() {
		// these 2 functions are provided by body() component
		if (player.isGrounded()) {
			player.jump(CURRENT_JUMP_FORCE)
		}
	}

	// jump with space
	k.onKeyPress("space", jump)

	k.onKeyDown("left", () => {
		player.move(-MOVE_SPEED, 0)
	})

	k.onKeyDown("right", () => {
		player.move(MOVE_SPEED, 0)
	})

	k.onKeyPress("down", () => {
		player.weight = 3
	})

	k.onKeyRelease("down", () => {
		player.weight = 1
	})

	onGamepadButtonPress("south", jump)

	onGamepadStick("left", (v) => {
		player.move(v.x * MOVE_SPEED, 0)
	})

	k.onKeyPress("f", () => {
		setFullscreen(!isFullscreen())
	})

})

// score, coins, coinsLabel, scoreLabel dice que no estan definidas si las pongo aqui :c
scene("lose", () => {
	k.add([
		text("Perdiste! intentalo de nuevo!"), 
		k.pos(350, 200),
		k.fixed(),
	])
	k.add([
		k.text("Tu puntaje fue : " + PUNTAJE ),
		k.pos(350, 280),
		k.fixed(),
	])
	k.onKeyPress(() => go("game"))
})

scene("win", () => {
	k.add([
		text("Ganaste!!"),
		k.pos(530, 200),
		k.fixed(),
	])
	k.add([
		k.text("Muy bien! tu puntaje fue : " + PUNTAJE ),
		k.pos(300, 280),
		k.fixed(),
	])
	k.onKeyPress(() => go("game"))
})

go("game")



	  }
	}, []);
	return <canvas ref={gameContainerRef} />;
  }
	
  export default Game;


