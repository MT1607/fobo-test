"use client"

import React, {useEffect, useState} from "react";
import ComboBox from "@/components/ComboBox";
import {Button} from "@/components/ui/button";
import {ArrowUpRight} from "lucide-react";
import {multiLanguage, resoureChildPage, solutionChildPage} from "@/utils/type";
import {usePathname} from "next/navigation";


const Header = () => {
    const pathName = usePathname();
    const [resoureOpenButton, setResoureOpenButton] = React.useState(false);
    const [resoureButtonValue, setResoureButtonValue] = React.useState("");

    const [solutionOpenButton, setSolutionOpenButton] = React.useState(false);
    const [solutionButtonValue, setSolutionOpenButtonValue] = React.useState("");

    const [multiLanguageOpenButton, setMultiLanguageOpenButton] = React.useState(false);
    const [multiLanguageButtonValue, setMultiLanguageButtonValue] = React.useState("vietnam");

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header
            className={`fixed left-1/2 transform -translate-x-1/2 z-50 flex justify-center items-center gap-16 bg-white shadow-lg transition-all duration-300 p-[12px_36px] header ${isScrolled ? "rounded-[40px] w-[calc(100%-200px)] top-1.5" : "w-full"}`}
        >
            <img src={"/logo.svg"} alt={"logo-loso"} className={"cursor-pointer"}/>
            <nav>
                <ul className="flex gap-2">
                    <li className={"relative p-2 gap-2"}>
                        <a href="/about-me"
                           className={`text-gray-700 hover:text-blue-500 ${pathName === "/about-me" ? "font-bold text-black" : ""}`}>
                            Về Chúng Tôi
                        </a>
                        {pathName === "/about-me" && <span
                            className="absolute left-1/2 bottom-0 -translate-x-1/2 w-2 h-2 bg-green-500 rounded-full"/>
                        }
                    </li>
                    <li className={"relative"}>
                        <ComboBox array={solutionChildPage} label={"Giai phap"} open={solutionOpenButton}
                                  setOpen={setSolutionOpenButton}
                                  value={solutionButtonValue} setValue={setSolutionOpenButtonValue} href={"/solution"}/>
                        {pathName.startsWith("/solution") && <span
                            className="absolute left-1/2 bottom-0 -translate-x-1/2 w-2 h-2 bg-green-500 rounded-full"/>
                        }
                    </li>
                    <li className={"relative"}>
                        <ComboBox array={resoureChildPage} label={"Tai nguyen"} open={resoureOpenButton}
                                  setOpen={setResoureOpenButton}
                                  value={resoureButtonValue} setValue={setResoureButtonValue} href={"/resource"}/>

                        {pathName.startsWith("/resource") && <span
                            className="absolute left-1/2 bottom-0 -translate-x-1/2 w-2 h-2 bg-green-500 rounded-full"/>
                        }
                    </li>
                    <li className={"relative p-2 gap-2"}>
                        <a href="/contact"
                           className={`text-gray-700 hover:text-blue-500 ${pathName === "/contact" ? "font-bold text-black" : ""}`}>
                            Lien he
                        </a>
                        {pathName === "/contact" && <span
                            className="absolute left-1/2 bottom-0 -translate-x-1/2 w-2 h-2 bg-green-500 rounded-full"/>
                        }
                    </li>
                </ul>
            </nav>
            <div className={"flex-row gap-1 flex"}>
                <ComboBox array={multiLanguage} label={"vi"} open={multiLanguageOpenButton}
                          setOpen={setMultiLanguageOpenButton} value={multiLanguageButtonValue}
                          setValue={setMultiLanguageButtonValue}
                          variant={"button"}
                          showPreviousIcon={true}/>

                <Button variant={"outline"}
                        className={"rounded-[40px] bg-[#1AD598] text-black pt-2 pr-3 pb-2 pl-3 gap-3"}>
                    Trở Thành Khách Hàng
                    <div className={"rounded-[40px] bg-black p-1 text-white"}>
                        <ArrowUpRight/>
                    </div>
                </Button>
            </div>
        </header>
    );
};

export default Header;