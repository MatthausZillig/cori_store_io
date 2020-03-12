import React, { useEffect, useState } from 'react'
import { useOrderForm } from 'vtex.store-resources/OrderFormContext'
import axios from 'axios'
import "./PedidosAnteriores.global.css"

const ComponentPedidos = () => {
    const { orderForm } = useOrderForm()
    const [pedidos, setPedidos] = useState([])
    const [activePage, setActivePage] = useState(window.location.hash)

    const getPedidos = orderForm => {
        const mail = orderForm.clientProfileData.email || ""

        return axios.get("/api/dataentities/PA/search?_fields=email,order_id,cantidad_de_producto,date_added,shipping_method,total&_where=email=" + mail).then(({ data }) => {
            if (data && data.length) {
                setPedidos(data)
            }
            return data
        })
    }

    const getFecha = ([ano, mes, dia]) => {
        const date = new Date(ano, mes - 1, dia);
        const month = date.toLocaleString('default', { month: 'long' });

        return dia + " de " + month + " de " + ano
    }

    const changePage = () => {
        setActivePage(window.location.hash)
    }

    useEffect(() => {
        window.onhashchange = () => changePage()
        getPedidos(orderForm)
    }, [])

    if (!activePage.includes("pedidos-ante")) {
        return null
    }

    return (

        <section className={"vtex-account__page PedidosAnteriores w-80"}>
            <main className="vtex-account__page-body">
                <div className="headerPedidos">
                    <h3 className="title">Pedidos Anteriores</h3>
                    <div>
                        <a href="https://devoluciones.forus.cl/" target="_blank">Devolución/cambio</a>
                        <a href="https://www.siguetucompra.cl/" target="_blank">Sigue tu compra</a>
                    </div>
                </div>
                {
                    pedidos.length ? pedidos.map(({ order_id, date_added, shipping_method, cantidad_de_producto, total }) => (
                        <article className="pedido">
                            <div className="idPedido">
                                <div className="titulo">ID</div>
                                <div className="content">#{order_id}</div>
                            </div>
                            <div className="fechaPedido">
                                <div className="titulo">Fecha</div>
                                <div className="content">{getFecha(date_added.split(".")[0].split("-"))}</div>
                            </div>
                            <div className="entrega">
                                <div className="titulo">Tipo de envio</div>
                                <div className="content">{shipping_method}</div>
                            </div>
                            <div className="cantidadPedido">
                                <div className="titulo">Cantidad de producto</div>
                                <div className="content">{cantidad_de_producto}</div>
                            </div>
                            <div className="totalPedido">
                                <div className="titulo">Total</div>
                                <div className="content">${total}</div>
                            </div>
                        </article>
                    )) : <p>No fueron encontrados pedidos anteriores</p>
                }
            </main>
        </section>
    )
}
export default ComponentPedidos