---
sidebar_position: 3
title: 조건 기반 검증
---

# 조건 기반 검증

정확한 출력값을 미리 알 수 없지만 반드시 만족해야 할 요구사항이 있다면 조건 표현식을
사용합니다.

```yaml
EXPECT:
  - key_buf: "${{ actual => actual.value !== 0n }}"
```

`${{`와 `}}` 사이에는 실제 출력값을 인자로 받는 callable을 작성합니다. 반환값은 반드시
boolean이어야 합니다.

## 적합한 사용 사례

- 생성된 key가 전체 `0`이 아닌지 검사
- file descriptor가 유효 범위인지 검사
- buffer 길이가 요청한 크기와 같은지 검사
- 모든 byte가 허용 범위인지 검사
- 출력 문자열이 필요한 형식을 만족하는지 검사
- 여러 조건을 `&&` 또는 `||`로 결합

```yaml
EXPECT:
  - key_buf: |
      ${{
        actual => {
          return actual.length === 32
            && actual.some(byte => byte !== 0);
        }
      }}
```

표현식의 바깥 공백은 YAML 처리 단계에서 정리됩니다. multiline 표현식은 실제 평가할
때 원래 구조를 유지하고, Result Table에서는 읽을 수 있도록 한 줄로 요약됩니다.

:::tip

정확한 값을 알고 있다면 조건식으로 `actual === value`를 다시 작성하지 말고 EQUAL을
사용하세요.

:::
