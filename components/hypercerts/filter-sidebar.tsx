import { Separator } from "@/components/ui/separator";
import { useFilters } from "@/contexts/filter";
import type { createFilterOptions } from "@/lib/search-filter-utils";
import { cn } from "@/lib/utils";
import { FilterItems } from "./hypercerts-filters";

interface SidebarFilterProps {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	filterOptions: ReturnType<typeof createFilterOptions>;
}

const SidebarFilter = ({
	isOpen,
	setIsOpen,
	filterOptions,
}: SidebarFilterProps) => {
	const { filters, updateSearchParams } = useFilters();
	const clearedFilters = filters.filter(([key]) => key === "q");

	const handleClearFilters = () => {
		setIsOpen(false);
		updateSearchParams(clearedFilters);
	};

	return (
		<aside
			className={cn(
				"0, 0.35, 1)] h-full w-[380px] border-r border-r-stone-300 bg-vd-beige-100 p-5 transition-[margin-left] duration-700 ease-[cubic-bezier(0.65,",
				isOpen ? "ml-0" : "ml-[-380px]",
				"min-[2560px]:ml-0",
			)}
		>
			<header className="flex justify-between">
				<h2 className="font-bold text-xl">Filters</h2>
				<section className="flex gap-4">
					<button
						type="button"
						className="text-vd-blue-700 underline-offset-1 min-[2560px]:hidden hover:text-vd-blue-400 hover:underline"
						onClick={handleClearFilters}
					>
						Clear filters
					</button>
					<button
						type="button"
						className="hidden text-vd-blue-700 underline-offset-1 min-[2560px]:block hover:text-vd-blue-400 hover:underline"
						onClick={() => updateSearchParams(clearedFilters)}
					>
						Clear filters
					</button>
					<Separator
						orientation="vertical"
						className="bg-vd-blue-400 min-[2560px]:hidden"
					/>
					<button
						type="button"
						onClick={() => setIsOpen(false)}
						title="Close sidebar"
						aria-label="Close sidebar"
						className="hover:-translate-x-1 text-vd-blue-600 transition-transform duration-300 ease-in-out min-[2560px]:hidden"
					>
						Close
					</button>
				</section>
			</header>
			<div className="p-4" />
			<section>
				<FilterItems isMobileFilter={false} filterOptions={filterOptions} />
			</section>
		</aside>
	);
};

export { SidebarFilter };
