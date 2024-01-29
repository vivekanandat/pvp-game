import { STANDING,RUNNING,JUMPING,FALLING,SPRINTING,BLOCK,PUNCH,EXTRAJUMPING,VULNARABLE } from "./playerstates1.js";

export class Player1{
    constructor(game,crouch,left,right,jumper,punch,sphere,sprint,x,y,flip,hp){

        this.invulnarable=false;
        this.invulnarablecount=0;
        //controls
        this.crouch=crouch;
        this.left=left;
        this.right=right;
        this.jumper=jumper;
        this.punch=punch;
        this.sphere=sphere;
        this.sprinter=sprint;
        this.hp=hp;
        //vulnarable
        this.vulnarable=false;
        this.timegap=50;
        this.tracer=0;

        this.hit=0;
        

        this.hitlast=0
        this.flip=flip;
        this.game = game;
        this.x = x;
        this.health=0;
        this.width = 40;
        this.frames = 0;
        this.height = 65;
        this.speed = 5; 
        this.airstep=true;
        this.fps=20;
        //sprint
        this.condition=false;
        this.sprx=0;
        this.spry=0;
        
        //sphere
        this.spherex=0;
        this.spherey=0;
        this.u=false;

        this.frameintervel=1000/this.fps;
        this.frameTimer=0;
        this.weight = 1.5;
        this.maxSpeed = 20;
        this.frameX=0;
        this.jump=0;
        this.frameY=0;
        this.maxFrame=5;
        this.y = y;

        //images
        this.image1 = document.getElementById("player1");
        this. image2 = document.getElementById("player1flip");
        this.hpimg=document.getElementById("hpbar");
        this.hpbarfill1=document.getElementById("hpbarfill1");
        

        this.states=[
                        new STANDING(this),new RUNNING(this),new JUMPING(this),new FALLING(this),
                        new SPRINTING(this),new BLOCK(this),new PUNCH(this),new EXTRAJUMPING(this),
                        new VULNARABLE(this)
                    ];

        this.currentState=this.states[0];
        this.currentState.enter();
    }
    update(input,deltatime){
        this.currentState.InputHandler(input);
        if(!this.vulnarable || this.invulnarable){
            if(this.invulnarable){
                this.invulnarablecount++;
            }
            if(input.includes(this.crouch)){
                input=[this.crouch];
            }
            if(input.includes(this.punch)){
                if(!this.flip){
                this.x+=this.speed*0.016;
                }
                else{
                    this.x-=this.speed*0.016;
                }
                input=[this.punch];
            }
            if(input.includes(this.sprinter)){
                this.condition=true;
                this.sprx=this.x;
                this.spry=this.y;
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
            if(input.includes(this.left)){
                this.x -= this.speed;
            }
            if(input.includes(this.sphere)){
                this.u=true;
            }
            else if(input.includes(this.right)){
                this.x += this.speed;
            }
            if(this.x<0)this.x=0;
            if(this.x>canvas.width-this.width)
                this.x=canvas.width-this.width;
            // if(input.includes(this.jump) && this.y===this.game.height-this.height){
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
            
            if(input.includes(this.jumper)){
                input.splice(input.indexOf(this.jumper),1);
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
        //player animation
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

    }
    draw(ctx){
        if(this.flip){
            ctx.drawImage(this.image2,this.frameX * this.width,this.frameY * this.height,this.width,this.height,this.x,this.y,this.width,this.height);
        }else{
            ctx.drawImage(this.image1,this.frameX * this.width,this.frameY * this.height,this.width,this.height,this.x,this.y,this.width,this.height);
        }

    }
    hpbar(ctx){
        ctx.drawImage(this.hpbarfill1,0,0,47,2,70+this.hp,18,this.health/17.96,6);
        ctx.drawImage(this.hpimg,0,0,600,55,this.hp,0,1050,100);
        // ctx.drawImage(this.hpbarfill,0,0,600,55,0,0,1050,100);
        // ctx.fillRect(0,0,this.health/3.76,10);
    }
    setstate(state){
        this.currentState=this.states[state];
        this.currentState.enter();
    }
    onground(){
        return this.y >= this.game.height-this.height;
    }
        
}