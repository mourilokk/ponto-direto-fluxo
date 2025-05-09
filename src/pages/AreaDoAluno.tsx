import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";

const AreaDoAluno = () => {
    const { token, logout } = useAuth();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        api.get("/me/", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(res => setUser(res.data));
    }, [token]);

    return (
        <div className="max-w-2xl mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Área do Aluno</h1>
            {user && (
                <div className="space-y-2">
                    <p><strong>Usuário:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <button onClick={logout} className="mt-4 bg-red-500 text-white py-2 px-4 rounded">Sair</button>
                </div>
            )}
        </div>
    );
};

export default AreaDoAluno;