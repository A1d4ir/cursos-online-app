import { 
    Avatar, 
    Button, 
    Drawer, 
    IconButton,
    Toolbar, 
    Typography, 
    makeStyles 
} from '@material-ui/core'
import React, { useState } from 'react'
import FotoUsuarioTemp from "../../../logo.svg";
import { useStateValue } from '../../../contexto/store';
import MenuIzquierda from './MenuIzquierda';
import MenuDerecha from './MenuDerecha';
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    seccionDesktop : {
        display : "none",
        [theme.breakpoints.up("md")] : {
            display : "flex"
        }
    },
    seccionMobile : {
        display: "flex",
        [theme.breakpoints.up("md")] : {
            display : "none"
        }
    },
    grow : {
        flexGrow : 1
    },
    avatarSize : {
        width: 40,
        height: 40
    },
    list: {
        width: 250
    },
    listItemText: {
        fontSize: "14px",
        fontWeight: 600,
        paddingLeft: "15px",
        color: "#212121"
    }
}))

const BarSesion = props => {
    const classes = useStyles();
    const [{sesionUsuario}, dispatch] = useStateValue();
    
    const [abrirMenuIzquierdo, setAbrirMenuIzquierdo] = useState(false);
    const [abrirMenuDerecha, setAbrirMenuDerecha] = useState(false);

    const cerrarMenuIzquierdo = () => setAbrirMenuIzquierdo(false);

    const abrirMenuIzquierdoAction = () => setAbrirMenuIzquierdo(true);

    const cerrarMenuDerecha = () => setAbrirMenuDerecha(false);

    const salirSesionApp = () => {
        console.log("Saliendo");
        localStorage.removeItem('token_seguridad');

        dispatch({
            type: "SALIR_SESION",
            nuevoUsuario: null,
            autenticado: false
        });

        props.history.push('/auth/login');
    }

    const abrirMenuDerechaAction = () => setAbrirMenuDerecha(true);

    return (
        <React.Fragment>
            <Drawer
                open={abrirMenuIzquierdo}
                onClose={cerrarMenuIzquierdo}
                anchor='left'
            >
                <div className={classes.list} onKeyDown={cerrarMenuIzquierdo} onClick={cerrarMenuIzquierdo}>
                    <MenuIzquierda classes={classes} />
                </div>
            </Drawer>

            <Drawer
                open={abrirMenuDerecha}
                onClose={cerrarMenuDerecha}
                anchor='right'
            >
                <div role='button' onClick={cerrarMenuDerecha} onKeyDown={cerrarMenuDerecha}>
                    <MenuDerecha 
                        classes={classes} 
                        salir={salirSesionApp}
                        usuario={sesionUsuario ? sesionUsuario.usuario : null} 
                    />
                </div>
            </Drawer>

            <Toolbar>
                <IconButton color='inherit' onClick={abrirMenuIzquierdoAction}>
                    <i className='material-icons'>menu</i>
                </IconButton>

                <Typography variant='h6'>Cursos Online</Typography>
                <div className={classes.grow}></div>
                <div className={classes.seccionDesktop}>
                  <Button color='inherit' onClick={salirSesionApp}>
                    Salir
                  </Button>
                  <Button color='inherit'>
                    {sesionUsuario ? sesionUsuario.usuario.nombreCompleto : ""}
                  </Button>
                  <Avatar src={sesionUsuario.usuario.imagenPerfil || FotoUsuarioTemp}></Avatar>
                </div>

                <div className={classes.seccionMobile}>
                  <IconButton color='inherit' onClick={abrirMenuDerechaAction}>
                      <i className='material-icons'>more_vert</i>
                  </IconButton>
                </div>

            </Toolbar>
        </React.Fragment>
    )
}

export default withRouter(BarSesion);