import { CircularProgress, Grid, Typography } from "@mui/material";
import useAsyncMock from "../../hooks/UseAsyncMock";
import products from '../../mocks/products.json';
import ProductDetail from "./ProductDetail"; 
import { useState , useEffect } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";


const ProductList = () => {
    const [ data, setData] =useState();
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState("");

    useEffect(() =>{
        const fetchData = async () => {
            const db = getFirestore();
            const querySnapshot = await getDocs(collection(db, "products"))
            const newData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            setData(newData)
            loading(false)
        }
        
        fetchData()

    }, []);


    if (loading) return <CircularProgress />


    return (<div className="container">
        <Typography variant="h2" style={{ color: "blue" }}>
            Productos
        </Typography>
        <Grid container spacing={3}>
            {
                data.map((product) => {
                    return (
                        <ProductDetail key={product.id} product={product}>
                        </ProductDetail>
                    )
                })
            }
        </Grid>


    </div>);
}

export default ProductList;