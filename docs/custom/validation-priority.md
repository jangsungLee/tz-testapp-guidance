---
sidebar_position: 6
title: EQUAL 우선순위
---

# EQUAL 우선순위

동일한 출력 Key에 일반 기대값과 조건 표현식이 함께 존재하면 일반 값 비교인 EQUAL이 우선합니다. 조건 표현식의 작성 순서와 관계없이 해당 Lambda는 평가하지 않습니다.

```yaml
EXPECT:
  - key_buf: [0x3E, 0x23, 0x77, 0x0D]
  - key_buf: |
      ${{
        actual => {
          console.log("This expression is ignored");
          return false;
        }
      }}
```

- `[0x3E, 0x23, 0x77, 0x0D]`와 실제 `key_buf`를 직접 비교합니다.
- `${{ ... }}`는 실행하지 않습니다.
- 프로그램은 조건 EXPECT가 무시되었다는 warning을 출력합니다.
- YAML 작성 순서를 반대로 해도 EQUAL이 우선합니다.

최종 YAML에서는 동일한 출력 Key에 검증 방식 하나만 남겨 혼동을 피하는 것을 권장합니다.
