---
sidebar_position: 1
title: 기본 예제
---

# 기본 예제

KDF API를 실행하고 return code를 정확한 값으로 검증하는 예제입니다.

```yaml
- TC_ID: TC_KDF_EQUAL_001
  Title: Derive KDF Key
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
      ARTIFACTS:
        key_buf: derived_key
```

`key_buf`의 정확한 값은 검증하지 않지만 `ARTIFACTS` 이름을 지정했으므로 이후 동작에서
`{{ out.derived_key }}`로 참조할 수 있습니다.
