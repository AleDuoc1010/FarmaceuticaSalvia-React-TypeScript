import { useEffect, useState } from "react";
import { getAllUsuarios, eliminarUsuario, type UsuarioAdmin } from "../scripts/admin";

const AdminUsuarios: React.FC = () => {
    const [usuarios, setUsuarios] = useState<UsuarioAdmin[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentUuid, setCurrentUuid] = useState<string>("");

    const cargarUsuarios = async () => {
        try {
            setLoading(true);

            const userStr = localStorage.getItem("usuario");
            if (userStr){
                const userObj = JSON.parse(userStr);
                setCurrentUuid(userObj.uuid);
            }
            const data = await getAllUsuarios(0);
            setUsuarios(data.content);
        } catch (error){
            console.error("Error cargando usuarios", error);
            alert("No tienes permisos para ver esta lista.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const handleDelete = async (uuid: string, nombre: string) => {
        if (!confirm(`¿Estás seguro de que quieres eliminar al usuario ${nombre}? Esta acción no se puede deshacer.`)){
            return;
        }

        try {
            await eliminarUsuario(uuid);
            alert("Usuario eliminado correctamente.");
            cargarUsuarios();
        } catch (error) {
            console.error(error);
            alert("Ocurrió un error al intentar eliminar el usuario")
        }
    };

    if(loading) return <div className="text-center mt-5">Cargando usuarios...</div>;

    return(
        <div className="container mt-5">
            <h2 className="text-center mb-4"> 👮‍♂️ Panel de administración: Usuarios</h2>
            <hr />
            <div className="table-responsive">
                <table className="table table-hover table-bordered align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((user) => {
                            const isMe = user.uuid === currentUuid;

                            return (
                                <tr key={user.uuid} className={isMe ? "table-info" : ""}>
                                    <td>{user.nombre} {isMe && "(Tú)"}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone || "N/A"}</td>
                                    <td>
                                        <span className={`badge ${user.rol === 'ADMINISTRADOR' ? 'bg-danger' : 'bg-primary'}`}>
                                            {user.rol}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() => handleDelete(user.uuid, user.nombre)}
                                            disabled={isMe}
                                            title={isMe ? "No puedes eliminarte a ti mismo" : "Eliminar usuario"}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsuarios;