// BlacklistManager.jsx
import { useState } from 'react';

const BlacklistManager = ({ blacklist, addTerm, removeTerm }) => {
    const [newTerm, setNewTerm] = useState('');
    const [error, setError] = useState(null);

    const handleAddTerm = async (e) => {
        e.preventDefault();
        setError(null);
        if (!newTerm.trim()) {
            setError('Term cannot be empty.');
            return;
        }

        if (blacklist.includes(newTerm)) {
            setError('Term is already in the blacklist.');
            return;
        }

        await addTerm(newTerm);
        setNewTerm('');
    };

    return (
        <div>
            <h2>Blacklist Manager</h2>
            <form onSubmit={handleAddTerm}>
                <input
                    type="text"
                    value={newTerm}
                    onChange={(e) => setNewTerm(e.target.value)}
                    placeholder="Add new term"
                />
                <button type="submit">Add Term</button>
            </form>
            {error && <div className="error">{error}</div>}
            <ul>
                {blacklist.map((term, index) => (
                    <li key={index}>
                        {term} <button onClick={() => removeTerm(term)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlacklistManager;
