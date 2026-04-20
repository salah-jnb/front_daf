import React from "react";

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

/**
 * Detects if an error is caused by a stale chunk (e.g. after a new deployment
 * where chunk hashes changed but the browser has a cached index.html).
 */
function isChunkLoadError(error: Error): boolean {
  const msg = error?.message || "";
  return (
    msg.includes("Failed to fetch dynamically imported module") ||
    msg.includes("Loading chunk") ||
    msg.includes("Loading CSS chunk") ||
    msg.includes("Importing a module script failed")
  );
}

const RELOAD_KEY = "chunk_reload_attempted";

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Unhandled application error", error, errorInfo);

    // If it's a stale chunk error, auto-reload once to get fresh assets
    if (isChunkLoadError(error)) {
      const alreadyReloaded = sessionStorage.getItem(RELOAD_KEY);
      if (!alreadyReloaded) {
        sessionStorage.setItem(RELOAD_KEY, "1");
        window.location.reload();
        return;
      }
      // If we already tried reloading, clear the flag and show UI
      sessionStorage.removeItem(RELOAD_KEY);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-2xl font-bold mb-3">Something went wrong</h1>
          <p className="text-muted-foreground mb-6">
            An unexpected error occurred. Please refresh the page.
          </p>
          <button
            type="button"
            onClick={() => {
              sessionStorage.removeItem(RELOAD_KEY);
              window.location.reload();
            }}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground"
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
