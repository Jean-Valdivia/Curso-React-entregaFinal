import './Navbar.css';
import '../cartwidget/cartwidget'
import { AppBar , Button , Toolbar, Typography} from '@mui/material';
import CartWidget from '../cartwidget/cartwidget';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar>
      <Toolbar sx={{justifyContent: 'space-around'}}>
        <Typography sx={{ color: "black" }}>
              <h1>Fenix3D</h1>
        </Typography>
        <Button sx={{color: 'black', }} component={Link} to={`/`}>
          Home
        </Button>
        <Button sx={{color: 'black'}} component={Link} to={`/categories/`}>
          Categorias
        </Button>
        <Button sx={{color: 'black'}} component={Link} to={`/products`}>
          Productos
        </Button>
        <Button sx={{color: 'black'}} component={Link} to={`/cart`}>
          <CartWidget/> 
        </Button>
      </Toolbar>
    </AppBar>);
};

export default Navbar;