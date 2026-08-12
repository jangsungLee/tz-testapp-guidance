---
sidebar_position: 2
title: 정확한 값 비교
---

# 정확한 값 비교

결과를 미리 알고 있다면 기대값을 직접 작성합니다.

```yaml
EXPECT:
  - ret_code: 0
  - ver_buf: L000T001
```

실제 값과 기대값이 같으면 `PASS`, 다르면 `FAIL`입니다.

## HexString 비교

byte buffer 출력은 byte 단위로 비교합니다. prefix와 영문 대소문자가 달라도 byte 값이
같으면 동일한 값입니다.

```yaml
EXPECT:
  - key_buf: "3E23770DD631E799"
```

예를 들어 실제 값이 `0x3e23770dd631e799`라면 위 기대값과 동일합니다.

정확한 값이 실행마다 달라질 수 있다면 EQUAL 대신 조건 기반 검증을 사용하세요.
