---
sidebar_position: 4
title: EQUAL 우선순위
---

# EQUAL 우선순위

동일한 출력 Key에 정확한 값과 조건 표현식이 모두 있으면 EQUAL이 우선합니다. 조건
표현식은 평가하지 않습니다.

```yaml
EXPECT:
  - key_buf: "0x3e23770dd631e799"
  - key_buf: |
      ${{
        actual => {
          console.log("This expression is ignored");
          return false;
        }
      }}
```

작성 순서는 우선순위에 영향을 주지 않습니다. 조건 표현식을 먼저 작성하고 정확한 값을
나중에 작성해도 EQUAL이 선택됩니다.

프로그램은 무시된 조건 표현식을 warning으로 알립니다. 혼동을 줄이려면 최종 YAML에는
동일한 Key의 검증 방식을 하나만 남기는 것을 권장합니다.
