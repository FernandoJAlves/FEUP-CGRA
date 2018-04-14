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
		this.h = new MyClockHand(scene);
		this.m = new MyClockHand(scene);
		this.s = new MyClockHand(scene);
	};

	update(timestamp){
	    //this.h.setAngle();
	    //this.m.setAngle();
	    //this.s.setAngle();

	}


	display() {
	    this.cylinder.display();

	};
 };

