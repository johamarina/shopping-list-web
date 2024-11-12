"use client"

import Item from "@/app/components/Item"
import axiosInstance from "@/axios"
import { use, useEffect, useState } from "react"

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)

    const [item, setItem] = useState(null)

    useEffect(() => {
        if (id) {
            fetchItem()
        }
    }, [id])

    const fetchItem = async () => {
        const response = await axiosInstance.get(`/items/${id}`)
        setItem(response.data)
    }

    return (
        <div>
            {
                item ? (
                    <Item item={item} />
                ) : (
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="p-4 bg-red-100 text-red-700 rounded-lg max-w-lg text-center shadow-md">
                            <p className="text-lg font-semibold">Alerta</p>
                            <p>El artículo no existe o no se pudo cargar</p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}