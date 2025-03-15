export interface ChildPage {
    value: string,
    title: string,
    icons?: string
}

export const resoureChildPage = [
    {
        value: "blog",
        title: "Blog"
    }, {
        value: "tech",
        title: "Tech"
    }
]

export const solutionChildPage = [
    {
        value: "individual",
        title: "Cá nhân"
    }, {
        value: "business",
        title: "Doanh nghiệp"
    }
]

export const multiLanguage = [
    {
        value: "vietnam",
        title: "VI",
        icons: "/vietnam.svg"
    }, {
        value: "english",
        title: "ENG",
        icons: "/english.svg"
    }
]

export interface fakeDataType {
    id: number,
    post_id: number,
    title: string,
    tag: string,
    date: string,
    time_to_read: string
}

export interface BlogPost {
    id: number;
    title: string;
    author: string;
    date: string;
    content: BlogSection[];
    tags: string[];
    time_to_read: string;
}

export interface BlogSection {
    id: string;
    title: string;
    level: number;
    content: string | BlogContent[];
    subsections?: BlogSection[];
}

export type BlogContent = {
    type: 'paragraph' | 'image' | 'quote' | 'list' | 'big-quote';
    content: string;
    caption?: string;
    listContent?: string[],
};