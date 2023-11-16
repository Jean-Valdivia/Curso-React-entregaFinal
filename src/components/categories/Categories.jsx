import { Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const Categories = () => {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
                const db = getFirestore();
                const querySnapshot = await getDocs(collection(db, "categorias"))
                const newCategoriesData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
                setCategorias(newCategoriesData)
                setLoading(false)
        }

        fetchCategories();
    }, []);

    if (loading) return <CircularProgress />;

    return (
        <div className="container">
            <Typography variant="h2" style={{ color: "red" }}>
                Categorías
            </Typography>
            {
                categorias.map((categoria) => (
                    <Card key={categoria.id}>
                        <CardContent component={Link} to={`/category/${categoria.category}`}>
                            <Typography variant="h5" style={{ color: "blue" }}>{categoria.category}</Typography>
                        </CardContent>
                    </Card>
                ))
            }
        </div>
    );
}

export default Categories;