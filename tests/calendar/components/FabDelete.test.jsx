import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import { FabDelete } from "../../../src/calendar/components/FabDelete";
import { store } from "../../../src/store/store";

describe("Tests in the FabDelete", () => {
  test("Should display the component correctly.", () => {
    render(
      <Provider store={store}>
        <FabDelete />
      </Provider>
    );
    screen.debug();
  });
});
