import MenuLateral from "../../components/menuLateral/page";

const CARDS_RESUMO = [
    {
        eyebrow: "Encontre uma troca compatível",
        titulo: "Vagas de Permutas",
        texto: "Busque entre os servidores cadastrados por outros usuários.",
        link: "Ver vagas",
    },
    {
        eyebrow: "Negocie e acompanhe",
        titulo: "Acompanhamento",
        texto: "Envie sua proposta e acompanhe o status até a conclusão.",
        link: "Gerenciar",
    },
    {
        eyebrow: "Cidades Cadastradas",
        titulo: "Diversas Cidades",
        texto: "Encontre a sua cidade de destino perfeita.",
        link: null,
    },
];

const ULTIMAS_PERMUTAS = [
    {
        nome: "Ana Souza Silva",
        cargo: "Assistente Administrativo",
        cidadeOrigem: "Dourados — MS",
        cidadeDestino: "Campo Grande — MS",
        status: "Disponível",
        data: "Hoje",
    },
    {
        nome: "Marcos Roberto de Oliveira",
        cargo: "Analista de TI",
        cidadeOrigem: "Campo Grande — MS",
        cidadeDestino: "Três Lagoas — MS",
        status: "Disponível",
        data: "Ontem",
    },
    {
        nome: "Juliana Costa Mendes",
        cargo: "Professora de Educação Básica",
        cidadeOrigem: "Três Lagoas — MS",
        cidadeDestino: "Aquidauana — MS",
        status: "Disponível",
        data: "10 mar",
    },
];

function CardResumo({ eyebrow, titulo, texto, link }: { eyebrow: string; titulo: string; texto: string; link: string | null }) {
    return (
        <div className="flex flex-col gap-3 bg-white rounded-lg border border-[rgba(0,0,0,0.1216)] min-h-[12rem] w-full px-5 py-5">
            <p className="text-xs font-bold">{eyebrow}</p>
            <div className="flex flex-col gap-1">
                <h2 className="text-xl md:text-2xl font-bold text-[#21914E]">{titulo}</h2>
                <p className="text-xs opacity-80 font-light">{texto}</p>
            </div>

            {link && (
                <div className="flex flex-row items-center gap-1 text-[#21914E] mt-auto">
                    <p className="text-xs font-bold cursor-pointer">{link}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5 15.75 12l-7.5 7.5" />
                    </svg>
                </div>
            )}
        </div>
    );
}

function StatusPermuta({ status }: { status: string }) {
    return (
        <span className="hidden md:flex rounded-full border border-[#21914E] px-3 py-1 text-xs font-bold text-[#21914E] whitespace-nowrap">
            {status}
        </span>
    );
}

type Permuta = (typeof ULTIMAS_PERMUTAS)[number];

function LinhaPermuta({ permuta }: { permuta: Permuta }) {
    return (
        <div className="flex flex-row items-center justify-between gap-4 px-6 py-4 border-b border-[rgba(0,0,0,0.08)] last:border-0">
            <div className="flex flex-col">
                <span className="text-xs md:text-sm font-bold text-slate-900">{permuta.nome}</span>
                <span className="text-[8px] md:text-xs opacity-70">{permuta.cargo}</span>
            </div>

            <div className="flex flex-row items-center gap-2 text-sm">
                <span className="text-xs md:text-sm text-slate-700">{permuta.cidadeOrigem}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-slate-400 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
                <span className="text-[#21914E] font-medium text-xs md:text-sm">{permuta.cidadeDestino}</span>
            </div>

            <StatusPermuta status={permuta.status} />

            <span className="text-xs text-slate-400 w-14 text-right hidden md:flex">{permuta.data}</span>
        </div>
    );
}

export default function Permutas() {
    return (
        <div>
            <main className="w-full min-h-screen bg-[#F8FBFD]">
                <MenuLateral />

                <div className="flex flex-col min-h-screen md:ml-[20vw] pt-16 md:pt-10 pb-10 px-8 gap-10">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl md:text-4xl font-bold tracking-tight">Olá,</h1>
                        <p className="text-xs md:text-sm font-light opacity-80">
                            Bem-vinda ao PermutaJá — Gerencie suas permutas de forma simples, transparente e rápida.
                        </p>
                    </div>

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

                        <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.1216)] overflow-hidden">
                            {ULTIMAS_PERMUTAS.map((permuta) => (
                                <LinhaPermuta key={permuta.nome} permuta={permuta} />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}