class Scene4 extends Phaser.Scene {
  constructor(){
    super("tiledGame");
  }


  preload ()
  {
    // SFX
    this.load.audio('shot', [ 'assets/audio/shot.ogg', 'assets/audio/shot.mp3' ]);
    this.load.audio('stomp', [ 'assets/audio/bstomp.ogg', 'assets/audio/bstomp.mp3' ]);
    this.load.audio('splash', [ 'assets/audio/splash.ogg', 'assets/audio/splash.mp3' ]);
    this.load.audio('bgm', [ 'assets/audio/eastern_wind.ogg', 'assets/audio/eastern_wind.mp3' ]);

    // Background
    this.load.image('blank', 'assets/blank.png');
    //this.load.image('clouds', 'assets/clouds.png');
    //this.load.image('bg_1', 'assets/bgsky.png');
    //this.load.image('bg_2', 'assets/bgmountains.png');

    // Tilemap
    //this.load.image('mytileset', 'assets/tileset.png');
    //this.load.tilemapTiledJSON('map', 'assets/tiledScene.json');

    // objects
    this.load.image('bullet', 'assets/bulletb.png');
    this.load.image('gonext', 'assets/next.png');
    this.load.image('help', 'assets/helpc.png');

    this.load.image('heart', 'assets/heart.png');
    //this.load.image('swh', 'assets/swordHit.png');


    // Dialogbox
    this.load.image('npctest', 'assets/npctest.png');
    this.load.image('nashdb', 'assets/nashdialog.png');

    // Spritesheets
    this.load.spritesheet('shell', 'assets/shell3.png', { frameWidth: 128, frameHeight: 64 } );
    this.load.spritesheet('crawler', 'assets/crawlerb.png', { frameWidth: 32, frameHeight: 16 } );
    this.load.spritesheet('gunner', 'assets/gunnerb.png', { frameWidth: 32, frameHeight: 32 } );
    this.load.spritesheet('expl', 'assets/explosion_monsterb.png', { frameWidth: 32, frameHeight: 32 } );

    this.load.spritesheet('opendialog', 'assets/opendial2.png',{frameWidth: 1000, frameHeight: 160 });

    //NEW MAP LOADS
    this.load.image('map1_bg', 'assets/map1/map1_bg.jpg');
    //this.load.image('map1_cov', 'assets/map1/map1_covering_b.png');
    this.load.image('map1_ts', 'assets/map1/tiles.png');
    this.load.tilemapTiledJSON('map1', 'assets/map1/map1_c.json');
  }

