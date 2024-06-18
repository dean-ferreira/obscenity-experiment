// BlacklistProvider.jsx
import { useState, useEffect } from 'react';
import LinkForm from './LinkForm';
import BlacklistManager from './BlacklistManager';

const BlacklistProvider = () => {
    const [blacklist, setBlacklist] = useState([]);
    const [error, setError] = useState(null);

    // Fetch the current blacklist from the server
    useEffect(() => {
        const fetchBlacklist = async () => {
            try {
                const response = await fetch('/api/blacklist/');
                if (!response.ok) {
                    throw new Error('Failed to fetch blacklist');
                }
                const data = await response.json();
                setBlacklist(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchBlacklist();
    }, []);

    const addTerm = async (newTerm) => {
        if (!newTerm.trim()) {
            setError('Term cannot be empty.');
            return;
        }

        if (blacklist.includes(newTerm)) {
            setError('Term is already in the blacklist.');
            return;
        }

        try {
            const response = await fetch('/api/blacklist/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ term: newTerm }),
            });

            if (!response.ok) {
                throw new Error('Failed to add term');
            }

            const updatedBlacklist = await response.json();
            setBlacklist(updatedBlacklist);
            setError(null);
        } catch (error) {
            setError(error.message);
        }
    };

    const removeTerm = async (term) => {
        try {
            const response = await fetch(`/api/blacklist/${term}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to remove term');
            }

            const updatedBlacklist = await response.json();
            setBlacklist(updatedBlacklist);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h1>Link Management</h1>
            {error && <div className="error">{error}</div>}
            <LinkForm blacklist={blacklist} />
            <BlacklistManager
                blacklist={blacklist}
                addTerm={addTerm}
                removeTerm={removeTerm}
            />
        </div>
    );
};

export default BlacklistProvider;
