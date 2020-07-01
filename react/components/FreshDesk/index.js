import React, { Component } from 'react'
import { withRuntimeContext } from 'vtex.render-runtime'
import './FreshDesk.global.css'
import axios from 'axios'

// const GLOBAL_PAGES = global.__RUNTIME__ && Object.keys(global.__RUNTIME__.pages)

class FreshDesk extends Component {

    constructor(props) {
        super(props)

        this.state = {
            nombre: '',
            email: '',
            requerimiento: '',
            opciones: '',
            consulta: '',
            orden: '',
            type: '',
            showModal: false,
            formSuccess: true,
            sendedForm: {
                nombre: '',
                email: '',
                requerimiento: '',
                opciones: '',
                consulta: '',
                orden: '',
                type: ''
            }
        }
    }

    handleNombre = e => {
        this.setState({
            nombre: e.target.value
        });
    }

    handleEmail = e => {
        this.setState({
            email: e.target.value
        });
    }

    handleRequerimento = e => {
        this.setState({
            requerimiento: e.target.value
        });
    }

    handleOpciones = e => {
        this.setState({
            opciones: e.target.value
        });
    }

    handleType = e => {
        this.setState({
            type: e.target.value
        });
    }

    handleConsulta = e => {
        this.setState({
            consulta: e.target.value
        });
    }

    handleOrden = e => {
        this.setState({
            orden: e.target.value
        });
    }

    handleImage = e => {

        const files = Array.from(e.target.files)

        this.setState({
            files
        })
    }

    getTypes(types, requerimiento, opciones) {

        let typesFiltered = types.filter(type => {
            if (type.requerimiento === requerimiento && type.opciones === opciones) {
                return type
            }
        })

        if (typesFiltered && typesFiltered.length) {
            return typesFiltered[0].types
        }

        return []
    }

    postImage(files, name, email) {
        const imagesName = []

        return new Promise(resolve => {

            const formData = new FormData()

            files.forEach(file => {
                formData.append('image', file)
            })

            const images = formData.getAll('image')

            axios.post("/api/dataentities/FI/documents", { name, email }).then(res => {
                const { DocumentId } = res.data

                axios({
                    method: 'post',
                    url: '/api/dataentities/FI/documents/' + DocumentId + '/image/attachments',
                    data: formData,
                    headers: { 'Content-Type': 'multipart/form-data' }
                }).then(() => {
                    images.forEach(image => {
                        const imageName = window.location.origin + "/api/dataentities/FI/documents/" + DocumentId + "/image/attachments/" + image.name
                        imagesName.push(imageName)
                        resolve(imagesName);
                    })
                })
            })
        });
    }

    enviaForm = async account => {
        event.preventDefault()
        const submitButton = document.getElementById('continue');
        submitButton.disabled = true;

        let imagePost = []
        let { nombre,
            email,
            requerimiento,
            files,
            opciones,
            consulta,
            orden,
            type } = this.state

        if (files && files.length) {
            imagePost = await this.postImage(files, nombre, email);
        }
        let subject = requerimiento + " " + opciones

        if (imagePost.length) {
            subject = subject + " Archivos: " + JSON.stringify(imagePost)
        }

        if (!orden || !orden.length) {
            orden = 0
        }

        const getGroupId = account => {
            const groupId = {
                'azaleiacl': () => 22000157847,
                'bodyandsoulcl': () => 22000162709,
                'columbiacl': () => 22000157847,
                'catcl': () => 22000157850,
                'hushpuppiescl': () => 22000160056,
                'hushpuppieskidscl': () => 22000160056,
                'merrellcl': () => 22000157848,
                'kedscl': () => 22000160391,
                'zapatoscl': () => 22000153744,
                'sieteveintecl': () => 22000157851,
                'jansportcl': () => 22000157849,
                'norsegcl': () => 22000157852,
                'mountainhardwearcl': () => 22000161917,
                'default': () => null
            }

            return (groupId[account] || groupId['default'])()
        }

        const data = {
            name: nombre,
            email: email,
            description: consulta,
            subject,
            type,
            group_id: getGroupId(account),
            tags: [requerimiento, opciones],
            priority: 1,
            status: 2,
            custom_fields: {
                cf_orden: orden,
            }
        }

        const settings = {
            url: "https://forusecommerce.freshdesk.com/api/v2/tickets",
            method: "POST",
            data,
            async: true,
            crossDomain: true,
            headers: {
                "content-type": "application/json",
                "authorization": "Basic d1dYOTBuQm5zdnB4OExDRmJkUzo=",
                "cache-control": "no-cache"
            },
            processData: false
        }

        axios(settings).then(response => {
            this.enviado(response.status, response.statusText)
            submitButton.disabled = false;
        }).catch(() => {
            this.enviado(400, "")
            submitButton.disabled = false;
        })
    }

