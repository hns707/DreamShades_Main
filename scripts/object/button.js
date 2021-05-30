class Button extends Phaser.Physics.Arcade.Sprite{

  constructor(scene, x, y,) {
    super(scene, x, y, 'button');


    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.scale = 2;
    this.body.immovable = true;
    this.body.allowGravity = false;
    this.setBodySize(this.body.width-17,this.body.height-5);

    this.world = scene;

    this.defY = y;
    this.endY = this.defY + 25;

    this.canBePressed = true;
    this.doEffect = false;

    this.endbSound = scene.sound.add('bend');


  }

  press(){
    if(this.canBePressed){
      if (this.body.touching.up){
        if(this.y < this.endY){
          this.setPosition(this.x,this.y + 0.25);
        }else{
          this.endbSound.play({volume:.5});
          this.canBePressed = false;
          this.doEffect = true;
          this.disableBody(true);
        }
      }
    }
  }

  action(i,obj,arg){
    this.doEffect = false;

    switch (i) {
      case 0: obj.show(); break;
      case 1: obj.enable(arg); break;

      default: console.log('Button error: Wrong ID');

    }

    //console.log('do once');
  }




}
