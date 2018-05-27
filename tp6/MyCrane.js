/**
 * MyCrane
 * @constructor
 */

var animationState = {FINDING:1,RETURNING:2,TRANSPORTING:3,FALLING:4};



class MyCrane extends CGFobject
{
   constructor(scene,x,z) 
   {
       super(scene);
       this.x = x || -12;
       this.y = 2;
       this.z = z || -12;
       this.cylinder = new MyCylinder(this.scene,12,1);
       this.circle = new MyCircle(this.scene,12,0);
       this.cube = new MyUnitCubeQuad(this.scene);
       this.vehicle = new MyVehicle(this.scene,0,0);
       this.initAnimationVariables();
   };

   initAnimationVariables(){
    this.angVel = 0.1;
    this.animation = false;
    this.state = animationState.FINDING;
    this.ang1 = 0;
    this.ang2 = 0;
    this.ang3 = 0;
    this.vehicleCaught = false;
    this.carHeight = 0;
    this.fallSpeed = 0;
    this.magnetX = 0;
    this.magnetZ = 0;
   }

   display1() {
    this.scene.pushMatrix();
        this.scene.scale(2,2,2);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.displayCylinder();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(0,2,2.5);
        this.scene.rotate(Math.PI/4,1,0,0);
        
        this.scene.scale(0.9,8,0.9);
        
        this.cube.display();
    this.scene.popMatrix();
   };

   display2(){
        this.scene.pushMatrix();
            this.scene.translate(-0.5,0,0);
            this.scene.scale(1,0.7,0.7);    
            this.scene.rotate(Math.PI/2,0,1,0);
            this.displayCylinder();
        this.scene.popMatrix();
        
        
        this.scene.pushMatrix();
            this.scene.translate(0,2,0);
            this.scene.scale(0.9,4,0.9);
            this.cube.display();
        this.scene.popMatrix();
   }

   display3(){
       this.scene.pushMatrix();
            this.scene.rotate(-Math.PI/2,1,0,0);
            this.scene.scale(0.1,0.1,2);
            this.displayCylinder();
       this.scene.popMatrix();

       this.scene.pushMatrix();
            this.scene.rotate(-Math.PI/2,1,0,0);
            this.scene.translate(0,0,2);
            this.scene.scale(1.3,1.3,0.2);
            
            this.displayCylinder();
       this.scene.popMatrix();
   }

   displayVehicle(){
       this.scene.pushMatrix();
            this.scene.currVehicleAppearance = this.scene.vehicleAppearanceList[this.scene.Textura];
            this.scene.rotate(this.vehicle.ang,0,1,0);
            this.scene.rotate(Math.PI,1,0,0);
            this.scene.translate(-this.magnetX,-3-this.carHeight,-this.magnetZ);
            this.scene.glassAppearance.apply();
            this.vehicle.displayGlass();
            this.scene.vehicleAppearances[this.scene.currVehicleAppearance].apply();
            this.vehicle.displayBody();
            this.vehicle.displayWheels();
       this.scene.popMatrix();

   }


   display(){
        this.scene.rotate(this.ang1-Math.PI/4,0,1,0);
 
        this.display1();

        this.scene.translate(0,4.5,5);
        this.scene.rotate(this.ang2,1,0,0);
        this.scene.rotate(2*Math.PI/3,1,0,0);
            
        this.display2();
        
        this.scene.translate(0,4,0);
        this.scene.rotate(Math.PI/3,1,0,0);
        this.scene.rotate(this.ang3,1,0,0);
        
        this.display3();
        if(this.state != animationState.FINDING && this.state != animationState.RETURNING){
            this.scene.rotate(-Math.PI/4,0,1,0);
            this.displayVehicle();
        }
    }

   displayCylinder(){
       //Cylinder base
    this.scene.pushMatrix();
        this.scene.rotate(Math.PI,0,1,0);
        this.circle.display();
    this.scene.popMatrix();
    //Cylinder body
    this.cylinder.display();
    this.scene.translate(0,0,1);
    //Cylinder top
    this.circle.display();
   };

