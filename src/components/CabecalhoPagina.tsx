import Link from "next/link";

type Props = { titulo: string; subtitulo?: string; voltar?: string };

export default function CabecalhoPagina({ titulo, subtitulo, voltar }: Props) {
    return (
        <div className="flex flex-col gap-2">
            {voltar && (
                <Link href={voltar} className="text-xs font-bold text-[#21914E]">← Voltar</Link>
            )}
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight">{titulo}</h1>
            {subtitulo && <p className="text-xs md:text-sm font-light opacity-80">{subtitulo}</p>}
        </div>
    );
}