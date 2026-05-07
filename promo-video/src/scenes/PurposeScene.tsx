import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";

const LINES = [
    "Hundreds of names appear in the",
    "publicly released Epstein files.",
    "",
    "Politicians. Billionaires.",
    "Celebrities. Public figures.",
];

export const PurposeScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

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
            {LINES.map((line, i) => {
                if (line === "") {
                    return <div key={i} style={{ height: 24 }} />;
                }

                const startFrame = fps * 0.6 * i;
                const opacity = interpolate(
                    frame,
                    [startFrame, startFrame + fps * 0.8],
                    [0, 1],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                );

                const translateY = interpolate(
                    frame,
                    [startFrame, startFrame + fps * 0.8],
                    [12, 0],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                );

                const isEmphasis = i >= 3;

                return (
                    <div
                        key={i}
                        style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: isEmphasis ? 36 : 40,
                            fontWeight: isEmphasis ? 400 : 300,
                            color: isEmphasis ? "#c0392b" : "#d0d0d0",
                            opacity,
                            transform: `translateY(${translateY}px)`,
                            lineHeight: 1.6,
                            textAlign: "center",
                            letterSpacing: isEmphasis ? "0.04em" : "-0.01em",
                        }}
                    >
                        {line}
                    </div>
                );
            })}
        </AbsoluteFill>
    );
};
