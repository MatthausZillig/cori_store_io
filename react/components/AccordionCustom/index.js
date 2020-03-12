import React, { useState } from 'react'
import "./AccordionCustom.global.css"

const AccordionCustom = () => {
    const [preguntaActive, setPreguntaActive] = useState(null)
    const preguntas = [
        {
            pregunta: "¿Cuánto cuesta Click & Collect - Retiro en Tienda?",
            resposta: "Click & Collect no tiene costo asociado, es totalmente gratis."
        },
        {
            pregunta: "¿Cuánto demora en estar listo mi pedido?",
            resposta: "Haremos todo lo posible por tener tu pedido listo en las próximas horas. A más tardar demoraremos 1 día hábil."
        },
        {
            pregunta: "¿Cómo se cuándo retirar mi pedido?",
            resposta: "Apenas procesemos tus productos, te enviaremos un mail informándote que ya están listos para ser retirados en la tienda que escogiste. Recuerda esperar este mail antes de dirigirte a la tienda."
        },
        {
            pregunta: "¿Qué necesito para retirar mis productos?",
            resposta: "Necesitaras acercarte a un vendedor y entregarle tu nombre y los últimos 4 dígitos del RUT asociado a la cuenta que hizo la compra."
        },
        {
            pregunta: "¿Puede alguien más retirar mi compra?",
            resposta: "¡Si!, sólo compártele tu número de orden y tu RUT."
        },
        {
            pregunta: "¿Cuánto tiempo tengo para retirar mi compra?",
            resposta: "Tienes 5 días para retirar tu compra desde el momento que te llega el correo de que tu orden está lista para retiro. En ese correo se muestra la fecha límite para retirar."
        },
        {
            pregunta: "¿Qué pasa si no retiro mi orden en el plazo establecido?",
            resposta: "Se anulará la compra y reversará el dinero. Depende del medio de pago utilizado puede demorar hasta 15 días hábiles en hacerse efectivo. Si compraste con débito, te contactaremos para solicitar los datos de la cuenta a la que hacer la transferencia."
        },
        {
            pregunta: "¿Qué pasa si no hay stock de alguno de mis productos?",
            resposta: "En el raro caso que esto pase, te contactaremos para gestionar contigo la solución que más te acomode: Retiro en otra tienda, envío a domicilio o devolución del dinero."
        },
        {
            pregunta: "¿Puedo cambiar o devolver mis productos en tienda?",
            resposta: "¡Por supuesto! Te invitamos a probarte tus productos y hacer cualquier cambio que desees en el momento. Si no cumplimos tus expectativas, puedes solicitar la devolución del dinero en la misma tienda."
        },
        {
            pregunta: "¿Puedo comprar varios productos con métodos de despacho diferentes o retiro en distintas tiendas?",
            resposta: "No, cada orden solo puede tener un tipo de despacho o punto de retiro. Si necesitas algunos productos para retiro en tienda y otros con despacho a domicilio, por ejemplo, debes hacer dos compras por separado."
        },
    ]

    return (
        <div className="AccordionCustom">
            <div className="vtex-store-components-3-x-container ph3 ph5-m ph2-xl mw9 center">
                <div className="pr0 items-stretch vtex-flex-layout-0-x-stretchChildrenWidth flex">
                    <div className="vtex-flex-layout-0-x-flexRow vtex-flex-layout-0-x-flexRow--colunas-retiroTienda">

                        <div className="preguntas-custom">
                            {
                                preguntas.map((pregunta, i) => (
                                    <div className={"box-pregunta" + (preguntaActive === i ? " active" : "")}>
                                        <div className="pregunta" onClick={() => setPreguntaActive(i)}>{pregunta.pregunta}</div>
                                        <div className="resposta">{pregunta.resposta}</div>
                                    </div>
                                ))
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccordionCustom