---
sidebar_position: 6
title: console 출력
---

# console 출력

조건 평가 중 실제 출력의 형태를 확인해야 할 때 **지원되는 console method**를 사용할 수 있습니다.

```yaml
- TC_ID: TC_KDF_CONSOLE_001
  Title: Inspect Derived Key
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
              actual => {
                console.log("Derived key:", actual.hex);
                console.error("Byte length:", actual.length);
                return actual.length === 32;
              }
            }}
```

지원 method와 출력 형식은 [조건식의 console 출력](../custom/console.md)을 확인합니다.
