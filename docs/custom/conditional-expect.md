---
sidebar_position: 3
title: 조건 기반 EXPECT
---

# 조건 기반 EXPECT

출력값이 실행할 때마다 달라져 정확한 값을 미리 작성할 수 없는 경우, **실제 출력이 만족해야 하는 조건**을 `${{ ... }}`로 작성할 수 있습니다.

다음과 같은 검증에 적합합니다.

- **값:** 생성된 key가 모두 0이 아닌지 확인
- **길이:** buffer 길이가 요청한 크기인지 확인
- **범위:** 반환값이 특정 범위인지 확인
- **내용:** Byte Array에 특정 byte가 존재하는지 확인
- **형식:** 출력 문자열 형식이 올바른지 확인

정확한 값 비교가 가능한 경우에는 값을 직접 작성합니다.

```yaml
EXPECT:
  - ret_code: 0
```

정확한 값을 알 수 없는 경우에는 조건을 작성합니다.

```yaml
EXPECT:
  - key_buf: "${{ actual => actual.value !== 0n }}"
```

## 길이 검증

```yaml
EXPECT:
  - key_buf: "${{ actual => actual.length === 32 }}"
```

## byte 내용 검증

```yaml
EXPECT:
  - key_buf: |
      ${{
        actual => actual.length === 32
          && actual.some(byte => byte !== 0)
      }}
```

## function expression

```yaml
EXPECT:
  - key_buf: |
      ${{
        function(actual) {
          return actual.length === 32;
        }
      }}
```

## 규칙

- **callable:** `${{ ... }}` 안의 값은 호출 가능한 JavaScript 함수여야 합니다.
- **함수 형식:** arrow function과 function expression을 지원합니다.
- **입력:** 실제 출력 하나를 `actual` 인자로 받습니다.
- **반환값:** synchronous boolean이어야 합니다.
- **Promise:** 지원하지 않습니다.
- **외부 모듈:** JavaScript library와 module은 지원하지 않습니다.
- **Array 기능:** `map`, `some`, `every`, `includes`, `reduce`, `slice` 등을 사용할 수 있습니다.
- **공백 처리:** YAML 파싱 단계에서 조건 표현식 양쪽 공백이 trim됩니다.
- **lazy evaluation:** 아직 TODO입니다.

이 기능의 목적은 JavaScript 실행 자체가 아니라 **정확한 값 비교만으로 표현할 수 없는 API 출력 조건을 검증**하는 것입니다.
