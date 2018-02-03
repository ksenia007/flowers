var time;
var timeStep=10;
var upL1=9;
var upL2=20;

var coll=[];

var randomMotion=false;


function setup(){
    createCanvas(windowWidth-50,windowHeight-50);
    // set the frame rate 
    frameRate(60);
    time=10;
    //initLine();
    //noLoop();


    collection=new collectionLines([windowWidth-windowWidth/3,windowHeight/4],30);
    collection2=new collectionLines([windowWidth-windowWidth/2,windowHeight-windowHeight/5],30);
    collection3=new collectionLines([windowWidth/7,windowHeight/3],50);
    collection4=new collectionLines([windowWidth/2,windowHeight/6],50);

    coll.push(collection);
    coll.push(collection2);
    coll.push(collection3);
    coll.push(collection4);

    print(coll.length);


}

function draw(){ 
    angleMode(DEGREES);
    var l= coll.length;
    for (var i=0; i<l; i++){
        coll[i].updateLines();
        coll[i].drawLines();
    }


}

function mouseClicked(){
    coll.push(new collectionLines([mouseX, mouseY],30));
}

function collectionLines(xy, N){
    this.d=random(.2,2);
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
