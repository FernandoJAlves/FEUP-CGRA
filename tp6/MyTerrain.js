/**
 * MyTerrain
 * @constructor
 */
 class MyTerrain extends Plane
 {
     constructor(scene, nrDivs, minS, maxS, minT, maxT){
         super(scene, nrDivs, minS, maxS, minT, maxT);
         this.initTerrain();
     }

     initTerrain(){
         //example for nrDivs = 8 -> grid of 9x9 vertices
         this.altimetry= [
         [ 2.0 , 3.0 , 2.0, 4.0, 2.5, 2.4, 2.3, 1.3 ],
         [ 2.0 , 3.0 , 2.0, 4.0, 7.5, 6.4, 4.3, 1.3 ],
         [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
         [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
         [ 0.0 , 0.0 , 2.0, 4.0, 2.5, 2.4, 0.0, 0.0 ],
         [ 0.0 , 0.0 , 2.0, 4.0, 3.5, 2.4, 0.0, 0.0 ],
         [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
         [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
         [ 2.0 , 3.0 , 2.0, 1.0, 2.5, 2.4, 2.3, 1.3 ]
         ];

     }

     display(){
         super.display();
     }
 }