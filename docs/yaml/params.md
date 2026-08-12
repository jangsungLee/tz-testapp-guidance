---
sidebar_position: 3
title: PARAMS
---

# PARAMS

`PARAMS`는 `ACTION`이 실행할 API의 입력값입니다. 숫자, 문자열, 빈 문자열, hex 문자열,
이전 출력 참조 등을 사용할 수 있습니다.

```yaml
PARAMS:
  label: TEST_LABEL
  label_len: 10
  key_len: 32
  mac: ""
  mac_len: 0
```

## Hex 입력

byte buffer 입력은 hex 문자열로 작성할 수 있습니다.

```yaml
PARAMS:
  key: "0xa3e00977389fc54f44e8dda5b678d7d3"
  key_len: 16
```

`0x` 또는 `0X` prefix를 사용할 수 있습니다. 길이 Key가 생략 가능한지는 handler마다
다르므로 API 정의를 확인해야 합니다.

## 이전 출력 참조

```yaml
PARAMS:
  fd: "{{ out.secure_file_fd }}"
```

참조 표현식은 전체 값으로 작성합니다. 일반 문자열과 섞어서 사용하지 않습니다.
