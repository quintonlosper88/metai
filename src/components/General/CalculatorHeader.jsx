export const CalculatorHeader = ({
    icon: Icon, // Icon component as a prop
    title,
    description,
    actions = [],
    className = '',
}) => {
    return (
        <div className={`glass-card mb-6 ${className}`}>
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        {Icon && <Icon className="h-8 w-8 text-primary" />}
                        <div>
                            <h1 className="text-xl font-bold text-white">{title}</h1>
                            <p className="text-gray-400">{description}</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        {actions.map((action, index) => (
                            <button
                                key={index}
                                className={`btn btn-ghost btn-sm ${action.className || ''}`}
                                onClick={action.onClick}
                            >
                                {action.icon && <action.icon className="h-4 w-4 mr-2" />}
                                {action.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
