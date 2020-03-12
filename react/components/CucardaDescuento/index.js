import React from 'react'
import { ProductContext } from 'vtex.product-context'
import { FormattedNumber } from 'react-intl'
import { IOMessage } from 'vtex.native-types'
import "./CucardaDescuento.global.css"

const CucardaDescuento = ({ text }) => {
    const { selectedItem } = React.useContext(ProductContext)

    if (!selectedItem) {
        return null
    }

    const { Price, ListPrice } = selectedItem.sellers[0].commertialOffer
    const calculateDiscountTax = (listPrice, sellingPrice) => {
        return (listPrice - sellingPrice) / listPrice
    }
    const percent = calculateDiscountTax(ListPrice, Price)
    const shouldShowPercentage = percent && percent >= 0.01

    return shouldShowPercentage ? (
        <div className="cucarda-descuento">
            <div className="cucarda pv1 ph4">
                <IOMessage id={text}>
                    {labelValue => (
                        <>
                            {!labelValue && '-'}
                            <FormattedNumber value={percent} style="percent" />{' '}
                            {labelValue && ' '}
                            {labelValue && <span>{labelValue}</span>}
                        </>
                    )}
                </IOMessage>
            </div>
        </div>
    ) : null
}

CucardaDescuento.defaultProps = {
    text: "OFF"
}

CucardaDescuento.schema = {
    title: "Texto de la cucarda",
    description: "Componente de cucarda de descuento",
    type: "object",
    properties: {
        text: {
            type: "string",
            title: "Texto",
            default: CucardaDescuento.defaultProps.text
        }
    }
}

export default CucardaDescuento