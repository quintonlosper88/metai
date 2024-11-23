export const PropertySelect = ({
    label,
    value,
    onChange,
    name,
    options = [],
    className = '',
}) => {
    return (
        <div className={`mb-6 ${className}`}>
            <label className="block text-sm font-medium text-gray-400 mb-2">
                {label}
            </label>
            <select
                className="select select-bordered w-full bg-secondary text-white"
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
            >
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
