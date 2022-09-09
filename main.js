//캔버스 세팅
let canvas;
let ctx;


//자주 사용하는 변수 선언 
let score = 0;
let backgroundImage,spaceshipImage,bulletImage,gameoverImage,monsterImage,explosionImage,bossmonsterImage;
let spaceshipX;
let spaceshipY;
let gameOver = false;



//캔버스 세팅
canvas = document.createElement("canvas")
ctx = canvas.getContext("2d")
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas)



//우주선 좌표(우주선은 계속 움직여야 하니까, 좌표는 계속 바뀔 예정이라 따로 뺌)
spaceshipX = canvas.width/2-32;
spaceshipY = canvas.height-64;




//총알의 좌표값 함수
let bulletList = [] //총알들을 저장하는 리스트 [x,y,init]
function Bullet() {
    this.x = 0; //this는 Bullet 자신의미
    this.y = 0;
    this.init = function () {
        this.x = spaceshipX + 19;
        this.y = spaceshipY;
        this.alive = true;//true면 살아있는 총알 false면 죽은 총알
        bulletList.push(this)//총알 리스트에 집어 넣느다
    };
    this.update = function () {
        this.y -= 10;
    };

    this.checkHit = function () {
        for (let i = 0; i < enemyList.length; i++) {
            if (this.y <= enemyList[i].y &&
                this.x >= enemyList[i].x &&
                this.x <= enemyList[i].x + 80) {//총알.y <= 적군.y And //총알.x >= 적군.x and 총알.x <= 적군.x + 적군의 넓이
                //총알이 죽게됨 적군의 우주선이 없어짐, 점수 획득
                score += 10;
                this.alive = false;
                enemyList.splice(i,1);
               // creatExplosion(); 
                //explosionList.splice(i,1);              
                
            }
        }
        for (let i = 0; i < bossEnemyList.length; i++) {
            if (this.y <= bossEnemyList[i].y &&
                this.x >= bossEnemyList[i].x &&
                this.x <= bossEnemyList[i].x + 120) {//총알.y <= 적군.y And //총알.x >= 적군.x and 총알.x <= 적군.x + 적군의 넓이
                //총알이 죽게됨 적군의 우주선이 없어짐, 점수 획득
                score += 50;
                this.alive = false;
                bossEnemyList.splice(i,1);
               // creatExplosion(); 
                //explosionList.splice(i,1);              
                
            }
        }

    }
    this.checkUpline = function () {
        for (let i = 0; i < bulletList.length; i++) {
            if (bulletList[i].y <= 0 && bulletList[i].y <= canvas.height + 25) {
                bulletList.splice(i, 1);//총알이 맨 위쪽에 도달하면 사라짐
            }
        }
    }


}

function generateRandomValue(min,max){//적군 랜덤하게 생성
    const randomEnumy = Math.floor(Math.random()*(max-min+1))+min
    return randomEnumy
}

let enemyList = [] //적군을 저장하는 리스트 [x,y,init]
function Enemy(){
    this.x = 0; //this는 Enemy 자신의미
    this.y = 0;
    this.init=function(){
        this.x = generateRandomValue(0,canvas.width-80);
        this.y = 0;

        enemyList.push(this)//에너미를 리스트에 집어 넣느다
    };
    this.update = function(){
        this.y += 2;
        if(this.y >= canvas.height - 80){
            gameOver = true;
            
        }

    }

}

let bossEnemyList = [] //보스 적군을 저장하는 리스트 [x,y,init]
function BossEnemy(){
    this.x = 0; //this는 Enemy 자신의미
    this.y = 0;
    this.init=function(){
        this.x = generateRandomValue(0,canvas.width-80);
        this.y = 0;

        bossEnemyList.push(this)//에너미를 리스트에 집어 넣느다
    };
    this.update = function(){
        this.y += 2;
        if(this.y >= canvas.height - 120){
            gameOver = true;
            
        }

    }

}

/**let explosionList = []
function explosion(){
    this.x = 0;
    this.y = 0;
    this.init=function(){
        for(let i = 0 ; i <enemyList.length; i++ ){
        this.x= enemyList[i].x;
        this.y= enemyList[i].y;}
        explosionList.push(this)
    }
       console.log(explosionList)         
        } */




//처음 이미지를 로드 해주는 함수
function loadImge(){
    backgroundImage = new Image();
    backgroundImage.src = "space.jpg";

    spaceshipImage = new Image();
    spaceshipImage.src = "spaceship.png";

    bulletImage = new Image();
    bulletImage.src = "bullet25.png";

    gameoverImage = new Image();
    gameoverImage.src = "gameover.jpg";
    
    monsterImage = new Image();
    monsterImage.src = "monster.png";
    
    explosionImage = new Image();
    explosionImage.src = "explosion.png"; 
    
    bossmonsterImage = new Image();
    bossmonsterImage.src = "bossmonster.png";
}

let keysDown = {};//방향키 담아두는 곳
//방향키 설정 함수
function setupkeyboardListener(){
    document.addEventListener("keydown",function(event){
       
        keysDown[event.keyCode] = true 
        
    })
    document.addEventListener("keyup",function(event){
        delete keysDown[event.keyCode]

        if(event.keyCode == 32){         
            creatBullet()//총알 생성

        }
    })
}

