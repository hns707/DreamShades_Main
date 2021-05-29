class Npc extends Phaser.Physics.Arcade.Sprite{

  constructor(scene, x, y) {
    super(scene, x, y, 'mark');
    scene.add.existing(this);
    this.scale = 2;
    this.world = scene;
    this.isEnabled = true;
    this.isTriggered = false;
    this.isCinematic = false;
    this.cinematicTime = 0;
    this.isDoor = false;
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
      if(this.isCinematic){
        this.isEnabled = false;
        let sc = this.world;
        let idr = this.isDoor;
        this.world.player.controlsLocked = true;
        this.world.time.delayedCall(this.cinematicTime, function(){sc.outOfCinematic(idr);}, null, sc);
      }
      this.world.dialbox = new Dialogbox(this.world, 100, 450, 'opendialog');
      this.world.dialbox.textToDisplay = this.textToDisplay;
      this.world.dialbox.whoTalk = this.whoTalk;
      this.world.dialbox.setOrigin(0,0).setScrollFactor(0);
      this.world.dialbox.call();
    }
    else{
      if(!this.isCinematic){this.world.dialbox.call();}
    }
  }

  setText(c,text,isCine,cineTime, door){
    this.whoTalk = c;
    this.textToDisplay = text;
    this.isCinematic = isCine;
    if(isCine){this.cinematicTime = cineTime; this.isDoor = door;}
  }



}
