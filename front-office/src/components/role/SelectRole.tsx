import React, { useEffect, useState } from 'react';
import { Role,getAllRoles } from "../../data/role.service";
import {IonSelect, IonSelectOption} from "@ionic/react";

const SelectRole = ({ onChange }: { onChange: (value: string) => void }) => {
    const [roles, setRoles] = useState<Role[]>([]);

    useEffect(() => {
        getAllRoles()
            .then(response => {
                const rolesData = Array.isArray(response.data) ? response.data : (response.data as any).roles;
                setRoles(rolesData);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des rôles', error);
            });
    }, []);

    return (
    <IonSelect label="Rôle" labelPlacement="floating" aria-label="Rôle" name="role" placeholder="Choisissez un ou plusieurs rôles" onIonChange={(e) => onChange(e.detail.value)}>
        {roles.map(role => (
            <IonSelectOption key={role.id} value={role.id}>{role.nom}</IonSelectOption>
        ))}
    </IonSelect>

);
};

export default SelectRole;
