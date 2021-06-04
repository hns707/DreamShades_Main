class EndScreen extends Phaser.Scene {
  constructor(){
    super("endscreen");
  }


  preload ()
{

  this.load.image('load_bg', 'assets/loading_bg.png');

}

  create(data){
    this.loadbg = this.add.sprite(game.config.width/2, game.config.height/2, 'load_bg');
    let loadtext = this.add.text(game.config.width/2 - 350,game.config.height/2 -25,"Thanks for playing !",{font: "64px visitor", fill:"#FFF"});
    this.cameras.main.fadeIn(1000, 0, 0, 0);


    this.time.delayedCall(4000, function(){this.launchScene("bootGame");}, null, this);

  }

  launchScene(nextScene){
    this.cameras.main.fadeOut(1000, 0, 0, 0)
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
      this.scene.start(nextScene);
    })
  }


}
