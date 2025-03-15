import {ChildPage} from "@/utils/type";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {ChevronDown} from "lucide-react";
import {Command, CommandGroup, CommandItem, CommandList} from "@/components/ui/command";
import React from "react";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";

type ComboBoxVariant = 'link' | 'button';

interface ComboBoxProps {
    array: ChildPage[];
    label: string;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    variant?: ComboBoxVariant;
    href?: string;
    showPreviousIcon?: boolean;
    showCommandIcons?: boolean;
}

const ComboBox = ({
                      array,
                      label,
                      open,
                      setOpen,
                      value,
                      setValue,
                      variant = 'link',
                      href = '#',
                      showPreviousIcon = false,
                  }: ComboBoxProps) => {
    const pathName = usePathname();
    const router = useRouter();

    const renderTrigger = () => {
        if (variant === 'button') {
            return (
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="flex items-center justify-between rounded-[40px] border border-solid border-gray-300 px-3 py-2 gap-3"
                    style={{
                        paddingTop: '8px',
                        paddingRight: '12px',
                        paddingBottom: '8px',
                        paddingLeft: '12px',
                        gap: '12px'
                    }}
                >
                    {showPreviousIcon &&
                        <img src={`${array.find((framework) => framework.value === value)?.icons}`} alt={value}/>}
                    <div className={"gap-1 flex flex-row justify-center items-center"}>
                        {value
                            ? array.find((framework) => framework.value === value)?.title
                            : "Select Language..."}
                        <ChevronDown size={16}/>
                    </div>
                </Button>
            );
        }

        // Default 'link' variant
        return (
            <span
                role="combobox"
                aria-expanded={open}
                className={`text-gray-700 hover:text-blue-500 cursor-pointer flex flex-row items-center justify-between p-2 gap-2 ${pathName.startsWith(href) ? "font-bold text-black" : ""}`}
            >
                {label}
                <ChevronDown/>
            </span>
        );
    };

    const content = (
        <PopoverContent className="w-[200px] p-0">
            <Command>
                <CommandList>
                    <CommandGroup>
                        {array.map((child) => (
                            <CommandItem
                                key={child.value}
                                value={child.value}
                                onSelect={() => {
                                    if (variant !== "button") {
                                        const basePath = pathName.split("/")[1];
                                        const newPath = `/${basePath}/${child.value}`;

                                        router.push(newPath);
                                    } else {
                                        setValue(child.value === value ? "" : child.value);
                                        setOpen(false);
                                    }
                                }}
                            >

                                {variant === "button" ? (
                                    <>
                                        {showPreviousIcon ?
                                            <div className={"items-center gap-2 flex flex-row justify-between w-full"}>
                                                <img src={child.icons} alt={child.value}/>
                                                <span>{child.title}</span>
                                            </div> : child.title}

                                    </>
                                ) : child.title}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
    );

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                {variant === 'link' ? (
                    <Link href={href}>
                        {renderTrigger()}
                    </Link>
                ) : (
                    renderTrigger()
                )}
            </PopoverTrigger>
            {content}
        </Popover>
    );
};

export default ComboBox;