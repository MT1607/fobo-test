"use client"
import {Calendar, Clock, MoveRight, Search} from "lucide-react";
import {mockData} from "@/dt/fake-dt";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {PaginationCustom} from "@/components/PaginationCustom";
import {useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {useClientMediaQuery} from "@/lib/isMobile";

const ITEMS_PER_PAGE = 6;
const BlogPage = () => {
    const router = useRouter();
    const basePath = usePathname();
    const posts = mockData();
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);

    const currentData = posts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const catData = [
        {
            title: "Tat ca",
            amount: '108'
        },
        {
            title: "Thiet ke Website",
            amount: '36'
        },
        {
            title: "Thiet ke App Mobile",
            amount: '13'
        },
        {
            title: "Quan ly san xuat",
            amount: '25'
        },
        {
            title: "Quan ly ban hang",
            amount: '22'
        },
        {
            title: "Bao chi noi ve FOSO",
            amount: '7'
        },
        {
            title: "Tin tuc FOSO",
            amount: '5'
        },
    ]
    const isMobile = useClientMediaQuery('(max-width: 600px)')
    return (
        <>
            <section id="body-header"
                     className={"w-full gap-12 flex flex-row items-center justify-between"}>

                {isMobile ? "" : <img src={"/calender-ani.svg"} alt={"icon-calender"}/>}
                <div className="pt-12 pb-12 flex justify-center items-center flex-col">
                    <div className="pb-16 gap-[10px]">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink>
                                        <Link href="/">Home</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator/>
                                <BreadcrumbItem>
                                    <BreadcrumbLink>
                                        <Link href="/resource">Tai nguyen</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator/>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Blog</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div
                        className="font-raleway font-normal text-[64px] leading-[100px] tracking-normal text-center flex items-center justify-center mb-5">
                        <span>Blog
                            <span
                                className="font-raleway font-extrabold text-[64px] leading-[100px] text-transparent bg-clip-text bg-gradient-to-r from-[#54ABB1] via-[#85EEB3] to-[#54ABB1] after:content-['\A'] after:block"> FOSO
                            <span className={"text-black font-normal text-[64px]"}> - </span>
                            </span>
                            Cập Nhật Tin Tức <span className={"font-extrabold text-[64px] relative"}>Mới Nhất
                                <div
                                    className={"w-full h-7 rounded-[40px] bg-[#A3EED6] absolute z-[-1] right-[-1px] top-[45px]"}></div></span>
                        </span>

                    </div>
                    <p className="font-raleway font-medium text-[#33404A] text-[18px] leading-[150%] tracking-[0%] text-center">
                        Cùng FOSO khám phá kiến thức, xu
                        hướng công nghệ và sản xuất ngay!
                    </p>
                </div>
                {isMobile ? "" : <img src={"/hand-ani.svg"} alt={"icon-hand"}/>}
            </section>

            <div className="w-3/4 mx-auto">
                <div className={"grid grid-cols-3 gap-4"}>
                    <div className="col-span-2 p-4">
                        <p className="font-extrabold text-4xl mb-5">Tất cả bài viết</p>
                        <img src="/banner.svg" alt="banner" className={"w-full"}/>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            {currentData.map((post) => (
                                <div key={post.id} className="col-span-1 border rounded-2xl p-2 overflow-hidden">
                                    <img src="/banner-card.svg" alt="banner-card" className="w-full h-auto"/>
                                    <div className="p-4">
                                    <span className="bg-[#E2F0FE] text-blue-500 px-2 py-1 rounded-md text-sm">
                                        {post.tag}
                                    </span>
                                        <p className="font-extrabold text-2xl pt-5">{post.title}</p>
                                        <div className="flex mt-3 flex-row w-full">
                                            <div className="text-[#667F93] flex items-center gap-1 justify-center">
                                                <Calendar className="inline"/>
                                                <p>{post.date}</p>
                                            </div>
                                            <div className="h-5 w-[1px] bg-[#667F93] mx-2"></div>
                                            <div className="text-[#667F93] flex items-center gap-1 justify-center">
                                                <Clock className="inline"/>
                                                <span>{post.time_to_read}</span>
                                            </div>
                                        </div>
                                        <div className="mt-3 text-[#667F93] cursor-pointer"
                                             onClick={() => router.push(`${basePath}/${post.post_id}`)}>
                                            Khám phá thêm <MoveRight className="mx-3 inline"/>
                                        </div>
                                    </div>
                                </div>))}
                        </div>

                    </div>
                    <div className={"col-span-1 p-4"}>
                        <p className="font-bold text-2xl mb-5">Tìm kiếm</p>
                        <div
                            className="w-full rounded-[12px] flex items-center justify-between px-6 py-3 border border-gray-300 bg-white">
                            <Input
                                type="text"
                                placeholder="Tìm kiếm bài viết"
                                className="flex-1 border-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none shadow-none"
                            />
                            <Button variant="outline" className="p-2 bg-green-500 w-[48px] h-[48px]">
                                <Search className="text-white"/>
                            </Button>
                        </div>
                        <div className={"mt-5"}>
                            <p className="font-bold text-2xl mb-5 mt-5">Danh mục</p>
                            {catData.map((child) => (
                                <div key={child.title} className={"flex flex-col mb-2"}>
                                    <div className={'flex flex-row justify-between w-full mb-3'}>
                                        <p>{child.title}</p>
                                        <p>{child.amount}</p>

                                    </div>
                                    <hr className={"w-full"}/>
                                </div>
                            ))}
                            <img src={"/right-banner-1.svg"} alt={"right-banner"} className={"w-full mt-10"}/>
                            <img src={"/right-banner-2.svg"} alt={"right-banner"} className={"w-full mt-10"}/>
                        </div>
                    </div>

                </div>
                <PaginationCustom currentPage={currentPage} setCurrentPage={setCurrentPage}
                                  totalPages={totalPages}/>
            </div>
        </>

    );
};

export default BlogPage;
