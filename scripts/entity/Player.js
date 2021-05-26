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
    this.isAttackingStill = false;
    this.isAttackingMove = false;
    this.isGettingKnockback = false;
    this.dirX = 1;
    this.knockbackDirX = 1;

    this.isInvulnerable = false;
    this.invTimer = 0;



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
      frameRate: 20
    });
    this.anims.create({
      key: 'moveattack',
      frames: this.anims.generateFrameNumbers('shell', { start: 21, end: 26 }),
      frameRate: 20
    });


    this.on('animationcomplete',function () {
      if(this.anims.currentAnim.key === 'attack'){
        this.isAttackingStill = false;
      }
    });

    this.cursors = scene.input.keyboard.createCursorKeys();
    this.runKey = scene.input.keyboard.addKey('SHIFT'); // Run
    this.spKey = scene.input.keyboard.addKey('H'); // Special

    this.slashSound = scene.sound.add('sw');
    this.hitSound = scene.sound.add('phit');



    this.fs1 = scene.sound.add('f1');
    this.fs2 = scene.sound.add('f2');
    this.fs3 = scene.sound.add('f3');
    this.fs4 = scene.sound.add('f4');
    this.fs5 = scene.sound.add('f5');

  }

  move(scene,dt){
    // Debug Pos
    //this.debugText.setText('X: ' + this.x + '\nY: ' + this.y);
    //this.debugText.x = this.x - 30;
    //this.debugText.y = this.y - 70;
    // ^^^^^^


    //this.setVelocityX(this.xSpeed);
    if(this.body.blocked.down){
      if(this.anims.currentAnim.key === 'walk'){
        if( this.anims.currentFrame.index == 2 || this.anims.currentFrame.index == 5){
          this.playRandomFs();
        }

        this.setVelocityX((this.xSpeed*.1)*this.dirX);
        this.isGettingKnockback = false;
      }else{

        if(this.isInvulnerable){
          this.setVelocityX((this.xSpeed*2)*this.knockbackDirX);
        }else{
          this.setVelocityX((this.xSpeed*2)*this.dirX);
        }
      }
    }else{
      this.angle = 0;
    }

    // Invulnerability cooldown
    if(this.isInvulnerable){
      if(this.invTimer < 100){this.invTimer++;}
      else{
        this.isInvulnerable = false;
        this.invTimer = 0;
        this.setAlpha(1);
      }
    }



    if (this.cursors.left.isDown)
    {
      if(this.angle > 0){ this.angle = 0;}
      this.isAttackingStill = false;
      this.setVelocityX(-200 - this.xSpeed);
      this.dirX = -1;
      this.xAccel = true;
      if (this.angle > -12.5){this.angle -= 0.5;}
      if(!this.body.blocked.down && !this.body.blocked.up){this.anims.play('fall');}else{this.anims.play('walk', true);}
      if(!this.flipX){this.flipX = true;}
      if(this.body.blocked.down){
        if(this.xSpeed < 150 && this.xAccel){
          this.xSpeed += 10; //upspeed add is speed increase over frames
          this.wlk.frameRate = 10 + this.xSpeed * 0.001;
        }

      }

      //if(this.runKey.isDown){this.setVelocityX(-300);}
    }

    else if (this.cursors.right.isDown)
    {
      if(this.angle < 0){ this.angle = 0;}
      this.isAttackingStill = false;
      this.setVelocityX(200 + this.xSpeed);
      this.dirX = 1;
      this.xAccel = true;
      if (this.angle < 12.5){this.angle += 0.5;}
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
    else if(this.isAttackingStill){
      this.anims.play('attack',true);
      if(this.anims.currentFrame.index == 3){
        this.slashSound.play({volume:.5});
      }
      if(this.anims.currentFrame.index == 5){
        var slash = new Slashproj(scene,this.x+(50*this.dirX), this.y+20);
        setTimeout(function(){slash.slashout()},50);
      }
      this.setVelocityX(0);
    }
    else
    {
      this.angle = 0;
      this.xAccel = false;
      this.isAttackingMove = false;
      if(this.xSpeed > 0){
        this.xSpeed -= 10; //upspeed add is speed increase over frames
      }else if(this.xSpeed < 0){this.xSpeed = 0;this.isGettingKnockback = false;}
      //this.setVelocityX(0);
      if(!this.body.blocked.down && !this.body.blocked.up ){this.anims.play('fall');}else{this.anims.play('idle', true);this.wlk.frameRate = 10;  }
    }

    // ATTACK
    if (this.spKey.isDown && !this.isAttackingStill){
      if(!this.cursors.right.isDown && !this.cursors.left.isDown){
        this.isAttackingStill = true;
      }
    }
    // ATTACK /W MOVE
    if (this.spKey.isDown && !this.isAttackingMove){
      if(this.cursors.right.isDown || this.cursors.left.isDown){
        this.isAttackingMove = true;
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
        this.angle = 0;
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

    if(!this.isInvulnerable){
      this.world.cameras.main.shake(100);
      this.hitSound.play({volume:.5});
      this.isInvulnerable = true; // Prevent one-shot
      this.setAlpha(0.7);
      //======================== HIT ===========================
      this.knockbackDirX = 1;
      if(this.isBefore(ex)){this.knockbackDirX = -1;}
      this.isGettingKnockback = true;
      if(this.currentHP!=0){ // avoid destroy null
        this.currentHP -=1;
        this.world.heart[this.currentHP].destroy();
        this.world.heartlight[this.currentHP].destroy();
      }
      this.setVelocityX(5000*this.knockbackDirX);
      this.xSpeed = 200;
      this.setVelocityY(-400);
      if(this.currentHP==0){
        this.world.restart();
      }
    }
    //===========================================================
  }

  playRandomFs(){
    let rand = Math.floor(Math.random() * 5);
    switch (rand) {
      case 0:this.fs1.play({volume:.1});break;
      case 1:this.fs2.play({volume:.1});break;
      case 2:this.fs3.play({volume:.1});break;
      case 3:this.fs4.play({volume:.1});break;
      case 4:this.fs5.play({volume:.1});break;
    }
  }

}
