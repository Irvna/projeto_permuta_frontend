"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PaginaLayout from "../../../components/PaginaLayout";
import CabecalhoPagina from "../../../components/CabecalhoPagina";
import SeloStatus from "../../../components/SeloStatus";
import ModalConfirmar from "../../../components/ModalConfirmar";
import { api, getUsuario, formatarCidade, dataDoId, type Permuta, type Cidade, type Servidor } from "../../../lib/api";

function Linha({ rotulo, children }: { rotulo: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-8 py-3 border-b border-[rgba(0,0,0,0.08)] text-xs md:text-sm">
            <span className="md:w-48 text-slate-500 font-bold">{rotulo}</span>
            <span className="font-medium">{children}</span>
        </div>
    );
}

export default function DetalhesPermuta() {
    const { id } = useParams<{ id: string }>();
    const [permuta, setPermuta] = useState<Permuta | null>(null);
    const [servidor, setServidor] = useState<Servidor | null>(null);
    const [interessado, setInteressado] = useState<Servidor | null>(null);
    const [cidades, setCidades] = useState<Cidade[]>([]);
    const [usuarioId, setUsuarioId] = useState<string | null>(null);
    const [erro, setErro] = useState("");
    const [modalAberto, setModalAberto] = useState(false);

    useEffect(() => {
        async function carregar() {
            try {
                setUsuarioId(getUsuario()?.id ?? null);
                const dadosPermuta = await api<Permuta>(`/permutas/${id}`);
                const [dadosServidor, listaCidades] = await Promise.all([
                    api<Servidor>(`/servidores/${dadosPermuta.servidor1}`),
                    api<Cidade[]>("/cidades"),
                ]);
                setPermuta(dadosPermuta);
                setServidor(dadosServidor);
                setCidades(listaCidades);

                if (dadosPermuta.servidor2) {
                    setInteressado(await api<Servidor>(`/servidores/${dadosPermuta.servidor2}`));
                }
            } catch (err) {
                setErro(err instanceof Error ? err.message : "Erro ao carregar.");
            }
        }
        carregar();
    }, [id]);

    async function cancelar() {
        try {
            const atualizada = await api<Permuta>(`/permutas/${id}`, {
                method: "PUT",
                body: JSON.stringify({ status: "cancelada" }),
            });
            setPermuta(atualizada);
        } catch (err) {
            setErro(err instanceof Error ? err.message : "Erro ao cancelar.");
        } finally {
            setModalAberto(false);
        }
    }

    async function solicitar() {
        try {
            const atualizada = await api<Permuta>(`/permutas/${id}`, {
                method: "PUT",
                body: JSON.stringify({ servidor2: usuarioId }),
            });
            setPermuta(atualizada);
        } catch (err) {
            setErro(err instanceof Error ? err.message : "Erro ao solicitar.");
        }
    }

    async function responder(novoStatus: "aceita" | "recusada" | "concluida") {
        try {
            const atualizada = await api<Permuta>(`/permutas/${id}`, {
                method: "PUT",
                body: JSON.stringify({ status: novoStatus }),
            });
            setPermuta(atualizada);
        } catch (err) {
            setErro(err instanceof Error ? err.message : "Erro ao responder.");
        }
    }

    async function desistir() {
        try {
            const atualizada = await api<Permuta>(`/permutas/${id}`, {
                method: "PUT",
                body: JSON.stringify({ status: "solicitada", servidor2: null }),
            });
            setPermuta(atualizada);
            setInteressado(null);
        } catch (err) {
            setErro(err instanceof Error ? err.message : "Erro ao desistir.");
        }
    }

    const cidadeAtual = formatarCidade(cidades.find((c) => c._id === servidor?.cidadeAtual));
    const cidadeDesejada = formatarCidade(cidades.find((c) => c._id === permuta?.cidadeTroca));
    const textoJustificativa = [permuta?.justificativa, permuta?.observacoes].filter(Boolean).join("\n\n");
    const ehDono = usuarioId !== null && usuarioId === permuta?.servidor1;

    return (
        <PaginaLayout>
            <CabecalhoPagina
                titulo={ehDono ? "Detalhes da Permuta Solicitada" : "Detalhes da Permuta"}
                voltar={ehDono ? "/permutas" : "/permutas/disponiveis"}
            />

            {erro && <p className="text-xs text-red-600">{erro}</p>}

            {permuta && servidor && (
                <>
                    <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.1216)] p-4 md:p-6">
                        <Linha rotulo="Servidor Solicitante">{servidor.nome}</Linha>
                        <Linha rotulo="Cargo">{servidor.cargo}</Linha>
                        <Linha rotulo="Cidade Atual">{cidadeAtual}</Linha>
                        <Linha rotulo="Cidade Desejada">{cidadeDesejada}</Linha>
                        <Linha rotulo="Data de Publicação">{dataDoId(permuta._id)}</Linha>
                        {(ehDono || permuta.servidor2 === usuarioId) && (
                            <Linha rotulo="Status"><SeloStatus status={permuta.status} /></Linha>
                        )}
                        {ehDono && interessado && (
                            <Linha rotulo="Interessado">{interessado.nome} — {interessado.cargo}</Linha>
                        )}
                        <div className="flex flex-col gap-2 pt-4">
                            <span className="text-xs font-bold text-slate-500">Justificativa / Observações:</span>
                            <p className="bg-[#F8FBFD] rounded-md p-4 text-xs md:text-sm whitespace-pre-line">{textoJustificativa || "—"}</p>
                        </div>
                    </div>

                    {permuta.status === "solicitada" && (
                        <div className="flex justify-end">
                            {ehDono ? (
                                <div className="flex gap-2">
                                    {interessado && (
                                        <>
                                            <button onClick={() => responder("aceita")} className="bg-[#21914E] text-white text-xs font-bold px-5 py-2 rounded-md cursor-pointer">
                                                Aceitar
                                            </button>
                                            <button onClick={() => responder("recusada")} className="bg-gray-500 text-white text-xs font-bold px-5 py-2 rounded-md cursor-pointer">
                                                Recusar
                                            </button>
                                        </>
                                    )}
                                    <button onClick={() => setModalAberto(true)} className="bg-red-600 text-white text-xs font-bold px-5 py-2 rounded-md hover:bg-red-700 cursor-pointer">
                                        Cancelar Permuta
                                    </button>
                                </div>
                            ) : !permuta.servidor2 ? (
                                <button onClick={solicitar} className="bg-[#21914E] text-white text-xs font-bold px-5 py-2 rounded-md hover:scale-105 transition cursor-pointer">
                                    Solicitar Permuta
                                </button>
                            ) : permuta.servidor2 === usuarioId ? (
                                <p className="text-xs font-bold text-[#21914E]">Você já solicitou esta permuta.</p>
                            ) : null}
                        </div>
                    )}
                    {permuta.status === "aceita" && ehDono && (
                        <p className="text-xs text-slate-500 text-right">Aguardando {interessado?.nome} concluir.</p>
                    )}
                    {permuta.status === "aceita" && permuta.servidor2 === usuarioId && (
                        <div className="flex flex-col gap-3">
                            <p className="text-xs md:text-sm bg-green-50 border border-green-300 text-green-800 rounded-md p-4">
                                {servidor.nome} aceitou a sua solicitação de permuta.
                            </p>
                            <div className="flex justify-end gap-2">
                                <button onClick={desistir} className="bg-gray-500 text-white text-xs font-bold px-5 py-2 rounded-md cursor-pointer">
                                    Não concluir
                                </button>
                                <button onClick={() => responder("concluida")} className="bg-[#21914E] text-white text-xs font-bold px-5 py-2 rounded-md cursor-pointer">
                                    Concluir Permuta
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
            <ModalConfirmar
                aberto={modalAberto}
                titulo="Cancelar permuta"
                mensagem="Deseja cancelar esta permuta? Essa ação não pode ser desfeita."
                textoConfirmar="Cancelar permuta"
                onConfirmar={cancelar}
                onCancelar={() => setModalAberto(false)}
            />
        </PaginaLayout>
    );
}