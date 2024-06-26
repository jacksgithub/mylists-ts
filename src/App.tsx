/**
 * Make lists
 * React, TypeScript, MaterialUI, localStorage
 *
 * NOTES:
 * App -> lists, Current list -> List item
 * listName must be unique
 */
import React, { useState, useEffect } from 'react';
import List from './components/List';
import ListAddForm from './components/ListAddForm';
import IList from './models/IList';
// MaterialUI
import Grid from '@mui/material/Grid'; // Grid version 1
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// CSS
import './App.css';

function App() {
	// State
	const [lists, setLists] = useState<IList[] | []>(
		JSON.parse(localStorage.getItem('myLists') || '[]')
	);
	const [currList, setCurrList] = useState<IList>({ listName: '', items: [] });
	const [listAddError, setListAddError] = useState('');

	// Set current list displayed
	const changeCurrList = (listName: string) => {
		const list = lists.filter((list) => list.listName === listName)[0];
		setCurrList(list);
	};
	// Delete current list
	const deleteCurrList = () => {
		const updatedLists = lists.filter(
			(list) => currList?.listName !== list.listName
		);
		setLists(updatedLists);
		setCurrList({ listName: '', items: [] });
	};
	// Add new list & set as current list
	const addList = (name: string) => {
		// Error checking
		const isUnique = lists.every((list) => list.listName !== name);
		if (!isUnique) {
			setListAddError('List name must be unique!');
		} else if (!name.match(/^[a-z0-9\s_-]+$/i)) {
			setListAddError('Disallowed characters!');
		} else {
			// Ok, good to go
			const emptyList = { listName: name, items: [] };
			setLists([...lists, emptyList]);
			setCurrList(emptyList);
			setListAddError('');
		}
	};
	// Update lists w/ changes to one list
	const updateLists = (updatedList: IList) => {
		const updatedLists = lists.map((list) => {
			return list.listName === updatedList.listName ? updatedList : list;
		});
		setLists(updatedLists);
		setCurrList(updatedList);
	};

	// Store lists in localstorage
	useEffect(() => {
		localStorage.setItem('myLists', JSON.stringify(lists));
	}, [lists]);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
				<Grid item xs={12} md={4} sx={{ pb: 2 }}>
					<h2>My Lists</h2>
					<Box>
						{lists.map((list) => {
							return (
								<Typography
									component={'div'}
									sx={{
										padding: 1,
										'&:hover': {
											color: 'primary.main',
										},
									}}
									key={list.listName}
									onClick={() => changeCurrList(list.listName)}
									className={
										currList.listName == list.listName
											? 'button-fx active'
											: 'button-fx'
									}
								>
									<div className="top-bar"></div>
									<div className="bot-bar"></div>
									<div className="left-bar"></div>
									<div className="right-bar"></div>
									{list.listName}
								</Typography>
							);
						})}
					</Box>
					<ListAddForm addList={addList} error={listAddError} />
				</Grid>
				{currList.listName && (
					<Grid item xs={12} md={8}>
						<List
							list={currList}
							updateLists={updateLists}
							deleteCurrList={deleteCurrList}
						/>
					</Grid>
				)}
			</Grid>
		</Box>
	);
}

export default App;
