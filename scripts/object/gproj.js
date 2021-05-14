class Gproj extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y) {
        super(scene, x, y, 'bullet');

		scene.add.existing(this);
    scene.physics.add.existing(this);
		scene.physics.add.overlap(scene.player, this, scene.restart, null, scene);
    this.body.allowGravity = false;
    this.scale = 2;

    }

    // WIP WIP WIP WIP WIP WIP WIP WIP
      // WIP WIP WIP WIP WIP WIP WIP WIP
        // WIP WIP WIP WIP WIP WIP WIP WIP
          // WIP WIP WIP WIP WIP WIP WIP WIP

}
