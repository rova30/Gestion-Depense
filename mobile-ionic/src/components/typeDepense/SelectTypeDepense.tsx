import React, { useEffect, useState } from 'react';
import {IonSelect, IonSelectOption} from "@ionic/react";
import { getAllTypeDepenses, TypeDepense } from '../../data/depense.service';

const SelectTypeDepense = ({ onChange }: { onChange: (value: string) => void }) => {
    const [typeDepenses, setTypeDepenses] = useState<TypeDepense[]>([]);

    useEffect(() => {
        getAllTypeDepenses()
            .then(response => {
                const typesData = Array.isArray(response.data) ? response.data : (response.data as any).typedepenses;
                setTypeDepenses(typesData);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des types de dépense', error);
            });
    }, []);

    return (
        <IonSelect label="Type de dépense" labelPlacement="floating" aria-label="Type de dépense" name="typedepense" placeholder="Choisissez le type de dépense" onIonChange={(e) => onChange(e.detail.value)}>
            {typeDepenses.map(typeDepense => (
                <IonSelectOption key={typeDepense.id} value={typeDepense.id}>{typeDepense.nom}</IonSelectOption>
            ))}
        </IonSelect>
    );
};

export default SelectTypeDepense;
