---
sidebar_position: 5
title: 여러 동작 연결
---

# 여러 동작 연결

첫 동작의 출력을 `ARTIFACTS`로 저장하고 **다음 동작의 `PARAMS`에서 참조**할 수 있습니다.

```yaml
- TC_ID: TC_FILE_FLOW_001
  Title: Open and Close Secure File
  ACTS:
    - ACTION: SECRET_FILE_OPEN
      PARAMS:
        filename: sanity_test.txt
        filename_size: 15
        file_descriptor: -1
      EXPECT:
        - ret_code: 0
        - fd: "${{ actual => actual >= 0 }}"
      ARTIFACTS:
        fd: secure_file_fd

    - ACTION: SECRET_FILE_CLOSE
      PARAMS:
        fd: "{{ out.secure_file_fd }}"
      EXPECT:
        - ret_code: 0
```

첫 ACTION의 `fd` 출력이 `secure_file_fd`라는 이름으로 저장되고, **두 번째 ACTION에서
입력으로 사용**됩니다.
