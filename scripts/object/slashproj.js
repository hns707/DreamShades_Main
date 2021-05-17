class Slashproj extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y) {
        super(scene, x, y, 'swh');

		scene.add.existing(this);
    scene.physics.add.existing(this);


    scene.crawlerContainer.iterate(crawlerMonster => {
      scene.physics.add.overlap(crawlerMonster, this, function(){crawlerMonster.setDeath()}, null, scene);
    })



    this.scale = 3;
    this.body.allowGravity = false;

    }

    // WIP WIP WIP WIP WIP WIP WIP WIP
      // WIP WIP WIP WIP WIP WIP WIP WIP
        // WIP WIP WIP WIP WIP WIP WIP WIP
          // WIP WIP WIP WIP WIP WIP WIP WIP

}
