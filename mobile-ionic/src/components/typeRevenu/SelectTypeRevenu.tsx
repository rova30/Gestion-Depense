import React, { useEffect, useState } from 'react';
import {IonSelect, IonSelectOption} from "@ionic/react";
import { getAllTypeRevenus, TypeRevenu } from '../../data/revenu.service';

const SelectTypeRevenu = ({ onChange }: { onChange: (value: string) => void }) => {
    const [typeRevenus, setTypeRevenus] = useState<TypeRevenu[]>([]);

    useEffect(() => {
        getAllTypeRevenus()
            .then(response => {
                const typesData = Array.isArray(response.data) ? response.data : (response.data as any).typerevenus;
                setTypeRevenus(typesData);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des types de revenu', error);
            });
    }, []);

    return (
        <IonSelect label="Type de revenu" labelPlacement="floating" aria-label="Type de revenu" name="typerevenu" placeholder="Choisissez le type de revenu" onIonChange={(e) => onChange(e.detail.value)}>
            {typeRevenus.map(typeRevenu => (
                <IonSelectOption key={typeRevenu.id} value={typeRevenu.id}>{typeRevenu.nom}</IonSelectOption>
            ))}
        </IonSelect>
    );
};

export default SelectTypeRevenu;
