import React from "react";
import {
    AbsoluteFill,
    Audio,
    staticFile,
    useVideoConfig,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { TitleScene } from "./scenes/TitleScene";
import { PurposeScene } from "./scenes/PurposeScene";
import { DemoScene } from "./scenes/DemoScene";
import { PrivacyScene } from "./scenes/PrivacyScene";
import { ClosingScene } from "./scenes/ClosingScene";

export type PromoVideoProps = {
    voiceoverFile: string;
};

export const PromoVideo: React.FC<PromoVideoProps> = ({ voiceoverFile }) => {
    const { fps } = useVideoConfig();

    const TRANSITION_FRAMES = Math.round(fps * 0.8);

    const scene1 = Math.round(fps * 5);
    const scene2 = Math.round(fps * 8);
    const scene3 = Math.round(fps * 10);
    const scene4 = Math.round(fps * 7);
    const scene5 = Math.round(fps * 5);

    return (
        <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
            {/* Voiceover — drop your MP3 at public/voiceover/narration.mp3 */}
            <Audio src={staticFile(voiceoverFile)} volume={1} />

            <TransitionSeries>
                <TransitionSeries.Sequence durationInFrames={scene1}>
                    <TitleScene />
                </TransitionSeries.Sequence>

                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
                />

                <TransitionSeries.Sequence durationInFrames={scene2}>
                    <PurposeScene />
                </TransitionSeries.Sequence>

                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
                />

                <TransitionSeries.Sequence durationInFrames={scene3}>
                    <DemoScene />
                </TransitionSeries.Sequence>

                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
                />

                <TransitionSeries.Sequence durationInFrames={scene4}>
                    <PrivacyScene />
                </TransitionSeries.Sequence>

                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
                />

                <TransitionSeries.Sequence durationInFrames={scene5}>
                    <ClosingScene />
                </TransitionSeries.Sequence>
            </TransitionSeries>
        </AbsoluteFill>
    );
};
