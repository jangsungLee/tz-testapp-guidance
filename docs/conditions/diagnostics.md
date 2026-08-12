---
sidebar_position: 5
title: 조건식 진단 출력
---

# 조건식 진단 출력

조건식의 중간값을 확인해야 할 때 `console.log()`와 `console.error()`를 사용할 수
있습니다.

```yaml
EXPECT:
  - key_buf: |
      ${{
        actual => {
          console.log("Derived key:", actual.hex);
          console.error("Byte length:", actual.length);
          return actual.length === 32;
        }
      }}
```

- `console.log()`는 INFO로 출력됩니다.
- `console.error()`는 ERROR로 출력됩니다.
- 출력은 애플리케이션 logger를 통해 `[JS::console.log]` 또는
  `[JS::console.error]` prefix와 함께 기록됩니다.
- 일부 control character는 로그 구조를 훼손하지 않도록 escape됩니다.

`console.error()` 출력은 조건 평가 실패를 의미하지 않습니다. callable이 `true`를
반환하면 해당 EXPECT 결과는 `PASS`일 수 있습니다.

다음 console method는 이름은 인식하지만 동작은 구현하지 않습니다. 호출하면
`[JS::console.warn] console.<method>() is not implemented yet.` 형식의 warning을
출력하고 조건식 실행은 계속합니다.

- `assert`, `clear`, `count`, `countReset`, `debug`
- `dir`, `dirxml`, `group`, `groupCollapsed`, `groupEnd`
- `info`, `table`, `time`, `timeEnd`, `timeLog`, `timeStamp`
- `trace`, `warn`, `profile`, `profileEnd`

:::caution

key, MAC, payload 등 민감정보를 로그에 남기지 마세요. 진단이 끝나면 임시 console
출력을 제거하는 것을 권장합니다.

:::
