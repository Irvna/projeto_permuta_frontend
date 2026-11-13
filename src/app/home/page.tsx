"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PaginaLayout from "../../components/PaginaLayout";
import CabecalhoPagina from "../../components/CabecalhoPagina";
import { api, getUsuario, formatarCidade, dataDoId, STATUS, type Cidade, type PermutaDisponivel } from "../../lib/api";

const CARDS_RESUMO = [
    {
        eyebrow: "Encontre uma troca compatível",
        titulo: "Vagas de Permutas",
        texto: "Busque entre os servidores cadastrados por outros usuários.",
        link: "Ver vagas",
        href: "/permutas/disponiveis",
    },
    {
        eyebrow: "Negocie e acompanhe",
        titulo: "Acompanhamento",
        texto: "Envie sua proposta e acompanhe o status até a conclusão.",
        link: "Gerenciar",
        href: "/permutas",
    },
    {
        eyebrow: "Cidades Cadastradas",
        titulo: "Diversas Cidades",
        texto: "Encontre a sua cidade de destino perfeita.",
        link: null,
        href: null,
    },
];

type CardProps = (typeof CARDS_RESUMO)[number];

function CardResumo({ eyebrow, titulo, texto, link, href }: CardProps) {
    return (
        <div className="flex flex-col gap-3 bg-white rounded-lg border border-[rgba(0,0,0,0.1216)] min-h-[12rem] w-full px-5 py-5">
            <p className="text-xs font-bold">{eyebrow}</p>
            <div className="flex flex-col gap-1">
                <h2 className="text-xl md:text-2xl font-bold text-[#21914E]">{titulo}</h2>
                <p className="text-xs opacity-80 font-light">{texto}</p>
            </div>

            {link && href && (
                <Link href={href} className="flex flex-row items-center gap-1 text-[#21914E] mt-auto">
                    <span className="text-xs font-bold">{link}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5 15.75 12l-7.5 7.5" />
                    </svg>
                </Link>
            )}
        </div>
    );
}

function StatusPermuta({ status }: { status: string }) {
    return (
        <span className="hidden md:flex rounded-full border border-[#21914E] px-3 py-1 text-xs font-bold text-[#21914E] whitespace-nowrap">
            {STATUS[status]?.label ?? status}
        </span>
    );
}

function LinhaPermuta({ permuta, cidades }: { permuta: PermutaDisponivel; cidades: Cidade[] }) {
    const cidadeOrigem = formatarCidade(cidades.find((c) => c._id === permuta.servidor1.cidadeAtual));
    const cidadeDestino = formatarCidade(cidades.find((c) => c._id === permuta.cidadeTroca));

    return (
        <Link href={`/permutas/${permuta._id}`} className="flex flex-row items-center justify-between gap-4 px-6 py-4 border-b border-[rgba(0,0,0,0.08)] last:border-0 hover:bg-[#F8FBFD]">
            <div className="flex flex-col">
                <span className="text-xs md:text-sm font-bold text-slate-900">{permuta.servidor1.nome}</span>
                <span className="text-[8px] md:text-xs opacity-70">{permuta.servidor1.cargo}</span>
            </div>

            <div className="flex flex-row items-center gap-2 text-sm">
                <span className="text-xs md:text-sm text-slate-700">{cidadeOrigem}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-slate-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
                <span className="text-[#21914E] font-medium text-xs md:text-sm">{cidadeDestino}</span>
            </div>

            <StatusPermuta status={permuta.status} />

            <span className="text-xs text-slate-400 w-20 text-right hidden md:flex">{dataDoId(permuta._id)}</span>
        </Link>
    );
}

export default function Home() {
    const [nome, setNome] = useState("");
    const [permutas, setPermutas] = useState<PermutaDisponivel[]>([]);
    const [cidades, setCidades] = useState<Cidade[]>([]);
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function carregar() {
            try {
                const usuario = getUsuario();
                if (!usuario) {
                    window.location.href = "/login";
                    return;
                }
                setNome(usuario.nome);
                const [listaPermutas, listaCidades] = await Promise.all([
                    api<PermutaDisponivel[]>("/permutas"),
                    api<Cidade[]>("/cidades"),
                ]);
                const maisRecentes = [...listaPermutas]
                    .sort((a, b) => b._id.localeCompare(a._id))
                    .slice(0, 3);
                setPermutas(maisRecentes);
                setCidades(listaCidades);
            } catch (err) {
                setErro(err instanceof Error ? err.message : "Erro ao carregar.");
            } finally {
                setCarregando(false);
            }
        }
        carregar();
    }, []);

    return (
        <PaginaLayout>
            <CabecalhoPagina
                titulo={nome ? `Olá, ${nome}` : "Olá,"}
                subtitulo="Bem-vinda ao PermutaJá — Gerencie suas permutas de forma simples, transparente e rápida."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {CARDS_RESUMO.map((card) => (
                    <CardResumo key={card.titulo} {...card} />
                ))}
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <h2 className="text-lg md:text-xl font-bold text-slate-900">Últimas Permutas Publicadas</h2>
                    <p className="text-xs md:text-sm opacity-70 font-light">
                        Confira as intenções de permuta mais recentes registradas na plataforma.
                    </p>
                </div>

                {erro && <p className="text-xs text-red-600">{erro}</p>}

                <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.1216)] overflow-hidden">
                    {permutas.map((permuta) => (
                        <LinhaPermuta key={permuta._id} permuta={permuta} cidades={cidades} />
                    ))}
                    {!carregando && permutas.length === 0 && (
                        <p className="text-xs text-center text-slate-500 py-8">Nenhuma permuta publicada no momento.</p>
                    )}
                </div>
            </div>
        </PaginaLayout>
    );
}