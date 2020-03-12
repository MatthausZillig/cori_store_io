import React, { useState, useEffect } from 'react'
import "./ScrollUp.global.css"

const ScrollUp = ({ text, image, color, offset }) => {
    const [scrollY, setScrollY] = useState(0)
    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    const verifyScroll = () => {
        if (!window) {
            return
        }

        window.onscroll = function () {
            setScrollY(window.scrollY)
        }
    }

    useEffect(() => {
        verifyScroll()
    }, [])

    if (scrollY <= offset) {
        return null
    }

    return (
        <div className="scrollUp" onClick={() => goToTop()}>
            <div className="scrollUp-image">
                {image ? <img src={image} /> : <svg fill={color} id="icon-arrow-up" viewBox="0 0 15.7 9.1"><path d="M7.8 0l7.6 7.6c.3.3.3.9 0 1.2s-.9.3-1.2 0L7.8 2.4 1.5 8.8c-.3.3-.9.3-1.2 0S0 7.9.3 7.6L7.8 0z"></path></svg>}
            </div>
            {text && <span className="scrollUp-text">{text}</span>}
        </div>
    )
}

ScrollUp.defaultProps = {
    color: "#000",
    offset: 400
}

ScrollUp.schema = {
    title: "Volver arriba",
    description: "Componente de volver arriba",
    type: "object",
    properties: {
        image: {
            type: "string",
            title: "Image",
            widget: {
                "ui:widget": "image-uploader"
            }
        },
        text: {
            title: "Text",
            type: "string",
            default: ScrollUp.defaultProps.text
        },
        color: {
            type: "string",
            title: "Color (Hex.)",
            description: "Hex code for icon color. (If you're using the default svg icon)",
            default: ScrollUp.defaultProps.color
        },
        offset: {
            type: "string",
            title: "Offset",
            description: "Scroll offset that component show.",
            default: ScrollUp.defaultProps.offset
        }
    }
};

export default ScrollUp