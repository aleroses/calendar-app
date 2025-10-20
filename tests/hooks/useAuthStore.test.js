import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../src/store/auth/authSlice";
import {
  initialState,
  notAuthenticatedState,
} from "../fixtures/authStates";
import { act, renderHook } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { Provider } from "react-redux";
import { testUserCredentials } from "../fixtures/testUser";

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
    localStorage.clear();

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
});
