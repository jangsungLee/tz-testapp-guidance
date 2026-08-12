---
sidebar_position: 7
title: Result Table
---

# Result Table

실행이 끝나면 Test Case와 출력별 검증 결과가 표로 표시됩니다.

| 열 | 설명 |
| --- | --- |
| `TC_ID` | Test Case 식별자 |
| `Title` | Test Case 설명 |
| `ACTION` | 실행한 동작 |
| `OUTPUT_KEY` | handler 출력 Key |
| `ACTUAL_VAL` | 실제 출력값 |
| `EXPECT_VAL` | 정확한 기대값 또는 조건 표현식 |
| `RESULT` | `PASS`, `FAIL`, 정보 항목 `-` |

조건 표현식은 `${{ }}` wrapper와 multiline 들여쓰기를 제거한 한 줄 형태로 표시됩니다. 긴 값과 표현식은 터미널 폭에 맞춰 일부만 표시하며 원래 길이를 함께 표시할 수 있습니다.

```text
actual => actual.length === 32 | PASS
```

`EXPECT`가 없는 실제 출력은 `EXPECT_VAL`과 `RESULT`가 `-`로 표시됩니다. 이는 실패가 아니라 비교 조건이 없는 정보 항목입니다.
