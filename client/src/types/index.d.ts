/**
 * ==============================================
 *
 *       Type Definitions for Another Todo: Client
 *
 * ==============================================
 *
 * TypeScript Version: 3.2.4
 * Definitions by: Wilson Jiang
 *
 */

/// <reference types="react" />

export = AnotherTodoClient;
export as namespace Client;

declare namespace AnotherTodoClient {
  export {
    NavProps,
    BodyProps,
    MainProps,
  } from './layout';
  export {
    FiltersEntry,
    FiltersArray
  } from './state';
}

declare module 'AnotherTodoClient' {
  export = AnotherTodoClient;
}