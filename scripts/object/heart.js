class Heart extends Phaser.Physics.Arcade.Sprite{

  constructor(scene, x, y) {
    super(scene, x, y, 'heart');

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.world = scene;
    this.body.immovable = true;
    this.body.allowGravity = false;
    this.scale = 2;
    this.startY = y;
    this.dirY = 1;
    let me = this;
    scene.physics.add.overlap(me, this.world.player, function(){me.pickUp();}, null, scene);

    this.clight = scene.add.pointlight(x, y, 0, 50, 0.5);
    this.clight.attenuation = 0.04;
    this.clight.color.setTo(255, 80, 80);

    scene.time.addEvent({ delay: 1, callback: this.upd, callbackScope: this, loop: true });
    this.cGet = scene.sound.add('crystalGet');


    this.world.tweens.add({
      targets:[this,this.clight],
      duration:2000,
      yoyo: true,
      repeat:-1,
      y:{
        from:this.y - 10,
        to:this.y + 10,
      }
    })

  }

  pickUp(){
    // Proceed HUD Update
    this.world.player.currentHP++;
    let i = this.world.player.currentHP -1;
    console.log(i);
    this.world.heart[i] = this.world.add.sprite(16+i*50, 16, 'heart').setOrigin(0,0).setScrollFactor(0);
    this.world.heart[i].scale = 2;
    this.world.heartlight[i] = this.world.add.pointlight(this.world.heart[i].x+16, this.world.heart[i].y+16, 0, 50, 0.5);
    this.world.heartlight[i].attenuation = 0.05;
    this.world.heartlight[i].color.setTo(255, 80, 80);
    this.world.heartlight[i].setScrollFactor(0);
    this.world.tweens.add({
      targets:this.world.heartlight[i],
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

    // =====================
    this.cGet.play({volume:.5});
    // Destroy object
    this.clight.destroy();
    this.destroy();
    // =====================

  }





}
