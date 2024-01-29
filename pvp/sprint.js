import {Player1} from "./player1.js";
import { InputHandler } from "./input.js";


export class sprint{
    constructor(game,p){
        this.game=game;
        this.framex=0;
        this.fps=12;
        this.frameintervel=1000/this.fps;
        this.frameTimer=0;
        this.image=document.getElementById("sprintdustflip");
        this.image1=document.getElementById("sprintdust");
        this.player1=p;
        this.input=new InputHandler();
        this.x=50;
        this.y=36;
    }
    update(deltatime){
        if (this.frameTimer > this.frameintervel) {
            this.frameTimer = 0;
            if (this.frameTimer < this.frameintervel) {
                this.framex++;
            }
            else framex=0;
        }
        else{
            this.frameTimer += deltatime;
        }
        if(this.framex>4){
            this.framex=0;
            this.player1.sprint=false;
        }
        if(this.input.keys.includes(this.player1.sprinter)){
            this.player1.sprint=true;
        }

    }
    draw(ctx){
        if(this.player1.sprint){
            if(this.player1.flip){
                ctx.drawImage(this.image,this.framex*this.x,0,this.x,this.y,this.player1.sprx+50,this.player1.spry+18,this.x,this.y);
            }
            if(!this.player1.flip){
                ctx.drawImage(this.image1,this.framex*this.x,0,this.x,this.y,this.player1.sprx-50,this.player1.spry+18,this.x,this.y);
            }
        }
        
    }
}
export class KO{
    constructor(game){
        this.game=game;
        this.fps=12;
        this.framex=0;
        this.frameintervel=1000/this.fps;
        this.frameTimer=0;
        this.ko=document.getElementById("KO");
        this.x=330;
        this.y=200;
        this.done=false;
        this.koed=false;
    }
    update(deltatime){
        if (this.frameTimer > this.frameintervel) {
            this.frameTimer = 0;
            if (this.frameTimer < this.frameintervel) {
                this.framex++;
            }
            else framex=0;
        }
        else{
            this.frameTimer += deltatime;
        }
        if(this.framex>10){
            this.framex=0;
            this.done=true;
        }
    }
    draw(ctx){
        if(!this.done){
            ctx.drawImage(this.ko,(this.framex)*this.x,0,this.x,this.y,50,50,800,600);
            this.koed=true;
        }
        else if(this.koed){
            window.location.reload();
        }
    }
}
export class sphere{
    constructor(game,p){
        this.game=game;
        this.framex=0;
        this.framesx=0;
        this.fps=5;
        this.speed=5;
        this.frameintervel=1000/this.fps;
        this.frameTimer=0;
        this.sphereflip=document.getElementById("sphereflip");
        this.sphere=document.getElementById("sphere");
        this.spherex=0;
        this.spherey=0;
        this.run=false;
        this.p=p;
        this.x=35;
        this.y=35;
    }
    update(deltatime){
        if (this.frameTimer > this.frameintervel) {
            this.frameTimer = 0;
            if (this.frameTimer < this.frameintervel) {
                this.framex++;
                if(this.p.u)
                    this.framesx++;
                
            }
            else{ 
                framex=0;
                if(this.p.u){
                    this.framesx=0;
                }
            }
        }
        else{
            this.frameTimer += deltatime;
        }
        if(this.framesx>4){
            this.framesx=0;
            this.p.u=false;
            this.run=false;
        }
        if(!this.run){
            this.spherex=this.p.x+30;
            this.spherey=this.p.y;
            if(this.p.flip){
                this.speed=-5;
            }
            else{
                this.speed=5;
            }
        }
        if(this.p.u){
            this.p.spherex=this.spherex;
            this.p.spherey=this.spherey;
        }
        else{
            this.p.spherex=0;
            this.p.spherey=0;
        }
    }
    draw(ctx){
        if(this.p.u && this.speed==-5){
            if(this.framesx<4){
                ctx.drawImage(this.sphere,(this.framesx)*this.x,0,35,35,this.spherex,this.spherey,35,35);
                this.spherex+=this.speed;
                this.run=true;
            }
        }
        else if(this.p.u){
            if(this.framesx<4){
                ctx.drawImage(this.sphereflip,(this.framesx)*this.x,0,35,35,this.spherex,this.spherey,35,35);
                this.spherex+=this.speed;
                this.run=true;
            }
        }

    }
}