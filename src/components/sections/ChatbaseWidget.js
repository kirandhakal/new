import { useEffect } from "react";

const CHATBASE_WIDGET_CLASS = "chatbase-widget-mobile-friendly";
const CHATBASE_EMBED_SCRIPT_ID = "g7aH1d7ivPsHoIu1S3ToV";

function markChatbaseWidgetForMobile() {
  if (typeof document === "undefined") return;
  
  // 1. Target by common Chatbase IDs
  const chatbaseIds = ['chatbase-bubble-button', 'chatbase-bubble-window', 'chatbase-message-container'];
  chatbaseIds.forEach(id => {
    const el = document.getElementById(id);
    if (el && !el.classList.contains(CHATBASE_WIDGET_CLASS)) {
      el.classList.add(CHATBASE_WIDGET_CLASS);
    }
  });

  // 2. Find Chatbase widget: iframe from chatbase or fixed-position container that looks like a chat widget
  const iframes = document.querySelectorAll('iframe[src*="chatbase"], iframe[src*="chatbase.co"]');
  for (const iframe of iframes) {
    // Check parents for a fixed container
    let parent = iframe.parentElement;
    while (parent && parent !== document.body) {
      if (window.getComputedStyle(parent).position === 'fixed') {
        if (!parent.classList.contains(CHATBASE_WIDGET_CLASS)) {
          parent.classList.add(CHATBASE_WIDGET_CLASS);
          parent.setAttribute("data-chatbase-host", "true");
        }
        break;
      }
      parent = parent.parentElement;
    }
    
    // Also mark the iframe itself just in case
    if (!iframe.classList.contains(CHATBASE_WIDGET_CLASS)) {
      iframe.classList.add(CHATBASE_WIDGET_CLASS);
    }
  }

  // 3. Also catch fixed entities that might be the chat bubble
  const allFixed = document.querySelectorAll('button, div');
  allFixed.forEach((el) => {
    if (window.getComputedStyle(el).position === 'fixed') {
      const isChatbase = el.id?.includes("chatbase") || 
                         el.className?.toString().includes("chatbase") ||
                         el.innerHTML?.includes("chatbase");
      
      if (isChatbase && !el.classList.contains(CHATBASE_WIDGET_CLASS)) {
        el.classList.add(CHATBASE_WIDGET_CLASS);
        el.setAttribute("data-chatbase-host", "true");
      }
    }
  });
}

const ChatbaseWidget = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Chatbase may set `window.chatbase` to a non-function; don't call it unless safe.
    let isInitialized = false;
    if (typeof window.chatbase === "function") {
      try {
        isInitialized = window.chatbase("getState") === "initialized";
      } catch {
        isInitialized = false;
      }
    }

    if (!isInitialized) {
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

    // Avoid double-injecting in React StrictMode / route remounts.
    let didAppendScript = false;
    let t1;
    let t2;
    const existing = document.getElementById(CHATBASE_EMBED_SCRIPT_ID);
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = CHATBASE_EMBED_SCRIPT_ID;
      script.setAttribute("domain", "www.chatbase.co");
      script.async = true;

      script.onload = () => {
        markChatbaseWidgetForMobile();
        // Widget may render after a short delay
        t1 = setTimeout(markChatbaseWidgetForMobile, 500);
        t2 = setTimeout(markChatbaseWidgetForMobile, 1500);
      };

      document.body.appendChild(script);
      didAppendScript = true;
    } else {
      // Script already present; still try to apply mobile-friendly class.
      markChatbaseWidgetForMobile();
      t1 = setTimeout(markChatbaseWidgetForMobile, 500);
      t2 = setTimeout(markChatbaseWidgetForMobile, 1500);
    }

    const observer = new MutationObserver(() => markChatbaseWidgetForMobile());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (t1) clearTimeout(t1);
      if (t2) clearTimeout(t2);
      if (didAppendScript) document.getElementById(CHATBASE_EMBED_SCRIPT_ID)?.remove();
      observer.disconnect();
    };
  }, []);

  return null;
};

export default ChatbaseWidget;
