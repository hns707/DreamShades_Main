class Slashproj extends Phaser.Physics.Arcade.Sprite{

  constructor(scene, x, y) {
    super(scene, x, y);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    if(scene.crawlerContainer){
      scene.crawlerContainer.iterate(crawlerMonster => {
        scene.physics.add.overlap(crawlerMonster, this, function(){crawlerMonster.getHit(scene.player.x)}, null, scene);
      })
    }
    if(scene.gunnerContainer){
      scene.gunnerContainer.iterate(gunnerMonster => {
        scene.physics.add.overlap(gunnerMonster, this, function(){gunnerMonster.getHit(scene.player.x)}, null, scene);
      })
    }

    if(scene.skullerContainer){
      scene.skullerContainer.iterate(skullerMonster => {
        scene.physics.add.overlap(skullerMonster, this, function(){skullerMonster.getHit(scene.player.x)}, null, scene);
      })
    }


    if(scene.boss){scene.physics.add.overlap(scene.boss, this, function(){scene.boss.getHit()}, null, scene);}


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
