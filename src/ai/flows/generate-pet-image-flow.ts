
'use server';
/**
 * @fileOverview AI flow to generate a pixel art pet image.
 *
 * - generatePetImage - A function that generates a pet image based on a type.
 * - GeneratePetImageInput - The input type for the generatePetImage function.
 * - GeneratePetImageOutput - The return type for the generatePetImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePetImageInputSchema = z.object({
  petType: z.string().describe('The type or description of the pet to generate. e.g., "cute pixel dog", "fluffy space cat".'),
});
export type GeneratePetImageInput = z.infer<typeof GeneratePetImageInputSchema>;

const GeneratePetImageOutputSchema = z.object({
  imageDataUri: z.string().describe("The generated image as a data URI. Expected format: 'data:image/png;base64,<encoded_data>'."),
});
export type GeneratePetImageOutput = z.infer<typeof GeneratePetImageOutputSchema>;

// This is the exported function clients will call
export async function generatePetImage(input: GeneratePetImageInput): Promise<GeneratePetImageOutput | null> {
  try {
    const result = await petImageGenerationFlow(input);
    return result;
  } catch (error) {
    console.error("Error in generatePetImage flow:", error);
    // Optionally, you could return a default placeholder image URI here or throw a custom error
    return null; 
  }
}

// Internal Genkit flow definition
const petImageGenerationFlow = ai.defineFlow(
  {
    name: 'petImageGenerationFlow',
    inputSchema: GeneratePetImageInputSchema,
    outputSchema: GeneratePetImageOutputSchema,
  },
  async (input) => {
    console.log(`Generating image for petType: ${input.petType}`);
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-exp', // Specific model for image generation
      prompt: `Generate a unique, friendly, pixel art style image of a ${input.petType}. The image should be suitable for a virtual pet in a game, centered, with a transparent or very simple, non-distracting background. It should look like a classic pixel art game character.`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'], // Must include both
        safetySettings: [ // Added safety settings to be less restrictive for creative content
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
        ],
      },
    });

    if (!media?.url) {
      console.error('Image generation failed or returned no media URL.');
      throw new Error('Image generation failed or returned no media URL.');
    }
    console.log(`Image generated successfully: ${media.url.substring(0,100)}...`);
    return {imageDataUri: media.url};
  }
);

