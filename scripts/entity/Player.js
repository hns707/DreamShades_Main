class Player extends Phaser.Physics.Arcade.Sprite{
  constructor(scene, x, y) {
    super(scene, x, y, 'shell')
    scene.add.existing(this)
    scene.physics.add.existing(this)

    //this.setCollideWorldBounds(true)
    this.setBounce(0);
    this.setFriction(1,1);

    this.setBodySize(this.body.width-110,this.body.height-17);
    this.setOffset(55, 15);
    this.scale = 1.3;
    this.isStomping = false;
    this.isAttacking = false;
    this.dirX = 1;

    // Vertical(up) accel
    this.upAccel = false;
    this.upSpeed = 0;


    //this.debugText = scene.add.text(this.x, this.y, 'XY')


    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('shell', { start: 1, end: 6 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('shell', { start: 7, end: 13 }),
      frameRate: 8,
      repeat: -1
    });
    this.anims.create({
      key: 'jump',
      frames: [ { key: 'shell', frame: 14 } ],
      frameRate: 20
    });
    this.anims.create({
      key: 'fall',
      frames: [ { key: 'shell', frame: 3 } ],
      frameRate: 20
    });
    this.anims.create({
      key: 'attack',
      frames: this.anims.generateFrameNumbers('shell', { start: 15, end: 20 }),
      frameRate: 10
    });

    this.on('animationcomplete',function () {
      if(this.anims.currentAnim.key === 'attack'){
        this.isAttacking = false;
      }
    });

    this.cursors = scene.input.keyboard.createCursorKeys();
    this.runKey = scene.input.keyboard.addKey('SHIFT'); // Run
    this.spKey = scene.input.keyboard.addKey('H'); // Special

    this.stompSound = scene.sound.add('stomp');

  }

  move(scene,dt){
    // Debug Pos
    //this.debugText.setText('X: ' + this.x + '\nY: ' + this.y);
    //this.debugText.x = this.x - 30;
    //this.debugText.y = this.y - 70;
    // ^^^^^^


    if (this.cursors.left.isDown && !this.isStomping)
    {
      this.setVelocityX(-250);
      this.dirX = -1;
      if(!this.body.blocked.down && !this.body.blocked.up){this.anims.play('fall');}else{this.anims.play('walk', true);}
      if(!this.flipX){this.flipX = true;}
      if(this.runKey.isDown){this.setVelocityX(-300);}
    }

    else if (this.cursors.right.isDown && !this.isStomping)
    {
      this.setVelocityX(250);
      this.dirX = 1;
      if(!this.body.blocked.down && !this.body.blocked.up){this.anims.play('fall');}else{this.anims.play('walk', true);}
      if(this.flipX){this.flipX = false;}
      if(this.runKey.isDown){this.setVelocityX(300);}
    }
    else if(this.isAttacking){
      this.anims.play('attack',true);
      this.setVelocityX(0);
    }
    else
    {
      this.setVelocityX(0);
      if(!this.body.blocked.down && !this.body.blocked.up ){this.anims.play('fall');}else{this.anims.play('idle', true);}
    }

    if (this.cursors.down.isDown && !this.cursors.up.isDown)
    {
      if(!this.body.blocked.down && !this.body.blocked.up){
        this.anims.play('stomp');
        this.isStomping = true;
        this.setVelocityY(800);
      }else{
        if(this.isStomping){
        this.stompSound.play({volume:.5});
        this.isStomping = false;
        }
      }

    }

    // ATTACK
    if (this.spKey.isDown && !this.isAttacking){
      {
        this.isAttacking = true;
        var slash = new Slashproj(scene,this.x+(50*this.dirX), this.y+20, 'swh');
      }
    }


    if (this.cursors.up.isDown)
    {
      if(this.body.blocked.down && !this.cursors.down.isDown)
      {
        this.setVelocityY(-200);
        this.upAccel = true;
        this.upSpeed = 0;
      }
      if(this.body.velocity.y < -1 && this.upSpeed < 5 && this.upAccel){ //upspeed cond is maxspeed
        this.upSpeed += .3; //upspeed add is speed increase over frames
        this.setVelocityY(-300 -((Math.sin(dt)*(-this.upSpeed))+this.upSpeed));
        this.anims.play('jump');
      }
    }else{
      this.upAccel = false;
      this.upSpeed = 0;
    }



      //console.log(this.dirX)

    // Prevent Wallcliping with fallspeed
    this.body.velocity.y = Math.min(800, Math.max(-800,this.body.velocity.y));

  }

  // Fancy Checkers
  isBelow(y){if(this.y > y){return true;}else{return false;}}
  isOver(y){if(this.y < y){return true;}else{return false;}}
  isBefore(x){if(this.x < x){return true;}else{return false;}}
  isPast(x){if(this.x > x){return true;}else{return false;}}

}
