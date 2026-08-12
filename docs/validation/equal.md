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

## HexArray 비교

byte buffer 출력은 `HexArray`의 각 byte를 순서대로 비교합니다.

```yaml
EXPECT:
  - key_buf: [0x3E, 0x23, 0x77, 0x0D, 0xD6, 0x31, 0xE7, 0x99]
```

예를 들어 실제 byte 배열이 `3E 23 77 0D D6 31 E7 99`라면 위 기대값과 동일합니다.

정확한 값이 실행마다 달라질 수 있다면 EQUAL 대신 조건 기반 검증을 사용하세요.
