# shootingGameUpgrad
# 업그레이드 시킨 점
1. 발사된 미사일이 맨 위쪽에 도달하면 사라지게함
2. 우주선의 방향을 위 아래로 움직이게 함
3. 보스몬스터 추가
4. 우주선이 캔버스 아래 위 밖으로 나가지 못하게 함 
5. 배경화면이 움직이면서 우주선이 움직이는 느낌을 만듦

프로젝트 목표 
- 게임을 클론코딩하며 자바스크립트를 재미있게 배우고, 문제점이나 추가사항을 업데이트하여

 자바스크립트 실력 향상.

- 차후 다른 프로젝트에 적용 및 새로운 게임 만들기

- 자바스크립트를 사용하여, 슈팅게임을 만들어보고 자바스크립트에 대한 이해도 증가

- JavaScript를 사용함으로써 프론트 개발 능력 향상

- 캐릭터의 움직임, 적군 생성, 총알 생성등 게임의 기본적인 내용 이해

![image](https://user-images.githubusercontent.com/108383150/195057228-9d581264-e0ba-49cc-95d7-11b1c1d54129.png)

•게임 화면
 -  게임 진행되는 화면

 -  상단에 점수 표시

 -  키 입력으로 캐릭터 이동 및 공격, 적군 몬스터는 자동으로 생성

 -  미사일이 적에게 닿으면 사라짐

• 클론 게임 문제점 
-  미사일이 생성 후 위쪽으로 이동 시 그대로 살아 있음으로, 게임이 원활히 진행이 안됨,느려지는 현상발생(서버부담)

• 클론 게임 업데이트  사항
 -  미사일이 맨위쪽 상단에 닿으면 사라지게 함으로써 미사일이 쌓이는걸 방지,게임이 느려지지 않게 함

 


변수 선언
![image](https://user-images.githubusercontent.com/108383150/195057860-933c65c2-3ebb-4956-a325-cc9b9f56dbf8.png)

• 캔버스 및 이미지를 그릴 변수 선언

• 스코어, 백그라운드 이미지, 우주선 이미지, 미사일 이미지, 게임오버 이미지등 사용할 이미지 변수 선언

• 우주선 좌표값으로 사용할 변수 선언

• 게임오버 화면에 사용할 변수 선언 및 값 입력



값 세팅
![image](https://user-images.githubusercontent.com/108383150/195058486-bc41e493-8ec1-4c3b-8550-795bbeb82e1f.png)

•  변수 canvas에  createElement() 속성을 이용하여 문서에 HTML 요소 "canvas"요소를 추가하는값 입력

•  변수 ctx 에 getContext를 이용하여 캔버스에 2d(2차원)그림을 그릴 수 있는 값 입력 

•  canvas 넓이 값 400, 높이 값 700px로 만듦

•  HTML body(부모노드)에 canvas(자식노드) 추가

•  내 캐릭터인 우주선 좌표값을 캔버스 맨아래 가운데 위치하도록 설정




미사일 좌표값 세팅 함수
![image](https://user-images.githubusercontent.com/108383150/195058765-897aab78-3e42-4266-8615-27e2ad6654a1.png)


•  Bullet 함수를 class함수 형식과 같게 만듦

•  미사일의 좌표값을 넣을 미사일 리스트를 bulletList설정

•  미사일의 좌표값(x,y)를 0으로 초기화한 후 this.init에서 처음 위치 설정, 위치는 우주선의 맨위의 가운데 위치 하게 함

    this.init에서 미사일의 좌표값 this.x this.y를 bulletList.push(this)로 bulletList에 넣음

• this.update 에서 미사일이 발사 될 때 this.y 좌표값에서 -10(위쪽으로) 움직이게 하는 함수 만듦

• this.checkHit에서 미사일이 적군몬스터에게 닿을 시 체크하게하는 함수 만듦.

  - 미사일의 y좌표(맨 위쪽)가 적군몬스터의 좌표 맨아래와 넓이 만큼에 닿을때  점수 10점씩 올라가고 

  - enemyList.splice로 적군몬스터를 적군리스트에서 미사일과 닿은 적군만 사라지게 함

  - this.init에서 미사일이 살아있는 미사일인지 죽은 미사일인지 판단하는 변수 this.alive를 만들어서

    적군몬스터와 닿은 미사일은 사라지게 하는 함수를 만들어 놓음

• this.checkUpline 에서 살아 있는 미사일이 캔버스이 맨 위쪽상단에 닿았을때 사라지게 하는 함수 만듦.(리스트에서 제거)

  - 미사일이 캔버스 맨 위쪽에 도달해도 리스트에서 사라지지 않아, 미사일 리스트에 계속 남아 있어서 게임이 느려짐.

  - 미사일이 리스트에서 제거 되게 함으로써 문제 해결



적군 생성,게임오버 생성
![image](https://user-images.githubusercontent.com/108383150/195059112-d99e4dff-95c8-4650-b654-c6dfd09aa514.png)

• generateRandomValue(min,max)에서 랜덤하게 적군을 생성하게 하는 함수 만듦

  - Math.floor(Math.random ...)로 적군몬스터를 맨 캔버스 맨 위쪽 상단에서 랜덤하게 생성

• Enemy 함수 에서 적군의 x,y값을 0으로 선언 및 값을 초기화 하고 this.init로 처음 위치를 

캔버스의 맨 위쪽 어디서든 생성되게 하는 함수 만듦

  - enumyList에서 적군몬스터 좌표값 넣음

• this.update 에서 적군몬스터가 생성될때  this.y 좌표값에서 +2만큼(아래쪽 으로) 움직이게 하는 함수 만듦

  - if문으로 적군 몬스터가 캔버스 맨 아래쪽에 닿았을 때 게임오버가 됨(gameOver = true)



이미지 생성 
![image](https://user-images.githubusercontent.com/108383150/195059625-9b156724-febc-46f4-b487-99ae9cda7b62.png)


• 백그라운드 이미지, 적군, 우주선 이미지 등을 생성하는 함수 

  - new Imge()로 각 이미지 객체가 생성되어 속성들을 추가할 수 있게함

  - 각 이미지(.jpg등)들을 이미지 태그 src 속성에 넣어줌   


방향키 생성
![image](https://user-images.githubusercontent.com/108383150/195059721-bf3516be-93c5-47f3-9588-15e0d9ebb31f.png)
• keysDown 에 방향키를 담아두는 리스트 만듦

•setupkeyboardListener에 방향키 함수 설정

  - addEventListener로 keydown 키를 눌렀을때 이벤트가 발생하게 함

  - keyup으로 방향키를 눌렀다 땔 때 눌렀던 방향키를 방향키 리스트에서 삭제 함

  - if문으로 스페이스바(32)키 눌렀을때  미사일 생성 


총알생성, 적군몬스터 생성
![image](https://user-images.githubusercontent.com/108383150/195059909-fa250c75-9651-4b19-b997-bc162dbe65a6.png)

 • creatBullet에서 new Bullet() 해줌으로써 총알을 생성(슈팅게임 클론코딩1의 Bullet함수)

  - bul.init()로 총알 좌표를 세팅

• creatEnemy에서  new Enemy()해줌으로써 적군을 생성(슈팅게임 클론코딩1의 Enemyt함수)

  - enemy.init()로 적군 좌표를 세팅

  - setInterval로 0.5초 마다 적군이 생성되게 함

움직임 처리
![image](https://user-images.githubusercontent.com/108383150/195060570-255a0a46-02e9-408d-bd9b-e659d96cf579.png)

• update에서 방향키 좌표값을 증가 감소, 우주선을 캔버스 밖으로 나가지 못하게 하거나, 살아있는  미사일만 나가게 하게함

   -  if( 39 in ..) keysDown에 39키가 입력되면(오른쪽 방향키를 누르면)  우주선의 x좌표를 5씩(오른쪽)으로 증가(움직임)

   -  if( 37 in ..) keysDown에 37키가 입력되면(왼쪽 방향키를 누르면)  우주선의 x좌표를 5씩(왼쪽)으로 감소(움직임)

   -  if( spaceshipX <= 0) 우주선 좌표가 캔버스의 맨 왼쪽 좌표와 만나면 더이상 우주선이 가지 못하게 함

   -  if( spaceshipY >= canvas.width-64) 우주선 좌표가 캔버스의 맨 오른쪽 좌표와 만나면 더이상 우주선이 가지 못하게 함

        - canvas.width-64에서 canvas.width는 캔버스의 넓이, 64는 우주선의 픽셀(캔버스의 넓이에서 우주선의 크기를 빼주

          캔버스와 우주선이 만나는 지점이 되고 우주선의 위치가 더이상 늘어날수 없게 됨. 가지못하게 됨)

   - for(... bulletList.length...) if 는 미사일(코드에서 총알)이 살아있는 미사일 일 때 미사일 좌표가 .update() 업데이트(미사

     일이 날아감) 되고, 

       - checkHit() 미사일이 적군몬스터에 맞았을때 체크 되고,(우주선 사라지고, 점수 올라감)

       - checkUpline() 미사일이 캔버스 맨 위쪽에 닿았을때 사라짐   

  - for(...enemyList...)  .update 반복해서 적군몬스터가 아래로 +2만큼 내려오고, 캔버스 마지막에 닿으면 게임오버 되게함


이미지 생성
![image](https://user-images.githubusercontent.com/108383150/195060871-5ddb2be7-3180-4fbb-a3a0-26e52bc7dd02.png)

• render()에서 각종 이미지를 생성하게 함

   - ctx.drawImage로 이미지들을 생성

   - ctx.fillText로 점수판 생성(.fillStyle 하얀색, .font 25px serif)

   - for(.. bulletList..) 미사일이 살아 있으면 미사일 이미지를 캔버스에 그려 줌

   - for(..enemyList..) 몬스터리스트의 길이 만큼(생성되는만큼) 이미지를 캔버스에 그려줌

메인 , 각 함수 사용 
![image](https://user-images.githubusercontent.com/108383150/195061202-7e086b9e-bdf0-401a-b79d-da1e566ccdb1.png)

• main에서 update(), render()를 하고, requestAnimationFrame(main)으로 계속해서 화면에 이미지들이 보이게 해서 움직이는 것처럼 보이게 함

  - if(!gameOver)는 게임오버가 아니면 즉, 적군몬스터가 캔버스 맨 아래에 닿지 않았을때는 계속 게임이 진행하게 함

  - else는 적군몬스터가 캔버스 맨 아래에 닿으면 게임오버 화면 보여줌

 

• loadImge()이미지를 불러오고, setupkeyboardListener()키보드를 작동하게하고, creatEnemy() 적군몬스터를 불러고오고

  main() 메인 함수를 불러오게 함 ->게임이 실제 진행 되게 함

 


 

