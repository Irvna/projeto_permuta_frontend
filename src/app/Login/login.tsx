
export default function Login() {
    return (
        <div id="login" className="grid xs:grid-rows-[1fr_0.5fr] md:grid-cols-2 w-full h-screen text-white">
            <div className="flex flex-col justify-between items-justify bg-[#10294B] px-3 md:px-10 py-5">
                <img
                    src="/permutaja_logo.png"
                    alt="Logo Permuta Já"
                    className="w-45 xs:aling-justify md:w-90 h-auto"
                />
                <div className="hidden md:flex flex-col gap-6">
                    <div className="text-5xl font-bold tracking-1">
                        Permutas entre servidores públicos, de forma simples e transparente.
                    </div>
                    <span className="text-sm font-light tracking-1 opacity-80">
                        Solicite a troca da sua localidade de trabalho, acompanhe o status do pedido e mantenha seus dados atualizados em um só lugar.
                    </span>
                </div>
                <div className="hidden md:flex text-xs">
                    UEMS - Campus Dourados - Sistemas de Informação
                </div>
            </div>
            <div className="flex justify-center items-center text-sm text-black bg-[#10294B] md:bg-white">
                <div className="flex flex-col w-[80vw] md:w-[40vw] bg-[#F8FBFD] text-black rounded-[2vw] border border-black px-5 md:px-8 py-6 md:py-12 gap-8 md:gap-15">
                    <div className="flex flex-col gap-1 md:gap-3">
                        <p className="text-3xl md:text-5xl font-bold tracking-1">Login</p>
                        <p className="text-xs font-light opacity-80">Use seu e-mail e sua senha</p>
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
                            <a href="#" className="text-xs md:text-sm hover:underline">
                                Não tem conta? <span className="text-blue-600">Criar Conta</span>
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
