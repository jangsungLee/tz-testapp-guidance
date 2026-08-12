---
sidebar_position: 4
title: EXPECT
---

# EXPECT

`EXPECT`는 ACTION이 생성한 실제 출력과 기대 결과를 비교합니다. EXPECT는 출력 Key별 목록으로 작성합니다.

## 정확한 값 비교

```yaml
EXPECT:
  - ret_code: 0
```

## 여러 출력 비교

```yaml
EXPECT:
  - ret_code: 0
  - key_buf: [0x3E, 0x23, 0x77, 0x0D]
```

## 조건 기반 검증

```yaml
EXPECT:
  - key_buf: "${{ actual => actual.length === 32 }}"
```

- 일반 값은 실제 출력과 직접 비교합니다.
- `${{ ... }}`는 실제 출력값을 `actual`로 받아 조건을 평가합니다.
- 조건 표현식은 boolean을 반환해야 합니다.
- 상세 조건 문법은 [조건 기반 EXPECT](../custom/conditional-expect.md)를 확인합니다.
- 동일 출력에 일반 값과 조건이 함께 있으면 일반 값 비교가 우선합니다.
