---
sidebar_position: 3
title: 길이와 범위 검증
---

# 길이와 범위 검증

```yaml
- TC_ID: TC_KDF_LENGTH_001
  Title: Validate KDF Key Length and Range
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
        - key_buf: |
            ${{
              actual => actual.length === 32
                && actual.value > 0n
                && actual.value <= ((1n << 256n) - 1n)
            }}
```

**길이는 byte 단위**이고 전체 값의 범위는 **unsigned BigInt 기준**입니다.
