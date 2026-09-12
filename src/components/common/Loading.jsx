function Loading({ label = "Loading..." }) {
    return (
        <div className="loading-state">
            <span className="spinner" aria-hidden="true" />
            <span>{label}</span>
        </div>
    );
}

export default Loading;
