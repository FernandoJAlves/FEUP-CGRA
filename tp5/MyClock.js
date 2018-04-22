/**
 * MyClock
 * @constructor
 */
 class MyClock extends CGFobject
 {
	constructor(scene) 
	{
		super(scene);

		this.clockHandAppearance = new CGFappearance(scene);
		this.clockHandAppearance.setDiffuse(0,0,0,0);
		this.clockHandAppearance.setSpecular(0,0,0,0);
		
		this.cylinder = new MyCylinder(scene,12,1);
		this.h = new MyClockHand(scene,1,1);
		this.m = new MyClockHand(scene,1.3,0.7);
		this.s = new MyClockHand(scene,1.6,0.3);



	    this.h.setAngle(90);
	 	this.m.setAngle(180);
	    this.s.setAngle(270);

	};

	update(currTime){
		
		var interval = currTime/1000;
		
		var s_angle = (this.s.ang + interval * 360/60)%360;
		var m_angle = (this.m.ang + interval * 360/60/60)%360;
		var h_angle = (this.h.ang + interval * 360/60/60/12)%360;	


	    this.h.setAngle(h_angle);
	    this.m.setAngle(m_angle);
	    this.s.setAngle(s_angle);

	}


	display() {
	    this.cylinder.display();

		this.scene.pushMatrix();
		this.clockHandAppearance.apply();
	    this.h.display();
	    this.m.display();
	    this.s.display();
	    this.scene.popMatrix();

	};
 };

