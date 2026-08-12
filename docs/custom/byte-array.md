---
sidebar_position: 2
title: Byte Array 표기
---

# Byte Array 표기

일부 TEE API는 문자열이 아니라 byte buffer를 입력받습니다. am-tz-diag YAML에서는 byte 값을 배열로 작성하여 일반 문자열과 구분할 수 있습니다.

```yaml
PARAMS:
  key: [0xA3, 0xE0, 0x09, 0x77]
  key_len: 4
```

배열의 원소 하나가 실제 buffer의 byte 하나에 대응합니다.

```text
[0xA3, 0xE0, 0x09, 0x77]
   │     │     │     │
   A3    E0    09    77
```

## 빈 배열

```yaml
PARAMS:
  mac: []
  mac_len: 0
```

## String과 Byte Array

```yaml
PARAMS:
  label: TEST_LABEL                 # String
  key: [0x54, 0x45, 0x53, 0x54]    # Byte Array
```

## 규칙

- 각 원소는 byte 하나입니다.
- 각 값의 범위는 `0x00`부터 `0xFF`입니다.
- 원소 순서는 실제 buffer의 byte 순서로 유지됩니다.
- 빈 Byte Array는 `[]`입니다.
- 길이 필드가 있으면 배열 원소 개수를 byte 길이로 사용합니다.
- 필드별 최대 길이는 API 레퍼런스를 확인합니다.

:::important

`HexArray`라는 YAML 표준 타입은 없습니다. 내부 C++ 클래스나 변환 구현이 아니라, byte buffer를 YAML 배열로 구분하여 작성한다는 점이 핵심입니다. `"0x01A5FF"` 같은 따옴표 문자열은 권장 Byte Array 입력 형식이 아닙니다.

:::
