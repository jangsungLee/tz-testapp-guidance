---
sidebar_position: 5
title: AES
---

# AES

AES 키와 ECB, CBC, CTR 암·복호화 동작을 설명합니다.

각 Test Case는 ACTION 하나만 포함합니다. 필드별 타입, 필수 여부와 길이 제한은 오른쪽 주석을 확인하세요. Byte Array 작성법과 출력 참조는 [Custom 기능](../custom/)을 참고하세요.

## `AES256_KEY_GEN`

**사용 API:** `am_aes256_key_gen()`

```yaml
- TC_ID: TC_AES256_KEY_GEN_TEMPLATE
  Title: Generate AES-256 Key
  ACTS:
    - ACTION: AES256_KEY_GEN
      PARAMS:
        key_index: -1 # required: true, type: Integer, default: -1
      EXPECT:
        - ret_code: 0 # required: false, type: Integer, comparison: Equal
      ARTIFACTS:
        ret_code: "" # required: false, type: String, source_type: Integer, usage: "{{ out.<alias> }}"
```
## `AES256_KEY_IMPORT`

**사용 API:** `am_aes256_key_import()`

```yaml
- TC_ID: TC_AES256_KEY_IMPORT_TEMPLATE
  Title: Import AES-256 Key File
  ACTS:
    - ACTION: AES256_KEY_IMPORT
      PARAMS:
        key_index: -1 # required: true, type: Integer, default: -1
        key_path: "" # required: true, type: String, nullable: true, max_length: 4096, unit: byte
      EXPECT:
        - ret_code: 0 # required: false, type: Integer, comparison: Equal
      ARTIFACTS:
        ret_code: "" # required: false, type: String, source_type: Integer, usage: "{{ out.<alias> }}"
```

## `AES_KEY_BIN_IMPORT`

**사용 API:** `am_aes256_key_bin_import()`

```yaml
- TC_ID: TC_AES_KEY_BIN_IMPORT_TEMPLATE
  Title: Import AES Key Bytes
  ACTS:
    - ACTION: AES_KEY_BIN_IMPORT
      PARAMS:
        key_index: -1 # required: true, type: Integer, default: -1
        key_bin: [] # required: true, type: ByteArray, element_type: UnsignedByte, encoding: Hexadecimal, nullable: true, max_length: 32, unit: byte, length_param: key_bin_len
        key_bin_len: 0 # required: false, type: UnsignedInteger, default: 32, minimum: 0, maximum: 32, unit: byte, derived_from: key_bin, derive_when: omitted_and_source_defined, precedence: explicit
      EXPECT:
        - ret_code: 0 # required: false, type: Integer, comparison: Equal
      ARTIFACTS:
        ret_code: "" # required: false, type: String, source_type: Integer, usage: "{{ out.<alias> }}"
```

## `AES256_ECB_ENC`

**사용 API:** `am_aes256_ecb_enc()`

```yaml
- TC_ID: TC_AES256_ECB_ENC_TEMPLATE
  Title: Encrypt with AES-256 ECB
  ACTS:
    - ACTION: AES256_ECB_ENC
      PARAMS:
        key_index: -1 # required: true, type: Integer, default: -1
        plain: "" # required: true, type: String, nullable: true, max_length: 4000, unit: byte, length_param: plain_len
        plain_len: 0 # required: false, type: UnsignedInteger, default: 4000, minimum: 0, maximum: 4000, unit: byte, derived_from: plain, derive_when: omitted_and_source_defined, precedence: explicit
        cipher: [] # required: false, type: ByteArray, element_type: UnsignedByte, encoding: Hexadecimal, nullable: true, default: [], max_length: 4016, unit: byte, capacity_param: cipher_len, description: Output buffer
        cipher_len: 0 # required: false, type: UnsignedInteger, default: 4016, minimum: 0, maximum: 4016, unit: byte
        nopad_flag: 0 # required: false, type: Integer, default: 0
      EXPECT:
        - ret_code: 0 # required: false, type: Integer, comparison: Equal
        - cipher_len: 0 # required: false, type: UnsignedInteger, comparison: EqualOrCondition, actual_type: UnsignedInteger
        - cipher: [] # required: false, type: ByteArray, element_type: UnsignedByte, encoding: Hexadecimal, comparison: EqualOrCondition, actual_type: ByteArray
      ARTIFACTS:
        ret_code: "" # required: false, type: String, source_type: Integer, usage: "{{ out.<alias> }}"
        cipher_len: "" # required: false, type: String, source_type: UnsignedInteger, usage: "{{ out.<alias> }}"
        cipher: "" # required: false, type: String, source_type: ByteArray, usage: "{{ out.<alias> }}"
```

