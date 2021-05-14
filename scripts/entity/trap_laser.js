class T_Laser extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y) {
        super(scene, x, y, 'laser');

		scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.add.overlap(scene.player, this, scene.restart, false, scene);

    this.body.immovable = true;
    this.body.allowGravity = false;
    this.scale = 3;
    this.angle = 90;
    this.setBodySize(this.body.height-10,this.body.width);
    this.isEnabled = true;

    this.anims.create({
      key: 'on',
      frames: this.anims.generateFrameNumbers('laser', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'off',
      frames: [ { key: 'laser', frame: 2 } ],
      frameRate: 10,
      repeat: -1
    });

    }

    upd(){
      if (this.isEnabled){this.anims.play('on', true);}
      else{this.anims.play('off', true);}
    }



}
