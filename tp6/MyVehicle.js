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
		this.accel = 0;
		this.cube = new MyUnitCubeQuad(this.scene,0,0.5,0,0.5);
		this.wheel = new MyWheel(scene);
		this.frontGlass = new MyTrapezium(this.scene,0,0,0,0,0.5,0,0.5);
		this.sideGlass = new MyTrapezium(this.scene,0.0001,0.72,0.36);
		this.headlight = new MyHalfSphere(this.scene, 12, 12);


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
	    
	    this.scene.glassAppearance.apply();
		//left headlight
		this.scene.pushMatrix();
	       this.scene.translate(-bodyLength/2,0,bodyWidth - 1.7);
	       this.scene.rotate(-Math.PI/2,0,1,0);
	       this.scene.scale(0.05,0.05,0.05);
	       this.headlight.display();
	    this.scene.popMatrix();	
		
		//Right headlight
	    this.scene.pushMatrix();
	       this.scene.translate(-bodyLength/2,0,-bodyWidth + 1.7);
	       this.scene.rotate(-Math.PI/2,0,1,0);
	       this.scene.scale(0.1,0.1,0.1);
	       this.headlight.display();
	    this.scene.popMatrix();	

	}

	displayWheels(){
		let WheelScale = 0.4;
		this.scene.pushMatrix();
			this.scene.translate(-1.25,-0.5,1);
			this.scene.rotate(this.wheelsAng,0,1,0);
			this.scene.rotate(-this.wheelsAng2,0,0,1);
			this.scene.scale(WheelScale,WheelScale,WheelScale);
			this.wheel.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(1.25,-0.5,1);
			this.scene.rotate(-this.wheelsAng2,0,0,1);
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

	update(deltaTime,terrain){
		var time = deltaTime /1000;
		
		this.speed += this.accel*time;
		let dist = (this.speed * time) + (this.accel * time * time / 2);
		this.wheelsAng2 = (this.wheelsAng2+dist) % (2*Math.PI);
		
		let new_x = this.x + dist* Math.cos(this.ang);
		let new_z = this.z + dist * -Math.sin(this.ang);
		if(terrain.checkBorders(new_x,new_z)){
			this.x = new_x;
			this.z = new_z;
		}
		else{
			this.stop();
		}
	
	}

	move(newAccel){
		this.accel = newAccel;

	}

	stop(){
		this.accel = 0;
		this.speed = 0;
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


	copyVehicle(vehicle){
		this.ang = -vehicle.ang;
		this.wheelsAng = vehicle.wheelsAng;
		this.wheelsAng2 = vehicle.wheelsAng2;
	}
 };

