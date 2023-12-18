import React, { useState } from 'react';
import style from "../Tool/Style";
import { Avatar, Button, Container, TextField, Typography } from '@material-ui/core';
import LockUoutlinedIcon from "@material-ui/icons/LockOutlined";
import { loginUsuario } from '../../actions/UsuarioAction';
import { withRouter } from "react-router-dom";
import { useStateValue } from '../../contexto/store';

const Login = (props) => {
    const [{usuarioSesion}, dispatch] = useStateValue();
    const [usuario, setUsuario] = useState({
        Email: '',
        Password : ''
    });

    const ingresarValoresMemoria = e => {
        const {name, value} = e.target;
        setUsuario(anterior => ({
            ...anterior,
            [name] : value
        })
        );
    }

    const loginUsuarioBoton = e => {
        e.preventDefault();
        loginUsuario(usuario, dispatch).then(response => {

            if(response.status === 200) {
                window.localStorage.setItem("token_seguridad", response.data.token);
                props.history.push('/');
            } else {
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                        open: true,
                        mensaje: "Las credenciales del usuario son incorrectas"
                    }
                })
            }


        });
    }

    return (
        <Container maxWidth="xs">
            <div style={style.paper}>
                <Avatar style={style.avatar} >
                    <LockUoutlinedIcon style={style.icon} />
                </Avatar>
                <Typography component="h1" variant='h5'>
                    Login de Usuario
                </Typography>
                <form style={style.form}>
                    <TextField 
                        variant='outlined' 
                        label="Ingrese Email" 
                        name='Email'
                        value={usuario.Email}
                        onChange={ingresarValoresMemoria}
                        fullWidth 
                        margin='normal'
                    />
                    <TextField 
                        variant='outlined' 
                        type='password' 
                        name='Password' 
                        value={usuario.Password}
                        onChange={ingresarValoresMemoria}
                        label="password" 
                        fullWidth 
                        margin='normal' 
                    />
                    <Button 

                        type='submit' 
                        onClick={loginUsuarioBoton} 
                        fullWidth 
                        variant='contained' 
                        color='primary' 
                        style={style.submit} 
                    >
                        Enviar
                    </Button>
                </form>
            </div>
        </Container>
    )
}

export default withRouter(Login);