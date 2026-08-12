---
sidebar_position: 2
title: 0이 아닌 값 검증
---

# 0이 아닌 값 검증

파생 key의 정확한 값은 환경이나 구현에 따라 달라질 수 있습니다. 이 경우 **전체 값이
`0`이 아니라는 최소 유효성 조건**을 검사할 수 있습니다.

```yaml
- TC_ID: TC_KDF_NONZERO_001
  Title: Derive Non-zero KDF Key
  ACTS:
    - ACTION: KDF_GET_KEY
      PARAMS:
        label: TEST_LABEL
        label_len: 10
        context: TEST_CONTEXT
        context_len: 12
        key_len: 32
        mac: []
        mac_len: 0
      EXPECT:
        - ret_code: 0
        - key_buf: "${{ actual => actual.value !== 0n }}"
      ARTIFACTS:
        key_buf: derived_key
```

**byte 중 하나라도 `0`이 아니어야 한다**는 의미로 다음과 같이 작성할 수도 있습니다.

```yaml
EXPECT:
  - key_buf: "${{ actual => actual.some(byte => byte !== 0) }}"
```
