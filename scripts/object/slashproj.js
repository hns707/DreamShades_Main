class Slashproj extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y) {
        super(scene, x, y);

		scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.crawlerContainer.iterate(crawlerMonster => {
      scene.physics.add.overlap(crawlerMonster, this, function(){crawlerMonster.getHit(scene.player.x)}, null, scene);
    })
    this.scale = 3;
    this.body.allowGravity = false;
    this.world = scene;
    }

    slashout(){
      this.destroy();
      this.world.player.isAttacking=false;
    }



    // WIP WIP WIP WIP WIP WIP WIP WIP
      // WIP WIP WIP WIP WIP WIP WIP WIP
        // WIP WIP WIP WIP WIP WIP WIP WIP
          // WIP WIP WIP WIP WIP WIP WIP WIP

}
