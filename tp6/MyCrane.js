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
       this.animation = false;
       this.ang1 = 0;
       this.ang2 = 0;
       this.ang3 = 0;
       this.ang4 = 0;

   };

   update(){
       if(!this.animation){
           return;
       }
   }

   display() {


   };

   displayCylinder(){
    this.circle.display();
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