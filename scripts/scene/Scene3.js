class Scene3 extends Phaser.Scene {
  constructor(){
    super("nextGame");
  }


  preload ()
{
  this.load.image('blank', 'assets/blank.png');
  this.load.image('clouds', 'assets/clouds.png');
  this.load.image('bg_1', 'assets/bgsky.png');
  this.load.image('bg_2', 'assets/bgmountains.png');
  this.load.image('ground', 'assets/tile_ground.png');
  this.load.image('ground_L', 'assets/tile_ground_L.png');
  this.load.image('ground_R', 'assets/tile_ground_R.png');

  this.load.image('d_platform', 'assets/plground.png');
  this.load.image('small_platform', 'assets/plground_small.png');
  this.load.image('door', 'assets/door2.png');
  this.load.image('mb', 'assets/mockey_bounce.png');
  this.load.spritesheet('nash', 'assets/nash.png', { frameWidth: 32, frameHeight: 32 } );

}

  create(){

    // Backgrounds
    this.bg_1 = this.add.tileSprite(0,0, game.config.width, game.config.height, "bg_1");
    this.bg_1.setOrigin(0,0);
    this.bg_1.setScrollFactor(0);

    this.bg_clouds = this.add.tileSprite(0,0, game.config.width, game.config.height, "clouds");
    this.bg_clouds.setOrigin(0,0);
    this.bg_clouds.setScrollFactor(0);

    this.bg_2 = this.add.tileSprite(0,0, game.config.width, game.config.height, "bg_2");
    this.bg_2.setOrigin(0,0);
    this.bg_2.setScrollFactor(0);

    var platforms;
    platforms = this.physics.add.staticGroup();

    // Ground
    for(let i=0; i<1280; i+=64){
            platforms.create(i,640,'ground');
        }
    platforms.create(1280,640,'ground_R');
    //

    platforms.create(900, 525, 'small_platform');
    platforms.create(1300, 425, 'd_platform');
    platforms.create(1600, 350, 'small_platform');

    // invisible wall
    var limit = this.physics.add.sprite(0, 0,'blank');
    limit.body.allowGravity = false;
    limit.body.immovable = true;
    limit.scaleY = game.config.height;



    this.player=new Player(this,50,550,'bob');
    this.physics.add.collider(this.player, platforms);
    this.physics.add.collider(this.player, limit);

    this.cameras.main.setBounds(0, 0, 4000, game.config.height);
    this.cameras.main.startFollow(this.player);

    this.endText = this.add.text(200, 200, 'THE END',{font:"120px Arial",fill: "#f00"});

  }

  update(){
    super.update();
    this.player.move();
    this.bg_1.tilePositionX = this.cameras.main.scrollX * .2;
    this.bg_2.tilePositionX = this.cameras.main.scrollX * .5;
    this.bg_clouds.tilePositionX += 1;
    if(this.player.isBelow(700)){this.player.setPosition(50,530);this.player.setVelocity(0,0);}
  }



}
