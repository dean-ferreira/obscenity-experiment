// LinkForm.jsx
import { useState } from 'react';
import {
    RegExpMatcher,
    englishRecommendedTransformers,
    DataSet,
} from 'obscenity';

const LinkForm = ({ blacklist }) => {
    const [formData, setFormData] = useState({
        url: '',
        customName: '',
        description: '',
        coOwner: '',
        tags: '',
    });
    const [error, setError] = useState(null);

    // Create DataSet from the blacklist
    const dataSet = new DataSet({ originalWord: String }).addAll(
        blacklist.map((term) => ({ originalWord: term }))
    );

    // Create Matcher
    const matcher = new RegExpMatcher({
        ...dataSet.build(),
        ...englishRecommendedTransformers,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.url ||
            !formData.customName ||
            !formData.description ||
            !formData.coOwner
        ) {
            setError('All fields are required.');
            return;
        }

        for (let key in formData) {
            if (matcher.hasMatch(formData[key])) {
                setError('Obscene language detected.');
                return;
            }
        }

        setError(null);
        console.log(`Form submitted: ${JSON.stringify(formData)}`);
    };

    const handleCancel = () => {
        setFormData({
            url: '',
            customName: '',
            description: '',
            coOwner: '',
            tags: '',
        });
        setError(null);
    };

    return (
        <form>
            <h1>Add Link</h1>
            <div>
                <label htmlFor="url">URL</label>
                <input
                    type="text"
                    id="url"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="customName">Custom Name</label>
                <input
                    type="text"
                    id="customName"
                    name="customName"
                    value={formData.customName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="coOwner">Co-Owner</label>
                <input
                    type="text"
                    id="coOwner"
                    name="coOwner"
                    value={formData.coOwner}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="tags">Tags</label>
                <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                />
            </div>
            {error && <div className="error">{error}</div>}
            <div>
                <button type="submit" onClick={handleSubmit}>
                    Submit
                </button>
                <button type="button" onClick={handleCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default LinkForm;
