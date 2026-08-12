---
sidebar_position: 1
title: 기본 구조
---

# YAML 기본 구조

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
        mac: []
        mac_len: 0
      EXPECT:
        - ret_code: 0
      ARTIFACTS:
        key_buf: derived_key
```

| Key | 설명 |
| --- | --- |
| `TC_ID` | Test Case를 구분하는 고유 식별자입니다. |
| `Title` | 실행 로그와 결과 표에 표시되는 Test Case 설명입니다. |
| `ACTS` | 순서대로 실행할 ACTION 목록입니다. |
| `ACTION` | 실행할 YAML handler와 실제 API 동작을 선택합니다. |
| `PARAMS` | ACTION에 전달할 입력값입니다. |
| `EXPECT` | ACTION의 실제 출력이 만족해야 하는 기대값 또는 조건입니다. |
| `ARTIFACTS` | ACTION 출력을 이후 ACTION에서 참조할 이름으로 저장합니다. |

`PARAMS`, `EXPECT`, `ARTIFACTS`의 필수 여부는 ACTION마다 다릅니다. 실제 Key와 제한은 [API 레퍼런스](../api-reference/)를 확인해야 합니다.
