import {InputHandler} from "./input.js";

export class Fight{
    constructor(player1,player2){
        this.input=new InputHandler();
        this.player1=player1;
        this.player2=player2;
        this.player1.health=1500;
        this.player2.health=1500;
        this.sound=new Audio();
        this.sound.src="punch.ogg";

    }
    checkcollision(){
        if(this.player1.x+this.player1.width>this.player2.x && this.player1.x<this.player2.x+this.player2.width && this.player1.y+this.player1.height>this.player2.y && this.player1.y<this.player2.y+this.player2.height){
            if(!this.player1.invulnarable){
                if(this.input.keys.includes("1") && !this.input.keys.includes("s")){
                    this.player1.health-=10;
                    this.player1.vulnarable=true;
                    this.player1.timegap=30;
                    this.player1.hit+=1;
                    this.sound.play();
                }
            }
            if(!this.player2.invulnarable){
                if(this.input.keys.includes("j") && !this.input.keys.includes("ArrowDown")){
                    this.player2.health-=10;
                    this.player2.vulnarable=true;
                    this.player2.timegap=30;
                    this.player2.hit+=1;
                    this.sound.play();
                }
            }
        }
    }
}