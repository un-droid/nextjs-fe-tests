import { afterEach, describe, expect, it, vi } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useFetch } from "../useFetch";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("useFetch", () => {
  it("fetches immediately by default and sets data on success", async () => {
    const payload = { hello: "world" };
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => payload })
    );

    const { result } = renderHook(() => useFetch<typeof payload>("/api/test"));

    expect(result.current.status).toBe("loading");

    await waitFor(() => expect(result.current.status).toBe("success"));
    expect(result.current.data).toEqual(payload);
    expect(result.current.error).toBeNull();
  });

  it("does not fetch when immediate is false until run is called", async () => {
    const initial = { cached: true };
    const payload = { ok: true };
    const fetchMock = vi
      .fn()
      .mockResolvedValue({ ok: true, json: async () => payload });
    vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);
    const { result } = renderHook(() =>
      useFetch<typeof payload>("/api/slow", { immediate: false, initialData: { ...initial, ok: true } })
    );

    expect(result.current.status).toBe("idle");
    expect(result.current.data).toEqual({ ...initial, ok: true });

    await act(async () => {
      await result.current.run();
    });

    expect(fetchMock).toHaveBeenCalledWith("/api/slow", undefined);
    await waitFor(() => expect(result.current.status).toBe("success"));
    expect(result.current.data).toEqual(payload);
  });

  it("sets error when response is not ok", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 500 })
    );

    const { result } = renderHook(() => useFetch("/api/fail"));

    await waitFor(() => expect(result.current.status).toBe("error"));
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toContain("500");
  });

  it("does nothing when url is null (immediate still calls run, which returns early)", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

    const { result } = renderHook(() => useFetch<unknown>(null));

    // Immediate is true by default, but since url is null, status should stay idle
    expect(result.current.status).toBe("idle");

    // And no fetch should have happened due to early return
    expect(fetchMock).not.toHaveBeenCalled();

    // Even if run is called manually, it should still early-return and not fetch
    await act(async () => {
      await result.current.run();
    });
    expect(fetchMock).not.toHaveBeenCalled();
    expect(result.current.status).toBe("idle");
  });
});


