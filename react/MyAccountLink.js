import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import "./MyAccountScript"

const MyAppLink = ({ render, intl }) => {
    return render(
        [
            {
                name: intl.formatMessage({ id: "pedidos-anteriores.message", defaultMessage: "Pedidos Anteriores" }),
                path: '/pedidos-anteriores'
            }
        ])
}

MyAppLink.propTypes = {
    render: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
}

export default injectIntl(MyAppLink)