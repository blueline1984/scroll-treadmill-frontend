# Scroll Treadmill
2D running game using Mouse Scroll
프로젝트 ‘Scroll Treadmill’은 JavaScript, React, Phaser3, socket io 기반 마우스 스크롤 게임입니다.

https://scroll-treadmill.netlify.app/


## 프로젝트 동기
지난 팀프로젝트를 진행하면서 다양한 이벤트를 사용하여 JavaScript DOM 조작을 하였습니다. 그 과정에서 **이벤트 실행시 발생되는 렌더링 문제**에 대해 생각해볼 수 있었습니다. 이것의 연장선으로 개인프로젝트를 준비하면서 **‘이벤트 발생과 최적화’ 라는 주제에 대해 흥미**가 생겼고 또한 **동시에 이벤트가 발생한다면 어떻게 최적화 할수 있을까** 라는 생각으로 기획하게 되었습니다.


## 프로젝트 설명
### 미리보기
https://user-images.githubusercontent.com/97525377/182591516-b5addf42-7bd0-4727-93f3-fb62d93f8949.mp4

### 싱글모드
1. 메인화면에는 게임모드(싱글, 멀티), 사운드 on/off, 색약 모드, 게임 정보 등을 선택 및 확인할 수 있습니다. 
<img width="2237" alt="스크린샷 2022-07-20 오후 9 53 58" src="https://user-images.githubusercontent.com/97525377/182591853-963514b9-212a-4b62-a429-108dafc7bbfd.png">
<br/>

2. 싱글모드에서는 캐릭터를 선택할 수 있고 캐릭터 선택시 게임 화면으로 이동합니다. 
<img width="2239" alt="스크린샷 2022-07-20 오후 9 54 55" src="https://user-images.githubusercontent.com/97525377/182592126-8d0b653c-57a7-4df7-960d-d9a487efb841.png">
<br/>

3. 카운트 다운과 함께 게임이 시작되며 마우스 스크롤을 통해 캐릭터의 속도를 조절할 수 있습니다. 
<img width="2240" alt="스크린샷 2022-07-25 오후 6 36 33" src="https://user-images.githubusercontent.com/97525377/182591847-b06a3741-d5b3-4224-8259-e847226fb0e1.png">
<br/>

4. 런닝머신 밑으로 캐릭터가 떨어지게 되면 게임이 종료됩니다.
<img width="2240" alt="스크린샷 2022-07-25 오후 6 36 19" src="https://user-images.githubusercontent.com/97525377/182592329-8c8691de-a756-46c0-9000-a881e9eb20f5.png">
<br/>

### 멀티모드
1. 멀티 모드에서는 여러 사람이 동시에 게임에 접속해 플레이할 수 있으며 3명의 플레이어가 준비상태가 되면 게임이 시작됩니다.
<img width="2240" alt="스크린샷 2022-07-25 오후 7 38 15" src="https://user-images.githubusercontent.com/97525377/182591840-ce30e771-12e3-41a7-b53a-cf1bb36a0d69.png">
<br/>

2. 카운트 다운과 함께 게임이 시작됩니다.
<img width="2240" alt="스크린샷 2022-07-25 오후 7 42 05" src="https://user-images.githubusercontent.com/97525377/182591834-d4977444-7a69-44f6-baf0-1f9f9663a023.png">
<br/>

3. 실시간으로 위치를 공유하여 멀티플레이 모드를 플레이할 수 있습니다.
<img width="2240" alt="스크린샷 2022-07-25 오후 7 42 05 (1)" src="https://user-images.githubusercontent.com/97525377/182591800-c140737a-3f7f-42da-b1eb-bef3a9c80664.png">

## 시작하기
1. 아래의 명령어로 프로젝트 설치 및 시작
```
npm install
npm start
```

2. 환경변수 파일(.env) 만든 후, 환경변수를 설정한다
```
REACT_APP_SERVER_URL=<YOUR_LOCAL_SERVER>
```

