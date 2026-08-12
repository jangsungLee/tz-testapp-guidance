---
sidebar_position: 3
title: 배열 조건
---

# 배열 조건

byte buffer에서는 JavaScript의 기본 Array API를 사용할 수 있습니다.

## 일부 값 확인

```yaml
EXPECT:
  - key_buf: "${{ actual => actual.some(byte => byte !== 0) }}"
```

## 전체 값 확인

```yaml
EXPECT:
  - key_buf: |
      ${{
        actual => actual.every(
          byte => Number.isInteger(byte)
            && byte >= 0x00
            && byte <= 0xFF
        )
      }}
```

## 변환 결과 확인

```yaml
EXPECT:
  - key_buf: |
      ${{
        actual => {
          const mapped = actual.map(byte => byte + 1);
          return mapped.length === actual.length;
        }
      }}
```

`includes`, `some`, `every`, `map`, `reduce`, `slice` 등 QuickJS가 제공하는 기본 Array
기능을 사용할 수 있습니다. 외부 JavaScript 라이브러리는 지원하지 않습니다.
