import { Player1 } from "./player1.js";
import { InputHandler } from "./input.js";
import { Fight } from "./fight.js";
import {sprint,KO,sphere} from "./sprint.js";

window.addEventListener("load", function(){
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 600;

    class Game{
        constructor(widht,height){
            this.widht = widht;
            this.height = height;
            this.player2 = new Player1(this,"s","a","d","k","j","u","l",0,535,false,0);
            this.player1 = new Player1(this,"ArrowDown","ArrowLeft","ArrowRight","2","1","4","3",756,535,true,636);
            this.Fight = new Fight(this.player1,this.player2);
            this.input=new InputHandler();
            this.sprint1=new sprint(this,this.player1);
            this.sprint2=new sprint(this,this.player2);
            this.aurasphere1=new sphere(this,this.player1);
            this.aurasphere2=new sphere(this,this.player2);
            this.ko=new KO(this);
        }
        update(deltatime){
            this.player1.update(this.input.keys,deltatime);
            this.player2.update(this.input.keys,deltatime);
            this.Fight.checkcollision();
            if(this.player1.health<=0){
                this.ko.update(deltatime);
            }
            else if(this.player2.health<=0){
                this.ko.update(deltatime);
            }
            this.sprint1.update(deltatime);
            this.sprint2.update(deltatime);
            this.aurasphere1.update(deltatime);
            this.aurasphere2.update(deltatime);
        }
        draw(ctx){
            this.player2.hpbar(ctx);
            this.player1.hpbar(ctx);
            this.player1.draw(ctx);
            this.player2.draw(ctx);
            //have to create a list of objects to draw and remove the extraones this includes sprintdust specialattacks (not ko since it affects the total canvas and its a pain in the ass to do all that)
            this.sprint1.draw(ctx);
            this.sprint2.draw(ctx);
            this.ko.draw(ctx);
            this.aurasphere1.draw(ctx);
            this.aurasphere2.draw(ctx);
        }
    }
    const game = new Game(canvas.width,canvas.height);
    let lasttime=0;
    function animate(timestamp){
        const deltatime = timestamp - lasttime;
        lasttime = timestamp;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        game.update(deltatime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);
});