export const close: React.CSSProperties = {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    zIndex: 3,
    background: '#ffffffe7',
    width: 32,
    height: 32,
    fontSize: 24,
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.81)',
}; // Does not work from here. Type problem

export const closeTip: React.CSSProperties = {
    position: 'absolute',
    top: '0.5rem',
    right: '0rem',
    zIndex: 3,
    background: '#ffffffe7',
    width: 32,
    height: 32,
    fontSize: 24,
    cursor: 'pointer',
};

export const closeGallery: React.CSSProperties = {
    position: 'absolute',
    top: '0.1rem',
    right: '0.1rem',
    zIndex: 900,
    border: 'none',
    width: 32,
    height: 32,
    fontSize: 24,
    cursor: 'pointer',
};
