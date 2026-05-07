import React from "react";
import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";

export const TitleScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Red dot scales in with spring
    const dotScale = spring({
        frame,
        fps,
        config: { damping: 200 },
        durationInFrames: Math.round(fps * 1),
    });

    // Title fades in after dot
    const titleOpacity = interpolate(frame, [fps * 0.8, fps * 2], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const titleY = interpolate(frame, [fps * 0.8, fps * 2], [20, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // Subtitle fades in later
    const subtitleOpacity = interpolate(frame, [fps * 2.2, fps * 3.2], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // Thin horizontal line grows from center
    const lineWidth = interpolate(frame, [fps * 1.5, fps * 2.5], [0, 200], {
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
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    backgroundColor: "#c0392b",
                    transform: `scale(${dotScale})`,
                    marginBottom: 28,
                }}
            />

            {/* Title */}
            <div
                style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 64,
                    fontWeight: 700,
                    color: "#e8e8e8",
                    letterSpacing: "-0.03em",
                    opacity: titleOpacity,
                    transform: `translateY(${titleY}px)`,
                }}
            >
                Epstein List Highlighter
            </div>

            {/* Divider line */}
            <div
                style={{
                    width: lineWidth,
                    height: 1,
                    backgroundColor: "#333",
                    marginTop: 24,
                    marginBottom: 24,
                }}
            />

            {/* Subtitle */}
            <div
                style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 22,
                    fontWeight: 300,
                    color: "#888",
                    opacity: subtitleOpacity,
                    letterSpacing: "0.02em",
                }}
            >
                A Chrome Extension
            </div>
        </AbsoluteFill>
    );
};
