---
sidebar_position: 1
title: EXPECT 개요
---

# EXPECT 개요

`EXPECT`는 하나의 ACTION이 생성한 출력값을 검증합니다. 각 항목은 출력 Key와 기대값의
map으로 작성합니다.

```yaml
EXPECT:
  - ret_code: 0
  - key_buf: "${{ actual => actual.length === 32 }}"
```

위 예제는 다음 두 결과를 검증합니다.

- `ret_code`는 정확히 `0`이어야 합니다.
- `key_buf`는 정확한 값과 관계없이 32 byte여야 합니다.

handler가 실제로 생성하지 않은 출력 Key를 작성하면 `ACTUAL_VAL`이 `<NOT_OUTPUT>`으로
표시되고 검증은 실패합니다. `EXPECT`에 작성하지 않은 실제 출력은 정보 항목으로
Result Table에 표시될 수 있습니다.
