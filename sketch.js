var time;
var timeStep=10;
var upL1=9;
var upL2=20;

var collection;

var randomMotion=false;


function setup(){
    createCanvas(600,600);
    // set the frame rate 
    frameRate(60);
    time=10;
    //initLine();
    //noLoop();

    collection=new collectionLines([150,200],30);
    collection2=new collectionLines([400,300],30);
    collection3=new collectionLines([500,100],50);




}

function draw(){ 
    angleMode(DEGREES);

    collection.updateLines();
    collection.drawLines();

    collection2.updateLines();
    collection2.drawLines();

    collection3.updateLines();
    collection3.drawLines();


}


function collectionLines(xy, N){
    this.d=random(2);
    this.lines=[];
    this.N=N;
    //var xy=[300,300]//randomPosition();
    for (var i=0; i<N; i++){
        this.lines.push(new randomLine(xy,this.d));
    }
    this.updateLines=function(){
        for (var i=0; i<this.N; i++){
            this.lines[i].addPoint();
        }
    }
    this.drawLines=function(){
        for (var i=0; i<this.N; i++){
            this.lines[i].drawCurve();
        }
    }

}

function randomLine(xy, d){
    this.x=[]; //empty x array
    this.x.push(xy[0]);
    this.y=[]; //empty y array
    this.y.push(xy[1]);
    this.theta=random(360); // initialize theta
    var l=this.x.length;
    this.up=0;

    while (l<4){
        var l=this.x.length;
        this.x.push(d*sin(this.theta)+this.x[l-1]);
        this.y.push(d*cos(this.theta)+this.y[l-1]);
        var nn=noiseTheta(this.theta, this.up);
        this.theta=nn[0];
        if (nn[1]){
            this.up=0;
        }
        else{
            this.up+=1;
        }
    }

    this.addPoint=function(){
        var l=this.x.length;
        this.x.push(d*sin(this.theta)+this.x[l-1]);
        this.y.push(d*cos(this.theta)+this.y[l-1]);
        var nn=noiseTheta(this.theta, this.up);
        this.theta=nn[0];
        if (nn[1]){
            this.up=0;
        }
        else{
            this.up+=1;
        }
    }

    this.drawCurve=function(){
        stroke(255, 102, 0);
        strokeWeight(1);
        var l=this.x.length;
        curve(this.x[l-4], this.y[l-4], this.x[l-3], this.y[l-3],this.x[l-2], this.y[l-2],this.x[l-1], this.y[l-1]);
    }
}

function randomPosition(){ //random start
    //we do not want to start at the very edges
    return [floor(random(50,width-50)),floor(random(50, height-50))];
}
function noiseTheta(th, up){
    time+=timeStep;
    var change=false;

    if (up<upL1){
        sign=1;
    }
    else if (up<upL2){
        sign=-1;
        print(sign);
    }
    else{
        change=true;
        sign=1;
        print(sign);
    }

    if (randomMotion){
        return [sign*noise(time)*20+th, change];
    }
    return [sign*10+th, change];
}