import { Composition } from "remotion";
import { PromoVideo } from "./PromoVideo";

export const RemotionRoot = () => {
    return (
        <Composition
            id="EpsteinListPromo"
            component={PromoVideo}
            durationInFrames={30 * 35}
            fps={30}
            width={1920}
            height={1080}
            defaultProps={{
                voiceoverFile: "voiceover/narration.mp3",
            }}
        />
    );
};
