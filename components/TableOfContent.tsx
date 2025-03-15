"use client";

import {useState} from "react";
import {BlogSection} from "@/utils/type";
import {cn} from "@/lib/utils";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";

interface TableOfContentsProps {
    sections: BlogSection[];
    className?: string;
}

export function TableOfContents({sections, className}: TableOfContentsProps) {
    const [activeSection, setActiveSection] = useState<string>("");

    const renderTocItems = (items: BlogSection[], level = 0) => {
        return items.map((section) => (
            <div key={section.id} className="toc-item">
                <a
                    href={`#${section.id}`}
                    className={cn(
                        "block hover:text-primary transition-colors",
                        level > 0 && `ml-${level * 4}`,
                        activeSection === section.id ? "font-medium text-green-500" : "text-muted-foreground"
                    )}
                    onClick={() => setActiveSection(section.id)}
                    style={{marginLeft: `${level * 1}rem`}}
                >
                    {section.title}
                </a>
                {section.subsections && section.subsections.length > 0 &&
                    renderTocItems(section.subsections, level + 1)
                }
            </div>
        ));
    };

    // Cập nhật section active khi scroll
    if (typeof window !== "undefined") {
        const handleScroll = () => {
            const sectionElements = document.querySelectorAll("section[id]");
            let currentActiveSection = "";

            sectionElements.forEach((section) => {
                const sectionTop = section.getBoundingClientRect().top;

                if (sectionTop < 100) {
                    currentActiveSection = section.id;
                }
            });

            if (currentActiveSection !== activeSection) {
                setActiveSection(currentActiveSection);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Kiểm tra ngay khi component mount
    }

    return (
        <Card className={cn("sticky top-4 border-none shadow-none", className)}>
            <CardHeader className="pb-2">
                <CardTitle>Nội dung bài viết</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
                <ScrollArea className="h-[calc(100vh-200px)]">
                    <div className="space-y-1">
                        {renderTocItems(sections)}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}