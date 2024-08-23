import React, { useState } from 'react';
import {
  Box,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TableCell,
  TableRow,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface CollapsibleCellProps {
  interns: any[];
  rowId: number;
  openState: Record<number, boolean>;
  toggleOpen: (id: number) => void;
}

const CollapsibleCell: React.FC<CollapsibleCellProps> = ({
  interns,
  rowId,
  openState,
  toggleOpen,
}) => {
  const [open, setOpen] = useState(openState[rowId]);

  const handleToggle = () => {
    setOpen(!open);
    toggleOpen(rowId);
  };

  return (
    <>
      <TableCell>
        <IconButton onClick={handleToggle}>
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </TableCell>
      <TableCell colSpan={6} style={{ paddingBottom: 0, paddingTop: 0 }}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
            <List dense>
              {interns.map((intern) => (
                <ListItem key={intern.id}>
                  <ListItemText primary={intern.name} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Collapse>
      </TableCell>
    </>
  );
};

export default CollapsibleCell;
