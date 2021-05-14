class Crawler extends Phaser.Physics.Arcade.Sprite{

  constructor(scene, x, y,) {
    super(scene, x, y, 'crawler');

    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.add.collider(scene.player, this);


    this.setBounceX(1);
    this.setGravityY(5000)
    this.setVelocity(-10,0);
    this.setBodySize(this.body.width-10,this.body.height-8);

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

    

  }

  setDeath(){
    console.log("hit");
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




}
