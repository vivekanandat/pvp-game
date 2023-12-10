import {Player1} from "./player1.js";
import { InputHandler } from "./input.js";

export class sprint{
    constructor(game){
        this.game=game;
        this.framex=0;
        this.framey=0;
        this.fps=12;
        this.frameintervel=1000/this.fps;
        this.frameTimer=0;
        this.image=document.getElementById("sprintdustflip");
        this.image1=document.getElementById("sprintdust");
        this.ko=document.getElementById("KO");
        this.Player1=new Player1(game);
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
            this.Player1.sprint=false;
        }
        if(this.input.keys.includes("l")){
            this.Player1.sprint=true;
        }

    }
    draw(ctx){
        if(this.Player1.sprint){
            if(this.game.player1.flip){
                ctx.drawImage(this.image,this.framex*this.x,0,this.x,this.y,this.game.player1.sprx+50,this.game.player1.spry+18,this.x,this.y);
            }
            if(!this.game.player1.flip){
                ctx.drawImage(this.image1,this.framex*this.x,0,this.x,this.y,this.game.player1.sprx-50,this.game.player1.spry+18,this.x,this.y);
            }
        }
        
    }
}
export class KO{
    constructor(game){
        this.game=game;
        this.framex=0;
        this.framey=0;
        this.fps=10;
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