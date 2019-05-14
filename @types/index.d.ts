/**
 * ==============================================
 *
 *       Type Definitions for Another Todo
 *
 * ==============================================
 *
 * TypeScript Version: 3.2.4
 * Definitions by: Wilson Jiang
 *
 */

/// <reference types="node" />
/// <reference types="mongoose" />
/// <reference types="mongodb" />
/// <reference types="express" />

export = AnotherTodoTypes;
export as namespace Local;

declare namespace AnotherTodoTypes {
  type NODE_ENV = 'production' | 'development' | 'staging' | undefined

  interface ENV {
    NODE_ENV          ?: NODE_ENV
    MONGODB_URI       ?: string | undefined
    MONGODB_URI_LOCAL ?: string | undefined
    DBNAME_LOCAL      ?: string | undefined
    DBNAME            ?: string | undefined
    [key: string]     : any
  }
}

declare module 'AnotherTodoTypes' {
  export = AnotherTodoTypes;
}