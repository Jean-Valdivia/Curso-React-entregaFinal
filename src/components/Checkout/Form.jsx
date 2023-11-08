import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Form = () => {
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
            <Typography variant="h1" gutterBottom>
        Felicitaciones!
        </Typography>
        <Typography variant="h3" gutterBottom>
        Has generado una Orden de compra!
        </Typography>
        <Typography variant="h6" gutterBottom>
        Orden de Compra N°= {(Math.floor(Math.random()*100000))}
        </Typography>
        <Typography variant="h4" gutterBottom>
        Ingresa tus datos para finalizar:
        </Typography>
            </div>
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="Nombre/s"
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Apellido"
                />
                <TextField
                    id="outlined-number"
                    label="DNI"
                    type="number"
                />
            </div>
            <Typography variant="h6" gutterBottom>
                Tus datos de contacto
            </Typography>
            <div>
                <TextField
                    id="standard-number"
                    label="Celular"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="standard"
                />
                <TextField
                    required
                    id="standard-required"
                    label="E-mail"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="standard"
                />
            <Typography variant="h6" gutterBottom>
                Datos de envio
            </Typography>
                <TextField
                    required
                    id="standard-required"
                    label="Direccion"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="standard"
                />
                <TextField
                    required
                    id="standard-required"
                    label="Localidad"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="standard"
                />
                <TextField
                    id="standard-number"
                    label="Codigo postal"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="standard"
                />
                <TextField
                    required
                    id="standard-required"
                    label="Provincia"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="standard"
                />

            </div>
            <div>
            <TextField
                    required
                    id="standard-required"
                    label="Aclaraciones"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="standard"
                />
            </div>
            <Button variant="contained">Enviar orden</Button>
            <Button variant="outlined">Cancelar todo</Button>
        </Box>



    );
};

export default Form;