import { describe, expect, it } from "vitest";
import { buttonVariants } from "./button.js";

describe("buttonVariants token mapping", () => {
  it("uses elevated/scroll tokens for default and pill chrome", () => {
    const defaultClass = buttonVariants({ variant: "default" });
    const pillClass = buttonVariants({ variant: "pill" });
    expect(defaultClass).toContain("bg-[var(--fp-elevated)]");
    expect(defaultClass).toContain("text-[var(--fp-ink)]");
    expect(defaultClass).toContain("hover:bg-[var(--fp-scroll)]");
    expect(pillClass).toContain("bg-[var(--fp-elevated)]");
    expect(pillClass).toContain("text-[var(--fp-ink)]");
    expect(pillClass).toContain("hover:bg-[var(--fp-scroll)]");
  });

  it("uses cream-ink for cream button text instead of hairline", () => {
    const creamClass = buttonVariants({ variant: "cream" });
    expect(creamClass).toContain("bg-[var(--fp-cream)]");
    expect(creamClass).toContain("text-[var(--fp-cream-ink)]");
    expect(creamClass).not.toContain("--fp-hairline");
  });
});
