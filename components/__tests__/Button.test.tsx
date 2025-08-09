import { describe, expect, it, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/Button";

describe("Button", () => {
  afterEach(() => {
    cleanup();
  });
  it("renders with default primary variant", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-black", "text-white");
  });

  it("renders secondary variant", () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole("button", { name: "Secondary" });
    expect(button).toHaveClass("bg-white", "text-black", "border");
  });

  it("renders ghost variant", () => {
    render(<Button variant="ghost">Ghost</Button>);
    const button = screen.getByRole("button", { name: "Ghost" });
    expect(button).toHaveClass("bg-transparent");
  });

  it("shows loading state with spinner", () => {
    render(<Button isLoading>Submit</Button>);
    expect(screen.getByText("Loading")).toBeInTheDocument();
    expect(screen.queryByText("Submit")).not.toBeInTheDocument();
    // Check that there's an element with animate-spin class (the spinner)
    const button = screen.getByRole("button");
    const spinner = button.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("animate-spin");
  });

  it("handles click events", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={handleClick}>Click</Button>);
    
    await user.click(screen.getByRole("button", { name: "Click" }));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("forwards HTML attributes and custom className", () => {
    render(
      <Button className="custom-class" data-testid="test-button" disabled>
        Disabled
      </Button>
    );
    const button = screen.getByTestId("test-button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("custom-class");
  });
});