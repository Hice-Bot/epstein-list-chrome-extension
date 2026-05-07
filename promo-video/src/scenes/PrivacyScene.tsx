import React from "react";
import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";

const POINTS = [
    { icon: "🔒", text: "No data is collected" },
    { icon: "🌐", text: "Nothing leaves your browser" },
    { icon: "📂", text: "Fully open source" },
];

export const PrivacyScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Header
    const headerOpacity = interpolate(frame, [0, fps * 0.8], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // Subheader
    const subOpacity = interpolate(frame, [fps * 0.5, fps * 1.3], [0, 1], {
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
                padding: 80,
            }}
        >
            {/* Header */}
            <div
                style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 44,
                    fontWeight: 600,
                    color: "#e8e8e8",
                    letterSpacing: "-0.02em",
                    marginBottom: 12,
                    opacity: headerOpacity,
                }}
            >
                Built for privacy.
            </div>

            <div
                style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 22,
                    fontWeight: 300,
                    color: "#777",
                    marginBottom: 64,
                    opacity: subOpacity,
                }}
            >
                Everything runs locally in your browser.
            </div>

            {/* Privacy points */}
            <div style={{ display: "flex", gap: 60 }}>
                {POINTS.map((point, i) => {
                    const delay = fps * 1.5 + i * fps * 0.8;
                    const pointSpring = spring({
                        frame: frame - delay,
                        fps,
                        config: { damping: 200 },
                        durationInFrames: Math.round(fps * 0.8),
                    });

                    const pointOpacity = interpolate(
                        frame,
                        [delay, delay + fps * 0.6],
                        [0, 1],
                        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                    );

                    return (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 16,
                                opacity: pointOpacity,
                                transform: `translateY(${(1 - pointSpring) * 20}px)`,
                            }}
                        >
                            <div
                                style={{
                                    width: 72,
                                    height: 72,
                                    borderRadius: 16,
                                    backgroundColor: "rgba(192, 57, 43, 0.12)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 32,
                                }}
                            >
                                {point.icon}
                            </div>
                            <div
                                style={{
                                    fontFamily: "Inter, sans-serif",
                                    fontSize: 20,
                                    fontWeight: 400,
                                    color: "#ccc",
                                }}
                            >
                                {point.text}
                            </div>
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};
