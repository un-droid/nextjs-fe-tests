import { describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useToggle } from "../useToggle";

describe("useToggle", () => {
  it("should initialize with false by default and toggle", () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current.value).toBe(false);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.value).toBe(true);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.value).toBe(false);
  });

  it("should respect initial value and setOn/setOff", () => {
    const { result } = renderHook(() => useToggle(true));

    expect(result.current.value).toBe(true);

    act(() => {
      result.current.setOff();
    });
    expect(result.current.value).toBe(false);

    act(() => {
      result.current.setOn();
    });
    expect(result.current.value).toBe(true);
  });
});


