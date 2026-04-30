import { useState } from "react";
import { Phone } from "lucide-react";

const PHONE_NUMBER = "+21652757510";
const PHONE_DISPLAY = "(+216) 52 757 510";

const FloatingCallButton = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <style>{`
        /* ── Wrapper ── */
        .fcb-wrapper {
          position: fixed;
          bottom: 32px;
          right: 28px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
          pointer-events: none;
        }

        /* ── Tooltip card ── */
        .fcb-tooltip {
          pointer-events: none;
          background: rgba(255, 255, 255, 0.97);
          border: 1px solid rgba(37, 211, 102, 0.22);
          border-radius: 18px;
          padding: 12px 18px;
          box-shadow:
            0 8px 32px rgba(37, 211, 102, 0.18),
            0 2px 8px rgba(0,0,0,0.08);
          transform: translateY(8px) scale(0.94);
          opacity: 0;
          transition:
            opacity 0.28s cubic-bezier(.22,1,.36,1),
            transform 0.28s cubic-bezier(.22,1,.36,1);
          min-width: 200px;
          text-align: right;
        }
        .fcb-tooltip.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .fcb-tooltip-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #25D366;
          margin-bottom: 3px;
        }
        .fcb-tooltip-title {
          font-size: 13.5px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 1px;
        }
        .fcb-tooltip-number {
          font-size: 17px;
          font-weight: 800;
          color: #25D366;
          letter-spacing: 0.03em;
        }

        /* ── Main button ── */
        .fcb-btn {
          pointer-events: all;
          display: flex;
          align-items: center;
          gap: 0;
          height: 60px;
          border-radius: 30px;
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
          border: none;
          cursor: pointer;
          box-shadow:
            0 6px 24px rgba(37, 211, 102, 0.45),
            0 2px 8px rgba(0,0,0,0.12);
          overflow: hidden;
          text-decoration: none;
          color: #fff;
          position: relative;
          transition:
            box-shadow 0.3s ease,
            transform 0.25s cubic-bezier(.22,1,.36,1),
            width 0.38s cubic-bezier(.22,1,.36,1),
            padding 0.38s cubic-bezier(.22,1,.36,1);
          width: 60px;
          padding: 0;
          will-change: width;
        }
        .fcb-btn:hover, .fcb-btn.expanded {
          width: 240px;
          padding: 0 20px;
          transform: translateY(-3px) scale(1.03);
          box-shadow:
            0 12px 40px rgba(37, 211, 102, 0.55),
            0 4px 16px rgba(0,0,0,0.15);
        }
        .fcb-btn:active {
          transform: translateY(-1px) scale(0.99);
        }

        /* ── Icon container ── */
        .fcb-icon-wrap {
          width: 60px;
          min-width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          position: relative;
        }
        .fcb-icon {
          transition: transform 0.3s ease;
          position: relative;
          z-index: 1;
        }
        .fcb-btn:hover .fcb-icon, .fcb-btn.expanded .fcb-icon {
          transform: rotate(-15deg) scale(1.1);
        }

        /* ── Text inside button ── */
        .fcb-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          overflow: hidden;
          white-space: nowrap;
          opacity: 0;
          transform: translateX(-8px);
          transition:
            opacity 0.22s ease 0.1s,
            transform 0.26s ease 0.1s;
          flex: 1;
        }
        .fcb-btn:hover .fcb-text, .fcb-btn.expanded .fcb-text {
          opacity: 1;
          transform: translateX(0);
        }
        .fcb-text-top {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.8);
          line-height: 1;
          margin-bottom: 3px;
        }
        .fcb-text-num {
          font-size: 14.5px;
          font-weight: 800;
          color: #fff;
          letter-spacing: 0.04em;
          line-height: 1;
        }

        /* ── Pulse ring animation ── */
        .fcb-pulse-ring {
          position: absolute;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 2.5px solid rgba(37, 211, 102, 0.55);
          animation: fcb-pulse 2.2s cubic-bezier(0.24, 0, 0.38, 1) infinite;
          pointer-events: none;
          right: 0;
          bottom: 0;
        }
        .fcb-pulse-ring:nth-child(2) {
          animation-delay: 0.75s;
          border-color: rgba(18, 140, 126, 0.4);
        }

        @keyframes fcb-pulse {
          0% {
            transform: scale(1);
            opacity: 0.9;
          }
          70% {
            transform: scale(1.75);
            opacity: 0;
          }
          100% {
            transform: scale(1.75);
            opacity: 0;
          }
        }

        /* ── Shine sweep ── */
        .fcb-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            110deg,
            transparent 20%,
            rgba(255,255,255,0.25) 50%,
            transparent 80%
          );
          transform: translateX(-100%);
          transition: transform 0s;
        }
        .fcb-btn:hover::after {
          transform: translateX(100%);
          transition: transform 0.55s ease;
        }

        /* ── Dark mode overrides ── */
        :root:not(.light) .fcb-tooltip {
          background: rgba(20, 30, 50, 0.97);
          border-color: rgba(30, 100, 220, 0.3);
        }
        :root:not(.light) .fcb-tooltip-title {
          color: #e2e8f0;
        }
      `}</style>

      <div className="fcb-wrapper">
        {/* Hover tooltip card */}
        <div className={`fcb-tooltip ${hovered ? "visible" : ""}`}>
          <div className="fcb-tooltip-label">Want to move?</div>
          <div className="fcb-tooltip-title">Call us now</div>
          <div className="fcb-tooltip-number">{PHONE_DISPLAY}</div>
        </div>

        {/* Main button */}
        <div style={{ position: "relative" }}>
          {/* Pulse rings */}
          <div className="fcb-pulse-ring" />
          <div className="fcb-pulse-ring" />

          <a
            href={`tel:${PHONE_NUMBER}`}
            className={`fcb-btn ${hovered ? "expanded" : ""}`}
            aria-label={`Call us: ${PHONE_DISPLAY}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div className="fcb-icon-wrap">
              <Phone className="fcb-icon" size={24} strokeWidth={2.2} />
            </div>
            <div className="fcb-text">
              <span className="fcb-text-top">Want to move?</span>
              <span className="fcb-text-num">{PHONE_DISPLAY}</span>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default FloatingCallButton;