## `AES256_ECB_DEC`

**사용 API:** `am_aes256_ecb_dec()`

```yaml
- TC_ID: TC_AES256_ECB_DEC_TEMPLATE
  Title: Decrypt with AES-256 ECB
  ACTS:
    - ACTION: AES256_ECB_DEC
      PARAMS:
        key_index: -1 # required: true, type: Integer, default: -1
        cipher: [] # required: true, type: ByteArray, element_type: UnsignedByte, encoding: Hexadecimal, nullable: true, max_length: 4016, unit: byte, length_param: cipher_len
        cipher_len: 0 # required: false, type: UnsignedInteger, default: 4016, minimum: 0, maximum: 4016, unit: byte, derived_from: cipher, derive_when: omitted_and_source_defined, precedence: explicit
        plain: "" # required: false, type: String, nullable: true, default: "", max_length: 4000, unit: byte, capacity_param: plain_len, description: Output buffer
        plain_len: 0 # required: false, type: UnsignedInteger, default: 4000, minimum: 0, maximum: 4000, unit: byte
        nopad_flag: 0 # required: false, type: Integer, default: 0
      EXPECT:
        - ret_code: 0 # required: false, type: Integer, comparison: Equal
        - plain_len: 0 # required: false, type: UnsignedInteger, comparison: EqualOrCondition, actual_type: UnsignedInteger
        - plain: "" # required: false, type: String, comparison: EqualOrCondition, actual_type: String
      ARTIFACTS:
        ret_code: "" # required: false, type: String, source_type: Integer, usage: "{{ out.<alias> }}"
        plain_len: "" # required: false, type: String, source_type: UnsignedInteger, usage: "{{ out.<alias> }}"
        plain: "" # required: false, type: String, source_type: String, usage: "{{ out.<alias> }}"
```

## `AES256_CBC_ENC`

**사용 API:** `am_aes256_cbc_enc()`

```yaml
- TC_ID: TC_AES256_CBC_ENC_TEMPLATE
  Title: Encrypt with AES-256 CBC
  ACTS:
    - ACTION: AES256_CBC_ENC
      PARAMS:
        key_index: -1 # required: true, type: Integer, default: -1
        iv: [] # required: true, type: ByteArray, element_type: UnsignedByte, encoding: Hexadecimal, nullable: true, max_length: 16, unit: byte, length_param: iv_len
        iv_len: 0 # required: false, type: UnsignedInteger, default: 16, minimum: 0, maximum: 16, unit: byte, derived_from: iv, derive_when: omitted_and_source_defined, precedence: explicit
        plain: "" # required: true, type: String, nullable: true, max_length: 4000, unit: byte, length_param: plain_len
        plain_len: 0 # required: false, type: UnsignedInteger, default: 4000, minimum: 0, maximum: 4000, unit: byte, derived_from: plain, derive_when: omitted_and_source_defined, precedence: explicit
        cipher: [] # required: false, type: ByteArray, element_type: UnsignedByte, encoding: Hexadecimal, nullable: true, default: [], max_length: 4016, unit: byte, capacity_param: cipher_len, description: Output buffer
        cipher_len: 0 # required: false, type: UnsignedInteger, default: 4016, minimum: 0, maximum: 4016, unit: byte
        nopad_flag: 0 # required: false, type: Integer, default: 0
      EXPECT:
        - ret_code: 0 # required: false, type: Integer, comparison: Equal
        - cipher_len: 0 # required: false, type: UnsignedInteger, comparison: EqualOrCondition, actual_type: UnsignedInteger
        - cipher: [] # required: false, type: ByteArray, element_type: UnsignedByte, encoding: Hexadecimal, comparison: EqualOrCondition, actual_type: ByteArray
      ARTIFACTS:
        ret_code: "" # required: false, type: String, source_type: Integer, usage: "{{ out.<alias> }}"
        cipher_len: "" # required: false, type: String, source_type: UnsignedInteger, usage: "{{ out.<alias> }}"
        cipher: "" # required: false, type: String, source_type: ByteArray, usage: "{{ out.<alias> }}"
```

## `AES_CBC_ENC_WITH_KEY_PERF`

**사용 API:** `am_aes256_cbc_enc_with_key_perf()`

