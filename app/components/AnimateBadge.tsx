import { cn } from "@/lib/utils";
import { AnimatedGradientText } from "./Button";

export function Announcement() {
    return (
        <div className="group relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] w-fit">
            <span
                className={cn(
                    "absolute inset-0 block h-full w-full rounded-[inherit] animate-gradient bg-gradient-to-r from-[#fdb5b5]/90 via-[#7affdb]/90 to-[#ffd19a]/90 bg-[length:300%_100%] p-[1.5px]",
                )}
                style={{
                    WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "destination-out",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "subtract",
                    WebkitClipPath: "padding-box",
                }}
            />
            🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
            <AnimatedGradientText className="text-[15px] font-semibold">
                Introducing Vibe Search
            </AnimatedGradientText>
        </div>
    );
}
