---
sidebar_position: 3
title: ACTION과 PARAMS
---

# ACTION과 PARAMS

`ACTION`은 **실행할 handler**를 선택하며, 각 ACTION은 **실제 TEE API 하나에 대응**합니다. `PARAMS`에는 해당 API에 전달할 입력을 작성합니다.

```yaml
ACTION: KDF_GET_KEY
PARAMS:
  label: TEST_LABEL
  label_len: 10
  context: TEST_CONTEXT
  context_len: 12
  key_len: 32
  mac: []
  mac_len: 0
```

- **필드 정의:** PARAM 이름, 타입, 필수 여부와 최대 길이는 ACTION마다 다릅니다.
- **길이 Key:** 별도로 존재하는 경우 Byte Array 또는 문자열의 실제 길이와 일치시킵니다.
- **생략과 기본값:** API 레퍼런스의 필드 주석을 확인합니다.
- **Byte Array 입력:** [Byte Array 표기](../custom/byte-array.md)를 확인합니다.
- **이전 출력 참조:** [출력값 저장과 참조](../custom/output-reference.md)를 확인합니다.
