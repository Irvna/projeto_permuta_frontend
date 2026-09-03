"use client";

import { useState, type ReactNode } from "react";

const ITENS_MENU = [
    {
        label: "Meus Pedidos",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        ),
    },
    {
        label: "Novo Pedido",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        ),
    },
    {
        label: "Permutas Disponíveis",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
        ),
    },
    {
        label: "Sobre o Projeto",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
        ),
    },
    {
        label: "Meu Perfil",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
        ),
    },
];

function ItemMenu({ icon, label }: { icon: ReactNode; label: string }) {
    return (
        <div className="flex flex-row items-center gap-2 px-2 h-[1.8rem] bg-[#ffffff40] text-white rounded-sm text-[0.7rem] hover:bg-[#ffffff75] cursor-pointer">
            {icon}
            {label}
        </div>
    );
}

function BotaoSair() {
    return (
        <button className="flex justify-center items-center gap-2 w-full py-1 bg-red-500 text-white text-[0.7rem] text-center rounded-sm hover:bg-red-600 cursor-pointer hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
            </svg>
            Sair
        </button>
    );
}

export default function MenuLateral() {
    const [menuAberto, setMenuAberto] = useState(false);

    return (
        <>
            {/* Navbar telas pequenas */}
            <div className="flex md:hidden fixed inset-x-0 top-0 z-50 items-center justify-between bg-[#10294B] px-4 py-3">
                <img
                    src="/permutaja_logo.png"
                    alt="Logo Permuta Já"
                    className="w-28 h-auto"
                />

                <button
                    onClick={() => setMenuAberto((v) => !v)}
                    aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
                    aria-expanded={menuAberto}
                    className="text-white cursor-pointer"
                >
                    {menuAberto ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Navbar mobile */}
            {menuAberto && (
                <div className="flex md:hidden fixed inset-x-0 top-[3.25rem] z-40 flex-col gap-3 bg-[#10294B] px-4 py-4">
                    {ITENS_MENU.map((item) => (
                        <ItemMenu key={item.label} icon={item.icon} label={item.label} />
                    ))}
                    <BotaoSair />
                </div>
            )}

            {/* ===== havbar telas grandes ===== */}
            <div className="hidden md:flex fixed flex-col inset-y-0 left-0 w-[20vw] bg-[#10294B] text-white px-4 py-7 gap-15">
                <div className="mt-2">
                    <img
                        src="/permutaja_logo.png"
                        alt="Logo Permuta Já"
                        className="w-35 xs:aling-justify md:w-50 h-auto"
                    />
                </div>
                <div className="flex flex-col justify-between h-screen">
                    <div className="flex flex-col gap-4 w-full">
                        {ITENS_MENU.map((item) => (
                            <ItemMenu key={item.label} icon={item.icon} label={item.label} />
                        ))}
                    </div>
                    <BotaoSair />
                </div>
            </div>
        </>
    );
}