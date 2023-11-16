import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCartContext } from '../../context/CartContext';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';

const ConfirmOrder = ({ orderData }) => {
    if (orderData === null) {
        return <div>Complete los datos, Por favor...</div>;
    }

    return (
        <div>
            <Typography variant="h6" gutterBottom>
                Resumen de la orden:
            </Typography>
            <div>
                <p>Nombre: {orderData.customer.name}</p>
                <p>Dirección de envío: {orderData.shipping.address}, {orderData.shipping.city}, {orderData.shipping.province}</p>
                <p>Orden Enviada al sistema!</p>
            </div>
        </div>
    );
};

const Form = () => {
    const [formData, setFormData] = useState({
        'Nombre/s': '',
        'Apellido': '',
        'DNI': '',
        'Celular': '',
        'E-mail': '',
        'Direccion': '',
        'Localidad': '',
        'Codigo postal': '',
        'Provincia': '',
    });

    const { cart, clearCart } = useCartContext();
    const [orderData, setOrderData] = useState(null);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const totalPedido = cart.total.toFixed(2);

        const newOrderData = {
            customer: {
                name: formData['Nombre/s'],
                lastName: formData['Apellido'],
                dni: formData['DNI'],
                phone: formData['Celular'],
                email: formData['E-mail'],
            },
            shipping: {
                address: formData['Direccion'],
                city: formData['Localidad'],
                postalCode: formData['Codigo postal'],
                province: formData['Provincia'],
            },
            items: cart.items,
            total: totalPedido,
            timestamp: Timestamp.fromDate(new Date()),
        };

        const db = getFirestore();

        try {
            const docRef = await addDoc(collection(db, 'orders'), newOrderData);
            console.log('Orden enviada con ID:', docRef.id);
            setOrderData(newOrderData);
        } catch (error) {
            console.error('Error al enviar la orden:', error);
            setOrderData(null);
            alert('Error al enviar la orden');
        }

        // Limpia el carrito después de enviar la orden
        clearCart();

        setFormData({
            'Nombre/s': '',
            'Apellido': '',
            'DNI': '',
            'Celular': '',
            'E-mail': '',
            'Direccion': '',
            'Localidad': '',
            'Codigo postal': '',
            'Provincia': '',
        });
    };

    const handleCancel = () => {
        setFormData({
            'Nombre/s': '',
            'Apellido': '',
            'DNI': '',
            'Celular': '',
            'E-mail': '',
            'Direccion': '',
            'Localidad': '',
            'Codigo postal': '',
            'Provincia': '',
        });
    };

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleFormSubmit}
        >
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="Nombre/s"
                    variant="outlined"
                    value={formData['Nombre/s']}
                    onChange={(e) => setFormData({ ...formData, 'Nombre/s': e.target.value })}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Apellido"
                    variant="outlined"
                    value={formData['Apellido']}
                    onChange={(e) => setFormData({ ...formData, 'Apellido': e.target.value })}
                />
                <TextField
                    id="outlined-number"
                    label="DNI"
                    type="number"
                    variant="outlined"
                    value={formData['DNI']}
                    onChange={(e) => setFormData({ ...formData, 'DNI': e.target.value })}
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
                    value={formData['Celular']}
                    onChange={(e) => setFormData({ ...formData, 'Celular': e.target.value })}
                />
                <TextField
                    required
                    id="standard-required"
                    label="E-mail"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="standard"
                    value={formData['E-mail']}
                    onChange={(e) => setFormData({ ...formData, 'E-mail': e.target.value })}
                />
                <Typography variant="h6" gutterBottom>
                    Datos de envío
                </Typography>
                <TextField
                    required
                    id="standard-required"
                    label="Direccion"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="standard"
                    value={formData['Direccion']}
                    onChange={(e) => setFormData({ ...formData, 'Direccion': e.target.value })}
                />
                <TextField
                    required
                    id="standard-required"
                    label="Localidad"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="standard"
                    value={formData['Localidad']}
                    onChange={(e) => setFormData({ ...formData, 'Localidad': e.target.value })}
                />
                <TextField
                    id="standard-number"
                    label="Codigo postal"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="standard"
                    value={formData['Codigo postal']}
                    onChange={(e) => setFormData({ ...formData, 'Codigo postal': e.target.value })}
                />
                <TextField
                    required
                    id="standard-required"
                    label="Provincia"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="standard"
                    value={formData['Provincia']}
                    onChange={(e) => setFormData({ ...formData, 'Provincia': e.target.value })}
                />
            </div>
            <ConfirmOrder orderData={orderData} />
            <Button type="submit" variant="contained">Enviar orden</Button>
            <Button onClick={handleCancel} variant="outlined">Reiniciar datos</Button>
        </Box>
    );
};

export default Form;