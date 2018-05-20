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
		this.wheelsAng = 0;
		this.wheelsAng2 = 0;
		this.speed = 0;
		this.cube = new MyUnitCubeQuad(this.scene,0,0.5,0,0.5);
		this.wheel = new MyWheel(scene);
		this.frontGlass = new MyTrapezium(this.scene,0,0,0,0,0.5,0,0.5);
		this.sideGlass = new MyTrapezium(this.scene,0.0001,0.72,0.36);


	};

	displayBody(){
		let bodyLength = 5;
		let bodyWidth = 2.5;
		let bodyHeight = 0.7;
	    this.scene.pushMatrix();
	       this.scene.scale(bodyLength,bodyHeight,bodyWidth);
	       this.cube.display();
	    this.scene.popMatrix();

	   this.scene.pushMatrix();
	       this.scene.translate(0,0.6,0);
	       this.scene.scale(2.5,bodyHeight - 0.2,bodyWidth);
	       this.cube.display();
	    this.scene.popMatrix();

	    //Vehicle trunk front
	   this.scene.pushMatrix();
	       this.scene.translate(1.6,0.5,0);
	       this.scene.rotate(-Math.PI/2.0,1,0,0);
	       this.scene.rotate(Math.PI/4.0,0,1,0);
	       this.scene.scale(1,2.5,5);
	       this.frontGlass.display();
	   this.scene.popMatrix();

	   //Vehicle trunk side 1
	   this.scene.pushMatrix();
	   	   this.scene.translate(1.37,0.47,1.25);
	   	   this.scene.rotate(3*Math.PI/4,0,0,1);
	   	   this.sideGlass.display();
	   this.scene.popMatrix();

	   //Vehicle trunk side 2
	   this.scene.pushMatrix();
	   	   this.scene.translate(1.37,0.47,-1.25);
	   	   this.scene.rotate(-Math.PI/4,0,0,1);
	   	   this.scene.rotate(Math.PI,1,0,0);
	   	   this.sideGlass.display();
	   this.scene.popMatrix();
	    



	}

	displayWheels(){
		let WheelScale = 0.4;
		this.scene.pushMatrix();
			
			this.scene.translate(-1.25,-0.5,1);
			this.scene.rotate(this.wheelsAng,0,1,0);
			this.scene.rotate(this.wheelsAng2,0,0,1);
			this.scene.scale(WheelScale,WheelScale,WheelScale);
			this.wheel.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(1.25,-0.5,1);
			this.scene.rotate(this.wheelsAng2,0,0,1);
			this.scene.scale(WheelScale,WheelScale,WheelScale);
			this.wheel.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-1.25,-0.5,-1);
			this.scene.rotate(Math.PI,0,1,0);
			this.scene.rotate(this.wheelsAng,0,1,0);
			this.scene.rotate(this.wheelsAng2,0,0,1);
			this.scene.scale(WheelScale,WheelScale,WheelScale);
			this.wheel.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(1.25,-0.5,-1);
			this.scene.rotate(Math.PI,0,1,0);
			this.scene.rotate(this.wheelsAng2,0,0,1);
			this.scene.scale(WheelScale,WheelScale,WheelScale);
			this.wheel.display();
		this.scene.popMatrix();
	}
	displayGlass(){


	   //Vehicle glass side 1
	   this.scene.pushMatrix();
	   	   this.scene.translate(-1.37,0.47,1.25);
	   	   this.scene.rotate(-3*Math.PI/4,0,0,1);
	   	   this.sideGlass.display();
	   this.scene.popMatrix();

	   //Vehicle glass side 2
	   this.scene.pushMatrix();
	   	   this.scene.translate(-1.37,0.47,-1.25);
	   	   this.scene.rotate(Math.PI/4,0,0,1);
	   	   this.scene.rotate(Math.PI,1,0,0);
	   	   this.sideGlass.display();
	   this.scene.popMatrix();

	   //Vehicle glass front
	   this.scene.pushMatrix();
	       this.scene.translate(-1.6,0.5,0);
	       this.scene.rotate(-Math.PI/2.0,1,0,0);
	       this.scene.rotate(-Math.PI/4.0,0,1,0);
	       this.scene.scale(1,2.5,5);
	       this.frontGlass.display();
	   this.scene.popMatrix();



	}

	display() {
	    this.displayBody();

	};

	update(deltaTime){
		var time = deltaTime /1000;
		this.x += this.speed * time * Math.cos(this.ang);
		this.z += this.speed * time * -Math.sin(this.ang);
		this.wheelsAng2 = (this.wheelsAng2+this.speed) % (2*Math.PI);
	}

	move(newSpeed){
		this.speed = newSpeed;

	}

	rotate(ang){
		this.ang += ang;
	}


	rotateWheelsRight(ang){
		if(this.wheelsAng > -Math.PI/4.0){
		this.wheelsAng -= ang;
		}
	}

	rotateWheelsLeft(ang){
		if(this.wheelsAng < Math.PI/4.0){
		this.wheelsAng += ang;
		}
	}
 };

