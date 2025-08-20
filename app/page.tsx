import DarkVeil from './components/DarkVeil';
import VibeSearch from './components/VibeSearch';
import React from 'react';
import { Announcement } from './components/AnimateBadge';
import GradientText from './components/Text';

export default function Home() {
    return (
        <main className="relative min-h-screen flex flex-col">
            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center text-center px-4 py-12 gap-4 flex-1">
                <Announcement />

                <GradientText
                    colors={["#e2d4ff", "#ffd5fb", "#ffd7d7", "#e2fff9"]}
                    animationSpeed={10}
                    showBorder={false}
                    className="text-2xl sm:text-4xl font-semibold leading-snug"
                >
                    Find Your Dream Property Vibe
                </GradientText>

                <p className="text-base sm:text-lg text-white max-w-md">
                    Describe your perfect atmosphere and discover properties that match your lifestyle energy.
                    No filters, just vibes.
                </p>

                <div className="w-full max-w-5xl">
                    <VibeSearch />
                </div>
            </section>

            {/* Background */}
            <section className="absolute inset-0 -z-10">
                <DarkVeil />
            </section>
        </main>
    );
}
