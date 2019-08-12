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

export interface BodyProps {
  children: ReactElement
}

export interface MainProps {
  children  : ReactNode
  noPadding ?: Boolean
}

export interface NavProps {
  id            ?: String
  className     ?: String
  [key: String] : any
}
