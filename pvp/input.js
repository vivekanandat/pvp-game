export class InputHandler{
    constructor(){
        this.allevents=['w','a','s','d','l','k','u','j','i','o','ArrowUp','ArrowLeft','ArrowDown','ArrowRight','5','6','1','4','2','3'];
        this.keys=[];
        window.addEventListener("keydown",e=>{
            if((this.allevents.includes(e.key)) && !this.keys.includes(e.key)){
                if(e.key==="ArrowLeft" && this.keys.includes("ArrowRight")){
                    this.keys.splice(this.keys.indexOf("ArrowRight"),1);
                }
                else if(e.key==="ArrowRight" && this.keys.includes("ArrowLeft")){
                    this.keys.splice(this.keys.indexOf("ArrowLeft"),1);
                }
                if(e.key==="a" && this.keys.includes("d")){
                    this.keys.splice(this.keys.indexOf("d"),1);
                }
                else if(e.key==="d" && this.keys.includes("a")){
                    this.keys.splice(this.keys.indexOf("a"),1);
                }
                this.keys.push(e.key);
            }
            
        });
        window.addEventListener("keyup",e=>{
            if(this.keys.includes(e.key)){
                this.keys.splice(this.keys.indexOf(e.key),1);
            }
        });
    }
}