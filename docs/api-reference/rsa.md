---
sidebar_position: 3
title: RSA
---

# RSA

RSA 키와 서명, 검증, 암호화, 복호화 동작을 설명합니다.

각 Test Case는 ACTION 하나만 포함합니다. 값을 채울 때 각 필드 오른쪽의 `required`, `type`, 길이와 범위 메타데이터를 함께 확인하세요.

`HexArray`는 프로젝트 커스텀 입력 형식입니다. 표기와 변환 규칙은 [PARAMS의 HexArray 입력](../yaml/params.md#hexarray-입력)을 확인하세요.

## am_rsa_key_gen(…)

<div className="api-action"><span>YAML ACTION</span><code>RSA_KEY_GEN</code></div>

```yaml
- TC_ID: TC_RSA_KEY_GEN_TEMPLATE
  Title: Generate RSA Key Pair
  ACTS:
    - ACTION: RSA_KEY_GEN
      PARAMS:
        rsa_key_index: -1 # required: true, type: Integer, default: -1
        pub_exp: [] # required: true, type: HexArray, element_type: UnsignedByte, encoding: Hexadecimal, nullable: true, max_length: 10, unit: byte, length_param: pub_exp_len
        pub_exp_len: 0 # required: false, type: UnsignedInteger, default: 10, minimum: 0, maximum: 10, unit: byte, derived_from: pub_exp, derive_when: omitted_and_source_defined, precedence: explicit
      EXPECT:
        - ret_code: 0 # required: false, type: Integer, comparison: Equal
      ARTIFACTS:
        ret_code: "" # required: false, type: String, source_type: Integer, usage: "{{ out.<alias> }}"
```

## am_rsa_key_import(…)

<div className="api-action"><span>YAML ACTION</span><code>RSA_KEY_IMPORT</code></div>

```yaml
- TC_ID: TC_RSA_KEY_IMPORT_TEMPLATE
  Title: Import RSA Key
  ACTS:
    - ACTION: RSA_KEY_IMPORT
      PARAMS:
        key_index: -1 # required: true, type: Integer, default: -1
        key_path: "" # required: true, type: String, nullable: true, max_length: 4096, unit: byte
      EXPECT:
        - ret_code: 0 # required: false, type: Integer, comparison: Equal
      ARTIFACTS:
        ret_code: "" # required: false, type: String, source_type: Integer, usage: "{{ out.<alias> }}"
```

## am_rsa_key_sign(…)

<div className="api-action"><span>YAML ACTION</span><code>RSA_KEY_SIGN</code></div>

```yaml
- TC_ID: TC_RSA_KEY_SIGN_TEMPLATE
  Title: Sign with RSA Key
  ACTS:
    - ACTION: RSA_KEY_SIGN
      PARAMS:
        key_index: -1 # required: true, type: Integer, default: -1
        data: "" # required: true, type: String, nullable: true, max_length: 4000, unit: byte, length_param: data_len
        data_len: 0 # required: false, type: UnsignedInteger, default: 4000, minimum: 0, maximum: 4000, unit: byte, derived_from: data, derive_when: omitted_and_source_defined, precedence: explicit
        signature: [] # required: false, type: HexArray, element_type: UnsignedByte, encoding: Hexadecimal, nullable: true, default: [], max_length: 256, unit: byte, capacity_param: sig_len, description: Output buffer
        sig_len: 0 # required: false, type: UnsignedInteger, default: 256, minimum: 0, maximum: 256, unit: byte
      EXPECT:
        - ret_code: 0 # required: false, type: Integer, comparison: Equal
        - sig_len: 0 # required: false, type: UnsignedInteger, comparison: EqualOrCondition, actual_type: UnsignedInteger
        - signature: [] # required: false, type: HexArray, element_type: UnsignedByte, encoding: Hexadecimal, comparison: EqualOrCondition, actual_type: HexArray
      ARTIFACTS:
        ret_code: "" # required: false, type: String, source_type: Integer, usage: "{{ out.<alias> }}"
        sig_len: "" # required: false, type: String, source_type: UnsignedInteger, usage: "{{ out.<alias> }}"
        signature: "" # required: false, type: String, source_type: HexArray, usage: "{{ out.<alias> }}"
```

## am_rsa_key_verify(…)

<div className="api-action"><span>YAML ACTION</span><code>RSA_KEY_VERIFY</code></div>

```yaml
- TC_ID: TC_RSA_KEY_VERIFY_TEMPLATE
  Title: Verify RSA Signature
  ACTS:
    - ACTION: RSA_KEY_VERIFY
      PARAMS:
        key_index: -1 # required: true, type: Integer, default: -1
        hash: [] # required: true, type: HexArray, element_type: UnsignedByte, encoding: Hexadecimal, nullable: true, max_length: 32, unit: byte, length_param: hash_len
        hash_len: 0 # required: false, type: UnsignedInteger, default: 32, minimum: 0, maximum: 32, unit: byte, derived_from: hash, derive_when: omitted_and_source_defined, precedence: explicit
        signature: [] # required: true, type: HexArray, element_type: UnsignedByte, encoding: Hexadecimal, nullable: true, max_length: 256, unit: byte, length_param: sig_len
        sig_len: 0 # required: false, type: UnsignedInteger, default: 256, minimum: 0, maximum: 256, unit: byte, derived_from: signature, derive_when: omitted_and_source_defined, precedence: explicit
      EXPECT:
        - ret_code: 0 # required: false, type: Integer, comparison: Equal
      ARTIFACTS:
        ret_code: "" # required: false, type: String, source_type: Integer, usage: "{{ out.<alias> }}"
```

## am_rsa_key_enc(…)

<div className="api-action"><span>YAML ACTION</span><code>RSA_KEY_ENC</code></div>

```yaml
- TC_ID: TC_RSA_KEY_ENC_TEMPLATE
  Title: Encrypt with RSA Key
  ACTS:
    - ACTION: RSA_KEY_ENC
      PARAMS:
        key_index: -1 # required: true, type: Integer, default: -1
        msg: "" # required: true, type: String, nullable: true, max_length: 245, unit: byte, length_param: msg_len
        msg_len: 0 # required: false, type: UnsignedInteger, default: 245, minimum: 0, maximum: 245, unit: byte, derived_from: msg, derive_when: omitted_and_source_defined, precedence: explicit
        cipher: [] # required: false, type: HexArray, element_type: UnsignedByte, encoding: Hexadecimal, nullable: true, default: [], max_length: 256, unit: byte, capacity_param: cipherlen, description: Output buffer
        cipherlen: 0 # required: false, type: UnsignedInteger, default: 256, minimum: 0, maximum: 256, unit: byte
      EXPECT:
        - ret_code: 0 # required: false, type: Integer, comparison: Equal
        - cipherlen: 0 # required: false, type: UnsignedInteger, comparison: EqualOrCondition, actual_type: UnsignedInteger
        - cipher: [] # required: false, type: HexArray, element_type: UnsignedByte, encoding: Hexadecimal, comparison: EqualOrCondition, actual_type: HexArray
      ARTIFACTS:
        ret_code: "" # required: false, type: String, source_type: Integer, usage: "{{ out.<alias> }}"
        cipherlen: "" # required: false, type: String, source_type: UnsignedInteger, usage: "{{ out.<alias> }}"
        cipher: "" # required: false, type: String, source_type: HexArray, usage: "{{ out.<alias> }}"
```

## am_rsa_key_dec(…)

<div className="api-action"><span>YAML ACTION</span><code>RSA_KEY_DEC</code></div>

```yaml
- TC_ID: TC_RSA_KEY_DEC_TEMPLATE
  Title: Decrypt with RSA Key
  ACTS:
    - ACTION: RSA_KEY_DEC
      PARAMS:
        key_index: -1 # required: true, type: Integer, default: -1
        cipher: [] # required: true, type: HexArray, element_type: UnsignedByte, encoding: Hexadecimal, nullable: true, max_length: 256, unit: byte, length_param: cipherlen
        cipherlen: 0 # required: false, type: UnsignedInteger, default: 0, minimum: 0, maximum: 256, unit: byte, derived_from: cipher, derive_when: omitted_and_source_defined, precedence: explicit
        msg: "" # required: false, type: String, nullable: true, default: "", max_length: 256, unit: byte, capacity_param: msglen, description: Output buffer
        msglen: 0 # required: false, type: UnsignedInteger, default: 256, minimum: 0, maximum: 256, unit: byte
      EXPECT:
        - ret_code: 0 # required: false, type: Integer, comparison: Equal
        - msglen: 0 # required: false, type: UnsignedInteger, comparison: EqualOrCondition, actual_type: UnsignedInteger
        - msg: "" # required: false, type: String, comparison: EqualOrCondition, actual_type: String
      ARTIFACTS:
        ret_code: "" # required: false, type: String, source_type: Integer, usage: "{{ out.<alias> }}"
        msglen: "" # required: false, type: String, source_type: UnsignedInteger, usage: "{{ out.<alias> }}"
        msg: "" # required: false, type: String, source_type: String, usage: "{{ out.<alias> }}"
```

## am_rsa_pubkey_export(…)

<div className="api-action"><span>YAML ACTION</span><code>RSA_KEY_PUBKEY_EXPORT</code></div>

```yaml
- TC_ID: TC_RSA_KEY_PUBKEY_EXPORT_TEMPLATE
  Title: Export RSA Public Key
  ACTS:
    - ACTION: RSA_KEY_PUBKEY_EXPORT
      PARAMS:
        key_index: -1 # required: true, type: Integer, default: -1
        key_path: "" # required: true, type: String, nullable: true, max_length: 4096, unit: byte
      EXPECT:
        - ret_code: 0 # required: false, type: Integer, comparison: Equal
      ARTIFACTS:
        ret_code: "" # required: false, type: String, source_type: Integer, usage: "{{ out.<alias> }}"
```

## am_rsa_key_check_exist(…)

<div className="api-action"><span>YAML ACTION</span><code>RSA_KEY_CHECK_EXIST</code></div>

```yaml
- TC_ID: TC_RSA_KEY_CHECK_EXIST_TEMPLATE
  Title: Check RSA Key Existence
  ACTS:
    - ACTION: RSA_KEY_CHECK_EXIST
      PARAMS:
        key_index: -1 # required: true, type: Integer, default: -1
      EXPECT:
        - ret_code: 0 # required: false, type: Integer, comparison: Equal
      ARTIFACTS:
        ret_code: "" # required: false, type: String, source_type: Integer, usage: "{{ out.<alias> }}"
```
