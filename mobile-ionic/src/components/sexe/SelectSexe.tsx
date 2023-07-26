import React, { useEffect, useState } from 'react';
import { Sexe,getAllSexes } from "../../data/sexe.service";
import {IonSelect, IonSelectOption} from "@ionic/react";

const SelectSexe = ({ onChange }: { onChange: (value: string) => void }) => {
    const [sexes, setSexes] = useState<Sexe[]>([]);

    useEffect(() => {
        getAllSexes()
            .then(response => {
                const sexesData = Array.isArray(response.data) ? response.data : (response.data as any).sexes;
                setSexes(sexesData);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des sexes', error);
            });
    }, []);

    return (
        <IonSelect label="Sexe" labelPlacement="floating" aria-label="Sexe" name="sexe" placeholder="Votre sexe" onIonChange={(e) => onChange(e.detail.value)}>
            {sexes.map(sexe => (
                <IonSelectOption key={sexe.id} value={sexe.id}>{sexe.nom}</IonSelectOption>
            ))}
        </IonSelect>
    );
};

export default SelectSexe;
