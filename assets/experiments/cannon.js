const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
speed = parseInt(document.getElementById("speed").value);

let cannonTop = new Image();
cannonTop.src="https://ia803407.us.archive.org/7/items/cannon_202104/cannon.png"
cannonTop.onload = renderImages;

let mousePos = null;
let angle = null;
let canShoot = true;

let imgCount = 1;
function renderImages(){
    if(--imgCount>0){return}
    animate();
}

//ensure cannon ball have the correct staring position
function sortBallPos(x,y){
    let rotateAngle = angle;
    //work out distance between rotate point and cannon nozzle
    let dx = x - (cannon.x + 15);
    let dy = y - (cannon.y - 50);
    let distance = Math.sqrt(dx*dx + dy*dy);
    let originalAngle = Math.atan2(dy,dx);
    //work out new position
    let newX = (cannon.x + 15) + distance * Math.cos(originalAngle + rotateAngle);
    let newY = (cannon.y - 50) + distance * Math.sin(originalAngle + rotateAngle);

    return{
        x: newX,
        y: newY
    }

}

function drawBorder(){
    ctx.fillStyle = "#666666"
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.clearRect(20,20,560,560);
}

class Cannon{
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.topX = x-20;
        this.topY = y-95;
    }

    stand(){
        ctx.beginPath();
        ctx.moveTo(this.x,this.y);
        ctx.lineTo(this.x+15,this.y-50);
        ctx.lineTo(this.x+30,this.y);
        ctx.stroke();
    }

    rotateTop(){
        if(mousePos){
            angle = Math.atan2(mousePos.y - 
                (this.y-50),mousePos.x-
                (this.x+15));
            ctx.translate((this.x+15),(this.y-50));
            ctx.rotate(angle);
            ctx.translate(-(this.x+15),-(this.y-50));
        }
    }

    draw(){
        this.stand();
        ctx.save();
        this.rotateTop();
        ctx.drawImage(cannonTop,this.topX,this.topY,100,50);
    }
}

let cannon = new Cannon(80,580);

class CannonBall {
    constructor(angle,x,y){ 
        this.radius = 15;
        this.mass = this.radius;
        this.angle = angle;
        this.x =x;
        this.y = y;
        this.dx = Math.cos(angle) * speed;
        this.dy = Math.sin(angle) * speed;
        this.gravity = 0.05;
        this.elasticity = 0.5;
        this.friction = 0.008;
        }

        move(){
            if(this.y + this.gravity < 580){
                this.dy += this.gravity;
            }
            //apply friction to x axis
            this.dx = this.dx - (this.dx*this.friction);

            this.x += this.dx;
            this.y += this.dy;
        }

        draw(){
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2);
            ctx.fill();
        }
}


let cannonBalls = [];

function ballHitWall(ball){
    if(ball.x + ball.radius > 580 ||
       ball.x - ball.radius < 20  ||
       ball.y + ball.radius > 580 ||
       ball.y - ball.radius < -500){

       //sort out elasticity and then change direction 
       ball.dy = (ball.dy * ball.elasticity);




       if(ball.x + ball.radius > 580){
            ball.x = 580 - ball.radius;

            ball.dx *= -1;
       }else if(ball.x - ball.radius < 20){
            ball.x = 20 + ball.radius;

            ball.dx *= -1;
       }else if(ball.y + ball.radius > 580){
            ball.y = 580 - ball.radius;

            ball.dy *= -1;
       }else if(ball.y - ball.radius < -500){
            ball.y = -500 + ball.radius;

            ball.dy *= -1;
       }
    }
}

function collide(index){
    let ball = cannonBalls[index];
    for(let j = index +1;j < cannonBalls.length; j++){
        let testBall = cannonBalls[j];
        if(ballHitBall(ball,testBall)){
            collideBalls(ball,testBall);
        }
    }
}

function ballHitBall(ball1,ball2){
    let collision = false;
    let dx = ball1.x - ball2.x;
    let dy = ball1.y - ball2.y;
    let distance = (dx*dx +dy*dy);
    if(distance <= (ball1.radius + ball2.radius)*(ball1.radius + ball2.radius)){
        collision = true;
    }
    return collision;
}

function collideBalls(ball1,ball2){
    let dx = ball2.x - ball1.x;
    let dy = ball2.y - ball1.y;
    let distance = Math.sqrt(dx*dx + dy*dy); 
    let vCollisionNorm = {x: dx/distance,y : dy/distance}
    let vRelativeVelocity = {x: ball1.dx - ball2.dx,y: ball1.dy - ball2.dy};
    let speed = vRelativeVelocity.x*vCollisionNorm.x + 
    vRelativeVelocity.y*vCollisionNorm.y;
    if(speed<0) return;
    let impulse = 2*speed/(ball1.mass+ball2.mass);

    ball1.dx -= (impulse*ball2.mass*vCollisionNorm.x);
    ball1.dy -= (impulse*ball2.mass*vCollisionNorm.y);
    ball2.dx += (impulse*ball1.mass*vCollisionNorm.x);
    ball2.dy += (impulse*ball1.mass*vCollisionNorm.y);

    ball1.dy = (ball1.dy*ball1.elasticity);
    ball2.dy = (ball2.dy*ball2.elasticity);
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    //draw border first
    drawBorder();
    //moving canvas graphics
    cannon.draw();
    ctx.restore();
    //shoot the cannon ball
    cannonBalls.forEach((ball,index) => {
        //move the ball
        ball.move();
        ballHitWall(ball);
        collide(index);
        //render ball to canvas
        ball.draw();

    })
}

// animate();

canvas.addEventListener("mousemove", e => {
    mousePos = {
        x: e.clientX - canvas.offsetLeft,
        y: e.clientY - canvas.offsetTop
    }
});

canvas.addEventListener("click", e => {
    if(angle < -2 || angle > 0.5) return;

    if(!canShoot)return;
    canShoot = false;

    let ballPos = sortBallPos(cannon.topX + 100,cannon.topY + 30);

    cannonBalls.push(
        new CannonBall(angle,ballPos.x,ballPos.y)
    );

    //can only shoot cannon 1 second at a time
    setTimeout(() => {
        canShoot = true;
    },1000);
})
{/* <input type="range" id="speed" min="1" max="20" value="10"> */}
