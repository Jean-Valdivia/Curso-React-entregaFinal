import { Modal, Typography } from "@mui/material";
import PaymentIcon from '@mui/icons-material/Payment';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import ItemCount from "../common/ItemCount";
import { useContext, useState } from "react";
import { useCartContext } from "../../context/CartContext";

const ProductInfo = ({ product, open, setOpen }) => {
    const { id, image, title, price, isAnOffer, itHasDues, stock } = product
    const { addToCart } = useCartContext()
    const [quantityInCart, setQuantityInCart] = useState(0);
    


    const handleClose = () => {
        setOpen(prev => !prev)
    }



    // Función para manejar la compra
    const handleAddToCart = (count) => {
        setQuantityInCart(count);
        console.log('agregado', count)
        if (count > 0) {
            addToCart({
                id, title, image, price, quantity: count
            })
        }
    };


    return (<>
        <Modal open={open} onClose={handleClose}>
            <div className="modal-content">
                <Typography variant="h4">{title}</Typography>
                <><img src= {image} alt="imagen del producto"/></>
                <Typography variant="h6" color="primary"> ${price.toFixed(2)}</Typography>
                <Typography> stock: {stock} </Typography>
                <div className="modal-scroll-content">
                    <Typography variant="body2" color="textSecondary">
                        {
                            itHasDues && (<>
                                <PaymentIcon /> Hasta tres cuotas sin interés </>)
                        }
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {
                            isAnOffer && (<>
                                <WhatshotIcon /> Oferta! </>)
                        }
                    </Typography>
                    {/**agrego el ITEM COUNT y le paso los valores de stock, el valor inicial que siempre sería uno y por ahora en el on Add hago un clg */}
                    <ItemCount stock={stock} initial={quantityInCart} onAdd={handleAddToCart} />
                </div>
            </div>
        </Modal>
    </>);
}

export default ProductInfo;