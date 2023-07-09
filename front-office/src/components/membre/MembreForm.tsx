import React, {useEffect, useState} from 'react';
import './MembreForm.css';

const MembreForm: React.FC = () => {
    const [familleId, setFamilleId] = useState("");

    useEffect(() => {
        const storedFamilleId = localStorage.getItem('famille_id');
        if (storedFamilleId) {
            setFamilleId(storedFamilleId);
        }
    }, []);
    return (
        <div id="container">
            <strong>ID Famille : {familleId}</strong>
        </div>
    );
};

export default MembreForm;