## 기술 스택
Frontend
- JavaScript, React, styled-component, Phaser3, Socket.IO.client

Backend
- Node.js, Express, socket.IO


## 시도해본 것
**SOLID 원칙 적용**

SOLID 원칙의 `단일 책임 원칙(Single Responsibility Principle), 개방 폐쇄 원칙(Open/Closed principle)` 을 적용해보았습니다. 
위 두가지 원칙을 React에 적용할 수 있을 것이라 판단하였고 간략히 모듈화와 재사용을 통해 해당 원칙을 적용해보고자 하였습니다. 

1. 단일 책임 원칙(SRP) → 모듈화
    - JSX 컴포넌트화
    
    ```jsx
    // 여러줄의 JSX 문법을 Header, Body component로 분리하여 WaitingPage.js 코드 작성
    
    <WaitingRoomPageContainer>
      <Header title="Waiting Room" />
      <WaitingRoomPageBody />
    </WaitingRoomPageContainer>
    
    // 위와 같은 방식으로 RoomListPage.js 코드 작성
    <RoomListPageContainer>
    	<Header title="Room List" />
    	<RoomListBody />
    </RoomListPageContainer>
    ```
    
    - Phaser3 공통 로직 함수화
    
    ```jsx
    //Phaser3 animation 로직 함수화하여 공통 적용
    
    const createAlienAnimations = (animations) => {
      animations.create({
        key: "alien-idle",
        frames: [
          {
            key: "alien",
            frame: 0,
          },
        ],
      });
    
      animations.create({
        key: "alien-walk",
        frames: animations.generateFrameNumbers("alien", {
          start: 0,
          end: 1,
        }),
        frameRate: 10,
        repeat: -1,
      });
    };
    ```
    

2. 개방 폐쇄 원칙(OCP) → 재사용
    
    ```jsx
    //Modal Portal 구현하여 ModeSelection.js, MainPage.js, 
    //MultiPlayPage.js, SinglePlayPage.js 에서 재사용
    
    function Modal({ message, backgroundColor, informationContent }) {
      return (
        <Portal>
          <ModalOverlay>
            <ModalBody style={{ backgroundColor: `${backgroundColor}` }}>
              <ModalContent>{message}</ModalContent>
              {informationContent}
            </ModalBody>
          </ModalOverlay>
        </Portal>
      );
    }
    ```

## 회고
### 🦋 느낀점

- **일일 계획 및 기술 검증 철저하게!** 

이번 프로젝트를 진행하면서 정해진 기간내에 프로젝트를 완성하는것을 가장 중요한 목표로 삼았습니다. 또한 사전에 프로젝트에 사용될 기술들에 대한 충분한 조사를 했다고 생각했지만 막상 구현 과정에서 놓친 부분들이 적지않았음을 알게되었습니다. 우선, 주어진 기한 내에 작업을 하는 것이 쉽지 않았고 이를 통해 하루 정해진 목표량을 끝내야 하는 것이 얼마나 중요한지, 사전 계획 단계에서 프로젝트 단계의 세분화 및 구체화의 정도 가 얼마나 중요한지 체감할 수 있었습니다.
<br/>
<br/>

- **코드의 재사용 및 유지보수 관점에서 충분히 생각해볼 것!** 

초기 코드 작성시, 유지보수 및 재사용 측면에서 코드를 작성하는 것에 대해 충분히 고려하지 못한것 같습니다. 코드를 다시 살펴보았을 때, 정리되지 않고 중복 작성한 몇몇 코드들이 보였습니다. 기한을 맞추기 위해 지금 바로 작동하는 코드 위주로 작성하였고 결국 나중에는 동일한 코드를 여러번 작성하는 상황도 마주하게되었습니다.  이런 과정에서 지금 작성하는 코드 한줄, 한글자가 얼마나 중요한지 코드 한줄 한줄에 대한 책임감에 대해 다시 생각해보게 되었습니다. 빠르게 프로젝트를 완성하기 위해 즉각적인 코드를 작성하였지만 결국 고민없이 작성한 코드는 나중에 더 많은 시간과 노력을 들여야한다는 것을 직접 느낄 수 있었습니다.
<br/>
<br/>

