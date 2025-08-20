import { NextRequest, NextResponse } from 'next/server';
import { findPropertiesByVibe } from '@/lib/gemini';
import enhancedProperties from '@/data/enhancedProperties.json';

interface Property {
	id: string;
	ProjectName: string;
	Developer: string;
	PropertyType: string;
	AssetType: string;
	SizeRange: string;
	StartingPrice: string;
	Micromarket: string;
	Majormarket: string;
	Status: string;
	PlantationType: string;
	RERAID: string;
	TotalUnits: string;
	WebsiteLink: string;
	vibeDescriptors: string[];
	vibeSummary: string;
}
interface Match {
	id: string;
	score?: number;
}

export async function POST(req: NextRequest) {
	try {
		const { message } = await req.json();
		if (!message || typeof message !== 'string') {
			return NextResponse.json(
				{ error: 'Message is required and must be a string' },
				{ status: 400 }
			);
		}
		console.log('Received vibe search:', message);

		const matches: Match[] = await findPropertiesByVibe(
			message,
			enhancedProperties as Property[]
		);

		const fullProperties: Property[] = matches
			.map((match) =>
				(enhancedProperties as Property[]).find(
					(p) => p.id === match.id
				)
			)
			.filter((p): p is Property => Boolean(p));

		console.log('Found matches:', matches.length);

		return NextResponse.json({
			success: true,
			results: fullProperties,
			matchData: matches,
			query: message,
		});
	} catch (error) {
		console.error('Vibe search error:', error);
		return NextResponse.json(
			{
				success: false,
				error: 'Vibe search failed. Please try again.',
				results: [],
				matchData: [],
			},
			{ status: 500 }
		);
	}
}

export async function GET() {
	return NextResponse.json({
		message: 'Vibe search API is running',
		status: 'OK',
		timestamp: new Date().toISOString(),
	});
}
