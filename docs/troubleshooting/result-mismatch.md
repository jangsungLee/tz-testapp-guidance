---
sidebar_position: 3
title: 예상 결과 불일치
---

# 예상 결과 불일치

## `<NOT_OUTPUT>`

`EXPECT`의 Key가 handler 출력에 없다는 의미입니다. ACTION이 제공하는 출력 Key 이름을
확인하세요.

## Hex 길이 혼동

`0x` 문자열 길이는 byte 길이와 다릅니다. 조건 표현식에서 binary 출력의 byte 길이는
`actual.length`로 확인하세요.

```yaml
- key_buf: "${{ actual => actual.length === 32 }}"
```

## EQUAL과 조건식 중 예상과 다른 항목이 실행됨

동일한 출력 Key에 두 방식이 함께 있으면 EQUAL이 우선합니다. warning을 확인하고
불필요한 항목을 제거하세요.

## console ERROR가 있지만 결과는 PASS

`console.error()`는 진단 출력입니다. 조건 평가 결과와 독립적이므로 callable이 `true`를
반환하면 Result Table은 `PASS`일 수 있습니다.
