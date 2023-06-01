//定義一個bullet，物件的class

class Bullet{
  constructor(args){ //預設值，基本資料(物件顏色、移動速率、大小、初始顯示位置...)
    this.r = args.r || 10 //設計的飛彈有大有小時，就傳參數args.r來設定飛彈大小
    this.p = args.p || shipP.copy() //建立一個向量，{x:width/2, y:height/2}
    this.v = args.v || createVector(mouseX-width/2, mouseY-height/2).limit(5)
    this.color = args.color || "#d1b3c4"
  }
  draw(){ //繪出物件程式碼
    push()
      translate(this.p.x, this.p.y)
      fill(this.color)
      stroke("#735d78")
      ellipse(0,0,this.r)
    pop()
  }
  update(){ //計算出移動後的位置
    // this.p.x = this.p.x + this.v.x //x軸目前位置(this.p.x)加上x軸速率(this.v.x)
    // this.p.y = this.p.y + this.v.y //y軸目前位置(this.p.y)加上y軸速率(this.v.y)
    this.p.add(this.v)
  }
}