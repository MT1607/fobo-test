'use client';
import {use} from "react";

import {notFound} from "next/navigation";
import Image from "next/image";
import {Badge} from "@/components/ui/badge";
import {getBlogPostById} from "@/dt/fake-blogs";
import {TableOfContents} from "@/components/TableOfContent";
import React, {ElementType} from "react";
import {Calendar, Clock, MoveRight} from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {useClientMediaQuery} from "@/lib/isMobile";

// Remove the export from generateMetadata since it can't be exported from a client component
// function getMetadata(id: string) {
//     const post = getBlogPostById(parseInt(id));
//     if (!post) return {title: "Bài viết không tồn tại"};
//
//     return {
//         title: post.title,
//         description: `${post.title} - Bài viết bởi ${post.author}`,
//     };
// }

// Hàm render nội dung
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderContent = ({content}: { content: any }) => {
    if (typeof content === "string") return <p className="mb-4">{content}</p>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return content.map((item: any, index: number) => {
        switch (item.type) {
            case "paragraph":
                return <p key={index} className="mb-4">{item.content}</p>;
            case "image":
                return (
                    <div key={index} className="mb-8">
                        <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
                            <Image
                                src={item.content}
                                alt={item.caption || ""}
                                fill
                                className="object-cover"
                            />
                        </div>
                        {item.caption && (
                            <p className="text-center text-sm text-muted-foreground italic mt-2">
                                {item.caption}
                            </p>
                        )}
                    </div>
                );
            case "quote":
                return (
                    <blockquote key={index}
                                className="border-l-4 border-primary pl-4 italic text-muted-foreground my-6">
                        {item.content}
                    </blockquote>
                );
            case "big-quote":
                return (
                    <div key={index} className="relative my-8 px-10">
                        <span className="absolute top-0 left-0 text-8xl text-green-500">&ldquo;</span>
                        <blockquote
                            className="text-xl text-center font-medium italic relative z-10 text-muted-foreground">
                            {item.content}
                        </blockquote>
                    </div>
                );
            case "list":
                return (
                    <ul key={index} className="list-disc pl-6 mb-4 space-y-2">
                        {item.listContent.map((listItem: string, listIndex: number) => (
                            <li key={listIndex}>{listItem}</li>
                        ))}
                    </ul>
                );
            default:
                return null;
        }
    });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderSection = (section: any) => {
    // Fix: Use proper type for dynamic heading tags
    const HeadingTag = `h${section.level}` as ElementType;

    return (
        <section key={section.id} id={section.id} className="scroll-mt-16">
            <HeadingTag className={`${
                section.level === 1
                    ? 'font-bold text-[16px] mt-12 mb-6 pb-2 text-[#15AA7A]'
                    : section.level === 2
                        ? 'font-medium mt-8 mb-4 text-[#15AA7A] text-[16px]'
                        : 'text-xl mt-6 mb-3 text-[#15AA7A] text-[16px]'
            }`}>
                {section.title}
            </HeadingTag>
            {renderContent({content: section.content})}

            {section.subsections?.map((subsection: unknown) => renderSection(subsection))}
        </section>
    );
};

export default function DetailBlog({params}: { params: Promise<{ id: string }> }) {
    const {id} = use(params);

    const post = getBlogPostById(parseInt(id));
    const isMobile = useClientMediaQuery('(max-width: 600px)')
    if (!post) {
        notFound();
    }

    // Use the metadata function, but don't export it
    // const metadata = getMetadata(params.id);
    // You could use metadata here if needed

    return (
        <div className="container max-3/4 mx-auto py-5">
            <div className={"grid grid-cols-1 md:grid-cols-6 gap-8"}>
                {isMobile ? "" :
                    <div className={"sticky top-20 flex flex-col items-center gap-4 md:col-span-1"}>
                        <p className={"font-bold"}>Chia sẻ</p>
                        <div className="flex flex-col items-center gap-2">
                            <Image width={40} height={40} className="w-10 h-10" src="/zalo.svg" alt="zalo"/>
                            <Image width={40} height={40} className="w-10 h-10" src="/facebook.svg" alt="facebook"/>
                            <Image width={40} height={40} className="w-10 h-10" src="/x.svg" alt="x"/>
                            <Image width={40} height={40} className="w-10 h-10" src="/linkedn.svg" alt="linkedn"/>
                            <Image width={40} height={40} className="w-10 h-10" src="/reddit.svg" alt="reddit"/>
                        </div>
                    </div>}
                <div className="w-full md:col-span-4 m-3">
                    <div className="pb-4">
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
                                    <Link href="/resource/blog">Blog</Link>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator/>
                                <BreadcrumbItem>
                                    <BreadcrumbPage className={"font-bold"}>{post.tags[0]}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <article>
                        <div className="mt-4 pt-4 mb-4 ">
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map(tag => (
                                    <Badge key={tag} variant="outline"
                                           className={"bg-blue-200 text-blue-600"}>{tag}</Badge>
                                ))}
                            </div>
                        </div>

                        <h1 className="text-4xl font-bold mb-3">{post.title}</h1>

                        <div className="flex justify-between items-center w-full pt-2">
                            <div className={"flex-row flex justify-center items-center"}>
                                <img src={"/avatar.svg"} alt={"avatar"}/>
                                <div className={"flex flex-col ml-3"}>
                                    <span className={"font-medium text-[14px] text-[#667F93]"}>Tác giả</span>
                                    <p className={"font-bold text-[16px]"}>{post.author}</p>
                                </div>
                            </div>
                            <div className={"flex-row flex justify-center items-center"}>
                                <div className={`flex w-full ${isMobile ? "flex-col gap-4" : "flex-row"}`}>
                                    <div className="text-[#667F93] flex items-center gap-1 justify-center">
                                        <Calendar className="inline"/>
                                        <p>Cập nhật vào: {post.date}</p>
                                    </div>
                                    {isMobile ? <hr className={"w-[150px]"}/> :
                                        <div className="h-5 w-[1px] bg-[#667F93] mx-5"></div>}
                                    <div
                                        className={`text-[#667F93] ${isMobile ? "" : "flex items-center gap-1 justify-center"}`}>
                                        <Clock className="inline"/>
                                        <span>{post.time_to_read} phút đọc</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {post.content.map(section => renderSection(section))}
                    </article>
                    <Card>
                        <CardHeader className={"flex items-center justify-center flex-col"}>
                            <CardTitle>Bạn thấy bài viết như thế nào?</CardTitle>
                            <CardDescription>4 phản hồi</CardDescription>
                        </CardHeader>
                        <CardContent className={"flex flex-row justify-between w-full"}>
                            <div className={"flex-col justify-center items-center flex gap-1"}>
                                <img src={"/like-icon.svg"} alt={"like-icon"}/>
                                <p className={"text-green-400"}>1</p>
                                <p className={"text-green-400"}>Hữu ích</p>
                            </div>
                            <div className={"flex-col justify-center items-center flex gap-1"}>
                                <img src={"/heart-icon.svg"} alt={"hear-icon"}/>
                                <p>2</p>
                                <p>Yêu thích</p>
                            </div>
                            <div className={"flex-col justify-center items-center flex gap-1"}>
                                <img src={"/smile-icon.svg"} alt={"smile-icon"}/>
                                <p>0</p>
                                <p>Thú vị</p>
                            </div>
                            <div className={"flex-col justify-center items-center flex gap-1"}>
                                <img src={"/like-icon.svg"} alt={"wao-icon"}/>
                                <p>1</p>
                                <p>Bất ngờ</p>
                            </div>
                            <div className={"flex-col justify-center items-center flex gap-1"}>
                                <img src={"/poor-icon.svg"} alt={"poor-icon"}/>
                                <p>0</p>
                                <p>Nhàm chán</p>
                            </div>
                            <div className={"flex-col justify-center items-center flex gap-1"}>
                                <img src={"/angry-icon.svg"} alt={"angry-icon"}/>
                                <p>0</p>
                                <p>Tức giận</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {isMobile ? "" :
                    <div className="md:col-span-1">
                        <TableOfContents sections={post.content} className="md:sticky md:top-20"/>
                    </div>}
            </div>
            <div className={"mt-10 w-full"}>
                <p className={"font-bold text-2xl mb-5"}>Bài viết liên quan</p>
                <div className={"flex flex-row gap-4"}>
                    <div key={post.id} className="border rounded-2xl p-2">
                        <img src="/banner-card.svg" alt="banner-card" className={"w-full"}/>
                        <div className="pt-2 w-full">
                                    <span
                                        className="bg-[#E2F0FE] text-blue-500 px-2 py-1 rounded-md text-sm">{post.tags[0]}
                                    </span>
                            <p className="font-bold text-2xl text-center pt-5">
                                Tại sao BOM quan trọng trong quản lý sản xuất?
                            </p>
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
                                // onClick={() => router.push(`${basePath}/${post.post_id}`)}
                            >
                                Khám phá thêm <MoveRight className="mx-3 inline"/>
                            </div>
                        </div>
                    </div>
                    <div key={post.id} className="border rounded-2xl p-2">
                        <img src="/banner-card.svg" alt="banner-card" className={"w-full"}/>
                        <div className="pt-2 w-full">
                                    <span
                                        className="bg-[#E2F0FE] text-blue-500 px-2 py-1 rounded-md text-sm">{post.tags[0]}
                                    </span>
                            <p className="font-bold text-2xl text-center pt-5">
                                Tại sao BOM quan trọng trong quản lý sản xuất?
                            </p>
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
                                // onClick={() => router.push(`${basePath}/${post.post_id}`)}
                            >
                                Khám phá thêm <MoveRight className="mx-3 inline"/>
                            </div>
                        </div>
                    </div>
                    {isMobile ? "" : <div key={post.id} className="border rounded-2xl p-2">
                        <img src="/banner-card.svg" alt="banner-card" className={"w-full"}/>
                        <div className="pt-2 w-full">
                                    <span
                                        className="bg-[#E2F0FE] text-blue-500 px-2 py-1 rounded-md text-sm">{post.tags[0]}
                                    </span>
                            <p className="font-bold text-2xl text-center pt-5">
                                Tại sao BOM quan trọng trong quản lý sản xuất?
                            </p>
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
                                // onClick={() => router.push(`${basePath}/${post.post_id}`)}
                            >
                                Khám phá thêm <MoveRight className="mx-3 inline"/>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    );
}