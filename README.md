# AM TZ Diag YAML Manual

AM TZ Diag의 YAML 기반 API 테스트 구성과 결과 검증 방법을 정리한 Docusaurus 문서 사이트입니다.

## 요구 사항

- Node.js 20 이상
- npm

## 로컬 실행

```bash
npm ci
npm run start
```

기본 주소는 `http://localhost:3000`입니다.

## 검사와 빌드

```bash
npm run typecheck
npm run build
```

정적 결과는 `build/`에 생성됩니다. 프로덕션 결과를 로컬에서 확인하려면 다음 명령을 사용합니다.

```bash
npm run serve
```

## GitHub Pages 배포

`.github/workflows/deploy-pages.yml`이 `master` 또는 `main` 브랜치의 변경을 자동으로 빌드하고 배포합니다.

GitHub 저장소에서 다음 설정을 한 번 적용해야 합니다.

1. `Settings` → `Pages`로 이동합니다.
2. `Build and deployment`의 Source를 `GitHub Actions`로 선택합니다.
3. 기본 브랜치에 push합니다.
4. `Actions`에서 `Deploy Docusaurus to GitHub Pages` 실행 결과를 확인합니다.

기본 GitHub Pages 주소는 다음과 같습니다.

```text
https://<owner>.github.io/<repository>/
```

빌드 시 `GITHUB_REPOSITORY`로 `url`과 `baseUrl`을 자동 계산합니다. 저장소 이름이 `<owner>.github.io`인 사용자·조직 사이트는 `/`를 사용합니다.

커스텀 도메인은 빌드 환경 변수로 재정의할 수 있습니다.

```text
DOCUSAURUS_URL=https://docs.example.com
DOCUSAURUS_BASE_URL=/
```

> GitHub Pages 사이트는 저장소 공개 여부와 조직 요금제 설정에 따라 인터넷에 공개될 수 있습니다. 게시 전에 사내 기밀, 인증 정보, 고객 정보가 없는지 확인하세요.

## Confluence iframe

GitHub Pages 배포 주소를 Confluence에 붙여 넣고 임베드로 표시합니다. iFrame 매크로를 직접 설정할 수 있다면 전체화면 권한을 함께 허용합니다.

```html
<iframe
  src="https://<owner>.github.io/<repository>/"
  width="100%"
  height="800"
  allow="fullscreen"
  allowfullscreen>
</iframe>
```

시작 페이지의 상단 전체화면 버튼은 브라우저 Fullscreen API를 사용합니다. `allow="fullscreen"`은 Confluence가 생성하는 iframe에 지정되어야 하며, Docusaurus 사이트에서 이 권한을 강제로 추가하거나 우회할 수 없습니다.

- 우측 상단 버튼은 전체화면 상태에 따라 아이콘이 바뀌며, 같은 버튼으로 진입하고 종료합니다.
- `Esc` 키로도 종료할 수 있습니다.
- Confluence가 전체화면 권한을 차단하면 새 탭 링크를 표시합니다.
- Pages 배포가 끝나면 Actions 실행 요약에 Unix epoch가 붙은 Confluence 임베드 URL을 출력합니다. Confluence 캐시를 갱신할 때 이 URL로 교체합니다.

## 주요 명령

| 명령 | 설명 |
| --- | --- |
| `npm run start` | 개발 서버 실행 |
| `npm run debug` | Node Inspector와 개발 서버 실행 |
| `npm run typecheck` | TypeScript 검사 |
| `npm run build` | 일반 프로덕션 빌드 |
| `npm run build:pages` | GitHub Pages 빌드 |
| `npm run serve` | 빌드 결과 로컬 제공 |

## 디렉터리

```text
docs/                  Markdown 및 MDX 문서
src/                   테마와 공통 컴포넌트
static/                정적 파일
build/                 Docusaurus 빌드 결과
```
