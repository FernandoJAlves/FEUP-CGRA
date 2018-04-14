/**
 * MyClockHand
 * @constructor
 */
 class MyClockHand extends CGFobject
 {
	constructor(scene) 
	{
		super(scene);
		this.ang = 0;

	};

	setAngle(a){
	    this.ang = a;
	}

	display() {
	    //rotate(this.ang,0,0,1);

	};
 };