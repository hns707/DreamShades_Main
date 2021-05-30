class Boss_JoyousSadness extends Phaser.Physics.Arcade.Sprite{

  constructor(scene, x, y,) {
    super(scene, x, y, 'bossjs');

    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.add.overlap(scene.player, this, function(){scene.player.getHit(this.x);});

    this.setBodySize(this.body.width-150,this.body.height-120);
    this.setOffset(70, 78);
    this.world = scene;
    this.scale = 2.2;
    this.isAlive = true;
    this.dir = 1;

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('bossjs', { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.play('idle',true);


  }


}
