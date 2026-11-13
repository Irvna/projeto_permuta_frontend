import { STATUS } from "../lib/api";

export default function SeloStatus({ status }: { status: string }) {
    const info = STATUS[status] ?? { label: status, classe: "bg-gray-100 text-gray-600 border-gray-300" };
    return (
        <span className={`border rounded px-2 py-0.5 text-[10px] font-bold ${info.classe}`}>
            {info.label}
        </span>
    );
}