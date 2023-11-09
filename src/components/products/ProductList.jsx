import { CircularProgress, Grid, Typography } from "@mui/material";
import ProductDetail from "./ProductDetail"; 
import { useState , useEffect } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";


const ProductList = () => {
    const [ data, setData] =useState();
    const [ loading, setLoading ] = useState(true);

    useEffect(() =>{
        const fetchData = async () => {
            const db = getFirestore();
            const querySnapshot = await getDocs(collection(db, "products"))
            const newData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            setData(newData)
            setLoading(false)
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