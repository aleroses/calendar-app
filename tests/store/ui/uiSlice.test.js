import {
  onCloseDateModal,
  onOpenDateModal,
  uiSlice,
} from "../../../src/store/ui/uiSlice";

describe("Tests in the uiSlice", () => {
  test("It should return to the default state.", () => {
    // console.log(uiSlice.getInitialState());

    // Two ways of doing the same thing
    expect(uiSlice.getInitialState()).toEqual({
      isDateModalOpen: false,
    });

    expect(
      uiSlice.getInitialState().isDateModalOpen
    ).toBeFalsy();
  });

  test("You must change isDateModalOpen correctly.", () => {
    let state = uiSlice.getInitialState();
    state = uiSlice.reducer(state, onOpenDateModal());

    // console.log(state);
    expect(state.isDateModalOpen).toBeTruthy();

    state = uiSlice.reducer(state, onCloseDateModal());
    expect(state.isDateModalOpen).toBeFalsy();
  });
});
