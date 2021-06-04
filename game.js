
var config = {
	type: Phaser.AUTO,
	width: 1200,
	height: 675,
	pixelArt: true,
	scale: {
		parent: 'game',
		//mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 1200 },
			debug: false
		}
	},
	scene: [TitleScreen, EndScreen, LoadingScreen, Map1_1, Map1_2]
}

var game = new Phaser.Game(config);
