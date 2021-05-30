class Map1_1 extends Phaser.Scene {
  constructor(){
    super("map1_1");
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
    this.load.audio('crystalIn', [ 'assets/audio/crystal_set.ogg', 'assets/audio/crystal_set.mp3' ]);
    this.load.audio('crystalGet', [ 'assets/audio/crystalget.ogg', 'assets/audio/crystalget.mp3' ]);
    this.load.audio('flameon', [ 'assets/audio/flames_on.ogg', 'assets/audio/flames_on.mp3' ]);

    this.load.audio('f1', [ 'assets/audio/footsteps/f1.ogg', 'assets/audio/footsteps/f1.mp3' ]);
    this.load.audio('f2', [ 'assets/audio/footsteps/f2.ogg', 'assets/audio/footsteps/f2.mp3' ]);
    this.load.audio('f3', [ 'assets/audio/footsteps/f3.ogg', 'assets/audio/footsteps/f3.mp3' ]);
    this.load.audio('f4', [ 'assets/audio/footsteps/f4.ogg', 'assets/audio/footsteps/f4.mp3' ]);
    this.load.audio('f5', [ 'assets/audio/footsteps/f5.ogg', 'assets/audio/footsteps/f5.mp3' ]);

    // Background & Effects
    this.load.image('blank', 'assets/blank.png');
    this.load.image('map1-bg', 'assets/map1/map1_bg.jpeg');
    this.load.image('fog', 'assets/map1/loopfog.png');
    this.load.image('vignette', 'assets/vignette.png');

    // objects
    this.load.image('bullet', 'assets/bulletb.png');
    this.load.image('gonext', 'assets/next.png');
    this.load.image('help', 'assets/helpc.png');
    this.load.image('button', 'assets/map1/button.png');
    this.load.image('trigpf', 'assets/map1/triggered_platform.png');
    this.load.image('pillar', 'assets/map1/pillar.png');

    //HUD
    this.load.image('heart', 'assets/heart.png');
    this.load.image('nocrystal', 'assets/nocrystal.png');
    this.load.image('yescrystal', 'assets/crystal.png');


    // Dialogbox
    this.load.image('mark', 'assets/mark.png');
    this.load.image('nashdb', 'assets/nashdialog.png');
    this.load.image('shelldb', 'assets/shelldialog.png');

    // Spritesheets
    this.load.spritesheet('shell', 'assets/shell2.png', { frameWidth: 128, frameHeight: 64 } );
    this.load.spritesheet('crawler', 'assets/crawler2.png', { frameWidth: 32, frameHeight: 32 } );
    this.load.spritesheet('gunner', 'assets/gunnermonkb.png', { frameWidth: 32, frameHeight: 32 } );
    this.load.spritesheet('expl', 'assets/explosion_monster2.png', { frameWidth: 32, frameHeight: 32 } );
    this.load.spritesheet('bossdoor', 'assets/map1/boss_door.png', { frameWidth: 128, frameHeight: 128 } );

    this.load.spritesheet('opendialog', 'assets/opendial2.png',{frameWidth: 1000, frameHeight: 160 });

    // Map & Tileset
    this.load.image('map1_ts', 'assets/map1/tiles.png');
    this.load.tilemapTiledJSON('map1', 'assets/map1/map1_m.json');
  }

  create(){


    this.spaceOnce = false;

    // BGM
    this.bgm = this.sound.add('bgm');
    this.bgm.play({volume:.2,loop:true});


    // Backgrounds
    this.add.sprite(2465, 1665, 'map1-bg');

    this.addlightbulbs();

    // Buttons & Platforms
    this.btn = new Button(this,3325,2030, 'button');
    this.tp1 = new Trigger_Platform(this, 3500, 2025, 'trigpf');

    this.btn2 = new Button(this,190,1265, 'button');
    this.tp2 = new Trigger_Platform(this, 1650, 1540, 'trigpf');

    this.btn3 = new Button(this,4095,1005, 'button');
    this.tp3 = new Trigger_Platform(this, 1150, 560, 'trigpf');

    this.btn4 = new Button(this,4543,1905, 'button');
    this.pillar1 = new Pillar(this, 4555,1630, 'pillar');

    //End door
    this.door = new Bossdoor(this, 4600, 2240, 'bossdoor');


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
    this.firstCrystalDialog = new Npc(this,700,2884,'mark').setAlpha(0);
    this.firstCrystalDialog.setText('shelldb',"[Stell] :\nThis crystal have a strange energy around it.\nI feel a connection between it and this place, it\nmight be a good idea to take it.",true,6000,false,false);

    this.doorDialog = new Npc(this,4595,2370,'mark').setAlpha(0);
    this.doorDialog.setText('shelldb',"[Stell] :\nThis door seems sealed.\nMaybe if I find enough of these crystals shards\nto fill all the slots..",false);

    // Player
    this.player=new Player(this,150,2884,'shell'); // 150 / 2884 || Default
    this.physics.add.collider(this.player, this.platforms);
    //BTNS
    this.physics.add.collider(this.player, this.btn);
    this.physics.add.collider(this.player, this.btn2);
    this.physics.add.collider(this.player, this.btn3);
    this.physics.add.collider(this.player, this.btn4);
    this.physics.add.collider(this.player, this.pillar1);
    this.player.setCollideWorldBounds(true);


    //Crystals
    this.crystalBox = [];
    this.crystalBox[0] = new Crystal(this, 700, 2884, 'yescrystal');
    this.crystalBox[1] = new Crystal(this, 3520, 2756, 'yescrystal');
    this.crystalBox[2] = new Crystal(this, 225, 260, 'yescrystal');
    this.crystalBox[3] = new Crystal(this, 2600, 708, 'yescrystal');
    this.crystalBox[4] = new Crystal(this, 4537, 772, 'yescrystal');

    // Door testing (Start at : 4124 , 2372)
    //this.crystalBox[5] = new Crystal(this, 4337, 2372, 'yescrystal');
    //this.crystalBox[6] = new Crystal(this, 4337, 2372, 'yescrystal');
    //this.crystalBox[7] = new Crystal(this, 4337, 2372, 'yescrystal');
    //this.crystalBox[8] = new Crystal(this, 4337, 2372, 'yescrystal');
    //this.crystalBox[9] = new Crystal(this, 4337, 2372, 'yescrystal');


    this.crystalBox.forEach(crstl => {
      this.physics.add.overlap(crstl, this.player, function(){crstl.pickUp();}, null, this);
    })


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
    //this.add.sprite(200, 3100, 'help');



    // Camera setup
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    this.cameras.main.setBounds(64, 64, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true;

    //HUD HUD HUD HUD HUD TEMP TEMP TEMP TEMP
    // ==============================================================================
    this.add.sprite(0, 0, 'vignette').setOrigin(0,0).setScrollFactor(0);
    let lifeAmount = this.player.maxHP;
    this.heart = []; this.heartlight = [];
    this.crystals = []; this.crystalLight = [];

    for (let i = 0 ; i < 5 ; i++){
      this.crystals[i] = this.add.sprite(16+i*50, 64, 'nocrystal').setOrigin(0,0).setScrollFactor(0).setAlpha(0.7);
      this.crystals[i].scale = 2;
      this.crystalLight[i] = this.add.pointlight(this.crystals[i].x+16, this.crystals[i].y+16, 0, 50, 0.5);
    };

    this.crystalLight.forEach(c => {

      c.setScrollFactor(0);
      this.tweens.add({
        targets:c,
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

    this.doorToNext();

    // Player moves
    this.player.move(this,delta);

    // Everyone does their own things
    this.crawlerContainer.each(function (child) {child.upd();});
    this.gunnerContainer.each(function (child) {child.upd();});

    //this.iNext.upd(delta);
    this.crystalBox.forEach(crstl => {crstl.upd(delta)});

    //mmmmm
    if(this.firstCrystalDialog.isEnabled){this.firstCrystalDialog.playerQuery();}
    if(this.doorDialog.isEnabled){this.doorDialog.playerQuery();}
    if(this.door.onGoing){this.door.doorAnimCheck();}

    // Connect buttons to fpfs
    this.btn.press(); if(this.btn.doEffect){this.btn.action(0,this.tp1,null);}
    this.btn2.press(); if(this.btn2.doEffect){this.btn2.action(0,this.tp2,null);}
    this.btn3.press(); if(this.btn3.doEffect){this.btn3.action(0,this.tp3,null);}
    this.btn4.press(); if(this.btn4.doEffect){this.btn4.action(1,this.pillar1,'right');}

    //Za pillar
    let p = this.pillar1;
    if(p.Enabled){p.retract();}

    // Parralax
    this.fog.tilePositionX += .2;

    // restart on fall
    if(this.player.isBelow(this.map.heightInPixels+50)){this.restart();}

  }
  restart(){this.bgm.stop();this.scene.start("map1_1");}

  outOfCinematic(isDoor,isMultiDials,rootNpc){ // After pickup only
    this.dialbox.call();
    this.setPlayerLock(false);
    if(isDoor){this.door.playAnimation();}
    if(isMultiDials){rootNpc.nextNpc.isEnabled = true;}
  }

  setPlayerLock(bool){
    this.player.controlsLocked = bool;
  }

  doorToNext(){
    if(this.player.dtiEnabled && !this.spaceOnce){
      if (this.player.interactKey.isDown){
        this.spaceOnce = true;
        this.cameras.main.fadeOut(1000, 0, 0, 0)
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
          this.scene.start("loadscreen","map1_2");
        })
      }
    }
  }

  addlightbulbs(){
    // CA BRILLE AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    // Y'EN A PARTOUT AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    // C'EST PAS OPTI MAIS VOILA RBBRBRBRRBRBRBRBRBBRBR
    this.lightbulbs = [];
    this.lightbulbs[0] = this.add.pointlight(2460, 2350, 0, 50, 0.5);
    this.lightbulbs[1] = this.add.pointlight(2490, 2347, 0, 50, 0.5);
    this.lightbulbs[2] = this.add.pointlight(2520, 2310, 0, 50, 0.5);
    this.lightbulbs[3] = this.add.pointlight(2550, 2290, 0, 50, 0.5);
    this.lightbulbs[4] = this.add.pointlight(2595, 2265, 0, 50, 0.5);
    this.lightbulbs[5] = this.add.pointlight(2655, 2195, 0, 50, 0.5);
    this.lightbulbs[6] = this.add.pointlight(2522, 2485, 0, 50, 0.5);
    this.lightbulbs[7] = this.add.pointlight(2560, 2455, 0, 50, 0.5);
    this.lightbulbs[8] = this.add.pointlight(2592, 2425, 0, 50, 0.5);
    this.lightbulbs[9] = this.add.pointlight(2640, 2390, 0, 50, 0.5);
    this.lightbulbs[10] = this.add.pointlight(2670, 2370, 0, 50, 0.5);
    this.lightbulbs[11] = this.add.pointlight(2535, 2700, 0, 50, 0.5);
    this.lightbulbs[12] = this.add.pointlight(2620, 2650, 0, 50, 0.5);
    this.lightbulbs[13] = this.add.pointlight(2920, 2780, 0, 50, 0.5);
    this.lightbulbs[14] = this.add.pointlight(2940, 2780, 0, 50, 0.5);
    this.lightbulbs[15] = this.add.pointlight(2985, 2780, 0, 50, 0.5);
    this.lightbulbs[16] = this.add.pointlight(3025, 2700, 0, 50, 0.5);
    this.lightbulbs[17] = this.add.pointlight(3350, 2145, 0, 50, 0.5);
    this.lightbulbs[18] = this.add.pointlight(3400, 2145, 0, 50, 0.5);

    this.lightbulbs[19] = this.add.pointlight(4027, 2520, 0, 50, 0.5);
    this.lightbulbs[20] = this.add.pointlight(4080, 2500, 0, 50, 0.5);
    this.lightbulbs[21] = this.add.pointlight(4005, 2630, 0, 50, 0.5);

    this.lightbulbs[22] = this.add.pointlight(4440, 1965, 0, 50, 0.5);
    this.lightbulbs[23] = this.add.pointlight(4480, 1995, 0, 50, 0.5);
    this.lightbulbs[24] = this.add.pointlight(4522, 1870, 0, 50, 0.5);

    this.lightbulbs[25] = this.add.pointlight(2700, 2150, 0, 50, 0.5);
    this.lightbulbs[26] = this.add.pointlight(2740, 2120, 0, 50, 0.5);

    this.lightbulbs[27] = this.add.pointlight(4635, 945, 0, 50, 0.5);
    this.lightbulbs[28] = this.add.pointlight(4705, 1000, 0, 50, 0.5);

    this.lightbulbs[29] = this.add.pointlight(4700, 1440, 0, 50, 0.5);
    this.lightbulbs[30] = this.add.pointlight(4645, 1345, 0, 50, 0.5);
    this.lightbulbs[31] = this.add.pointlight(4700, 1220, 0, 50, 0.5);
    this.lightbulbs[32] = this.add.pointlight(4625, 1120, 0, 50, 0.5);


    for (let i = 0 ; i < 33 ; i++){
      this.lightbulbs[i].attenuation = 0.04;
      this.lightbulbs[i].color.setTo(171, 17, 221);
    };
    // ======================================================
  }


}
