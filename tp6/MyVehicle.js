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
		this.y=0.9;
		this.z=z;
		this.ang = 0;
		this.speed = 0;
		this.cube = new MyUnitCubeQuad(this.scene);
		this.cylinder = new MyCylinder(this.scene,12,1);
	};

	displayBody(){
		let bodyLength = 4;
		let bodyWidth = 2.5;
		let bodyHeight = 0.7;
	    this.scene.pushMatrix();
	       this.scene.scale(bodyLength,bodyHeight,bodyWidth);
	       this.cube.display();
	    this.scene.popMatrix();

	   this.scene.pushMatrix();
	       this.scene.translate(0,0.5,0);
	       this.scene.scale(3,bodyHeight,bodyWidth);
	       this.cube.display();
	    this.scene.popMatrix();

	    //Vehicle trunk
	   /*this.scene.pushMatrix();
	       this.scene.translate(1.7,0.90,0);
	       this.scene.rotate(Math.PI/4.0,0,0,1);
	       this.scene.translate(0,-0.01,0);
	       this.scene.scale(1,1.5,5);
	       this.cube.display();
	    this.scene.popMatrix();
	    */
	}

	displayWheels(){
		let WheelScale = 0.4;
		this.scene.pushMatrix();
			this.scene.translate(-1,-0.5,1);
			this.scene.scale(WheelScale,WheelScale,WheelScale);
			this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(1,-0.5,1);
			this.scene.scale(WheelScale,WheelScale,WheelScale);
			this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-1,-0.5,-1.4);
			this.scene.scale(WheelScale,WheelScale,WheelScale);
			this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(1,-0.5,-1.4);
			this.scene.scale(WheelScale,WheelScale,WheelScale);
			this.cylinder.display();
		this.scene.popMatrix();
	}
	displayGlass(){
		/*
	    this.scene.pushMatrix();
	       this.scene.translate(-1.7,0.90,0);
	       this.scene.rotate(Math.PI/4.0,0,0,1);
	       this.scene.translate(0,-0.05,0);
	       this.scene.scale(1.5,1,5);
	       this.cube.display();
	    this.scene.popMatrix();
	    */
	}

	display() {
	    this.displayBody();

	};

	update(){

	}

	move(newSpeed){
		this.speed = newSpeed;
		this.x += this.speed * Math.cos(this.ang);
		this.z += this.speed * -Math.sin(this.ang);
	}

	rotate(ang){
		this.ang += ang;
	}
 };

