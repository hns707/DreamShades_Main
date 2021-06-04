class Pillar extends Phaser.Physics.Arcade.Sprite{

  constructor(scene, x, y,) {
    super(scene, x, y, 'pillar');


    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setBodySize(this.body.width,this.body.height-30);
    this.body.immovable = true;
    this.body.allowGravity = false;
    this.isVertical = false;
    this.scale = 1.1;
    this.moveDistance = 256;
    this.moveSpeed = 1;
    this.Enabled = false;
    this.dir = '';
    this.isRetracted = false;
    this.setOffset(0,this.body.height/2);
    this.startX = x;
    this.startY = y;
    this.endbSound = scene.sound.add('bend');



  }

  enable(dir){
    this.dir = dir;
    this.Enabled = true;
  }

  setVertical(){
    this.angle = 90;
    this.isVertical = true;
    this.setBodySize(this.body.height,this.body.width);
  }


  retract(){ // right or left only
    if(!this.isRetracted){
      if(this.dir == 'right'){

        if(this.x < this.startX + this.moveDistance && !this.isVertical){this.setPosition(this.x + this.moveSpeed,this.y);}
        else if(this.y < this.startY + this.moveDistance && this.isVertical){this.setPosition(this.x,this.y + this.moveSpeed);}
        else{this.isRetracted = true;this.endbSound.play({volume:.5});}

      }else if (this.dir == 'left') {

        if(this.x > this.startX - this.moveDistance && !this.isVertical){this.setPosition(this.x - this.moveSpeed,this.y);}
        else if(this.y > this.startY - this.moveDistance && this.isVertical){this.setPosition(this.x,this.y - this.moveSpeed);}
        else{this.isRetracted = true;this.endbSound.play({volume:.5});}

      }else{
        console.log('Invalid pillar DIR!');
      }
    }
  }

}
