import React, { FC } from 'react';

import Button from '@material-ui/core/Button';

import TextInputWrapper from "../../containers/TextInputWrapper";

/**
 * Submit bar
 * - needs a Select Element
 * - needs a Submit Button Element
 * - needs to be wrapped with a Form Element
 * - needs to make a POST request on submit
 *
 */
const SubmitBar: FC<any> = () => {

  return (
    <div>
      <form id="todo-submit">
        <TextInputWrapper
          id="todo"
          label="New Todo"
          name="todo"
          value=""
          reactHookFn={ () => console.log('hi') }
        />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            // classes={{ root: classes.submitButton }}
            onClick={ () => console.log('hi') }
          >
            Add Todo
          </Button>
      </form>
    </div>
  )
}

export default SubmitBar;