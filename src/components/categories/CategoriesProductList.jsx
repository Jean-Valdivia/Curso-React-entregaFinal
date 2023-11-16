import { useParams } from "react-router-dom";
import { CircularProgress, Grid } from "@mui/material";
import ProductDetail from "../products/ProductDetail";
import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const CategoriesProductList = () => {
    const { categoryId } = useParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const db = getFirestore();
            const productsCollection = collection(db, "products");

            try {
                const querySnapshot = await getDocs(productsCollection);
                const filteredData = querySnapshot.docs
                    .map((doc) => ({ id: doc.id, ...doc.data() }))
                    .filter((product) => product.category.toLowerCase() === categoryId.toLowerCase());

                setData(filteredData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [categoryId]);

    if (loading) return <CircularProgress />;

    return (
        <div className="container">
            <Grid container spacing={3}>
                {data.map((product) => (
                    <ProductDetail key={product.id} product={product} />
                ))}
            </Grid>
        </div>
    );
};

export default CategoriesProductList;