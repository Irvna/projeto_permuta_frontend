type Props = {
    aberto: boolean;
    titulo: string;
    mensagem: string;
    textoConfirmar?: string;
    onConfirmar: () => void;
    onCancelar: () => void;
};

export default function ModalConfirmar({ aberto, titulo, mensagem, textoConfirmar = "Confirmar", onConfirmar, onCancelar }: Props) {
    if (!aberto) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-sm bg-white rounded-lg p-6 flex flex-col gap-4">
                <h2 className="text-base font-bold">{titulo}</h2>
                <p className="text-xs text-slate-600">{mensagem}</p>
                <div className="flex justify-end gap-3">
                    <button onClick={onCancelar} className="text-xs text-slate-600 px-4 py-2 cursor-pointer">
                        Voltar
                    </button>
                    <button onClick={onConfirmar} className="bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-md hover:bg-red-700 cursor-pointer">
                        {textoConfirmar}
                    </button>
                </div>
            </div>
        </div>
    );
}