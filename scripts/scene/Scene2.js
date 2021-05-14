class Scene2 extends Phaser.Scene {
  constructor(){
    super("playGame");
  }


  preload ()
  {
    // Background
    this.load.image('blank', 'assets/blank.png');
    this.load.image('clouds', 'assets/clouds.png');
    this.load.image('bg_1', 'assets/bgsky.png');
    this.load.image('bg_2', 'assets/bgmountains.png');
    // Ground
    this.load.image('ground', 'assets/tile_ground.png');
    this.load.image('ground_L', 'assets/tile_ground_L.png');
    this.load.image('ground_R', 'assets/tile_ground_R.png');
    // Platforms
    this.load.image('d_platform', 'assets/plground.png');
    this.load.image('small_platform', 'assets/plground_small.png');

    // Objects
    this.load.image('door', 'assets/door2.png');
    this.load.image('gonext', 'assets/next.png');
    this.load.image('bullet', 'assets/bullet.png');


    this.load.image('mb', 'assets/mockey_bounce.png'); // Temp monster
    this.load.spritesheet('laser', 'assets/laser.png', { frameWidth: 128, frameHeight: 16 } );
    this.load.spritesheet('gunner', 'assets/gunner.png', { frameWidth: 32, frameHeight: 32 } );
    this.load.spritesheet('crawler', 'assets/crawler.png', { frameWidth: 32, frameHeight: 16 } );
    this.load.spritesheet('nash', 'assets/nash.png', { frameWidth: 32, frameHeight: 32 } );

  }

  create(){

    this.interactKey = this.input.keyboard.addKey('F'); // test interact


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

    // The Mighty Door
    //this.door=this.physics.add.sprite(3900,550,"door");
    //this.door.scale = 2;
    //this.add.text(3750,530,"Press [F] >>",{fontFamily: 'visitor', fill:"#FFF"});

    // Platforms
    var platforms;
    platforms = this.physics.add.staticGroup();

    // Ground
    for(let i=0; i<20; i++){
            platforms.create(i*64,645,'ground');
        }
    platforms.create(1280,645,'ground_R');
    for(let i=0; i<5; i++){
            platforms.create(i*64+2364,645,'ground');
        }
    platforms.create(2300,645,'ground_L');
    platforms.create(2684,645,'ground_R');
    for(let i=0; i<5; i++){
            platforms.create(i*64+3764,645,'ground');
        }
    platforms.create(3700,645,'ground_L');
    //

    platforms.create(600, 520, 'd_platform');
    platforms.create(-100, 350, 'd_platform');
    platforms.create(650, 320, 'd_platform');
    platforms.create(1320, 215, 'd_platform');
    platforms.create(1720, 215, 'small_platform');

    platforms.create(250, 420, 'small_platform');
    platforms.create(975, 220, 'small_platform');
    platforms.create(975, 220, 'small_platform');
    platforms.create(2100, 215, 'small_platform');
    platforms.create(1400, 500, 'small_platform');
    platforms.create(1800, 215, 'small_platform');

    platforms.create(2600, 525, 'small_platform');
    platforms.create(2700, 450, 'small_platform');
    platforms.create(3100, 375, 'd_platform');
    platforms.create(3500, 375, 'small_platform');


    // invisible wall
    var limit = this.physics.add.sprite(0, 0,'blank');
    limit.body.allowGravity = false;
    limit.body.immovable = true;
    limit.scaleY = game.config.height;

    // Monster invisible wall group (car j'ai la méga flemme)
    var mwalls;
    mwalls = this.physics.add.staticGroup();
    mwalls.create(1180, 590, 'blank').scale=10;
    mwalls.create(0, 590, 'blank').scale=10;
    mwalls.create(1120, 175, 'blank').scale=10;
    mwalls.create(1520, 175, 'blank').scale=10;
    mwalls.create(2260, 590, 'blank').scale=10;
    mwalls.create(2720, 590, 'blank').scale=10;



    // Entity
    this.player=new Player(this,50,550,'nash');
    this.physics.add.collider(this.player, platforms);
    this.physics.add.collider(this.player, limit);

    //this.mbounce = new Mockeybounce(this,200,200,'mb');
    //this.physics.add.collider(this.mbounce, platforms);

    this.crawler1 = new Crawler(this,400,550,'crawler');
    this.crawler2 = new Crawler(this,900,550,'crawler');
    this.crawler3 = new Crawler(this,1400,150,'crawler');
    this.crawler4 = new Crawler(this,2450,550,'crawler');

    this.physics.add.collider(this.crawler1, platforms);
    this.physics.add.collider(this.crawler1, mwalls);
    this.physics.add.collider(this.crawler2, platforms);
    this.physics.add.collider(this.crawler2, mwalls);
    this.physics.add.collider(this.crawler3, platforms);
    this.physics.add.collider(this.crawler3, mwalls);
    this.physics.add.collider(this.crawler4, platforms);
    this.physics.add.collider(this.crawler4, mwalls);
    this.physics.add.collider(this.crawler1, this.crawler2);

    this.gunner1 = new Gunner(this,650,200,'gunner');
    this.gunner2 = new Gunner(this,3200,200,'gunner');
    this.physics.add.collider(this.gunner1, platforms);
    this.physics.add.collider(this.gunner2, platforms);


    this.laser = new T_Laser(this, 1180,421,'laser');

    //this.physics.add.collider(this.door, platforms);
    //this.physics.add.overlap(this.player, this.door, this.exitDoor, null, this);

    this.iNext = new Info_Next(this,3900,500,'gonext');

    // Camera setup
    this.cameras.main.setBounds(0, 0, 4000, game.config.height);
    this.cameras.main.startFollow(this.player);
    //this.cameras.main.zoom = 1.5; meh


  }

  update(time,delta){
    super.update();
    this.player.move(this);
    //this.mbounce.upd();
    this.crawler1.upd(this);
    this.crawler2.upd(this);
    this.crawler3.upd(this);
    this.crawler4.upd(this);
    this.gunner1.upd(this);
    this.gunner2.upd(this);
    this.laser.upd();
    this.iNext.upd(delta);

    // Parralax
    this.bg_1.tilePositionX = this.cameras.main.scrollX * .2;
    this.bg_2.tilePositionX = this.cameras.main.scrollX * .5;
    this.bg_clouds.tilePositionX += .1;

    if(this.player.isBelow(700)){this.restart();}
    if(this.player.isPast(4000)){this.scene.start("nextGame");}

  }

  restart(){this.scene.start("playGame");}

}
