import IItem from '../models/IItem';
import { Box, Checkbox, IconButton, Tooltip } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface IListItemProps {
	item: IItem;
	toggleDone: (id: string) => void;
	removeItem: (id: string) => void;
}

export default function TodoItem({
	item,
	toggleDone,
	removeItem,
}: IListItemProps): JSX.Element {
	const handleClick = () => {
		toggleDone(item.id);
	};
	const handleRemoveItem = () => {
		removeItem(item.id);
	};

	return (
		<Box
			sx={{
				padding: 1,
				paddingLeft: 0,
				flexGrow: 1,
				textDecoration: item.done ? 'line-through' : 'none',
			}}
		>
			<Checkbox onClick={handleClick} checked={item.done} />
			<span>{item.task} </span>
			<Tooltip title="Delete Item">
				<IconButton onClick={handleRemoveItem}>
					<DeleteOutlineIcon />
				</IconButton>
			</Tooltip>
		</Box>
	);
}
