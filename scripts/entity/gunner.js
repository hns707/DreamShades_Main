class Gunner extends Phaser.Physics.Arcade.Sprite{

  constructor(scene, x, y,) {
    super(scene, x, y, 'gunner');

    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.add.collider(scene.player, this);

    this.setBodySize(this.body.width-15,this.body.height-9);
    this.setGravityY(5000)
    this.world = scene;
    this.scale = 3;
    this.isAlive = true;
    this.dir = 1;
    this.bullet = null;

    scene.time.addEvent({ delay: 1000, callback: this.shoot, callbackScope: this, loop: true });

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

    if(this.bullet){
      if(this.bullet.body.blocked.left){
        console.log("boop");
        this.bullet.destroy();
      }else{console.log("ee");}
    }


    // Follow player by sight
    if(this.body.touching.down){this.body.immovable = true;this.body.allowGravity = false;}

    // Player kill Ennemy
    if (this.body.touching.up && this.isAlive){
      this.world.player.setVelocityY(-400);
      this.killEffect();
      this.disableBody(true, true);
      this.isAlive = false;
    }
    // Ennemy kill Player
    if ((this.body.touching.right && (this.world.player.body.touching.right || this.world.player.body.touching.left))
    || (this.body.touching.left && (this.world.player.body.touching.right || this.world.player.body.touching.left))
    && this.isAlive){
      this.world.restart();
    }
  }

  shoot(){
    if(this.isAlive){
      if (this.world.player.x > this.x - 600 && this.world.player.x < this.x + 600){
        if (this.world.player.y > this.y - 200 && this.world.player.y < this.y + 100){
          this.shotSound.play({volume:.5});
          this.bullet = new Gproj(this.world,this.x, this.y-15,'bullet').setVelocityX(250*this.dir);
        }
      }
    }

  }


}
