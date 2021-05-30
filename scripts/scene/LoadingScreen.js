class LoadingScreen extends Phaser.Scene {
  constructor(){
    super("loadscreen");
  }


  preload ()
{

  this.load.spritesheet('loading', 'assets/loading.png', { frameWidth: 64, frameHeight: 16 } );
  this.load.image('load_bg', 'assets/loading_bg.png');

}

  create(data){
    this.loadbg = this.add.sprite(game.config.width/2, game.config.height/2, 'load_bg');
    let loadtext = this.add.text(game.config.width/2 - 50,game.config.height/2 -25,"Loading",{font: "28px visitor", fill:"#FFF"});
    this.loadb = this.add.sprite(game.config.width/2, game.config.height/2 + 25, 'loading');
    this.loadb.scale = 2;
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    this.loadb.anims.create({
      key: 'pingpong',
      frames: this.anims.generateFrameNumbers('loading', { start: 0, end: 7 }),
      frameRate: 5,
      repeat: -1
    });
    this.loadb.anims.play('pingpong',true);

    this.time.delayedCall(6000, function(){this.launchScene(data);}, null, this);

  }

  launchScene(nextScene){
    this.cameras.main.fadeOut(1000, 0, 0, 0)
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
      this.scene.start(nextScene);
    })
  }

  update(){

  }



}
