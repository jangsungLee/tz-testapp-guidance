---
sidebar_position: 4
title: 조건식의 actual 타입
---

# 조건식의 actual 타입

조건 표현식의 `actual`에는 EXPECT의 출력 Key에 대응하는 실제 값이 전달됩니다. 값의 형태는 handler가 기록한 출력 타입에 따라 달라집니다.

| 출력 종류 | actual 형태 | 예제 |
| --- | --- | --- |
| 정수 | JavaScript Number | `actual === 0` |
| 문자열 | JavaScript String | `actual.length > 0` |
| byte buffer | Byte Array 기능이 추가된 객체 | `actual.length === 32` |

## byte buffer actual 기능

| 표현 | 의미 |
| --- | --- |
| `actual.length` | byte 길이 |
| `actual[index]` | index 위치의 byte |
| `actual.hex` | 전체 byte 배열을 `0x` prefix가 포함된 lowercase hex 문자열로 표시 |
| `actual.value` | 전체 byte 배열을 unsigned BigInt 값으로 변환 |
| `String(actual)` | canonical hex 문자열 반환 |

```yaml
EXPECT:
  - key_buf: |
      ${{
        actual => actual.length === 32
          && actual[0] === 0x3E
          && actual.hex.startsWith("0x")
      }}
```

## byte array를 hex string으로 확인

```yaml
EXPECT:
  - key_buf: |
      ${{
        actual => actual.hex ===
          "0x3e23770dd631e799bc6b66dc1279aef7e475b8849380e55288a508bf87a89b57"
      }}
```

## BigInt 연산

```yaml
EXPECT:
  - key_buf: "${{ actual => actual.value !== 0n }}"
```

- `actual.hex`는 표시와 문자열 비교를 위한 값입니다.
- `actual.length`는 hex 문자열 문자 수가 아니라 실제 byte 수입니다.
- BigInt와 Number는 직접 섞어서 연산할 수 없습니다.
- BigInt literal에는 `1n`, `32n`, `256n`처럼 `n` suffix를 사용합니다.
- `actual.value + 1`은 잘못된 표현입니다.
- `actual.value + 1n`은 올바른 표현입니다.
