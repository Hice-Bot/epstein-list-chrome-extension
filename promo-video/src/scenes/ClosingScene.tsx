import React from "react";
import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";

export const ClosingScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Dot
    const dotScale = spring({
        frame,
        fps,
        config: { damping: 200 },
        durationInFrames: Math.round(fps * 0.6),
    });

    // Main line
    const mainOpacity = interpolate(frame, [fps * 0.4, fps * 1.4], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const mainY = interpolate(frame, [fps * 0.4, fps * 1.4], [15, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // URL
    const urlOpacity = interpolate(frame, [fps * 1.8, fps * 2.8], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // Divider
    const lineWidth = interpolate(frame, [fps * 1.2, fps * 2], [0, 160], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // Tagline
    const tagOpacity = interpolate(frame, [fps * 2.5, fps * 3.5], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill
            style={{
                backgroundColor: "#0a0a0a",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {/* Red dot */}
            <div
                style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: "#c0392b",
                    transform: `scale(${dotScale})`,
                    marginBottom: 24,
                }}
            />

            {/* Title */}
            <div
                style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 48,
                    fontWeight: 700,
                    color: "#e8e8e8",
                    letterSpacing: "-0.03em",
                    opacity: mainOpacity,
                    transform: `translateY(${mainY}px)`,
                }}
            >
                Epstein List Highlighter
            </div>

            {/* Divider */}
            <div
                style={{
                    width: lineWidth,
                    height: 1,
                    backgroundColor: "#333",
                    marginTop: 20,
                    marginBottom: 20,
                }}
            />

            {/* URL */}
            <div
                style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 22,
                    fontWeight: 300,
                    color: "#c0392b",
                    opacity: urlOpacity,
                    letterSpacing: "0.02em",
                }}
            >
                epsteinlist.info
            </div>

            {/* Tagline */}
            <div
                style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 18,
                    fontWeight: 300,
                    color: "#666",
                    marginTop: 40,
                    opacity: tagOpacity,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                }}
            >
                Open source · Free · Available now
            </div>
        </AbsoluteFill>
    );
};
