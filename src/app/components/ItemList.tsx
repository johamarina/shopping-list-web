"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "@/axios";
import Link from "next/link";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import { Tooltip } from 'react-tooltip'
import { useSocket } from "../context/SocketContext";
import { toast } from "react-toastify";

interface Item {
    id: number;
    name: string;
    description: string;
    price: number;
    purchased: boolean;
}

const ItemList = () => {
    const { socket } = useSocket();

    const [items, setItems] = useState<Item[]>([]);

    const fetchItems = async () => {
        try {
            const response = await axiosInstance.get("/items");
            setItems(response.data);
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    };

    useEffect(() => {
        fetchItems();

        if (socket) {
            socket.on('itemAdded', (newItem: Item) => {
                setItems(prevItems => [...prevItems, newItem]);
                toast.success(`Se ha creado el artículo ${newItem.name}`);
            });

            socket.on('itemUpdated', (updatedItem: Item) => {
                setItems(prevItems =>
                    prevItems.map(item =>
                        item.id === updatedItem.id ? updatedItem : item
                    )
                );
                toast.success(`Se ha actualizado el artículo ${updatedItem.name}`);
            });

            socket.on('itemDeleted', (data: Item) => {
                setItems(prevItems => prevItems.filter(item => item.id !== data.id));
                toast.success(`Se ha eliminado el artículo ${data.name}`);
            });
        }

        return () => {
            if (socket) {
                socket.off('itemAdded');
                socket.off('itemDeleted');
            }
        };
    }, [socket]);

    const handleDelete = async (id: any) => {
        try {
            await axiosInstance.delete(`/items/${id}`);
            setItems(prevItems => prevItems.filter(item => item.id !== id));
        } catch (error) {
            console.error("Error al eliminar el artículo:", error);
        }
    }

    return (
        <div className="py-48 py-20">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold">Artículos</h1>
                <Link href="/items/create" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Crear nuevo artículo</Link>
            </div>
            <br />
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <table className="min-w-full table-auto text-left rtl:text-right">
                    <thead className="uppercase bg-gray-300">
                        <tr>
                            <th scope="col" className="px-6 py-3">ID</th>
                            <th scope="col" className="px-6 py-3">Nombre</th>
                            <th scope="col" className="px-6 py-3">Descripción</th>
                            <th scope="col" className="px-6 py-3">Precio</th>
                            <th scope="col" className="px-6 py-3">Comprado</th>
                            <th scope="col" className="px-6 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map((item: any) => (
                                <tr key={item.id} className="odd:bg-white even:dark:bg-gray-100">
                                    <td className="px-6 py-4">{item.id}</td>
                                    <td className="px-6 py-4">{item.name}</td>
                                    <td className="px-6 py-4">{item.description}</td>
                                    <td className="px-6 py-4">${item.price}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`${item.purchased
                                                ? 'bg-green-100 text-green-800 border-green-400'
                                                : 'bg-red-100 text-red-800 border-red-400'
                                                } text-xs font-medium px-3 py-1 rounded`}
                                        >
                                            {item.purchased ? 'Si' : 'No'}
                                        </span>
                                    </td>
                                    <td className="space-x-3 px-4 py-4">
                                        <Link href={`/items/${item.id}`}><button data-tooltip-id="tooltip" data-tooltip-content="Ver" className="text-blue-600">
                                            <EyeIcon className="w-5 h-5" />
                                        </button></Link>
                                        <Link href={`/items/${item.id}/edit`}><button data-tooltip-id="tooltip" data-tooltip-content="Editar" className="text-blue-600">
                                            <PencilIcon className="w-5 h-5" />
                                        </button></Link>
                                        <button data-tooltip-id="tooltip" data-tooltip-content="Eliminar" className="text-red-600" onClick={() => handleDelete(item.id)}>
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <Tooltip id="tooltip" place="top" />
        </div >
    );
};

export default ItemList;