//총알 생성하는 함수
function creatBullet(){
   
    let bul = new Bullet();//총알 하나 생성(new생성자로 공장에서 물건 찍어내듯이 생성가능)
    bul.init();//총알 좌표 셋팅
   
}

//적군생성
function creatEnemy(){
       const interval = setInterval(function(){
        let enemy = new Enemy();//적군 생성(new생성자로 공장에서 물건 찍어내듯이 생성가능)
         enemy.init(); //적군 좌표 셋팅

    },500)//setInterval(호출하고 싶은 함수,시간)  내가  원하는 시간 내가 원한는 함수 호출

   
}
function creatBossEnemy(){
    const interval = setInterval(function(){
     let bossenemy = new BossEnemy();//적군 생성(new생성자로 공장에서 물건 찍어내듯이 생성가능)
      bossenemy.init(); //적군 좌표 셋팅

 },5000)//setInterval(호출하고 싶은 함수,시간)  내가  원하는 시간 내가 원한는 함수 호출


}

/**function creatExplosion(){
    let exp = new explosion();
    exp.init();

    
}*/


//방향키의 좌표의 값 증가 감소 시킴, 우주선이 캔버스 밖으로 못나가게 함,
//살아있는 총알만 계속 나가게 함
function update(){
    if( 39 in keysDown){
        spaceshipX += 5;
    }
    if( 37 in keysDown){
        spaceshipX -= 5;
 
   }
    if( 38 in keysDown){
        spaceshipY -= 5;
  
    }if( 40 in keysDown){
        spaceshipY += 5;
 
    }
   
    if(spaceshipX <= 0){
        spaceshipX = 0
    }
    if(spaceshipX >= canvas.width-64){
        spaceshipX = canvas.width-64;
    }//우주선의 좌표값이 무한대로 업데이트 되는게 아닌, 경기장 안에서만 있게 하기
    
    if(spaceshipY <= 0){
        spaceshipY = 0
    }
    if(spaceshipY >= canvas.height){
        spaceshipY = canvas. height-64;
    }
    
    
    for (let i = 0; i < bulletList.length; i++) {
        if (bulletList[i].alive) {
            bulletList[i].update();//총알의 y좌표 업데이트 하는 함수 호출(총알이 계속 나가게 한다.총알 y좌표를 -7씩하게 한다.)
            bulletList[i].checkHit();//총알이 적군에게 맞았는지 체크
            bulletList[i].checkUpline();//총알이 맨 위쪽에 도달하면 사라짐
        } 
    }
    for(let i=0; i <  enemyList.length ; i++){
        enemyList[i].update();

    }
    for(let i=0; i < bossEnemyList.length ; i++){
        bossEnemyList[i].update();

    }

}

//이미지 생성하는 함수
function render() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
    ctx.fillText("Score: " + score, 20, 30)
    ctx.fillStyle = "white";
    ctx.font = '25px serif';
   
    

    for (let i = 0; i < bulletList.length; i++) {
        if (bulletList[i].alive) {
            ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
        } /**for (let z = 0; z < explosionList.length; z++) {
            if (!bulletList[z].alive) {
                ctx.drawImage(explosionImage,  bulletList[z].x, bulletList[z].y);
            }
        }*/

    }

    for (let i = 0; i < enemyList.length; i++) {
        ctx.drawImage(monsterImage, enemyList[i].x, enemyList[i].y);
    
    }
    for (let i = 0; i <bossEnemyList.length; i++) {
        ctx.drawImage(bossmonsterImage, bossEnemyList[i].x, bossEnemyList[i].y);
    
    }
    
}




//렌더를 불러주는 함수
function main(){
    if(!gameOver){//만약 게임오버가 트루면 계속진행, 아니면 게임종료
    update()  //좌표값을 업데이트하고
    render() //그려주고
    requestAnimationFrame(main)//계속 메인을 불러서 화면에 나오게 한다.
    }else{
        ctx.drawImage(gameoverImage,10,150,380,380)
    } 

}

loadImge();
setupkeyboardListener();
creatEnemy();
creatBossEnemy();
main();


//방향킬를 누르면
//우주선의 xy좌표가 바뀌고
//다시 render 그려준다

//총알만들기
//1. 스페이스바를 누르면 총알 발사
//2. 총알이 발사 = 총알의 y값이 줄어든다(--) , 총알의 x값은? 스페이스를 누른 순간의 우주선의 x좌표 y좌표
//3. 발사된 총알들은 총알 배열에 저장을 한다.
//4. 총알들은 x,y좌표값이 있어야 한다.
//5. 총알 배열을 가지고 render 그려준다
//추가 - 총알이 맨 위쪽에 닿으면 사라지게 만들기(보이지 않는 생성될 적군이 남아있는 총알로 인해 사라지는 문제 해결)



//적군만들기
//적군을 만든다 x,y,init, update
//적군은 위치가 랜덤하다
//적군은 밑으로 내려온다
//1초(원하는 만큼 설정가능)마다 하나씩 적군이 나온다
// 적군의 우주선이 바닥에 닿으면 게임 오바
// 적군과 총알이 만나면 우주선이 사라진다 , 1점씩 올라간다


//적군이 죽는다
//총알.y <= 적군.y And 
//총알.x >= 적군.x and 총알.x <= 적군.x + 적군의 넓이
//-> 닿았다.
//->총알이 죽게됨 적군의 우주선이 없어짐, 점수 획득

