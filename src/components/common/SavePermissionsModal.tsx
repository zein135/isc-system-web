import { FC } from "react";
import { Modal as MuiModal, Box, Button, Typography, IconButton } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import { savePermissionsChagesModalProps } from "../../models/savePermissionsChangesModalPropsInterface";

const SavePermissionsModal: FC<savePermissionsChagesModalProps> = ({ isVisible, setIsVisible, onSave }) => {

  const handleSave = async () => {
    onSave();
    setIsVisible(false);
  };

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  return (
    <MuiModal
      open={isVisible}
      onClose={toggleModal}
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
    >
      <Box className='modal-box'>
      <IconButton sx={{ position: 'absolute', top: 6, right: 6 }} 
                  onClick={toggleModal}>
                  <CancelIcon color="primary" />
      </IconButton>
        <Typography id="delete-modal-title" variant='h5' align = 'center'>
          Guardar Configuración
        </Typography>
        <Typography id="delete-modal-description" variant='body1' sx={{ marginTop: '20px' }}>
          ¿Estás seguro de que deseas La condifuración de permisos?
        </Typography>
        <Box display="flex" justifyContent="center" mt={2} sx={{ marginTop: '20px' }}>
          <Button variant="outlined" color="secondary" onClick={toggleModal}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}sx={{ marginLeft: '15px' }}>
            Guardar
          </Button>
        </Box>
      </Box>
    </MuiModal>
  );
};

export default SavePermissionsModal;