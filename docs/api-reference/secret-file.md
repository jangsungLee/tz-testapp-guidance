---
sidebar_position: 2
title: Secret File
---

# Secret File

Secure File의 열기, 읽기, 쓰기, 탐색, 닫기, 삭제 동작을 설명합니다.

각 Test Case는 ACTION 하나만 포함합니다. 필드별 타입, 필수 여부와 길이 제한은 오른쪽 주석을 확인하세요. Byte Array 작성법과 출력 참조는 [Custom 기능](../custom/)을 참고하세요.

## `SECRET_FILE_OPEN`

**사용 API:** `am_sfs_open()`

```yaml
- TC_ID: TC_SECRET_FILE_OPEN_TEMPLATE
  Title: Open Secure File
  ACTS:
    - ACTION: SECRET_FILE_OPEN
      PARAMS:
        filename_size: 0 # required: false, type: UnsignedInteger, default: 64, minimum: 0, maximum: 64, unit: byte, derived_from: filename, derive_when: omitted_and_source_defined, precedence: explicit
        filename: "" # required: true, type: String, nullable: true, max_length: 64, unit: byte, length_param: filename_size
        file_descriptor: -1 # required: false, type: Integer, default: -1, description: Output value
      EXPECT:
        - ret_code: 0 # required: false, type: Integer, comparison: Equal
        - fd: 0 # required: false, type: Integer, comparison: EqualOrCondition, actual_type: Integer
      ARTIFACTS:
        ret_code: "" # required: false, type: String, source_type: Integer, usage: "{{ out.<alias> }}"
        fd: "" # required: false, type: String, source_type: Integer, usage: "{{ out.<alias> }}"
```
## `SECRET_FILE_READ`

**사용 API:** `am_sfs_read()`

```yaml
- TC_ID: TC_SECRET_FILE_READ_TEMPLATE
  Title: Read Secure File
  ACTS:
    - ACTION: SECRET_FILE_READ
      PARAMS:
        fd: -1 # required: true, type: Integer, default: -1, description: Accepts a literal or template reference
        read_buf: "" # required: false, type: String, nullable: true, default: "", max_length: 4096, unit: byte, capacity_param: rbuf_size, description: Output buffer
        rbuf_size: 0 # required: false, type: UnsignedInteger, default: 4096, minimum: 0, maximum: 4096, unit: byte
      EXPECT:
        - ret_code: 0 # required: false, type: Integer, comparison: Equal
        - rbuf_size: 0 # required: false, type: UnsignedInteger, comparison: EqualOrCondition, actual_type: UnsignedInteger
        - read_buf: "" # required: false, type: String, comparison: EqualOrCondition, actual_type: String
      ARTIFACTS:
        ret_code: "" # required: false, type: String, source_type: Integer, usage: "{{ out.<alias> }}"
        rbuf_size: "" # required: false, type: String, source_type: UnsignedInteger, usage: "{{ out.<alias> }}"
        read_buf: "" # required: false, type: String, source_type: String, usage: "{{ out.<alias> }}"
```

## `SECRET_FILE_WRITE`

**사용 API:** `am_sfs_write()`

```yaml
- TC_ID: TC_SECRET_FILE_WRITE_TEMPLATE
  Title: Write Secure File
  ACTS:
    - ACTION: SECRET_FILE_WRITE
      PARAMS:
        fd: -1 # required: true, type: Integer, default: -1, description: Accepts a literal or template reference
        contents: "" # required: true, type: String, nullable: true, max_length: 4096, unit: byte, length_param: len
        len: 0 # required: false, type: UnsignedInteger, default: 0, minimum: 0, maximum: 4096, unit: byte, derived_from: contents, derive_when: omitted_and_source_defined, precedence: explicit
      EXPECT:
        - ret_code: 0 # required: false, type: Integer, comparison: Equal
      ARTIFACTS:
        ret_code: "" # required: false, type: String, source_type: Integer, usage: "{{ out.<alias> }}"
```

## `SECRET_FILE_SEEK`

**사용 API:** `am_sfs_seek()`

```yaml
- TC_ID: TC_SECRET_FILE_SEEK_TEMPLATE
  Title: Seek Secure File
  ACTS:
    - ACTION: SECRET_FILE_SEEK
      PARAMS:
        fd: -1 # required: true, type: Integer, default: -1, description: Accepts a literal or template reference
        offset: 0 # required: true, type: Integer, default: -1, unit: byte
        whence: 0 # required: true, type: Enum, default: -1, allowed_values: [0, 1, 2], description: SEEK_SET, SEEK_CUR, SEEK_END
      EXPECT:
        - ret_code: 0 # required: false, type: Integer, comparison: Equal
      ARTIFACTS:
        ret_code: "" # required: false, type: String, source_type: Integer, usage: "{{ out.<alias> }}"
```

## `SECRET_FILE_CLOSE`

**사용 API:** `am_sfs_close()`

```yaml
- TC_ID: TC_SECRET_FILE_CLOSE_TEMPLATE
  Title: Close Secure File
  ACTS:
    - ACTION: SECRET_FILE_CLOSE
      PARAMS:
        fd: -1 # required: true, type: Integer, default: -1, description: Accepts a literal or template reference
      EXPECT:
        - ret_code: 0 # required: false, type: Integer, comparison: Equal
      ARTIFACTS:
        ret_code: "" # required: false, type: String, source_type: Integer, usage: "{{ out.<alias> }}"
```

## `SECRET_FILE_REMOVE`

**사용 API:** `am_sfs_rm()`

```yaml
- TC_ID: TC_SECRET_FILE_REMOVE_TEMPLATE
  Title: Remove Secure File
  ACTS:
    - ACTION: SECRET_FILE_REMOVE
      PARAMS:
        filename: "" # required: true, type: String, nullable: true, max_length: 64, unit: byte
      EXPECT:
        - ret_code: 0 # required: false, type: Integer, comparison: Equal
      ARTIFACTS:
        ret_code: "" # required: false, type: String, source_type: Integer, usage: "{{ out.<alias> }}"
```
