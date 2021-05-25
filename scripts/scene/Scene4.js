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
    this.load.audio('sw', [ 'assets/audio/swing.ogg', 'assets/audio/swing.mp3' ]);
    this.load.audio('ehit', [ 'assets/audio/hit_organic.ogg', 'assets/audio/hit_organic.mp3' ]);
    this.load.audio('phit', [ 'assets/audio/hit_metal.ogg', 'assets/audio/hit_metal.mp3' ]);
    this.load.audio('bend', [ 'assets/audio/button_end.ogg', 'assets/audio/button_end.mp3' ]);
    this.load.audio('bgm', [ 'assets/audio/crystal-exploration1.ogg', 'assets/audio/crystal-exploration1.mp3' ]);

    // Background
    this.load.image('blank', 'assets/blank.png');
    this.load.image('map1_bg', 'assets/map1/map1-bg.jpg');
    this.load.image('fog', 'assets/map1/loopfog.png');

    // objects
    this.load.image('bullet', 'assets/bulletb.png');
    this.load.image('gonext', 'assets/next.png');
    this.load.image('help', 'assets/helpc.png');
    this.load.image('button', 'assets/map1/button.png');
    this.load.image('trigpf', 'assets/map1/triggered_platform.png');
    this.load.image('door', 'assets/map1/door.png');

    //HUD
    this.load.image('heart', 'assets/heart.png');


    // Dialogbox
    this.load.image('mark', 'assets/mark.png');
    this.load.image('nashdb', 'assets/nashdialog.png');
    this.load.image('shelldb', 'assets/shelldialog.png');

    // Spritesheets
    this.load.spritesheet('shell', 'assets/shell3.png', { frameWidth: 128, frameHeight: 64 } );
    this.load.spritesheet('crawler', 'assets/crawler2.png', { frameWidth: 32, frameHeight: 32 } );
    this.load.spritesheet('gunner', 'assets/gunnerb.png', { frameWidth: 32, frameHeight: 32 } );
    this.load.spritesheet('expl', 'assets/explosion_monster2.png', { frameWidth: 32, frameHeight: 32 } );

    this.load.spritesheet('opendialog', 'assets/opendial2.png',{frameWidth: 1000, frameHeight: 160 });

    // Map & Tileset
    this.load.image('map1_ts', 'assets/map1/tiles.png');
    this.load.tilemapTiledJSON('map1', 'assets/map1/map1_i.json');
  }

  create(){

    // BGM
    this.bgm = this.sound.add('bgm');
    this.bgm.play({volume:.2,loop:true});


    // Backgrounds
    this.add.sprite(2465, 1665, 'map1_bg');


    // Buttons & Platforms
    this.btn = new Button(this,3325,2030, 'button');
    this.tp1 = new Trigger_Platform(this, 3500, 2025, 'trigpf');

    this.btn2 = new Button(this,190,1265, 'button');
    this.tp2 = new Trigger_Platform(this, 1650, 1540, 'trigpf');

    this.btn3 = new Button(this,4095,1005, 'button');
    this.tp3 = new Trigger_Platform(this, 1150, 560, 'trigpf');

    //End door
    this.door = this.add.sprite(4600, 2240, 'door');
    this.door.scale = 3;
    this.doorlights = [];

    this.doorlights[0] = this.add.pointlight(4488, 2195, 0, 50, 0.5);
    this.doorlights[1] = this.add.pointlight(4488, 2310, 0, 50, 0.5);
    this.doorlights[2] = this.add.pointlight(4708, 2195, 0, 50, 0.5);
    this.doorlights[3] = this.add.pointlight(4708, 2310, 0, 50, 0.5);
    this.doorlights[4] = this.add.pointlight(4598, 2075, 0, 50, 0.5);

    for (let i = 0 ; i < 5 ; i++){
      this.doorlights[i].attenuation = 0.04;
      this.doorlights[i].color.setTo(171, 17, 221);
    };






    // Tilemap
    this.map = this.make.tilemap({ key: 'map1' });
    this.mytileset = this.map.addTilesetImage('tiles','map1_ts', 64, 64);
    this.platforms = this.map.createLayer('ground', this.mytileset, 64, 64);
    this.platforms.setCollisionByProperty({ isCollider: true });
    this.mwalls = this.map.createLayer('mwalls', this.mytileset, 64, 64);
    this.mwalls.setCollisionByProperty({ isCollider: true });
    this.mwalls.setAlpha(0);

    this.physics.world.setBounds(64, 64, this.map.widthInPixels,  this.map.heightInPixels+200);



    //NPC Test
    this.npctest=new Npc(this,900,2910,'mark').setAlpha(0);
    this.npctest.setText('nashdb',"[DEV] :\nThis level is still under construction, you may\nbe stucked at some point, have fun!");
    this.doorDB=new Npc(this,4595,2370,'mark').setAlpha(0);
    this.doorDB.setText('shelldb',"[Shell] :\nThis door seems sealed, there must be a way to\nopen it.");

    // Player
    this.player=new Player(this,644,2052,'shell'); // 150 / 2850 || Default
    this.physics.add.collider(this.player, this.platforms);
    //BTNS
    this.physics.add.collider(this.player, this.btn);
    this.physics.add.collider(this.player, this.btn2);
    this.physics.add.collider(this.player, this.btn3);
    this.player.setCollideWorldBounds(true)



    // Crawlers spawn
    this.crawlerContainer=this.add.container();
    this.crawlersObjects = this.map.getObjectLayer('crawlers')['objects'];
    this.crawlersObjects.forEach(monsterObject => {
      let monster=new Crawler(this,monsterObject.x+100,monsterObject.y);
      this.crawlerContainer.add(monster);
      this.physics.add.collider(monster, this.platforms);
      this.physics.add.collider(monster, this.mwalls);
    });

    // Gunners spawn
    this.gunnerContainer=this.add.container();
    this.gunnersObjects = this.map.getObjectLayer('gunners')['objects'];
    this.gunnersObjects.forEach(monsterObject => {
      let monster=new Gunner(this,monsterObject.x+100,monsterObject.y);
      this.gunnerContainer.add(monster);
      this.physics.add.collider(monster, this.platforms);
      this.physics.add.collider(monster, this.mwalls);
    });


    this.fog = this.add.tileSprite(0,0, this.map.widthInPixels+64, this.map.heightInPixels+64, "fog").setOrigin(0,0).setAlpha(0.2);

    //Infos
    //this.iNext = new Info_Next(this,3070,210,'gonext');
    this.add.sprite(200, 3100, 'help');



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

    // Player moves
    this.player.move(this,delta);

    // Everyone does their own things
    this.crawlerContainer.each(function (child) {child.upd();});
    this.gunnerContainer.each(function (child) {child.upd();});

    //this.iNext.upd(delta);

    //mmmmm
    this.npctest.playerQuery();
    this.doorDB.playerQuery();

    // Connect buttons to fpfs
    this.btn.press(); if(this.btn.doEffect){this.btn.action(0,this.tp1);}
    this.btn2.press(); if(this.btn2.doEffect){this.btn2.action(0,this.tp2);}
    this.btn3.press(); if(this.btn3.doEffect){this.btn3.action(0,this.tp3);}

    // Parralax
    this.fog.tilePositionX += .2;

    // restart on fall
    if(this.player.isBelow(this.map.heightInPixels+50)){this.restart();}

  }



  restart(){this.bgm.stop();this.scene.start("tiledGame");}
}
