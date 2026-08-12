---
sidebar_position: 3
title: PARAMS
---

# PARAMS

`PARAMS`는 `ACTION`이 실행할 API의 입력값입니다. 숫자, 문자열, 빈 문자열, HexArray,
이전 출력 참조 등을 사용할 수 있습니다.

```yaml
PARAMS:
  label: TEST_LABEL
  label_len: 10
  key_len: 32
  mac: ""
  mac_len: 0
```

## HexArray 입력

byte buffer 입력은 byte 단위 YAML 배열로 작성합니다.

```yaml
PARAMS:
  key: [0xA3, 0xE0, 0x09, 0x77, 0x38, 0x9F, 0xC5, 0x4F, 0x44, 0xE8, 0xDD, 0xA5, 0xB6, 0x78, 0xD7, 0xD3]
  key_len: 16
```

각 원소는 `0x00`부터 `0xFF`까지의 unsigned byte입니다. 빈 byte array는 `[]`로
작성합니다. 길이 Key가 생략 가능한지는 ACTION마다 다르므로
[API 레퍼런스](../api-reference/)를 확인해야 합니다.

### 프로젝트 커스텀 기능

`HexArray`는 YAML 표준 타입의 이름이 아니라 am-tz-diag YAML 파서가 byte buffer를
명확하게 표현하기 위해 제공하는 커스텀 입력 형식입니다. YAML에는 배열로 작성하지만,
handler에 전달하기 전에 프로젝트의 `HexString` 값으로 변환됩니다. 따라서 따옴표로
감싼 일반 문자열과 구분되며 배열의 원소 하나가 실제 buffer의 byte 하나에 대응합니다.

다음 규칙을 적용합니다.

- 각 원소는 `0x00`부터 `0xFF`까지의 정수여야 합니다.
- 원소의 순서는 실제 byte buffer의 순서로 유지됩니다.
- `[]`는 길이가 0인 byte buffer입니다.
- `length_param`이 있는 ACTION에서는 배열의 byte 수와 길이 값이 일치해야 합니다.
- `max_length`를 초과하는 배열은 사용할 수 없습니다.
- `"0x01A5FF"`처럼 따옴표로 감싼 값은 `HexArray`가 아니라 일반 YAML 문자열입니다.

## 이전 출력 참조

```yaml
PARAMS:
  fd: "{{ out.secure_file_fd }}"
```

참조 표현식은 전체 값으로 작성합니다. 일반 문자열과 섞어서 사용하지 않습니다.
