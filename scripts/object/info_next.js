class Info_Next extends Phaser.Physics.Arcade.Sprite{

  constructor(scene, x, y) {
    super(scene, x, y, 'gonext');

    scene.add.existing(this);
    this.scale = 2;
    this.startX = x;
    this.dirX = 1;
  }

  upd(dt){

    // MOVEMENT
    if(this.x < this.startX - 10){
      this.dirX = -1;
    }else if (this.x > this.startX + 10){
      this.dirX = 1;
    }
    this.x = this.x + (Math.cos(dt)*0.5)*this.dirX;
  }



}
