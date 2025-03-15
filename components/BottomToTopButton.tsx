"use client";

import {useState, useEffect} from "react";
import {Button} from "@/components/ui/button";
import {ArrowUp} from "lucide-react";
import {cn} from "@/lib/utils";

interface BackToTopProps {
    threshold?: number;
    className?: string;
    position?: "bottom-right" | "bottom-left";
}

export function BackToTopButton({
                                    threshold = 300,
                                    className,
                                    position = "bottom-right",
                                }: BackToTopProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > threshold);
        };

        // Initial check
        handleScroll();

        // Add event listener
        window.addEventListener("scroll", handleScroll);

        // Clean up
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [threshold]);

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const positionClasses = {
        "bottom-right": "bottom-6 right-6",
        "bottom-left": "bottom-6 left-6",
    };

    return (
        <Button
            variant="secondary"
            size="icon"
            className={cn(
                "fixed transition-all duration-300 shadow-md",
                positionClasses[position],
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
                className
            )}
            onClick={handleClick}
            aria-label="Back to top"
        >
            <ArrowUp className="h-4 w-4"/>
        </Button>
    );
}