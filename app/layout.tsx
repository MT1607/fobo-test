"use client"
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import {useClientMediaQuery} from "@/lib/isMobile";
import {BackToTopButton} from "@/components/BottomToTopButton";

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {

    const isMobile = useClientMediaQuery('(max-width: 600px)')
    return (
        <html lang="en">
        <body>
        {isMobile ? <Sidebar/> : <Header/>}
        <main className={"pt-[85px]"}>{children}</main>
        <BackToTopButton threshold={300}
                         position="bottom-right"
                         className="bg-primary text-primary-foreground hover:bg-primary/90"/>
        </body>
        </html>
    );
}
