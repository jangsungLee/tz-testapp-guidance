---
sidebar_position: 2
title: Test Case와 ACTS
---

# Test Case와 ACTS

`TC_ID`와 `Title`은 Test Case 결과를 식별하는 데 사용됩니다. 한 Test Case의 `ACTS`
에는 여러 동작을 작성할 수 있으며 위에서 아래 순서로 실행됩니다.

```yaml
- TC_ID: TC_FILE_FLOW_001
  Title: Secure File Lifecycle
  ACTS:
    - ACTION: SECRET_FILE_OPEN
      # ...
    - ACTION: SECRET_FILE_WRITE
      # ...
    - ACTION: SECRET_FILE_CLOSE
      # ...
```

`ACTION`은 프로그램이 지원하는 handler 이름과 정확히 일치해야 합니다. 알 수 없는
동작이나 허용 범위를 벗어난 command는 해당 Test Case의 실행을 중단시킬 수 있습니다.

서로 독립적인 검증은 Test Case를 나누고, 이전 API 출력이 다음 API 입력에 필요한
경우에는 하나의 Test Case 안에 여러 ACT를 작성하는 편이 명확합니다.
