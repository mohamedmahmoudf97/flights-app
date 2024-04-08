import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type RemoveAlertProp = {
    isOpen: boolean,
    toggle: () => void,
    callBack: () => void
}

const RemoveAlert = ({isOpen, toggle, callBack}: RemoveAlertProp) => {

  return (
      <Dialog
        open={isOpen}
        onClose={() => toggle()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are Your Sure?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will lose this flight data!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => toggle()}>Disagree</Button>
          <Button onClick={callBack} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
  );
}
export default RemoveAlert