```yaml
- TC_ID: TC_AES_CBC_ENC_WITH_KEY_PERF_TEMPLATE
  Title: Encrypt with AES CBC Direct Key
  ACTS:
    - ACTION: AES_CBC_ENC_WITH_KEY_PERF
      PARAMS:
        key: [] # required: true, type: ByteArray, element_type: UnsignedByte, encoding: Hexadecimal, nullable: true, max_length: 32, unit: byte, length_param: key_len
        key_len: 0 # required: false, type: UnsignedInteger, default: 32, minimum: 0, maximum: 32, unit: byte, derived_from: key, derive_when: omitted_and_source_defined, precedence: explicit
        iv: [] # required: true, type: ByteArray, element_type: UnsignedByte, encoding: Hexadecimal, nullable: true, max_length: 16, unit: byte, length_param: iv_len
        iv_len: 0 # required: false, type: UnsignedInteger, default: 16, minimum: 0, maximum: 16, unit: byte, derived_from: iv, derive_when: omitted_and_source_defined, precedence: explicit
        data: "" # required: true, type: String, nullable: true, max_length: 4000, unit: byte, length_param: data_len
        data_len: 0 # required: false, type: UnsignedInteger, default: 4000, minimum: 0, maximum: 4000, unit: byte, derived_from: data, derive_when: omitted_and_source_defined, precedence: explicit
        cipher: [] # required: false, type: ByteArray, element_type: UnsignedByte, encoding: Hexadecimal, nullable: true, default: [], max_length: 4016, unit: byte, capacity_param: cipher_len, description: Output buffer
        cipher_len: 0 # required: false, type: UnsignedInteger, default: 4016, minimum: 0, maximum: 4016, unit: byte
        nopad_flag: 0 # required: false, type: UnsignedInteger, default: 0, minimum: 0, maximum: 255
      EXPECT:
        - ret_code: 0 # required: false, type: Integer, comparison: Equal
        - cipher_len: 0 # required: false, type: UnsignedInteger, comparison: EqualOrCondition, actual_type: UnsignedInteger
        - cipher: [] # required: false, type: ByteArray, element_type: UnsignedByte, encoding: Hexadecimal, comparison: EqualOrCondition, actual_type: ByteArray
      ARTIFACTS:
        ret_code: "" # required: false, type: String, source_type: Integer, usage: "{{ out.<alias> }}"
        cipher_len: "" # required: false, type: String, source_type: UnsignedInteger, usage: "{{ out.<alias> }}"
        cipher: "" # required: false, type: String, source_type: ByteArray, usage: "{{ out.<alias> }}"
```

## `AES256_CBC_DEC`

**사용 API:** `am_aes256_cbc_dec()`

```yaml
- TC_ID: TC_AES256_CBC_DEC_TEMPLATE
  Title: Decrypt with AES-256 CBC
  ACTS:
    - ACTION: AES256_CBC_DEC
      PARAMS:
        key_index: -1 # required: true, type: Integer, default: -1
        iv: [] # required: true, type: ByteArray, element_type: UnsignedByte, encoding: Hexadecimal, nullable: true, max_length: 16, unit: byte, length_param: iv_len
        iv_len: 0 # required: false, type: UnsignedInteger, default: 16, minimum: 0, maximum: 16, unit: byte, derived_from: iv, derive_when: omitted_and_source_defined, precedence: explicit
        cipher: [] # required: true, type: ByteArray, element_type: UnsignedByte, encoding: Hexadecimal, nullable: true, max_length: 4016, unit: byte, length_param: cipher_len
        cipher_len: 0 # required: false, type: UnsignedInteger, default: 0, minimum: 0, maximum: 4016, unit: byte, derived_from: cipher, derive_when: omitted_and_source_defined, precedence: explicit
        plain: "" # required: false, type: String, nullable: true, default: "", max_length: 4000, unit: byte, capacity_param: plain_len, description: Output buffer
        plain_len: 0 # required: false, type: UnsignedInteger, default: 4000, minimum: 0, maximum: 4000, unit: byte
        nopad_flag: 0 # required: false, type: Integer, default: 0
      EXPECT:
        - ret_code: 0 # required: false, type: Integer, comparison: Equal
        - plain_len: 0 # required: false, type: UnsignedInteger, comparison: EqualOrCondition, actual_type: UnsignedInteger
        - plain: "" # required: false, type: String, comparison: EqualOrCondition, actual_type: String
      ARTIFACTS:
        ret_code: "" # required: false, type: String, source_type: Integer, usage: "{{ out.<alias> }}"
        plain_len: "" # required: false, type: String, source_type: UnsignedInteger, usage: "{{ out.<alias> }}"
        plain: "" # required: false, type: String, source_type: String, usage: "{{ out.<alias> }}"
```

## `AES256_CTR_ENC`

**사용 API:** `am_aes256_ctr_enc()`

