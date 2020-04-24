import React from 'react'
import Helmet from 'react-helmet'

class HelmetComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {

        return (
            <Helmet>
                <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async=""></script>
                <script>
                    {`
                        var OneSignal = window.OneSignal || [];
                        OneSignal.push(function() {
                          OneSignal.init({
                            appId: "99fa8a92-83ab-4403-b9ea-e1535a355bb0",
                          });
                        });            
                    `}
                </script>
            </Helmet>
        )
    }
}
export default HelmetComponent