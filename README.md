## ❣ Biflix-movie-app TIL 🧐

### Netflix Clone with ReactJS

리액트로 넘어가기 전, 바닐라 JS(유튜브 클론)에서 interactive한
부분을 구현해 왔기 때문에, 리액트가 왜 이런 식으로 생겨먹었는지(?)
바로 느낄 수 있었다.

바닐라 JS와 html을 이용해 구현하려면,
document에서 오브젝트를 가져와 선언하고,
거기다 eventListener를 붙인 다음, 함수를 작성해야만 비로소 완성이고,
더하여 각 html element의 역할을 알기 위해선,
class와 id에 의존할 필요가 있었다.

그런데, ReactJS는 그런 일련의 과정을 간소화 시켰다.
별도의 과정 없이(document에서 가져오는 등) 컴포넌트에
eventListener또는 animation을 직접 갖다 붙인다.
게다가, (애초에 element를 처음 작성할 때,) 각각의 component에 이름을 지어
넣어주기 때문에, 한눈에 그 역할을 알아볼 수 있는 것은 물론, 코드를
더욱 직관적으로 짤 수 있게 되었다는 말이다.

---(ReactJS의 탄생에 감사를 느끼진 않는다. 왜냐하면 나는 아직
이것을 사용함에 있어 불편함을 다소 느끼고 있으니까)---
