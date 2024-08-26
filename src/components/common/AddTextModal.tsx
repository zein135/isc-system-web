import { FC, useEffect, useState } from "react";
import { Modal as MuiModal, Box, TextField, Button, useMediaQuery, Typography } from "@mui/material";

interface AddTextModalProps {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
    onCreate: (name: string) => void;
}

const AddTextModal: FC<AddTextModalProps> = ({ isVisible, setIsVisible, onCreate }) => {
const [name, setName] = useState('');
const isSmallScreen = useMediaQuery('(max-width:500px)');

//Limpia el text holder cada vez que se abre el modal
  useEffect(() => {
      if (isVisible) {
        setName('');
      }
    }, [isVisible]);

  const handleCreate = async () => {
    onCreate(name);
    setName('');
    setIsVisible(false);
  };

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  return (
    <MuiModal
      open={isVisible}
      onClose={toggleModal}
      aria-labelledby="create-modal-title"
      aria-describedby="create-modal-description"
    >
      <Box
        sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isSmallScreen ? '90%' : 500,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
          }}
      >
        <Typography id="create-modal-title" variant = 'h5'>Crear nuevo rol</Typography>
        <TextField
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Ingresa el nombre del nuevo rol"
          variant="outlined"
          sx={{ marginTop: '20px' }}
        />
        <Box display="flex" justifyContent="flex-end" mt={2}  sx={{ marginTop: '20px' }}>
          <Button variant="outlined" color="secondary" onClick={toggleModal} sx={{ marginRight: '10px' }}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" onClick={handleCreate}>
            Crear
          </Button>
        </Box>
      </Box>
    </MuiModal>
  );
};

export default AddTextModal;
