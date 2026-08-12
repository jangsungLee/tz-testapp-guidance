---
sidebar_position: 2
title: HexString과 Byte Array
---

# HexString과 Byte Array

binary 출력은 JavaScript에서 byte Array처럼 사용할 수 있습니다.

```yaml
EXPECT:
  - key_buf: "${{ actual => actual.length === 32 }}"
```

## 주요 형태

| 표현 | 의미 |
| --- | --- |
| `actual.length` | byte 길이 |
| `actual[index]` | 지정 위치의 byte |
| `actual.hex` | `0x` prefix를 포함한 lowercase hex 문자열 |
| `actual.value` | 전체 byte 값을 나타내는 unsigned BigInt |
| `String(actual)` | canonical hex 문자열 |

```yaml
EXPECT:
  - key_buf: |
      ${{
        actual => actual.length === 32
          && actual[0] !== 0
          && /^0x[0-9a-f]{64}$/.test(actual.hex)
      }}
```

큰 binary 값을 숫자로 연산할 때는 정밀도 손실을 피하기 위해 `actual.value`와 BigInt
literal을 사용합니다.

```yaml
EXPECT:
  - key_buf: "${{ actual => actual.value !== 0n }}"
```

Number와 BigInt는 직접 섞어서 연산할 수 없습니다. BigInt 조건에는 `1n`, `256n`처럼
`n` suffix를 사용하세요.
