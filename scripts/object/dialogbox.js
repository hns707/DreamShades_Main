class Dialogbox extends Phaser.Physics.Arcade.Sprite{

  constructor(scene, x, y) {
    super(scene, x, y, 'opendialog');
    this.isOpen = false;
    this.world = scene;
    scene.add.existing(this);
    this.anims.create({
      key: 'open',
      frames: this.anims.generateFrameNumbers('opendialog', { start: 0, end: 4 }),
      frameRate: 10
    });
    this.anims.create({
      key: 'close',
      frames: this.anims.generateFrameNumbers('opendialog', { start: 0, end: 4 }),
      frameRate: 10
    });

    this.on('animationcomplete',function () {
      if(this.anims.currentAnim.key === 'open'){
        this.ndb = scene.add.sprite(x, y, 'nashdb');
        this.mytxt = scene.add.text(x-325,y-60,"Hello, this i am currently testing my dialogbox.\nPlease don't mind and go ahead.",{font: "30px visitor", fill:"#FFF"}); // 51 chars per line
      }
    });

    this.on('animationcomplete',function () {
      if(this.anims.currentAnim.key === 'close'){
        this.isOpen = false;
        this.destroy();
      }
    });
  }

  call(){
    if(!this.isOpen){
      this.anims.play('open', true);
      this.isOpen = true;
    }else{
      if(this.ndb){this.ndb.destroy();}
      if(this.mytxt){this.mytxt.destroy();}
      this.anims.playReverse('close', true);
    }
  }


}