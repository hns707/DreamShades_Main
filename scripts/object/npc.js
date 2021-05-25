class Npc extends Phaser.Physics.Arcade.Sprite{

  constructor(scene, x, y) {
    super(scene, x, y, 'mark');
    scene.add.existing(this);
    this.scale = 2;
    this.world = scene;
    this.isTriggered = false;
    this.whoTalk = 'nashdb';
    this.textToDisplay = "npcempty";


  }

  playerQuery(){

    //Player in range

    if (this.world.player.x > this.x - 100 && this.world.player.x < this.x + 100){
      if (this.world.player.y > this.y - 50 && this.world.player.y < this.y + 50){
        //trigger ok
        if(!this.isTriggered){
          this.isTriggered = true;
          this.myDialbox(true,this);
        }

      }

    }else{
      if(this.isTriggered){this.myDialbox(false, this);}
      this.isTriggered = false;
    }

  }

  myDialbox(b, n){ // b : is Active? || n : Who?
    if(b){
      this.world.dialbox = new Dialogbox(this.world, 100, 450, 'opendialog');
      this.world.dialbox.textToDisplay = this.textToDisplay;
      this.world.dialbox.whoTalk = this.whoTalk;
      this.world.dialbox.setOrigin(0,0).setScrollFactor(0);
      this.world.dialbox.call();
    }
    else{this.world.dialbox.call();}
  }

  setText(c,text){
    this.whoTalk = c;
    this.textToDisplay = text;
  }



}
