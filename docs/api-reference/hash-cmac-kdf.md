---
sidebar_position: 6
title: Hash, CMAC, KDF
---

# Hash, CMAC, KDF

Hash, HMAC, CMAC, KDF 동작을 설명합니다.

각 Test Case는 ACTION 하나만 포함합니다. 필드별 타입, 필수 여부와 길이 제한은 오른쪽 주석을 확인하세요. Byte Array 작성법과 출력 참조는 [Custom 기능](../custom/)을 참고하세요.

## `HASH_SHA256`

사용 API: `am_hash_sha256()`

```yaml
- TC_ID: TC_HASH_SHA256_TEMPLATE
  Title: Calculate SHA-256 Digest
  ACTS:
    - ACTION: HASH_SHA256
      PARAMS:
        msg: "" # required: true, type: String, nullable: true, max_length: 4096, unit: byte, length_param: msg_len
        msg_len: 0 # required: false, type: UnsignedInteger, default: 4096, minimum: 0, maximum: 4096, unit: byte, derived_from: msg, derive_when: omitted_and_source_defined, precedence: explicit
        digest: [] # required: false, type: ByteArray, element_type: UnsignedByte, encoding: Hexadecimal, nullable: true, default: [], max_length: 32, unit: byte, capacity_param: digest_len, description: Output buffer
        digest_len: 0 # required: false, type: UnsignedInteger, default: 32, minimum: 0, maximum: 32, unit: byte
      EXPECT:
        - ret_code: 0 # required: false, type: Integer, comparison: Equal
        - digest_len: 0 # required: false, type: UnsignedInteger, comparison: EqualOrCondition, actual_type: UnsignedInteger
        - digest: [] # required: false, type: ByteArray, element_type: UnsignedByte, encoding: Hexadecimal, comparison: EqualOrCondition, actual_type: ByteArray
      ARTIFACTS:
        ret_code: "" # required: false, type: String, source_type: Integer, usage: "{{ out.<alias> }}"
        digest_len: "" # required: false, type: String, source_type: UnsignedInteger, usage: "{{ out.<alias> }}"
        digest: "" # required: false, type: String, source_type: ByteArray, usage: "{{ out.<alias> }}"
```
## `HMAC_AES256_SHA256`

사용 API: `am_hmac_aes256_sha256()`

```yaml
- TC_ID: TC_HMAC_AES256_SHA256_TEMPLATE
  Title: Calculate HMAC AES-256 SHA-256
  ACTS:
    - ACTION: HMAC_AES256_SHA256
      PARAMS:
        key_index: -1 # required: true, type: Integer, default: -1
        msg: "" # required: true, type: String, nullable: true, max_length: 4096, unit: byte, length_param: msg_len
        msg_len: 0 # required: false, type: UnsignedInteger, default: 4096, minimum: 0, maximum: 4096, unit: byte, derived_from: msg, derive_when: omitted_and_source_defined, precedence: explicit
        digest: [] # required: false, type: ByteArray, element_type: UnsignedByte, encoding: Hexadecimal, nullable: true, default: [], max_length: 32, unit: byte, capacity_param: digest_len, description: Output buffer
        digest_len: 0 # required: false, type: UnsignedInteger, default: 32, minimum: 0, maximum: 32, unit: byte
      EXPECT:
        - ret_code: 0 # required: false, type: Integer, comparison: Equal
        - digest_len: 0 # required: false, type: UnsignedInteger, comparison: EqualOrCondition, actual_type: UnsignedInteger
        - digest: [] # required: false, type: ByteArray, element_type: UnsignedByte, encoding: Hexadecimal, comparison: EqualOrCondition, actual_type: ByteArray
      ARTIFACTS:
        ret_code: "" # required: false, type: String, source_type: Integer, usage: "{{ out.<alias> }}"
        digest_len: "" # required: false, type: String, source_type: UnsignedInteger, usage: "{{ out.<alias> }}"
        digest: "" # required: false, type: String, source_type: ByteArray, usage: "{{ out.<alias> }}"
```

## `CMAC_AES128_SHA256`

사용 API: `am_cmac_aes128()`