  create(){

    // BGM
    this.bgm = this.sound.add('bgm');
    this.bgm.play({volume:.2,loop:true});


    // Backgrounds
    this.add.sprite(2455, 1660, 'map1_bg');
    //this.add.sprite(2455, 1660, 'map1_cov');

    //this.bg_1 = this.add.tileSprite(0,0, game.config.width, game.config.height, "bg_1");
    //this.bg_1.setOrigin(0,0);
    //this.bg_1.setScrollFactor(0);

    //this.bg_clouds = this.add.tileSprite(0,0, game.config.width, game.config.height, "clouds");
    //this.bg_clouds.setOrigin(0,0);
    //this.bg_clouds.setScrollFactor(0);

    //this.bg_2 = this.add.tileSprite(0,250, game.config.width, game.config.height, "bg_2");
    //this.bg_2.setOrigin(0,0);
    //this.bg_2.setScrollFactor(0);

    // Tilemap
    this.map = this.make.tilemap({ key: 'map1' });
    this.mytileset = this.map.addTilesetImage('tiles','map1_ts', 64, 64);
    this.platforms = this.map.createLayer('ground', this.mytileset, 64, 64);
    this.platforms.setCollisionByProperty({ isCollider: true });
    this.mwalls = this.map.createLayer('mwalls', this.mytileset, 64, 64);
    this.mwalls.setCollisionByProperty({ isCollider: true });
    this.mwalls.setAlpha(0);

    this.physics.world.setBounds(64, 64, this.map.widthInPixels,  this.map.heightInPixels+200);

    //Infos
    //this.iNext = new Info_Next(this,3070,210,'gonext');
    this.add.sprite(750, 2800, 'help');

    //NPC Test
    this.npctest=new Npc(this,900,2910,'npctest');

    // Player
    this.player=new Player(this,150,2850,'shell');
    this.physics.add.collider(this.player, this.platforms);
    this.player.setCollideWorldBounds(true)



    // Crawlers spawn
    this.crawlerContainer=this.add.container();
    this.crawlersObjects = this.map.getObjectLayer('crawlers')['objects'];
    this.crawlersObjects.forEach(monsterObject => {
      let monster=new Crawler(this,monsterObject.x,monsterObject.y);
      this.crawlerContainer.add(monster);
      this.physics.add.collider(monster, this.platforms);
      this.physics.add.collider(monster, this.mwalls);
    });

    // Gunners spawn
    this.gunnerContainer=this.add.container();
    this.gunnersObjects = this.map.getObjectLayer('gunners')['objects'];
    this.gunnersObjects.forEach(monsterObject => {
      let monster=new Gunner(this,monsterObject.x,monsterObject.y);
      this.gunnerContainer.add(monster);
      this.physics.add.collider(monster, this.platforms);
      this.physics.add.collider(monster, this.mwalls);
    });





    // Camera setup
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    this.cameras.main.setBounds(64, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true;

    //HUD HUD HUD HUD HUD TEMP TEMP TEMP TEMP
    // ==============================================================================
    let lifeAmount = this.player.maxHP;
    this.heart = []; this.heartlight = [];

    for (let i = 0 ; i < lifeAmount ; i++){
      this.heart[i] = this.add.sprite(16+i*50, 16, 'heart').setOrigin(0,0).setScrollFactor(0);
      this.heart[i].scale = 2;
      this.heartlight[i] = this.add.pointlight(this.heart[i].x+16, this.heart[i].y+16, 0, 50, 0.5);
    };
    this.heartlight.forEach(l => {
      l.attenuation = 0.05;
      l.color.setTo(255, 80, 80);
      l.setScrollFactor(0);
      this.tweens.add({
        targets:l,
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
    });
    // ==============================================================================
    //HUD HUD HUD HUD HUD TEMP TEMP TEMP TEMP

    // DEBUG == DEBUG ==  DEBUG ==  DEBUG ==  DEBUG ==  DEBUG ==  DEBUG //
    // DEBUG == DEBUG ==  DEBUG ==  DEBUG ==  DEBUG ==  DEBUG ==  DEBUG //
    // let debugPlatforms = this.add.graphics().setAlpha(0.75);
    // this.platforms.renderDebug(debugPlatforms, {
    //   tileColor: null,
    //   collidingTileColor: new Phaser.Display.Color(20, 200, 20, 100),
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255)
    // });
    // let debugMwalls = this.add.graphics().setAlpha(0.75);
    // this.mwalls.renderDebug(debugMwalls, {
    //   tileColor: null,
    //   collidingTileColor: new Phaser.Display.Color(200, 20, 20, 100),
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255)
    // });
    // DEBUG == DEBUG ==  DEBUG ==  DEBUG ==  DEBUG ==  DEBUG ==  DEBUG //
    // DEBUG == DEBUG ==  DEBUG ==  DEBUG ==  DEBUG ==  DEBUG ==  DEBUG //

  }

  update(time,delta){
    super.update();
    this.player.move(this,delta);

    // AAAAAAAAAH I GOTCHA
    this.crawlerContainer.each(function (child) {child.upd();});
    this.gunnerContainer.each(function (child) {child.upd();});

    //this.iNext.upd(delta);

    //mmmmm
    this.npctest.playerQuery();

    // Parralax
    //this.bg_2.tilePositionX = this.cameras.main.scrollX * .5;
    //this.bg_2.tilePositionY = this.cameras.main.scrollY * .1;
    //this.bg_clouds.tilePositionX += .1;

    if(this.player.isBelow(this.map.heightInPixels+50)){this.restart();}

    if(this.player.isPast(this.map.widthInPixels + 20)&&this.player.isOver(290)){
      this.scene.start("playGame");
    }
  }

  myDialbox(b, n){ // b : is Active? || n : Who?
    if(b){
      this.dialbox = new Dialogbox(this, 100, 450, 'opendialog');
      this.dialbox.setOrigin(0,0).setScrollFactor(0);
      this.dialbox.call();
    }
    else{this.dialbox.call();}
  }
  restart(){this.bgm.stop();this.scene.start("tiledGame");}
}
