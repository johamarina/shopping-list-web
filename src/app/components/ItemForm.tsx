"use client"

import axiosInstance from "@/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Breadcrumb from "./Breadcrumb";

const Create = ({ item }: { item?: any }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [purchased, setPurchased] = useState(false);
    const router = useRouter()

    useEffect(() => {
        if (item) {
            setName(item.name);
            setDescription(item.description);
            setPrice(item.price);
            setPurchased(item.purchased);
        }
    }, [item]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (item) {
                // Editar el artículo
                await axiosInstance.put(`/items/${item.id}`, { name, description, price: Number(price), purchased });
            } else {
                // Crear un nuevo artículo
                await axiosInstance.post("/items", { name, description, price: Number(price), purchased });
            }
            router.push("/");
        } catch (error) {
            console.error("Error al enviar los datos:", error);
        }
    };


    return (
        <div>
            <Breadcrumb routes={[
                { name: "Inicio", path: "/" },
                { name: item?.name, path: `/items/${item?.id}` }
            ]} />

            <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md bg-[#f8fafc]">
                <h2 className="text-2xl font-bold mb-4 text-center">{item ? "Editar Artículo" : "Crear Nuevo Artículo"}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="name" className="block mb-2 font-medium">Nombre</label>
                            <input type="text" id="name" value={name} className="border border-gray-300 rounded-lg w-full p-2.5 text-sm" onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="price" className="block mb-2 font-medium">Precio</label>
                            <input type="number" id="price" value={price} className="border border-gray-300 rounded-lg w-full p-2.5 text-sm" onChange={(e) => setPrice(e.target.value)} required />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="description" className="block mb-2 font-medium">Descripción</label>
                        <textarea id="description" value={description} className="border border-gray-300 rounded-lg w-full p-2.5 text-sm" onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 font-medium">Comprado</label>
                        <div className="flex items-center mb-4">
                            <input
                                id="purchased-si"
                                type="radio"
                                value="true"
                                name="purchased"
                                checked={purchased === true}
                                onChange={() => setPurchased(true)}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                            />
                            <label htmlFor="purchased-si" className="ml-2 text-sm">Sí</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="purchased-no"
                                type="radio"
                                value="false"
                                name="purchased"
                                checked={purchased === false}
                                onChange={() => setPurchased(false)}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                            />
                            <label htmlFor="purchased-no" className="ml-2 text-sm">No</label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className={`w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                    >
                        {item ? "Actualizar Artículo" : "Crear Artículo"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Create