
var config = {
	type: Phaser.AUTO,
    width: 1200,
    height: 675,
		pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1200 },
            debug: false
        }
    },
	scene: [Scene1, Scene2, Scene3, Scene4]
}

var game = new Phaser.Game(config);
