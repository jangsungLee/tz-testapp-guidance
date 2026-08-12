---
sidebar_position: 2
title: Test Case와 ACTS
---

# Test Case와 ACTS

YAML 최상위 노드는 Test Case 목록입니다. 하나의 Test Case에는 하나 이상의 ACTION을 작성할 수 있습니다. `ACTS`에 작성된 ACTION은 위에서 아래 순서로 실행됩니다.

```yaml
- TC_ID: TC_FILE_001
  Title: Open and Close Secure File
  ACTS:
    - ACTION: SECRET_FILE_OPEN
      PARAMS:
        filename: sanity_test.txt
      EXPECT:
        - ret_code: 0
      ARTIFACTS:
        fd: secure_file_fd

    - ACTION: SECRET_FILE_CLOSE
      PARAMS:
        fd: "{{ out.secure_file_fd }}"
      EXPECT:
        - ret_code: 0
```

- 첫 번째 ACTION이 secure file을 엽니다.
- 첫 번째 ACTION의 `fd` 출력을 `secure_file_fd`라는 이름으로 저장합니다.
- 두 번째 ACTION은 저장된 값을 `fd` 입력으로 사용합니다.
- ACTION별 입력과 출력 Key는 API 레퍼런스에 정의된 이름을 사용해야 합니다.
