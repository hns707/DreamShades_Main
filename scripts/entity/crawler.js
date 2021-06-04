class Crawler extends Phaser.Physics.Arcade.Sprite{

  constructor(scene, x, y,) {
    super(scene, x, y, 'crawler');

    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.add.overlap(scene.player, this, function(){scene.player.getHit(this.x);});


    this.setBounceX(1);
    this.setGravityY(5000)
    this.setVelocity(-10,0);
    this.setBodySize(this.body.width-10,this.body.height-8);

    this.knockbackDirX = 1;
    this.isGettingHit = false;
    this.hitTimer = 0;
    this.maxHP = 2;
    this.currentHP = this.maxHP;

    this.world = scene;
    this.scale = 3;
    this.isAlive = true;


    this.anims.create({
      key: 'moving',
      frames: this.anims.generateFrameNumbers('crawler', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
      key: 'explode',
      frames: scene.anims.generateFrameNumbers('expl', { start: 0, end: 9 }),
      frameRate: 20,
      repeat: 0
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


    this.anims.play('moving', true);
    if (this.body.velocity.x > 0){this.flipX = true;}
    else{this.flipX = false;}

    if(this.isGettingHit){
      if(this.hitTimer > 10){
        this.isGettingHit = false;
        this.hitTimer = 0;
        this.setVelocity(10*this.knockbackDirX,0);

      }else{
        this.hitTimer++;
      }

    }

    // Ennemy hit Player
    //if ((this.body.touching.right && (this.world.player.body.touching.right || this.world.player.body.touching.left))
    //|| (this.body.touching.left && (this.world.player.body.touching.right || this.world.player.body.touching.left))
    //&& this.isAlive){
    //  this.world.player.getHit(this.x);
    //}
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




}
