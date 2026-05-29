# Google Sheets DB Setup

이 대시보드는 `qaEmployees`, `qaVacation_v2`, `qaLeave` 데이터를 Google Sheets에 JSON 문자열로 저장해 여러 PC가 같은 정보를 보도록 만들 수 있습니다.

## 1. Google Sheet 만들기

1. Google Drive에서 새 스프레드시트를 만듭니다.
2. 메뉴에서 `확장 프로그램` > `Apps Script`를 엽니다.
3. 이 저장소의 `google-apps-script.gs` 내용을 Apps Script 편집기에 붙여 넣습니다.
4. 저장합니다.

## 2. 웹 앱으로 배포

1. Apps Script 오른쪽 위 `배포` > `새 배포`를 선택합니다.
2. 유형은 `웹 앱`을 선택합니다.
3. 실행 사용자는 `나`를 선택합니다.
4. 액세스 권한은 `모든 사용자`를 선택합니다.
5. 배포 후 표시되는 `웹 앱 URL`을 복사합니다.

## 3. 대시보드에 URL 연결

`index.html`에서 아래 줄의 빈 문자열에 웹 앱 URL을 붙여 넣습니다.

```js
var SHEET_API_URL='';
```

예시:

```js
var SHEET_API_URL='https://script.google.com/macros/s/AKfycb.../exec';
```

저장 후 GitHub에 커밋/푸시하면 공개 페이지가 Google Sheets 데이터를 공용 DB처럼 사용합니다.

## 주의

이 방식은 웹 앱 URL을 아는 사용자가 데이터를 저장할 수 있는 구조입니다. 팀 내부 공유용으로는 간단하고 빠르지만, 엄격한 권한 관리가 필요하면 Google 로그인 인증이 있는 별도 백엔드로 바꾸는 편이 좋습니다.
