import {
  authSlice,
  clearErrorMessage,
  onLogin,
  onLogout,
} from "../../../src/store/auth/authSlice";
import {
  authenticatedState,
  initialState,
} from "../../fixtures/authStates";
import { testUserCredentials } from "../../fixtures/testUser";

describe("Test in authSlice", () => {
  test("It must return to the initial state.", () => {
    expect(authSlice.getInitialState()).toEqual(initialState);
  });

  test("It must log in.", () => {
    const state = authSlice.reducer(
      initialState,
      onLogin(testUserCredentials)
    );
    // console.log(state);

    expect(state).toEqual({
      status: "authenticated",
      user: testUserCredentials,
      errorMessage: undefined,
    });
  });

  test("It must log out.", () => {
    const state = authSlice.reducer(
      authenticatedState,
      onLogout()
    );

    expect(state).toEqual({
      status: "not-authenticated",
      user: {},
      errorMessage: undefined,
    });
  });

  test("It must log out.", () => {
    const errorMessage = "Invalid credentials.";
    const state = authSlice.reducer(
      authenticatedState,
      onLogout(errorMessage)
    );
    // console.log(state);

    expect(state).toEqual({
      status: "not-authenticated",
      user: {},
      errorMessage: errorMessage,
    });
  });

  test("It must clear the error message.", () => {
    const errorMessage = "Invalid credentials.";
    const state = authSlice.reducer(
      authenticatedState,
      onLogout(errorMessage)
    );
    // console.log(state);

    const newState = authSlice.reducer(
      state,
      clearErrorMessage()
    );

    expect(newState.errorMessage).toBe(undefined);
  });
});
