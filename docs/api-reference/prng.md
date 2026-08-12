---
sidebar_position: 4
title: PRNG
---

# PRNG

난수 byte 배열 생성 동작을 설명합니다.

각 Test Case는 ACTION 하나만 포함합니다. 값을 채울 때 각 필드 오른쪽의 `required`, `type`, 길이와 범위 메타데이터를 함께 확인하세요.

`HexArray`는 프로젝트 커스텀 입력 형식입니다. 표기와 변환 규칙은 [PARAMS의 HexArray 입력](../yaml/params.md#hexarray-입력)을 확인하세요.

## am_prng_getdata(…)

<div className="api-action"><span>YAML ACTION</span><code>PRNG_GETDATA</code></div>

```yaml
- TC_ID: TC_PRNG_GETDATA_TEMPLATE
  Title: Generate Random Data
  ACTS:
    - ACTION: PRNG_GETDATA
      PARAMS:
        buf: [] # required: false, type: HexArray, element_type: UnsignedByte, encoding: Hexadecimal, nullable: true, default: [], max_length: 512, unit: byte, capacity_param: buf_size, description: Output buffer
        buf_size: 0 # required: true, type: Integer, default: 0, minimum: 0, maximum: 512, unit: byte
      EXPECT:
        - ret_code: 0 # required: false, type: Integer, comparison: Equal
        - buf: [] # required: false, type: HexArray, element_type: UnsignedByte, encoding: Hexadecimal, comparison: EqualOrCondition, actual_type: HexArray
      ARTIFACTS:
        ret_code: "" # required: false, type: String, source_type: Integer, usage: "{{ out.<alias> }}"
        buf: "" # required: false, type: String, source_type: HexArray, usage: "{{ out.<alias> }}"
```
