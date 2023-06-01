var monster_colors = "979dac-b1a7a6-9a8c98".split("-").map(a=>"#"+a)

class Monster{
  constructor(args){ //預設值，基本資料(物件顏色、移動速率、大小、初始顯示位置...)
    this.r = args.r || random(50,80) //設計怪物的主體，就傳參數args.r來設定怪物大小，沒有傳參數就已100為主
    this.p = args.p || createVector(random(width),random(height)) //建立一個向量，由電腦亂數抽取顯示的初始位置
    this.v = args.v || createVector(random(-1,1),random(-1,1)) //移動的速度，如果沒有傳args參數就會利用
    this.color = args.color || random(monster_colors)
    this.mode = random(["happy","bad"])
    this.dead = false //代表活著
    this.timenum = 0 //讓它顯示死掉的畫面
  }
 draw(){ //劃出元件
  if(this.dead == false){
    push() //執行push()後，依照設定，設定原點(0,0)位置
      translate(this.p.x, this.p.y)
      fill(this.color)
      noStroke()
      ellipse(0,0,this.r)
//=============怪物表情==============//
      if(this.mode=="happy"){
        fill(255)
        ellipse(0,0,this.r/2)
        fill("#463f3a")
        ellipse(0,0,this.r/3)
      }
      else{
        fill(255)
        arc(0,0,this.r/2,this.r/2,0,PI)
        fill("#463f3a")
        arc(0,0,this.r/3,this.r/3,0,PI)
      }
//======================================//
      stroke(this.color)
      strokeWeight(3)
      noFill()
      // line(this.r/2,0,this.r,0)
      for(var j=0; j<8; j++){
        rotate(PI/4)
        beginShape()
        for(var i=0; i<(this.r/2); i++){
         vertex(this.r/2+i,sin(i/3+frameCount/12)*10)
        }
      endShape()
    }
   pop() //執行pop()，遠點回到視窗左上角
  }
  else{ //怪物死掉畫面
    this.timenum = this.timenum + 1
    push()
     translate(this.p.x, this.p.y)
     fill(this.color)
     noStroke()
     ellipse(0,0,this.r)
     fill(255)
     ellipse(0,0,this.r/2)
     stroke("#463f3a")
     strokeWeight(3)
     line(-this.r/6, 0, this.r/6, 0)
     stroke(this.color)
     strokeWeight(3)
     noFill()
     for(var j=0; j<8; j++){
       rotate(PI/4)
       line(this.r/2, 0, this.r, 0)
     }
    pop()
  }
}

 update(){ //計算元件移動後的位置
    this.p.add(this.v)
    if(this.p.x<=0 || this.p.x>=width){ //x軸碰到左邊(<=0)，或是碰到右邊(>=0)
        this.v.x = -this.v.x //x速度方向改變
      }
      if(this.p.y<=0 || this.p.y>=height){ //y軸碰到上面(<=0)，或是碰到下面(>=0)
        this.v.y = -this.v.y //y速度方向改變
      }
 }
 isDOPHINInRanger(x,y){ //功能 : 判斷滑鼠按下的位置是否在物件範圍內
  let d = dist(x,y,this.p.x,this.p.y)  //計算兩點之間距離，放到d變數內
  if(d<this.r/2){
    return true //飛彈(x,y)與物件(this.p.x,this.p.y)的距離小於物件寬度，代表碰觸(回傳至true)
  }
  else{
    return false //飛彈(x,y)與物件(this.p.x,this.p.y)的距離大於物件寬度，代表碰觸(回傳至false)
  }
 }
}

