
class Ball{
  constructor(){
    this.size = 100;
    this.xPos = 250;
    this.yPos = 250;
    this.xVel = 8;
    this.yVel = 0;
    this.yAcc = -0.7;
    this.xAcc = 0;
    this.k = 0.7;
    this.width = window.innerWidth - this.size;
    this.height = window.innerHeight - this.size;
    console.log(this);
    this.ballElement = document.createElement("DIV");
    this.ballElement.setAttribute("style", "border-radius: 50px; background: orange; width: 100px; height: 100px; position: fixed; transform: translate(-50%, -50%); left: 50px; bottom: -50px")
    document.body.appendChild(this.ballElement);
    this.updateElement();
  }
  updateElement(){
    this.ballElement.setAttribute("style", "border-radius: "+this.size/2+"px; width: "+this.size+"px; height: "+this.size+"px; background: orange; position: fixed; transform: translate(-50%, -50%); left: "+(this.xPos + this.size/2)+"px; bottom: "+(this.yPos - this.size/2)+"px;")
  }

  updatePos(){
    this.xVel += this.xAcc;
    this.yVel += this.yAcc*(this.yPos == 0?0:1);
    var newX = this.xPos + this.xVel;
    if(newX > this.width){
      this.xVel *= - 1;
      this.xPos = this.width;
    }else if(newX < 0){
      this.xVel *= - this.k;
      this.xPos += 0;
    }else{
      this.xPos = newX;
    }
    var newY = this.yPos + this.yVel;
    if(newY > this.height){
      this.yVel *= - this.k;
      this.yPos = this.height;
    }else if(newY < 0){
      this.yVel *= - this.k;
      this.yPos += 0;
    }else{
      this.yPos = newY;
    }
    this.updateElement();
  }
}
window.addEventListener('load', () => {

})
