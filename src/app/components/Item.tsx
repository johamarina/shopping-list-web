import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from "@/axios";
import Link from "next/link";
import Breadcrumb from './Breadcrumb';

const Item = ({ item }: { item: any }) => {
    const [isPurchased, setIsPurchased] = useState(item?.purchased);
    const router = useRouter()

    // Función para marcar el artículo como comprado
    const handlePurchaseToggle = async () => {
        try {
            const { data } = await axiosInstance.put(`/items/${item.id}`, {
                purchased: true,
            });

            setIsPurchased(data.data.purchased);
        } catch (error) {
            console.error("Error al actualizar el artículo:", error);
        }
    };

    // Función para eliminar el artículo
    const handleDelete = async (id: any) => {
        try {
            await axiosInstance.delete(`/items/${id}`);
            // Redirige después de eliminar
            router.push('/'); // O puedes redirigir a la página de artículos
        } catch (error) {
            console.error("Error al eliminar el artículo:", error);
        }
    }

    return (
        <div>
            <Breadcrumb routes={[
                { name: "Inicio", path: "/" },
                { name: item?.name, path: `/items/${item?.id}` }
            ]} />

            <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md bg-[#f8fafc]">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">{item?.name}</h2>
                <p className="text-gray-600 mb-4">{item?.description}</p>
                <p className="text-gray-800 font-medium mb-4">Precio: ${item?.price}</p>
                <p className="text-gray-800 font-medium mb-4">Comprado:
                    <span
                        className={`${isPurchased
                            ? 'bg-green-100 text-green-800 border-green-400'
                            : 'bg-red-100 text-red-800 border-red-400'
                            } text-xs font-medium px-3 py-1 rounded`}
                    >
                        {isPurchased ? 'Si' : 'No'}
                    </span>
                </p>

                {/* Contenedor de botones con w-full y espacio entre ellos */}
                <div className="flex flex-col space-y-4">
                    <button
                        onClick={handlePurchaseToggle}
                        disabled={isPurchased}
                        className={`w-full py-2 px-4 ${isPurchased ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'} font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                    >
                        Marcar como comprado
                    </button>

                    <Link href={`/items/${item.id}/edit`}>
                        <button className="w-full py-2 px-4 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300">
                            Editar
                        </button>
                    </Link>

                    <button
                        onClick={() => handleDelete(item.id)}
                        className="w-full py-2 px-4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>

    );
};

export default Item;
