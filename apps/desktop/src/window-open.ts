const OAUTH_POPUP_NAMES = new Set([
  "furlpay-bot-app-connect",
  "furlpay-bot-mcp-oauth",
  "furlpay-bot-model-oauth",
  "furlpay-bot-plugin-connect",
]);

export function shouldOpenInAppPopup(
  appOrigin: string | null,
  childUrl: string,
  frameName: string,
) {
  let target: URL;
  try {
    target = new URL(childUrl);
  } catch {
    return false;
  }

  const isHttp = target.protocol === "http:" || target.protocol === "https:";
  if (appOrigin !== null && target.origin === appOrigin) return isHttp;
  return target.protocol === "https:" && OAUTH_POPUP_NAMES.has(frameName);
}
