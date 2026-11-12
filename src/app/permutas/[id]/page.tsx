"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PaginaLayout from "../../../components/PaginaLayout";
import CabecalhoPagina from "../../../components/CabecalhoPagina";
import SeloStatus from "../../../components/SeloStatus";
import ModalConfirmar from "../../../components/ModalConfirmar";
import { api, formatarCidade, dataDoId, type Permuta, type Cidade, type Servidor } from "../../../lib/api";

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
    const [cidades, setCidades] = useState<Cidade[]>([]);
    const [erro, setErro] = useState("");
    const [modalAberto, setModalAberto] = useState(false);

    useEffect(() => {
        async function carregar() {
            try {
                const dadosPermuta = await api<Permuta>(`/permutas/${id}`);
                const [dadosServidor, listaCidades] = await Promise.all([
                    api<Servidor>(`/servidores/${dadosPermuta.servidor1}`),
                    api<Cidade[]>("/cidades"),
                ]);
                setPermuta(dadosPermuta);
                setServidor(dadosServidor);
                setCidades(listaCidades);
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

    const cidadeAtual = formatarCidade(cidades.find((c) => c._id === servidor?.cidadeAtual));
    const cidadeDesejada = formatarCidade(cidades.find((c) => c._id === permuta?.cidadeTroca));
    const textoJustificativa = [permuta?.justificativa, permuta?.observacoes].filter(Boolean).join("\n\n");

    return (
        <PaginaLayout>
            <CabecalhoPagina titulo="Detalhes da Permuta Solicitada" voltar="/permutas" />

            {erro && <p className="text-xs text-red-600">{erro}</p>}

            {permuta && servidor && (
                <>
                    <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.1216)] p-4 md:p-6">
                        <Linha rotulo="Servidor Solicitante">{servidor.nome}</Linha>
                        <Linha rotulo="Cargo">{servidor.cargo}</Linha>
                        <Linha rotulo="Cidade Atual">{cidadeAtual}</Linha>
                        <Linha rotulo="Cidade Desejada">{cidadeDesejada}</Linha>
                        <Linha rotulo="Data de Publicação">{dataDoId(permuta._id)}</Linha>
                        <Linha rotulo="Status"><SeloStatus status={permuta.status} /></Linha>
                        <div className="flex flex-col gap-2 pt-4">
                            <span className="text-xs font-bold text-slate-500">Justificativa / Observações:</span>
                            <p className="bg-[#F8FBFD] rounded-md p-4 text-xs md:text-sm whitespace-pre-line">{textoJustificativa || "—"}</p>
                        </div>
                    </div>

                    {permuta.status === "solicitada" && (
                        <div className="flex justify-end">
                            <button onClick={() => setModalAberto(true)} className="bg-red-600 text-white text-xs font-bold px-5 py-2 rounded-md hover:bg-red-700 cursor-pointer">
                                Cancelar Permuta
                            </button>
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