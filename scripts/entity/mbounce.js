class Mockeybounce extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y) {
        super(scene, x, y, 'mb');

		scene.add.existing(this);
    scene.physics.add.existing(this);
		//scene.physics.add.overlap(scene.player, this, scene.hitEnemy, false, scene);

		this.setBounce(1);
    this.setCollideWorldBounds(true);
    this.setVelocity(Phaser.Math.Between(-200, 200), 20);

    }

  upd(){

    if (this.body.velocity.x > 0){this.flipX = true;}
    else{this.flipX = false;}

  }

}
