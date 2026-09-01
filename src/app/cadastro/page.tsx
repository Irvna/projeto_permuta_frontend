import Link from 'next/link';

export default function Cadastro() {
    return (
        <div id="cadastro" className="grid grid-cols-1 min-h-screen w-full h-screen text-white">
            <div className="flex flex-col justify-between items-justify bg-[#10294B] px-3 md:px-10 py-5 md:py-2">
                <img
                    src="/permutaja_logo.png"
                    alt="Logo Permuta Já"
                    className="w-45 aling-justify md:w-90 h-auto"
                />
            </div>
            <div className="flex justify-center items-center text-sm text-black bg-linear-to-b from-[#204573] to-[#10294B] lg:bg-none md:bg-white py-8">
                <div className="flex flex-col w-[80vw] lg:w-[50vw] bg-[#F8FBFD] text-black rounded-[2vw] border border-black px-5 md:px-8 py-6 md:py-12 gap-8 md:gap-15">
                    <div className="flex flex-col gap-1 md:gap-3">
                        <p className="text-3xl md:text-5xl font-bold tracking-1">Criar Conta</p>
                        <p className="text-xs font-light opacity-80">Preencha os campos abaixo para criar sua conta</p>
                    </div>
                    {/* Inputs */}
                    <form
                        //onSubmit={enviarLogin}
                        className="flex flex-col w-full justify-center gap-4">
                        {/* Nome */}
                        <div className="flex flex-col">
                            <label htmlFor="nome" className="text-xs md:text-sm font-bold mb-1">
                                Nome
                            </label>
                            <input
                                type="text"
                                id="nome"
                                //value={nome}
                                //onChange={(e) => setNome(e.target.value)} // Atualiza o estado
                                className="h-[8vw] md:h-[2.5vw] p-2 border border-gray-300 rounded-md text-xs outline-none focus:ring-1 focus:ring-blue-100 transition-all"
                                placeholder="Fulano de tal"
                                required
                            />
                        </div>
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
                        <div className="flex flex-col justify-between md:flex-row gap-2">
                            {/* Cargo */}
                            <div className="flex flex-col w-full">
                                <label htmlFor="cargo" className="text-xs md:text-sm font-bold mb-1">
                                    Cargo
                                </label>
                                <input
                                    type="text"
                                    id="cargo"
                                    //value={email}
                                    //onChange={(e) => setEmail(e.target.value)} // Atualiza o estado
                                    className="h-[8vw] md:h-[2.5vw] p-2 border border-gray-300 rounded-md text-xs outline-none focus:ring-1 focus:ring-blue-100 transition-all"
                                    placeholder="exemplo@gmail.com"
                                    required
                                />
                            </div>
                            {/* Cidade */}
                            <div className="flex flex-col w-full">
                                <label htmlFor="cidade" className="text-xs md:text-sm font-bold mb-1">
                                    Cidade *
                                </label>
                                <input
                                    type="text"
                                    id="cidade"
                                    //value={email}
                                    //onChange={(e) => setEmail(e.target.value)} // Atualiza o estado
                                    className="h-[8vw] md:h-[2.5vw] p-2 border border-gray-300 rounded-md text-xs outline-none focus:ring-1 focus:ring-blue-100 transition-all"
                                    placeholder="Dourados - MS"
                                    required
                                />
                            </div>
                        </div>
                        {/* Senha */}
                        <div className="flex flex-col mb-6">
                            <label htmlFor="password" className="text-xs md:text-sm font-bold mb-1">
                                Senha
                            </label>
                            <input
                                type="password"
                                id="password"
                                //value={password}
                                //onChange={(e) => setPassword(e.target.value)} // Atualiza o estado
                                className="h-[8vw] md:h-[2.5vw] p-2 border border-gray-300 rounded-md text-xs outline-none focus:ring-1 focus:ring-blue-100 transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        {/* Botão de Submit */}
                        <button
                            type="submit"
                            className="w-full bg-[#21914E] text-white font-bold py-2 rounded-md transition delay-100 ease-in-out hover:scale-102"
                        >
                            Entrar
                        </button>

                        {/* Link extra (opcional) */}
                        <div className="flex flex-col gap-1 text-center">
                            <a href="#" className="text-xs md:text-sm text-blue-600 hover:underline">
                                Esqueceu a senha?
                            </a>
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
