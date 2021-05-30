class Map1_2 extends Phaser.Scene {
  constructor(){
    super("map1_2");
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
    this.load.audio('bgm2', [ 'assets/audio/crystal-battle1-loop.ogg', 'assets/audio/crystal-battle1-loop.mp3' ]);
    this.load.audio('crystalIn', [ 'assets/audio/crystal_set.ogg', 'assets/audio/crystal_set.mp3' ]);
    this.load.audio('flameon', [ 'assets/audio/flames_on.ogg', 'assets/audio/flames_on.mp3' ]);

    this.load.audio('f1', [ 'assets/audio/footsteps/f1.ogg', 'assets/audio/footsteps/f1.mp3' ]);
    this.load.audio('f2', [ 'assets/audio/footsteps/f2.ogg', 'assets/audio/footsteps/f2.mp3' ]);
    this.load.audio('f3', [ 'assets/audio/footsteps/f3.ogg', 'assets/audio/footsteps/f3.mp3' ]);
    this.load.audio('f4', [ 'assets/audio/footsteps/f4.ogg', 'assets/audio/footsteps/f4.mp3' ]);
    this.load.audio('f5', [ 'assets/audio/footsteps/f5.ogg', 'assets/audio/footsteps/f5.mp3' ]);

    // Background & Effects
    this.load.image('blank', 'assets/blank.png');
    this.load.image('bossmap1-bg', 'assets/map1/boss1map_bg.jpg');
    this.load.image('fog', 'assets/map1/loopfog.png');
    this.load.image('vignette', 'assets/vignette.png');

    // objects
    this.load.image('bullet', 'assets/bulletb.png');
    this.load.image('button', 'assets/map1/button.png');
    this.load.image('trigpf', 'assets/map1/triggered_platform.png');
    this.load.image('pillar', 'assets/map1/pillar.png');

    //HUD
    this.load.image('heart', 'assets/heart.png');


    // Dialogbox
    this.load.image('mark', 'assets/mark.png');
    this.load.image('nashdb', 'assets/nashdialog.png');
    this.load.image('shelldb', 'assets/shelldialog.png');
    this.load.image('bossjsdb', 'assets/bossjsdialog.png');

    // Spritesheets
    this.load.spritesheet('shell', 'assets/shell2.png', { frameWidth: 128, frameHeight: 64 } );
    this.load.spritesheet('expl', 'assets/explosion_monster2.png', { frameWidth: 32, frameHeight: 32 } );
    this.load.spritesheet('bossjs', 'assets/map1/boss1sprite.png', { frameWidth: 256, frameHeight: 256 } );
    this.load.spritesheet('bossjshp', 'assets/map1/bossjshp.png', { frameWidth: 128, frameHeight: 16 } );

    this.load.spritesheet('opendialog', 'assets/opendial2.png',{frameWidth: 1000, frameHeight: 160 });

    // Map & Tileset
    this.load.image('map1_ts', 'assets/map1/tiles.png');
    this.load.tilemapTiledJSON('bossmap1', 'assets/map1/boss1map.json');
  }

  create(){

    this.onceZoomOut = false;


    this.bgm2 = this.sound.add('bgm2');


    // Backgrounds
    this.add.sprite(0, 64, 'bossmap1-bg').setOrigin(0,0);

    this.btn = new Button(this,1515,1070, 'button');
    this.pillar = new Pillar(this,1600,970, 'pillar');
    this.pillar2 = new Pillar(this,1660,1225, 'pillar');
    this.pillar.setVertical();
    this.pillar2.setVertical();



    // Tilemap
    this.map = this.make.tilemap({ key: 'bossmap1' });
    this.mytileset = this.map.addTilesetImage('tiles','map1_ts', 64, 64);
    this.platforms = this.map.createLayer('ground', this.mytileset, 64, 64);
    this.platforms.setCollisionByProperty({ isCollider: true });
    //this.mwalls = this.map.createLayer('mwalls', this.mytileset, 64, 64);
    //this.mwalls.setCollisionByProperty({ isCollider: true });
    //this.mwalls.setAlpha(0);

    this.physics.world.setBounds(64, 64, this.map.widthInPixels,  this.map.heightInPixels+200);



    //NPC Test



    // Player
    this.player=new Player(this,150,1028,'shell'); // 150 / 2850 || Default
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.player, this.btn);
    this.physics.add.collider(this.player, this.pillar);
    this.physics.add.collider(this.player, this.pillar2);
    this.player.setCollideWorldBounds(true);

    //NPC
    this.bossDialogs = [];

    for (let i = 0 ; i < 6 ; i++){
      this.bossDialogs[i] = new Npc(this,2550,964,'mark').setAlpha(0);
      this.bossDialogs[i].isEnabled = false;
    };

    this.bossDialogs[0].setText('bossjsdb',"[???] :\nOhohohohohoh.",true,4000,false,true,this.bossDialogs[1]);
    this.bossDialogs[1].setText('bossjsdb',"[???] :\nYou aren't from this place, maybe from the other\nside of the light wall. Ohohohoh.",true,6000,false,true,this.bossDialogs[2]);
    this.bossDialogs[2].setText('bossjsdb',"[Joyous Sadness] :\nI'm the keeper of the [Shard of Happiness], I'm\nJoyous Sadness, what bring you here?",true,6000,false,true,this.bossDialogs[3]);
    this.bossDialogs[3].setText('shelldb',"[Stell] :\nI'm here for the shard, to reclaim what Exterro\nstole from the Dream Realm.",true,6000,false,true,this.bossDialogs[4]);
    this.bossDialogs[4].setText('bossjsdb',"[Joyous Sadness] :\nOhohohoh, you think our Lord Exterro would give\nme this shard he stole just to hand it to you?.",true,6000,false,true,this.bossDialogs[5]);
    this.bossDialogs[5].setText('shelldb',"[Stell] :\nThen, i'll take it by force.",true,3000,false,false);




    // Boss
    this.boss = new Boss_JoyousSadness(this,2920,600,'bossjs');
    this.physics.add.collider(this.boss, this.platforms);


    this.fog = this.add.tileSprite(0,0, this.map.widthInPixels+64, this.map.heightInPixels+64, "fog").setOrigin(0,0).setAlpha(0.2);


    // Camera setup
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    this.cameras.main.setBounds(64, 64, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true;

    //HUD HUD HUD HUD HUD TEMP TEMP TEMP TEMP
    // ==============================================================================
    this.vignette = this.add.sprite(this.cameras.main.width/2,this.cameras.main.height/2, 'vignette').setScrollFactor(0);
    this.heart = []; this.heartlight = [];



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

    this.btn.press(); if(this.btn.doEffect){this.btn.action(1,this.pillar,'right');}
    //Za pillar
    let p = this.pillar; let p2 = this.pillar2;
    if(p.Enabled){p.retract();}
    if(p2.Enabled){p2.retract();}

    this.zoomOutInArena();

    if(this.bossDialogs[0].isEnabled){this.bossDialogs[0].playerQuery();}
    if(this.bossDialogs[1].isEnabled){this.bossDialogs[1].playerQuery();}
    if(this.bossDialogs[2].isEnabled){this.bossDialogs[2].playerQuery();}
    if(this.bossDialogs[3].isEnabled){this.bossDialogs[3].playerQuery();}
    if(this.bossDialogs[4].isEnabled){this.bossDialogs[4].playerQuery();}
    if(this.bossDialogs[5].isEnabled){this.bossDialogs[5].playerQuery(); this.time.delayedCall(4000, function(){this.showBossHp();}, null, this);}


    if(this.onceZoomOut){
      //this.vignette.setPosition(this.cameras.main.width/2, this.cameras.main.height/2 ) ;
    }

    // Parralax
    this.fog.tilePositionX += .2;

    // restart on fall
    //if(this.player.isBelow(this.map.heightInPixels+50)){this.restart();}

  }

  restart(){this.bgm.stop();this.scene.start("map1_2");}

  outOfCinematic(isDoor,isMultiDials,nextnpc){ // After dial only
    this.dialbox.call();
    this.setPlayerLock(false);
    if(isDoor){this.door.playAnimation();}
    if(isMultiDials){nextnpc.isEnabled = true;}
  }

  showBossHp(){

    this.sound.stopAll();
    this.bgm2.play({volume:.2,loop:true});

    this.bossName = this.add.text(this.cameras.main.width/2 - 200, this.cameras.main.height - 50, "Joyous Sadness",{font: "48px visitor", fill:"#FFF"}).setScrollFactor(0).setAlpha(0);

    this.tweens.add({
      targets:this.bossName,
      duration:2000,
      delay:1500,
      alpha:{
        startDelay:0,
        from:0,
        to:1,
      }
    })


    this.hpboss = this.add.sprite(this.cameras.main.width/2,this.cameras.main.height + 20, 'bossjshp').setScrollFactor(0);
    this.hpboss.scale = 7;
    this.hpboss.anims.create({
      key: 'load',
      frames: this.anims.generateFrameNumbers('bossjshp', { start: 0, end: 15 }),
      frameRate: 5,
    });
    this.hpboss.anims.play('load',true);

  }

  zoomOutInArena(){
    if(this.player.x > 1700 && !this.onceZoomOut){
      let cam = this.cameras.main;
      this.tweens.add({
          targets: cam,
          zoom :{
            from: 1,
            to:0.8
          },
          duration: 3000
      });
      // VIGNETTE
      let v = this.vignette
      this.tweens.add({
        targets:v,
        duration:1000,
        scale:{
          startDelay:0,
          from:1,
          to:1.3,
        }
      });

      // hearts
      let lifeAmount = this.player.maxHP;
      for (let i = 0 ; i < lifeAmount ; i++){
        this.heart[i] = this.add.sprite((16+i*75)-125, 16-75, 'heart').setOrigin(0,0).setScrollFactor(0).setAlpha(0);
        this.heart[i].scale = 3;
        this.heartlight[i] = this.add.pointlight(this.heart[i].x+16, this.heart[i].y+16, 0, 50, 0.5);
      };
      // +++
      this.heart.forEach(h => {
        this.tweens.add({
          targets:h,
          duration:3000,
          delay:1500,
          alpha:{
            startDelay:3000,
            from:0,
            to:1,
          }
        })
      });

      // Heartlights
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
      this.bossDialogs[0].isEnabled = true;
      this.onceZoomOut = true;
      this.pillar2.enable('left');
    }

  }

  setPlayerLock(bool){
    this.player.controlsLocked = bool;
  }


}
