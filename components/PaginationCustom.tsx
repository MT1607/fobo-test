import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {useClientMediaQuery} from "@/lib/isMobile";

interface PaginationProps {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
}

export function PaginationCustom({currentPage, setCurrentPage, totalPages}: PaginationProps) {
    // Function to determine which page numbers to show
    const isMobile = useClientMediaQuery('(max-width: 600px)')

    const getPageNumbers = () => {
        const pageNumbers = [];

        if (totalPages <= 7) {
            // If there are 7 or fewer pages, show all pages
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Always show first page
            pageNumbers.push(1);

            if (currentPage <= 3) {
                // Near the start
                pageNumbers.push(2, 3, 4);
                pageNumbers.push('ellipsis');
                pageNumbers.push(totalPages - 1, totalPages);
            } else if (currentPage >= totalPages - 2) {
                // Near the end
                pageNumbers.push('ellipsis');
                pageNumbers.push(totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                // Somewhere in the middle
                pageNumbers.push('ellipsis');
                pageNumbers.push(currentPage - 1, currentPage, currentPage + 1);
                pageNumbers.push('ellipsis2');
                pageNumbers.push(totalPages);
            }
        }

        return pageNumbers;
    };

    return (
        <Pagination className="w-full flex justify-center items-center mt-4 mb-4">
            <PaginationContent className="flex w-full">
                <div className="flex-1 flex justify-start">
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                            className="cursor-pointer"
                        />
                    </PaginationItem>
                </div>

                <div className={`flex-1 flex justify-center items-center  ${isMobile ? "" : "mx-[520px]"}`}>
                    {getPageNumbers().map((pageNum, index) => (
                        pageNum === 'ellipsis' || pageNum === 'ellipsis2' ? (
                            <PaginationItem key={`ellipsis-${index}`}>
                                <PaginationEllipsis/>
                            </PaginationItem>
                        ) : (
                            <PaginationItem key={`page-${pageNum}`}>
                                <PaginationLink
                                    isActive={currentPage === pageNum}
                                    onClick={() => setCurrentPage(pageNum as number)}
                                    className={`cursor-pointer ${currentPage === pageNum ? 'bg-[#D1F7EA] text-black' : ''}`}
                                >
                                    {pageNum}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    ))}
                </div>

                <div className="flex-1 flex justify-end">
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                            className="cursor-pointer"
                        />
                    </PaginationItem>
                </div>
            </PaginationContent>
        </Pagination>
    );
}