```yaml
- TC_ID: TC_CMAC_AES128_SHA256_TEMPLATE
  Title: Calculate CMAC AES-128 SHA-256
  ACTS:
    - ACTION: CMAC_AES128_SHA256
      PARAMS:
        key: [] # required: true, type: ByteArray, element_type: UnsignedByte, encoding: Hexadecimal, nullable: true, max_length: 16, unit: byte, length_param: key_len
        key_len: 0 # required: false, type: UnsignedInteger, default: 16, minimum: 0, maximum: 16, unit: byte, derived_from: key, derive_when: omitted_and_source_defined, precedence: explicit
        msg: "" # required: true, type: String, nullable: true, max_length: 4096, unit: byte, length_param: msg_len
        msg_len: 0 # required: false, type: UnsignedInteger, default: 4096, minimum: 0, maximum: 4096, unit: byte, derived_from: msg, derive_when: omitted_and_source_defined, precedence: explicit
        digest: [] # required: false, type: ByteArray, element_type: UnsignedByte, encoding: Hexadecimal, nullable: true, default: [], max_length: 32, unit: byte, capacity_param: digest_len, description: Output buffer
        digest_len: 0 # required: false, type: UnsignedInteger, default: 32, minimum: 0, maximum: 32, unit: byte
      EXPECT:
        - ret_code: 0 # required: false, type: Integer, comparison: Equal
        - digest_len: 0 # required: false, type: UnsignedInteger, comparison: EqualOrCondition, actual_type: UnsignedInteger
        - digest: [] # required: false, type: ByteArray, element_type: UnsignedByte, encoding: Hexadecimal, comparison: EqualOrCondition, actual_type: ByteArray
      ARTIFACTS:
        ret_code: "" # required: false, type: String, source_type: Integer, usage: "{{ out.<alias> }}"
        digest_len: "" # required: false, type: String, source_type: UnsignedInteger, usage: "{{ out.<alias> }}"
        digest: "" # required: false, type: String, source_type: ByteArray, usage: "{{ out.<alias> }}"
```

## `CMAC_AES256_SHA256`

사용 API: `am_cmac_aes256_sha256()`

```yaml
- TC_ID: TC_CMAC_AES256_SHA256_TEMPLATE
  Title: Calculate CMAC AES-256 SHA-256
  ACTS:
    - ACTION: CMAC_AES256_SHA256
      PARAMS:
        key_index: -1 # required: true, type: Integer, default: -1
        msg: "" # required: true, type: String, nullable: true, max_length: 4096, unit: byte, length_param: msg_len
        msg_len: 0 # required: false, type: UnsignedInteger, default: 4096, minimum: 0, maximum: 4096, unit: byte, derived_from: msg, derive_when: omitted_and_source_defined, precedence: explicit
        digest: [] # required: false, type: ByteArray, element_type: UnsignedByte, encoding: Hexadecimal, nullable: true, default: [], max_length: 16, unit: byte, capacity_param: digest_len, description: Output buffer
        digest_len: 0 # required: false, type: UnsignedInteger, default: 16, minimum: 0, maximum: 16, unit: byte
      EXPECT:
        - ret_code: 0 # required: false, type: Integer, comparison: Equal
        - digest_len: 0 # required: false, type: UnsignedInteger, comparison: EqualOrCondition, actual_type: UnsignedInteger
        - digest: [] # required: false, type: ByteArray, element_type: UnsignedByte, encoding: Hexadecimal, comparison: EqualOrCondition, actual_type: ByteArray
      ARTIFACTS:
        ret_code: "" # required: false, type: String, source_type: Integer, usage: "{{ out.<alias> }}"
        digest_len: "" # required: false, type: String, source_type: UnsignedInteger, usage: "{{ out.<alias> }}"
        digest: "" # required: false, type: String, source_type: ByteArray, usage: "{{ out.<alias> }}"
```

## `KDF_GET_KEY`

사용 API: `am_kdf_get_key()`

```yaml
- TC_ID: TC_KDF_GET_KEY_TEMPLATE
  Title: Derive KDF Key
  ACTS:
    - ACTION: KDF_GET_KEY
      PARAMS:
        label: "" # required: true, type: String, nullable: true, max_length: 255, unit: byte, length_param: label_len
        label_len: 0 # required: false, type: UnsignedInteger, default: 255, minimum: 0, maximum: 255, unit: byte, derived_from: label, derive_when: omitted_and_source_defined, precedence: explicit
        context: "" # required: true, type: String, nullable: true, max_length: 255, unit: byte, length_param: context_len
        context_len: 0 # required: false, type: UnsignedInteger, default: 255, minimum: 0, maximum: 255, unit: byte, derived_from: context, derive_when: omitted_and_source_defined, precedence: explicit
        key_len: 0 # required: true, type: Enum, default: 0, unit: byte, allowed_values: [16, 32]
        key_buf: [] # required: false, type: ByteArray, element_type: UnsignedByte, encoding: Hexadecimal, nullable: true, default: [], max_length: 32, unit: byte, capacity_param: key_buf_size, description: Output buffer
        key_buf_size: 0 # required: false, type: UnsignedInteger, default: 32, minimum: 0, maximum: 32, unit: byte
        mac: [] # required: false, type: ByteArray, element_type: UnsignedByte, encoding: Hexadecimal, nullable: true, default: [], max_length: 64, unit: byte, length_param: mac_len
        mac_len: 0 # required: false, type: UnsignedInteger, default: 64, minimum: 0, maximum: 64, unit: byte, derived_from: mac, derive_when: omitted_and_source_defined, precedence: explicit
      EXPECT:
        - ret_code: 0 # required: false, type: Integer, comparison: Equal
        - key_buf: [] # required: false, type: ByteArray, element_type: UnsignedByte, encoding: Hexadecimal, comparison: EqualOrCondition, actual_type: ByteArray
      ARTIFACTS:
        ret_code: "" # required: false, type: String, source_type: Integer, usage: "{{ out.<alias> }}"
        key_buf: "" # required: false, type: String, source_type: ByteArray, usage: "{{ out.<alias> }}"
```
