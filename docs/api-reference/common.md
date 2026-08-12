---
sidebar_position: 1
title: Common
---

# Common

TEE 버전 등 공통 동작의 입력과 출력 형식을 설명합니다.

각 Test Case는 ACTION 하나만 포함합니다. 값을 채울 때 각 필드 오른쪽의 `required`, `type`, 길이와 범위 메타데이터를 함께 확인하세요.

`HexArray`는 프로젝트 커스텀 입력 형식입니다. 표기와 변환 규칙은 [PARAMS의 HexArray 입력](../yaml/params.md#hexarray-입력)을 확인하세요.

## am_tee_get_version(…)

<div className="api-action"><span>YAML ACTION</span><code>COMMON_OP_GET_VERSION</code></div>

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
