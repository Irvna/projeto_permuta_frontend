import Link from 'next/link';

export default function EsqueciSenha() {
    return (
        <div id="cadastro" className="flex flex-col min-h-screen w-full text-white">
            <div className="flex flex-col justify-between items-justify bg-[#10294B] px-3 md:px-10 py-5 md:py-2">
                <img
                    src="/permutaja_logo.png"
                    alt="Logo Permuta Já"
                    className="w-45 aling-justify md:w-90 h-auto"
                />
            </div>
            <div className="flex justify-center items-center text-sm text-black bg-linear-to-b from-[#204573] to-[#10294B] lg:bg-none md:bg-white py-8 h-full">
                <div className="flex flex-col w-[80vw] lg:w-[45vw] bg-[#F8FBFD] rounded-[2vw] border border-black px-5 md:px-8 py-6 md:py-12 gap-8 md:gap-15">
                    <div className="flex flex-col gap-1 md:gap-3">
                        <p className="text-xl md:text-3xl font-bold tracking-1">Esqueci minha Senha</p>
                        <p className="text-xs font-light opacity-80">Informe seu e-mail para receber a senha de recuperação.</p>
                    </div>
                    {/* Inputs */}
                    <form
                        //onSubmit={enviarLogin}
                        className="flex flex-col w-full justify-center gap-4">
                        {/* Email */}
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-xs md:text-sm font-bold mb-1">
                                E-mail
                            </label>
                            <input
                                type="email"
                                id="email"
                                //value={email}
                                //onChange={(e) => setEmail(e.target.value)} // Atualiza o estado
                                className="h-[8vw] md:h-[2.5vw] p-2 border border-gray-300 rounded-md text-xs outline-none focus:ring-1 focus:ring-blue-100 transition-all"
                                placeholder="exemplo@gmail.com"
                                required
                            />
                        </div>
                        
                        {/* Botão de Submit */}
                        <button
                            type="submit"
                            className="w-full bg-[#21914E] text-xs md:text-sm text-white font-bold mt-2 py-2 rounded-md transition delay-100 ease-in-out hover:scale-102"
                        >
                            Enviar Código de Recuperação
                        </button>

                        {/* Link extra (opcional) */}
                        <div className="flex flex-col gap-1 text-center">
                            <a href="#" className="text-xs md:text-sm no-underline">
                                Possui tem conta? <Link href="/login" className="text-blue-600 hover:underline">Entrar</Link>
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