- **불확실한 상황, 객관적으로 바라볼 것!**

이번 개인프로젝트에서는 불확실한 상황(목표하는 바를 이루는 구체적인 방법에 대한 부재)을 연속적으로 마주한것 같습니다. 누군가의 도움없이 스스로 해내야하는 과정 이었기 때문에 이러한 상황에 대한 불안감이 더욱 크게 다가온것 같습니다. 하지만 프로젝트를 계속 진행하면서 이러한 상황들에 대처하는 마음가짐, 구체적 행동에 대해 조금씩 변화를 주었습니다. 초기에는 스트레스와 불안함으로 보냈다면 후반부로 갈수록 크게 동요하지않고 지금 상황을 객관적으로 냉철한 시각으로 보려고 노력하였습니다. 물론, 마주한 모든 어려움을들 명쾌하게 해결한 것은 아니지만 현재 내가 처한 어려움이 무엇이고 해결 방법은 무엇인지에 대한 답을 찾을 수 있었습니다.
<br/>
<br/>

- **정리하고 계획하는 습관 기를 것!**

이번 개인프로젝트의 과정에서 가장 중요하다고 생각한 부분은 기록하고 정리하는 것입니다. 어제의 내가 작성한 코드 또는 반영하고 싶은 아이디어, 학습자료 등에 대해 기록과 정리가 잘되어있으면 내일의 작업이 훨씬 효율적으로 완성도 있게 진행되었습니다. 반면 그 부분이 미흡한 경우에는 그 반대의 결과가 발생했습니다. 정리하고 기록하는 습관은 프로젝트의 방향과 완성도를 결정한다는 것을 느낄 수 있었습니다.
<br/>
<br/>

### 🦋 힘들었던 점
- **Phaser3(클래스 문법에 대한 이해)**

Phaser3  라이브러리에 대한 조사를 하게되면서 대부분의 코드가 클래스 문법을 기반하여 작성되었다는 것을 알게되었습니다. 평소에 클래스 문법을 직접 사용해보지 않아 프로젝트 초기 당시 많은 어색함을 느꼈습니다. 하지만 과정이 지나면서, 클래스 문법에 대한 전반적 이해, this의 쓰임새, 상속의 개념을 이해할 수 있었습니다. 또한 클래스 내 메소드를 정의하고 해당 메소드를 사용하면서 재사용 및 간결한 코드를 작성하는 간접적인 체험을 할 수 있었습니다.
<br/>
<br/>

- **소켓 통신 (멀티플레이 구현)**

멀티 플레이에서는 싱글 플레이와는 달리 상대 위치를 실시간으로 공유해야 했기에 소켓 통신의 과정에 대한 정확한 이해가 필요했습니다. 소켓 통신이 이루어지는 방법 뿐만 아니라 순서를 이해하는데 있어서 개발 초기에 어려움이 있었습니다. 이에 더해 소켓의 room 이라는 개념을 사용하게 되었는데 해당 room에 접속해있는 다른 플레이어에게 전달해주어야 할 데이터를 효과적으로 전달하는 것 또한 깊은 고민이 필요했습니다. 후반부로 갈수록 익숙해지면서 소켓 자체적으로 존재하는 id를 활용하여 필요한 정보를 사용 또는 조건문을 활용하여 비지니스 로직을 작성할 수 있었습니다. 또한 통신이 이루어지기 위해서는 서버단에서 emit을 해준다고해도 서버 입장에서는 어떤 프론트단과 통신해야하는지 알지못하므로 프론트단에서 먼저 서버단으로 통신에 대한 안내를 해주어야 한다는 점을 알게되었고 이 점을 활용하여 멀티플레이 모드를 도입할 수 있게 되었습니다.
<br/><br/>



