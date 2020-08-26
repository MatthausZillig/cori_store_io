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
                {/* <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async=""></script>
                <script>
                    {`
                        var OneSignal = window.OneSignal || [];
                        OneSignal.push(function() {
                          OneSignal.init({
                            appId: "99fa8a92-83ab-4403-b9ea-e1535a355bb0",
                          });
                        });            
                    `}
                </script> */}

                <script id="mcjs">{`!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/1b42ccefb665c9f7076b49ffc/cc79a30a450f8d59d0ed3e8dd.js");`}</script>
            </Helmet>
        )
    }
}
export default HelmetComponent