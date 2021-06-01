class Skuller extends Phaser.Physics.Arcade.Sprite{

  constructor(scene, x, y,) {
    super(scene, x, y, 'skuller');

    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.add.overlap(scene.player, this, function(){scene.player.getHit(this.x);});

    this.setBodySize(this.body.width-15,this.body.height);
    this.setOffset(5, 0);
    this.world = scene;
    this.scale = 3;
    this.isAlive = true;
    this.dir = 1;

    this.knockbackDirX = 1;
    this.isGettingHit = false;
    this.hitTimer = 0;
    this.maxHP = 3;
    this.currentHP = this.maxHP;

    this.isTriggered = false;
    this.isTracking = false;
    this.isOut = false;
    this.once = false;

    this.anims.create({
      key: 'wakeup',
      frames: this.anims.generateFrameNumbers('skuller', { start: 0, end: 12 }),
      frameRate: 5
    });

    this.anims.create({
      key: 'getdown',
      frames: this.anims.generateFrameNumbers('skuller', { start: 21, end: 33 }),
      frameRate: 5
    });

    this.anims.create({
      key: 'move',
      frames: this.anims.generateFrameNumbers('skuller', { start: 13, end: 20 }),
      frameRate: 5,
      repeat: -1
    });

    scene.anims.create({
      key: 'explode',
      frames: scene.anims.generateFrameNumbers('expl', { start: 0, end: 9 }),
      frameRate: 20,
      repeat: 0
    });

    this.on('animationcomplete',function () {
      if(this.anims.currentAnim.key === 'wakeup'){
        this.isTracking = true;
      }
    });

    this.on('animationcomplete',function () {
      if(this.anims.currentAnim.key === 'getdown'){
        this.isOut = false; this.isTriggered = false;
      }
    });

    this.killSound = scene.sound.add('splash');
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

    this.playerQuery();
    if(this.isTriggered){


      if(this.isTracking){

        if (this.x < this.world.player.x){this.flipX = true; this.dir = 1;}
        else{this.flipX = false; this.dir = -1;}
        this.anims.play('move', true);
        this.setVelocity(25*this.dir,0)


      } else {
        if(this.isOut){
          this.anims.play('getdown', true);
        }else{
          this.anims.play('wakeup', true);
        }
      } // Wakeup before track

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

  playerQuery(){


    //Player in range

    if (this.world.player.x > this.x - 200 && this.world.player.x < this.x + 200){
      if (this.world.player.y > this.y - 50 && this.world.player.y < this.y + 50){

        this.isTriggered = true;
        this.once = false;

      }

    }else{
      if(this.isTriggered){
        if(!this.once){

          this.once = true;
          this.isOut = true;
          this.isTracking = false;
          this.setVelocity(0,0)
        }


      }
    }


  }



}
