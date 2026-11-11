"use client";

import { useState, type SyntheticEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const CLASSE_INPUT = "h-[8vw] md:h-[2.5vw] p-2 border border-gray-300 rounded-md text-xs outline-none focus:ring-1 focus:ring-blue-100 transition-all";
const CLASSE_LABEL = "text-xs md:text-sm font-bold mb-1";

export default function Cadastro() {
    const router = useRouter();
    const [form, setForm] = useState({ nome: '', email: '', cargo: '', orgao: '', senha: '' });
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);

    function atualizar(campo: keyof typeof form, valor: string) {
        setForm((anterior) => ({ ...anterior, [campo]: valor }));
    }

    async function enviarCadastro(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        setErro('');
        setCarregando(true);
        try {
            const resposta = await fetch('/api/servidores', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const dados = await resposta.json();
            if (!resposta.ok) throw new Error(dados.mensagem || dados.error || 'Erro ao cadastrar.');
            router.push('/login');
        } catch (err) {
            setErro(err instanceof Error ? err.message : 'Erro ao cadastrar.');
        } finally {
            setCarregando(false);
        }
    }

    return (
        <div id="cadastro" className="flex flex-col min-h-screen w-full text-white">
            <div className="flex justify-between items-justify bg-[#10294B] px-3 md:px-10 py-5 md:py-2">
                <img src="/permutaja_logo.png" alt="Logo Permuta Já" className="w-45 md:w-90 h-auto" />
            </div>
            <div className="flex justify-center items-center text-sm text-black bg-linear-to-b from-[#204573] to-[#10294B] lg:bg-none md:bg-white py-8 h-full">
                <div className="flex flex-col w-[80vw] lg:w-[50vw] h-auto bg-[#F8FBFD] rounded-[2vw] border border-black px-5 md:px-8 py-6 md:py-12 gap-8 md:gap-15">
                    <div className="flex flex-col gap-1 md:gap-3">
                        <p className="text-3xl md:text-5xl font-bold tracking-1">Criar Conta</p>
                        <p className="text-xs font-light opacity-80">Preencha os campos abaixo para criar sua conta</p>
                    </div>
                    <form onSubmit={enviarCadastro} className="flex flex-col w-full justify-center gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="nome" className={CLASSE_LABEL}>Nome</label>
                            <input type="text" id="nome" value={form.nome} onChange={(e) => atualizar('nome', e.target.value)}
                                className={CLASSE_INPUT} placeholder="Fulano de tal" required />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email" className={CLASSE_LABEL}>E-mail</label>
                            <input type="email" id="email" value={form.email} onChange={(e) => atualizar('email', e.target.value)}
                                className={CLASSE_INPUT} placeholder="exemplo@gmail.com" required />
                        </div>
                        <div className="flex flex-col justify-between md:flex-row gap-2">
                            <div className="flex flex-col w-full">
                                <label htmlFor="cargo" className={CLASSE_LABEL}>Cargo</label>
                                <input type="text" id="cargo" value={form.cargo} onChange={(e) => atualizar('cargo', e.target.value)}
                                    className={CLASSE_INPUT} placeholder="Assistente Administrativo" required />
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="orgao" className={CLASSE_LABEL}>Órgão</label>
                                <input type="text" id="orgao" value={form.orgao} onChange={(e) => atualizar('orgao', e.target.value)}
                                    className={CLASSE_INPUT} placeholder="Prefeitura Municipal de Dourados" required />
                            </div>
                        </div>
                        <div className="flex flex-col mb-6">
                            <label htmlFor="password" className={CLASSE_LABEL}>Senha</label>
                            <input type="password" id="password" value={form.senha} onChange={(e) => atualizar('senha', e.target.value)}
                                className={CLASSE_INPUT} placeholder="••••••••" required />
                        </div>
                        {erro && <p className="text-xs text-red-600 text-center">{erro}</p>}
                        <button
                            type="submit"
                            disabled={carregando}
                            className="w-full bg-[#21914E] text-white font-bold py-2 rounded-md transition delay-100 ease-in-out hover:scale-102 disabled:opacity-60"
                        >
                            {carregando ? 'Cadastrando...' : 'Cadastrar'}
                        </button>
                        <div className="text-xs md:text-sm text-center">
                            Já possui conta? <Link href="/login" className="text-blue-600 hover:underline">Entrar</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
