---
sidebar_position: 4
title: ARTIFACTS
---

# ARTIFACTS

`ARTIFACTS`는 API 출력에 재사용할 이름을 부여합니다.

```yaml
ARTIFACTS:
  fd: secure_file_fd
```

왼쪽의 `fd`는 handler가 생성한 출력 Key이고, 오른쪽의 `secure_file_fd`는 이후 동작에서
사용할 이름입니다.

```yaml
PARAMS:
  fd: "{{ out.secure_file_fd }}"
```

`ARTIFACTS`가 없어도 handler 출력은 현재 동작의 `EXPECT` 검증에 사용될 수 있습니다.
재사용할 출력이 없으면 `ARTIFACTS`를 생략할 수 있습니다.

:::caution

저장 이름은 같은 실행 흐름 안에서 의미가 분명하고 충돌하지 않도록 작성하세요.

:::
