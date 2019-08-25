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
  // ----- State
  type FiltersEntry = {
    color : String,
    name  : String
  }

  type FiltersArray = Array<FiltersEntry>

  // ----- Props
  interface BodyProps {
    children: ReactElement
  }

  interface MainProps {
    children  : ReactNode
    noPadding ?: Boolean
  }

  interface NavProps {
    id            ?: String
    className     ?: String
    [key: String] : any
  }

  interface TextInputWrapperProps {
    id            : string
    type          ?: string
    value         : string
    label         : string
    classes       ?: Object
    margin        ?: PropTypes.Margin
    reactHookFn   : Dispatch<SetStateAction<any>>
    [key: string] : any
  }
}

declare module 'AnotherTodoClient' {
  export = AnotherTodoClient;
}