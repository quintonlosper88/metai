export const InputWithLabel = ({
    label,
    value,
    onChange,
    placeholder,
    name,
    type = 'text',
    className = '',
}) => {
    return (
        <div className={className}>
            <label className="block text-sm font-medium text-gray-400 mb-2">
                {label}
                <button
                    type="button"
                    className="ml-2 text-primary hover:text-primary/80"
                >
                    {/* Optional Info Placeholder or Can Be Removed */}
                    <span className="h-4 w-4">?</span>
                </button>
            </label>
            <input
                type={type}
                className="input input-bordered w-full bg-secondary text-white"
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                placeholder={placeholder}
            />
        </div>
    );
};