"use client";

import { useEffect, useState, type SyntheticEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PaginaLayout from "../../../components/PaginaLayout";
import CabecalhoPagina from "../../../components/CabecalhoPagina";
import { api, getUsuario, formatarCidade, type Cidade, type Servidor } from "../../../lib/api";

const CLASSE_INPUT = "w-full p-2 border border-gray-300 rounded-md text-xs outline-none focus:ring-1 focus:ring-blue-100";
const CLASSE_LABEL = "text-xs font-bold mb-1";

export default function EditarPerfil() {
    const router = useRouter();
    const [servidor, setServidor] = useState<Servidor | null>(null);
    const [cidades, setCidades] = useState<Cidade[]>([]);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cidadeAtual, setCidadeAtual] = useState("");
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
                setNome(dadosServidor.nome);
                setEmail(dadosServidor.email ?? "");
                setCidadeAtual(dadosServidor.cidadeAtual ?? "");
            } catch (err) {
                setErro(err instanceof Error ? err.message : "Erro ao carregar.");
            }
        }
        carregar();
    }, []);

    async function salvar(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!servidor) return;
        setErro("");
        setEnviando(true);
        try {
            await api(`/servidores/${servidor._id}`, {
                method: "PUT",
                body: JSON.stringify({ nome, email, cidadeAtual }),
            });
            router.push("/servidor");
        } catch (err) {
            setErro(err instanceof Error ? err.message : "Erro ao salvar.");
        } finally {
            setEnviando(false);
        }
    }

    return (
        <PaginaLayout>
            <CabecalhoPagina
                titulo="Editar Perfil"
                subtitulo="Mantenha suas informações e chaves de acesso sempre atualizadas."
                voltar="/perfil"
            />

            <form onSubmit={salvar} className="flex flex-col gap-6">
                <div className="flex flex-col gap-4 bg-white rounded-lg border border-[rgba(0,0,0,0.1216)] p-4 md:p-6">
                    <div className="flex flex-col">
                        <label htmlFor="nome" className={CLASSE_LABEL}>Nome Completo *</label>
                        <input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} className={CLASSE_INPUT} required />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="email" className={CLASSE_LABEL}>E-mail *</label>
                        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={CLASSE_INPUT} required />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className={CLASSE_LABEL}>Cargo (Não editável)</label>
                            <input disabled value={servidor?.cargo ?? ""} className={`${CLASSE_INPUT} bg-slate-200`} />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="cidadeAtual" className={CLASSE_LABEL}>Cidade Atual *</label>
                            <select id="cidadeAtual" value={cidadeAtual} onChange={(e) => setCidadeAtual(e.target.value)} className={CLASSE_INPUT} required>
                                <option value="">Selecione sua cidade</option>
                                {cidades.map((c) => (
                                    <option key={c._id} value={c._id}>{formatarCidade(c)}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <h2 className="text-sm font-bold pt-2">Alterar Senha</h2>

                    <div className="flex flex-col">
                        <label htmlFor="senhaAtual" className={CLASSE_LABEL}>Senha Atual</label>
                        <input id="senhaAtual" type="password" placeholder="Digite sua senha atual" className={CLASSE_INPUT} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="novaSenha" className={CLASSE_LABEL}>Nova Senha</label>
                            <input id="novaSenha" type="password" placeholder="Mínimo 8 caracteres" className={CLASSE_INPUT} />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="confirmarSenha" className={CLASSE_LABEL}>Confirmar Nova Senha</label>
                            <input id="confirmarSenha" type="password" placeholder="Repita a nova senha" className={CLASSE_INPUT} />
                        </div>
                    </div>
                </div>

                {erro && <p className="text-xs text-red-600">{erro}</p>}

                <div className="flex justify-end items-center gap-4">
                    <Link href="/servidor" className="text-xs text-slate-600">Cancelar</Link>
                    <button type="submit" disabled={enviando} className="bg-[#21914E] text-white text-xs font-bold px-5 py-2 rounded-md disabled:opacity-60 cursor-pointer">
                        {enviando ? "Salvando..." : "Salvar Alterações"}
                    </button>
                </div>
            </form>
        </PaginaLayout>
    );
}