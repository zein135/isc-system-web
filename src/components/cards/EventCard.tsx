import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/es';
import { FC, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import DescriptionIcon from '@mui/icons-material/Description';
import AddIcon from '@mui/icons-material/Add';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

interface EventCardProps {
    event: {
        nombre: string;
        descripcion: string;
        horasValidezBecaria: string; // ex: 4 horas
        fechaInicio: Dayjs;
        duracion: string;
        lugar: string;
        maxBecarios: number;
        maxSuplentes: number;
    }

}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const EventCard: FC<EventCardProps> = ({ event }) => {
    const [expanded, setExpanded] = useState(false);
    const { nombre, descripcion, horasValidezBecaria, fechaInicio, duracion, lugar, maxBecarios, maxSuplentes } = event
    dayjs.locale('es');

    const subheaderProp = (<>
        Fecha: {fechaInicio.format('LL')}
        <br />
        Horas becarias: {horasValidezBecaria}
    </>)
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={nombre}
                subheader={subheaderProp}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {descripcion}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Tooltip title="Registrarse">
                    <IconButton aria-label="registrarse">
                        <AddIcon />
                    </IconButton>
                </Tooltip>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="detalles del evento"
                >
                    <DescriptionIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography align='center' paragraph>Detalles del evento:</Typography>
                    <Typography paragraph>
                        <strong>Duración:</strong> {duracion}
                    </Typography>
                    <Typography paragraph>
                        <strong>Horas becarias: {horasValidezBecaria}</strong> {duracion}
                    </Typography>
                    <Typography paragraph>
                        <strong>Lugar:</strong> {lugar}
                    </Typography>
                    <Typography paragraph>
                        <strong>Máximo de Becarios:</strong> {maxBecarios}
                    </Typography>
                    <Typography paragraph>
                        <strong>Máximo de Suplentes:</strong> {maxSuplentes}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}

export default EventCard