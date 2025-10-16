import { authSlice } from "../../../src/store/auth/authSlice";
import { initialState } from "../../fixtures/authStates";

describe("Test in authSlice", () => {
  test("It must return to the initial state.", () => {
    expect(authSlice.getInitialState()).toEqual(initialState);
  });
});
