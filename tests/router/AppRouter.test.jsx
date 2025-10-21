import { render, screen } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { AppRouter } from "../../src/router/AppRouter";
import { MemoryRouter } from "react-router";
import { CalendarPage } from "../../src/calendar/pages/CalendarPage";

jest.mock("../../src/hooks/useAuthStore");
jest.mock("../../src/calendar/pages/CalendarPage", () => ({
  CalendarPage: () => <h1>CalendarPage</h1>,
}));

describe("Tests in AppRouter", () => {
  const mockCheckAuthToken = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("Should display the loading screen and call checkAuthToken.", () => {
    useAuthStore.mockReturnValue({
      status: "checking",
      checkAuthToken: mockCheckAuthToken,
    });

    render(<AppRouter />);

    // screen.debug();
    expect(screen.getByText("Loading...")).toBeTruthy();
    expect(mockCheckAuthToken).toHaveBeenCalled();
  });

  test("Should display the login if you aren't authenticated.", () => {
    useAuthStore.mockReturnValue({
      status: "not-authenticated",
      checkAuthToken: mockCheckAuthToken,
    });

    const { container } = render(
      <MemoryRouter
        initialEntries={["/auth/something/somethingElse"]}
      >
        <AppRouter />
      </MemoryRouter>
    );

    // screen.debug()

    expect(screen.getByText("Ingreso")).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test("Should display the calendar if we're authenticated.", () => {
    useAuthStore.mockReturnValue({
      status: "authenticated",
      checkAuthToken: mockCheckAuthToken,
    });

    render(
      <MemoryRouter
      // initialEntries={["/auth/something/somethingElse"]}
      >
        <AppRouter />
      </MemoryRouter>
    );

    // screen.debug();
    expect(screen.getByText("CalendarPage")).toBeTruthy();
  });
});