```yaml
- TC_ID: TC_AES256_CTR_ENC_TEMPLATE
  Title: Encrypt with AES-256 CTR
  ACTS:
    - ACTION: AES256_CTR_ENC
      PARAMS:
        key_index: -1 # required: true, type: Integer, default: -1
        iv: [] # required: true, type: ByteArray, element_type: UnsignedByte, encoding: Hexadecimal, nullable: true, max_length: 16, unit: byte, length_param: iv_len
        iv_len: 0 # required: false, type: UnsignedInteger, default: 16, minimum: 0, maximum: 16, unit: byte, derived_from: iv, derive_when: omitted_and_source_defined, precedence: explicit
        plain: "" # required: true, type: String, nullable: true, max_length: 4000, unit: byte, length_param: plain_len
        plain_len: 0 # required: false, type: UnsignedInteger, default: 4000, minimum: 0, maximum: 4000, unit: byte, derived_from: plain, derive_when: omitted_and_source_defined, precedence: explicit
        cipher: [] # required: false, type: ByteArray, element_type: UnsignedByte, encoding: Hexadecimal, nullable: true, default: [], max_length: 4016, unit: byte, capacity_param: cipher_len, description: Output buffer
        cipher_len: 0 # required: false, type: UnsignedInteger, default: 4016, minimum: 0, maximum: 4016, unit: byte
      EXPECT:
        - ret_code: 0 # required: false, type: Integer, comparison: Equal
        - cipher_len: 0 # required: false, type: UnsignedInteger, comparison: EqualOrCondition, actual_type: UnsignedInteger
        - cipher: [] # required: false, type: ByteArray, element_type: UnsignedByte, encoding: Hexadecimal, comparison: EqualOrCondition, actual_type: ByteArray
      ARTIFACTS:
        ret_code: "" # required: false, type: String, source_type: Integer, usage: "{{ out.<alias> }}"
        cipher_len: "" # required: false, type: String, source_type: UnsignedInteger, usage: "{{ out.<alias> }}"
        cipher: "" # required: false, type: String, source_type: ByteArray, usage: "{{ out.<alias> }}"
```

## `AES256_CTR_DEC`

**사용 API:** `am_aes256_ctr_dec()`

```yaml
- TC_ID: TC_AES256_CTR_DEC_TEMPLATE
  Title: Decrypt with AES-256 CTR
  ACTS:
    - ACTION: AES256_CTR_DEC
      PARAMS:
        key_index: -1 # required: true, type: Integer, default: -1
        iv: [] # required: true, type: ByteArray, element_type: UnsignedByte, encoding: Hexadecimal, nullable: true, max_length: 16, unit: byte, length_param: iv_len
        iv_len: 0 # required: false, type: UnsignedInteger, default: 16, minimum: 0, maximum: 16, unit: byte, derived_from: iv, derive_when: omitted_and_source_defined, precedence: explicit
        cipher: [] # required: true, type: ByteArray, element_type: UnsignedByte, encoding: Hexadecimal, nullable: true, max_length: 4016, unit: byte, length_param: cipher_len
        cipher_len: 0 # required: false, type: UnsignedInteger, default: 0, minimum: 0, maximum: 4016, unit: byte, derived_from: cipher, derive_when: omitted_and_source_defined, precedence: explicit
        plain: "" # required: false, type: String, nullable: true, default: "", max_length: 4000, unit: byte, capacity_param: plain_len, description: Output buffer
        plain_len: 0 # required: false, type: UnsignedInteger, default: 4000, minimum: 0, maximum: 4000, unit: byte
      EXPECT:
        - ret_code: 0 # required: false, type: Integer, comparison: Equal
        - plain_len: 0 # required: false, type: UnsignedInteger, comparison: EqualOrCondition, actual_type: UnsignedInteger
        - plain: "" # required: false, type: String, comparison: EqualOrCondition, actual_type: String
      ARTIFACTS:
        ret_code: "" # required: false, type: String, source_type: Integer, usage: "{{ out.<alias> }}"
        plain_len: "" # required: false, type: String, source_type: UnsignedInteger, usage: "{{ out.<alias> }}"
        plain: "" # required: false, type: String, source_type: String, usage: "{{ out.<alias> }}"
```

## `AES256_KEY_CHECK_EXIST`

**사용 API:** `am_aes256_key_check_exist()`

```yaml
- TC_ID: TC_AES256_KEY_CHECK_EXIST_TEMPLATE
  Title: Check AES-256 Key Existence
  ACTS:
    - ACTION: AES256_KEY_CHECK_EXIST
      PARAMS:
        key_index: -1 # required: true, type: Integer, default: -1
      EXPECT:
        - ret_code: 0 # required: false, type: Integer, comparison: Equal
      ARTIFACTS:
        ret_code: "" # required: false, type: String, source_type: Integer, usage: "{{ out.<alias> }}"
```
