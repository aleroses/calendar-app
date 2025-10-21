import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../src/store/auth/authSlice";
import {
  initialState,
  notAuthenticatedState,
} from "../fixtures/authStates";
import {
  act,
  renderHook,
  waitFor,
} from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { Provider } from "react-redux";
import { testUserCredentials } from "../fixtures/testUser";
import calendarApi from "../../src/api/calendarApi";

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: { ...initialState },
    },
  });
};

describe("Tests in useAuthStore", () => {
  beforeEach(() => localStorage.clear());

  test("Should return the default values.", () => {
    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    // console.log(result.current);
    expect(result.current).toEqual({
      errorMessage: undefined,
      status: "checking",
      user: {},
      checkAuthToken: expect.any(Function),
      startLogin: expect.any(Function),
      startLogout: expect.any(Function),
      startRegister: expect.any(Function),
    });
  });

  test("startLogin should login correctly.", async () => {
    const mockStore = getMockStore({
      ...notAuthenticatedState,
    });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startLogin(testUserCredentials);
    });

    const { errorMessage, status, user } = result.current;
    // console.log(result.current);

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: "authenticated",
      user: {
        name: "Test User",
        uid: "68f0eab1486246c8bcd69137",
      },
    });

    expect(localStorage.getItem("token")).toEqual(
      expect.any(String)
    );
    expect(localStorage.getItem("token-init-date")).toEqual(
      expect.any(String)
    );
  });

  test("StartLogin should display login errors.", async () => {
    const mockStore = getMockStore({
      ...notAuthenticatedState,
    });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startLogin({
        email: "algo@google.com",
        password: "123456",
      });
    });

    const { errorMessage, status, user } = result.current;
    // console.log(localStorage.getItem("token"));
    // console.log({ errorMessage, status, user });

    expect(localStorage.getItem("token")).toBe(null);
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: "Incorrect credentials.",
      status: "not-authenticated",
      user: {},
    });

    await waitFor(() =>
      expect(result.current.errorMessage).toBe(undefined)
    );
  });

  test("startRegister must create a user.", async () => {
    const newUser = {
      email: "testing18@google.com",
      password: "123456",
      name: "Test User Final",
    };

    const mockStore = getMockStore({
      ...notAuthenticatedState,
    });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const spy = jest
      .spyOn(calendarApi, "post")
      .mockReturnValue({
        data: {
          ok: true,
          uid: "132343536456",
          name: "Test User",
          token: "Some-token.",
        },
      });

    await act(async () => {
      await result.current.startRegister(newUser);
    });

    const { errorMessage, status, user } = result.current;
    // console.log({ errorMessage, status, user });
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: "authenticated",
      user: {
        name: "Test User",
        uid: "132343536456",
      },
    });

    spy.mockRestore();
  });

  test("startRegister must fail to create.", async () => {
    const mockStore = getMockStore({
      ...notAuthenticatedState,
    });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startRegister(testUserCredentials);
    });

    const { errorMessage, status, user } = result.current;
    // console.log({ errorMessage, status, user });
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: "This email address is already in use.",
      status: "not-authenticated",
      user: {},
    });
  });
});
