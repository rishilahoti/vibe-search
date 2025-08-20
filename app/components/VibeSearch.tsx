'use client';
import { useState, useRef, useEffect } from 'react';
import SpotlightCard from './Card';
import { cn } from '@/lib/utils';

type VibeMatch = {
    id: string;
    relevanceScore: number;
    matchReasons: string[];
};

type Property = {
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
    vibeDescriptors: string[];
    vibeSummary: string;
    WebsiteLink: string;
};

export default function VibeSearch() {
    const [messages, setMessages] = useState<{ id: string, content: string, role: 'user' | 'system' }[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<Property[]>([]);
    const [matchData, setMatchData] = useState<VibeMatch[]>([]);
    const endRef = useRef<HTMLDivElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        setResults([]);
        setMatchData([]);
        const userMessage = {
            id: Date.now().toString(),
            content: input,
            role: 'user' as const
        };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input })
            });

            const data = await response.json();
            console.log("API response:", data);

            if (data.success && data.results && data.results.length > 0) {
                setResults(data.results);
                setMatchData(data.matchData || []);
                setMessages(prev => [...prev, {
                    id: `res-${Date.now()}`,
                    content: `✨ Found ${data.results.length} properties matching your vibe!`,
                    role: 'system'
                }]);
            } else {
                setMessages(prev => [...prev, {
                    id: `res-${Date.now()}`,
                    content: "No perfect matches found. Try adjusting your description or try: 'beach property in Goa', 'mountain retreat', or 'farmland investment'",
                    role: 'system'
                }]);
            }

        } catch (error) {
            console.error("API call failed:", error);
            setMessages(prev => [...prev, {
                id: `err-${Date.now()}`,
                content: "Couldn't connect to the server.",
                role: 'system'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, results]);

    return (
        <div className="w-auto mx-auto">
            <div className="relative h-[600px] flex flex-col overflow-hidden rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-20 pointer-events-none" />
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-transparent">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={cn(`p-4 rounded-2xl w-fit max-w-[75%] flex ${msg.role === "user"
                                    ? "bg-[#5157ff] text-white font-semibold rounded-br-none text-right"
                                    : "bg-[#c4dbff] text-black rounded-bl-none text-left"
                                    }`)}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))}

                    {results.length > 0 && (
                        <div className="mt-6 pt-4 font-semibold">
                            <h3 className="font-bold text-xl mb-4 text-gray-100">Your Vibe Matches</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                {results.map((property) => {
                                    const matchInfo = matchData.find(m => m.id === property.id);
                                    return (
                                        <SpotlightCard key={property.id} className="flex flex-col">
                                            <div className="flex justify-between items-start mb-3">
                                                <h4 className="font-bold text-lg text-slate-100">{property.ProjectName}</h4>
                                                {matchInfo && (
                                                    <span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                                        {matchInfo.relevanceScore}/10 match
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex justify-between items-center mb-3">
                                                <span className="text-sm font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                                    {property.StartingPrice}
                                                </span>
                                                <span className="text-sm text-gray-200 bg-gray-100/20 px-2 py-1 rounded-full">
                                                    {property.Status}
                                                </span>
                                            </div>
                                            <div className="flex items-center text-xs text-left text-gray-200 mb-2 gap-1">
                                                <MapPinIcon className="h-4 w-4" />
                                                {property.Micromarket}, {property.Majormarket}
                                            </div>
                                            <p className="text-sm text-[#ffb6b0] mb-3 italic border-l-2 border-blue-200 pl-2 line-clamp-2 text-left">
                                                {property.vibeSummary}
                                            </p>
                                            {matchInfo && matchInfo.matchReasons && (
                                                <div className="mb-3">
                                                    <p className="text-xs font-semibold text-gray-300 mb-1">Why it matches:</p>
                                                    <ul className="text-xs text-gray-200 space-y-1">
                                                        {matchInfo.matchReasons.slice(0, 2).map((reason, i) => (
                                                            <li key={i} className="flex items-start">
                                                                <CheckIcon className="h-3 w-3 text-green-500 mt-0.5 mr-1 flex-shrink-0" />
                                                                <span className='text-left text-pretty'>{reason}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                            <div className="flex flex-wrap gap-1 mb-3">
                                                {property.vibeDescriptors.map((tag, i) => (
                                                    <span
                                                        key={i}
                                                        className="text-xs font-semibold bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 px-2 py-1 rounded-full"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 text-sm text-gray-200 mb-3">
                                                <div className="flex items-center gap-1">
                                                    <HomeIcon className="h-4 w-4 text-gray-100" />
                                                    {property.PropertyType}
                                                </div>
                                                <div className="flex items-center justify-end gap-1">
                                                    <CubeIcon className="h-4 w-4 text-gray-100" />
                                                    {property.SizeRange}
                                                </div>
                                                {property.PlantationType && property.PlantationType !== "-" && (
                                                    <div className="flex items-center gap-1 col-span-2">
                                                        <LeafIcon className="h-4 w-4 text-gray-100" />
                                                        {property.PlantationType}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="pt-2 px-2.5 font-semibold border-t flex justify-between items-center mt-auto">
                                                <span className="text-xs text-gray-100">{property.Developer}</span>
                                                <a
                                                    href={`https://${property.WebsiteLink}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs text-[#a5a8fe] hover:text-[#5157ff] flex items-center"
                                                >
                                                    View Details <ArrowRightIcon className="h-3 w-3 ml-1" />
                                                </a>
                                            </div>
                                        </SpotlightCard>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                    {isLoading && (
                        <div className="flex justify-center py-4">
                            <div className="flex items-center space-x-2">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#5157ff]"></div>
                                <span className="text-gray-200">Finding your vibe match.</span>
                            </div>
                        </div>
                    )}
                    <div ref={endRef} />
                </div>
                <form onSubmit={handleSubmit} className="border-t p-4 bg-slate-950/30">
                    <div className="flex gap-2 justify-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Describe your perfect property vibe (e.g. 'beachfront party house' or 'serene mountain retreat')"
                            className="flex-1 border text-white rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#5157ff] shadow-sm"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-gradient-to-t from-[#76abff] to-[#5157ff] text-white font-bold rounded-full px-6 py-3 hover:opacity-90 disabled:opacity-50 transition-all shadow-md whitespace-nowrap"
                        >
                            {isLoading ? 'Searching...' : 'Find Vibe'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

type IconProps = React.SVGProps<SVGSVGElement>;

function CheckIcon(props: IconProps) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
        </svg>
    );
}

function ArrowRightIcon(props: IconProps) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd" />
        </svg>
    );
}

function MapPinIcon(props: IconProps) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
    );
}

function HomeIcon(props: IconProps) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
        </svg>
    );
}

function CubeIcon(props: IconProps) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.378 1.602a.75.75 0 00-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03zM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 00.372-.648V7.93zM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 00.372.648l8.628 5.033z" />
        </svg>
    );
}

function LeafIcon(props: IconProps) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z" clipRule="evenodd" />
        </svg>
    );
}