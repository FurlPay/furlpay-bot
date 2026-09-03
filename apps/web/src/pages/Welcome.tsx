import { Trans } from "@lingui/react/macro";
import { useNavigate } from "react-router-dom";
import { WindowChrome } from "./WindowChrome";

export function WelcomePage() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-full flex-col bg-[var(--fp-page)]">
      <div className="app-drag flex gap-2 px-5 py-[18px]">
        <WindowChrome />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-11 pb-[90px]">
        <div className="flex items-center gap-[26px]">
          <div className="flex h-[88px] w-[88px] items-center justify-center gap-[13px] rounded-full bg-[var(--fp-elevated)]">
            <span className="h-6 w-[11px] rounded-full bg-[var(--fp-inset)]" />
            <span className="h-6 w-[11px] rounded-full bg-[var(--fp-inset)]" />
          </div>
          <div className="text-[76px] leading-none tracking-[-0.03em] text-[var(--fp-ink)]">
            FurlPay Bot
          </div>
        </div>
        <p className="max-w-[600px] text-center text-[27px] leading-[1.4] text-[var(--fp-soft)]">
          <Trans>
            Your team of always-on agents
            <br />
            that you can give real work to.
          </Trans>
        </p>
        <button
          type="button"
          onClick={() => navigate("/sign-in")}
          className="app-no-drag rounded-full bg-[var(--fp-elevated)] px-[34px] py-[15px] text-[19px] text-[var(--fp-ink)] transition hover:scale-[1.04] hover:bg-[var(--fp-scroll)]"
        >
          <Trans>Sign in&nbsp;&nbsp;→</Trans>
        </button>
      </div>
    </div>
  );
}
