"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PaginaLayout from "../../components/PaginaLayout";
import CabecalhoPagina from "../../components/CabecalhoPagina";
import SeloStatus from "../../components/SeloStatus";
import ModalConfirmar from "../../components/ModalConfirmar";
import { api, getUsuario, formatarCidade, dataDoId, type Permuta, type Cidade, type Servidor } from "../../lib/api";

export default function MinhasSolicitacoes() {
    const [permutas, setPermutas] = useState<Permuta[]>([]);
    const [cidades, setCidades] = useState<Cidade[]>([]);
    const [minhaCidade, setMinhaCidade] = useState("—");
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(true);
    const [idParaApagar, setIdParaApagar] = useState<string | null>(null);

    useEffect(() => {
        async function carregar() {
            try {
                const usuario = getUsuario();
                if (!usuario) {
                    window.location.href = "/login";
                    return;
                }
                const [listaPermutas, listaCidades, servidor] = await Promise.all([
                    api<Permuta[]>("/permutas/usuario"),
                    api<Cidade[]>("/cidades"),
                    api<Servidor>(`/servidores/${usuario.id}`),
                ]);
                setPermutas(listaPermutas);
                setCidades(listaCidades);
                setMinhaCidade(formatarCidade(listaCidades.find((c) => c._id === servidor.cidadeAtual)));
            } catch (err) {
                setErro(err instanceof Error ? err.message : "Erro ao carregar.");
            } finally {
                setCarregando(false);
            }
        }
        carregar();
    }, []);

    async function apagar() {
        if (!idParaApagar) return;

        try {
            await api(`/permutas/${idParaApagar}`, { method: "DELETE" });
            setPermutas((atual) => atual.filter((p) => p._id !== idParaApagar));
        } catch (err) {
            setErro(err instanceof Error ? err.message : "Erro ao apagar.");
        } finally {
            setIdParaApagar(null);
        }
    }

    return (
        <PaginaLayout>
            <CabecalhoPagina
                titulo="Minhas Solicitações"
                subtitulo="Gerencie, crie e acompanhe o andamento dos seus pedidos de permuta ativa."
            />

            <div className="flex flex-col gap-4 bg-white rounded-lg border border-[rgba(0,0,0,0.1216)] p-4 md:p-6">
                <div className="flex justify-end">
                    <Link href="/permutas/nova" className="bg-[#21914E] text-white text-xs font-bold px-4 py-2 rounded-md hover:scale-105 transition">
                        + Criar Nova Permuta
                    </Link>
                </div>

                {erro && <p className="text-xs text-red-600">{erro}</p>}

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[40rem] text-left text-xs">
                        <thead>
                            <tr className="bg-[#F8FBFD] text-slate-600">
                                <th className="px-3 py-3 font-bold">Cidade Atual</th>
                                <th className="px-3 py-3 font-bold">Cidade Desejada</th>
                                <th className="px-3 py-3 font-bold">Data da Solicitação</th>
                                <th className="px-3 py-3 font-bold">Status</th>
                                <th className="px-3 py-3 font-bold text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {permutas.map((p) => (
                                <tr key={p._id} className="border-b border-[rgba(0,0,0,0.08)] last:border-0">
                                    <td className="px-3 py-4 font-bold">{minhaCidade}</td>
                                    <td className="px-3 py-4">{formatarCidade(cidades.find((c) => c._id === p.cidadeTroca))}</td>
                                    <td className="px-3 py-4 text-slate-500">{dataDoId(p._id)}</td>
                                    <td className="px-3 py-4"><SeloStatus status={p.status} /></td>
                                    <td className="px-3 py-4">
                                        <div className="flex justify-end items-center gap-2">
                                            <Link href={`/permutas/${p._id}`} className="bg-[#21914E] text-white text-[10px] font-bold px-3 py-1.5 rounded">
                                                Ver Detalhes
                                            </Link>
                                            <button 
                                              onClick={() => setIdParaApagar(p._id)} aria-label="Apagar permuta" className="text-red-500 hover:text-red-700 cursor-pointer"
                                            >
                                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                              </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {!carregando && permutas.length === 0 && (
                        <p className="text-xs text-center text-slate-500 py-8">Você ainda não tem solicitações.</p>
                    )}
                </div>
            </div>
            <ModalConfirmar
              aberto={idParaApagar !== null}
              titulo="Apagar permuta"
              mensagem="Deseja apagar esta permuta definitivamente? Essa ação não pode ser desfeita."
              textoConfirmar="Apagar"
              onConfirmar={apagar}
              onCancelar={() => setIdParaApagar(null)}
          />
        </PaginaLayout>
    );
}