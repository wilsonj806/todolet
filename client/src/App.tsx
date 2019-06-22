import React, { memo } from 'react';
import Layout from './react/components/containers/Layout';
// import { useInputValue } from './hook/inputState';
// import { useTodos } from './hook/todoState';
// import { useTheme } from './hook/themeState';
import AddTodo from './react/components/hybrid/AddTodo';
import TodoList from './react/components/presentational/TodoList';

// import { ThemeContext, lightTheme, darkTheme } from './contexts/theme-context';

const App = memo(props => {
  // const { inputValue, changeInput, clearInput, keyInput } = useInputValue();
  // const { todos, addTodo, checkTodo, removeTodo } = useTodos();
  // const { isLight, toggleTheme } = useTheme();

  // const clearInputAndAddTodo = _ => {
  //   clearInput();
  //   addTodo(inputValue);
  // }

  return (
    <div className="App">
        <Layout>
          <AddTodo
          />
        </Layout>
    </div>
  );
})

export default App;