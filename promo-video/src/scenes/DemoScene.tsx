import React from "react";
import {
    AbsoluteFill,
    Img,
    interpolate,
    spring,
    staticFile,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";

export const DemoScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Label fades in
    const labelOpacity = interpolate(frame, [0, fps * 0.6], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // First screenshot scales in with spring
    const img1Scale = spring({
        frame: frame - Math.round(fps * 0.5),
        fps,
        config: { damping: 200 },
        durationInFrames: Math.round(fps * 1),
    });

    const img1Opacity = interpolate(
        frame,
        [fps * 0.5, fps * 1.2],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    // Second screenshot comes in after first
    const img2Scale = spring({
        frame: frame - Math.round(fps * 5),
        fps,
        config: { damping: 200 },
        durationInFrames: Math.round(fps * 1),
    });

    const img2Opacity = interpolate(
        frame,
        [fps * 5, fps * 5.7],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    // Show first image from 0-5s, second from 5+
    const showSecond = frame > fps * 4.5;

    return (
        <AbsoluteFill
            style={{
                backgroundColor: "#0a0a0a",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 60,
            }}
        >
            {/* Label */}
            <div
                style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#c0392b",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    marginBottom: 32,
                    opacity: labelOpacity,
                }}
            >
                How it works
            </div>

            {/* Screenshot container */}
            <div
                style={{
                    position: "relative",
                    width: 1400,
                    height: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {/* Screenshot 1 — hero banner */}
                {!showSecond && (
                    <div
                        style={{
                            borderRadius: 12,
                            overflow: "hidden",
                            border: "1px solid #333",
                            boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                            transform: `scale(${img1Scale})`,
                            opacity: img1Opacity,
                        }}
                    >
                        <Img
                            src={staticFile("images/hero-banner.png")}
                            style={{ width: 1300, height: "auto" }}
                        />
                    </div>
                )}

                {/* Screenshot 2 — Wikipedia */}
                {showSecond && (
                    <div
                        style={{
                            borderRadius: 12,
                            overflow: "hidden",
                            border: "1px solid #333",
                            boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                            transform: `scale(${img2Scale})`,
                            opacity: img2Opacity,
                        }}
                    >
                        <Img
                            src={staticFile("images/screenshot-wikipedia.png")}
                            style={{ width: 1300, height: "auto" }}
                        />
                    </div>
                )}
            </div>

            {/* Caption text */}
            <div
                style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 20,
                    fontWeight: 300,
                    color: "#888",
                    marginTop: 28,
                    opacity: interpolate(frame, [fps * 1.5, fps * 2.5], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    }),
                }}
            >
                {showSecond
                    ? "Names linked directly to Wikipedia documentation"
                    : "Names identified and highlighted automatically"}
            </div>
        </AbsoluteFill>
    );
};
