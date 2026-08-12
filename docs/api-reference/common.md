---
sidebar_position: 1
title: Common
---

# Common

TEE 버전 등 공통 동작의 입력과 출력 형식을 설명합니다.

각 Test Case는 ACTION 하나만 포함합니다. 필드별 타입, 필수 여부와 길이 제한은 오른쪽 주석을 확인하세요. Byte Array 작성법과 출력 참조는 [Custom 기능](../custom/)을 참고하세요.

## `COMMON_OP_GET_VERSION`

사용 API: `am_tee_get_version()`

```yaml
- TC_ID: TC_COMMON_OP_GET_VERSION_TEMPLATE
  Title: Get TEE Version Information
  ACTS:
    - ACTION: COMMON_OP_GET_VERSION
      PARAMS:
        ver_buf: "" # required: false, type: String, nullable: true, default: "", max_length: 9, unit: byte, capacity_param: ver_len, description: Output buffer
        ver_len: 9 # required: false, type: UnsignedInteger, default: 9, minimum: 0, maximum: 9, unit: byte
      EXPECT:
        - ret_code: 0 # required: false, type: Integer, comparison: Equal
        - ver_buf: "" # required: false, type: String, comparison: EqualOrCondition, actual_type: String
      ARTIFACTS:
        ret_code: "" # required: false, type: String, source_type: Integer, usage: "{{ out.<alias> }}"
        ver_buf: "" # required: false, type: String, source_type: String, usage: "{{ out.<alias> }}"
```
