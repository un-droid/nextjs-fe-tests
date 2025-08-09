import { describe, expect, it, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { Card } from "@/components/Card";

describe("Card", () => {
  afterEach(() => {
    cleanup();
  });
  it("renders title and children", () => {
    render(
      <Card title="Test Card">
        <p>Card content</p>
      </Card>
    );
    
    expect(screen.getByRole("heading", { name: "Test Card" })).toBeInTheDocument();
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    render(<Card title="Main Title" subtitle="Subtitle text" />);
    
    expect(screen.getByText("Main Title")).toBeInTheDocument();
    expect(screen.getByText("Subtitle text")).toBeInTheDocument();
  });

  it("does not render subtitle when not provided", () => {
    render(<Card title="Only Title" />);
    
    expect(screen.getByText("Only Title")).toBeInTheDocument();
    // Look specifically for the subtitle text instead of counting all paragraphs
    expect(screen.queryByText(/subtitle/i)).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Card title="Test" className="custom-card-class" />);
    
    // Get the section by finding the container that has our custom class
    const section = screen.getByText("Test").closest("section");
    expect(section).toHaveClass("custom-card-class");
    expect(section).toHaveClass("rounded-lg");
  });

  it("renders as a section element", () => {
    render(<Card title="Section Card" />);
    const section = screen.getByText("Section Card").closest("section");
    expect(section).toBeInTheDocument();
  });
});