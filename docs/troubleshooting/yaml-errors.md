---
sidebar_position: 1
title: YAML 형식 오류
---

# YAML 형식 오류

## 최상위 노드가 sequence가 아님

**형식:** Test Case 목록은 `- TC_ID:`로 시작하는 sequence여야 합니다.

## `{{ }}` 또는 `${{ }}` 괄호 오류

**참조 형식:** template은 `{{ out.name }}`, 조건 표현식은 `${{ callable }}`를 사용합니다.
**오류 결과:** 중괄호가 하나 더 있거나 닫는 괄호가 부족하면 YAML load 단계에서 거부됩니다.

## 잘못된 template depth

**지원 범위:** 참조는 `object.name` 형태의 한 단계만 지원합니다.

```yaml
fd: "{{ out.secure_file_fd }}"
```

## Map과 sequence 혼동

**타입:** `ACTS`와 `EXPECT`는 sequence입니다. **원인:** 들여쓰기 또는 `-`가 잘못되면 yaml-cpp가 map과 sequence를 다른 타입으로 해석할 수 있습니다.
