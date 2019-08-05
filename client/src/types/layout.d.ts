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

import { ReactNode, ReactElement } from 'react';

export type BodyProps = {
  children: ReactElement
}

export type MainProps = {
  children: ReactNode
}

export type NavProps = {
  id            ?: String
  className     ?: String
  [key: String] : any
}
