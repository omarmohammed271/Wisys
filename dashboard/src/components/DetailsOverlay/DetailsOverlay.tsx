import React from 'react';

interface DetailsOverlayProps {
    title: string;
    content: string;
    onClose: () => void;
}

const DetailsOverlay: React.FC<DetailsOverlayProps> = ({ title, content, onClose }) => {
    return (
        <div className="overlay">
            <div className="overlay-content">
                <h2>{title}</h2>
                <p>{content}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default DetailsOverlay;