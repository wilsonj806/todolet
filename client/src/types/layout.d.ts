/**
 * ==============================================
 *
 *       Type Definitions for Layout Components
 *
 * ==============================================
 *
 * TypeScript Version: 3.2.4
 * Definitions by: Wilson Jiang
 *
 */
/// <reference types="react" />

import ReactElement from 'react';


 export type NavProps = {
  id            ?: String
  className     ?: String
  [key: String] : any
}


export type BodyProps = {
  children: ReactElement
}