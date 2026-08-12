---
sidebar_position: 1
title: actual 값
---

# actual 값

조건 표현식의 callable은 handler가 생성한 실제 출력값을 `actual` 인자로 받습니다.

```yaml
EXPECT:
  - ret_code: "${{ actual => actual === 0 }}"
```

실제 타입은 출력의 의미를 유지합니다.

| 출력 종류 | 표현식에서의 형태 | 예시 |
| --- | --- | --- |
| 정수 | Number | `actual >= 0` |
| boolean | Boolean | `actual === true` |
| 문자열 | String | `actual.length > 0` |
| byte buffer | byte Array와 HexString 속성 | `actual.length === 32` |

조건식은 반드시 boolean을 반환해야 합니다. 값 자체, 문자열, 배열, Promise를 반환하면
평가 오류로 처리됩니다.
