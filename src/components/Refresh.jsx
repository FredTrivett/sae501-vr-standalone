// components/FetchButton.js

import { useState } from 'react';

export default function FetchButton() {
    const [response, setResponse] = useState('');

    const handleClick = async () => {
        try {
            const res = await fetch('https://mmi22-16.mmi-limoges.fr/list');
            const data = await res.text();
            setResponse(data);
        } catch (error) {
            console.error('Erreur lors du fetch:', error);
            setResponse('Erreur lors de la requête.');
        }
    };

    return (
        <button onClick={handleClick} className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-white hover:bg-white/20 transition duration-300">Refresh</button>
    );
}
