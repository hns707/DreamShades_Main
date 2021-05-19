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
    this.scale = 2;
    this.world = scene;

    // Player Infos
    this.maxHP = 5;
    this.currentHP = this.maxHP;

    // Player Status
    this.isStomping = false;
    this.isAttacking = false;
    this.isGettingKnockback = false;
    this.dirX = 1;
    this.knockbackDirX = 1;




    // Vertical(up) accel
    this.upAccel = false;
    this.upSpeed = 0;
    // Horizontal accel
    this.xAccel = false;
    this.xSpeed = 0;


    //this.debugText = scene.add.text(this.x, this.y, 'XY')


    this.wlk = this.anims.create({
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

    //this.setVelocityX(this.xSpeed);
    if(this.body.blocked.down){
      this.setVelocityX((this.xSpeed*.1)*this.dirX);
    }else{
      if(this.isGettingKnockback){
        this.setVelocityX((this.xSpeed*2)*this.knockbackDirX);
      }else{
        this.setVelocityX((this.xSpeed*2)*this.dirX);
      }
    }



    if (this.cursors.left.isDown && !this.isStomping)
    {

      this.setVelocityX(-200 - this.xSpeed);
      this.dirX = -1;
      this.xAccel = true;
      if(!this.body.blocked.down && !this.body.blocked.up){this.anims.play('fall');}else{this.anims.play('walk', true);}
      if(!this.flipX){this.flipX = true;}
      if(this.body.blocked.down){
        if(this.xSpeed < 150 && this.xAccel){
          this.xSpeed += 2; //upspeed add is speed increase over frames
          this.wlk.frameRate = 10 + this.xSpeed * 0.001;
        }

      }

      //if(this.runKey.isDown){this.setVelocityX(-300);}
    }

    else if (this.cursors.right.isDown && !this.isStomping)
    {

      this.setVelocityX(200 + this.xSpeed);
      this.dirX = 1;
      this.xAccel = true;
      if(!this.body.blocked.down && !this.body.blocked.up){this.anims.play('fall');}else{this.anims.play('walk', true);}
      if(this.flipX){this.flipX = false;}
      if(this.body.blocked.down){
        if(this.xSpeed < 150 && this.xAccel){
          this.xSpeed += 2; //upspeed add is speed increase over frames
          this.wlk.frameRate = 10 + this.xSpeed * 0.001;
        }

      }

      //if(this.runKey.isDown){this.setVelocityX(300);}
    }
    else if(this.isAttacking){
      this.anims.play('attack',true);
      this.setVelocityX(0);
    }
    else
    {
      this.xAccel = false;
      if(this.xSpeed > 0){
        this.xSpeed -= 4; //upspeed add is speed increase over frames
      }else if(this.xSpeed < 0){this.xSpeed = 0;this.isGettingKnockback = false;}
      //this.setVelocityX(0);
      if(!this.body.blocked.down && !this.body.blocked.up ){this.anims.play('fall');}else{this.anims.play('idle', true);this.wlk.frameRate = 10;  }
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
    if (this.spKey.isDown && !this.isAttacking && !this.cursors.right.isDown && !this.cursors.left.isDown){
      {
        this.isAttacking = true;
        var slash = new Slashproj(scene,this.x+(50*this.dirX), this.y+20);
        setTimeout(function(){slash.slashout()},500);
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

  getHit(ex){
    this.knockbackDirX = 1;
    if(this.isBefore(ex)){this.knockbackDirX = -1;}
    this.isGettingKnockback = true;
    this.currentHP -=1;
    this.world.heart[this.currentHP].destroy();
    this.world.heartlight[this.currentHP].destroy();
    console.log('Hit !');
    console.log(this.currentHP);
    this.setVelocityX(5000*this.knockbackDirX);
    this.xSpeed = 200;
    this.setVelocityY(-400);
    if(this.currentHP==0){
      this.world.restart();
    }
  }

}
