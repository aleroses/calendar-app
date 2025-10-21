import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { FabDelete } from "../../../src/calendar/components/FabDelete";
import { useCalendarStore } from "../../../src/hooks/useCalendarStore";

jest.mock("../../../src/hooks/useCalendarStore");

describe("Tests in the FabDelete", () => {
  const mockStartDeletingEvent = jest.fn();

  beforeEach(() => jest.clearAllMocks());
  // beforeEach(() => jest.clearAllTimers())

  test("Should display the component correctly.", () => {
    // tip: jest.fn().mockReturnValue
    useCalendarStore.mockReturnValue({
      hasEventSelected: false,
    });
    render(<FabDelete />);
    // screen.debug();

    const btn = screen.getByLabelText("btn-delete");

    expect(btn.classList).toContain("btn");
    expect(btn.classList).toContain("btn-danger");
    expect(btn.classList).toContain("fab-danger");
    expect(btn.style.display).toBe("none");
  });

  test("The button should be displayed if there is an active event.", () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
    });
    render(<FabDelete />);
    // screen.debug();

    const btn = screen.getByLabelText("btn-delete");

    expect(btn.style.display).toBe("");
  });

  test("You must call startDeletingEvent if there is an active event.", () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
      startDeletingEvent: mockStartDeletingEvent,
    });

    render(<FabDelete />);
    // screen.debug();

    const btn = screen.getByLabelText("btn-delete");
    fireEvent.click(btn);

    expect(mockStartDeletingEvent).toHaveBeenCalledWith();
  });
});
