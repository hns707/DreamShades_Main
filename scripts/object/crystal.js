class Crystal extends Phaser.Physics.Arcade.Sprite{

  constructor(scene, x, y) {
    super(scene, x, y, 'yescrystal');

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.world = scene;
    this.body.immovable = true;
    this.body.allowGravity = false;
    this.scale = 2;
    this.startY = y;
    this.dirY = 1;

    this.clight = scene.add.pointlight(x, y, 0, 50, 0.5);
    this.clight.attenuation = 0.04;
    this.clight.color.setTo(171, 17, 221);

  }

  pickUp(){
    // Proceed HUD Update
    let xhud, yhud;
    xhud = this.world.crystals[this.world.player.crystalCount].x;
    yhud = this.world.crystals[this.world.player.crystalCount].y;
    this.world.crystals[this.world.player.crystalCount] = this.world.add.sprite(xhud, yhud, 'yescrystal').setOrigin(0,0).setScrollFactor(0);
    this.world.crystals[this.world.player.crystalCount].scale = 2;
    this.world.crystalLight[this.world.player.crystalCount].attenuation = 0.05;
    this.world.crystalLight[this.world.player.crystalCount].color.setTo(171, 17, 221);
    this.world.player.crystalCount++;
    // =====================

    // Destroy object
    this.clight.destroy();
    this.destroy();
    // =====================

    // Was the last crystal?
    if(this.world.player.crystalCount == 5){
      this.world.player.controlsLocked = true;
      this.world.dialbox = new Dialogbox(this.world, 100, 450, 'opendialog');
      this.world.dialbox.textToDisplay = "[Stell] :\nThis is the last one, let's head to the door now.";
      this.world.dialbox.whoTalk = 'shelldb';
      this.world.dialbox.setOrigin(0,0).setScrollFactor(0);
      this.world.dialbox.call();
      let sc = this.world;
      this.world.time.delayedCall(3000, function(){sc.outOfCinematic(false)}, null, sc);

      this.world.doorDB.setText('shelldb',"[Stell] :\nLook like I have them all, let put them in.",true,3000,true);

    }

  }




  upd(dt){

    // MOVEMENT
    if(this.y < this.startY - 10){
      this.dirY = -1;
    }else if (this.y > this.startY + 10){
      this.dirY = 1;
    }
    this.y = this.y + (Math.cos(dt)*0.5)*this.dirY;
    this.clight.y = this.y;
  }



}
