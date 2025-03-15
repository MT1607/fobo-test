import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {ArrowUpRight, ChevronDown, Menu} from "lucide-react";
import React from "react";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import {resoureChildPage, solutionChildPage} from "@/utils/type";
import {useRouter} from "next/navigation";

const Sidebar = () => {
    const router = useRouter();
    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className={"w-full fixed h-8 bg-white flex items-center"}>
                    <Button variant="ghost">
                        <Menu className="h-6 w-6"/>
                    </Button>
                </div>
            </SheetTrigger>
            <SheetContent side={"left"}>
                <div>
                    <img src={"/logo.svg"} alt={"logo-loso"} className={"cursor-pointer m-2"}/>

                    <nav className="flex flex-col gap-4 p-4">
                        <a href="#" className="text-gray-700 hover:text-blue-500">Về Chúng Tôi</a>
                        <Collapsible>
                            <CollapsibleTrigger>
                                <div className={"flex-row gap-1 flex items-center justify-center"}
                                     onClick={() => (router.push("/solution"))}>
                                    Giai phap
                                    <ChevronDown/>
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <ul className={"ml-3 mt-3"}>
                                    {solutionChildPage.map((child) => (
                                        <li key={child.value}
                                            onClick={() => (router.push(`/solution/${child.value}`))}>{child.title}</li>
                                    ))}
                                </ul>
                            </CollapsibleContent>
                        </Collapsible>
                        <Collapsible>
                            <CollapsibleTrigger>
                                <div className={"flex-row gap-1 flex items-center justify-center"}
                                     onClick={() => (router.push("/resource"))}>
                                    Tai nguyen
                                    <ChevronDown/>
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <ul className={"ml-3 mt-3"}>
                                    {resoureChildPage.map((child) => (
                                        <li key={child.value}
                                            onClick={() => (router.push(`/resource/${child.value}`))}>{child.title}</li>
                                    ))}
                                </ul>
                            </CollapsibleContent>
                        </Collapsible>
                        <a href="#" className="text-gray-700 hover:text-blue-500">Liên hệ</a>
                    </nav>
                    <div>
                        <div className={"flex-row gap-1 flex"}>
                            {/*<ComboBox array={multiLanguage} label={"vi"} open={multiLanguageOpenButton}*/}
                            {/*          setOpen={setMultiLanguageOpenButton} value={multiLanguageButtonValue}*/}
                            {/*          setValue={setMultiLanguageButtonValue}*/}
                            {/*          variant={"button"}*/}
                            {/*          showPreviousIcon={true}/>*/}


                            <Button variant={"outline"}
                                    className={"rounded-[40px] bg-[#1AD598] text-black pt-2 pr-3 pb-2 pl-3 gap-3"}>
                                Trở Thành Khách Hàng
                                <div className={"rounded-[40px] bg-black p-1 text-white"}>
                                    <ArrowUpRight/>
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
export default Sidebar;