"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PaginaLayout from "../../components/PaginaLayout";
import CabecalhoPagina from "../../components/CabecalhoPagina";
import { api, getUsuario, formatarCidade, dataDoId, type Cidade, type Servidor } from "../../lib/api";

function Linha({ rotulo, children }: { rotulo: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-8 py-3 border-b border-[rgba(0,0,0,0.08)] text-xs md:text-sm last:border-0">
            <span className="md:w-48 text-slate-500 font-bold">{rotulo}</span>
            <span className="font-medium">{children}</span>
        </div>
    );
}

export default function MeuPerfil() {
    const [servidor, setServidor] = useState<Servidor | null>(null);
    const [cidades, setCidades] = useState<Cidade[]>([]);
    const [erro, setErro] = useState("");

    useEffect(() => {
        async function carregar() {
            try {
                const usuario = getUsuario();
                if (!usuario) {
                    window.location.href = "/login";
                    return;
                }
                const [dadosServidor, listaCidades] = await Promise.all([
                    api<Servidor>(`/servidores/${usuario.id}`),
                    api<Cidade[]>("/cidades"),
                ]);
                setServidor(dadosServidor);
                setCidades(listaCidades);
            } catch (err) {
                setErro(err instanceof Error ? err.message : "Erro ao carregar.");
            }
        }
        carregar();
    }, []);

    return (
        <PaginaLayout>
            <CabecalhoPagina
                titulo="Meu Perfil"
                subtitulo="Confira os seus dados de identificação cadastrados na plataforma."
            />

            {erro && <p className="text-xs text-red-600">{erro}</p>}

            {servidor && (
                <>
                    <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.1216)] p-4 md:p-6">
                        <Linha rotulo="Nome Completo">{servidor.nome}</Linha>
                        <Linha rotulo="E-mail">{servidor.email ?? "—"}</Linha>
                        <Linha rotulo="Cargo">{servidor.cargo}</Linha>
                        <Linha rotulo="Cidade Atual">{formatarCidade(cidades.find((c) => c._id === servidor.cidadeAtual))}</Linha>
                        <Linha rotulo="Data do Cadastro">{dataDoId(servidor._id)}</Linha>
                    </div>

                    <div className="flex justify-end">
                        <Link href="/servidor/editar" className="flex items-center gap-2 bg-[#21914E] text-white text-xs font-bold px-5 py-2 rounded-md hover:scale-105 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />
                            </svg>
                            Editar Perfil
                        </Link>
                    </div>
                </>
            )}
        </PaginaLayout>
    );
}