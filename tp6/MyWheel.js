/**
 * MyWheel
 * @constructor
 */
class MyWheel extends CGFobject
{
   constructor(scene) 
   {
       super(scene);
       this.cylinder = new MyCylinder(this.scene,12,1);
       this.circle = new MyCircle(this.scene,12,0);


   };


   display(wheelAppearance,trackAppearance) {
       this.scene.pushMatrix();
            this.scene.wheelSideAppearance.apply();
            this.circle.display();
            this.scene.wheelTrackAppearance.apply();
            this.cylinder.display();
            this.scene.translate(0,0,1);
            this.scene.wheelSideAppearance.apply();
            this.circle.display();
       this.scene.popMatrix();

   };

};

