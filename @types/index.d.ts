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
  /**
   * ANCHOR Deployment related/ process.env related
   *
   */
  type NODE_ENV = 'production' | 'development' | 'staging' | undefined

  interface ENV {
    NODE_ENV          ?: NODE_ENV
    MONGODB_URI       ?: string | undefined
    MONGODB_URI_LOCAL ?: string | undefined
    DBNAME_LOCAL      ?: string | undefined
    DBNAME            ?: string | undefined
    [key: string]     : any
  }

  /**
   * ANCHOR HTTP request/ response structure
   *
   */
  type postUserReq = {
    "username": string,
    "password": string
    "password2": string
  }

  /**
   * ANCHOR Database related
   *
   */
  type priority = 'HIGH' | 'MEDIUM' | 'LOW'
  type mongodbObj = {
    _id: any
  }
  interface userObj extends mongodbObj {
    username: string
    password: string
  }
  interface todoObj extends mongodbObj {
    username   : string
    todo       : string
    priority   : priority
    date_added : Date
    tags       : Array<string>
  }
}

declare module 'AnotherTodoTypes' {
  export = AnotherTodoTypes;
}