import { renderHook } from "@testing-library/react";
import { useUiStore } from "../../src/hooks/useUiStore";
import { Provider } from "react-redux";
import { store } from "../../src/store/store";
import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "../../src/store/ui/uiSlice";

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer,
    },
    preloadedState: {
      ui: { ...initialState },
    },
  });
};

describe("Tests in the useUiStore", () => {
  test("Should return the default values.", () => {
    const mockStore = getMockStore({
      isDateModalOpen: false,
    });

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    // console.log(result.current);
    expect(result.current).toEqual({
      isDateModalOpen: false,
      closeDateModal: expect.any(Function),
      openDateModal: expect.any(Function),
      // toggleDateModal: expect.any(Function),
    });
  });
});
