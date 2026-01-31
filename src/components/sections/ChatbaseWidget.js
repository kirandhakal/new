import { useEffect } from "react";

const CHATBASE_WIDGET_CLASS = "chatbase-widget-mobile-friendly";

function markChatbaseWidgetForMobile() {
  if (typeof document === "undefined") return;
  // Find Chatbase widget: iframe from chatbase or fixed-position container that looks like a chat widget
  const iframes = document.querySelectorAll('iframe[src*="chatbase"], iframe[src*="chatbase.co"]');
  for (const iframe of iframes) {
    const container = iframe.closest("div");
    if (container && !container.classList.contains(CHATBASE_WIDGET_CLASS)) {
      container.classList.add(CHATBASE_WIDGET_CLASS);
      container.setAttribute("data-chatbase-host", "true");
    }
  }
  // Also catch fixed bottom-right divs that might wrap the widget (button + iframe)
  const fixedDivs = document.querySelectorAll('body > div[style*="position: fixed"], body > div[style*="position:fixed"]');
  fixedDivs.forEach((div) => {
    const hasChatbase = div.querySelector('iframe[src*="chatbase"]') || div.innerHTML.includes("chatbase");
    if (hasChatbase && !div.classList.contains(CHATBASE_WIDGET_CLASS)) {
      div.classList.add(CHATBASE_WIDGET_CLASS);
      div.setAttribute("data-chatbase-host", "true");
    }
  });
}

const ChatbaseWidget = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!window.chatbase || window.chatbase("getState") !== "initialized") {
      window.chatbase = (...args) => {
        if (!window.chatbase.q) {
          window.chatbase.q = [];
        }
        window.chatbase.q.push(args);
      };

      window.chatbase = new Proxy(window.chatbase, {
        get(target, prop) {
          if (prop === "q") return target.q;
          return (...args) => target(prop, ...args);
        },
      });
    }

    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.id = "g7aH1d7ivPsHoIu1S3ToV";
    script.setAttribute("domain", "www.chatbase.co");
    script.async = true;

    script.onload = () => {
      markChatbaseWidgetForMobile();
      // Widget may render after a short delay
      const t1 = setTimeout(markChatbaseWidgetForMobile, 500);
      const t2 = setTimeout(markChatbaseWidgetForMobile, 1500);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    };

    document.body.appendChild(script);

    const observer = new MutationObserver(() => markChatbaseWidgetForMobile());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.getElementById("g7aH1d7ivPsHoIu1S3ToV")?.remove();
      observer.disconnect();
    };
  }, []);

  return null;
};

export default ChatbaseWidget;
