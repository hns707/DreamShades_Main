class Gunner extends Phaser.Physics.Arcade.Sprite{

  constructor(scene, x, y,) {
    super(scene, x, y, 'gunner');

    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.add.overlap(scene.player, this, function(){scene.player.getHit(this.x);});

    this.setBodySize(this.body.width-15,this.body.height-9);
    this.setGravityY(5000);
    this.world = scene;
    this.scale = 3;
    this.isAlive = true;
    this.dir = 1;

    this.knockbackDirX = 1;
    this.isGettingHit = false;
    this.hitTimer = 0;
    this.maxHP = 1;
    this.currentHP = this.maxHP;

    scene.time.addEvent({ delay: 2000, callback: this.shoot, callbackScope: this, loop: true });

    this.anims.create({
      key: 'moving',
      frames: this.anims.generateFrameNumbers('gunner', { start: 0, end: 2 }),
      frameRate: 5,
      repeat: -1
    });

    scene.anims.create({
      key: 'explode',
      frames: scene.anims.generateFrameNumbers('expl', { start: 0, end: 9 }),
      frameRate: 20,
      repeat: 0
    });

    this.killSound = scene.sound.add('splash');
    this.shotSound = scene.sound.add('shot');
    this.hitSound = scene.sound.add('ehit');

  }

  setDeath(){
    this.killEffect();
    this.disableBody(true, true);
    this.isAlive = false;
  }

  killEffect(){
    let fx = this.world.add.sprite(this.x, this.y, 'expl').play('explode', true);
    this.killSound.play({volume:.5});
    fx.scale = 3;
    fx.once('animationcomplete', () => {fx.destroy()})
  }

  upd(){
    this.anims.play('moving', true);
    if (this.x < this.world.player.x){this.flipX = true; this.dir = 1;}
    else{this.flipX = false; this.dir = -1;}


    if(this.isGettingHit){
      if(this.hitTimer > 10){
        this.isGettingHit = false;
        this.setVelocity(10*this.knockbackDirX,0);

      }else{
        this.hitTimer++;
      }

    }



    // Follow player by sight
    if(this.body.touching.down){this.body.immovable = true;this.body.allowGravity = false;}


  }

  isBefore(x){if(this.x < x){return true;}else{return false;}}
  getHit(ex){
    if(!this.isGettingHit){
      this.hitSound.play({volume:.5});
      this.isGettingHit = true;
      this.knockbackDirX = 1;
      if(this.isBefore(ex)){this.knockbackDirX = -1;}

      if(this.currentHP!=0){ // avoid destroy null
        this.currentHP -=1;
      }
      this.setVelocityX(300*this.knockbackDirX);
      this.setVelocityY(-300);

      if(this.currentHP==0){
        this.setDeath();
      }
    }
  }

  shoot(){
    if(this.isAlive){
      if (this.world.player.x > this.x - 600 && this.world.player.x < this.x + 600){
        if (this.world.player.y > this.y - 200 && this.world.player.y < this.y + 100){
          this.shotSound.play({volume:.5});
          let bullet = new Gproj(this.world,this.x, this.y-15,'bullet').setVelocityX(250*this.dir);
          if(this.dir == 1){bullet.setFlip(true);}
      		this.world.physics.add.collider(bullet, this.world.platforms, function(){bullet.projOut();}, null, this.world);
        }
      }
    }

  }


}
