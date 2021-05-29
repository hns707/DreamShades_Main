class Bossdoor extends Phaser.Physics.Arcade.Sprite{

  constructor(scene, x, y) {
    super(scene, x, y, 'bossdoor');

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.world = scene;
    this.body.immovable = true;
    this.body.allowGravity = false;
    this.scale = 3;
    this.onGoing = false;
    this.cf = 0;
    this.endOnce = false;

    this.anims.create({
      key: 'crystalSet',
      frames: this.anims.generateFrameNumbers('bossdoor', { start: 0, end: 7 }),
      frameRate: 3
    });

    this.anims.create({
      key: 'eyeGlow',
      frames: this.anims.generateFrameNumbers('bossdoor', { start: 8, end: 13 }),
      frameRate: 10
    });

    this.crystalIn = scene.sound.add('crystalIn');
    this.flameOn = scene.sound.add('flameon');

    this.on('animationcomplete',function () {
      if(this.anims.currentAnim.key === 'crystalSet'){
        this.anims.play('eyeGlow',true);
        this.enableLights();
        this.onGoing = false;
      }
    });

    this.on('animationcomplete',function () {
      if(this.anims.currentAnim.key === 'eyeGlow'){
        if(!this.endOnce){
          this.flameOn.play({volume:.5})
          scene.setPlayerLock(false);
          this.endOnce = true;
        }

      }
    });



  }


  playAnimation(){
    this.world.setPlayerLock(true);
    this.anims.play('crystalSet',true);
    this.onGoing = true;

  }

  doorAnimCheck(){
    let c = this.anims.currentFrame.index;
    if (c != this.cf){
      this.cf++;
      switch (c) {
        case 2: this.crystalIn.play({volume:.5});break;
        case 3: this.crystalIn.play({volume:.5});break;
        case 4: this.crystalIn.play({volume:.5});break;
        case 5: this.crystalIn.play({volume:.5});break;
        case 6: this.crystalIn.play({volume:.5});break;
      }
    }
  }

  enableLights(){
    this.doorlights = [];
    this.doorlights[0] = this.world.add.pointlight(4488, 2195, 0, 50, 0.5);
    this.doorlights[1] = this.world.add.pointlight(4488, 2310, 0, 50, 0.5);
    this.doorlights[2] = this.world.add.pointlight(4708, 2195, 0, 50, 0.5);
    this.doorlights[3] = this.world.add.pointlight(4708, 2310, 0, 50, 0.5);
    this.doorlights[4] = this.world.add.pointlight(4598, 2075, 0, 50, 0.5);

    for (let i = 0 ; i < 5 ; i++){
      this.doorlights[i].attenuation = 0.04;
      this.doorlights[i].color.setTo(171, 17, 221);
    };
  }




}
