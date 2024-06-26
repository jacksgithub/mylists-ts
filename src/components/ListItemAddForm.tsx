import React, { useState } from 'react';
import { Box, FormControl, TextField } from '@mui/material';

interface ITodoItemAddForm {
	addItem: (item: string) => void;
}

export default function TodoItemAddForm({ addItem }: ITodoItemAddForm) {
	const [item, setItem] = useState('');

	const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
		setItem(evt.target.value);
	};
	const handleSubmit = (evt: React.FormEvent) => {
		evt.preventDefault();
		addItem(item);
		setItem('');
	};

	return (
		<Box
			component="form"
			noValidate
			autoComplete="off"
			onSubmit={handleSubmit}
			sx={{ width: '100%' }}
		>
			<FormControl sx={{ mt: 4 }} fullWidth>
				<TextField
					label="Add Item"
					id="item"
					name="item"
					aria-describedby="my-helper-text"
					value={item}
					onChange={handleChange}
					autoFocus
					variant="standard"
				/>
			</FormControl>
		</Box>
	);
}
