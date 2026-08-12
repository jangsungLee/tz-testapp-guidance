---
sidebar_position: 5
title: ARTIFACTS
---

# ARTIFACTS

`ARTIFACTS`는 ACTION 출력을 **이후 ACTION에서 사용할 이름으로 저장**합니다.

```yaml
ARTIFACTS:
  fd: secure_file_fd
```

- **출력 Key:** 왼쪽 `fd`는 ACTION이 생성하는 값입니다.
- **alias:** 오른쪽 `secure_file_fd`는 사용자가 정하는 이름입니다.
- **참조 형식:** 저장한 값은 `{{ out.secure_file_fd }}`로 참조합니다.

상세 사용 예제는 [출력값 저장과 참조](../custom/output-reference.md)를 확인합니다.
