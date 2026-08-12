---
sidebar_position: 7
title: EQUAL 우선순위
---

# EQUAL 우선순위

동일한 출력 Key에 일반 기대값과 조건 표현식이 함께 있으면 **EQUAL이 우선**합니다.

```yaml
- TC_ID: TC_KDF_EQUAL_PRIORITY_001
  Title: Prefer Equal Validation
  ACTS:
    - ACTION: KDF_GET_KEY
      PARAMS:
        label: TEST_LABEL
        label_len: 10
        context: TEST_CONTEXT
        context_len: 12
        key_len: 4
        mac: []
        mac_len: 0
      EXPECT:
        - ret_code: 0
        - key_buf: [0x3E, 0x23, 0x77, 0x0D]
        - key_buf: |
            ${{
              actual => {
                console.log("This expression is ignored");
                return false;
              }
            }}
```

**조건식은 실행되지 않으며 직접 비교 결과가 사용됩니다.** 자세한 내용은 [EQUAL 우선순위](../custom/validation-priority.md)를 확인합니다.
