class Scene1 extends Phaser.Scene {
  constructor(){
    super("bootGame");
  }

  preload ()
  {
    this.load.image('titlescreen', 'assets/DS_Title.png');
    this.load.image('btn', 'assets/buttontitle.png');
    this.load.spritesheet('cp', 'assets/cp.png', { frameWidth: 206, frameHeight: 184 } );
    this.load.audio('a', [ 'assets/audio/a.ogg', 'assets/audio/a.mp3' ]);
  }

  create(){
    this.anims.create({
      key: 'spin',
      frames: this.anims.generateFrameNumbers('cp', { start: 0, end: 50 }),
      frameRate: 30,
      repeat: -1
    });
    this.a = this.sound.add('a');

    //this.add.text(160,200,">> CAMPFIRE INVASION <<",{font: "70px visitor", fill:"#FFF"});
    this.add.sprite(game.config.width/2, game.config.height/2, 'titlescreen');

    let plight = this.add.pointlight(game.config.width/2-200, game.config.height/2-0, 0, 200, 0.5);
    plight.attenuation = 0.05;
    plight.color.setTo(200, 200, 200);


    let mybtn = this.add.sprite(game.config.width/2, game.config.height -100, 'btn');
    mybtn.scale = 0.5;
    let mytext = this.add.text(375,560,"Press [SPACEBAR] to continue.",{font: "28px visitor", fill:"#FFF"});

    this.tweens.add({
      targets:[mybtn,mytext],
      duration:750,
      yoyo: true,
      repeat:-1,
      delay:Math.random()*1000,
      alpha:{
        startDelay:Math.random()*5000,
        from:0,
        to:1,
      }
    })

    this.tweens.add({
      targets:plight,
      duration:2000,
      yoyo: true,
      repeat:-1,
      delay:Math.random()*1000,
      alpha:{
        startDelay:Math.random()*5000,
        from:0.5,
        to:1,
      }
    })



    this.input.keyboard.on('keydown-SPACE', function () {
      this.cameras.main.fadeOut(1000, 0, 0, 0)
      this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
        this.scene.start("tiledGame");
      })
    }, this);
    // :) (9)
    this.input.keyboard.on('keydown-A', function () {
      this.a.play({volume:.5});
      this.add.sprite(Math.random()*game.config.width, Math.random()*game.config.height, 'cp').play('spin', true);
    }, this);

  }
}
