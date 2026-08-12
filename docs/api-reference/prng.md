---
sidebar_position: 4
title: PRNG
---

# PRNG

난수 byte 배열 생성 동작을 설명합니다.

각 Test Case는 ACTION 하나만 포함합니다. 필드별 타입, 필수 여부와 길이 제한은 오른쪽 주석을 확인하세요. Byte Array 작성법과 출력 참조는 [Custom 기능](../custom/)을 참고하세요.

## `PRNG_GETDATA`

사용 API: `am_prng_getdata()`

```yaml
- TC_ID: TC_PRNG_GETDATA_TEMPLATE
  Title: Generate Random Data
  ACTS:
    - ACTION: PRNG_GETDATA
      PARAMS:
        buf: [] # required: false, type: ByteArray, element_type: UnsignedByte, encoding: Hexadecimal, nullable: true, default: [], max_length: 512, unit: byte, capacity_param: buf_size, description: Output buffer
        buf_size: 0 # required: true, type: Integer, default: 0, minimum: 0, maximum: 512, unit: byte
      EXPECT:
        - ret_code: 0 # required: false, type: Integer, comparison: Equal
        - buf: [] # required: false, type: ByteArray, element_type: UnsignedByte, encoding: Hexadecimal, comparison: EqualOrCondition, actual_type: ByteArray
      ARTIFACTS:
        ret_code: "" # required: false, type: String, source_type: Integer, usage: "{{ out.<alias> }}"
        buf: "" # required: false, type: String, source_type: ByteArray, usage: "{{ out.<alias> }}"
```
