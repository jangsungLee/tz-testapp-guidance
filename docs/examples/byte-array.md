---
sidebar_position: 4
title: Byte Array 입력과 검증
---

# Byte Array 입력과 검증

Byte Array 입력은 **각 byte를 YAML 배열의 원소로 작성**합니다.

```yaml
- TC_ID: TC_AES_KEY_IMPORT_001
  Title: Import AES Key
  ACTS:
    - ACTION: AES_KEY_BIN_IMPORT
      PARAMS:
        key_index: 0
        key_bin: [0x01, 0x02, 0x03, 0x04]
        key_bin_len: 4
      EXPECT:
        - ret_code: 0
```

실행 결과로 생성된 Byte Array는 multiline 조건식으로 **길이와 내용을 검증**할 수 있습니다.

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
        mac: []
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

입력 규칙은 [Byte Array 표기](../custom/byte-array.md), 출력 타입은 [조건식의 actual 타입](../custom/result-types.md)을 확인합니다.
