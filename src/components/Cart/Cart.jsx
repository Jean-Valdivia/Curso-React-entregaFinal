import React, { useContext } from 'react';
import { Link } from "react-router-dom";

import {
    Paper,
    Table,
    Stack,
    Button,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { useCartContext } from "../../context/CartContext";

const Cart = () => {
    const { cart, setCart } = useCartContext();

    const removeFromCart = (index) => {
        const updatedCart = [...cart.items];
        updatedCart.splice(index, 1);
        const newTotal = updatedCart.reduce((total, item) => total + item.price * item.quantity, 0);
        setCart({ ...cart, items: updatedCart, total: newTotal });
    };

    const emptyCart = () => {
        setCart({ items: [], total: 0 });
    };

    return (
        <div className="container">
            <Paper elevation={3}>
                <Typography variant="h6" component="div" align="center" sx={{ p: 2 }}>
                    Cart
                </Typography>
                {cart.items.length === 0 ? (
                    <Typography variant="body2" align="center" sx={{ p: 2 }}>
                        Carrito vacío
                    </Typography>
                ) : (
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Imagen</TableCell>
                                    <TableCell>Producto</TableCell>
                                    <TableCell>Precio</TableCell>
                                    <TableCell>Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cart.items.map((item, index) => (
                                    <TableRow key={item.id}>
                                        <TableCell><img style={{ width: "10%", height: "10%" }} src={item.image} alt={item.title} /></TableCell>
                                        <TableCell>{item.title}</TableCell>
                                        <TableCell>${item.price}</TableCell>
                                        <TableCell>${item.price * item.quantity}</TableCell>
                                        <TableCell><button onClick={() => removeFromCart(index)}>Eliminar</button></TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell colSpan={3}>Total:</TableCell>
                                    <TableCell>${cart.total.toFixed(2)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Stack spacing={2} direction="row">
                            <Button variant="contained" component={Link} to={`/form`}>Finalizar compra</Button>
                            <Button variant="outlined" onClick={emptyCart}>Vaciar carrito</Button>
                        </Stack>
                    </TableContainer>
                )}
            </Paper>
        </div>
    );
};

export default Cart;