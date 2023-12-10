import { Player1 } from "./player1.js";
import { InputHandler } from "./input.js";
import { Player2 } from "./player2.js";
import { Fight } from "./fight.js";
import {sprint,KO} from "./sprint.js";

window.addEventListener("load", function(){
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 600;

    class Game{
        constructor(widht,height){
            this.widht = widht;
            this.height = height;
            this.player1 = new Player1(this);
            this.player2 = new Player2(this);
            this.Fight = new Fight(this.player1,this.player2);
            this.input=new InputHandler();
            this.sprint=new sprint(this);
            this.ko=new KO(this);
            this.list=[];
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
            this.sprint.update(deltatime);
        }
        draw(ctx){
            this.player2.hpbar(ctx);
            this.player1.hpbar(ctx);
            this.player1.draw(ctx);
            this.player2.draw(ctx);
            this.sprint.draw(ctx);
            this.ko.draw(ctx);
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