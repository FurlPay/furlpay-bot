import { describe, expect, it } from "vitest";
import { shouldOpenInAppPopup } from "./window-open.js";

const appOrigin = "https://furlpay-bot.example.com";

describe("desktop child windows", () => {
  it("keeps same-origin app routes in Electron", () => {
    expect(shouldOpenInAppPopup(appOrigin, `${appOrigin}/mcp/oauth/callback`, "_blank")).toBe(true);
  });

  it("opens ordinary external links outside Electron", () => {
    expect(
      shouldOpenInAppPopup(appOrigin, "https://github.com/FurlPay/furlpay-bot/pull/395", "_blank"),
    ).toBe(false);
  });

  it.each([
    "furlpay-bot-model-oauth",
    "furlpay-bot-mcp-oauth",
    "furlpay-bot-app-connect",
    "furlpay-bot-plugin-connect",
  ])("keeps the intentional %s flow in an Electron popup", (frameName) => {
    expect(
      shouldOpenInAppPopup(appOrigin, "https://provider.example.com/authorize", frameName),
    ).toBe(true);
  });

  it("rejects malformed URLs and non-HTTPS third-party targets", () => {
    expect(shouldOpenInAppPopup(appOrigin, "not a url", "furlpay-bot-model-oauth")).toBe(false);
    expect(
      shouldOpenInAppPopup(appOrigin, "http://provider.example.com", "furlpay-bot-model-oauth"),
    ).toBe(false);
  });
});
