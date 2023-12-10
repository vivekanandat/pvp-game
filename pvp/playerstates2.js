import { InputHandler } from "./input.js";



const states={
    STANDING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    SPRINTING: 4,
    BLOCK: 5,
    PUNCH: 6,
    EXTRAJUMPING: 7,
    VULNARABLE: 8,
}

class State{
    constructor(state){
        this.state=state;
        this.input=new InputHandler();
    }
}

export class STANDING extends State{
    constructor(player2){
        super('STANDING');
        this.player2=player2;

    }
    enter(){
        if(this.input.keys.includes("ArrowLeft")){
            this.player2.flip=true;
        }
        else if(this.input.keys.includes("ArrowRight")){
            this.player2.flip=false;
        }
        this.player2.frameY=0.5;
        this.player2.width=58;
        this.player2.maxFrame=7;
        this.player2.height = 58;
        this.player2.airStep=true;
    }
    InputHandler(input){
        if(input.includes("ArrowLeft") || input.includes("ArrowRight")){
            this.player2.setstate(states.RUNNING);
        }
        if(input.includes("1"))this.player2.setstate(states.PUNCH);
        if(input.includes("2"))this.player2.setstate(states.JUMPING);
        if(input.includes("3"))this.player2.setstate(states.SPRINTING);
        if(input.includes("ArrowDown"))this.player2.setstate(states.BLOCK);
        if(this.player2.vulnarable)this.player2.setstate(states.VULNARABLE);
    }
}

export class RUNNING extends State{
    constructor(player2){
        super('RUNNING');
        this.player2=player2;

    }
    enter(){
        if(this.input.keys.includes("ArrowLeft")){
            this.player2.flip=true;
        }
        else if(this.input.keys.includes("ArrowRight")){
            this.player2.flip=false;
        }
        this.player2.height=65;
        this.player2.frameY=1.55;
        this.player2.width=54;
        this.player2.maxFrame=7;
    }
    InputHandler(input){
        if(input.includes("ArrowRight") || input.includes("ArrowLeft")){
            this.player2.setstate(states.RUNNING);
        }
        if(input.includes("1"))this.player2.setstate(states.PUNCH);
        if(input.includes("2"))this.player2.setstate(states.JUMPING);
        if(input.includes("3"))this.player2.setstate(states.SPRINTING);
        else if(!input.includes("ArrowLeft") && !input.includes("ArrowRight")){
            this.player2.setstate(states.STANDING);
        }
        if(this.player2.vulnarable){ 
            this.player2.setstate(states.VULNARABLE);
        }
    }
}
export class JUMPING extends State{
    constructor(player2){
        super('JUMPING');
        this.player2=player2;

    }
    enter(){
        if(this.player2.onground())this.player2.jump -= 20;
        this.player2.frameY=4.53;
        this.player2.width=43;
        this.player2.maxFrame=0;
        this.player2.height = 58;
    }
    InputHandler(input){
        if(input.includes("1"))this.player2.setstate(states.PUNCH);
        if(this.player2.jump > this.player2.weight){
            this.player2.setstate(states.FALLING);
        }
        if(input.includes("2"))this.player2.setstate(states.EXTRAJUMPING);
        if(this.player2.vulnarable){ this.player2.setstate(states.VULNARABLE);}
    }
}
export class FALLING extends State{
    constructor(player2){
        super('FALLING');
        this.player2=player2;

    }
    enter(){
        this.player2.frameY=4.53;
        this.player2.width=43;
        this.player2.maxFrame=0;
        this.player2.height = 58;
    }
    InputHandler(input){
        if(input.includes("1"))this.player2.setstate(states.PUNCH);
        if(this.player2.onground()){
            this.player2.frameX=0;
            this.player2.setstate(states.STANDING);
            this.player2.airStep=true;
        }
        if(input.includes("2"))this.player2.setstate(states.EXTRAJUMPING);
        if(this.player2.vulnarable){ this.player2.setstate(states.VULNARABLE);}
    }
}
export class SPRINTING extends State{
    constructor(player2){
        super('SPRINTING');
        this.player2=player2;

    }
    enter(){
        this.player2.frameY=5.7;
        this.player2.width=52;
        this.player2.maxFrame=0;
        this.player2.height = 58;
    }
    InputHandler(input){
        if(input.includes("1"))this.player2.setstate(states.PUNCH);
        if(input.includes("2"))this.player2.setstate(states.JUMPING);
        else if(!this.player2.condition){
            this.player2.setstate(states.STANDING);
        }
        if(this.player2.vulnarable){ this.player2.setstate(states.VULNARABLE);}
    }
}
export class BLOCK extends State{
    constructor(player2){
        super('BLOCK');
        this.player2=player2;

    }
    enter(){
     this.player2.frameY=7.7;
     this.player2.height=60; 
     this.player2.maxFrame=0;
     this.player2.width=40; 
    }
    InputHandler(input){
        if(input.includes("1"))this.player2.setstate(states.PUNCH);
        if(input.includes("2"))this.player2.setstate(states.JUMPING);
        else if(!input.includes("ArrowDown")){
            this.player2.setstate(states.STANDING);
        }
        if(this.player2.vulnarable){ this.player2.setstate(states.VULNARABLE);}
    }
}

export class PUNCH extends State{
    constructor(player2){
        super('PUNCH');
        this.player2=player2;

    }
    enter(){
        this.player2.frameY=2.66;
        this.player2.width=50;
        this.player2.height = 65; 
        this.player2.maxFrame=7;
    }
    InputHandler(input){
        if(input.includes("2"))this.player2.setstate(states.JUMPING);
        if(input.includes("3"))this.player2.setstate(states.SPRINTING);
        else if(!input.includes("1") ){
            this.player2.setstate(states.STANDING);
        }
        if(this.player2.vulnarable){ this.player2.setstate(states.VULNARABLE);}
    }
}

export class EXTRAJUMPING extends State{
    constructor(player2){
        super('EXTRAJUMPING');
        this.player2=player2;

    }
    enter(){
        if(!this.player2.onground() && this.player2.airStep)this.player2.jump -= 20;
        this.player2.frameY=4.53;
        this.player2.width=43;
        this.player2.maxFrame=0;
        this.player2.height = 58;
        this.player2.airStep=false;
    }
    InputHandler(input){
        if(input.includes("1"))this.player2.setstate(states.PUNCH);
        if(this.player2.jump > this.player2.weight){
            this.player2.setstate(states.FALLING);
        }
        if(this.player2.vulnarable){ this.player2.setstate(states.VULNARABLE);}
    }
}

export class VULNARABLE extends State{
    constructor(player2){
        super('VULNARABLE');
        this.player2=player2;
    }
    enter(){
        this.player2.frameY=6.85;
        this.player2.width=44;
        this.player2.maxFrame=0;
        this.player2.height = 58;
    }
    InputHandler(input){
        if(!this.player2.vulnarable)this.player2.setstate(states.STANDING);
    }
}