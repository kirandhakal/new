import { useEffect } from "react";

const ChatbaseWidget = () => {
  useEffect(() => {
    // Initialize chatbase proxy if not already initialized
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

    // Load Chatbase script
    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.id = "g7aH1d7ivPsHoIu1S3ToV";
    script.setAttribute("domain", "www.chatbase.co");
    script.async = true;

    document.body.appendChild(script);

    // Cleanup (React hygiene, enterprise-grade)
    return () => {
      document.getElementById("g7aH1d7ivPsHoIu1S3ToV")?.remove();
    };
  }, []);

  return null; // No UI, pure side-effects
};

export default ChatbaseWidget;
