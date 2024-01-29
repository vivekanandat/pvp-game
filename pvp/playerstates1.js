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
    constructor(){
        this.input=new InputHandler();
    }
}

export class STANDING extends State{
    constructor(player1){
        super('STANDING');
        this.player1=player1;

    }
    enter(){
        if(this.input.keys.includes(this.player1.left)){
            this.player1.flip=true;
        }
        else if(this.input.keys.includes(this.player1.right)){
            this.player1.flip=false;
        }
        this.player1.frameY=0.5;
        this.player1.width=58;
        this.player1.maxFrame=7;
        this.player1.height = 58;
        this.player1.airStep=true;
    }
    InputHandler(input){
        if(this.player1.vulnarable)this.player1.setstate(states.VULNARABLE);
        if(input.includes(this.player1.left) || input.includes(this.player1.right)){
            this.player1.setstate(states.RUNNING);
        }
        if(input.includes(this.player1.punch))this.player1.setstate(states.PUNCH);
        if(input.includes(this.player1.jumper))this.player1.setstate(states.JUMPING);
        if(input.includes(this.player1.sprinter))this.player1.setstate(states.SPRINTING);
        if(input.includes(this.player1.crouch)){
            this.player1.setstate(states.BLOCK);
        }
    }
}

export class RUNNING extends State{
    constructor(player1){
        super('RUNNING');
        this.player1=player1;

    }
    enter(){
        if(this.input.keys.includes(this.player1.left)){
            this.player1.flip=true;
        }
        else if(this.input.keys.includes(this.player1.right)){
            this.player1.flip=false;
        }
        this.player1.height=65;
        this.player1.frameY=1.55;
        this.player1.width=54;
        this.player1.maxFrame=7;
    }
    InputHandler(input){
        if(input.includes(this.player1.right)||input.includes(this.player1.left)){
            this.player1.setstate(states.RUNNING);
        }
        if(input.includes(this.player1.punch))this.player1.setstate(states.PUNCH);
        if(input.includes(this.player1.jumper))this.player1.setstate(states.JUMPING);
        if(input.includes(this.player1.sprinter))this.player1.setstate(states.SPRINTING);
        else if(!input.includes(this.player1.left) && !input.includes(this.player1.right)){
            this.player1.setstate(states.STANDING);
        }
        if(this.player1.vulnarable){
            this.player1.setstate(states.VULNARABLE);
        }
    }
}
export class JUMPING extends State{
    constructor(player1){
        super('JUMPING');
        this.player1=player1;
        this.sound=new Audio();
        this.sound.src="jump.ogg";

    }
    enter(){
        if(this.player1.onground())this.player1.jump -= 20;
        this.player1.frameY=4.53;
        this.player1.width=43;
        this.player1.maxFrame=0;
        this.player1.height = 58;
        this.sound.play();
    }
    InputHandler(input){
        if(this.player1.vulnarable)this.player1.setstate(states.VULNARABLE);
        if(input.includes(this.player1.punch))this.player1.setstate(states.PUNCH);
        if(this.player1.jump > this.player1.weight){
            this.player1.setstate(states.FALLING);
        }
        if(input.includes(this.player1.jumper))this.player1.setstate(states.EXTRAJUMPING);
    }
}
export class FALLING extends State{
    constructor(player1){
        super('FALLING');
        this.player1=player1;
        this.sound=new Audio();
        this.sound.src="jumpland.wav";
    }
    enter(){
        this.player1.frameY=4.53;
        this.player1.width=43;
        this.player1.maxFrame=0;
        this.player1.height = 58;
    }
    InputHandler(input){
        if(this.player1.vulnarable)this.player1.setstate(states.VULNARABLE);
        if(input.includes(this.player1.punch))this.player1.setstate(states.PUNCH);
        if(this.player1.onground()){
            this.player1.frameX=0;
            this.player1.setstate(states.STANDING);
            this.player1.airStep=true;
            this.sound.play();
        }
        if(input.includes(this.player1.jumper))this.player1.setstate(states.EXTRAJUMPING);
    }
}
export class SPRINTING extends State{
    constructor(player1){
        super('SPRINTING');
        this.player1=player1;
        this.sound=new Audio();

    }
    enter(){
        this.player1.frameY=5.7;
        this.player1.width=52;
        this.player1.maxFrame=0;
        this.player1.height = 58;
        this.player1.sprint=true;
    }
    InputHandler(input){
        if(this.player1.vulnarable)this.player1.setstate(states.VULNARABLE);
        if(input.includes(this.player1.punch))this.player1.setstate(states.PUNCH);
        if(input.includes(this.player1.jumper))this.player1.setstate(states.JUMPING);
        else if(!this.player1.condition){
            this.player1.setstate(states.STANDING);
        }
    }
}
export class BLOCK extends State{
    constructor(player1){
        super('BLOCK');
        this.player1=player1;

    }
    enter(){
        this.player1.frameY=7.7;
        this.player1.height=60; 
        this.player1.maxFrame=0;
        this.player1.width=40; 
    }
    InputHandler(input){
        if(input.includes(this.player1.punch))this.player1.setstate(states.PUNCH);
        else if(input.includes(this.player1.jumper))this.player1.setstate(states.JUMPING);
        else if(!input.includes(this.player1.crouch)){
            this.player1.setstate(states.STANDING);
        }
    }
}

export class PUNCH extends State{
    constructor(player1){
        super('PUNCH');
        this.player1=player1;

    }
    enter(){
        this.player1.frameY=2.66;
        this.player1.width=50;
        this.player1.height = 65; 
        this.player1.maxFrame=7;
    }
    InputHandler(input){
        if(input.includes(this.player1.jumper)){
            this.player1.setstate(states.JUMPING);
            input.splice(input.indexOf(this.player1.jumper),1);    
        }
        if(input.includes(this.player1.sprinter))this.player1.setstate(states.SPRINTING);
        else if(!input.includes(this.player1.punch) ){
            this.player1.setstate(states.STANDING);
        }
    }
}

export class EXTRAJUMPING extends State{
    constructor(player1){
        super('EXTRAJUMPING');
        this.player1=player1;
        this.sound=new Audio();
        this.sound.src="jump.ogg";

    }
    enter(){
        if(!this.player1.onground() && this.player1.airStep)this.player1.jump -= 20;
        this.player1.frameY=4.53;
        this.player1.width=43;
        this.player1.maxFrame=0;
        this.player1.height = 58;
        this.player1.airStep=false;
        this.sound.play();
    }
    InputHandler(input){
        if(input.includes(this.player1.punch))this.player1.setstate(states.PUNCH);
        if(this.player1.onground()){
            this.player1.setstate(states.STANDING);
        }
        if(this.player1.jump > this.player1.weight){
            this.player1.setstate(states.FALLING);
        }
    }
}

export class VULNARABLE extends State{
    constructor(player1){
        super('VULNARABLE');
        this.player1=player1;
    }
    enter(){
        this.player1.frameY=6.85;
        this.player1.width=44;
        this.player1.maxFrame=0;
        this.player1.height = 58;
    }
    InputHandler(input){
        if(!this.player1.vulnarable)this.player1.setstate(states.STANDING);
    }
}
