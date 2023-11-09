import { useParams } from "react-router-dom";
import { CircularProgress, Grid } from "@mui/material";
import ProductDetail from "../products/ProductDetail";
import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";



const CategoriesProductList = () => {
    const { categoryId } = useParams();
    const [ loading, setLoading ] = useState(true);
    const [ data, setData ] = useState([]);

    useEffect (() => {
        const db = getFirestore();
        const querySnapshot = query(collection(db, "products"), where("category", "==", categoryId));
            getDocs(querySnapshot).then((snapshot)=>{
                if (snapshot.size === 0) {
                    console.log("no results")
                }
                setData(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data() })))
                setLoading(false)
            })
        }, []);

    if (loading) return <CircularProgress />

    return (<div className="container">
        <Grid container spacing={3}>
            {data.map((product) => {
                return <ProductDetail key={product.id} product={product} />;
            })}
        </Grid>
    </div>);
}

export default CategoriesProductList;