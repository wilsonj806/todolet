import MockAdapter from "axios-mock-adapter";
import axios from "../../axios";

import TodoService from "../TodoService";
import { PriorityTypes, TodoShape } from "../../types";

const { postTodo, getTodos, updateTodo, deleteTodo } = TodoService;

// NOTE these tests include WORKING expect async Fn throw tests
const mock = new MockAdapter(axios);
const initUser = {
  username: "guest",
  userId: "aaaaa",
  todos: [],
};

describe("A method for posting a new todo", () => {
  const endpoint = "/api/todo";
  const mockReq = {
    todo: "hi",
    priority: "Low",
  };

  afterEach(() => mock.reset());

  it("should call axios", () => {
    const spy = jest.spyOn(axios, "post");
    postTodo(mockReq);
    expect(spy).toHaveBeenCalled();
  });

  it("should return the data included in the todos property", async (done) => {
    const mockData = {
      todos: [{ todo: "mock data" }],
    };
    const assert = mockData.todos;

    mock.onPost(endpoint).reply(200, mockData);

    const res = await postTodo(mockReq);
    expect(res).toStrictEqual(assert);
    done();
  });

  it("should throw an error if the request fails", async () => {
    const mockResponse = {
      errors: "testing failure",
    };
    const mockError = new Error(mockResponse.errors);

    mock.onPost(endpoint).reply(400, mockResponse);

    // const response = await postTodo(mockReq);
    await expect(postTodo(mockReq)).rejects.toThrow(mockError);
  });
});

describe("A method for getting all todos", () => {
  const endpoint = "/api/todo";
  afterEach(() => mock.reset());

  it("should call axios", () => {
    const spy = jest.spyOn(axios, "get");
    getTodos();
    expect(spy).toHaveBeenCalled();
  });

  it("should return the data included in the todos property", async (done) => {
    const mockData = {
      todos: [{ todo: "mock data" }],
    };
    const assert = [mockData.todos];

    mock.onGet(endpoint).reply(200, mockData);

    const res = await getTodos();
    expect(res).toStrictEqual(assert);
    done();
  });

  it("should throw an error if the request fails", async () => {
    const mockResponse = {
      errors: "testing failure",
    };
    mock.onGet(endpoint).reply(400, mockResponse);

    await expect(getTodos()).rejects.toThrow();
  });
});

describe("A service function for updating a Todo", () => {
  afterEach(() => {
    mock.reset();
    mock.resetHistory();
  });
  const mockTodo = {
    id: "aaaaa",
    userIndex: 0,
    priority: "High" as PriorityTypes,
    todo: "test",
  };
  const mockUpdatedValues: { [key in keyof TodoShape]?: any } = {
    todo: "test but test",
    priority: "Medium" as PriorityTypes,
  };
  const endpoint = "/api/todo/" + mockTodo.id;

  it("should call axios", async (done) => {
    mock.onPut(endpoint).reply(200, {
      updatedTodo: { ...mockTodo },
    });
    await updateTodo(mockTodo as TodoShape, mockUpdatedValues);
    expect(mock.history.put.length).toBe(1);
    done();
  });

  it("should return the updated todo on success", async (done) => {
    mock.onPut(endpoint).reply(200, {
      updatedTodo: { ...mockTodo },
    });
    const assertRes = await updateTodo(
      mockTodo as TodoShape,
      mockUpdatedValues
    );
    expect(assertRes).toStrictEqual(mockTodo);
    done();
  });

  it("should throw an error if it failed", async () => {
    mock.onPut(endpoint).reply(500, {
      errors: "test err",
    });
    await expect(
      updateTodo(mockTodo as TodoShape, mockUpdatedValues)
    ).rejects.toThrow();
  });
});

describe("A service function for deleting a Todo", () => {
  afterEach(() => {
    mock.reset();
    mock.resetHistory();
  });
  const mockTodoId = "1111";
  const endpoint = "/api/todo/" + mockTodoId;

  const initUser = {
    username: "guest",
    userId: "aaaaa",
    todos: [mockTodoId],
  };

  const updatedUser = { ...initUser, todos: [] };

  const mockSuccess = { todos: [], authorizedUser: updatedUser };
  const mockServiceReturn = [[], updatedUser];

  it("should call axios", async (done) => {
    mock.onDelete(endpoint).reply(200, mockSuccess);
    await deleteTodo(mockTodoId);
    expect(mock.history.delete.length).toBe(1);
    done();
  });

  it("should return the todos", async (done) => {
    mock.onDelete(endpoint).reply(200, mockSuccess);
    const assertRes = await deleteTodo(mockTodoId);
    expect(assertRes).toStrictEqual(mockServiceReturn);
    done();
  });

  it("should throw an error if it failed", async () => {
    mock.onDelete(endpoint).reply(500, {
      errors: "test err",
    });
    await expect(deleteTodo(mockTodoId)).rejects.toThrow();
  });
});
