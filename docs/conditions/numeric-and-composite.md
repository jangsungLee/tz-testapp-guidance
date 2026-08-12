---
sidebar_position: 4
title: 숫자와 복합 조건
---

# 숫자와 복합 조건

비교, 산술, bitwise 연산을 조합하여 값의 범위와 속성을 확인할 수 있습니다.

## 범위 검사

```yaml
EXPECT:
  - key_buf: |
      ${{
        actual => actual.value > 0n
          && actual.value <= ((1n << 256n) - 1n)
      }}
```

## 산술 검사

```yaml
EXPECT:
  - key_buf: |
      ${{
        actual => (actual.value + 1n) - 1n
          === actual.value
      }}
```

## Bitwise 검사

```yaml
EXPECT:
  - key_buf: |
      ${{
        actual => (actual.value & 0xFFn) !== 0n
      }}
```

여러 줄 조건은 block scalar `|`와 callable body를 사용합니다. 조건이 길어질수록 중간
값에 의미 있는 변수명을 붙이고 마지막에 boolean을 반환하는 편이 읽기 쉽습니다.
