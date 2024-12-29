import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // Ensure jest-dom is imported for custom matchers
import HomePage from "../pages/Home";
import { ThemeProvider } from "@/components/molecules/providers/ThemeProvider";
import { MemoryRouter } from "react-router-dom";

// Mock the necessary service for useProductsQuery hook
jest.mock("../services/services", () => ({
  useServices: jest.fn().mockReturnValue({
    useProductsQuery: jest.fn(() => ({
      data: [], // Mock with an empty array
      isLoading: false,
      error: null,
    })),
  }),
}));

describe("HomePage", () => {
  const renderWithProviders = (ui: JSX.Element) => {
    return render(
      <ThemeProvider>
        <MemoryRouter>{ui}</MemoryRouter>
      </ThemeProvider>
    );
  };

  it("should render HomePage correctly", () => {
    renderWithProviders(<HomePage />);
    // Test for a specific element or text that should always render
    expect(screen.getByPlaceholderText(/item name .../i)).toBeInTheDocument(); // Checking if filter input renders
  });

  it("should update filter state when input value changes", () => {
    renderWithProviders(<HomePage />);
    const inputElement = screen.getByPlaceholderText(
      /item name .../i
    ) as HTMLInputElement; // Explicitly type as HTMLInputElement
    fireEvent.change(inputElement, { target: { value: "Test Product" } });
    expect(inputElement.value).toBe("Test Product"); // Checking if the filter input updates with the value
  });
});
