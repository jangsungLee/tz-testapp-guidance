---
sidebar_position: 1
title: 기본 구조
---

# YAML 기본 구조

최상위 노드는 Test Case 목록입니다. 각 Test Case는 식별자, 제목, 실행할 동작을
가집니다.

```yaml
- TC_ID: TC_KDF_001
  Title: Derive KDF Key
  ACTS:
    - ACTION: KDF_GET_KEY
      PARAMS:
        label: TEST_LABEL
        label_len: 10
        context: TEST_CONTEXT
        context_len: 12
        key_len: 32
        mac: ""
        mac_len: 0
      EXPECT:
        - ret_code: 0
      ARTIFACTS:
        key_buf: derived_key
```

| Key | 역할 |
| --- | --- |
| `TC_ID` | Test Case를 구분하는 식별자 |
| `Title` | 결과와 로그에 표시할 설명 |
| `ACTS` | 순서대로 실행할 동작 목록 |
| `ACTION` | 실행할 API handler 이름 |
| `PARAMS` | API 입력값 |
| `EXPECT` | 출력값의 예상 값 또는 조건 |
| `ARTIFACTS` | 이후 동작에서 재사용할 출력 이름 |

`PARAMS`, `EXPECT`, `ARTIFACTS`는 동작의 필요에 따라 생략될 수 있습니다. 생략
가능 여부와 실제 입력 Key는 각 API handler 정의를 따라야 합니다.
