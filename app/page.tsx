import DarkVeil from './components/DarkVeil';
import VibeSearch from './components/VibeSearch';
import React from 'react';
import { Announcement } from './components/AnimateBadge';
import GradientText from './components/Text';

export default function Home() {
    return (
        <main>
            <section className="w-full h-screen text-center p-5 gap-y-2.5 flex flex-col items-center justify-center mx-auto">
                <Announcement />
                <GradientText
                    colors={["#e2d4ff", "#ffd5fb", "#ffd7d7", "#e2fff9"]}
                    animationSpeed={10}
                    showBorder={false}
                    className='text-4xl'
                >
                    Find Your Dream Property Vibe
                </GradientText>
                <p className="text-lg text-white mx-auto">
                    Describe your perfect atmosphere and discover properties that match your lifestyle energy.
                    No filters, just vibes.
                </p>
                <VibeSearch />
            </section>
            <section className="absolute inset-0 -z-10">
                <DarkVeil />
            </section>
        </main>
    );
}