    enviado(statusCode, statusText) {


        if (statusText == "Created" || statusCode == 201) {
            const {
                nombre,
                email,
                requerimiento,
                opciones,
                consulta,
                orden,
                type
            } = this.state

            this.setState({
                sendedForm: {
                    nombre,
                    email,
                    requerimiento,
                    opciones,
                    consulta,
                    orden,
                    type
                }
            })

            this.setState({
                nombre: '',
                email: '',
                requerimiento: '',
                opciones: '',
                consulta: '',
                orden: '',
                type: ''
            })

            this.setState({
                formSuccess: true,
                showModal: true
            })
        } else {

            this.setState({
                formSuccess: false,
                showModal: true
            })
        }
    }

    getSendedData = () => {
        return { ...this.state.sendedForm }
    }

    render() {
        const { runtime } = this.props
        const account = runtime.account
        const { requerimiento, opciones } = this.state
        const sendedData = this.getSendedData
        const types = [
            {
                requerimiento: 'Solicitud',
                opciones: 'Pre-Venta',
                types: [
                    "Disponibilidad de talla", "Opciones, plazos y costos de despacho", "Cotización venta mayorista"
                ]
            },
            {
                requerimiento: 'Solicitud',
                opciones: 'Post-Venta',
                types: [
                    "Seguimiento de despacho", "Solicitud de boleta", "Cambio de producto", "Devolución del dinero", "Cambio de dirección"
                ]
            },
            {
                requerimiento: 'Reclamo',
                opciones: 'Pre-Venta',
                types: [
                    "Problema con precio o cupón", "Problema de pago"
                ]
            },
            {
                requerimiento: 'Reclamo',
                opciones: 'Post-Venta',
                types: [
                    "No he recibido mi orden", "Error en despacho de mi orden", "Falla de producto", "Devolución del dinero"
                ]
            }
        ]

        return (
            <div className="freshDesk container">
                {
                    this.state.showModal ? (
                        <div className="modal">
                            <div className="bg" onClick={() => this.setState({ showModal: false })}></div>
                            <div className="content">
                                {
                                    this.state.formSuccess ? (
                                        <div className="body_modal success">
                                            <h3>Formulario enviado con exito!</h3>
                                            <ul className="datos">
                                                <li><h5>Nombre: </h5>{sendedData().nombre}</li>
                                                <li><h5>Dirección e-mail: </h5>{sendedData().email}</li>
                                                <li><h5>Tipo de requerimiento: </h5>{sendedData().requerimiento}</li>
                                                <li><h5>Opciones: </h5>{sendedData().opciones}</li>
                                                {
                                                    sendedData().orden ?
                                                        <li><h5>Número de orden: </h5>{sendedData().orden}</li>
                                                        : null
                                                }
                                                <li><h5>Consulta: </h5>{sendedData().consulta}</li>
                                            </ul>
                                        </div>
                                    ) : (
                                            <div className="body_modal error">
                                                <h3>Ocurrió un error. Vuelva a intentarlo!</h3>
                                            </div>
                                        )
                                }
                            </div>
                        </div>
                    ) : null
                }
                <div className="col-md-12">
                    <div className="page-header"><h1>Contacto</h1></div>
                    <fieldset>
                        <dl className="contactarnos">
                            <dt><b>¿Necesitas contactarnos?</b></dt>
                            <dd>Sabemos que contactarnos en estos días ha sido un poco complicado, debido al alto flujo de llamados que estamos recibiendo producto de la contingencia. Es por esto, es que como medida temporal, hemos activado el formulario de contacto como canal único para comunicarnos y poder atenderte lo antes posible.</dd>
                        </dl>
                    </fieldset>
                    <fieldset>
                        <legend>Formulario de contacto</legend>
                        <form method="post" id="contact" enctype="multipart/form-data" onSubmit={() => this.enviaForm(account)}>
                            <div className="form-group">
                                <label className="control-label" for="name">Nombre: </label>
                                <div className="controls">
                                    <input type="text" name="name" id="name" className="form-control" value={this.state.nombre} onChange={this.handleNombre} required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label" for="email">Dirección e-mail: </label>
                                <div className="controls">
                                    <input type="email" name="email" id="email" className="form-control" value={this.state.email} onChange={this.handleEmail} required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label" for="seleccion">Tipo de requerimiento: </label>
                                <div className="controls">
                                    <select name="seleccion" id="seleccion" className="form-control" value={this.state.requerimiento} onChange={this.handleRequerimento} required>
                                        <option value="">Seleccione</option>
                                        <option value="Solicitud">Solicitud</option>
                                        <option value="Reclamo">Reclamo</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label" for="requerimiento">Opciones: </label>
                                <div className="controls">
                                    <select name="requerimiento" id="requerimiento" className="form-control" value={this.state.opciones} onChange={this.handleOpciones} required>
                                        <option value="">Seleccione</option>
                                        <option value="Pre-Venta">Pre-Venta</option>
                                        <option value="Post-Venta">Post-Venta</option>
                                    </select>
                                </div>
                            </div>
                            {
                                requerimiento && opciones ? (
                                    <div className="form-group">
                                        <div className="controls">
                                            <select name="requerimiento" id="requerimiento" className="form-control" value={this.state.type} onChange={this.handleType} required>
                                                <option value="">Seleccione</option>
                                                {
                                                    types && types.length ? this.getTypes(types, requerimiento, opciones).map(type => (
                                                        <option value={type}>{type}</option>
                                                    )) : null
                                                }
                                            </select>
                                        </div>
                                    </div>
                                ) : null
                            }
                            {
                                opciones && opciones === "Post-Venta" ? (
                                    <div id="num_orden" className="form-group">
                                        <label className="control-label" for="enquiry">Número de orden</label>
                                        <div className="controls input-group">
                                            <input type="text" className="form-control" name="orden" id="orden" onkeypress="return valida(event)" value={this.state.orden} onChange={this.handleOrden} required />
                                        </div>
                                    </div>
                                ) : null
                            }
                            <div className="form-group">
                                <label className="control-label" for="enquiry">Consulta: </label>
                                <div className="controls">
                                    <textarea name="enquiry" className="form-control" rows="4" id="enquiry" value={this.state.consulta} onChange={this.handleConsulta} required></textarea>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label" for="attachments">Adjuntar imágenes</label>
                                <div className="controls">
                                    <input type="file" className="form-control-file" name="attachments[]" id="attachments" value={this.state.image} onChange={this.handleImage} multiple />
                                </div>
                            </div>
                            <div className="form-actions">
                                <div className="">
                                    <input id="continue" type="submit" value="Continuar" className="btn btn-primary" />
                                </div>
                            </div>
                        </form>
                    </fieldset>
                </div>
            </div>
        )
    }
}

export default withRuntimeContext(FreshDesk)