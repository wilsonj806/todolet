/**
 * ==============================================
 *
 *       Type Definitions for Form Components
 *
 * ==============================================
 *
 * TypeScript Version: 3.2.4
 * Definitions by: Wilson Jiang
 *
 */
/// <reference types="react" />

import { ReactNode, ReactElement, Dispatch, SetStateAction } from 'react';

import PropTypes from '@material-ui/core/TextField'


export interface TextInputWrapperProps {
  id          : string
  type        : string
  value       : string
  label       : string
  classes     : Object
  margin      ?: PropTypes.Margin
  reactHookFn : Dispatch<SetStateAction<any>>
}
