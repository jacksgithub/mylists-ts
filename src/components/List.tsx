import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import ListItem from './ListItem';
import ListItemAddForm from './ListItemAddForm';
import IList from '../models/IList';
// MaterialUI
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

interface IListProps {
	list: IList;
	updateLists: (updatedList: IList) => void;
	deleteCurrList: () => void;
}

export default function List({
	list,
	updateLists,
	deleteCurrList,
}: IListProps): JSX.Element {
	const [isAddItem, setIsAddItem] = useState(false);

	// Toggle if item done
	const toggleDone = (itemId: string) => {
		const updatedList = {
			...list,
			items: list.items.map((item) => {
				return item.id === itemId ? { ...item, done: !item.done } : item;
			}),
		};
		updateLists(updatedList);
	};
	// Remove item from list
	const removeItem = (itemId: string) => {
		const updatedList = {
			...list,
			items: list.items.filter((item) => {
				return item.id !== itemId;
			}),
		};
		updateLists(updatedList);
	};
	// Show/Hide add item form
	const toggleIsAddItem = () => {
		setIsAddItem(!isAddItem);
	};
	// Add new item
	const addItem = (item: string) => {
		const updatedList = {
			...list,
			items: [...list.items, { id: uuid(), task: item, done: false }],
		};
		updateLists(updatedList);
		toggleIsAddItem();
	};
	// Remove all done items from list
	const handleClearCompleted = () => {
		const updatedList = {
			...list,
			items: list.items.filter((item) => item.done !== true),
		};
		updateLists(updatedList);
	};

	return (
		<Card sx={{ padding: '10px' }} elevation={3}>
			<CardHeader
				sx={{ bgcolor: 'primary.main', color: '#fff' }}
				title={list.listName}
				action={
					<Tooltip title="Delete List">
						<IconButton onClick={deleteCurrList} sx={{ color: '#fff' }}>
							<DeleteForeverIcon />
						</IconButton>
					</Tooltip>
				}
			/>
			<Divider />
			<CardContent sx={{ pb: '1 !important' }}>
				{list.items.map((item) => {
					return (
						<ListItem
							item={item}
							key={item.id}
							toggleDone={toggleDone}
							removeItem={removeItem}
						/>
					);
				})}

				<Box
					sx={{
						mt: 3,
						mb: 0,
						cursor: 'pointer',
						display: 'flex',
						justifyContent: 'space-around',
						alignItems: 'center',
					}}
				>
					{isAddItem ? (
						<ListItemAddForm addItem={addItem} />
					) : (
						<Tooltip title="Add Task">
							<IconButton onClick={toggleIsAddItem}>
								<PlaylistAddIcon />
							</IconButton>
						</Tooltip>
					)}
					{!isAddItem && list.items.length > 0 && (
						<Link onClick={handleClearCompleted}>Clear completed</Link>
					)}
				</Box>
			</CardContent>
		</Card>
	);
}
