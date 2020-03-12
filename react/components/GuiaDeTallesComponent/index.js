import React, { useState } from 'react'
import { ProductContext } from 'vtex.product-context'
import "./GuiaDeTallesComponent.global.css"

const GuiaDeTalles = () => {
    const [guiaOpen, setGuiaOpen] = useState(false)
    const { product } = React.useContext(ProductContext)
    const imagesGuia = [
        {
            name: "CLB_MUJER_TOPS_DESKTOP.jpg",
            mobile: "CLB_MUJER_TOPS_MOBILE.jpg",
            categories: [4, 42, 43, 44, 45, 46, 50]
        },
        {
            name: "CLB_GORROS_DESKTOP.jpg",
            mobile: "CLB_GORROS_MOBILE.jpg",
            categories: [7, 8, 31, 32, 61, 69]
        },
        {
            name: "CLB_HOMBRE_CALZADO_DESKTOP.jpg",
            mobile: "CLB_HOMBRE_CALZADO_MOBILE.jpg",
            categories: [12, 13, 14, 15, 16]
        },
        {
            name: "CLB_HOMBRE_TOPS_DESKTOP.jpg",
            mobile: "CLB_HOMBRE_TOPS_MOBILE.jpg",
            categories: [17, 20, 21, 22, 25]
        },
        {
            name: "CLB_HOMBRE_BOTTOM_DESKTOP.jpg",
            mobile: "CLB_HOMBRE_BOTTOM_MOBILE.jpg",
            categories: [19, 24, 26]
        },
        {
            name: "CLB_MUJER_CALZADO_DESKTOP.jpg",
            mobile: "CLB_MUJER_CALZADO_MOBILE.jpg",
            categories: [36, 37, 38, 39, 40]
        },
        {
            name: "CLB_MUJER_BOTTOM_DESKTOP.jpg",
            mobile: "CLB_MUJER_BOTTOM_MOBILE.jpg",
            categories: [41, 47, 71]
        },
        {
            name: "CLB_NINO_CALZADO_DESKTOP.jpg",
            mobile: "CLB_NINO_CALZADO_MOBILE.jpg",
            categories: [58, 66, 68]
        },
        {
            name: "CLB_NINO_BOTTOM_DESKTOP.jpg",
            mobile: "CLB_NINO_BOTTOM_MOBILE.jpg",
            categories: [62, 67]
        }
    ]
    let imageUrl = imagesGuia.filter(image => {
        if (image.categories.includes(product.categoryId) || image.categories.includes(parseInt(product.categoryId))) {
            return image
        }
    })

    if (imageUrl && imageUrl.length) {

        return (
            <div className="guia_de_talles">
                <button onClick={() => setGuiaOpen(true)}>Guia de tallas</button>
                {
                    guiaOpen ? (
                        <div className="bg_guia" onClick={() => setGuiaOpen(false)}></div>
                    ) : null
                }
                {
                    guiaOpen ? (
                        <div className="modal_guia">
                            <div className="close_modal" onClick={() => setGuiaOpen(false)}>
                                <span>X</span>
                            </div>
                            <img src={"/arquivos/" + imageUrl[0].name} className="desktop" />
                            <img src={"/arquivos/" + imageUrl[0].mobile} className="mobile" />
                        </div>
                    ) : null
                }
            </div>
        );
    }

    return <div></div>

}

export default GuiaDeTalles