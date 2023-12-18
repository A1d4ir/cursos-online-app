import { Avatar, List, ListItem, ListItemText } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import FotoUsuarioTemp from "../../../logo.svg";

const MenuDerecha = ({classes, usuario, salirSesion}) => {
  return (
    <div className={classes.list}>
        <List>
            <ListItem button component={Link}>
                <Avatar src={ usuario.imagenPerfil || FotoUsuarioTemp } />
                <ListItemText classes={{primary: classes.listItemText}} primary={ usuario ? usuario.nombreCompleto : ""} />
            </ListItem>
            <ListItem button onClick={salirSesion}>
                <ListItemText classes={{primary: classes.listItemText}} primary="Salir" />
            </ListItem>
        </List>
    </div>
  )
}

export default MenuDerecha