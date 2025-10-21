import { render, screen } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { AppRouter } from "../../src/router/AppRouter";

jest.mock("../../src/hooks/useAuthStore");

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
});
