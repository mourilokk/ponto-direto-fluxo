import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AreaDoAluno = () => {
  const { token, logout } = useAuth();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("materiais");

  useEffect(() => {
    api
      .get("/me/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUser(res.data));
  }, [token]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-100 pt-12 pb-24">
        <div className="max-w-5xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-center mb-10 mt-12">Área de Alunos</h1>
            <div className="flex flex-col md:flex-row gap-8 justify-center">
            {/* Menu Lateral */}
            <aside className="w-full md:w-1/4 space-y-2">
                <button
                onClick={() => setActiveTab("materiais")}
                className={`w-full text-left px-4 py-3 rounded ${
                    activeTab === "materiais"
                    ? "bg-slate-800 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
                >
                Meus Materiais
                </button>
                <button
                onClick={() => setActiveTab("enderecos")}
                className={`w-full text-left px-4 py-3 rounded ${
                    activeTab === "enderecos"
                    ? "bg-slate-800 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
                >
                Endereços
                </button>
                <button
                onClick={() => setActiveTab("conta")}
                className={`w-full text-left px-4 py-3 rounded ${
                    activeTab === "conta"
                    ? "bg-slate-800 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
                >
                Detalhes da Conta
                </button>
                <button
                onClick={logout}
                className="w-full text-left px-4 py-3 rounded bg-gray-100 text-red-600 hover:bg-red-100"
                >
                Sair
                </button>
            </aside>

            {/* Conteúdo da Aba */}
            <section className="w-full md:w-3/4 bg-white border border-gray-200 rounded p-6 min-h-[200px]">
                {activeTab === "materiais" && (
                <p className="text-gray-600">Nenhum pedido foi feito ainda.</p>
                )}
                {activeTab === "enderecos" && (
                <p className="text-gray-600">Você ainda não adicionou endereços.</p>
                )}
                {activeTab === "conta" && user && (
                <div className="space-y-2 text-gray-700">
                    <p>
                    <strong>Nome de usuário:</strong> {user.username}
                    </p>
                    <p>
                    <strong>Email:</strong> {user.email}
                    </p>
                </div>
                )}
            </section>
            </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default AreaDoAluno;
