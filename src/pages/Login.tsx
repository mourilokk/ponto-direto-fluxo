import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
  
    const [loginData, setLoginData] = useState({ username: "", password: "" });
    const [registerData, setRegisterData] = useState({ email: "", password: "" });
  
    const [errors, setErrors] = useState({
      login: { username: "", password: "" },
      register: { email: "", password: "" },
    });
  
    const [remember, setRemember] = useState(false);
  
    const validateRegister = () => {
      const newErrors = { email: "", password: "" };
      if (!registerData.email.includes("@")) newErrors.email = "E-mail inválido";
      if (registerData.password.length < 6) newErrors.password = "Mínimo 6 caracteres";
      setErrors((e) => ({ ...e, register: newErrors }));
      return !newErrors.email && !newErrors.password;
    };
  
    const validateLogin = () => {
      const newErrors = { username: "", password: "" };
      if (!loginData.username) newErrors.username = "Preencha o usuário";
      if (!loginData.password) newErrors.password = "Preencha a senha";
      setErrors((e) => ({ ...e, login: newErrors }));
      return !newErrors.username && !newErrors.password;
    };
  
    const handleLoginSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateLogin()) return;
      try {
        await login(loginData.username, loginData.password);
        navigate("/area-do-aluno");
      } catch {
        alert("Usuário ou senha inválidos.");
      }
    };
  
    const handleRegisterSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateRegister()) return;
      try {
        await api.post("/register/", {
          username: registerData.email.split("@")[0],
          email: registerData.email,
          password: registerData.password,
        });
        alert("Cadastro realizado!");
      } catch {
        alert("Erro ao cadastrar.");
      }
    };
  
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen pt-32 bg-white px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Área de Alunos</h2>
    
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Login */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Entrar</h3>
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                    Nome de usuário ou e-mail *
                    </label>
                    <input
                    type="text"
                    value={loginData.username}
                    onChange={(e) =>
                        setLoginData({ ...loginData, username: e.target.value })
                    }
                    className={`mt-1 w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none ${
                        errors.login.username ? "border-red-500" : "border-gray-300"
                    }`}
                    />
                    {errors.login.username && (
                    <p className="text-red-600 text-sm mt-1">{errors.login.username}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Senha *</label>
                    <input
                    type="password"
                    value={loginData.password}
                    onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                    }
                    className={`mt-1 w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none ${
                        errors.login.password ? "border-red-500" : "border-gray-300"
                    }`}
                    />
                    {errors.login.password && (
                    <p className="text-red-600 text-sm mt-1">{errors.login.password}</p>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <label className="flex items-center text-sm">
                    <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        className="mr-2"
                    />
                    Lembre-me
                    </label>
                    <a href="#" className="text-sm text-red-600 hover:underline">
                    Perdeu sua senha?
                    </a>
                </div>
                <button
                    type="submit"
                    className="w-full bg-sky-500 text-white py-2 rounded font-semibold hover:bg-sky-600"
                >
                    Acessar
                </button>
                </form>
            </div>
    
            {/* Cadastro */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Cadastre-se</h3>
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                    Endereço de e-mail *
                    </label>
                    <input
                    type="email"
                    value={registerData.email}
                    onChange={(e) =>
                        setRegisterData({ ...registerData, email: e.target.value })
                    }
                    className={`mt-1 w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none ${
                        errors.register.email ? "border-red-500" : "border-gray-300"
                    }`}
                    />
                    {errors.register.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.register.email}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Senha *</label>
                    <input
                    type="password"
                    value={registerData.password}
                    onChange={(e) =>
                        setRegisterData({ ...registerData, password: e.target.value })
                    }
                    className={`mt-1 w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none ${
                        errors.register.password ? "border-red-500" : "border-gray-300"
                    }`}
                    />
                    {errors.register.password && (
                    <p className="text-red-600 text-sm mt-1">{errors.register.password}</p>
                    )}
                </div>
                <p className="text-xs text-gray-600">
                    Seus dados pessoais serão usados para aprimorar sua experiência neste site.
                    Consulte nossa{" "}
                    <a href="#" className="text-red-600 hover:underline">
                    política de privacidade
                    </a>
                    .
                </p>
                <button
                    type="submit"
                    className="w-full bg-sky-500 text-white py-2 rounded font-semibold hover:bg-sky-600"
                >
                    Cadastre-se
                </button>
                </form>
            </div>
            </div>
        </div>

      <Footer />
    </>
    );
  };
  
  export default Login;
  
