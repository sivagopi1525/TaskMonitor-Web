import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const ConformationPopup = ({data, open, onClose ,onSubmit }) => {
  console.log(data,)
  const submitForm = () => {
    onSubmit(true);   // ✅ send data to parent
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{data?.header}</DialogTitle>

      <DialogContent>
             <h3>{data?.title}</h3>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={submitForm}>
          ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConformationPopup;
