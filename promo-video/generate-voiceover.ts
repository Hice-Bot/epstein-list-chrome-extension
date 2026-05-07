import { writeFileSync, mkdirSync, existsSync } from "fs";

/**
 * Generate voiceover audio using ElevenLabs TTS API.
 *
 * Usage:
 *   node --env-file=.env generate-voiceover.ts
 *
 * Requires ELEVENLABS_API_KEY in .env
 */

const VOICE_ID = "onwK4e9ZLuTAKqWW03F9"; // "Daniel" — calm, measured male voice
const MODEL_ID = "eleven_multilingual_v2";

const SCRIPT = `Hundreds of names appear in the publicly released Epstein files — politicians, billionaires, celebrities, and public figures.

The Epstein List Highlighter is a Chrome extension that identifies these names on any webpage you visit. When a name is found, it's marked and linked directly to the Wikipedia documentation.

No data is collected. Nothing leaves your browser. It simply surfaces what's already in the public record.

Open source. Free. Available now.`;

async function generateVoiceover() {
    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
        console.error("ERROR: ELEVENLABS_API_KEY not found in environment.");
        console.error("Create a .env file with: ELEVENLABS_API_KEY=your_key_here");
        process.exit(1);
    }

    console.log("Generating voiceover with ElevenLabs...");
    console.log(`Voice: Daniel (${VOICE_ID})`);
    console.log(`Script length: ${SCRIPT.length} characters\n`);

    const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
        {
            method: "POST",
            headers: {
                "xi-api-key": apiKey,
                "Content-Type": "application/json",
                Accept: "audio/mpeg",
            },
            body: JSON.stringify({
                text: SCRIPT,
                model_id: MODEL_ID,
                voice_settings: {
                    stability: 0.7,
                    similarity_boost: 0.75,
                    style: 0.15,
                    use_speaker_boost: true,
                },
            }),
        }
    );

    if (!response.ok) {
        const error = await response.text();
        console.error(`ElevenLabs API error (${response.status}):`, error);
        process.exit(1);
    }

    const audioBuffer = Buffer.from(await response.arrayBuffer());

    const outDir = "public/voiceover";
    if (!existsSync(outDir)) {
        mkdirSync(outDir, { recursive: true });
    }

    const outPath = `${outDir}/narration.mp3`;
    writeFileSync(outPath, audioBuffer);

    console.log(`✓ Voiceover saved to ${outPath}`);
    console.log(`  File size: ${(audioBuffer.length / 1024).toFixed(1)} KB`);
}

generateVoiceover();
