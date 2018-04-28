/**
 * MyVehicle
 * @constructor
 */
 class MyVehicle extends CGFobject
 {
	constructor(scene,x,z) 
	{
		super(scene);
		this.x=x;
		this.y=2;
		this.z=z;
		this.cube = new MyUnitCubeQuad(this.scene);
		this.cylinder = new MyCylinder(this.scene,12,1);
	};

	displayBody(){
	    this.scene.pushMatrix();
	       this.scene.translate(this.x,this.y,this.z);
	       this.scene.scale(8,1.5,5);
	       this.cube.display();
	    this.scene.popMatrix();

	   this.scene.pushMatrix();
	       this.scene.translate(this.x,this.y+1.25,this.z);
	       this.scene.scale(3,1,5);
	       this.cube.display();
	    this.scene.popMatrix();

	   this.scene.pushMatrix();
	       this.scene.translate(this.x+1.7,this.y+0.90,this.z);
	       this.scene.rotate(Math.PI/4.0,0,0,1);
	       this.scene.translate(0,-0.01,0);
	       this.scene.scale(1,1.5,5);
	       this.cube.display();
	    this.scene.popMatrix();
	}

	displayWheels(){
		this.scene.pushMatrix();
			this.scene.translate(this.x-2,this.y-1,this.z+2);
			this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(this.x+2,this.y-1,this.z+2);
			this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(this.x-2,this.y-1,this.z-3);
			this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(this.x+2,this.y-1,this.z-3);
			this.cylinder.display();
		this.scene.popMatrix();
	}
	displayGlass(){
	    this.scene.pushMatrix();
	       this.scene.translate(this.x-1.7,this.y+0.90,this.z);
	       this.scene.rotate(Math.PI/4.0,0,0,1);
	       this.scene.translate(0,-0.05,0);
	       this.scene.scale(1.5,1,5);
	       this.cube.display();
	    this.scene.popMatrix();
	}

	display() {
	    this.displayBody();

	};
 };

