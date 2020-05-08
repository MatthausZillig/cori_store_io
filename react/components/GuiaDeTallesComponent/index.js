import React, { useState } from 'react'
import { ProductContext } from 'vtex.product-context'
import "./GuiaDeTallesComponent.global.css"

class CorebizGuiaTalleComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            guiaOpen: false
        }
    }

    render() {
        const {
            product
        } = this.props
        console.log(product);
        const specificationGroups = product.specificationGroups

        const guiaDeTalles = specificationGroups[0].specifications.filter(specification => {
            if (specification.name === "Guía de Talla") {
                return specification
            }
        })

        if (guiaDeTalles && guiaDeTalles.length) {

            return (
                <div className="guia_de_talles">
                    <button onClick={() => this.setState({ guiaOpen: true })}>Guia de tallas</button>
                    {
                        this.state.guiaOpen ? (
                            <div className="bg_guia" onClick={() => this.setState({ guiaOpen: false })}></div>
                        ) : null
                    }
                    {
                        this.state.guiaOpen ? (
                            <div className="modal_guia">
                                <div className="close_modal" onClick={() => this.setState({ guiaOpen: false })}>
                                    <span>X</span>
                                </div>
                                <img src={"/arquivos/" + guiaDeTalles[0].values[0] + "_DESKTOP.jpg"} className="desktop" />
                                <img src={"/arquivos/" + guiaDeTalles[0].values[0] + "_MOBILE.jpg"} className="mobile" />
                            </div>
                        ) : null
                    }
                </div>
            );
        }

        return <div></div>
    }
}
const GuiaDeTalles = () => {
    const { product } = React.useContext(ProductContext)

    return <CorebizGuiaTalleComponent product={product} />
}
export default GuiaDeTalles