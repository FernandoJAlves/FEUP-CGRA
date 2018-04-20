/**
 * MyClock
 * @constructor
 */
 class MyClock extends CGFobject
 {
	constructor(scene) 
	{
		super(scene);
		this.cylinder = new MyCylinder(scene,12,1);
		this.h = new MyClockHand(scene,1,1);
		this.m = new MyClockHand(scene,1.3,0.7);
		this.s = new MyClockHand(scene,1.5,0.5);
	    this.h.setAngle(90);
	 	this.m.setAngle(180);
	    this.s.setAngle(270);

	};

	update(timestamp){
	    this.h.setAngle(90);
	    this.m.setAngle(90);
	    this.s.setAngle(90);

	}


	display() {
	    this.cylinder.display();


	    this.h.display();
	    this.m.display();
	    this.s.display();

	};
 };

