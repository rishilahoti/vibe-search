/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function findPropertiesByVibe(
	vibeDescription: string,
	properties: any[]
): Promise<any[]> {
	const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

	const prompt = `You're a real estate vibe matchmaker. Analyze this property dataset:${JSON.stringify(
		properties
	)} 
    User's vibe request: "${vibeDescription}"
    Respond STRICTLY in JSON format: 
    {
        matches:
        [{
            id: number,
            relevanceScore: 1-10,
            matchReasons: string[]
        }]
    }
`;

	const result = await model.generateContent(prompt);
	const response = await result.response;

	try {
		const jsonString = response.text().replace(/```json|```/g, '');
		return JSON.parse(jsonString).matches.sort(
			(a: any, b: any) => b.relevanceScore - a.relevanceScore
		);
	} catch (error) {
		console.error('Parsing error:', error);
		return [];
	}
}
