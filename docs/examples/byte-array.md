---
sidebar_position: 4
title: Byte Array 검증
---

# Byte Array 검증

```yaml
- TC_ID: TC_KDF_BYTES_001
  Title: Validate KDF Byte Array
  ACTS:
    - ACTION: KDF_GET_KEY
      PARAMS:
        label: TEST_LABEL
        label_len: 10
        context: TEST_CONTEXT
        context_len: 12
        key_len: 32
        mac: ""
        mac_len: 0
      EXPECT:
        - ret_code: 0
        - key_buf: |
            ${{
              actual => {
                const validBytes = actual.every(
                  byte => Number.isInteger(byte)
                    && byte >= 0x00
                    && byte <= 0xFF
                );
                return actual.length === 32
                  && validBytes
                  && actual.some(byte => byte !== 0);
              }
            }}
```

이 조건은 byte 길이, 각 byte 범위, 전체가 `0`이 아닌지를 함께 검사합니다.
