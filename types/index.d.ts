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
import { TodoStoreShape, UserStoreShape } from '../client/src/types'



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
    "password" : string
    "password2": string
  }

  interface postLoginReq {
    "username" : string
    "password" : string
  }
  interface responseObj {
    "msg"         : Array<string> | string
    [key: string] : any
  }

  interface userDataResponse implements responseObj {
    "data" : UserStoreShape
  }

  interface todoDataResponse implements responseObj {
    "data" : Array<TodoStoreShape>
  }

  interface errorResponse implements responseObj {
    "errors" ?: Record | Array<Record>
  }
  /**
   * ANCHOR Database related
   *
   */
  type priority = 'HIGH' | 'MEDIUM' | 'LOW'
  interface mongodbObj { _id: any }
  interface IUserObj extends Document {
    _id      : any
    username : string
    password : string
    sessionId : string
    sortTodoBy ?: string
    projectFilters ?: Array<string>
    tagFilters ?: Array<string>
  }
  interface IUserModel extends IUserObj, Document {}
  interface todoObj extends mongodbObj {
    _id        ?: any
    username   : string
    todo       : string
    priority   : priority
    date_added : Date
    tags       : Array<string>
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