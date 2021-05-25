class Trigger_Platform extends Phaser.Physics.Arcade.Sprite{

  constructor(scene, x, y,) {
    super(scene, x, y, 'trigpf');


    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.world = scene;
    this.body.immovable = true;
    this.body.allowGravity = false;
    this.setAlpha(0.1);



  }



  show(){
    this.world.tweens.add({
      targets:[this],
      duration:750,
      yoyo: false,
      delay:Math.random()*1000,
      alpha:{
        startDelay:Math.random()*7500,
        from:0.1,
        to:1,
      }
    });
    this.world.physics.add.collider(this.world.player, this);
  }

}
