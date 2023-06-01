class Obj{ // 宣告一個類別，針對畫
  constructor(args){ //預設值，基本資料(物件顏色、移動速度、大小)
    // this.p = args.p || {x: random(width), y: random(height)} //描述該物件初始位置
    this.p = args.p || createVector(random(width),random(height))
    // this.v = {x: random(-1,1), y: random(-1,1)} //描述該物件的移動速度
    this.v = createVector(random(-1,1),random(-1,1))
    this.size = random(4,6) //描述該物件的放大倍率
    this.color = random(fill_colors) //描述該物件的充滿顏色
  }
  draw(){ //劃出單一物件形狀
   push() //執行push()後，依照設定，設定原點(0,0)位置
    translate(this.p.x, this.p.y) //以該物件位置為原點
    scale(this.v.x<0?-1:1,-1)
    fill(this.color)
    // noStroke()
    stroke("#f08080")
    strokeWeight(2)
    beginShape()
    for(var k=0; k < points.length-1; k=k+1){
      // line(points[k][0]*this.size,points[k][1]*this.size,points[k+1][0]*this.size,points[k+1][1]*this.size)
      vertex(points[k][0]*this.size,points[k][1]*this.size) //只要設定一個點，當指令到endShape()。會把所有的點串接在一起
      // curveVertex(points[k][0]*this.size,points[k][1]*this.size) //畫線為圓弧"for(var k=0; k < points.length-1; k=k+1)"
    }
    endShape()
   pop() //執行pop()，遠點回到視窗左上角
  }
  update(){ //移動程式碼
    // this.p.x = this.p.x + this.v.x //x軸目前位置(this.p.x)加上移動速率(this.v.x)
    // this.p.y = this.p.y + this.v.y //y軸目前位置(this.p.y)加上移動速率(this.v.y)
    this.p.add(this.v) //設定好像亮後使用add，就可與上面兩行指令一樣的效果

    //知道滑鼠位置<建立一個滑鼠向量
    // let mouseV = createVector(mouseX,mouseY) //把滑鼠的位置轉圜為一個向量值
    // let delta =  mouseV.sub(this.p).limit(this.v.mag()*2) //sub計算出滑鼠所在位置向量(mouseV)到物件向量(this.p)
    // this.v.mag()代表該物件速度大小(一個向量值有大小與方向)
    // this.p.add(delta)

    if(this.p.x<=0 || this.p.x>=width){ //x軸碰到左邊(<=0)，或是碰到右邊(>=0)
      this.v.x = -this.v.x //x速度方向改變
    }
    if(this.p.y<=0 || this.p.y>=height){ //y軸碰到上面(<=0)，或是碰到下面(>=0)
      this.v.y = -this.v.y //y速度方向改變
    }
  }
  isDOPHINInRanger(x,y){ //功能 : 判斷滑鼠按下的位置是否在物件範圍內
    let d = dist(x,y,this.p.x,this.p.y)  //計算兩點之間距離，放到d變數內
    if(d<14*this.size){
      return true //滑鼠與物件的距離小於物件寬度，代表碰觸(回傳至true)
    }
    else{
      return false //滑鼠與物件的距離大於物件寬度，代表碰觸(回傳至false)
    }
  }
}