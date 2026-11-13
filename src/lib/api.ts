export type Cidade = { _id: string; nomeCidade: string; estado: string };
export type Servidor = { _id: string; nome: string; cargo: string; orgao: string; cidadeAtual?: string };
export type Permuta = {
    _id: string;
    servidor1: string;
    servidor2?: string;
    status: string;
    cidadeTroca: string;
    justificativa?: string;
    observacoes?: string;
};

export type PermutaDisponivel = Omit<Permuta, "servidor1"> & { servidor1: Servidor };

export const STATUS: Record<string, { label: string; classe: string }> = {
    solicitada: { label: "Solicitada", classe: "bg-yellow-100 text-yellow-800 border-yellow-300" },
    aceita: { label: "Aceita", classe: "bg-green-100 text-green-700 border-green-300" },
    recusada: { label: "Recusada", classe: "bg-red-100 text-red-700 border-red-300" },
    cancelada: { label: "Cancelada", classe: "bg-gray-100 text-gray-600 border-gray-300" },
    concluida: { label: "Concluída", classe: "bg-blue-100 text-blue-700 border-blue-300" },
};

export function getUsuario(): { id: string; nome: string } | null {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
        const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
        const json = decodeURIComponent(
            atob(base64).split("").map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join("")
        );
        return JSON.parse(json);
    } catch {
        return null;
    }
}

export async function api<T = unknown>(caminho: string, opcoes: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem("token");
    const resposta = await fetch(`/api${caminho}`, {
        ...opcoes,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });
    if (resposta.status === 401 || resposta.status === 403) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        throw new Error("Sessão expirada.");
    }
    const dados = await resposta.json();
    if (!resposta.ok) throw new Error(dados.mensagem || dados.error || "Erro na requisição.");
    return dados as T;
}

export function formatarCidade(cidade?: Cidade): string {
    if (!cidade) return "—";
    const nome = cidade.nomeCidade.toLowerCase().replace(/(^|\s)\S/g, (l) => l.toUpperCase());
    return `${nome} — ${cidade.estado}`;
}

export function dataDoId(id: string): string {
    return new Date(parseInt(id.substring(0, 8), 16) * 1000).toLocaleDateString("pt-BR");
}