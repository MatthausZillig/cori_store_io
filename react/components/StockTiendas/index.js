import React, { useState } from 'react'
import { ProductContext } from 'vtex.product-context'
import axios from 'axios'
import "./StockTiendas.global.css"

const StockTiendasComponent = () => {
    const [selectedItemState, setSelectedItemState] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [showItem, setShowItem] = useState(null)
    const [stockJson, setStockJson] = useState(null)

    const getStockTiendas = () => {
        setShowItem(selectedItemState ? selectedItemState : { name: "Seleccione el talle" })

        if (!selectedItemState.id) {
            return
        }

        axios.get("https://woodstock.develop.forus-sistemas.biz/backend/producto/stock/" + selectedItemState.id, {
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "pkNWVvyVBh8Y6AP5Bd17F8L1Cbx3H0Zo7oNQydqu"
            }
        }).then(res => {
            setStockJson(res.data)
        })
    }

    const productContext = React.useContext(ProductContext)
    const { product, selectedItem } = productContext
    const selectedItemName = selectedItem ? selectedItem.name.split("-")[0] : null
    const productSelect = product && product.items ? product.items.filter(item => {
        if (item.name.split("-")[0] == selectedItemName) {
            return item
        }
    }) : null

    return (
        <div className="tiendas_stock">
            <button onClick={() => setModalOpen(true)}>Ver stock en tiendas</button>
            {
                modalOpen ? (
                    <div className="bg_modal" onClick={() => setModalOpen(false)}></div>
                ) : null
            }
            {
                modalOpen ? (
                    <div className="modal_tiendas">
                        <div className="header_tiendas">
                            <div className="skuSelector_tiendas">
                                <div className="selected_item_img">
                                    <img src={selectedItem.images[0].imageUrl} />
                                </div>
                                <div className="selected_item_details">
                                    <h3>{selectedItem.nameComplete.replace(selectedItem.name, "")}</h3>
                                    <div className="selected_item_talles">
                                        {
                                            productSelect && productSelect.length ? productSelect.map(item => (
                                                <div className={"btn_tiendas" + (selectedItemState && selectedItemState.id && selectedItemState.id === item.itemId ? " selected" : "")} onClick={() => setSelectedItemState({ id: item.itemId, name: "Sin resultados para el talle " + item.name.split("-")[1] })}>
                                                    <span>{item.name.split("-")[1]}</span>
                                                </div>
                                            )) : null
                                        }
                                    </div>
                                    <button className="button_buscar_tiendas" onClick={() => getStockTiendas()}>Buscar tiendas</button>
                                </div>
                            </div>
                        </div>
                        <div className="body_tiendas">
                            {
                                showItem && showItem.id ? (
                                    <div className="result_tiendas">
                                        {
                                            stockJson && stockJson.sucursales && stockJson.sucursales.length ? stockJson.sucursales.map(sucursal => (
                                                <div className="tienda">
                                                    <div className="columna_details">
                                                        <h3>{sucursal.nombre}</h3>
                                                        <p>{sucursal.direccion}</p>
                                                        <p>{sucursal.region}</p>
                                                        <p>{sucursal.comuna}</p>
                                                        <p>{sucursal.telefono}</p>
                                                        {
                                                            sucursal.stock && sucursal.stock.length ?
                                                                (
                                                                    <div className="unidades">
                                                                        {
                                                                            <p className={(sucursal.stock.toLowerCase().includes("pocas") ? "pocas" : "muchas")}>{sucursal.stock}</p>
                                                                        }
                                                                    </div>
                                                                ) : <p className="sin_stock">Sin stock en esa tienda</p>
                                                        }
                                                    </div>
                                                    <div className="columna_mapa">
                                                        <a href={"https://www.google.com/maps/search/?api=1&query=" + sucursal.direccion + "&" + sucursal.latitud + "," + sucursal.longitud} target="_blank">
                                                            <img src="/arquivos/icon.png" />
                                                            <span>Ver en mapa</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            )) : <p className="sin_stock">{stockJson}</p>
                                        }
                                    </div>
                                ) : <h3 className="error_tiendas">{showItem ? showItem.name : null}</h3>
                            }
                        </div>
                    </div>
                ) : null
            }
        </div>
    );
}

export default StockTiendasComponent