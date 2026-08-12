---
sidebar_position: 6
title: 지원 범위와 제한
---

# 지원 범위와 제한

조건 표현식은 내장 QuickJS runtime에서 실행됩니다. 일반적인 callable, function
expression, 기본 Array API와 ECMAScript 문법을 사용할 수 있습니다.

## 지원 원칙

- arrow function과 function expression
- 기본 문자열, 숫자, boolean, Array 기능
- BigInt 산술과 bitwise 연산
- `console.log()`와 `console.error()`
- callable의 boolean 반환값

## 제한

- 외부 JavaScript module 및 라이브러리
- Promise 반환값
- boolean이 아닌 평가 결과
- 무제한 실행 시간, memory, stack, console 출력
- 시스템 API 또는 애플리케이션 내부 객체 접근

각 조건식은 제한된 memory와 stack을 사용하는 별도 runtime에서 평가되며, 실행 시간과
console 출력량도 제한됩니다. 제한을 초과하면 해당 조건 검증은 실패합니다.

## 평가 시점

조건식은 `ACTION`이 끝나고 출력값이 생성된 뒤 평가됩니다. 따라서 조건식의 문법 오류,
runtime 오류 또는 `false` 반환은 해당 EXPECT를 실패하게 하지만 이미 실행된 API 동작을
되돌리지는 않습니다.

현재는 결과를 기록할 때 조건식을 평가합니다. 조건식의 사전 평가 또는 lazy 평가는
지원 예정 항목이며 기존 동작으로 가정해서는 안 됩니다.

미지원 console method는 프로그램 동작을 구현하지 않고 warning만 출력합니다.
