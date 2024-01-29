import { STANDING,RUNNING,JUMPING,FALLING,SPRINTING,BLOCK,PUNCH,EXTRAJUMPING,VULNARABLE } from "./playerstates2.js";

export class Player2{
    constructor(game){
        
        this.invulnarable=false;
        this.invulnarablecount=0;
        //vulnarable
        this.vulnarable=false;
        this.timegap=50;
        this.tracer=0;
        this.u=false;
        
        this.hit=0;
        this.hitlast=0;
        this.spherex=0;
        this.spherey=0;
        this.health=0;
        this.flip=true;
        this.game = game;
        this.x = 756;
        this.width = 40;
        this.frames = 0;
        this.height = 65;
        this.speed = 5; 
        this.airstep=true;
        this.fps=20;
        //sprint
        this.condition=false;
        this.frameintervel=1000/this.fps;
        this.frameTimer=0;
        this.weight = 1.5;
        this.maxSpeed = 20;
        this.frameX=0;
        this.jump=0;
        this.frameY=0;
        this.maxFrame=5;
        this.y = this.game.height - this.height;
        this.image1 = document.getElementById("player1");
        this.image2 = document.getElementById("player1flip");
        this.hpimg=document.getElementById("hpbar");
        this.hpbarfill1=document.getElementById("hpbarfill1");
        this.states=[
                    new STANDING(this),new RUNNING(this),new JUMPING(this),
                    new FALLING(this),new SPRINTING(this),new BLOCK(this),
                    new PUNCH(this),new EXTRAJUMPING(this),new VULNARABLE(this)
                ];
        this.currentState=this.states[0];
        this.currentState.enter();
    }
    update(input,deltatime){
        this.currentState.InputHandler(input);
        //animation
        if(this.frameTimer>this.frameintervel){
            this.frameTimer=0;
            if(this.frameX<this.maxFrame){
                this.frameX++;
            }
            else {
                this.frameX=0;
            }
        }
        else{
            this.frameTimer+=deltatime;
        }
        if(!this.vulnarable || this.invulnarable){
            if(this.invulnarable){
                this.invulnarablecount++;
            }
            if(input.includes("1")){
                if(!this.flip){
                this.x+=this.speed*0.016;
                }
                else{
                    this.x-=this.speed*0.016;
                }
                input=["1"];
            }
            if(input.includes("3")){
                this.condition=true;
            }
            if(this.condition && this.x1<this.maxSpeed){
                if(this.flip){
                    this.x-=this.x1;
                    this.x1+=1;
                }
                else{
                this.x+=this.x1;
                this.x1+=1;
                }
            }
            else if(this.condition){
                this.x1=0;
                this.condition=false;
            }
            if(input.includes("ArrowLeft")){
                this.x -= this.speed;
            }
            else if(input.includes("ArrowRight")){
                this.x += this.speed;
            }
            if(input.includes("4")){
                this.u=true;
            }
            if(this.x<0)this.x=0;
            if(this.x>canvas.width-this.width)
                this.x=canvas.width-this.width;
            // if(input.includes("2") && this.y===this.game.height-this.height){
            //     this.jump=-18;
            // }
            
            this.y+=this.jump;
            if(!this.onground()){
                this.jump+=this.weight;
            }
            else{
                this.jump=0;
                this.y=this.game.height-this.height;
            }
            if(input.includes("2")){
                input.splice(input.indexOf("2"),1);
            }
        }else{
            //vulnerable timegap
            if(this.tracer>this.timegap){
                this.vulnarable=false;
                this.tracer=-1;
            }
            else{
                this.tracer+=1;
            }
        }
        if(this.invulnarablecount>40){
            this.invulnarable=false;
            this.invulnarablecount=0;
        }
        if(this.hit>this.hitlast){
            if(this.x<canvas.width-this.width && this.x>0){
                if(this.flip){
                    this.x+=1;
                }
                else{
                    this.x-=1;
                }
            }
            if(this.hit>10){
                this.invulnarable=true;
                this.vulnarable=false;
            }
            if(!this.vulnarable){
                this.hit=0;
            }
            this.hitlast=this.hit;
        }
    }
    draw(ctx){
        if(this.flip){
            ctx.drawImage(this.image2,this.frameX * this.width,this.frameY * this.height,this.width,this.height,this.x,this.y,this.width,this.height);
        }else{
            ctx.drawImage(this.image1,this.frameX * this.width,this.frameY * this.height,this.width,this.height,this.x,this.y,this.width,this.height);
        }
    }
    hpbar(ctx){
        
        ctx.drawImage(this.hpbarfill1,0,0,47,2,70+636,18,this.health/17.96,6);
        ctx.drawImage(this.hpimg,0,0,600,55,636,0,1050,100);
        // ctx.fillStyle="yellow";
        // ctx.fillRect(800-this.health/3.76,0,this.health/3.76,10);
    }
    setstate(state){
        this.currentState=this.states[state];
        this.currentState.enter();
    }
    onground(){
        return this.y >= this.game.height-this.height;
    }
        
}