   activateAnimation() {
       this.animation = true;
       
   };

   terminateAnimation() {
       this.animation = false;
       this.state = animationState.FINDING;
   };


   catchVehicle(v2){
    //x: -17.691154799186137 z: -6.236271352788302
       let x = -17.691154799186137;
       let z = -6.236271352788302;
       let range = 1.3;
       if(v2.x > (x - range) && v2.x < (x + range) && v2.z > (z - range) && v2.z < (z + range)){
           this.vehicle.copyVehicle(v2);
           this.vehicleCaught = true;
           this.magnetX = x - v2.x;
           this.magnetZ = z - v2.z;
           this.activateAnimation();
       }
       return this.vehicleCaught;
   }

   findingVehicleAnimation(deltaTime){
       let ready1 = false;
       let ready2 = false;
       let time = deltaTime/1000;
       if(this.ang2 < 0.18){
           this.ang2 += this.angVel*time;
       }
       else{
           ready1 = true;
       }

       if(this.ang3 > -0.18){
        this.ang3 -= this.angVel*time;
       }
       else{
           ready2 = true;
       }
       if(ready2 && ready1){
           this.state = animationState.TRANSPORTING;
       }

   }

   transportingVehicleAnimation(deltaTime){
        let ready1 = false;
        let ready2 = false;
        let ready3 = false;
        let time = deltaTime/1000;
        let rotatationRange = 0.60;
        if(this.ang2 > -rotatationRange){
            this.ang2 -= this.angVel*time;
        }
        else{
            ready1 = true;
        }

        if(this.ang3 < rotatationRange){
            this.ang3 += this.angVel*time;
        }
        else{
            ready2 = true;
        }

        if(this.ang1 < 2*Math.PI/3){
            this.ang1 += this.angVel*time;
            
        }
        else{
            ready3 = true;
        }

        if(ready2 && ready1 && ready3){
            this.state = animationState.FALLING;
            this.catchVehicle(this.scene.vehicle);
        }

   }

   fallingVehicleAnimation(deltaTime){
       let time = deltaTime/1000;
       let accel = 2;
       this.fallSpeed += time*accel;
       let dist = this.carHeight + this.fallSpeed*time + (accel*time*time)/2;
       if(dist < 3){
           this.carHeight = dist;
       }
       else{
           this.fallSpeed = 0;
           this.carHeight = 0;
           
           this.scene.vehicle.setPosition(-3.134953140843954-this.magnetX,-9.765973839367277-this.magnetZ);
           this.state = animationState.RETURNING;
           this.scene.vehicle.rotate(2*Math.PI/3);
           
       }

   }

   returningAnimation(deltaTime){
        let ready1 = false;
        let ready2 = false;
        let ready3 = false;
        let time = deltaTime/1000;
        let rotatationRange = 0.60;
        if(this.ang2 < 0){
            this.ang2 += this.angVel*time;
        }
        else{
            this.ang2 = 0;
            ready1 = true;
        }

        if(this.ang3 > 0){
            this.ang3 -= this.angVel*time;
        }
        else{
            this.ang3 = 0;
            ready2 = true;
        }

        if(this.ang1 > 0){
            this.ang1 -= this.angVel*time;
        
        }
        else{
            this.ang1 = 0;
            ready3 = true;
        }

        if(ready2 && ready1 && ready3){
            this.state = animationState.FINDING;
            this.terminateAnimation();
        }
    }

   update(deltaTime){
       if(!this.animation){
           return;
       }

       this.updateSpeed();

       switch(this.state){
            case animationState.FINDING:
                this.findingVehicleAnimation(deltaTime);
                break;
            case animationState.TRANSPORTING:
                this.transportingVehicleAnimation(deltaTime);
                break;
            case animationState.FALLING:
                this.fallingVehicleAnimation(deltaTime);
                break;
            case animationState.RETURNING:
                this.returningAnimation(deltaTime);
                break;
       }
   }


   updateSpeed(){
       this.angVel = this.scene.CraneSpeed;
   }
};