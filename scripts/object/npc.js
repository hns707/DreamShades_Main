class Npc extends Phaser.Physics.Arcade.Sprite{

  constructor(scene, x, y) {
    super(scene, x, y, 'npctest');
    scene.add.existing(this);
    this.scale = 2;
    this.world = scene;
    this.isTriggered = false;


  }

  playerQuery(){

    //Player in range

    if (this.world.player.x > this.x - 100 && this.world.player.x < this.x + 100){
      if (this.world.player.y > this.y - 50 && this.world.player.y < this.y + 50){
        //trigger ok
        if(!this.isTriggered){
          console.log('in range');
          this.isTriggered = true;
          this.world.myDialbox(true,this);
        }

      }

    }else{
      if(this.isTriggered){this.world.myDialbox(false, this);}
      this.isTriggered = false;
    }

  }



}
