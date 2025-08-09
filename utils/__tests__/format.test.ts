import { describe, expect, it } from "vitest";
import { formatDate, truncate } from "../format";

describe("truncate", () => {
  it("returns the same string if within maxLength", () => {
    expect(truncate("hello", 10)).toBe("hello");
  });

  it("truncates and appends ellipsis when over maxLength", () => {
    const result = truncate("abcdefghij", 5);
    expect(result).toBe("abcd…");
  });

  it("handles tiny maxLength safely", () => {
    expect(truncate("abc", 0)).toBe("…");
    expect(truncate("abc", 1)).toBe("…");
    expect(truncate("abc", 2)).toBe("a…");
  });

  it("trims trailing whitespace before ellipsis", () => {
    const result = truncate("hello   ", 6);
    expect(result).toBe("hello…");
  });
});

describe("formatDate", () => {
  it("returns 'Invalid date' for invalid input", () => {
    expect(formatDate("not-a-date")).toBe("Invalid date");
  });

  it("formats a valid ISO string", () => {
    // Use a fixed date so test is deterministic
    const iso = "2020-01-02T03:04:00.000Z";
    const formatted = formatDate(iso);
    // We can't assert exact string because of locale and tz; check key parts
    // Should include year, short month name, day, and time digits
    expect(formatted).toMatch(/2020/);
    expect(formatted).toMatch(/Jan|January|1/); // month representation varies by locale
    expect(formatted).toMatch(/02|2/);
    expect(formatted).toMatch(/03|04|AM|PM|am|pm|\d{2}:\d{2}/);
  });

  it("accepts Date and number inputs", () => {
    const date = new Date("2020-05-06T07:08:00.000Z");
    const millis = date.getTime();
    expect(formatDate(date)).toBeTypeOf("string");
    expect(formatDate(millis)).toBeTypeOf("string");
  });
});


