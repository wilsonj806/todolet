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

import { Document, MongooseDocument } from "mongoose";
import { TodoShape, UserStoreShape } from '../../client/types'



export = AnotherTodoServer;
export as namespace Server;

declare namespace AnotherTodoServer {
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
  type STATUS_CODE = 200 | 201 | 400 | 403 | 404 | 500 | 503
  interface postUserReq {
    "username" : string
    "email"    : string
    "password" : string
    "password2": string
  }

  interface postLoginReq {
    "username" : string
    "password" : string
  }

  type priorityVal = "High" | "Medium" | "Low"
  interface postTodoReq {
    "todo" : string
    "priority" : string
  }

  interface responseObj {
    "msg"         : Array<string> | string
    [key: string] : any
  }

  interface userDataResponse extends responseObj {
    "data" : UserStoreShape
  }

  interface todoDataResponse extends responseObj {
    "data" : Array<TodoShape>
  }

  interface errorResponse extends responseObj {
    "errors" ?: Record | Array<Record>
  }
  /**
   * ANCHOR Database related
   *
   */
  type priority = 'HIGH' | 'MEDIUM' | 'LOW'
  interface mongodbObj { _id: any }
  interface IUserObj  {
    id      : any
    username : string
    password : string
  }

  interface ITodoObj {
    id         : any
    user_index : string
    todo       : string
    priority   : priority
    date_added : Date
  }

  /**
   * ANCHOR Testing
   *
   */
  interface MockReq {
    username ?: string
    password ?: string
    password2 ?: string
    [key: string] : any
  }
  interface MockRes {
    [key: string] : any
  }
}

declare module 'AnotherTodoServer' {
  export = AnotherTodoServer;
}