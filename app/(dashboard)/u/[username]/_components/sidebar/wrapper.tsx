"use client";

import { cn } from "@/lib/utils";
import usePersistedStore from "@/store";

interface WrapperProps {
    children: React.ReactNode;
};

export const Wrapper = ({
    children,
}: WrapperProps) => {
    const { collapsed } = usePersistedStore((state) => state);

    return (
        <aside className={cn(
            "fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50",
            collapsed && "lg:w-[70px]"
        )}>
            {children}
        </aside>
    );
};