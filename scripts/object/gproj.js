class Gproj extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y) {
        super(scene, x, y, 'bullet');

		scene.add.existing(this);
    scene.physics.add.existing(this);
		scene.physics.add.overlap(scene.player, this, function(){scene.player.getHit(this.x);});
    this.body.allowGravity = false;
    this.scale = 2;

    }

    projOut(){
      this.destroy();
    }

    // WIP WIP WIP WIP WIP WIP WIP WIP
      // WIP WIP WIP WIP WIP WIP WIP WIP
        // WIP WIP WIP WIP WIP WIP WIP WIP
          // WIP WIP WIP WIP WIP WIP WIP WIP

}
