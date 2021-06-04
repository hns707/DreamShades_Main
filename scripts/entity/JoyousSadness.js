class Boss_JoyousSadness extends Phaser.Physics.Arcade.Sprite{

  constructor(scene, x, y,) {
    super(scene, x, y, 'bossjs');

    scene.add.existing(this);
    scene.physics.add.existing(this);
    //scene.physics.add.overlap(scene.player, this, function(){scene.player.getHit(this.x);});

    this.setBodySize(this.body.width-160,this.body.height-120);
    this.setOffset(85, 78);
    this.world = scene;
    this.scale = 2.2;
    this.isAlive = true;
    this.isOver = false;
    this.dir = 1;
    this.mapLocation = 'right';

    this.isGettingHit = false;
    this.hitTimer = 0;
    this.currentHP = 11;// 11


    // BOSS
    this.call_nextPhase = false;
    this.isPhase1 = false;
    this.isPhase2 = false;
    this.isPhase3 = false;
    this.isPhase4 = false;
    this.isPhase5 = false;
    this.isPhase6 = false;
    this.isPhase7 = false;
    this.isPhase8 = false;
    this.isPhase9 = false;
    this.isPhase10 = false;
    this.readyP10 = false;
    this.isPhase11 = false;
    this.readyP11 = false;

    //PHASES :
    this.p1 = scene.time.addEvent({ delay: 1000, callback: this.b_phase1, callbackScope: this, loop: true });
    this.p2 = scene.time.addEvent({ delay: 100, callback: this.b_phase2, callbackScope: this, loop: true });
    this.p3 = scene.time.addEvent({ delay: 700, callback: this.b_phase3, callbackScope: this, loop: true });
    this.p4 = scene.time.addEvent({ delay: 1000, callback: this.b_phase4, callbackScope: this, loop: true });
    this.p5 = scene.time.addEvent({ delay: 200, callback: this.b_phase5, callbackScope: this, loop: true });
    this.p6 = scene.time.addEvent({ delay: 100, callback: this.b_phase6, callbackScope: this, loop: true });
    this.p7 = scene.time.addEvent({ delay: 400, callback: this.b_phase7, callbackScope: this, loop: true });
    this.p8 = scene.time.addEvent({ delay: 100, callback: this.b_phase8, callbackScope: this, loop: true });
    this.p9 = scene.time.addEvent({ delay: 100, callback: this.b_phase9, callbackScope: this, loop: true });
    this.p10 = scene.time.addEvent({ delay: 1000, callback: this.b_phase10, callbackScope: this, loop: true });
    this.p11 = scene.time.addEvent({ delay: 1000, callback: this.b_phase11, callbackScope: this, loop: true });

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('bossjs', { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'death',
      frames: this.anims.generateFrameNumbers('bossjs', { start: 4, end: 29 }),
      frameRate: 5
    });

    this.on('animationcomplete',function () {
      if(this.anims.currentAnim.key === 'death'){
        scene.tweens.add({
          targets:[scene.bossName,scene.hpboss],
          duration:2000,
          delay:1500,
          alpha:{
            startDelay:0,
            from:1,
            to:0,
          }
        })
        console.log('END PHASE, ggwp');
        this.isOver = true;
      }
    });

    this.anims.play('idle',true);
    this.hitSound = scene.sound.add('ehit');


  }

  upd(){
    if(this.isGettingHit){
      if(this.hitTimer > 100){
        this.isGettingHit = false;
        this.hitTimer = 0;
      }else{
        this.hitTimer++;
      }
    }
  }

  setDeath(){
    this.anims.play('death',true);
    this.isAlive = false;
  }

  getHit(){
    if(this.isAlive){

    if(!this.isGettingHit){
      this.world.hpboss.setFrame(3 + this.currentHP);
      this.hitSound.play({volume:.5});
      this.isGettingHit = true;
      if(this.currentHP!=0){ // avoid destroy null
        this.currentHP -=1;
      }
      if(this.currentHP==0){
        this.setDeath();
      }else{
        this.twinAlpha(1,0);
        let b = this;
        this.world.time.delayedCall(1000,function(){b.changeMapLocation(b.mapLocation);})
      }


    }
  }
  }

  twinAlpha(from,to){
    this.world.tweens.add({
      targets:this,
      duration:1000,
      delay:0,
      alpha:{
        startDelay:0,
        from:from,
        to:to,
      }
    })
  }

  phaseChecker(){
    if(this.isAlive){
      let h = this.currentHP;
      switch (h) {
        case 10: this.isPhase2 = true; break;
        case 9: this.isPhase3 = true; break;
        case 8: this.isPhase4 = true; break;
        case 7: this.isPhase5 = true; break;
        case 6: this.isPhase6 = true; break;
        case 5: this.isPhase7 = true; break;
        case 4: this.isPhase8 = true; break;
        case 3: this.isPhase9 = true; break;
        case 2: this.isPhase10 = true; break;
        case 1: this.isPhase11 = true; break;
        default: console.log('BAD PHASE');

      }
    }

  }

  changeMapLocation(previousLocation){
    if(previousLocation == 'right'){
      this.setPosition(2000,780);
      this.mapLocation = 'left';
      this.flipX = true;
      this.twinAlpha(0,1);
    } else {
      this.setPosition(2940,780);
      this.mapLocation = 'right';
      this.flipX = false;
      this.twinAlpha(0,1);
    }
    this.phaseChecker();
  }


  b_phase1(){
    if(this.isPhase1){
      if(!this.call_nextPhase){
        this.call_nextPhase = true;
        let w = this.world
        let b = this;
        w.time.delayedCall(10000,
          function(){
            b.p1.remove(false);
            b.isPhase1 = false;
            b.call_nextPhase = false;
            w.bossPillar[1].enable('right');
            w.bossPillar[1].moveDistance = 2000;
            w.bossPillar[1].isRetracted = false;
          }, null, w);
        }
        for (var i = 0; i < 7; i++) {
          if(Math.random()*100 < 30){
            let bullet = new Gproj(this.world,2320+i*50, 200,'bullet').setVelocityY(400);
            bullet.angle = 270;
            bullet.scale = 3;
            this.world.physics.add.collider(bullet, this.world.platforms, function(){bullet.projOut();}, null, this.world);
          }
        }

      }
    }

    b_phase2(){
      if(this.isPhase2){
        if(!this.call_nextPhase){
          this.call_nextPhase = true;
          let w = this.world
          let b = this;
          w.time.delayedCall(10000,
            function(){
              b.p2.remove(false);
              b.isPhase2 = false;
              b.call_nextPhase = false;
              w.bossPillar[0].enable('right');
              w.bossPillar[0].moveDistance = 2000;
              w.bossPillar[0].isRetracted = false;
            }, null, w);
          }
          let dartSpawnPoint = [Math.random()*400 - 200 + 2320, Math.random()*400 - 200 + 300];
          let dartSpawnAngle = Math.random()*600 - 300;
          let dart = new Bossdart(this.world, dartSpawnPoint[0],dartSpawnPoint[1],'bossdart').setVelocity(90,dartSpawnAngle);
          setTimeout(function(){dart.projOut()},10000);
        }
      }

      b_phase3(){
        if(this.isPhase3){
          if(!this.call_nextPhase){
            this.call_nextPhase = true;
            let w = this.world
            let b = this;
            w.bossPillar[1].enable('left');
            w.bossPillar[1].moveDistance = 1000;
            w.bossPillar[1].isRetracted = false;
            w.bossPillar[1].setPosition(2706,1900);
            w.time.delayedCall(10000,
              function(){
                b.p3.remove(false);
                b.isPhase3 = false;
                b.call_nextPhase = false;
                w.bossPillar[1].enable('right');
                w.bossPillar[1].moveDistance = 2000;
                w.bossPillar[1].isRetracted = false;
              }, null, w);
            }
            for (var i = 0; i < 18; i++) {
              if(Math.random()*100 < 15){
                let bullet = new Gproj(this.world,2600-i*50, 200,'bullet').setVelocityY(400);
                bullet.angle = 270;
                bullet.scale = 3;
                this.world.physics.add.collider(bullet, this.world.platforms, function(){bullet.projOut();}, null, this.world);
              }
            }

          }
        }

        b_phase4(){
          if(this.isPhase4){
            if(!this.call_nextPhase){
              this.call_nextPhase = true;
              let w = this.world
              let b = this;
              w.bossPillar[0].enable('left');
              w.bossPillar[0].moveDistance = 1000;
              w.bossPillar[0].isRetracted = false;
              w.bossPillar[0].setPosition(2222,1900);
              w.time.delayedCall(10000,
                function(){
                  b.p4.remove(false);
                  b.isPhase4 = false;
                  b.call_nextPhase = false;
                  w.bossPillar[0].enable('right');
                  w.bossPillar[0].moveDistance = 2000;
                  w.bossPillar[0].isRetracted = false;
                }, null, w);
              }
              for (var i = 0; i < 19; i++) {
                if(Math.random()*100 < 15){
                  let bullet = new Gproj(this.world,2320+i*50, 200,'bullet').setVelocityY(400);
                  bullet.angle = 270;
                  bullet.scale = 3;
                  this.world.physics.add.collider(bullet, this.world.platforms, function(){bullet.projOut();}, null, this.world);
                  let dartSpawnPoint = [Math.random()*400 - 200 + 2320, Math.random()*400 - 200 + 300];
                  let dartSpawnAngle = Math.random()*600 - 300;
                  let dart = new Bossdart(this.world, dartSpawnPoint[0],dartSpawnPoint[1],'bossdart').setVelocity(90,dartSpawnAngle);
                  setTimeout(function(){dart.projOut()},10000);
                }
              }

            }
          }

          b_phase5(){
            if(this.isPhase5){
              if(!this.call_nextPhase){
                this.call_nextPhase = true;
                let w = this.world
                let b = this;
                w.bossPillar[1].enable('left');
                w.bossPillar[1].moveDistance = 1000;
                w.bossPillar[1].isRetracted = false;
                w.bossPillar[1].setPosition(2706,1900);
                w.time.delayedCall(10000,
                  function(){
                    b.p5.remove(false);
                    b.isPhase5 = false;
                    b.call_nextPhase = false;
                    w.bossPillar[1].enable('right');
                    w.bossPillar[1].moveDistance = 2000;
                    w.bossPillar[1].isRetracted = false;
                  }, null, w);

                }

                for (var i = 0; i < 18; i++) {

                    let bullet = new Gproj(this.world,2600-i*50, 200,'bullet').setVelocityY(200);
                    bullet.angle = 270;
                    bullet.scale = 3;
                    this.world.physics.add.collider(bullet, this.world.platforms, function(){bullet.projOut();}, null, this.world);


                  if(Math.random()*100 < 10){

                    let dartSpawnPoint = [Math.random()*400 - 200 + 2320, Math.random()*400 - 200 + 300];
                    let dartSpawnAngle = Math.random()*600 - 300;
                    let dart = new Bossdart(this.world, dartSpawnPoint[0],dartSpawnPoint[1],'bossdart').setVelocity(-90,dartSpawnAngle);
                    setTimeout(function(){dart.projOut()},10000);
                  }

                }


              }
            }

            b_phase6(){
              if(this.isPhase6){
                if(!this.call_nextPhase){
                  this.call_nextPhase = true;
                  let w = this.world
                  let b = this;
                  w.bossPillar[0].enable('left');
                  w.bossPillar[0].moveDistance = 1000;
                  w.bossPillar[0].isRetracted = false;
                  w.bossPillar[0].setPosition(2222,1900);
                  w.bossDialogs[6] = new Npc(w,w.player.x,w.player.y,'mark').setAlpha(0);
                  w.bossDialogs[6].setText('bossjsdb',"[Joyous Sadness] :\nENOUGH! I'm no longer kind with you!",true,3000,false,false);
                  w.time.delayedCall(3000,function(){w.bossDialogs[6].isEnabled = false;
                    let lasers = [];
                    for (var i = 0; i < 3; i++) {
                      lasers[i] = new Bosslaser(w,2350+i*300, 830,'bosslaser');
                      let l = lasers[i];
                      setTimeout(function(){l.destroy()},10000);
                    }
                    w.time.delayedCall(1250,function(){
                      let lasersB = [];
                      for (var i = 0; i < 3; i++) {
                        lasersB[i] = new Bosslaser(w,2500+i*300, 830,'bosslaser');
                        let lb = lasersB[i];
                        setTimeout(function(){lb.destroy()},8750);
                      }
                    }, null, w);
                  }, null, w);
                  w.time.delayedCall(10000,
                    function(){
                      b.p6.remove(false);
                      b.isPhase6 = false;
                      b.call_nextPhase = false;
                      w.bossPillar[0].enable('right');
                      w.bossPillar[0].moveDistance = 2000;
                      w.bossPillar[0].isRetracted = false;
                    }, null, w);


                  }

                }
              }

              b_phase7(){
                if(this.isPhase7){
                  if(!this.call_nextPhase){
                    this.call_nextPhase = true;
                    let w = this.world
                    let b = this;
                    w.bossPillar[1].enable('left');
                    w.bossPillar[1].moveDistance = 1000;
                    w.bossPillar[1].isRetracted = false;
                    w.bossPillar[1].setPosition(2706,1900);
                    w.time.delayedCall(10000,
                      function(){
                        b.p7.remove(false);
                        b.isPhase7 = false;
                        b.call_nextPhase = false;
                        w.bossPillar[1].enable('right');
                        w.bossPillar[1].moveDistance = 2000;
                        w.bossPillar[1].isRetracted = false;
                      }, null, w);

                      let lasers = [];
                      for (var i = 0; i < 3; i++) {
                        lasers[i] = new Bosslaser(this.world,2550-i*300, 830,'bosslaser');
                        let l = lasers[i];
                        setTimeout(function(){l.destroy()},10000);
                      }
                      w.time.delayedCall(1250,function(){
                        let lasersB = [];
                        for (var i = 0; i < 3; i++) {
                          lasersB[i] = new Bosslaser(w,2400-i*300, 830,'bosslaser');
                          let lb = lasersB[i];
                          setTimeout(function(){lb.destroy()},8750);
                        }
                      }, null, w);

                    }
                    for (var i = 0; i < 18; i++) {

                      let bullet = new Gproj(this.world,2600-i*50, 200,'bullet').setVelocityY(200);
                      bullet.angle = 270;
                      bullet.scale = 3;
                      this.world.physics.add.collider(bullet, this.world.platforms, function(){bullet.projOut();}, null, this.world);

                    }

                  }
                }

                b_phase8(){
                  if(this.isPhase8){
                    if(!this.call_nextPhase){
                      this.call_nextPhase = true;
                      let w = this.world
                      let b = this;
                      w.bossPillar[0].enable('left');
                      w.bossPillar[0].moveDistance = 1000;
                      w.bossPillar[0].isRetracted = false;
                      w.bossPillar[0].setPosition(2222,1900);
                      w.time.delayedCall(10000,
                        function(){
                          b.p8.remove(false);
                          b.isPhase8 = false;
                          b.call_nextPhase = false;
                          w.bossPillar[0].enable('right');
                          w.bossPillar[0].moveDistance = 2000;
                          w.bossPillar[0].isRetracted = false;
                        }, null, w);

                        let laser = new Bosslaser(w,2300, 1250,'bosslaser');
                        laser.setHorizontal();
                        laser.scale = 14;
                        setTimeout(function(){laser.destroy()},10000);

                        w.time.delayedCall(1250,function(){
                          let laserB = new Bosslaser(w,2300, 975,'bosslaser');
                          laserB.setHorizontal();
                          laserB.scale = 14;
                          setTimeout(function(){laserB.destroy()},8750);

                        }, null, w);
                      }

                    }
                  }

                  b_phase9(){
                    if(this.isPhase9){
                      if(!this.call_nextPhase){
                        this.call_nextPhase = true;
                        let w = this.world
                        let b = this;
                        w.bossPillar[1].enable('left');
                        w.bossPillar[1].moveDistance = 1000;
                        w.bossPillar[1].isRetracted = false;
                        w.bossPillar[1].setPosition(2706,1900);
                        w.time.delayedCall(10000,
                          function(){
                            b.p9.remove(false);
                            b.isPhase9 = false;
                            b.call_nextPhase = false;
                            w.bossPillar[1].enable('right');
                            w.bossPillar[1].moveDistance = 2000;
                            w.bossPillar[1].isRetracted = false;
                          }, null, w);

                          let hlaser = new Bosslaser(w,1690, 1250,'bosslaser');
                          hlaser.setHorizontal();
                          hlaser.scale = 14;
                          hlaser.flipY = true;
                          setTimeout(function(){hlaser.destroy()},10000);

                          let lasers = [];
                          for (var i = 0; i < 3; i++) {
                            lasers[i] = new Bosslaser(this.world,2550-i*300, 830,'bosslaser');
                            let l = lasers[i];
                            setTimeout(function(){l.destroy()},10000);
                          }
                          w.time.delayedCall(1250,function(){
                            let hlaserB = new Bosslaser(w,1690, 975,'bosslaser');
                            hlaserB.setHorizontal();
                            hlaserB.scale = 14;
                            hlaserB.flipY = true;
                            setTimeout(function(){hlaserB.destroy()},8750);
                            let lasersB = [];
                            for (var i = 0; i < 3; i++) {
                              lasersB[i] = new Bosslaser(w,2400-i*300, 830,'bosslaser');
                              let lb = lasersB[i];
                              setTimeout(function(){lb.destroy()},8750);
                            }
                          }, null, w);

                        }


                      }
                    }

                    b_phase10(){
                      if(this.isPhase10){
                        if(!this.call_nextPhase){
                          this.call_nextPhase = true;
                          let w = this.world
                          let b = this;
                          w.bossPillar[0].enable('left');
                          w.bossPillar[0].moveDistance = 1000;
                          w.bossPillar[0].isRetracted = false;
                          w.bossPillar[0].setPosition(2222,1900);
                          w.bossDialogs[7] = new Npc(w,w.player.x,w.player.y,'mark').setAlpha(0);
                          w.bossDialogs[7].setText('bossjsdb',"[Joyous Sadness] :\nYOU CAN'T DEFEAT ME, I WON'T ALLOW IT!",true,3000,false,false);
                          w.time.delayedCall(3000,function(){w.bossDialogs[7].isEnabled = false; b.readyP10 = true;

                            let laser = new Bosslaser(w,2300, 1250,'bosslaser');
                            laser.setHorizontal();
                            laser.scale = 14;
                            setTimeout(function(){laser.destroy()},10000);


                            let lasers = [];
                            for (var i = 0; i < 3; i++) {
                              lasers[i] = new Bosslaser(w,2350+i*300, 830,'bosslaser');
                              let l = lasers[i];
                              setTimeout(function(){l.destroy()},10000);
                            }
                            w.time.delayedCall(1250,function(){
                              let laserB = new Bosslaser(w,2300, 975,'bosslaser');
                              laserB.setHorizontal();
                              laserB.scale = 14;
                              setTimeout(function(){laserB.destroy()},8750);
                              let lasersB = [];
                              for (var i = 0; i < 3; i++) {
                                lasersB[i] = new Bosslaser(w,2500+i*300, 830,'bosslaser');
                                let lb = lasersB[i];
                                setTimeout(function(){lb.destroy()},8750);
                              }
                            }, null, w);
                          }, null, w);
                          w.time.delayedCall(10000,
                            function(){
                              b.p10.remove(false);
                              b.isPhase10 = false;
                              b.call_nextPhase = false;
                              w.bossPillar[0].enable('right');
                              w.bossPillar[0].moveDistance = 2000;
                              w.bossPillar[0].isRetracted = false;
                            }, null, w);


                          }
                          if(this.readyP10){
                            for (var i = 0; i < 20; i++) {
                              if(Math.random()*100 < 5){
                                let bullet = new Gproj(this.world,2320+i*50, 200,'bullet').setVelocityY(400);
                                bullet.angle = 270;
                                bullet.scale = 3;
                                this.world.physics.add.collider(bullet, this.world.platforms, function(){bullet.projOut();}, null, this.world);
                              }
                            }
                          }

                        }
                      }

                      b_phase11(){
                        if(this.isPhase11){
                          if(!this.call_nextPhase){
                            this.call_nextPhase = true;
                            let w = this.world
                            let b = this;
                            w.bossPillar[1].enable('left');
                            w.bossPillar[1].moveDistance = 1000;
                            w.bossPillar[1].isRetracted = false;
                            w.bossPillar[1].setPosition(2706,1900);
                            w.bossDialogs[8] = new Npc(w,w.player.x,w.player.y,'mark').setAlpha(0);
                            w.bossDialogs[8].setText('bossjsdb',"[Joyous Sadness] :\nI'LL PUT AN END TO THIS, YOURS.",true,3000,false,false);
                            w.time.delayedCall(3000,function(){w.bossDialogs[8].isEnabled = false; b.readyP11 = true;

                              let hlaser = new Bosslaser(w,1690, 1250,'bosslaser');
                              hlaser.setHorizontal();
                              hlaser.scale = 14;
                              hlaser.flipY = true;
                              setTimeout(function(){hlaser.destroy()},10000);

                              let lasers = [];
                              for (var i = 0; i < 3; i++) {
                                lasers[i] = new Bosslaser(w,2550-i*300, 830,'bosslaser');
                                let l = lasers[i];
                                setTimeout(function(){l.destroy()},10000);
                              }
                              w.time.delayedCall(1250,function(){
                                let hlaserB = new Bosslaser(w,1690, 975,'bosslaser');
                                hlaserB.setHorizontal();
                                hlaserB.scale = 14;
                                hlaserB.flipY = true;
                                setTimeout(function(){hlaserB.destroy()},8750);
                                let lasersB = [];
                                for (var i = 0; i < 3; i++) {
                                  lasersB[i] = new Bosslaser(w,2400-i*300, 830,'bosslaser');
                                  let lb = lasersB[i];
                                  setTimeout(function(){lb.destroy()},8750);
                                }
                              }, null, w);
                            }, null, w);
                            w.time.delayedCall(10000,
                              function(){
                                b.p11.remove(false);
                                b.isPhase11 = false;
                                b.call_nextPhase = false;
                                w.bossPillar[1].enable('right');
                                w.bossPillar[1].moveDistance = 2000;
                                w.bossPillar[1].isRetracted = false;
                              }, null, w);


                            }
                            if(this.readyP11){
                              for (var i = 0; i < 15; i++) {
                                if(Math.random()*100 < 20){
                                  let dartSpawnPoint = [Math.random()*400 - 200 + 2320, Math.random()*400 - 200 + 300];
                                  let dartSpawnAngle = Math.random()*300;
                                  let dart = new Bossdart(this.world, dartSpawnPoint[0],dartSpawnPoint[1],'bossdart').setVelocity(-90,dartSpawnAngle);
                                  setTimeout(function(){dart.projOut()},10000);
                                }
                              }
                            }

                          }
                        }

                      }
