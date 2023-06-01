let points = [[1,11], [4,10], [7,10], [11,9], [13,8], [15,5], [15,3], [16,1], [16,-1], [15,-1], [11,1], [9,2], [7,1], [5,-1], [1,-1], [0,0], [3,1], [1,1], [-2,0], [-6,-2], [-9,-6], [-9,-7], [-7,-9], [-7,-11], [-8,-12], [-9,-11], [-11,-10], [-13,-11], [-15,-11], [-17,-12], [-17,-10], [-15,-7], [-12,-6], [-11,-6], [-10,-3], [-8,2], [-5,6], [-3,9], [-4,10], [-5,10], [-2,12], [1,11],[4,10]]; //利用串列設定點
let backgroundImage;
let bgMusic;

var fill_colors = "f7cac9-fddbdb-ffddd2".split("-").map(a=>"#"+a)

//=============設定海豚物件==============//
var dophin //目前要處理的物件，暫時放在dolphin變數內
var dophins = [] //產生所有的物件，為物件的倉庫
//=============設定飛彈物件==============//
var bullet //目前要處理的物件，暫時放在bullet變數內
var bullets = [] //產生所有的物件，為物件的倉庫
//=============設定怪獸物件==============//
var monster //目前要處理的物件，暫時放在monster變數內
var monsters = [] //產生所有的物件，為物件的倉庫
//=============設定砲台位置==============//
var shipP
//======================================//
var score = 0

function preload(){
  bgMusic = loadSound("sound/April shower.wav")
  dolphin_sound = loadSound("sound/dolphin.wav") //加入海豚音效
  bullet_sound = loadSound("sound/Launching wire.wav") //加入砲台音效
  backgroundImage = loadImage("bg.avif"); //加入背景圖
}

function setup() {
  bgMusic.play()
  createCanvas(windowWidth, windowHeight);
  shipP = createVector(windowWidth/2, windowHeight/2)
  for(var i=0; i<10; i=i+1){
    dophin = new Obj({}) //產生一個新的Obj class元件
    dophins.push(dophin) //把dophin物件放到dophins陣列內
  }
  for(var i=0; i<20; i=i+1){
    monster = new Monster({}) //產生一個新的Obj class元件
    monsters.push(monster) //把monster物件放到monsters陣列內
  }
}

function draw() {
  background(backgroundImage);
  // for(var j=0; j<dophins.length; j=j+1){
  //   dophin = dophins[j]
  //   dophin.draw()
  //   dophin.update()
  // }

  if(keyIsPressed){
    if(key=="ArrowLeft" || key=="a"){ //按鍵盤左鍵或是"a"
      shipP.x = shipP.x - 5
    }
    if(key=="ArrowRight" || key=="b"){  //按鍵盤右鍵或是"b"
      shipP.x = shipP.x + 5
    }
    if(key=="ArrowUp" || key=="w"){  //按鍵盤上鍵或是"w"
      shipP.y = shipP.y - 5
    }
    if(key=="ArrowDown" || key=="s"){  //按鍵盤下鍵或是"s"
      shipP.y = shipP.y + 5
    }
  }

  for(let dophin of dophins){ //海豚顯示
    dophin.draw()
    dophin.update()
    for(let bullet of bullets){ //檢查每一物件
      if(dophin.isDOPHINInRanger(bullet.p.x,bullet.p.y)){
        dophins.splice(dophins.indexOf(dophin),1)
        bullets.splice(bullets.indexOf(bullet),1) //從倉庫dophins取出被滑鼠按到的物件編號(dophins.indexOf(dophin))，只取1個
        score = score - 1
        dolphin_sound.play()
    }
  }
 }

  for(let bullet of bullets){ //飛彈顯示
    bullet.draw()
    bullet.update()
 }

  for(let monster of monsters){ //怪獸顯示
    if(monster.dead == true && monster.timenum>10){
      monsters.splice(monsters.indexOf(monster),1)
    }
    monster.draw()
    monster.update()
    for(let bullet of bullets){ //檢查每一物件
      if(monster.isDOPHINInRanger(bullet.p.x, bullet.p.y)){
        // monsters.splice(monsters.indexOf(monster),1)
        bullets.splice(bullets.indexOf(monster),1) //從倉庫dophins取出被滑鼠按到的物件編號(dophins.indexOf(dophin))，只取1個
        score = score + 1
        monster.dead = true //代表怪物死掉
        // dolphin_sound.play()
    }
  }
}

  textSize(30)
  text(score,50,50)
  push() //重新規劃原點(0,0)在視窗正中心
    let dx = mouseX - width/2
    let dy = mouseY - height/2
    let angle = atan2(dy,dx)
    translate(shipP.x,shipP.y)
    fill("#d1b3c4")
    stroke("#735d78")
    rotate(angle)
    triangle(-25,25,-25,-25,50,0) //設定三個點，畫成一個三角形
  pop() //恢復原本設定，原點(0,0)回到左上角
}

function mousePressed(){
//=================產生物件=================//
  // dophin = new Obj({
  //   p:{x:mouseX, y:mouseY}}) //產生一個新的Obj class元件
  // dophins.push(dophin) //把dophin物件放到dophins陣列內(丟到倉庫)
//=========================================//

//=================刪除物件=================//
// for(let dophin of dophins){ //檢查每一物件
//   if(dophin.isDOPHINInRanger(mouseX,mouseY)){
//     dophins.splice(dophins.indexOf(dophin),1) //從倉庫dophins取出被滑鼠按到的物件編號(dophins.indexOf(dophin))，只取1個
//     score = score + 1
//   }
// }
//=========================================//

//=================產生飛彈=================//
bullet = new Bullet({}) //滑鼠按下的地方，產生一個新的Bullet class元件
bullets.push(bullet) //把bullet物件放到bullets陣列內(丟到倉庫)
bullet_sound.play()
//=========================================//
}

function keyPressed(){
  if(key==" "){
    bullet = new Bullet({})
    bullets.push(bullet)
    bullet_sound.play()
  }
  // if(key=="ArrowLeft"){
  //   shipP.x = shipP.x - 5
  // }
  // if(key=="ArrowRight"){
  //   shipP.x = shipP.x + 5
  // }
  // if(key=="ArrowUp"){
  //   shipP.y = shipP.y - 5
  // }
  // if(key=="ArrowDown"){
  //   shipP.y = shipP.y + 5
  // }
}