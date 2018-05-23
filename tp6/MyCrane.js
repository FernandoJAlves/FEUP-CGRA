/**
 * MyCrane
 * @constructor
 */
class MyCrane extends CGFobject
{
   constructor(scene) 
   {
       super(scene);
       this.cylinder = new MyCylinder(this.scene,12,1);
       this.circle = new MyCircle(this.scene,12,0);
       this.cube = new MyUnitCubeQuad(this.scene);
       this.animation = false;
       this.ang1 = 0;
       this.ang2 = 0;
       this.ang3 = 0;

   };

   update(){
       if(!this.animation){
           return;
       }
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


   display(){
        this.scene.rotate(this.ang1,0,1,0);
 
        this.display1();

        this.scene.translate(0,4.5,5);
        this.scene.rotate(this.ang2,1,0,0);
        this.scene.rotate(2*Math.PI/3,1,0,0);
            
        this.display2();
        
        this.scene.translate(0,4,0);
        this.scene.rotate(Math.PI/3,1,0,0);
        this.scene.rotate(this.ang3,1,0,0);
        
        this.display3();
    }

   displayCylinder(){
    this.scene.pushMatrix();
        this.scene.rotate(Math.PI,0,1,0);
        this.circle.display();
    this.scene.popMatrix();
    
    this.cylinder.display();
    this.scene.translate(0,0,1);
    this.circle.display();
   };

   activateAnimatition() {
       this.animation = true;
   };

   terminateAnimation() {
       this.animation = false;
   };
};