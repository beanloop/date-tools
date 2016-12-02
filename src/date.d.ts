/// <reference path="./index.ts" />

interface Date {
  add(Duration): Date
  subtract(Duration): Date
  clone(): Date
}
