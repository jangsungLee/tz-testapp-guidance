---
sidebar_position: 5
title: 조건식의 console 출력
---

# 조건식의 console 출력

조건 표현식을 확인하거나 디버깅할 때 일부 console method를 사용할 수 있습니다. 출력에는 `[JS::console.<method>]` prefix가 붙어 일반 프로그램 로그와 구분됩니다.

지원 method는 다음과 같습니다.

- `console.log()`
- `console.error()`

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

```text
[INFO][am_tz_diag] [JS::console.log] Derived key: 0x3e23770d...
[ERROR][am_tz_diag][QuickJsLambdaEvaluator.cpp:...][logConsoleLine(...)] [JS::console.error] Byte length: 32
```

## 현재 미구현 method

- `assert`, `clear`, `count`, `countReset`, `debug`
- `dir`, `dirxml`, `group`, `groupCollapsed`, `groupEnd`
- `info`, `table`, `time`, `timeEnd`, `timeLog`, `timeStamp`
- `trace`, `warn`, `profile`, `profileEnd`

미구현 method 호출 시 조건식 전체를 중단하지 않고 warning을 출력합니다.

```yaml
EXPECT:
  - key_buf: |
      ${{
        actual => {
          console.warn("Length validation started");
          return actual.length === 32;
        }
      }}
```

```text
[WARN][am_tz_diag] [JS::console.warn] console.warn() is not implemented yet.
```

외부 library와 module은 지원하지 않습니다.
