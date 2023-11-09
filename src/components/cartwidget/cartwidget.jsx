import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Typography } from '@mui/material';
import { useCartContext } from '../../context/CartContext';
import { useEffect, useState } from 'react';

const CartWidget = () => {
    const { cart } = useCartContext();
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const count = cart.items.reduce((acc, item) => acc + item.quantity, 0);
        setCartCount(count);
    }, [cart]);

    console.log(cart)
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <ShoppingCartIcon />
            <Typography>{cartCount}</Typography>
        </div>


    );
}

export default CartWidget;