---
sidebar_position: 2
title: 표현식 평가 오류
---

# 표현식 평가 오류

## callable이 아님

`${{ }}` 안에는 실제 값을 인자로 받는 callable이 필요합니다.

```yaml
# 잘못된 예
- key_buf: "${{ actual.length === 32 }}"

# 올바른 예
- key_buf: "${{ actual => actual.length === 32 }}"
```

## boolean을 반환하지 않음

조건 표현식은 반드시 `true` 또는 `false`를 반환해야 합니다.

## Number와 BigInt 혼합

`actual.value`는 BigInt입니다. 산술 및 비교 상수에도 `n` suffix를 사용하세요.

```yaml
- key_buf: "${{ actual => actual.value > 0n }}"
```

## 실행 제한 초과

무한 loop, 과도한 memory 사용, 지나치게 많은 console 출력은 제한됩니다. 조건을 작고
결정적인 검증으로 나누세요.
