"use client";

import { useEffect, useState, type SyntheticEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PaginaLayout from "../../../components/PaginaLayout";
import CabecalhoPagina from "../../../components/CabecalhoPagina";
import { api, getUsuario, formatarCidade, type Cidade, type Servidor } from "../../../lib/api";

const CLASSE_INPUT = "w-full p-2 border border-gray-300 rounded-md text-xs outline-none focus:ring-1 focus:ring-blue-100";
const CLASSE_LABEL = "text-xs font-bold mb-1";

export default function NovaSolicitacao() {
    const router = useRouter();
    const [servidor, setServidor] = useState<Servidor | null>(null);
    const [cidades, setCidades] = useState<Cidade[]>([]);
    const [cidadeTroca, setCidadeTroca] = useState("");
    const [justificativa, setJustificativa] = useState("");
    const [observacoes, setObservacoes] = useState("");
    const [erro, setErro] = useState("");
    const [enviando, setEnviando] = useState(false);

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

    async function enviar(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        setErro("");
        setEnviando(true);
        try {
            await api("/permutas", {
                method: "POST",
                body: JSON.stringify({ cidadeTroca, justificativa, observacoes }),
            });
            router.push("/permutas");
        } catch (err) {
            setErro(err instanceof Error ? err.message : "Erro ao enviar.");
        } finally {
            setEnviando(false);
        }
    }

    const cidadeAtual = cidades.find((c) => c._id === servidor?.cidadeAtual);
    const opcoes = cidades.filter((c) => c._id !== servidor?.cidadeAtual);

    return (
        <PaginaLayout>
            <CabecalhoPagina
                titulo="Nova Solicitação de Permuta"
                subtitulo="Crie uma nova intenção de permuta pública informando seus objetivos e detalhes de trabalho."
                voltar="/permutas"
            />

            <form onSubmit={enviar} className="flex flex-col gap-6">
                <div className="flex flex-col gap-4 bg-white rounded-lg border border-[rgba(0,0,0,0.1216)] p-4 md:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className={CLASSE_LABEL}>Cidade Atual</label>
                            <input disabled value={formatarCidade(cidadeAtual)} className={`${CLASSE_INPUT} bg-slate-200`} />
                        </div>
                        <div className="flex flex-col">
                            <label className={CLASSE_LABEL}>Cargo Atual</label>
                            <input disabled value={servidor?.cargo ?? ""} className={`${CLASSE_INPUT} bg-slate-200`} />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="cidadeTroca" className={CLASSE_LABEL}>Cidade Desejada *</label>
                        <select id="cidadeTroca" value={cidadeTroca} onChange={(e) => setCidadeTroca(e.target.value)} className={CLASSE_INPUT} required>
                            <option value="">Selecione a cidade de destino pretendida</option>
                            {opcoes.map((c) => (
                                <option key={c._id} value={c._id}>{formatarCidade(c)}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="justificativa" className={CLASSE_LABEL}>Justificativa / Motivo da Permuta *</label>
                        <textarea id="justificativa" rows={4} value={justificativa} onChange={(e) => setJustificativa(e.target.value)}
                            className={CLASSE_INPUT} placeholder="Explique brevemente as razões de interesse de troca de lotação ou motivos de ordem pessoal/profissional..." required />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="observacoes" className={CLASSE_LABEL}>Observações Adicionais</label>
                        <textarea id="observacoes" rows={2} value={observacoes} onChange={(e) => setObservacoes(e.target.value)}
                            className={CLASSE_INPUT} placeholder="Horários preferenciais, contato alternativo ou qualquer outra informação relevante." />
                    </div>
                </div>

                {erro && <p className="text-xs text-red-600">{erro}</p>}

                <div className="flex justify-end items-center gap-4">
                    <Link href="/permutas" className="text-xs text-slate-600">Cancelar</Link>
                    <button type="submit" disabled={enviando} className="bg-[#21914E] text-white text-xs font-bold px-5 py-2 rounded-md disabled:opacity-60 cursor-pointer">
                        {enviando ? "Enviando..." : "Enviar Solicitação"}
                    </button>
                </div>
            </form>
        </PaginaLayout>
    );
}