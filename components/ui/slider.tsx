"use client";
import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
	const values = props.defaultValue || [0, 100];
	return (
		<SliderPrimitive.Root
			ref={ref}
			className={cn(
				"relative flex w-full touch-none select-none items-center",
				className,
			)}
			{...props}
		>
			<SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-vd-blue-200 dark:bg-stone-800">
				<SliderPrimitive.Range className="absolute h-full bg-vd-blue-900 dark:bg-stone-50" />
			</SliderPrimitive.Track>
			<SliderPrimitive.Thumb className="relative block h-5 w-5 rounded-full border-2 border-vd-blue-900 bg-white ring-offset-white transition-colors disabled:pointer-events-none dark:border-stone-50 dark:bg-stone-950 disabled:opacity-50 focus-visible:outline-none dark:focus-visible:ring-stone-300 focus-visible:ring-2 focus-visible:ring-stone-950 dark:ring-offset-stone-950 focus-visible:ring-offset-2">
				<p className="-left-3 absolute pt-6 text-[10px]">${values[0]}</p>
			</SliderPrimitive.Thumb>
			<SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-vd-blue-900 bg-white ring-offset-white transition-colors disabled:pointer-events-none dark:border-stone-50 dark:bg-stone-950 disabled:opacity-50 focus-visible:outline-none dark:focus-visible:ring-stone-300 focus-visible:ring-2 focus-visible:ring-stone-950 dark:ring-offset-stone-950 focus-visible:ring-offset-2">
				<p className="absolute left-2 pt-6 text-[10px]">${values[1]}</p>
			</SliderPrimitive.Thumb>
		</SliderPrimitive.Root>
	);
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
