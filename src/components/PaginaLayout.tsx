import type { ReactNode } from "react";
import MenuLateral from "./MenuLateral";

export default function PaginaLayout({ children }: { children: ReactNode }) {
    return (
        <main className="w-full min-h-screen bg-[#F8FBFD]">
            <MenuLateral />
            <div className="flex flex-col min-h-screen md:ml-[20vw] pt-16 md:pt-10 pb-10 px-8 gap-6">
                {children}
            </div>
        </main>
    );
}