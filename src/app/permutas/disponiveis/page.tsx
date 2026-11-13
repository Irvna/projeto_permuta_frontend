"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PaginaLayout from "../../../components/PaginaLayout";
import CabecalhoPagina from "../../../components/CabecalhoPagina";
import SeloStatus from "../../../components/SeloStatus";
import { api, formatarCidade, type Cidade, type PermutaDisponivel } from "../../../lib/api";

export default function PermutasDisponiveis() {
    const [permutas, setPermutas] = useState<PermutaDisponivel[]>([]);
    const [cidades, setCidades] = useState<Cidade[]>([]);
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function carregar() {
            try {
                const [listaPermutas, listaCidades] = await Promise.all([
                    api<PermutaDisponivel[]>("/permutas"),
                    api<Cidade[]>("/cidades"),
                ]);
                setPermutas(listaPermutas);
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
                titulo="Permutas Disponíveis"
                subtitulo="Veja as permutas disponíveis de outros servidores e encontre uma oportunidade ideal de troca."
            />

            <div className="flex flex-col gap-4 bg-white rounded-lg border border-[rgba(0,0,0,0.1216)] p-4 md:p-6">
                {erro && <p className="text-xs text-red-600">{erro}</p>}

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[40rem] text-left text-xs">
                        <thead>
                            <tr className="bg-[#F8FBFD] text-slate-600">
                                <th className="px-3 py-3 font-bold">Servidor</th>
                                <th className="px-3 py-3 font-bold">Cargo</th>
                                <th className="px-3 py-3 font-bold">Cidade Atual</th>
                                <th className="px-3 py-3 font-bold">Cidade Desejada</th>
                                <th className="px-3 py-3 font-bold">Status</th>
                                <th className="px-3 py-3 font-bold text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {permutas.map((p) => (
                                <tr key={p._id} className="border-b border-[rgba(0,0,0,0.08)] last:border-0">
                                    <td className="px-3 py-4 font-bold">{p.servidor1.nome}</td>
                                    <td className="px-3 py-4">{p.servidor1.cargo}</td>
                                    <td className="px-3 py-4">{formatarCidade(cidades.find((c) => c._id === p.servidor1.cidadeAtual))}</td>
                                    <td className="px-3 py-4">{formatarCidade(cidades.find((c) => c._id === p.cidadeTroca))}</td>
                                    <td className="px-3 py-4"><SeloStatus status={p.status} /></td>
                                    <td className="px-3 py-4 text-right">
                                        <Link href={`/permutas/${p._id}`} className="bg-[#21914E] text-white text-[10px] font-bold px-3 py-1.5 rounded">
                                            Ver Detalhes
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {!carregando && permutas.length === 0 && (
                        <p className="text-xs text-center text-slate-500 py-8">Nenhuma permuta disponível no momento.</p>
                    )}
                </div>
            </div>
        </PaginaLayout>
    );
}