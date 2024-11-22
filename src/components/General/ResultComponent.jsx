export const ResultComponent = ({ labelText, value,className = '', }) => {
	return (
		<div className={className}>
			<div className='bg-secondary/50 rounded-lg p-4 flex-1  '>
				<label className='text-sm font-medium text-gray-400'>{labelText}</label>
				<div className='text-xl font-bold text-primary'>
					{value ? value : "-"}
				</div>
			</div>
		</div>
	);
};
