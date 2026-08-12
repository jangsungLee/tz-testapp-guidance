---
sidebar_position: 1
title: 출력값 저장과 참조
---

# 출력값 저장과 참조

여러 ACTION을 연결하려면 앞선 ACTION의 출력을 이름으로 저장한 뒤 다음 ACTION의 `PARAMS`에서 참조할 수 있습니다.

```yaml
- TC_ID: TC_FILE_FLOW_001
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

- `ARTIFACTS`의 왼쪽은 ACTION이 실제로 생성한 출력 Key입니다.
- 오른쪽은 사용자가 지정하는 alias입니다.
- `fd: secure_file_fd`는 `fd` 출력을 `secure_file_fd`라는 이름으로 저장합니다.
- 저장한 값은 `{{ out.secure_file_fd }}`로 참조합니다.
- 참조 형식은 항상 `{{ out.<alias> }}`입니다.
- 참조 표현식은 YAML 값 전체로 작성합니다.
- 일반 문자열 안에 참조 표현식을 섞어 작성하지 않습니다.
- alias는 같은 YAML 실행 안에서 이후 ACTION이 사용할 수 있도록 의미가 드러나는 이름으로 작성합니다.
- `ARTIFACTS`를 작성하지 않아도 EXPECT 검증용 실제 출력은 별도로 기록됩니다.
- lazy evaluation은 아직 TODO이므로 지원 기능처럼 설명하지 않습니다.

## 잘못된 예

```yaml
PARAMS:
  filename: "prefix-{{ out.file_name }}"
```

## 올바른 예

```yaml
PARAMS:
  fd: "{{ out.secure_file_fd }}"
```
