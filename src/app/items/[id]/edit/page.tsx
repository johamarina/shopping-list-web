"use client"

import React, { useState, useEffect, use } from "react";
import axiosInstance from "@/axios";
import ItemForm from "@/app/components/ItemForm";

export default function EditItem({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const [item, setItem] = useState<any>(null);

    const fetchItem = async () => {
        try {
            const response = await axiosInstance.get(`/items/${id}`);
            setItem(response.data);
        } catch (error) {
            console.error("Error al cargar los datos del artículo:", error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchItem();
        }
    }, [id]);

    return (
        <div>
            {item && (
                <ItemForm
                    item={item}
                />
            )}
        </div>
    );
};

