class Bosslaser extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y) {
        super(scene, x, y, 'bosslaser');

		scene.add.existing(this);
    scene.physics.add.existing(this);


    this.world = scene;
    this.body.immovable = true;
    this.body.allowGravity = false;
    this.scale = 10;
    this.isShot = false;

    let t = this;
    let w = scene;
    w.physics.add.overlap(w.player, t, function(){t.trueOverlapCheck(t.isShot)}, false, w);


    this.anims.create({
      key: 'preview',
      frames: this.anims.generateFrameNumbers('bosslaser', { start: 0, end: 8 }),
      frameRate: 5
    });

    this.anims.create({
      key: 'shot',
      frames: this.anims.generateFrameNumbers('bosslaser', { start: 9, end: 17 }),
      frameRate: 20
    });


    this.anims.play('preview',true);
    this.shoot = scene.sound.add('laser');



    this.on('animationcomplete',function () {
      if(!this.isShot){
        this.isShot = true;
        this.anims.play('shot',true);
        this.shoot.play({volume:.2});
      }else{
        this.isShot = false;
        this.opt = this.anims.play('preview',true);
      }

    });




    }

    setHorizontal(){
      this.setOrigin(0,0);
      this.angle = 270;
      this.setBodySize(this.body.height,this.body.width);
      this.setOffset(0, -this.body.width/4);
    }

    trueOverlapCheck(bool){
      if(bool){
        if(this.anims.currentFrame.index == 4){
          this.world.player.getHit(this.x);
        }

      }
    }



}
