import React, { Component } from 'react';
import "./SideMenu.global.css"

class SideMenu extends Component {
    constructor() {
        super();
        this.state = {
            sideMenuActive: ""
        }
    }

    render() {
        return (
            <div className="SideMenu">
                <p>CENTRO DE AYUDA</p>
                <ul>
                    <li>
                        <a onClick={() => this.setState({ sideMenuActive: this.state.sideMenuActive === "preguntas" ? "" : "preguntas" })}>Preguntas Frecuentes</a>
                        <ul className={"submenu" + (this.state.sideMenuActive === "preguntas" ? " open" : "")}>
                            <li><a href="/como-comprar">¿Cómo Comprar En Keds.Cl?</a></li>
                            <li><a href="/opciones-despacho">¿Cuáles Son Las Opciones De Despacho?</a></li>
                            <li><a href="/paquetes">¿Puede Mi Orden Llegar En Diferentes Paquetes?</a></li>
                            <li><a href="/orden">¿Cómo Se Donde Está Mi Orden?</a></li>
                            <li><a href="#">¿Cuánto Se Demora En Llegar Mi Compra? ¿En Qué Horario?</a></li>
                            <li><a href="/cambio">¿Qué Pasa Si La Talla Me Queda Mal O El Producto No Es Lo Que Esperaba?</a></li>
                            <li><a href="/como-pagar">¿Cómo Puedo Pagar?</a></li>
                            <li><a href="/productos">¿Los Productos Son Los Mismos Que Los De Las Tiendas?</a></li>
                            <li><a href="/producto-fallado">¿Qué Pasa Si Mi Producto Esta Fallado?</a></li>
                            <li><a href="/mails">No Me Llegan Los Mails, ¿Qué Hago?</a></li>
                        </ul>
                    </li>
                    <li>
                        <a onClick={() => this.setState({ sideMenuActive: this.state.sideMenuActive === "cliente" ? "" : "cliente" })}>Cliente Nuevo</a>
                        <ul className={"submenu" + (this.state.sideMenuActive === "cliente" ? " open" : "")}>
                            <li><a href="/beneficios">Beneficios De Keds</a></li>
                            <li><a href="/login">Registrate</a></li>
                        </ul>
                    </li>
                    <li>
                        <a onClick={() => this.setState({ sideMenuActive: this.state.sideMenuActive === "cuenta" ? "" : "cuenta" })}>Mi Cuenta</a>
                        <ul className={"submenu" + (this.state.sideMenuActive === "cuenta" ? " open" : "")}>
                            <li><a href="/mi-cuenta">¿Qué Puedo Hacer Desde Mi Cuenta?</a></li>
                            <li><a href="/login">Olvidé Mi Clave</a></li>
                        </ul>
                    </li>
                    <li>
                        <a onClick={() => this.setState({ sideMenuActive: this.state.sideMenuActive === "seguridad" ? "" : "seguridad" })}>Seguridad Y Privacidad</a>
                        <ul className={"submenu" + (this.state.sideMenuActive === "seguridad" ? " open" : "")}>
                            <li><a href="/compra-segura">Compra Segura</a></li>
                            <li><a href="/politica-privacidad">Política De Privacidad</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="/tiendas">Nuestras Tiendas</a>
                    </li>
                    <li>
                        <a href="/terminos-condiciones">Términos Y
                        Condiciones</a>
                    </li>
                    <li>
                        <a href="/contacto">Contáctanos</a>
                    </li>
                </ul>
            </div>
        );
    }
}
export default SideMenu