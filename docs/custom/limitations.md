---
sidebar_position: 8
title: 조건 표현식 제한사항
---

# 조건 표현식 제한사항

- callable은 synchronous boolean을 반환해야 합니다.
- Promise는 지원하지 않습니다.
- 외부 JavaScript library와 module을 불러올 수 없습니다.
- 파일, 네트워크, 프로세스 등 외부 환경 접근을 문서상 지원 기능으로 작성하지 않습니다.
- lazy evaluation은 아직 TODO입니다.
- nondeterministic API 제한 정책은 아직 확정되지 않았습니다.
- console log redaction 정책은 아직 확정되지 않았습니다.
- 미지원 기능을 지원한다고 추정하여 추가하지 않습니다.
