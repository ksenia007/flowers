var time;
var timeStep=10;
var upL1=9;
var upL2=20;

var coll=[];

var randomMotion=false; //can set random spread


function setup(){
    createCanvas(windowWidth-50,windowHeight-50);
    // set the frame rate 
    frameRate(60);
    time=10;
    //initLine();
    //noLoop();

    //create new collection of lines objects
    collection=new collectionLines([windowWidth-windowWidth/3,windowHeight/4],30);
    collection2=new collectionLines([windowWidth-windowWidth/2,windowHeight-windowHeight/5],30);
    collection3=new collectionLines([windowWidth/7,windowHeight/3],50);
    collection4=new collectionLines([windowWidth/2,windowHeight/6],50);
    //push them into the list to keeep track
    coll.push(collection);
    coll.push(collection2);
    coll.push(collection3);
    coll.push(collection4);
}

function draw(){ 
    //set the mode of agle to degrees (more intuitive)
    angleMode(DEGREES);
    //number to keep track of the length of the array
    var l= coll.length;
    //loop though all the collections of lines
    for (var i=0; i<l; i++){
        coll[i].updateLines();
        coll[i].drawLines();
    }
}

// add a new collection of lines when clicked
function mouseClicked(){
    coll.push(new collectionLines([mouseX, mouseY],30));
}
// add a new collection of lines when touched (seems that this is not working well)
function touchStarted(){
    coll.push(new collectionLines([touchX, touchY],30));
}

// create a class collectionLines, made of randomLine objects
function collectionLines(xy, N){
    this.d=random(.2,2); //size of the circles
    this.lines=[]; //lines array
    this.N=N; //number of lines (passed in)
    // loop through and create lines
    for (var i=0; i<N; i++){
        this.lines.push(new randomLine(xy,this.d));
    }
    // add point to the line
    this.updateLines=function(){
        for (var i=0; i<this.N; i++){
            this.lines[i].addPoint();
        }
    }
    // draw the new line
    this.drawLines=function(){
        for (var i=0; i<this.N; i++){
            this.lines[i].drawCurve();
        }
    }
}

//Class for the randomLine
function randomLine(xy, d){
    this.x=[]; //empty x array
    this.x.push(xy[0]);
    this.y=[]; //empty y array
    this.y.push(xy[1]);
    this.theta=random(360); // initialize theta
    var l=this.x.length;
    this.up=0;

    // initialize the first 4 values to make it easier to plot (need 4 for the curve() )
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
    // add points
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
    // draw the curve (only draw last 4 points, since we do not draw over)
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

// how to decide whether we want to change direction in the small wobble in the lines
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
