import { Fragment } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface IAlertDialog {
	confirmDeleteList: (confirmation: boolean) => void;
	currList: string;
}

export default function AlertDialog({
	confirmDeleteList,
	currList,
}: IAlertDialog): JSX.Element {
	const handleCloseNo = () => {
		confirmDeleteList(false);
	};

	const handleCloseYes = () => {
		confirmDeleteList(true);
	};

	return (
		<Fragment>
			<Dialog
				open={true}
				onClose={handleCloseNo}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{'Delete List?'}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Delete current list <b>{currList}</b>?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseNo}>No!</Button>
					<Button onClick={handleCloseYes}>Delete it!</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
}
