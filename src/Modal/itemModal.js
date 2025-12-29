import React from "react";
import { useForm } from "react-hook-form";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const AddTaskPopup = ({data, open, onClose ,onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const submitForm = (Formdata) => {
    onSubmit(Formdata);   // ✅ send data to parent
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle> {data?.Edit?'Edit Task':'Add New Task'}</DialogTitle>

      <DialogContent>
        {/* Task */}
        <TextField
          label="Task"
          fullWidth
          margin="normal"
          {...register("Task", { required: "Task is required" })}
          error={!!errors.task}
          helperText={errors.task?.message}
        />

        {/* Working Hours */}
        <TextField
          label="Working Hours"
          type="number"
          fullWidth
          margin="normal"
          {...register("Workinghours", {
            required: "Hours required",
            min: { value: 1, message: "Minimum 1 hour" }
          })}
          error={!!errors.hours}
          helperText={errors.hours?.message}
        />

        {/* Priority Dropdown */}
        <TextField
          select
          label="Priority"
          fullWidth
          margin="normal"
          defaultValue=""
          {...register("Priority", { required: "Priority is required" })}
          error={!!errors.priority}
          helperText={errors.priority?.message}
        >
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
        </TextField>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit(submitForm)}>
          {data?.Edit?'Update':'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskPopup;
