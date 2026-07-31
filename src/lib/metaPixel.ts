// Meta Pixel Event Tracking
export const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (typeof window !== "undefined" && "fbq" in window) {
    (window as Window & { fbq: (type: string, event: string, params?: Record<string, unknown>) => void }).fbq("track", eventName, params);
  }
};

export const trackPageView = () => {
  trackEvent("PageView");
};

export const trackDownloadCV = () => {
  trackEvent("Download_CV", { content_name: "Fernando_Moutinho_CV" });
};

export const trackStartPlayground = (playgroundType: "sql" | "js" | "git" | "python" | "docker") => {
  trackEvent("Start_Playground", { content_name: `playground_${playgroundType}` });
};
