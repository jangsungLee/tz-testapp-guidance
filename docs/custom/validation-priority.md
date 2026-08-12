---
sidebar_position: 6
title: EQUAL 우선순위
---

# EQUAL 우선순위

동일한 출력 Key에 일반 기대값과 조건 표현식이 함께 존재하면 **일반 값 비교인 EQUAL이 우선**합니다. 조건 표현식의 작성 순서와 관계없이 해당 Lambda는 평가하지 않습니다.

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

- **직접 비교:** `[0x3E, 0x23, 0x77, 0x0D]`와 실제 `key_buf`를 비교합니다.
- **조건식:** `${{ ... }}`는 실행하지 않습니다.
- **warning:** 프로그램은 조건 EXPECT가 무시되었다고 알립니다.
- **작성 순서:** YAML 순서를 반대로 해도 EQUAL이 우선합니다.

**최종 YAML에는 동일한 출력 Key의 검증 방식을 하나만 남기는 것을 권장합니다.**
