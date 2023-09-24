/**
* Created by JAIR on 7/9/2016.
*/

var cargando = '<div class="text-center" style="color:#fff;padding:1em"><i class="fa fa-spinner fa-spin"></i></div>';

var icon_select = 'circle-o';
function redondeodecimale(numer) {
    var value = parseFloat(numer);
    value = Math.round(value * 100) / 100;
    return (value);
}
function createTarjetaCobranzaPDF(response) {

    var data_cronograma = response.data_cronograma;
    var data_cliente = response.data_cliente;
    var data_img = response.img;
    var data_cabecera = [];
    console.log(data_cronograma);
    console.log(data_cliente);
    var fecha_venta = moment(data_cliente[0].fecha_venta).format('DD/MM/YYYY');
    var precio_lista_cli = Number(data_cliente[0].precio_lista);
    precio_lista_cli = precio_lista_cli.toFixed(2);
    precio_lista_cli = addCommas(precio_lista_cli);
    var inicial_cli = Number(data_cliente[0].inicial);
    inicial_cli = inicial_cli.toFixed(2);
    inicial_cli = addCommas(inicial_cli);
    var fonts = {
        Courier: {
            normal: 'Courier',
            bold: 'Courier-Bold',
            italics: 'Courier-Oblique',
            bolditalics: 'Courier-BoldOblique'
        },
        Helvetica: {
            normal: 'Helvetica',
            bold: 'Helvetica-Bold',
            italics: 'Helvetica-Oblique',
            bolditalics: 'Helvetica-BoldOblique'
        },
        Times: {
            normal: 'Times-Roman',
            bold: 'Times-Bold',
            italics: 'Times-Italic',
            bolditalics: 'Times-BoldItalic'
        },
        Symbol: {
            normal: 'Symbol'
        },
        ZapfDingbats: {
            normal: 'ZapfDingbats'
        }
    };
    var cabeceraTabla = [
        { fontSize: 8, text: "LETRAS", bold: true },
        { fontSize: 8, text: "VENCIMIENTO", bold: true },
        { fontSize: 8, text: "IMPORTE", bold: true },
        { fontSize: 8, text: "F.PAGO", bold: true },
        { fontSize: 8, text: "A CUENTA", bold: true },
        { fontSize: 8, text: "SALDO", bold: true },
        { fontSize: 8, text: "N° RECIBO", bold: true },
        { fontSize: 8, text: "COMPROMISO", bold: true },
    ];
    data_cabecera.push(cabeceraTabla);
    for (var i = 0; i < response.data_cronograma.length; i++) {
        var fecha = data_cronograma[i].fecha_vencimiento;
        fecha = moment(fecha).format('DD/MM/YYYY');
        var valor = Number(data_cronograma[i].valor_cuota);
        valor = valor.toFixed(2);
        valor = addCommas(valor);
        var cabeceraTabla = [
            { fontSize: 8, text: data_cronograma[i].nrocuota, margin: [0, 3, 0, 3], },
            { fontSize: 8, text: fecha, margin: [0, 3, 0, 3], },
            { fontSize: 8, text: data_cliente[0].simbolo + " " + valor, margin: [0, 3, 0, 3], },
            { fontSize: 8, text: "", margin: [0, 3, 0, 3], },
            { fontSize: 8, text: "", margin: [0, 3, 0, 3], },
            { fontSize: 8, text: "", margin: [0, 3, 0, 3], },
            { fontSize: 8, text: "", margin: [0, 3, 0, 3], },
            { fontSize: 8, text: "", margin: [0, 3, 0, 3], },
        ];
        data_cabecera.push(cabeceraTabla);
    }

    var docDefinition = {
        pageMargins: [30, 15, 30, 15],
        content: [
            // {
            //     columns: [
            //         {
            //             width: 'auto',
            //             // stack: [
            //             //     {
            //             //         image: response.img,
            //             //         fit: [120, 120]
            //             //     }
            //             // ]
            //         },
            //         // {text: response.title, style: 'header'}
            //     ]
            // },
            // {text: 'Fecha: ' + moment().format('DD [de] MMMM [de] YYYY, h:mm A'), style: 'subheader'},


            {
                style: 'tableExample',
                table: {
                    widths: [200, 50, 250],
                    body: [
                        [
                            [{
                                style: 'tableExample',

                                table: {
                                    body: [
                                        [{
                                            margin: [95, 20, 95, 20],
                                            fontSize: 8,
                                            text: "",
                                        },],
                                    ]
                                }
                            },
                            ],
                            [{


                            },

                            ],
                            [{
                                image: data_img,
                                width: 250,
                                height: 60,
                                alignment: 'center'
                            },
                            {
                                fontSize: 11,

                                text: "TAREJETA DE COBRANZA",
                                normal: 'Times-Roman',
                                bold: 'Times-Bold',
                                bolditalics: 'Times-BoldItalic',
                                alignment: 'center'
                            },
                            ],



                        ],
                    ]

                },
                layout: 'noBorders',
            },
            {
                style: 'tableExample',
                table: {
                    widths: [255, 255],
                    body: [
                        [
                            [
                                {
                                    fontSize: 9,
                                    text: "DATOS DEL CLIENTE/CONYUGUE",
                                    bold: true,
                                },

                            ],
                            [{

                                fontSize: 9,
                                text: "DATOS DEL FIADOR/ FIADORCONYUGUE",
                                bold: true,
                            },

                            ],



                        ],
                        [
                            [
                                {
                                    text: [
                                        {
                                            fontSize: 9,
                                            text: "DOCUMENTO: ",
                                            bold: true,
                                        },
                                        {
                                            fontSize: 9,
                                            text: data_cliente[0].documento_cliente,
                                        },
                                    ]

                                }

                            ],
                            [
                                {
                                    text: [
                                        {
                                            fontSize: 9,
                                            text: "DOCUMENTO: ",
                                            bold: true,
                                        },
                                        {
                                            fontSize: 9,
                                            text: data_cliente[0].documento_fiador,
                                        },
                                    ]

                                }

                            ],

                        ],
                        [
                            [

                                {
                                    text: [
                                        {
                                            fontSize: 9,
                                            text: "APELLIDOS: ",
                                            bold: true,
                                        },
                                        {
                                            fontSize: 9,
                                            text: data_cliente[0].Apellidos_cliente,
                                        },
                                    ]

                                }
                            ],
                            [
                                {
                                    text: [
                                        {
                                            fontSize: 9,
                                            text: "APELLIDOS: ",
                                            bold: true,
                                        },
                                        {
                                            fontSize: 9,
                                            text: data_cliente[0].Apellidos_fiador,
                                        },
                                    ]

                                }
                            ],

                        ],
                        [
                            [


                                {
                                    text: [
                                        {
                                            fontSize: 9,
                                            text: "NOMBRE(S): ",
                                            bold: true,
                                        },
                                        {
                                            fontSize: 9,
                                            text: data_cliente[0].nombres_cliente,
                                        },
                                    ]

                                },

                            ],
                            [

                                {
                                    text: [
                                        {
                                            fontSize: 9,
                                            text: "NOMBRE(S): ",
                                            bold: true,
                                        },
                                        {
                                            fontSize: 9,
                                            text: data_cliente[0].nombres_fiador,
                                        },
                                    ]

                                },

                            ],

                        ],
                        [
                            [
                                {
                                    text: [
                                        {
                                            fontSize: 9,
                                            text: "TELEFONO: ",
                                            bold: true,
                                        },
                                        {
                                            fontSize: 9,
                                            text: data_cliente[0].celular_cliente,
                                        },
                                    ]

                                },



                            ],
                            [
                                {
                                    text: [
                                        {
                                            fontSize: 9,
                                            text: "TELEFONO: ",
                                            bold: true,
                                        },
                                        {
                                            fontSize: 9,
                                            text: data_cliente[0].celular_fiador,
                                        },
                                    ]

                                },
                            ],

                        ],
                        [
                            [

                                {
                                    text: [
                                        {
                                            fontSize: 9,
                                            text: "DOCUMENTO: ",
                                            bold: true,
                                        },
                                        {
                                            fontSize: 9,
                                            text: data_cliente[0].documento_conyugue,
                                        },
                                    ]

                                },


                            ],
                            [{
                                text: [
                                    {
                                        fontSize: 9,
                                        text: "DOCUMENTO: ",
                                        bold: true,
                                    },
                                    {
                                        fontSize: 9,
                                        text: data_cliente[0].documento_fiadorconyugue,
                                    },
                                ]

                            },

                            ],

                        ],
                        [
                            [

                                {
                                    text: [
                                        {
                                            fontSize: 9,
                                            text: "APELLIDOS: ",
                                            bold: true,
                                        },
                                        {
                                            fontSize: 9,
                                            text: data_cliente[0].Apellidos_conyugue,
                                        },
                                    ]

                                },
                            ],
                            [{
                                text: [
                                    {
                                        fontSize: 9,
                                        text: "APELLIDOS: ",
                                        bold: true,
                                    },
                                    {
                                        fontSize: 9,
                                        text: data_cliente[0].Apellidos_fiadorconyugue,
                                    },
                                ]

                            },

                            ],

                        ],
                        [
                            [

                                {
                                    text: [
                                        {
                                            fontSize: 9,
                                            text: "NOMBRE(S): ",
                                            bold: true,
                                        },
                                        {
                                            fontSize: 9,
                                            text: data_cliente[0].nombres_conyugue,
                                        },
                                    ]

                                },

                            ],
                            [{
                                text: [
                                    {
                                        fontSize: 9,
                                        text: "NOMBRE(S): ",
                                        bold: true,
                                    },
                                    {
                                        fontSize: 9,
                                        text: data_cliente[0].nombres_fiadorconyugue,
                                    },
                                ]

                            },

                            ],

                        ],
                        [
                            [
                                {
                                    text: [
                                        {
                                            fontSize: 9,
                                            text: "TELEFONO(S): ",
                                            bold: true,
                                        },
                                        {
                                            fontSize: 9,
                                            text: data_cliente[0].celular_conyugue,
                                        },
                                    ]

                                },

                            ],
                            [{
                                text: [
                                    {
                                        fontSize: 9,
                                        text: "TELEFONO(S): ",
                                        bold: true,
                                    },
                                    {
                                        fontSize: 9,
                                        text: data_cliente[0].celular_fiadorconyugue,
                                    },
                                ]

                            },

                            ],

                        ],
                        [
                            [
                                {
                                    text: [
                                        {
                                            fontSize: 9,
                                            text: "DIRECCION  DE COBRANZA: ",
                                            bold: true,
                                        },
                                        {
                                            fontSize: 9,
                                            text: data_cliente[0].direccion_cliente,
                                        },
                                    ]

                                },


                            ],
                            [
                                {
                                    text: [
                                        {
                                            fontSize: 9,
                                            text: "TIPO DE VIVIENDA: ",
                                            bold: true,
                                        },
                                        {
                                            fontSize: 9,
                                            text: data_cliente[0].tipo_vivienda,
                                        },
                                    ]

                                },

                            ],

                        ],

                    ]

                },
                layout: 'noBorders',
            },
            {
                fontSize: 10,

                text: "DESCRIPCION DEL VEHÍCULO",
                normal: 'Times-Roman',
                bolditalics: 'Times-BoldItalic',
                alignment: 'center',
                bold: 'Times-Bold',
            },
            {
                style: 'tableExample',
                table: {
                    widths: [180, 160, 170],
                    body: [
                        [


                            {
                                text: [
                                    {
                                        fontSize: 9,
                                        text: "MODELO: ",
                                        bold: true,
                                    },
                                    {
                                        fontSize: 9,
                                        text: data_cliente[0].Modelo,
                                    },
                                ]

                            },


                            {
                                text: [
                                    {
                                        fontSize: 9,
                                        text: "COLOR: ",
                                        bold: true,
                                    },
                                    {
                                        fontSize: 9,
                                        text: data_cliente[0].Color,
                                    },
                                ]

                            },


                            {
                                text: [
                                    {
                                        fontSize: 9,
                                        text: "PLACA: ",
                                        bold: true,
                                    },
                                    {
                                        fontSize: 9,
                                        text: data_cliente[0].Placa,
                                    },
                                ]

                            },
                        ],
                        [

                            {
                                text: [
                                    {
                                        fontSize: 9,
                                        text: "MOTOR: ",
                                        bold: true,
                                    },
                                    {
                                        fontSize: 9,
                                        text: data_cliente[0].Motor,
                                    },
                                ]

                            },

                            {
                                colSpan: 2,
                                text: [
                                    {
                                        fontSize: 9,
                                        text: "N° DE CHASIS: ",
                                        bold: true,
                                    },
                                    {
                                        fontSize: 9,
                                        text: data_cliente[0].Chasis,
                                    },
                                ]
                            },

                            {},
                        ],

                    ]

                },
                layout: 'noBorders',
            },
            {
                fontSize: 10,

                text: "DATOS DE LA VENTA",
                normal: 'Times-Roman',
                bolditalics: 'Times-BoldItalic',
                alignment: 'center',
                bold: 'Times-Bold',
            },
            {
                style: 'tableExample',
                layout: 'noBorders',
                table: {
                    widths: [255, 255],
                    body: [
                        [

                            {
                                text: [
                                    {
                                        fontSize: 9,
                                        text: "PRECIO DE LA LISTA S/: ",
                                        bold: true,
                                    },
                                    {
                                        fontSize: 9,
                                        text: precio_lista_cli,
                                    },
                                ]

                            },
                            {
                                text: [
                                    {
                                        fontSize: 9,
                                        text: "INICIAL: ",
                                        bold: true,
                                    },
                                    {
                                        fontSize: 9,
                                        text: inicial_cli,
                                    },
                                ]

                            },


                        ],
                        [

                            {
                                text: [
                                    {
                                        fontSize: 9,
                                        text: "FECHA DE VENTA: ",
                                        bold: true,
                                    },
                                    {
                                        fontSize: 9,
                                        text: fecha_venta,
                                    },
                                ]

                            },

                            {
                                text: [
                                    {
                                        fontSize: 9,
                                        text: "VENDEDOR: ",
                                        bold: true,
                                    },
                                    {
                                        fontSize: 9,
                                        text: data_cliente[0].vendedor,
                                    },
                                ]

                            },
                        ],
                        [


                            {
                                text: [
                                    {
                                        fontSize: 9,
                                        text: "COBRADOR: ",
                                        bold: true,
                                    },
                                    {
                                        fontSize: 9,
                                        text: data_cliente[0].cobrador,
                                    },
                                ]

                            },

                            {
                                fontSize: 9,
                                text: "",

                            },
                        ],

                    ]

                },
            },
            {
                fontSize: 10,

                text: "CRONOGRAMA DE PAGO",
                normal: 'Times-Roman',
                bolditalics: 'Times-BoldItalic',
                alignment: 'center',
                bold: 'Times-Bold',
            },
            {
                style: 'tableExample',
                margin: [0, 5, 0, 0],
                table: {
                    heights: 300,
                    widths: [30, 60, 40, 40, 40, 40, 40, 169],
                    body: data_cabecera,

                },
            },

            {
                style: 'tableExample',
                layout: 'noBorders',
                margin: [0, 5, 0, 5],
                table: {
                    widths: [255, 255],
                    body: [
                        [

                            [

                                {
                                    style: 'tableExample',

                                    table: {
                                        body: [
                                            [{
                                                margin: [15, 10, 15, 10],
                                                fontSize: 8,
                                                text: "",
                                            },
                                            {
                                                margin: [3, 3, 3, 3],
                                                fontSize: 8,
                                                text: "",
                                                border: [false, false, false, false],
                                            },
                                            {
                                                margin: [15, 10, 15, 10],
                                                fontSize: 8,
                                                text: "",
                                            },
                                            {
                                                margin: [3, 3, 3, 3],
                                                fontSize: 8,
                                                text: "",
                                                border: [false, false, false, false],
                                            },
                                            {
                                                margin: [15, 10, 15, 10],
                                                fontSize: 8,
                                                text: "",
                                            },],
                                            [
                                                {
                                                    margin: [3, 3, 3, 3],
                                                    fontSize: 8,
                                                    text: "",
                                                    border: [false, false, false, false],
                                                },
                                                {
                                                    margin: [3, 3, 3, 3],
                                                    fontSize: 8,
                                                    text: "",
                                                    border: [false, false, false, false],
                                                },
                                                {
                                                    margin: [3, 3, 3, 3],
                                                    fontSize: 8,
                                                    text: "",
                                                    border: [false, false, false, false],
                                                },
                                                {
                                                    margin: [3, 3, 3, 3],
                                                    fontSize: 8,
                                                    text: "",
                                                    border: [false, false, false, false],
                                                },
                                                {
                                                    margin: [3, 3, 3, 3],
                                                    fontSize: 8,
                                                    text: "",
                                                    border: [false, false, false, false],
                                                },
                                            ],
                                            [{
                                                margin: [15, 10, 15, 10],
                                                fontSize: 8,
                                                text: "",
                                            },
                                            {
                                                margin: [3, 3, 3, 3],
                                                fontSize: 8,
                                                text: "",
                                                border: [false, false, false, false],
                                            },
                                            {
                                                margin: [15, 10, 15, 10],
                                                fontSize: 8,
                                                text: "",
                                            },
                                            {
                                                margin: [3, 3, 3, 3],
                                                fontSize: 8,
                                                text: "",
                                                border: [false, false, false, false],
                                            },
                                            {
                                                margin: [15, 10, 15, 10],
                                                fontSize: 8,
                                                text: "",
                                            },],
                                            [
                                                {
                                                    margin: [3, 3, 3, 3],
                                                    fontSize: 8,
                                                    text: "",
                                                    border: [false, false, false, false],
                                                },
                                                {
                                                    margin: [3, 3, 3, 3],
                                                    fontSize: 8,
                                                    text: "",
                                                    border: [false, false, false, false],
                                                },
                                                {
                                                    margin: [3, 3, 3, 3],
                                                    fontSize: 8,
                                                    text: "",
                                                    border: [false, false, false, false],
                                                },
                                                {
                                                    margin: [3, 3, 3, 3],
                                                    fontSize: 8,
                                                    text: "",
                                                    border: [false, false, false, false],
                                                },
                                                {
                                                    margin: [3, 3, 3, 3],
                                                    fontSize: 8,
                                                    text: "",
                                                    border: [false, false, false, false],
                                                },
                                            ],
                                            [{
                                                margin: [15, 10, 15, 10],
                                                fontSize: 8,
                                                text: "",
                                            },
                                            {
                                                margin: [3, 3, 3, 3],
                                                fontSize: 8,
                                                text: "",
                                                border: [false, false, false, false],
                                            },
                                            {
                                                margin: [15, 10, 15, 10],
                                                fontSize: 8,
                                                text: "",
                                            },
                                            {
                                                margin: [3, 3, 3, 3],
                                                fontSize: 8,
                                                text: "",
                                                border: [false, false, false, false],
                                            },
                                            {
                                                margin: [15, 10, 15, 10],
                                                fontSize: 8,
                                                text: "",
                                            },],

                                        ]
                                    }
                                },
                            ],
                            [
                                [
                                    {
                                        text: [
                                            {
                                                fontSize: 9,
                                                text: "REFERENCIA: ",
                                                bold: true,
                                            },
                                            {
                                                fontSize: 9,
                                                text: data_cliente[0].cReferencia,
                                            },
                                        ]

                                    },

                                ],
                            ]

                        ],
                    ]

                },
            },



        ],
        // styles: {
        //     footer: {
        //         fontSize: 9,
        //         margin: [0, 10, 40, 0],
        //         alignment: 'right'
        //     }
        // },
        // footer: function (currentPage, pageCount) {
        //     return {
        //         columns: [{
        //             text: 'Página ' + currentPage.toString() + ' de ' + pageCount,
        //             style: 'footer'
        //         }]
        //     }
        // }
    };

    var win = window.open('', '_blank');
    pdfMake.createPdf(docDefinition).print({}, win);

}
function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}
var mensajes_validador = function (data) {
    var div_mensaje = $(".mensajes_validador");

    if (data != '') {
        var mensaje = '<div class="alert alert-block alert-danger"><button type="button" class="close" data-dismiss="alert"><i class="fa fa-times"></i></button>';
        for (var property in data) {
            mensaje += '- ' + data[property] + '<br/>';
        }
        mensaje += '</div>';
        div_mensaje.html(mensaje);
    }
};

function tooltipMobile(item) {
    console.log(item);
    if (!show_list_) {
        console.log(!show_list_);
        $(item).on('click', '', function (e) {
            $(this).mouseleave();
            e.stopPropagation();
        });
    }
}
function getFormSearchReporteRepuestos(form_id, input_id, btn_id) {
    return '<form class="form-horizontal" id="' + form_id + '" style="margin-bottom:-3px">' +
        // '<div class="form-group">'+
        //     '<div class="col-md-2">'+
        //         '<select id="filtro_tienda"  style="margin-right:5px;width: 100%" name="filtro_tienda" class="form-control input-sm " placeholder="Oficina"></select>'+
        //     '</div>'+

        //     '<div class="col-md-2">' +
        //         '<button  type="button"  id="btn_exportar_dd" class="btn-danger-admin  btn-sm">' +
        //                 '<i class="fa fa-plus">Asignar Cobrador</i>' +
        //         '</button>' +
        //     '</div>'+           
        // '</div>'+
        '<div class="form-group">' +
        '<div class="col-md-2  ">' +
        '<select id="filtro_tienda"  style="margin-right:5px;width: 100%" name="filtro_tienda" class="form-control input-sm " placeholder="Oficina"></select>' +
        '</div>' +
        '<label class="col-sm-2 control-label">Fecha Inicio</label>' +
        '<div class="col-md-3">' +
        '<input type="date" class="form-control input-sm"  id="FechaInicioFiltro">' +
        '</div>' +
        '<label class="col-sm-2 control-label">Fecha Fin</label>' +
        '<div class="col-md-3">' +
        '<input type="date" class="form-control input-sm"  id="FechaFinFiltro">' +
        '</div>' +

        '</div>' +
        '<div class="form-group">' +
        '<div class="col-md-6 ">' +
        '<select id="idClienteFiltro"  style="margin-right:5px;width: 100%" name="idClienteFiltro" class="form-control input-sm "></select>' +
        '</div>' +
        '<div class="col-md-6">' +
        '<select id="idVendedorFiltro"  style="margin-right:5px;width: 100%" name="idVendedorFiltro" class="form-control input-sm "></select>' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<div class="col-md-1 col-md-offset-7">' +
        '<button  type="submit" id="' + btn_id + '" class="btn-danger-admin btn-sm">' +
        '<i class="fa fa-search"></i>' +
        '</button>' +
        '</div>' +
        '<div class="col-md-2">' +
        '<button  type="button"  id="btn_expExcel" class="btn-primary btn-sm">' +
        '<i class="fa fa-file-excel-o">Exportar Excel</i>' +
        '</button>' +
        '</div>' +
        '<div class="col-md-2">' +
        '<button  type="button"  id="btn_expPDF" class="btn-success  btn-sm">' +
        '<i class="fa fa-file-pdf-o">Exportar Pdf</i>' +
        '</button>' +
        '</div>' +
        '</div>' +
        '</form>';
}
function getFormSearchReporteOrdenesDiario(form_id, input_id, btn_id) {
    return '<form class="form-horizontal" id="' + form_id + '" style="margin-bottom:-3px">' +
        // '<div class="form-group">'+
        //     '<div class="col-md-2">'+
        //         '<select id="filtro_tienda"  style="margin-right:5px;width: 100%" name="filtro_tienda" class="form-control input-sm " placeholder="Oficina"></select>'+
        //     '</div>'+

        //     '<div class="col-md-2">' +
        //         '<button  type="button"  id="btn_exportar_dd" class="btn-danger-admin  btn-sm">' +
        //                 '<i class="fa fa-plus">Asignar Cobrador</i>' +
        //         '</button>' +
        //     '</div>'+           
        // '</div>'+
        '<div class="form-group">' +
        '<label class="col-sm-2 col-md-offset-2  control-label">Fecha Inicio</label>' +
        '<div class="col-md-3">' +
        '<input type="date" class="form-control input-sm"  id="FechaInicioFiltro">' +
        '</div>' +
        '<label class="col-sm-2 control-label">Fecha Fin</label>' +
        '<div class="col-md-3">' +
        '<input type="date" class="form-control input-sm"  id="FechaFinFiltro">' +
        '</div>' +

        '</div>' +
        '<div class="form-group">' +
        '<div class="col-md-4 col-md-offset-4">' +
        '<select id="idMarca"  style="margin-right:5px;width: 100%" name="idMarca" class="form-control input-sm "></select>' +
        '</div>' +
        '<div class="col-md-4">' +
        '<select id="idtipoveh"  style="margin-right:5px;width: 100%" name="idtipoveh" class="form-control input-sm "></select>' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<div class="col-md-1 col-md-offset-9">' +
        '<button  type="submit" id="' + btn_id + '" class="btn-danger-admin btn-sm">' +
        '<i class="fa fa-search"></i>' +
        '</button>' +
        '</div>' +
        '<div class="col-md-2">' +
        '<button  type="button"  id="btn_expExcel" class="btn-primary btn-sm">' +
        '<i class="fa fa-file-excel-o">Exportar Excel</i>' +
        '</button>' +
        '</div>' +
        '</div>' +
        '</form>';
}
function getFormSearchReporteVenta(form_id, input_id, btn_id) {
    return '<form class="form-horizontal" id="' + form_id + '" style="margin-bottom:-3px">' +
        // '<div class="form-group">'+
        //     '<div class="col-md-2">'+
        //         '<select id="filtro_tienda"  style="margin-right:5px;width: 100%" name="filtro_tienda" class="form-control input-sm " placeholder="Oficina"></select>'+
        //     '</div>'+

        //     '<div class="col-md-2">' +
        //         '<button  type="button"  id="btn_exportar_dd" class="btn-danger-admin  btn-sm">' +
        //                 '<i class="fa fa-plus">Asignar Cobrador</i>' +
        //         '</button>' +
        //     '</div>'+           
        // '</div>'+
        '<div class="form-group">' +
        '<div class="col-md-2  ">' +
        '<select id="filtro_tienda"  style="margin-right:5px;width: 100%" name="filtro_tienda" class="form-control input-sm " placeholder="Oficina"></select>' +
        '</div>' +
        '<label class="col-sm-2 control-label">Fecha Inicio</label>' +
        '<div class="col-md-3">' +
        '<input type="date" class="form-control input-sm"  id="FechaInicioFiltro">' +
        '</div>' +
        '<label class="col-sm-2 control-label">Fecha Fin</label>' +
        '<div class="col-md-3">' +
        '<input type="date" class="form-control input-sm"  id="FechaFinFiltro">' +
        '</div>' +

        '</div>' +
        '<div class="form-group">' +
        '<div class="col-md-6 ">' +
        '<select id="idClienteFiltro"  style="margin-right:5px;width: 100%" name="idClienteFiltro" class="form-control input-sm "></select>' +
        '</div>' +
        '<div class="col-md-6">' +
        '<select id="idVendedorFiltro"  style="margin-right:5px;width: 100%" name="idVendedorFiltro" class="form-control input-sm "></select>' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<div class="col-md-3 ">' +
        '<select id="idTipoSolicitud"  style="margin-right:5px;width: 100%" name="idTipoSolicitud" class="form-control input-sm "><option value="">Tipo Solicitud</option><option value="1">CONTADO</option><option value="2">CRÉDITO DIRECTO</option><option value="3">CRÉDITO FINANCIERO</option><option value="4">CRÉDITO</option></select>' +
        '</div>' +
        '<div class="col-md-3">' +
        '<select id="idConvenio"  style="margin-right:5px;width: 100%" name="idConvenio" class="form-control input-sm "><option value="">Convenio</option></select>' +
        '</div>' +
        '<div class="col-md-3">' +
        '<select id="idcategoria"  style="margin-right:5px;width: 100%" name="idcategoria" class="form-control input-sm "></select>' +
        '</div>' +
        '<div class="col-md-1">' +
        '<button  type="submit" id="' + btn_id + '" class="btn-danger-admin btn-sm">' +
        '<i class="fa fa-search"></i>' +
        '</button>' +
        '</div>' +
        '<div class="col-md-2">' +
        '<button  type="button"  id="btn_expExcel" class="btn-primary btn-sm">' +
        '<i class="fa fa-file-excel-o">Exportar Excel</i>' +
        '</button>' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        
        
        '<div class="col-md-2 col-md-offset-10">' +
        '<button  type="button"  id="btn_expPDF" class="btn-success  btn-sm">' +
        '<i class="fa fa-file-pdf-o">Exportar Pdf</i>' +
        '</button>' +
        '</div>' +
        '</div>' +
        '</form>';
}

function getFormSearchReporteComisiones(form_id, input_id, btn_id) {
    return '<form class="form-horizontal" id="' + form_id + '" style="margin-bottom:-3px">' +
       
        '<div class="form-group">' +
  
        '<label class="col-sm-2 control-label">Fecha Inicio</label>' +
        '<div class="col-md-3">' +
        '<input type="date" class="form-control input-sm"  id="FechaInicioFiltro">' +
        '</div>' +
        '<label class="col-sm-2 control-label">Fecha Fin</label>' +
        '<div class="col-md-3">' +
        '<input type="date" class="form-control input-sm"  id="FechaFinFiltro">' +
        '</div>' +

        '</div>' +
        '<div class="form-group">' +
        '<div class="col-md-6 ">' +
        '<select id="idClienteFiltro"  style="margin-right:5px;width: 100%" name="idClienteFiltro" class="form-control input-sm "></select>' +
        '</div>' +
        '<div class="col-md-5" style="padding-right: 0;">' +
        '<select id="idVendedorFiltro"  style="margin-right:5px;width: 100%" name="idVendedorFiltro" class="form-control input-sm "></select>' +
        '</div>' +
        '<div class="col-md-1" style="padding-left: 0;">' +
        '<button  type="submit" id="' + btn_id + '" class="btn-danger-admin btn-sm">' +
        '<i class="fa fa-search"></i>' +
        '</button>' +
        '</div>' +
        '</div>' +
   
        '<div class="form-group">' +
        
        '<div class="col-md-2 col-md-offset-10">' +
        '<button  type="button"  id="btn_expExcel" class="btn-primary btn-sm">' +
        '<i class="fa fa-file-excel-o">Exportar Excel</i>' +
        '</button>' +
        '</div>' +
        // '<div class="col-md-2">' +
        // '<button  type="button"  id="btn_expPDF" class="btn-success  btn-sm">' +
        // '<i class="fa fa-file-pdf-o">Exportar Pdf</i>' +
        // '</button>' +
        // '</div>' +
        '</div>' +
        '</form>';
}
function getFormSearchSolicitudCompra(form_id, input_id, btn_id) {
    return '<form class="form-horizontal" id="' + form_id + '" style="margin-bottom:-3px">' +
        // '<div class="form-group">'+
        //     '<div class="col-md-2">'+
        //         '<select id="filtro_tienda"  style="margin-right:5px;width: 100%" name="filtro_tienda" class="form-control input-sm " placeholder="Oficina"></select>'+
        //     '</div>'+

        //     '<div class="col-md-2">' +
        //         '<button  type="button"  id="btn_exportar_dd" class="btn-danger-admin  btn-sm">' +
        //                 '<i class="fa fa-plus">Asignar Cobrador</i>' +
        //         '</button>' +
        //     '</div>'+           
        // '</div>'+
        '<div class="form-group">' +
        '<label class="col-sm-2 control-label">Consecutivo</label>' +
        '<div class="col-md-2">' +
        '<input type="text" class="form-control input-sm"  id="consecutivo">' +
        '</div>' +
        '<label class="col-sm-3 control-label">Fecha Registro</label>' +
        '<div class="col-md-4">' +
        '<input type="date" class="form-control input-sm"  id="FechaRegistro">' +
        '</div>' +
        '<div class="col-md-1">' +
        '<button  type="submit" id="' + btn_id + '" class="btn-danger-admin btn-sm">' +
        '<i class="fa fa-search"></i>' +
        '</button>' +
        '</div>' +
        '</div>' +
        '</form>';
}
var limpiar_validaciones = function () {
    $(".mensajes_validador").html('');
};

function cleanRequired() {
    $(".modal-backdrop").remove();
    cleanBorderRequired();
}

function cleanBorderRequired() {
    $('.border-red').removeClass('border-red');
}

// var unloaded = false;
//  $(window).on('beforeunload', unload);
//  $(window).on('unload', unload);
// function unload() {
//     if (!unloaded) {
//         $('body').css('cursor', 'wait');
//         $.ajax({
//             type: 'get',
//             async: false,
//             url: base_url + '/logout',
//             success: function () {
//                 unloaded = true;
//                 $('body').css('cursor', 'default');
//             },
//             timeout: 5000
//         });
//     }
// }
//     function pedirVoto(){
//      if(!pedirVoto){
//        alert();
//      }else{
//          alert('u');
//      }
//     }


$(function () {

    //validar vacios
    $.fn.required = function () {
        if ($(this).val() === '' || $(this).val() === null) {
            $(this).addClass('border-red').focus();
            return false;
        } else {
            $(this).removeClass('border-red');
            return true;
        }
    };
    //validar email
    $.fn.email = function () {
        var filter = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
        if ($.trim($(this).val()) != '' && filter.test($(this).val())) {
            return true;
        } else {
            $(this).focus();
            return false;
        }
    };
    $.fn.modal.Constructor.DEFAULTS.backdrop = 'static';
});

function callCHK() {
    $('.i-chk').iCheck({
        checkboxClass: 'icheckbox_square-green'
        // labelHover: false
    }).on('ifChanged', function (event) {
        $(event.target).click();
    });
}

function generateListMatrix(table_id, matrix, callback) {
    table_id = $('#' + table_id);
    // table_id.empty();
    // var td_ = '<td width="10px"><label class="checkbox-inline i-checks"><input type="checkbox" class="chk_sp"></label></td>';
    // $.each(matrix, function (idx, item) {
    //     table_id.append('<tr>'+td_+'<td colspan="4">'+item.text+'</td></tr>');
    //     $.each(item.nodes, function (idx2, item2) {
    //         table_id.append('<tr><td></td>'+td_+'<td colspan="3">'+item2.text+'</td></tr>');
    //     });
    // });
    table_id.treeview({
        levels: 1,
        data: matrix,
        // showIcon: false,
        showCheckbox: true,
        highlightSelected: false
    }).css({
        'min-height': '350px',
        'max-height': '350px',
        'border': 'none'
    });
    if (typeof callback == "function") {
        callback();
    }
}

function generateListMatrix_(table_id, matrix) {
    table_id.treeview({
        levels: 1,
        data: matrix,
        highlightSelected: false
    });
}

//validar solo letras
var soloLetras = function (e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
    especiales = [8, 9, 37, 39, 46];
    tecla_especial = false
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }
    if (letras.indexOf(tecla) == -1 && !tecla_especial)
        return false;
};

//validar solo numeros
function soloNumeros(evt) {
    evt = (evt) ? evt : event; //Validar la existencia del objeto event
    var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : 0)); //Extraer el codigo del caracter de uno de los diferentes grupos de codigos
    var respuesta = true; //Predefinir como valido
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        respuesta = false;
    }
    return respuesta;
}

//validar numero telefonico
function numeroTelefonico(evt) {
    evt = (evt) ? evt : event; //Validar la existencia del objeto event
    var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : 0));
    var respuesta = true; //Predefinir como valido
    if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode != 42 && charCode != 35 && charCode != 32 && charCode != 40 && charCode != 41 && charCode != 45)) {
        respuesta = false;
    }
    return respuesta;
}

function onlyNumeric(evt, control) {
    var pattern = /^\d{0,4}(\.\d{0,3})?$/i;
    if (pattern.test(control.value)) {
        console.log("Vadid number:" + control.value);
        return true;
    } else {
        console.log("Invadid number:" + control.value);
        return false;
    }
}

function validDecimals(evt, control, decimals) {
    var texto = control.value;
    var punto = texto.indexOf('.');

    if (evt.keyCode <= 13 || (evt.keyCode >= 48 && evt.keyCode <= 57)) {
        if ((punto != -1) && (texto.length - (punto + 1)) >= decimals) {
            return false;
        }
    }
    else if (evt.keyCode == 46 && texto.length >= 1) {
        if (punto != -1 && texto.indexOf('.', punto) != -1) {
            return false;
        }
    } else {
        return false;
    }
    return true;
}

function roundValue(value, decimals) {
    return (parseFloat(value)).toFixed(decimals)
}

function roundMath(val, decimals) {
    decimals = typeof decimals !== 'undefined' ? decimals : 2;
    decimals = Math.pow(10, decimals);
    return Math.round(parseFloat(val) * decimals) / decimals;
}

function numberFormat(value, decimals, dec_point, thousands_sep) {
    if (value === '') {
        return '';
    }
    value = parseFloat(value);
    dec_point = typeof dec_point !== 'undefined' ? dec_point : '.';
    thousands_sep = typeof thousands_sep !== 'undefined' ? thousands_sep : ',';

    var parts = value.toFixed(decimals).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_sep);

    return parts.join(dec_point);
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function roundDecimals(control, decimals) {
    control = $(control);
    if (control.val() !== '') {
        var val_ = parseFloat(control.val());
        control.val(val_.toFixed(decimals));
    }
}

jQuery(function ($) {
    $.datepicker.regional['es'] = {
        closeText: 'Cerrar',
        prevText: '',
        nextText: '',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
            'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Mi&eacute;rcoles', 'Jueves', 'Viernes', 'S&aacute;bado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mi&eacute;', 'Juv', 'Vie', 'S&aacute;b'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'S&aacute;'],
        weekHeader: 'Sm',
        dateFormat: 'yy-mm-dd',
        //firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: '',
        changeMonth: true,
        changeYear: true,
        //defaultDate: '1990-01-01'
    };
    $.datepicker.setDefaults($.datepicker.regional['es']);
});

var ajaxGet = function (url, param, before, callback, error) {
    $.ajax({
        data: param,
        url: base_url + url,
        type: 'get',
        dataType: 'json',
        beforeSend: function () {
            if (typeof before === "function") {
                before();
            }
        },
        success: function (data) {
            if (typeof callback === "function") {
                callback(data);
            }
        },
        error: function () {
            if (typeof error === "function") {
                error();
            }
        }
    });
};

var ajaxPost = function (url, param, before, callback, error) {
    $.ajax({
        data: param,
        url: base_url + url,
        type: 'post',
        dataType: 'json',
        beforeSend: function () {
            if (typeof before === "function") {
                before();
            }
        },
        success: function (data) {
            if (typeof callback === "function") {
                callback(data);
            }
        },
        error: function () {
            if (typeof error === "function") {
                error();
            }
        }
    });
};

function changeTheme(theme) {
    ajaxPost('admin/changeTheme', 'theme=' + theme);
}
function changeHeaderStyling(style) {
    ajaxPost('admin/changeHeaderStyling', 'style=' + style);
}
function changeContentStyling(style) {
    ajaxPost('admin/changeContentStyling', 'style=' + style);
}
function changeSidebarGradient(style) {
    ajaxPost('admin/changeSidebarGradient', 'style=' + style);
}
function changeSidebarStyling(style) {
    ajaxPost('admin/changeSidebarStyling', 'style=' + style);
}

function activeTab(tab) {
    $('.nav-tabs a[data-target="#' + tab + '"]').tab('show');
}

function getTextWidth(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}

function getFormSearch(form_id, input_id, btn_id) {
    return '<form class="form-inline" id="' + form_id + '" style="margin-bottom:-3px">' +
        '<div class="input-group input-group-sm">' +
        '<input type="text" id="' + input_id + '" name="search" class="form-control" autocomplete="off" placeholder="Buscar..." />' +
        '<span class="input-group-btn">' +
        '<button type="submit" id="' + btn_id + '" class="btn btn-danger-admin">' +
        '<i class="fa fa-search"></i>' +
        '</button>' +
        '</span>' +
        '</div>' +
        '</form>';
}
function getFormSearchcomproMov(form_id, input_id, btn_id) {
    return '<form class="form-inline" id="' + form_id + '" style="margin-bottom:-3px">' +
        '<input type="hidden" id="' + input_id + '" name="search" class="form-control" autocomplete="off" placeholder="Buscar..." />' +
        '<input type="hidden" id="' + btn_id + '" name="search" class="form-control" autocomplete="off" placeholder="Buscar..." />' +
        '</form>';
}
// function getFormSearchAsigApro(form_id, input_id, btn_id) {
//     return '<form class="form-inline" id="' + form_id + '" style="margin-bottom:-3px">' +
//         '<div class="input-group input-group-sm">' +
//         '<input type="text" id="' + input_id + '" name="search_c" class="form-control" autocomplete="off" placeholder="Buscar..." />' +
//         '<span class="input-group-btn">' +
//         '<button type="submit" id="' + btn_id + '" class="btn btn-danger-admin">' +
//         '<i class="fa fa-search"></i>' +
//         '</button>' +
//         '</span>' +
//         '</div>' +
//         '</form>';
// }
function getFormSearchAsigApro(form_id, input_id, btn_id) {
    return '<form class="form-inline" id="' + form_id + '" style="margin-bottom:-3px">' +
        '<div class="input-group input-group-sm">' +
        '<input type="hidden" id="' + input_id + '" name="search" class="form-control" autocomplete="off" placeholder="Buscar..." />' +
        '<input type="hidden" id="' + btn_id + '" name="search" class="form-control" autocomplete="off" placeholder="Buscar..." />' +
        '</div>' +
        '</form>';
}



function getFormSearchReporteCreditosAprobados(form_id, input_id, btn_id) {
    return '<form class="form-horizontal" id="' + form_id + '" style="margin-bottom:-3px">' +
        // '<div class="form-group">'+
        //     '<div class="col-md-2">'+
        //         '<select id="filtro_tienda"  style="margin-right:5px;width: 100%" name="filtro_tienda" class="form-control input-sm " placeholder="Oficina"></select>'+
        //     '</div>'+

        //     '<div class="col-md-2">' +
        //         '<button  type="button"  id="btn_exportar_dd" class="btn-danger-admin  btn-sm">' +
        //                 '<i class="fa fa-plus">Asignar Cobrador</i>' +
        //         '</button>' +
        //     '</div>'+           
        // '</div>'+
        '<div class="form-group">' +
        '<div class="col-md-2  ">' +
        '<select id="filtro_tienda"  style="margin-right:5px;width: 100%" name="filtro_tienda" class="form-control input-sm " placeholder="Oficina"></select>' +
        '</div>' +
        '<label class="col-sm-2 control-label">Fecha Inicio</label>' +
        '<div class="col-md-3">' +
        '<input type="date" class="form-control input-sm"  id="FechaInicioFiltro">' +
        '</div>' +
        '<label class="col-sm-2 control-label">Fecha Fin</label>' +
        '<div class="col-md-3">' +
        '<input type="date" class="form-control input-sm"  id="FechaFinFiltro">' +
        '</div>' +

        '</div>' +
        '<div class="form-group">' +
        '<div class="col-md-6 ">' +
        '<select id="idClienteFiltro"  style="margin-right:5px;width: 100%" name="idClienteFiltro" class="form-control input-sm "></select>' +
        '</div>' +
        '<div class="col-md-6">' +
        '<select id="idVendedorFiltro"  style="margin-right:5px;width: 100%" name="idVendedorFiltro" class="form-control input-sm "></select>' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<div class="col-md-3 ">' +
        '<select id="idTipoSolicitud"  style="margin-right:5px;width: 100%" name="idTipoSolicitud" class="form-control input-sm "><option value="">Tipo Solicitud</option><option value="1">CONTADO</option><option value="2">CRÉDITO DIRECTO</option><option value="3">CRÉDITO FINANCIERO</option><option value="4">CRÉDITO</option></select>' +
        '</div>' +
        '<div class="col-md-3">' +
        '<select id="idConvenio"  style="margin-right:5px;width: 100%" name="idConvenio" class="form-control input-sm "><option value="">Convenio</option></select>' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<div class="col-md-1 col-md-offset-7">' +
        '<button  type="submit" id="' + btn_id + '" class="btn-danger-admin btn-sm">' +
        '<i class="fa fa-search"></i>' +
        '</button>' +
        '</div>' +
        '<div class="col-md-2">' +
        '<button  type="button"  id="btn_expExcel" class="btn-primary btn-sm">' +
        '<i class="fa fa-file-excel-o">Exportar Excel</i>' +
        '</button>' +
        '</div>' +
        '<div class="col-md-2">' +
        '<button  type="button"  id="btn_expPDF" class="btn-success  btn-sm">' +
        '<i class="fa fa-file-pdf-o">Exportar Pdf</i>' +
        '</button>' +
        '</div>' +
        '</div>' +

        '</form>';
}
function getFormSearchAsignacion(form_id, input_id, btn_id) {
    return '<form class="form-horizontal" id="' + form_id + '" style="margin-bottom:-3px">' +
        '<div class="form-group">' +
        '<div class="col-md-2">' +
        '<select id="filtro_tienda"  style="margin-right:5px;width: 100%" name="filtro_tienda" class="form-control input-sm " placeholder="Oficina"></select>' +
        '</div>' +
        '<label class="col-sm-3 control-label">Rango de días vencidos</label>' +
        '<div class="col-md-2">' +
        '<input type="number" class="form-control input-sm"  id="idInicio">' +
        '</div>' +
        '<div class="col-md-2">' +
        '<input type="number" class="form-control input-sm"  id="idFin">' +
        '</div>' +
        '<div class="col-md-1">' +
        '<button  type="submit" id="' + btn_id + '" class="btn-danger-admin btn-sm">' +
        '<i class="fa fa-search"></i>' +
        '</button>' +
        '</div>' +
        '<div class="col-md-2">' +
        '<button  type="button"  id="btn_exportar_dd" class="btn-danger-admin  btn-sm">' +
        '<i class="fa fa-plus">Asignar Cobrador</i>' +
        '</button>' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<label class="col-sm-2 control-label">Fecha Inicio Venc.</label>' +
        '<div class="col-md-3">' +
        '<input type="date" class="form-control input-sm"  id="FechaInicioFiltro">' +
        '</div>' +
        '<label class="col-sm-2 control-label">Fecha Fin Venc.</label>' +
        '<div class="col-md-3">' +
        '<input type="date" class="form-control input-sm"  id="FechaFinFiltro">' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +

        '<div class="col-md-5">' +
        '<select id="idClienteFiltro"  style="margin-right:5px;width: 100%" name="idClienteFiltro" class="form-control input-sm "></select>' +
        '</div>' +

        '<div class="col-md-5">' +
        '<select id="idCobradorFiltro"  style="margin-right:5px;width: 100%" name="idCobradorFiltro" class="form-control input-sm "></select>' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +

        '<div class="col-md-5">' +
        '<select id="Departamento"  style="margin-right:5px;width: 100%" name="idClienteFiltro" class="form-control input-sm "><option value="">Departemento</option></select>' +
        '</div>' +

        '<div class="col-md-5">' +
        '<select id="provincia"   style="margin-right:5px;width: 100%" name="idCobradorFiltro" class="form-control input-sm "><option value="">Provincia</option></select>' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +

        '<div class="col-md-5">' +
        '<select  id="distrito"  style="margin-right:5px;width: 100%" name="idClienteFiltro" class="form-control input-sm "><option value="">Distrito</option></select>' +
        '</div>' +

        '<div class="col-md-5">' +
        '<select id="idsector"  style="margin-right:5px;width: 100%" name="idCobradorFiltro" class="form-control input-sm "><option value="">Sector</option></select>' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<label class="col-sm-1 control-label">Todos</label>' +
        '<div class="col-sm-1">' +
        '<label class="checkbox-inline i-checks">' +
        '<input type="checkbox" id="p_state_total" >' +
        '</label>' +
        '</div>' +
        '</div>' +
        '</form>';
}
function getFormSearchCuentasxcobrar(form_id, input_id, btn_id) {
    return '<form class="form-horizontal" id="' + form_id + '" style="margin-bottom:-3px">' +
        '<div class="form-group">' +
        '<div class="col-md-2">' +
        '<select id="filtro_tienda"  style="margin-right:5px;width: 100%" name="filtro_tienda" class="form-control input-sm " placeholder="Oficina"></select>' +
        '</div>' +
        '<label class="col-sm-3 control-label">Rango de días vencidos</label>' +
        '<div class="col-md-2">' +
        '<input type="number" class="form-control input-sm"  id="idInicio">' +
        '</div>' +
        '<div class="col-md-2">' +
        '<input type="number" class="form-control input-sm"  id="idFin">' +
        '</div>' +
        '<div class="col-md-1">' +
        '<button  type="submit" id="' + btn_id + '" class="btn-danger-admin btn-sm">' +
        '<i class="fa fa-search"></i>' +
        '</button>' +
        '</div>' +
        '<div class="col-md-2">' +
        '<button  type="button"  id="btn_exportar_CC" class="btn-success  btn-sm">' +
        '<i class="fa fa-file-pdf-o">Exportar a Pdf</i>' +
        '</button>' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<label class="col-sm-2 control-label">Fecha Inicio Venc.</label>' +
        '<div class="col-md-3">' +
        '<input type="date" class="form-control input-sm"  id="FechaInicioFiltro">' +
        '</div>' +
        '<label class="col-sm-2 control-label">Fecha Fin Venc.</label>' +
        '<div class="col-md-3">' +
        '<input type="date" class="form-control input-sm"  id="FechaFinFiltro">' +
        '</div>' +
        '<div class="col-md-2">' +
        '<button  type="button"  id="btn_expExcel" class="btn-primary btn-sm">' +
        '<i class="fa fa-file-excel-o">Exportar Excel</i>' +
        '</button>' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +

        '<div class="col-md-5">' +
        '<select id="idClienteFiltro"  style="margin-right:5px;width: 100%" name="idClienteFiltro" class="form-control input-sm "></select>' +
        '</div>' +

        '<div class="col-md-5">' +
        '<select id="idCobradorFiltro"  style="margin-right:5px;width: 100%" name="idCobradorFiltro" class="form-control input-sm "></select>' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +

        '<div class="col-md-5">' +
        '<select id="Departamento"  style="margin-right:5px;width: 100%" name="idClienteFiltro" class="form-control input-sm "><option value="">Departemento</option></select>' +
        '</div>' +

        '<div class="col-md-5">' +
        '<select id="provincia"   style="margin-right:5px;width: 100%" name="idCobradorFiltro" class="form-control input-sm "><option value="">Provincia</option></select>' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +

        '<div class="col-md-5">' +
        '<select  id="distrito"  style="margin-right:5px;width: 100%" name="idClienteFiltro" class="form-control input-sm "><option value="">Distrito</option></select>' +
        '</div>' +

        '<div class="col-md-5">' +
        '<select id="idsector"  style="margin-right:5px;width: 100%" name="idCobradorFiltro" class="form-control input-sm "><option value="">Sector</option></select>' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<div class="col-md-5 ">' +
        '<select id="idTipoSolicitud"  style="margin-right:5px;width: 100%" name="idTipoSolicitud" class="form-control input-sm "><option value="">Tipo Solicitud</option><option value="1">CONTADO</option><option value="2">CRÉDITO DIRECTO</option><option value="3">CRÉDITO FINANCIERO</option><option value="4">CRÉDITO</option></select>' +
        '</div>' +
        '<div class="col-md-5">' +
        '<select id="idConvenio"  style="margin-right:5px;width: 100%" name="idConvenio" class="form-control input-sm "><option value="">Convenio</option></select>' +
        '</div>' +
       

      
        '</div>' +
        '<div class="form-group">' +
        '<div class="col-md-5">' +
        '<input type="text" id="search_cuentas_cobrar" name="search_cuentas_cobrar" class="form-control input-sm" autocomplete="off" placeholder="Buscar..." />' +
        '</div>' +
        '</div>' +
        '</form>';
}
function getFormSearchCierre(form_id, input_id, btn_id, val_busquedad, estado, idMovimiento) {
    var estado = 'b';
    return '<form class="form-inline" id="' + form_id + '" style="margin-bottom:-3px">' +
        '<div class="input-group input-group-sm">' +
        '<input type="hidden"  value="' + val_busquedad + '" name="perido_busquedad" id="perido_busquedad"/>' +
        '<input type="hidden"  value="' + estado + '" name="estado_busquedad" id="estado_busquedad"/>' +
        '<input type="hidden"  value="' + idMovimiento + '" name="idMovimientoBusquedad" id="idMovimientoBusquedad"/>' +
        '<input type="text" id="' + input_id + '" value="" name="search" class="form-control" autocomplete="off" placeholder="Buscar..." />' +
        '<span class="input-group-btn">' +
        '<button type="submit" id="' + btn_id + '" class="btn btn-danger-admin">' +
        '<i class="fa fa-search"></i>' +
        '</button>' +
        '</span>' +
        '</div>' +
        '</form>';
}

function getFormSearchCierreSolicitud(form_id, input_id, btn_id, val_busquedad, estado, idMovimiento) {
    var estado = 'b';
    
    return '<form class="form-inline" id="' + form_id + '" style="margin-bottom:-3px">' +
        '<div class="input-group input-group-sm">' +
        '<input type="hidden"  value="' + val_busquedad + '" name="perido_busquedad" id="perido_busquedad"/>' +
        '<input type="hidden"  value="' + estado + '" name="estado_busquedad" id="estado_busquedad"/>' +
        '<input type="hidden"  value="' + idMovimiento + '" name="idMovimientoBusquedad" id="idMovimientoBusquedad"/>' +
        '<input type="text" id="' + input_id + '" value="" name="search" class="form-control" autocomplete="off" placeholder="Buscar..." />' +
        '<span class="input-group-btn">' +
        '<button type="submit" id="' + btn_id + '" class="btn btn-danger-admin">' +
        '<i class="fa fa-search"></i>' +
        '</button>' +
        '</span>' +
        '</div>' +
        '</form>';
}
function getFormSearch_MovimientoCaja(form_id, input_id, btn_id) {
    return '<form class="form-horizontal" id="' + form_id + '" style="margin-bottom:-3px">' +
        '<div class="form-group">' +
        '<div class="col-md-4"><select id="filtro_tipoMovi"  style="margin-right:5px;width: 100%" name="filtro_tipoMovi" class="form-control input-sm "></select></div>' +
        '<div class="col-md-3"><select id="filtro_monedaMovi" style="margin-right:5px,width: 100%"  name="filtro_monedaMovi" class="form-control input-sm"></select></div>' +
        '<div class="input-group input-group-sm">' +
        '<input type="text" id="' + input_id + '" name="search" class="form-control" autocomplete="off" placeholder="Concepto" />' +
        '<span class="input-group-btn">' +
        '<button  type="submit" id="' + btn_id + '" class="btn-danger-admin btn-sm">' +
        '<i class="fa fa-search"></i>' +
        '</button>' +
        '</span>' +
        '<span class="input-group-btn">' +
        '<button  type="button"  id="btn_exportar_CM" class="btn-primary  btn-sm">' +
        '<i class="fa fa-file-excel-o">Exportar a Excel</i>' +
        '</button>' +
        '</span>' +
        '</div></div>' +
        '</div>' +
        '</form>';
}
function getFormSearch2(form_id, input_id, btn_id) {
    return '<form class="form-horizontal" id="' + form_id + '" style="margin-bottom:-3px">' +
        '<div class="form-group">' +
        '<div class="col-md-4"><select id="filtro_art"  style="margin-right:5px;width: 100%" name="filtro_art" class="form-control input-sm "></select></div>' +
        '<div class="col-md-2"><select id="filtro_cate" style="margin-right:5px"  name="filtro_cate" class="form-control input-sm"></select></div>' +
        '<div class="col-md-2"><select style="margin-right:5px" id="filtro_idAlm" name="filtro_idAlm" class="form-control input-sm"></select></div>' +
        '<div class="col-md-2"><select style="margin-right:5px" id="filtro_idLoc"  name="filtro_idLoc"  class="form-control input-sm"></select></div>' +
        '<div class="col-md-2">' +
        '<div class="input-group input-group-sm">' +
        '<input value="a" type="hidden" id="' + input_id + '" name="search" class="form-control" autocomplete="off" placeholder="Buscar..." />' +
        '<span class="input-group-btn">' +
        '<button  type="submit" id="' + btn_id + '" class="btn-danger-admin btn-sm">' +
        '<i class="fa fa-search"></i>' +
        '</button>' +
        '<button  type="button"  id="btn_exportar_QS" class="btn-primary  btn-sm">' +
        '<i class="fa fa-file-excel-o">Exportar a Excel</i>' +
        '</button>' +
        '</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<div class="col-md-2 col-md-offset-10">' +
        '<button  type="button"  id="btn_exportar_QS_PDF" class="btn-success  btn-sm">' +
        '<i class="fa fa-file-pdf-o">Exportar a Pdf</i>' +
        '</button>' +
        '</div>' +
        '</div>' +
        '</form>';
}
function getFormSearch3(form_id, input_id, btn_id) {
    return '<form class="form-horizontal" id="' + form_id + '" style="margin-bottom:-3px">' +
        '<div class="form-group">' +
        '<div class="col-md-3"><input  type="date" class="form-control input-sm" id="fecha_inicio" placeholder="Fecha Inicio"></div>' +
        '<div class="col-md-3"><input type="date" class="form-control input-sm"  id="fecha_fin" placeholder="Fecha Fin"></div>' +
        '<div class="col-md-4"><select id="filtro_art"  style="margin-right:5px" name="filtro_art" class="form-control input-sm "></select></div>' +
        '<div class="col-md-2"><select id="filtro_oper"  style="margin-right:5px" name="filtro_art" class="form-control input-sm "></select></div>' +


        '</div>' +
        '<div class="form-group">' +
        '<div class="col-md-2"><select id="filtro_nat"  style="margin-right:5px" name="filtro_art" class="form-control input-sm "></select></div>' +
        '<div class="col-md-2"><select id="filtro_cate" style="margin-right:5px"  name="filtro_cate" class="form-control input-sm"></select></div>' +
        '<div class="col-md-2"><select style="margin-right:5px;width: 100%" id="filtro_idAlm" name="filtro_idAlm" class="form-control input-sm"></select></div>' +
        '<div class="col-md-2"><select style="margin-right:5px" id="filtro_idLoc"  name="filtro_idLoc"  class="form-control input-sm"></select></div>' +
        '<div class="col-md-2"><input type="text" class="form-control input-sm" id="n_movimiento" placeholder="N° Movimiento" width="100px"></div>' +
        '<div class="col-md-2"><input type="text" class="form-control input-sm" id="cod_lote" placeholder="Cod Lote" width="100px"></div>' +
        '</div>' +
        '<div class="form-group">' +
        '<div class="col-md-2" ><input type="text" class="form-control input-sm" id="cod_serie" placeholder="Cod Serie" width="100px"></div>' +
        '<div class="col-md-2">' +
        '<input value="a" type="hidden" id="' + input_id + '" name="search" class="form-control" autocomplete="off" placeholder="Buscar..." />' +
        '<span class="input-group-btn">' +
        '<button  type="submit" id="' + btn_id + '" class="btn-danger-admin btn-sm">' +
        '<i class="fa fa-search"></i>' +
        '</button>' +
        '<button  type="button"  id="btn_exportar_QM" class="btn-primary  btn-sm">' +
        '<i class="fa fa-file-excel-o">Exportar a Excel</i>' +
        '</button>' +
        '</button>' +
        '<button  type="button"  id="btn_exportar_QM_PDF" class="btn-success  btn-sm">' +
        '<i class="fa fa-file-pdf-o">Exportar a Pdf</i>' +
        '</button>' +
        '</span>' +
        // '<span class="input-group-btn">' +

        // '</span>' +
        '</div>' +
        '</div>' +
        '</form>';
}

function generateSearchForm(form_id, btn_id, callback, is_click) {
    var btn = $('#' + btn_id);

    btn.click(function (e) {
        callback();
        e.preventDefault();
    });

    if (is_click) {
        btn.click();
    }

    $('#' + form_id).submit(function (e) {
        btn.click();
        e.preventDefault();
    });
}

function generateDateRangePicker(calendar, start, end, callback, opens) {
    opens = typeof opens !== 'undefined' ? opens : 'left';
    calendar.daterangepicker({
        startDate: start,
        endDate: end,
        opens: opens,
        showDropdowns: true,
        alwaysShowCalendars: true,
        showCustomRangeLabel: false,
        ranges: {
            'Hoy': [moment(), moment()],
            'Ayer': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Últimos 7 días': [moment().subtract(6, 'days'), moment()],
            'Últimos 30 días': [moment().subtract(29, 'days'), moment()],
            'Este mes': [moment().startOf('month'), moment().endOf('month')],
            'Mes pasado': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
            'Este año': [moment().startOf('year'), moment().endOf('year')],
            'Año pasado': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]
        },
        locale: {
            cancelLabel: 'Cancelar',
            applyLabel: 'Aplicar',
            daysOfWeek: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
            monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre',
                'Octubre', 'Noviembre', 'Diciembre']
        }
    }, callback);
}

function generateDatePicker(inp) {
    inp.datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy',
        beforeShow: function () {
            setTimeout(function () {
                $('.ui-datepicker').css('z-index', 2052);
            });
        }
    })
}

function generateCheckBox(inp) {
    $(inp).iCheck({
        checkboxClass: 'icheckbox_square-green'
    }).on('ifClicked', function (event) {
        $(event.target).click();
    });
}

function generateRadio(inp) {
    $(inp).iCheck({
        radioClass: 'iradio_square-green'
    }).on('ifClicked', function (event) {
        $(event.target).click();
    });
}

function generateSelect2Ajax(inp, placeholder, url, allow_clear) {
    allow_clear = (typeof allow_clear === 'undefined') ? true : allow_clear;
    inp.select2({
        language: 'es',
        placeholder: placeholder,
        allowClear: allow_clear,
        ajax: {
            url: url,
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: params.term
                };
            },
            processResults: function (data, params) {
                return {
                    results: data.items
                };
            },
            cache: true
        },
        escapeMarkup: function (markup) {
            return markup;
        },
        minimumInputLength: 1
    });
}

function activeURL() {
    setTimeout(function () {
        var url = window.location.href.split('/');
        if (typeof url[3] != 'undefined' && url[3] != 'home' && url[3] != '#') {
            $(".active_url").removeClass('active active_url');
            var mod_now = $(".mod" + url[3]);
            mod_now.addClass('active active_url');
            mod_now.parent().addClass('in menu_open');
            mod_now.parent().parent().addClass('active active_url');
        } else {
            $(".active_url").removeClass('active active_url');
            $(".menu_open").removeClass('in menu_open');
            $(".li_home").addClass('active active_url');
        }
        if (!show_list_) {
            if ($("body").hasClass("mini-navbar")) {
                $('.navbar-minimalize').click();
            }
            // $(".active_url").removeClass('active active_url');
            // $(".menu_open").removeClass('in menu_open');
        }
    }, 300);
}
activeURL();

function closeSession() {
    swal({
        title: '',
        text: '¿Está seguro que desea cerrar sesión?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        closeOnConfirm: true,
        showLoaderOnConfirm: false,
        closeOnCancel: true
    },
        function () {
            window.location = base_url + '/logout';
            $('#show_loading').removeClass('ng-hide');
        });
}

function PrintDiv() {
    var divToPrint = document.getElementById('printDiv');

    var myWindow = window.open();
    myWindow.document.write(divToPrint.innerHTML);

    divToPrint.innerHTML = '';

    myWindow.document.close();
    myWindow.focus();
    myWindow.print();
    myWindow.close();
}

function toDataUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        };
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

function createExcel(file, name) {
    $('#modalLabelExcel').html(name);
    // $('#frame_excel').attr('src', file);
    $('#modalExcel').modal('show');
}

function create_pdf(response) {
    var docDefinition = {
        // a string or { width: number, height: number }
        pageSize: response.pageSize,
        // by default we use portrait, you can change it to landscape if you wish
        pageOrientation: response.pageOrientation,
        // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
        // pageMargins: [15, 15, 15, 15],
        content: [
            {
                columns: [
                    {
                        width: 'auto',
                        // normally you could put image directly here, but since you're
                        // setting width to auto, we need an artificial wrapping-node
                        // so that column-width does not interfere with image width
                        stack: [
                            {
                                image: response.img,
                                fit: [120, 120]
                            }
                        ]
                    },
                    { text: response.title, style: 'header' }
                ]
            },
            { text: 'Fecha: ' + moment().format('DD [de] MMMM [de] YYYY, h:mm A'), style: 'subheader' },
            {
                columns: [
                    {
                        width: 'auto',
                        table: {
                            headerRows: 1,
                            body: response.info
                        }
                    }
                ]
            }
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [-120, 0, 0, 0],
                alignment: 'center'
            },
            subheader: {
                fontSize: 12,
                bold: true,
                margin: [0, 5, 0, 5],
                alignment: 'center'
            },
            footer: {
                fontSize: 10,
                margin: [0, 10, 40, 0],
                alignment: 'right'
            }
        },
        footer: function (currentPage, pageCount) {
            return {
                columns: [{
                    text: 'Página ' + currentPage.toString() + ' de ' + pageCount,
                    style: 'footer'
                }]
            }
            // return currentPage.toString() + ' de ' + pageCount;
        }
    };

    var win = window.open('', '_blank');
    // if (response.type === 1) {
    //     pdfMake.createPdf(docDefinition).download();
    // } else if (response.type === 2) {
    //     pdfMake.createPdf(docDefinition).open({}, win);
    // } else {
    //     pdfMake.createPdf(docDefinition).print({}, win);
    // } 
    pdfMake.createPdf(docDefinition).print({}, win);
}
function create_pdfVC(response) {
    var docDefinition = {
        // a string or { width: number, height: number }
        pageSize: response.pageSize,
        // by default we use portrait, you can change it to landscape if you wish
        pageOrientation: response.pageOrientation,
        // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
        pageMargins: [8, 20, 15, 8],
        content: [
            {
                columns: [
                    {
                        width: 'auto',
                        // normally you could put image directly here, but since you're
                        // setting width to auto, we need an artificial wrapping-node
                        // so that column-width does not interfere with image width
                        stack: [
                            {
                                image: response.img,
                                fit: [120, 120]
                            }
                        ]
                    },
                    { text: response.title, style: 'header' }
                ]
            },
            { text: 'Fecha: ' + moment().format('DD [de] MMMM [de] YYYY, h:mm A'), style: 'subheader' },
            {
                columns: [
                    {
                        width: 'auto',
                        table: {
                            headerRows: 1,
                            body: response.info
                        }
                    }
                ]
            }
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [-120, 0, 0, 0],
                alignment: 'center'
            },
            subheader: {
                fontSize: 12,
                bold: true,
                margin: [0, 5, 0, 5],
                alignment: 'center'
            },
            footer: {
                fontSize: 10,
                margin: [0, 10, 40, 0],
                alignment: 'right'
            }
        },
        footer: function (currentPage, pageCount) {
            return {
                columns: [{
                    text: 'Página ' + currentPage.toString() + ' de ' + pageCount,
                    style: 'footer'
                }]
            }
            // return currentPage.toString() + ' de ' + pageCount;
        }
    };

    var win = window.open('', '_blank');
    // if (response.type === 1) {
    //     pdfMake.createPdf(docDefinition).download();
    // } else if (response.type === 2) {
    //     pdfMake.createPdf(docDefinition).open({}, win);
    // } else {
    //     pdfMake.createPdf(docDefinition).print({}, win);
    // } 
    pdfMake.createPdf(docDefinition).print({}, win);
}
function crearTablaCCsoles_(data, dataBodyReportes, dataMoneda, cambio) {
    var subtituloSolesEfec = [
        { fontSize: 8, text: "DOCUMENTO", fillColor: '#eeeeee' },
        { fontSize: 8, text: "FEC DOC", fillColor: '#eeeeee' },
        { fontSize: 8, text: "FEC VENC", fillColor: '#eeeeee' },
        { fontSize: 8, text: "DIAS VENCIDOS", fillColor: '#eeeeee' },
        { fontSize: 8, text: "FEC ULT. PAGO ", fillColor: '#eeeeee' },
        { fontSize: 8, text: "MONEDA", fillColor: '#eeeeee' },
        { fontSize: 8, text: "MONTO TOTAL", fillColor: '#eeeeee' },
        { fontSize: 8, text: "MONTO PENDIENTE", fillColor: '#eeeeee' },
        { fontSize: 8, text: "VENDEDOR", fillColor: '#eeeeee' },
        { fontSize: 8, text: "COBRADOR", fillColor: '#eeeeee' },
    ];
    dataBodyReportes.push(subtituloSolesEfec);
    var ind = 'C';
    var conc = 1;
    var consol = 0;
    var condol = 0;
    var contfi = 0;
    var tem = '';
    var totalsole = 0;
    var totaldola = 0;
    for (var i = 0; i < data.length; i++) {
        var fecul = '';
        if (data[i].fecultpago != null) {
            fecul = moment(data[i].fecultpago).format('DD/MM/YYYY');
        }
        if (data[i].idmoneda == '1') {
            consol = consol + Number(data[i].monto_pendiente);
        } else {
            condol = condol + Number(data[i].monto_pendiente);

        }
        if (ind == 'C') {
            var primerclien = [
                { fontSize: 9, text: conc + '.' + ' Cliente', border: [true, true, false, false] },
                { fontSize: 8, text: data[i].cliente, colSpan: 3, border: [false, true, false, false] },
                {},
                {},
                { fontSize: 8, text: data[i].documento_cliente, border: [false, true, false, false] },
                { fontSize: 8, text: data[i].direccion + ' ' + data[i].cDepartamento + ' ' + data[i].cProvincia + ' ' + data[i].cDistrito, border: [false, true, true, false], colSpan: 5 },
                {},
                {},
                {},
                {},
            ];

            conc = conc + 1;
            dataBodyReportes.push(primerclien);
            var primerclienc = [
                { fontSize: 8, text: data[i].documento_ven },
                { fontSize: 8, text: moment(data[i].fecha_emision).format('DD/MM/YYYY') },
                { fontSize: 8, text: moment(data[i].fecha_vencimiento).format('DD/MM/YYYY') },
                { fontSize: 8, text: diasmora(data[i].fecha_vencimiento, data[i].monto_pendiente) },
                { fontSize: 8, text: fecul },
                { fontSize: 8, text: data[i].moneda },
                { fontSize: 8, text: data[i].Simbolo + ' ' + redondeodecimale(data[i].monto_total).toFixed(2) },
                { fontSize: 8, text: data[i].Simbolo + ' ' + redondeodecimale(data[i].monto_pendiente).toFixed(2) },
                { fontSize: 8, text: data[i].vendedor },
                { fontSize: 8, text: data[i].cobrador },
            ];
            dataBodyReportes.push(primerclienc);
            ind = 'B';
            contfi = contfi + 1;
        } else {
            var ni = i + 1;
            contfi = contfi + 1;
            var demasclien = [
                { fontSize: 8, text: data[i].documento_ven },
                { fontSize: 8, text: moment(data[i].fecha_emision).format('DD/MM/YYYY') },
                { fontSize: 8, text: moment(data[i].fecha_vencimiento).format('DD/MM/YYYY') },
                { fontSize: 8, text: diasmora(data[i].fecha_vencimiento, data[i].monto_pendiente) },
                { fontSize: 8, text: fecul },
                { fontSize: 8, text: data[i].moneda },
                { fontSize: 8, text: data[i].Simbolo + ' ' + redondeodecimale(data[i].monto_total).toFixed(2) },
                { fontSize: 8, text: data[i].Simbolo + ' ' + redondeodecimale(data[i].monto_pendiente).toFixed(2) },
                { fontSize: 8, text: data[i].vendedor },
                { fontSize: 8, text: data[i].cobrador },
            ];

            dataBodyReportes.push(demasclien);

            // if(ni<data.length){
            // if(ni<=data.length){
            //     console.log("a");
            //    if(ni==data.length){
            //         ni=ni-1;
            //         console.log("b");
            //     }
            // if(data[i].idventa!=data[ni].idventa || (ni+1)==data.length ){
            if (ni <= data.length) {
                tem = ni;
                if (ni == data.length) {
                    tem = ni - 1;
                    console.log("b");
                }
                if (data[i].idventa != data[tem].idventa || (ni) == data.length) {
                    ind = 'C';
                    var subtituloSolesEfec = [
                        { fontSize: 8, text: "Total por Cobrar en Moneda Base", fillColor: '#eeeeee', colSpan: 5, alignment: 'center', border: [true, false, false, false] },
                        {},
                        {},
                        {},
                        {},
                        { fontSize: 8, text: "Soles:", fillColor: '#eeeeee', colSpan: 2, alignment: 'center', border: [false, false, false, false] },
                        {},
                        { fontSize: 8, text: dataMoneda[0].Simbolo + " " + addCommas(redondeodecimale(consol).toFixed(2)), fillColor: '#eeeeee', border: [false, false, false, false] },
                        { fontSize: 8, text: "Nro. Registros Total: " + contfi, fillColor: '#eeeeee', colSpan: 2, border: [false, false, true, false] },
                        {},
                    ];
                    dataBodyReportes.push(subtituloSolesEfec);
                    var dola = [
                        { fontSize: 8, text: "", fillColor: '#eeeeee', colSpan: 5, alignment: 'center', border: [true, false, false, true] },
                        {},
                        {},
                        {},
                        {},
                        { fontSize: 8, text: "Dolares:", fillColor: '#eeeeee', colSpan: 2, alignment: 'center', border: [false, false, false, true] },
                        {},
                        { fontSize: 8, text: dataMoneda[1].Simbolo + " " + addCommas(redondeodecimale(condol).toFixed(2)), fillColor: '#eeeeee', border: [false, false, false, true] },
                        { fontSize: 8, text: "", fillColor: '#eeeeee', colSpan: 2, border: [false, false, true, true] },
                        {},
                    ];
                    totalsole = totalsole + consol;
                    totaldola = totaldola + condol;
                    contfi = 0;
                    consol = 0;
                    condol = 0;
                    dataBodyReportes.push(dola);
                } else {
                    ind = 'B';
                }
            }

        }

    }
    //   var cr=0;
    //   var ca=0;
    //   var cs=0;
    //   var ct=0;
    //   var cv=0;
    //   var cta=0;
    //   var sim='';

    //   data.map(function(index) {
    //   if(idMoneda==index.IdMoneda){
    //   var estado='Registrado';
    //   if(index.estado=='2'){
    //       estado='Vigente';
    //   }else if(index.estado=='3'){
    //        estado='Por Aprobar';
    //   }else if(index.estado=='4'){
    //        estado='Aprobado';
    //   }else if(index.estado=='5'){
    //        estado='Rechazado';
    //   }else if(index.estado=='6'){
    //        estado='Facturado';
    //   }else if(index.estado=='7'){
    //        estado='Despachado';
    //   }

    //   var mostrador=0;
    //   var taller=0;
    //           if(index.origen=='V'){
    //               $mostrador=Number(index.REPUESTO)+Number(index.ACEITE);
    //           }else{
    //               $taller=Number(index.REPUESTO)+Number(index.ACEITE); 
    //           };
    //    cr=cr+Number(index.REPUESTO);
    //    ca=ca+Number(index.ACEITE);
    //    cs=cs+Number(index.SERVICIO);
    //    ct=ct+Number(index.TERCEROS);
    //    cv=cv+Number(mostrador);
    //    cta=cta+Number(taller);
    //    sim=index.Simbolo;
    //    var subtituloSolesEfec=[ 
    //           { fontSize: 8,text:index.cCodConsecutivo+'-'+index.nConsecutivo},
    //           { fontSize: 8,text:moment(index.fecha).format('DD/MM/YYYY'),},
    //           { fontSize: 8,text:index.documento_ven},
    //           { fontSize: 8,text:index.razonsocial_cliente},
    //           { fontSize: 8,text:index.vendedor},
    //           { fontSize: 8,text:index.Simbolo+' '+redondeodecimale(index.monto_total).toFixed(2),},
    //           { fontSize: 8,text:estado,},
    //           { fontSize: 8,text:index.Simbolo+' '+redondeodecimale(index.REPUESTO).toFixed(2),},
    //           { fontSize: 8,text:index.Simbolo+' '+redondeodecimale(index.ACEITE).toFixed(2),},
    //           { fontSize: 8,text:index.Simbolo+' '+redondeodecimale(index.SERVICIO).toFixed(2)},
    //           { fontSize: 8,text:index.Simbolo+' '+redondeodecimale(index.TERCEROS).toFixed(2),},
    //           { fontSize: 8,text:index.Simbolo+' '+redondeodecimale(mostrador).toFixed(2)},
    //           { fontSize: 8,text:index.Simbolo+' '+redondeodecimale(taller).toFixed(2)},
    //   ];
    //   dataBodyReportes.push(subtituloSolesEfec);
    //  }     
    // });
    // var totales=[ 
    //           { fontSize: 7,text:"",border: [false,false, false, false],},
    //           { fontSize: 7,text:"",border: [false,false, false, false],},
    //           { fontSize: 7,text:" ",border: [false,false, false, false],},
    //           { fontSize: 7,text:"",border: [false,false, false, false],},
    //           { fontSize: 7,text:"",border: [false,false, false, false],},
    //           { fontSize: 7,text:"",border: [false,false, false, false],},
    //           { fontSize: 7,text:"",border: [false,false, false, false],},
    //           { fontSize: 7,text:sim+''+redondeodecimale(cr).toFixed(2),fillColor: '#eeeeee'},
    //           { fontSize: 7,text:sim+''+redondeodecimale(ca).toFixed(2),fillColor: '#eeeeee'},
    //           { fontSize: 7,text:sim+''+redondeodecimale(cs).toFixed(2),fillColor: '#eeeeee'},
    //           { fontSize: 7,text:sim+''+redondeodecimale(ct).toFixed(2),fillColor: '#eeeeee'},
    //           { fontSize: 7,text:sim+''+redondeodecimale(cv).toFixed(2),fillColor: '#eeeeee'},
    //           { fontSize: 7,text:sim+''+redondeodecimale(cta).toFixed(2),fillColor: '#eeeeee'},
    //   ];
    //   dataBodyReportes.push(totales);

    var fina = [
        { fontSize: 8, text: "Total por Cobrar a T.C: " + cambio[0].Mensaje, fillColor: '#eeeeee', colSpan: 5, alignment: 'center', border: [true, false, false, false] },
        {},
        {},
        {},
        {},
        { fontSize: 8, text: "", fillColor: '#eeeeee', colSpan: 2, alignment: 'center', border: [false, false, false, false] },
        {},
        { fontSize: 8, text: dataMoneda[0].Simbolo + " " + addCommas(redondeodecimale(totalsole).toFixed(2)), fillColor: '#eeeeee', colSpan: 3, border: [false, false, true, false] },
        {},
        {},
    ];
    dataBodyReportes.push(fina);
    var finb = [
        { fontSize: 8, text: "", fillColor: '#eeeeee', colSpan: 5, alignment: 'center', border: [true, false, false, true] },
        {},
        {},
        {},
        {},
        { fontSize: 8, text: "Dolares:", fillColor: '#eeeeee', colSpan: 2, alignment: 'center', border: [false, false, false, true] },
        {},
        { fontSize: 8, text: dataMoneda[1].Simbolo + " " + addCommas(redondeodecimale((totaldola) + (totalsole / Number(cambio[0].Mensaje))).toFixed(2)), fillColor: '#eeeeee', border: [false, false, false, true] },
        { fontSize: 8, text: "", fillColor: '#eeeeee', colSpan: 2, border: [false, false, true, true] },
        {},
    ];

    dataBodyReportes.push(finb);

    return dataBodyReportes;
}

function crearTablaCCsoles(data, dataBodyReportes, dataMoneda, cambio) {
    var subtituloSolesEfec = [
        { fontSize: 8, text: "DOCUMENTO", fillColor: '#eeeeee' },
        { fontSize: 8, text: "SOLICITUD", fillColor: '#eeeeee' },
        { fontSize: 8, text: "FEC DOC", fillColor: '#eeeeee' },
        { fontSize: 8, text: "FEC VENC", fillColor: '#eeeeee' },
        { fontSize: 8, text: "DIAS VENCIDOS", fillColor: '#eeeeee' },
        { fontSize: 8, text: "FEC ULT. PAGO ", fillColor: '#eeeeee' },
        { fontSize: 8, text: "MONEDA", fillColor: '#eeeeee' },
        { fontSize: 8, text: "MONTO TOTAL", fillColor: '#eeeeee' },
        { fontSize: 8, text: "MONTO PENDIENTE", fillColor: '#eeeeee' },
        { fontSize: 8, text: "VENDEDOR", fillColor: '#eeeeee' },
        { fontSize: 8, text: "COBRADOR", fillColor: '#eeeeee' },
    ];
    dataBodyReportes.push(subtituloSolesEfec);
    // var ind = 'C';
    var conc = 1;
    var consol = 0;
    var condol = 0;
    var contfi = 0;
    // var tem = '';
    var totalsole = 0;
    var totaldola = 0;
    var array = [];
    var contador = 1;
    for (var i = 0; i < data.length; i++) {
        var fecul = '';
        if (data[i].fecultpago != null) {
            fecul = moment(data[i].fecultpago).format('DD/MM/YYYY');
        }
       

        if(!array.includes(data[i].cliente)) {
            if(conc > 1) {
                var subtituloSolesEfec = [
                    { fontSize: 8, text: "Total por Cobrar en Moneda Base", fillColor: '#eeeeee', colSpan: 6, alignment: 'center', border: [true, false, false, false] },
                    {},
                    {},
                    {},
                    {},
                    {},
                    { fontSize: 8, text: "Soles:", fillColor: '#eeeeee', colSpan: 2, alignment: 'center', border: [false, false, false, false] },
                    {},
                    { fontSize: 8, text: dataMoneda[0].Simbolo + " " + addCommas(redondeodecimale(consol).toFixed(2)), fillColor: '#eeeeee', border: [false, false, false, false] },
                    { fontSize: 8, text: "Nro. Registros Total: " + contfi, fillColor: '#eeeeee', colSpan: 2, border: [false, false, true, false] },
                    {},
                ];
                dataBodyReportes.push(subtituloSolesEfec);
                var dola = [
                    { fontSize: 8, text: "", fillColor: '#eeeeee', colSpan: 6, alignment: 'center', border: [true, false, false, true] },
                    {},
                    {},
                    {},
                    {},
                    {},
                    { fontSize: 8, text: "Dolares:", fillColor: '#eeeeee', colSpan: 2, alignment: 'center', border: [false, false, false, true] },
                    {},
                    { fontSize: 8, text: dataMoneda[1].Simbolo + " " + addCommas(redondeodecimale(condol).toFixed(2)), fillColor: '#eeeeee', border: [false, false, false, true] },
                    { fontSize: 8, text: "", fillColor: '#eeeeee', colSpan: 2, border: [false, false, true, true] },
                    {},
                ];
               
               
                contfi = 0;
                consol = 0;
                condol = 0;
                dataBodyReportes.push(dola);
              
            }

             // cliente

            var primerclien = [
                { fontSize: 9, text: conc + '.' + ' Cliente', border: [true, true, false, false] },
                { fontSize: 8, text: data[i].cliente, colSpan: 4, border: [false, true, false, false] },
                {},
                {},
                {},
                { fontSize: 8, text: data[i].documento_cliente, border: [false, true, false, false] },
                { fontSize: 8, text: data[i].direccion + ' ' + data[i].cDepartamento + ' ' + data[i].cProvincia + ' ' + data[i].cDistrito, border: [false, true, true, false], colSpan: 5 },
                {},
                {},
                {},
                {},
            ];

           
            dataBodyReportes.push(primerclien);
            conc = conc + 1;
            array = [];
        }

        //detalle
        var demasclien = [
            { fontSize: 8, text: data[i].documento_ven },
            { fontSize: 8, text: data[i].cCodConsecutivo+"-"+data[i].nConsecutivo },
            { fontSize: 8, text: moment(data[i].fecha_emision).format('DD/MM/YYYY') },
            { fontSize: 8, text: moment(data[i].fecha_vencimiento).format('DD/MM/YYYY') },
            { fontSize: 8, text: diasmora(data[i].fecha_vencimiento, data[i].monto_pendiente) },
            { fontSize: 8, text: fecul },
            { fontSize: 8, text: data[i].moneda },
            { fontSize: 8, text: data[i].Simbolo + ' ' + redondeodecimale(data[i].monto_total).toFixed(2) },
            { fontSize: 8, text: data[i].Simbolo + ' ' + redondeodecimale(data[i].monto_pendiente).toFixed(2) },
            { fontSize: 8, text: data[i].vendedor },
            { fontSize: 8, text: data[i].cobrador },
        ];

        if (data[i].idmoneda == '1') {
            consol = consol + Number(data[i].monto_pendiente);
            totalsole = totalsole + Number(data[i].monto_pendiente);
        } else {
            condol = condol + Number(data[i].monto_pendiente);
            totaldola = totaldola + Number(data[i].monto_pendiente);

        }
        // console.log("totalsole: "+totalsole);
        dataBodyReportes.push(demasclien);
        array.push(data[i].cliente);

        // para el ultimo registro
        if(data.length == contador) {
            contfi ++;
            var subtituloSolesEfec = [
                { fontSize: 8, text: "Total por Cobrar en Moneda Base", fillColor: '#eeeeee', colSpan: 6, alignment: 'center', border: [true, false, false, false] },
                {},
                {},
                {},
                {},
                {},
                { fontSize: 8, text: "Soles:", fillColor: '#eeeeee', colSpan: 2, alignment: 'center', border: [false, false, false, false] },
                {},
                { fontSize: 8, text: dataMoneda[0].Simbolo + " " + addCommas(redondeodecimale(consol).toFixed(2)), fillColor: '#eeeeee', border: [false, false, false, false] },
                { fontSize: 8, text: "Nro. Registros Total: " + contfi, fillColor: '#eeeeee', colSpan: 2, border: [false, false, true, false] },
                {},
            ];
            dataBodyReportes.push(subtituloSolesEfec);
            var dola = [
                { fontSize: 8, text: "", fillColor: '#eeeeee', colSpan: 6, alignment: 'center', border: [true, false, false, true] },
                {},
                {},
                {},
                {},
                {},
                { fontSize: 8, text: "Dolares:", fillColor: '#eeeeee', colSpan: 2, alignment: 'center', border: [false, false, false, true] },
                {},
                { fontSize: 8, text: dataMoneda[1].Simbolo + " " + addCommas(redondeodecimale(condol).toFixed(2)), fillColor: '#eeeeee', border: [false, false, false, true] },
                { fontSize: 8, text: "", fillColor: '#eeeeee', colSpan: 2, border: [false, false, true, true] },
                {},
            ];
            dataBodyReportes.push(dola);
        }

        contfi ++;
        contador ++;


    }
   

    var fina = [
        { fontSize: 8, text: "Total por Cobrar a T.C: " + cambio[0].Mensaje, fillColor: '#eeeeee', colSpan: 6, alignment: 'center', border: [true, false, false, false] },
        {},
        {},
        {},
        {},
        {},
        { fontSize: 8, text: "", fillColor: '#eeeeee', colSpan: 2, alignment: 'center', border: [false, false, false, false] },
        {},
        { fontSize: 8, text: dataMoneda[0].Simbolo + " " + addCommas(redondeodecimale(totalsole).toFixed(2)), fillColor: '#eeeeee', colSpan: 3, border: [false, false, true, false] },
        {},
        {},
    ];
    dataBodyReportes.push(fina);
    var finb = [
        { fontSize: 8, text: "", fillColor: '#eeeeee', colSpan: 6, alignment: 'center', border: [true, false, false, true] },
        {},
        {},
        {},
        {},
        {},
        { fontSize: 8, text: "Dolares:", fillColor: '#eeeeee', colSpan: 2, alignment: 'center', border: [false, false, false, true] },
        {},
        { fontSize: 8, text: dataMoneda[1].Simbolo + " " + addCommas(redondeodecimale((totaldola) + (totalsole / Number(cambio[0].Mensaje))).toFixed(2)), fillColor: '#eeeeee', border: [false, false, false, true] },
        { fontSize: 8, text: "", fillColor: '#eeeeee', colSpan: 2, border: [false, false, true, true] },
        {},
    ];

    dataBodyReportes.push(finb);

    return dataBodyReportes;
}
function diasmora(fecha_vencimiento, saldo_cuota) {
    var fecha1 = moment(fecha_vencimiento).format('YYYY/MM/DD');
    var fecha1 = new Date(fecha1);
    var hoy = new Date();
    var hAnio = hoy.getFullYear();
    var hmes = hoy.getMonth() + 1;
    if (Number(hmes) < 10) {
        hmes = '0' + String(hmes);
    }

    var hdia = hoy.getDate();
    if (Number(hdia) < 10) {
        hdia = '0' + String(hdia);
    }
    var fecha2 = hAnio + '/' + hmes + '/' + hdia;
    var fecha2 = new Date(fecha2);
    var resta = fecha2.getTime() - fecha1.getTime();
    var total = Math.round(resta / (1000 * 60 * 60 * 24));
    var dim = 0;
    if (total > 0) {
        dim = total;
    };
    if (Number(saldo_cuota) <= 0) {
        dim = 0;
    };
    return dim;
}
function create_CCpdf(response) {

    // dats
    var cambio = response.cambio;
    var data = response.data_cabe;
    var dataMon = response.simboloMoneda;
    var dataBodyCC = [];
    var datscc = crearTablaCCsoles(data, dataBodyCC, dataMon, cambio);
    console.log(cambio);
    var docDefinition = {

        // a string or { width: number, height: number }
        pageSize: "A4",
        // by default we use portrait, you can change it to landscape if you wish
        pageOrientation: 'landscape',
        // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
        pageMargins: [10, 15, 15, 5],
        content: [
            {
                columns: [
                    {
                        width: 'auto',
                        // normally you could put image directly here, but since you're
                        // setting width to auto, we need an artificial wrapping-node
                        // so that column-width does not interfere with image width
                        stack: [
                            {
                                image: response.img,
                                fit: [150, 150]
                            }
                        ]
                    },
                    { text: "CUENTAS POR COBRAR POR CLIENTE", style: 'header' }
                ]
            },
            { text: 'Fecha: ' + moment().format('DD [de] MMMM [de] YYYY, h:mm A'), style: 'subheader' },
            {
                margin: [0, 0, 0, 0],
                style: 'tableExample',
                table: {
                    widths: [70, 50, 60, 60, 40, 60, 40, 60, 60, 120, 105],
                    body:
                        datscc,
                },

            },
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [-90, 0, 0, 0],
                alignment: 'center'
            },
            subheader: {
                fontSize: 12,
                bold: true,
                margin: [0, 0, 0, 0],
                alignment: 'center'
            },
            footer: {
                fontSize: 10,
                margin: [0, 10, 40, 0],
                alignment: 'right'
            }
        },
        footer: function (currentPage, pageCount) {
            return {
                columns: [{
                    text: 'Página ' + currentPage.toString() + ' de ' + pageCount,
                    style: 'footer'
                }]
            }
            // return currentPage.toString() + ' de ' + pageCount;
        }
    };

    var win = window.open('', '_blank');
    // if (response.type === 1) {
    //     pdfMake.createPdf(docDefinition).download();
    // } else if (response.type === 2) {
    //     pdfMake.createPdf(docDefinition).open({}, win);
    // } else {
    //     pdfMake.createPdf(docDefinition).print({}, win);
    // }
    console.log(docDefinition);
    pdfMake.createPdf(docDefinition).print({}, win);
}

function create_vouchers_pdf(response) {
    var data = [];
    var array_head = [];
    var array_dataBody = [];
    var valor_image = response.img;
    var array_dataHead = [];
    // data.push(['N°', 'PROVEEDOR', 'DOCUMENTO'])
    for (var i = 0; i < response.data_header.length; i++) {
        var data_header = response.data_header[i];
        var info = response.info[i];
        (i === 0) ? pag = { text: response.title, style: 'header' } : pag = {
            text: response.title,
            style: 'header',
            pageBreak: 'before'
        };
        //
        array_head.push([
            { text: 'N° : ' + data_header[0][4], style: 'dataHeader' },
            { text: 'Fecha: ' + moment().format('DD [de] MMMM [de] YYYY, h:mm A'), style: 'subheader' }
        ])

        array_dataHead.push([
            pag,
            {
                width: 'auto',
                // normally you could put image directly here, but since you're
                // setting width to auto, we need an artificial wrapping-node
                // so that column-width does not interfere with image width
                stack: [
                    {
                        image: response.img,
                        fit: [120, 120]
                    }
                ]
            },
            { text: 'Fecha: ' + moment().format('DD [de] MMMM [de] YYYY, h:mm A'), style: 'subheader' },
            { text: 'N° : ' + data_header[0][4], style: 'dataHeader' },
            {
                style: 'dataHeaderAll',
                table: {
                    headerRows: 1,
                    body: [
                        [{ text: 'PROVEEDOR: ', style: 'dataHeader' },
                        { text: data_header[0][0] },
                        { text: 'ALMACÉN ORIGEN : ', style: 'dataHeader' },
                        { text: data_header[0][2] }
                        ],
                        [{ text: 'DOCUMENTO: ', style: 'dataHeader' },
                        { text: data_header[0][1] },
                        { text: 'ALMACÉN DESTINO : ', style: 'dataHeader' },
                        { text: data_header[0][3] }
                        ]
                    ]
                },
                layout: 'noBorders'
            },
            {
                widths: 'auto',
                style: 'tableDetail',
                table: {
                    headerRows: 1,
                    widths: [50, 245, 40, 50, 40],
                    body: info
                }
            },
            {
                style: 'dataFooter',
                table: {
                    widths: ['*', '*', 20, '*', '*'],
                    body: [
                        [
                            {
                                colSpan: 2,
                                text: 'DATOS DE TRANSPORTISTA',
                                // fillColor: '#eeeeee',
                                bold: true,
                                border: [false, false, false, false]
                            },
                            '',
                            {
                                border: [false, false, false, false],
                                text: ''
                            },
                            {
                                colSpan: 2,
                                text: ' TRANSPORTE Y CONDUCTOR',
                                bold: true,
                                border: [false, false, false, false]
                            },
                            ''
                        ],
                        [
                            {
                                border: [true, true, true, true],
                                text: 'RUC:\n' + data_header[0][5]
                            },
                            {
                                border: [true, true, true, true],
                                text: 'RAZÓN SOCIAL:\n' + data_header[0][6]
                            },
                            {
                                border: [false, false, false, false],
                                text: ''
                            },
                            {
                                border: [true, true, true, true],
                                text: 'MARCA Y PLACA :\n' + data_header[0][7]
                            },
                            {
                                border: [true, true, true, true],
                                text: 'LICENCIA DE CONDUCIR:\n' + data_header[0][8]
                            }
                        ]
                    ]
                }
            }
        ])
    }
    var docDefinition = {
        content: [
            {
                columns: [
                    array_dataHead
                ]
            }
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [-120, 0, 0, 0],
                alignment: 'center'
            },
            subheader: {
                fontSize: 12,
                bold: true,
                margin: [0, 5, 0, 5],
                alignment: 'center'
            },
            dataHeader: {
                bold: true,
                fontSize: 8,
                color: 'black'
            },
            dataHeaderAll: {
                fontSize: 10,
                color: 'black',
                margin: [0, 0, 10, 0]
            },

            dataFooter: {
                // bold: true,
                fontSize: 9,
                color: 'black',
                // alignment: 'center',
                margin: [0, 10, 0, 0]
            },
            tableDetail: {
                fontSize: 9,
                // bold: true,
                margin: [0, 5, 0, 1],
                alignment: 'left'
            },
            footer: {
                fontSize: 10,
                margin: [0, 10, 40, 0],
                alignment: 'right'
            }
        },
        pageMargins: [72, 100, 72, 40]
    };


    var win = window.open('', '_blank');
    if (response.type === 1) {
        pdfMake.createPdf(docDefinition).download();
    } else if (response.type === 2) {
        pdfMake.createPdf(docDefinition).open({}, win);
    } else {
        pdfMake.createPdf(docDefinition).print({}, win);
    }

}
function create_pdf_ordenServicio(response) {
    var data = response.data;
    console.log(response.data);
    var dataCli = response.data_cliente;
    console.log(dataCli);
    console.log(response.data_matenimiento);
    console.log(response.data_detalle);
    console.log(response.con);
    console.log(response.nr);
    console.log(data.dFecRec2);
    console.log(data.dFecEntrega2);
    var data_dis = response.get_distrito;
    var get_vehiculo = response.get_vehiculo;
    var modelo = get_vehiculo[0].Modelo;
    console.log(data[0].idcCondicionPago);
    var horaEnt = data[0].horaEnt;
    var dni = '';
    var ruc = '';
    console.log("****");
    console.log(dataCli[0].documento);
    console.log("****");
    if (dataCli[0].tipodoc == '01') {
        dni = dataCli[0].documento;
    } else {
        ruc = dataCli[0].documento;
    }
    var razonsocial_cliente = dataCli[0].razonsocial_cliente;
    var documento = dataCli[0].documento;
    var direccion = dataCli[0].direccion;
    var distrito = data_dis[0].cDistrito;
    var telefono = dataCli[0].telefono;
    var correo_electronico = dataCli[0].correo_electronico;
    var celular = dataCli[0].celular;
    var cMotor = data[0].cMotor;
    var cChasis = data[0].cChasis;
    var iAnioFab = data[0].iAnioFab;
    var cColor = data[0].cColor;
    var cPlacaVeh = data[0].cPlacaVeh;
    var nKilometraje = data[0].nKilometraje;

    var mo_revision = Number(data[0].mo_revision);
    var mo_mecanica = Number(data[0].mo_mecanica);
    var terceros = Number(data[0].terceros);
    var otros_mo = Number(data[0].otros_mo);
    var sub_mo = mo_revision + mo_mecanica + terceros + otros_mo;
    sub_mo = sub_mo.toFixed(2);
    var respuestos = Number(data[0].respuestos);
    var accesorios = Number(data[0].accesorios);
    var lubricantes = Number(data[0].lubricantes);
    var otros_rep = Number(data[0].otros_rep);
    var cObservaciones = data[0].cObservaciones;
    var sub_re = respuestos + accesorios + lubricantes + otros_rep;
    sub_re = sub_re.toFixed(2);
    var total = Number(data[0].total);


    /* var mcondicionPago='';
    if(data[0].idcCondicionPago=='9'){
        mcondicionPago=414;
    }else if(data[0].idcCondicionPago=='10'){
        mcondicionPago=475;
    }else{
        mcondicionPago=520;
    }; */

    var mcondicionPago = '';
    if (data[0].idcCondicionPago == '1') {
        mcondicionPago = 429; //409
    } else {
        mcondicionPago = 509; //489
    };

    var tipoSer = '';

    var valorSer = data[0].servicioMante;
    var tipoSer = '';
    if (data[0].id_tipo == '2') {
        valorSer = 'X';
        tipoSer = 129;
    } else if (data[0].id_tipo == '4') {
        tipoSer = 219;
        valorSer = 'X';
    } else {
        tipoSer = 183;
    }
    var mantenimiento_X = "";
    var cambioAciete_X = "";
    var reparacioMotor_x = "";
    var descar_x = "";
    var embrague_x = "";
    var transmi_x = "";
    var sisArras_x = "";
    var fren_x = "";
    var bate_x = "";
    var revisitE_x = "";
    var revisitIN_x = "";
    var suspencio_x = "";
    var aroneu_x = "";
    var sistEsca_x = "";
    var sistDirecc_x = "";
    var otro_x = "";

    var fechRecep = moment(data.dFecRec2).format('DD/MM/YYYY');
    var fechEntrega = moment(data.dFecEntrega2).format('DD/MM/YYYY');

    var data_matenimiento = response.data_matenimiento;
    _.each(data_matenimiento, function (b) {
        var vto = b.idMantenimiento;
        if (vto == 1) {
            mantenimiento_X = 'X';
        };
        if (vto == 2) {
            cambioAciete_X = 'X';
        };
        if (vto == 3) {
            reparacioMotor_x = 'X';
        };
        if (vto == 4) {
            descar_x = 'X';
        };
        if (vto == 5) {
            embrague_x = 'X';
        };
        if (vto == 6) {
            transmi_x = 'X';
        };
        if (vto == 7) {
            sisArras_x = 'X';
        };
        if (vto == 8) {
            fren_x = 'X';
        };
        if (vto == 9) {
            bate_x = 'X';
        };


        if (vto == 10) {
            revisitE_x = 'X';
        };
        if (vto == 11) {
            revisitIN_x = 'X';
        };
        if (vto == 12) {
            suspencio_x = 'X';
        };
        if (vto == 13) {
            aroneu_x = 'X';
        };
        if (vto == 14) {
            sistEsca_x = 'X';
        };
        if (vto == 15) {
            sistDirecc_x = 'X';
        };
        if (vto == 25) {
            otro_x = 'X';
        };

    });

    var docDefinition = {

        content: [
            {
                text: "" + response.con + '-' + response.nr + "",
                fontSize: 12,
                bold: true,
                absolutePosition: { x: 528, y: 38 } // 
            },
            {
                text: 'X',
                fontSize: 12,
                bold: true,
                absolutePosition: { x: mcondicionPago, y: 75 }
            },
            {
                // Fecha superior
                text: fechRecep,
                bold: true,
                fontSize: 10,
                absolutePosition: { x: 424, y: 91 } //364,82
            },
            {
                //Fecha superior
                text: fechEntrega,
                absolutePosition: { x: 424, y: 107 }, //364,93 
                bold: true,
                fontSize: 10,
            },
            /* {
                //fecha inferior
                text: fechRecep,
                bold: true,
                fontSize: 10,
                absolutePosition:{ x:172 , y: 790 }, //
            },
            {
                //fecha inferior
                text: fechEntrega,
                absolutePosition: { x:580 , y: 770 }, //
                bold: true,
                fontSize: 10,
            }, */
            {
                //Hora superior
                text: "" + horaEnt + "",
                absolutePosition: { x: 500, y: 92 },
                bold: true,
                fontSize: 10,
            },
            /* {
                //Hora inferior
                text:""+horaEnt+"",
                absolutePosition: { x:580 , y: 790 },
                bold: true,
                fontSize: 10,
            }, */
            {
                text: razonsocial_cliente,
                absolutePosition: { x: 117, y: 155 },
                bold: true,
                fontSize: 10,
            },
            {
                text: ruc,
                absolutePosition: { x: 107, y: 179 },
                bold: true,
                fontSize: 10,
            },
            {
                text: direccion,
                absolutePosition: { x: 107, y: 194 },
                bold: true,
                fontSize: 10,
            },
            {
                text: distrito,
                absolutePosition: { x: 107, y: 217 },
                bold: true,
                fontSize: 10,
            },
            {
                text: razonsocial_cliente,
                absolutePosition: { x: 100, y: 235 },
                bold: true,
                fontSize: 10,
            },
            {
                text: dni,
                absolutePosition: { x: 100, y: 256 },
                bold: true,
                fontSize: 10,
            },
            {
                text: correo_electronico,
                absolutePosition: { x: 175, y: 256 },
                bold: true,
                fontSize: 10,
            },
            {
                text: telefono,
                absolutePosition: { x: 81, y: 278 },
                bold: true,
                fontSize: 10,
            },
            {
                text: celular,
                absolutePosition: { x: 172, y: 278 },
                bold: true,
                fontSize: 10,
            },
            {
                //Tipo de servicio
                text: valorSer,
                absolutePosition: { x: 320, y: tipoSer },
                bold: true,
                fontSize: 14, //
            },
            {
                // La otra columna
                text: modelo,
                absolutePosition: { x: 458, y: 155 },
                bold: true,
                fontSize: 10,
            },
            {
                text: cMotor,
                absolutePosition: { x: 473, y: 179 },
                bold: true,
                fontSize: 10,
            },
            {
                text: cChasis,
                absolutePosition: { x: 473, y: 199 },
                bold: true,
                fontSize: 10,
            },
            {
                text: iAnioFab,
                absolutePosition: { x: 473, y: 217 },
                bold: true,
                fontSize: 10,
            },
            {
                text: cColor,
                absolutePosition: { x: 443, y: 235 },
                bold: true,
                fontSize: 10,
            },
            {
                text: cPlacaVeh,
                absolutePosition: { x: 443, y: 256 },
                bold: true,
                fontSize: 10,
            },
            {
                text: nKilometraje,
                absolutePosition: { x: 473, y: 278 },
                bold: true,
                fontSize: 10,
            },

            /* {
                text: mantenimiento_X,
                absolutePosition: { x:60 , y: 279 },
                bold: true,
                fontSize: 14,
            },
            {
                text: cambioAciete_X,
                absolutePosition: { x:60 , y: 297 },
                bold: true,
                fontSize: 14,
            },
            {
                text: reparacioMotor_x,
                absolutePosition: { x:60 , y: 322 },
                bold: true,
                fontSize: 14,
            },
            {
                text: descar_x,
                absolutePosition: { x:60 , y: 350 },
                bold: true,
                fontSize: 14,
            },
            {
                text: embrague_x,
                absolutePosition: { x:60 , y: 372 },
                bold: true,
                fontSize: 14,
            },
            {
                text: transmi_x,
                absolutePosition: { x:60 , y: 397 },
                bold: true,
                fontSize: 14,
            },
            {
                text: sisArras_x,
                absolutePosition: { x:60 , y: 422 },
                bold: true,
                fontSize: 14,
            },
            {
                text: fren_x,
                absolutePosition: { x:60 , y: 447 },
                bold: true,
                fontSize: 14,
            },
            
            {
                text: bate_x,
                absolutePosition: { x:183 , y: 279 },
                bold: true,
                fontSize: 14,
            },
            {
                text: revisitE_x,
                absolutePosition: { x:183 , y: 297 },
                bold: true,
                fontSize: 14,
            },
            {
                text: revisitIN_x,
                absolutePosition: { x:183 , y: 322 },
                bold: true,
                fontSize: 14,
            },
            {
                text: suspencio_x,
                absolutePosition: { x:183 , y: 350 },
                bold: true,
                fontSize: 14,
            },
            {
                text: aroneu_x,
                absolutePosition: { x:183 , y: 372 },
                bold: true,
                fontSize: 14,
            },
            {
                text: sistEsca_x,
                absolutePosition: { x:183 , y: 397 },
                bold: true,
                fontSize: 14,
            },
            {
                text: sistDirecc_x,
                absolutePosition: { x:183 , y: 422},
                bold: true,
                fontSize: 14,
            },
            {
                text: otro_x,
                absolutePosition: { x:183 , y: 447 },
                bold: true,
                fontSize: 14,
            }, */

            //Se oculta por el formato
           /* {
                //Montos de la orden
                text: mo_revision,
                absolutePosition: { x: 512, y: 269 },
                bold: true,
                fontSize: 10,
            },
            {
                text: mo_mecanica,
                absolutePosition: { x: 512, y: 286 },
                bold: true,
                fontSize: 10,
            },
            {
                text: terceros,
                absolutePosition: { x: 512, y: 306 },
                bold: true,
                fontSize: 10,
            },
            {
                text: otros_mo,
                absolutePosition: { x: 512, y: 324 },
                bold: true,
                fontSize: 10,
            },
            {
                text: sub_mo,
                absolutePosition: { x: 512, y: 340 },
                bold: true,
                fontSize: 10,
            },
            {
                text: respuestos,
                absolutePosition: { x: 512, y: 355 },
                bold: true,
                fontSize: 10,
            },
            {
                text: accesorios,
                absolutePosition: { x: 512, y: 372 },
                bold: true,
                fontSize: 10,
            },
            {
                //
                text: lubricantes,
                absolutePosition: { x: 512, y: 390 },
                bold: true,
                fontSize: 10,
            },
            {
                //
                text: otros_rep,
                absolutePosition: { x: 512, y: 411 },
                bold: true,
                fontSize: 10,
            },
            {
                text: sub_re,
                absolutePosition: { x: 512, y: 428 },
                bold: true,
                fontSize: 10,
            },
            {
                text: total,
                absolutePosition: { x: 512, y: 445 },
                bold: true,
                fontSize: 10,
            },*/
            {
                text: cObservaciones,
                absolutePosition: { x: 100, y: 324 },
                bold: true,
                fontSize: 10,
            },
             //Se oculta por el formato
            /*{
                text: modelo,
                absolutePosition: { x: 361, y: 580 },
                bold: true,
                fontSize: 10,
            },
            {
                text: cPlacaVeh,
                absolutePosition: { x: 500, y: 580 },
                bold: true,
                fontSize: 10,
            },
            {
                text: razonsocial_cliente,
                absolutePosition: { x: 361, y: 560 },
                bold: true,
                fontSize: 10,
            },*/
            {
                //Fecha inferiror
                text: fechEntrega,
                absolutePosition: { x: 490, y: 775 }, 
                bold: true,
                fontSize: 10,
            },
            {
                //Hora inferior
                text: "" + horaEnt + "",
                absolutePosition: { x: 520, y: 775 },
                bold: true,
                fontSize: 10,
            },

        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                alignment: 'right',
                margin: [0, 20, 0, 80]
            },
            subheader: {
                fontSize: 14
            },
            superMargin: {
                margin: [20, 0, 40, 0],
                fontSize: 15
            }
        }
    };


    var win = window.open('', '_blank');
    // if (response.type === 1) {
    //     pdfMake.createPdf(docDefinition).download();
    // } else if (response.type === 2) {
    //     pdfMake.createPdf(docDefinition).open({}, win);
    // } else {
    pdfMake.createPdf(docDefinition).print({}, win);
    // }

}
function create_pdf_ordenServicioXpress(response) {
    var data = response.data;
    // console.log(response.data);
    var dataCli = response.data_cliente;
    var getClienteNuevo = response.getClienteNuevo;
    var horaReal = response.fechacAc;
    // console.log(getClienteNuevo);
    // console.log(dataCli);
    // console.log(response.data_matenimiento);
    // console.log(response.data_detalle);
    // console.log(response.con);
    // console.log(response.nr);
    // console.log(data.dFecRec2);
    // console.log(data.dFecEntrega2);
    var data_dis = response.get_distrito;
    var get_vehiculo = response.get_vehiculo;
    var modelo = get_vehiculo[0].Modelo;
    console.log(data[0].idcCondicionPago);
    var horaEnt = data[0].horaRec;
    var horaEntre = data[0].horaEnt;
    var dni = '';
    var ruc = '';
    console.log("****");
    console.log(dataCli[0].documento);
    console.log("****");
    if (dataCli[0].tipodoc == '01') {
        dni = dataCli[0].documento;
    } else {
        ruc = dataCli[0].documento;
    }
    var clienteNuevo = '';
    if (getClienteNuevo[0].cantidadCliente == 0) {
        clienteNuevo = 'X';
    }
    console.log("clientes");
    console.log(clienteNuevo);
    var razonsocial_cliente = dataCli[0].razonsocial_cliente;
    var documento = dataCli[0].documento;
    var direccion = dataCli[0].direccion;
    var distrito = data_dis[0].cDistrito;
    var telefono = dataCli[0].telefono;
    var correo_electronico = dataCli[0].correo_electronico;
    var celular = dataCli[0].celular;
    var cMotor = data[0].cMotor;
    var cChasis = data[0].cChasis;
    var iAnioFab = data[0].iAnioFab;
    var cColor = data[0].cColor;
    var cPlacaVeh = data[0].cPlacaVeh;
    var nKilometraje = data[0].nKilometraje;

    var mo_revision = Number(data[0].mo_revision);
    var mo_mecanica = Number(data[0].mo_mecanica);
    var terceros = Number(data[0].terceros);
    var otros_mo = Number(data[0].otros_mo);
    var sub_mo = mo_revision + mo_mecanica + terceros + otros_mo;
    sub_mo = sub_mo.toFixed(2);
    var respuestos = Number(data[0].respuestos);
    var accesorios = Number(data[0].accesorios);
    var lubricantes = Number(data[0].lubricantes);
    var otros_rep = Number(data[0].otros_rep);
    var cObservaciones = data[0].cObservaciones;
    var sub_re = respuestos + accesorios + lubricantes + otros_rep;
    sub_re = sub_re.toFixed(2);
    var total = Number(data[0].total);


    var mcondicionPago = '';
    if (data[0].idcCondicionPago == '9') {
        mcondicionPago = 394;
    } else if (data[0].idcCondicionPago == '10') {
        mcondicionPago = 455;
    } else {
        mcondicionPago = 500;
    };
    var tipoSer = '';
    if (data[0].id_tipo == '1') {
        tipoSer = 166;
    } else if (data[0].id_tipo == '2') {
        tipoSer = 236;
    } else {
        tipoSer = 200;
    }

    var cambioAciete_X = "";
    var cambioAcieteFiltro_X = "";
    var cambioConjuntoTransmision_X = "";
    var otro_x = "";
    var ajusteLubriCadena_X = "";
    var reemplazoLamparas_X = "";
    var revision_X = "";
    var reemplazoCables_X = "";
    var reemplazoPastilla_X = "";
    var cambioNeumatico_X = "";
    var hondaAcces_X = "";

    var fechRecep = moment(data.dFecRec2).format('DD/MM/YYYY');
    var fechEntrega = moment(data.dFecEntrega2).format('DD/MM/YYYY');

    var data_matenimiento = response.data_matenimiento;
    _.each(data_matenimiento, function (b) {
        var vto = b.idMantenimiento;

        if (vto == 2) {
            cambioAciete_X = 'X';
        };
        if (vto == 16) {
            cambioAcieteFiltro_X = 'X';
        };
        if (vto == 17) {
            cambioConjuntoTransmision_X = 'X';
        };
        if (vto == 24) {
            ajusteLubriCadena_X = 'X';
        };
        if (vto == 18) {
            reemplazoLamparas_X = 'X';
        };
        if (vto == 19) {
            revision_X = 'X';
        };
        if (vto == 20) {
            reemplazoCables_X = 'X';
        };
        if (vto == 21) {
            reemplazoPastilla_X = 'X';
        };
        if (vto == 22) {
            cambioNeumatico_X = 'X';
        };
        if (vto == 23) {
            hondaAcces_X = 'X';
        };
        if (vto == 25) {
            otro_x = 'X';
        };

    });


    var docDefinition = {

        // pageOrientation: 'landscape',
        // pageSize: {
        //     width: 800,
        //     height: 'auto'
        // },
        pageSize: "A4",
        pageOrientation: 'portrait',
        pageMargins: [200, 200, 200, 200],
        content: [
            {
                text: "" + response.con + '-' + response.nr + "",

                fontSize: 12,
                bold: true,
                absolutePosition: { x: 460, y: 60 }
            },
            // {
            //     text: 'X',
            //     fontSize: 14,
            //     bold: true,
            //     absolutePosition: { x:mcondicionPago , y: 90 }
            // },

            // {
            //     text: fechEntrega,
            //     absolutePosition: { x:329 , y: 107 },
            //     bold: true,
            //     fontSize: 10,
            // },

            {
                text: razonsocial_cliente,
                absolutePosition: { x: 90, y: 215 },////////////esto 
                bold: true,
                fontSize: 10,
            },
            {
                text: modelo + '/' + iAnioFab,
                absolutePosition: { x: 374, y: 215 },///////esto
                bold: true,
                fontSize: 10,
            },

            {
                text: fechRecep,
                bold: true,
                fontSize: 10,
                // absolutePosition: { x:578 , y: 225 }///////esto
                absolutePosition: { x: 500, y: 215 }///////esto
            },
            {
                text: cChasis,
                absolutePosition: { x: 85, y: 240 },//////esto
                bold: true,
                fontSize: 10,
            },
            {
                text: cPlacaVeh,
                absolutePosition: { x: 300, y: 240 },/////esto
                bold: true,
                fontSize: 10,
            },
            {
                text: Number(nKilometraje),
                absolutePosition: { x: 436, y: 240 },/////esto
                bold: true,
                fontSize: 10,
            },
            {
                text: horaEnt,
                // absolutePosition: { x:595 , y: 248 },////esto
                absolutePosition: { x: 510, y: 240 },////esto
                bold: true,
                fontSize: 10,
            },
            {
                text: clienteNuevo,
                absolutePosition: { x: 61, y: 262 },////esto
                bold: true,
                fontSize: 10,
            },
            {
                text: telefono,
                absolutePosition: { x: 218, y: 262 },////esto
                bold: true,
                fontSize: 10,
            },
            {
                text: celular,
                absolutePosition: { x: 388, y: 262 },////esto
                bold: true,
                fontSize: 10,
            },
            {
                text: horaEntre,
                // absolutePosition: { x:571 , y: 272 },///esto
                absolutePosition: { x: 471, y: 262 },///esto
                bold: true,
                fontSize: 10,
            },
            {
                text: horaReal,
                // absolutePosition: { x:629 , y: 272 },///esto
                absolutePosition: { x: 525, y: 262 },///esto
                bold: true,
                fontSize: 10,
            },
            {
                text: direccion,
                absolutePosition: { x: 68, y: 288 },//esto
                bold: true,
                fontSize: 10,
            },
            {
                text: distrito,
                absolutePosition: { x: 374, y: 288 },//esto
                bold: true,
                fontSize: 10,
            },
            {
                text: correo_electronico,
                absolutePosition: { x: 68, y: 336 },//esto
                bold: true,
                fontSize: 10,
            },
            // {
            //     text: "razonsocial_cliente",
            //     absolutePosition: { x:102 , y: 214 },
            //     bold: true,
            //     fontSize: 10,
            // },
            // {
            //     text: dni,
            //     absolutePosition: { x:76 , y: 233 },
            //     bold: true,
            //     fontSize: 10,
            // },
            // {
            //     text: telefono,
            //     absolutePosition: { x:76 , y: 253 },
            //     bold: true,
            //     fontSize: 10,
            // },
            // {
            //     text: correo_electronico,
            //     absolutePosition: { x:152 , y: 233 },
            //     bold: true,
            //     fontSize: 10,
            // },

            // {
            //     text: 'X',
            //     absolutePosition: { x:285 , y: tipoSer },
            //     bold: true,
            //     fontSize: 14,
            // },

            //  {
            //     text: cMotor,
            //     absolutePosition: { x:420 , y: 163 },
            //     bold: true,
            //     fontSize: 10,
            // },


            //  {
            //     text: cColor,
            //     absolutePosition: { x:420 , y: 214 },
            //     bold: true,
            //     fontSize: 10,
            // },
            //  {
            //     text: cPlacaVeh,
            //     absolutePosition: { x:420 , y: 233 },
            //     bold: true,
            //     fontSize: 10,
            // },


            /*
            {
                text: cambioAciete_X,
                absolutePosition: { x: 68, y: 149 },
                bold: true,
                fontSize: 14,
            },
            {
                text: cambioAcieteFiltro_X,
                absolutePosition: { x: 68, y: 160 },
                bold: true,
                fontSize: 14,
            },
            {
                text: cambioConjuntoTransmision_X,
                absolutePosition: { x: 68, y: 172 },
                bold: true,
                fontSize: 14,
            },
            {
                text: ajusteLubriCadena_X,
                absolutePosition: { x: 68, y: 183 },
                bold: true,
                fontSize: 14,
            },
            {
                text: reemplazoLamparas_X,
                absolutePosition: { x: 68, y: 195 },
                bold: true,
                fontSize: 14,
            },
            {
                text: otro_x,
                absolutePosition: { x: 68, y: 210 },
                bold: true,
                fontSize: 14,
            },///
            {
                text: revision_X,
                absolutePosition: { x: 236, y: 139 },
                bold: true,
                fontSize: 14,
            },
            {
                text: reemplazoCables_X,
                absolutePosition: { x: 251, y: 160 },
                bold: true,
                fontSize: 14,
            },
            {
                text: reemplazoPastilla_X,
                absolutePosition: { x: 251, y: 172 },
                bold: true,
                fontSize: 14,
            },
            {
                text: cambioNeumatico_X,
                absolutePosition: { x: 251, y: 183 },
                bold: true,
                fontSize: 14,
            },
            {
                text: hondaAcces_X,
                absolutePosition: { x: 251, y: 195 },
                bold: true,
                fontSize: 14,
            },
            {
                text: hondaAcces_X,
                absolutePosition: { x: 251, y: 195 },
                bold: true,
                fontSize: 14,
            },
            */
            {
                text: "ST-" + response.nr,
                fontSize: 12,
                bold: true,
                absolutePosition: { x: 479, y: 166 }
            },
            {
                text: Number(total).toFixed(2),
                fontSize: 12,
                bold: true,
                absolutePosition: { x: 479, y: 195 }
            }
            
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                alignment: 'right',
                margin: [0, 20, 0, 80]
            },
            subheader: {
                fontSize: 14
            },
            superMargin: {
                margin: [20, 0, 40, 0],
                fontSize: 15
            }
        }
    };


    var win = window.open('', '_blank');
    // if (response.type === 1) {
    //     pdfMake.createPdf(docDefinition).download();
    // } else if (response.type === 2) {
    //     pdfMake.createPdf(docDefinition).open({}, win);
    // } else {
    pdfMake.createPdf(docDefinition).print({}, win);
    // }

}
function create_pdf_qualityControl(response) {
    var data = response.data;
    var detalle = response.detalle;
    var cliente = response.get_cliente;
    var vehiculo = response.get_vehiculo;
    var data_orden = response.data_orden;

    var razonsocial_cliente = cliente[0].razonsocial_cliente;
    var modelo = vehiculo[0].descripcion;
    var vin = data_orden[0].cChasis;
    var motor = data_orden[0].cMotor;

    var cOtros = data[0].cOtros;

    var procedimientoG = "";
    var cargaBat = "";
    var lavadoVehi = "";
    var tanqueComb = "";
    var llaveComb = "";
    var aceisMot = "";
    var refrige = "";
    var palancaFre = "";
    var frenoDelant = "";
    var fluidoFreno = "";
    var frenoTraser = "";
    var embrage = "";
    var acelerad = "";
    var fluidosRevi = "";
    var revisionLuce = "";
    var estrangulador = "";
    var valvulas = "";
    var cadenaTransmisi = "";
    var ralenti = "";
    var neumatico = "";
    var espejosRetro = "";
    var tuerca = "";
    var suspDelant = "";
    var suspTrase = "";
    var soportLat = "";
    var rayosRued = "";
    var lavadoVehiDes = "";
    var otros = "";

    _.each(detalle, function (b) {
        var vto = b.idrevision;
        if (vto == '1' && b.iRevisado == '1') {
            procedimientoG = 'X';
        };
        if (vto == '2' && b.iRevisado == '1') {
            cargaBat = 'X';
        };
        ////
        if (vto == '3' && b.iRevisado == '1') {
            lavadoVehi = 'X';
        };
        if (vto == '4' && b.iRevisado == '1') {
            tanqueComb = 'X';
        };
        if (vto == '5' && b.iRevisado == '1') {
            llaveComb = 'X';
        };
        if (vto == '6' && b.iRevisado == '1') {
            aceisMot = 'X';
        };
        if (vto == '14' && b.iRevisado == '1') {
            refrige = 'X';
        };
        //
        if (vto == '7' && b.iRevisado == '1') {
            palancaFre = 'X';
        };
        if (vto == '8' && b.iRevisado == '1') {
            frenoDelant = 'X';
        };
        if (vto == '9' && b.iRevisado == '1') {
            fluidoFreno = 'X';
        };
        if (vto == '10' && b.iRevisado == '1') {
            frenoTraser = 'X';
        };
        if (vto == '15' && b.iRevisado == '1') {
            embrage = 'X';
        };
        if (vto == '16' && b.iRevisado == '1') {
            acelerad = 'X';
        };
        if (vto == '17' && b.iRevisado == '1') {
            fluidosRevi = 'X';
        };
        if (vto == '18' && b.iRevisado == '1') {
            revisionLuce = 'X';
        };

        //////

        if (vto == '11' && b.iRevisado == '1') {
            estrangulador = 'X';
        };
        if (vto == '12' && b.iRevisado == '1') {
            valvulas = 'X';
        };
        if (vto == '13' && b.iRevisado == '1') {
            cadenaTransmisi = 'X';
        };
        if (vto == '19' && b.iRevisado == '1') {
            ralenti = 'X';
        };
        if (vto == '20' && b.iRevisado == '1') {
            neumatico = 'X';
        };
        if (vto == '21' && b.iRevisado == '1') {
            espejosRetro = 'X';
        };
        if (vto == '22' && b.iRevisado == '1') {
            tuerca = 'X';
        };

        if (vto == '23' && b.iRevisado == '1') {
            suspDelant = 'X';
        };
        if (vto == '24' && b.iRevisado == '1') {
            suspTrase = 'X';
        };
        if (vto == '25' && b.iRevisado == '1') {
            soportLat = 'X';
        };
        if (vto == '26' && b.iRevisado == '1') {
            rayosRued = 'X';
        };
        if (vto == '27' && b.iRevisado == '1') {
            lavadoVehiDes = 'X';
        };
        if (vto == '28' && b.iRevisado == '1') {
            otros = 'X';
        };




    });
    var otrosTex = '';
    if (cOtros != '') {
        otrosTex = 'X';
    };
    var docDefinition = {
        content: [
            {
                text: modelo,
                fontSize: 10,
                bold: true,
                absolutePosition: { x: 81, y: 115 }
            },
            {
                text: vin,
                fontSize: 10,
                bold: true,
                absolutePosition: { x: 81, y: 126 }
            },
            {
                text: razonsocial_cliente,
                fontSize: 10,
                bold: true,
                absolutePosition: { x: 292, y: 115 }
            },
            {
                text: motor,
                fontSize: 10,
                bold: true,
                absolutePosition: { x: 292, y: 126 }
            },

            //

            {
                text: procedimientoG,
                fontSize: 10,
                bold: true,
                absolutePosition: { x: 405, y: 139 }
            },
            {
                text: cargaBat,
                fontSize: 10,
                bold: true,
                absolutePosition: { x: 405, y: 155 }
            },
            //
            {
                text: lavadoVehi,
                fontSize: 10,
                bold: true,
                absolutePosition: { x: 423, y: 189 }
            },
            {
                text: tanqueComb,
                fontSize: 10,
                bold: true,
                absolutePosition: { x: 423, y: 205 }
            },
            {
                text: llaveComb,
                fontSize: 10,
                bold: true,
                absolutePosition: { x: 423, y: 221 }
            },
            {
                text: aceisMot,
                fontSize: 10,
                bold: true,
                absolutePosition: { x: 423, y: 236 }
            },
            {
                text: refrige,
                fontSize: 10,
                bold: true,
                absolutePosition: { x: 423, y: 252 }
            },


            ////
            {
                text: palancaFre,
                fontSize: 10,
                bold: true,
                absolutePosition: { x: 423, y: 289 }
            },
            {
                text: frenoDelant,
                fontSize: 10,
                bold: true,
                absolutePosition: { x: 423, y: 305 }
            },
            {
                text: fluidoFreno,
                fontSize: 10,
                bold: true,
                absolutePosition: { x: 423, y: 321 }
            },
            {
                text: frenoTraser,
                fontSize: 10,
                bold: true,
                absolutePosition: { x: 423, y: 336 }
            },
            {
                text: embrage,
                fontSize: 10,
                bold: true,
                absolutePosition: { x: 423, y: 352 }
            },
            {
                text: acelerad,
                fontSize: 10,
                bold: true,
                absolutePosition: { x: 423, y: 368 }
            },
            {
                text: fluidosRevi,
                fontSize: 10,
                bold: true,
                absolutePosition: { x: 423, y: 384 }
            },
            {
                text: revisionLuce,
                fontSize: 10,
                bold: true,
                absolutePosition: { x: 423, y: 400 }
            },

            /////

            {
                text: suspDelant,
                fontSize: 10,
                bold: true,
                absolutePosition: { x: 423, y: 431 }
            },
            {
                text: suspTrase,
                fontSize: 10,
                bold: true,
                absolutePosition: { x: 423, y: 447 }
            },
            {
                text: soportLat,
                fontSize: 10,
                bold: true,
                absolutePosition: { x: 423, y: 463 }
            },
            {
                text: rayosRued,
                fontSize: 10,
                bold: true,
                absolutePosition: { x: 423, y: 478 }
            },
            {
                text: lavadoVehiDes,
                fontSize: 10,
                bold: true,
                absolutePosition: { x: 423, y: 494 }
            },
            {
                text: otros,
                fontSize: 10,
                bold: true,
                absolutePosition: { x: 423, y: 510 }
            },
            ///////

            {
                text: estrangulador,
                fontSize: 10,
                bold: true,
                absolutePosition: { x: 223, y: 431 }
            },
            {
                text: valvulas,
                fontSize: 10,
                bold: true,
                absolutePosition: { x: 223, y: 447 }
            },
            {
                text: cadenaTransmisi,
                fontSize: 10,
                bold: true,
                absolutePosition: { x: 223, y: 463 }
            },
            {
                text: ralenti,
                fontSize: 10,
                bold: true,
                absolutePosition: { x: 223, y: 478 }
            },
            {
                text: neumatico,
                fontSize: 10,
                bold: true,
                absolutePosition: { x: 223, y: 494 }
            },
            {
                text: espejosRetro,
                fontSize: 10,
                bold: true,
                absolutePosition: { x: 223, y: 510 }
            },
            {
                text: tuerca,
                fontSize: 10,
                bold: true,
                absolutePosition: { x: 223, y: 526 }
            },
            {
                text: cOtros,
                fontSize: 10,
                bold: true,
                absolutePosition: { x: 249, y: 523 }
            },
            {
                text: otrosTex,
                fontSize: 10,
                bold: true,
                absolutePosition: { x: 423, y: 526 }
            },
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                alignment: 'right',
                margin: [0, 20, 0, 80]
            },
            subheader: {
                fontSize: 14
            },
            superMargin: {
                margin: [20, 0, 40, 0],
                fontSize: 15
            }
        }
    };


    var win = window.open('', '_blank');

    pdfMake.createPdf(docDefinition).print({}, win);
    // }

}
function create_pdf_movimientoCuadreCaja(response) {
    var dataDenomicacion = response.dataDenomicacion;
    var simboloMoneda = response.simboloMoneda;
    var simboloMonedaDolar = response.simboloMonedaDolar;
    var usuario = response.usuario;
    console.log(dataDenomicacion);
    var data = response.dataCaDet;
    var fec = response.feca;
    var dataCaja = response.dataMc;
    var totalefectSol = dataCaja[0].totalEfectivo;
    var totalefectDol = dataCaja[0].totalEfectivoDol;
    var fecAct = response.fechacA;
    var dataCajaDetForSol = response.dataCajaDetForSol;
    var dataCajaDetEfeSol = response.dataCajaDetEfeSol;
    var dataCajaDetForDol = response.dataCajaDetForDol;
    var dataCajaDetEfeDol = response.dataCajaDetEfeDol;
    var dataCajaDetEfeSolAper = response.dataCajaDetEfeSolAper;
    var dataCajaDetEfeDolAper = response.dataCajaDetEfeDolAper;
    var dataSolesEfec = [];
    var tableSolesDenomicacionFS = [];
    var tableSolesDenomicacionFD = [];
    var dataSolesMovimientos = [];
    var totalSolesEfec = 0;
    var totalSolesForm = 0;
    var tituloSolesEfec = [
        {
            text: 'COMPROBANTES',
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
        {
            text: 'TOTAL',
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
    ];
    var tituloSolesForm = [
        {
            text: 'MOVIMIENTO DE EFECTIVO',
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        {
            text: 'TOTAL',
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
    ];
    dataSolesEfec.push(tituloSolesEfec);
    dataSolesMovimientos.push(tituloSolesForm);


    var dataEfecSolApe = [
        {
            text: 'APERTURA',
            fontSize: 8,

        },
        {
            text: Number(dataCajaDetEfeSolAper[0].monto).toFixed(2),
            fontSize: 8,
            alignment: 'right'

        },
    ];
    dataSolesMovimientos.push(dataEfecSolApe);
    var dta = 0;
    var dtb = 0;
    var dtd = 0;
    var dts = 0;
    _.each(dataDenomicacion, function (b) {
        if (b.idMoneda == '1') {
            dts = dts + Number(b.monto);
        } else {
            dtd = dtd + Number(b.monto);
        }

    });
    _.each(dataDenomicacion, function (b) {
        if (b.idMoneda == '1') {
            var dataTabla = [
                {
                    text: Number(b.valor).toFixed(2),
                    fontSize: 8,
                },
                {
                    text: Number(b.cantidad),
                    fontSize: 8,
                    alignment: 'right'

                },
                {
                    text: Number(b.monto).toFixed(2),
                    fontSize: 8,
                    alignment: 'right'

                },
            ];
            if (Number(b.valor) > 5) {
                dta = dta + Number(b.monto);
            } else {
                dtb = dtb + Number(b.monto);
            }
            if (Number(b.valor) == 10) {
                console.log("entroab");
                var totalde = [
                    {
                        text: "",
                        fontSize: 8,
                        border: [false, false, false, false],
                    },
                    {
                        text: "",
                        fontSize: 8,
                        alignment: 'right',
                        border: [false, false, false, false],

                    },
                    {
                        text: simboloMoneda[0].Simbolo + " " + Number(dtb).toFixed(2),
                        fontSize: 8,
                        alignment: 'right',
                        bold: true,

                    },

                ];
                tableSolesDenomicacionFS.push(totalde)
            }
            tableSolesDenomicacionFS.push(dataTabla)
            if (Number(b.valor) == 200) {
                var totalde2 = [
                    {
                        text: "",
                        fontSize: 8,
                        border: [false, false, false, false],
                    },
                    {
                        text: "",
                        fontSize: 8,
                        alignment: 'right',
                        border: [false, false, false, false],

                    },
                    {
                        text: simboloMoneda[0].Simbolo + " " + Number(dta).toFixed(2),
                        fontSize: 8,
                        alignment: 'right',
                        bold: true,

                    },

                ];
                tableSolesDenomicacionFS.push(totalde2)
            }
        } else {
            var dataTablad = [
                {
                    text: Number(b.valor).toFixed(2),
                    fontSize: 8,
                },
                {
                    text: Number(b.cantidad),
                    fontSize: 8,
                    alignment: 'right'

                },
                {
                    text: Number(b.monto).toFixed(2),
                    fontSize: 8,
                    alignment: 'right'

                },
            ];
            tableSolesDenomicacionFD.push(dataTablad);
        };

    });
    var totaldeT2 = [
        {
            text: "",
            fontSize: 8,
            border: [false, false, false, false],
        },
        {
            text: "",
            fontSize: 8,
            alignment: 'right',
            border: [false, false, false, false],

        },
        {
            text: simboloMonedaDolar[0].Simbolo + " " + Number(dtd).toFixed(2),
            fontSize: 8,
            alignment: 'right',
            bold: true,

        },

    ];
    var tdsoles = Number(dta) + Number(dtb);
    var totalde22 = [
        {
            text: "",
            fontSize: 8,
            border: [false, false, false, false],
        },
        {
            text: "",
            fontSize: 8,
            alignment: 'right',
            border: [false, false, false, false],

        },
        {
            text: simboloMoneda[0].Simbolo + " " + Number(tdsoles).toFixed(2),
            fontSize: 8,
            alignment: 'right',
            bold: true,

        },

    ];
    tableSolesDenomicacionFS.push(totalde22);
    tableSolesDenomicacionFD.push(totaldeT2);
    _.each(dataCajaDetEfeSol, function (b) {
        var monto = Number(b.monto).toFixed(2);
        totalSolesEfec = Number(monto) + Number(totalSolesEfec);
        var dataEfecSol = [
            {
                text: b.descripcion_tipo,
                fontSize: 8,

            },
            {
                text: monto,
                fontSize: 8,
                alignment: 'right'

            },
        ];
        dataSolesMovimientos.push(dataEfecSol);
    });

    totalSolesEfec = Number(totalSolesEfec) + Number(dataCajaDetEfeSolAper[0].monto);
    var TotalSolesEfec = [
        {
            text: 'TOTAL EFECTIVO',
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        {
            text: Number(totalefectSol).toFixed(2),
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'right'

        },
    ];
    dataSolesMovimientos.push(TotalSolesEfec);
    ////////////////
    var titulo2SolesForm = [
        {
            text: 'VENTAS FORMA DE PAGO',
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        {
            text: '',
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
    ];
    dataSolesMovimientos.push(titulo2SolesForm);
    //////////
    _.each(dataCajaDetForSol, function (b) {
        var monto = Number(b.monto).toFixed(2);
        totalSolesForm = Number(monto) + Number(totalSolesForm);
        var dataFormSol = [
            {
                text: b.descripcion_subtipo,
                fontSize: 8,


            },
            {
                text: monto,
                fontSize: 8,
                alignment: 'right'

            },
        ];
        dataSolesMovimientos.push(dataFormSol);
    });
    // totalSolesForm=Number(totalSolesForm).toFixed(2);
    var TotalSolesForm = [
        {
            text: 'TOTAL VENTA',
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        {
            text: totalSolesForm.toFixed(2),
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'right'

        },
    ];
    dataSolesMovimientos.push(TotalSolesForm);

    /////////////////////////////////////////////
    var dataDolEfec = [];
    var dataDolMovimientos = [];
    var totalDolEfec = 0;
    var totalDolForm = 0;
    var tituloDolEfec = [
        {
            text: 'COMPROBANTES',
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
        {
            text: 'TOTAL',
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
    ];
    var tituloDolForm = [
        {
            text: 'MOVIMIENTO DE EFECTIVO',
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        {
            text: 'TOTAL',
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
    ];
    dataDolEfec.push(tituloDolEfec);
    dataDolMovimientos.push(tituloDolForm);
    var dataEfecDolApe = [
        {
            text: 'APERTURA',
            fontSize: 8,

        },
        {
            text: Number(dataCajaDetEfeDolAper[0].monto).toFixed(2),
            fontSize: 8,
            alignment: 'right'

        },
    ];
    dataDolMovimientos.push(dataEfecDolApe);

    _.each(dataCajaDetEfeDol, function (b) {
        var monto = Number(b.monto).toFixed(2);
        totalDolEfec = Number(monto) + Number(totalDolEfec);
        var dataEfecSol = [
            {
                text: b.descripcion_tipo,
                fontSize: 8,

            },
            {
                text: monto,
                fontSize: 8,
                alignment: 'right'

            },
        ];
        dataDolMovimientos.push(dataEfecSol);
    });
    totalDolEfec = Number(totalDolEfec) + Number(dataCajaDetEfeDolAper[0].monto);

    var TotalDolEfec = [
        {
            text: 'TOTAL EFECTIVO',
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        {
            text: Number(totalefectDol).toFixed(2),
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'right'

        },
    ];
    dataDolMovimientos.push(TotalDolEfec);
    ////////////////
    var titulo2DolForm = [
        {
            text: 'VENTAS FORMA DE PAGO',
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        {
            text: '',
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
    ];
    dataDolMovimientos.push(titulo2DolForm);
    //////////
    _.each(dataCajaDetForDol, function (b) {
        var monto = Number(b.monto).toFixed(2);
        totalDolForm = Number(monto) + Number(totalDolForm);
        var dataFormSol = [
            {
                text: b.descripcion_subtipo,
                fontSize: 8,


            },
            {
                text: monto,
                fontSize: 8,
                alignment: 'right'

            },
        ];
        dataDolMovimientos.push(dataFormSol);
    });
    // totalDolForm=Number(totalDolForm).toFixed(2);
    var TotalDolForm = [
        {
            text: 'TOTAL VENTA',
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        {
            text: totalDolForm.toFixed(2),
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'right'

        },
    ];
    dataDolMovimientos.push(TotalDolForm);

    var docDefinition = {
        pageOrientation: 'landscape',
        content: [
            {
                text: "Caja: " + fec,
                fontSize: 15,
                bold: true,
                absolutePosition: { x: 40, y: 20 }
            },
            {
                text: "Fecha de Impresión: " + fecAct,
                fontSize: 15,
                bold: true,
                absolutePosition: { x: 460, y: 20 }
            },
            {
                style: 'tableExample',
                table: {
                    body: [
                        [
                            [{ text: 'SOLES', style: 'header', fontSize: 10 },
                            {
                                style: 'tableExample',
                                table: {
                                    widths: [250, 90],
                                    body: dataSolesMovimientos,
                                },

                            },
                            ],
                            [{ text: 'DÓLARES', style: 'header', fontSize: 10, margin: [20, 0, 0, 0] },
                            {
                                margin: [20, 0, 0, 0],
                                style: 'tableExample',
                                table: {
                                    widths: [250, 90],
                                    body: dataDolMovimientos,
                                }
                            }
                            ]

                        ],
                        [
                            [
                                { text: 'DENOMINACIÓN', style: 'header', fontSize: 10 },
                                {
                                    style: 'tableExample',
                                    table: {
                                        widths: [60, 60, 90],
                                        body: tableSolesDenomicacionFS,
                                    },

                                },
                            ],
                            [
                                { text: 'DENOMINACIÓN', style: 'header', fontSize: 10, margin: [20, 0, 0, 0] },
                                {
                                    margin: [20, 0, 0, 0],
                                    style: 'tableExample',
                                    table: {
                                        widths: [60, 60, 90],
                                        body: tableSolesDenomicacionFD,
                                    },

                                },
                            ]
                        ],
                        [
                            [
                                { text: 'Usuario: ' + usuario, style: 'header', fontSize: 12, margin: [0, 20, 0, 0] },
                            ],
                            [
                                { text: '', style: 'header', fontSize: 12, margin: [20, 0, 0, 0] },
                            ]
                        ],

                    ],

                },
                layout: 'noBorders',
            },
            // { text: 'SOLES', style: 'header',fontSize: 13},

            // {
            //     text: "DÓLARES",
            //     fontSize: 13,
            //     bold: true,
            //     absolutePosition: { x:460 , y: 40 }
            // },  
            // {  
            //     absolutePosition: { x:460 , y: 60 },
            //     style: 'tableExample',
            //     table: {
            //         widths: [250,90],
            //         body: dataDolMovimientos,
            //     }

            // },
            // {
            //     text: '',
            //     absolutePosition: { x: 300, y: 100 },
            //     pageBreak: 'after'
            // },
            // { text: 'DOLARES', style: 'header',fontSize: 13},
            // {
            //     absolutePosition: { x:40 , y: 60 },
            //     style: 'tableExample',
            //     table: {
            //         widths: [250, 90],
            //         body: dataDolMovimientos,
            //     }

            // },
            // {  
            //     absolutePosition: { x:460 , y: 60 },
            //     style: 'tableExample',
            //     table: {
            //         widths: [250,90],
            //         body: dataDolMovimientos,
            //     }

            // },
        ],
        styles: {

            header: {
                fontSize: 18,
                bold: true,
                alignment: 'left',
            },
            subheader: {
                fontSize: 14
            },
            superMargin: {
                margin: [20, 0, 40, 0],
                fontSize: 15
            }
        }
    };

    var win = window.open('', '_blank');
    // var win = window.open('', '_blank');

    pdfMake.createPdf(docDefinition).print({}, win);
    // }

}
function crearTablasoles(data, dataBodyReportes, idMoneda) {
    var subtituloSolesEfec = [
        { fontSize: 7, text: "CÓDIGO", fillColor: '#eeeeee' },
        { fontSize: 7, text: "FECHA", fillColor: '#eeeeee' },
        { fontSize: 7, text: "DOCUMENTO VENTA", fillColor: '#eeeeee' },
        { fontSize: 7, text: "CLIENTE", fillColor: '#eeeeee' },
        { fontSize: 7, text: "VENDEDOR", fillColor: '#eeeeee' },
        { fontSize: 7, text: "MONTO TOTAL", fillColor: '#eeeeee' },
        { fontSize: 7, text: "ESTADO", fillColor: '#eeeeee' },
        { fontSize: 7, text: "REPUESTO", fillColor: '#eeeeee' },
        { fontSize: 7, text: "ACEITE", fillColor: '#eeeeee' },
        { fontSize: 7, text: "SERVICIO", fillColor: '#eeeeee' },
        { fontSize: 7, text: "SERVICIO TERCERO", fillColor: '#eeeeee' },
        { fontSize: 7, text: "MOSTRADOR", fillColor: '#eeeeee' },
        { fontSize: 7, text: "TALLER", fillColor: '#eeeeee' },
    ];
    dataBodyReportes.push(subtituloSolesEfec);
    var cr = 0;
    var ca = 0;
    var cs = 0;
    var ct = 0;
    var cv = 0;
    var cta = 0;
    var sim = '';

    data.map(function (index) {
        if (idMoneda == index.IdMoneda) {
            var estado = 'Registrado';
            if (index.estado == '2') {
                estado = 'Vigente';
            } else if (index.estado == '3') {
                estado = 'Por Aprobar';
            } else if (index.estado == '4') {
                estado = 'Aprobado';
            } else if (index.estado == '5') {
                estado = 'Rechazado';
            } else if (index.estado == '6') {
                estado = 'Facturado';
            } else if (index.estado == '7') {
                estado = 'Despachado';
            }

            var mostrador = 0;
            var taller = 0;
            if (index.origen == 'V') {
                mostrador = Number(index.REPUESTO) + Number(index.ACEITE);
            } else {
                taller = Number(index.REPUESTO) + Number(index.ACEITE);
            };
            var vREPUESTO = index.REPUESTO;
            var vACEITE = index.ACEITE;
            var vSERVICIO = index.SERVICIO;
            var vTERCEROS = index.TERCEROS;
            if (!index.REPUESTO) {
                vREPUESTO = 0;
            };
            if (!index.ACEITE) {
                vACEITE = 0;
            };
            if (!index.SERVICIO) {
                vSERVICIO = 0;
            };
            if (!index.TERCEROS) {
                vTERCEROS = 0;
            };
            cr = cr + Number(vREPUESTO);
            ca = ca + Number(vACEITE);
            cs = cs + Number(vSERVICIO);
            ct = ct + Number(vTERCEROS);
            cv = cv + Number(mostrador);
            cta = cta + Number(taller);
            sim = index.Simbolo;
            var subtituloSolesEfec = [
                { fontSize: 8, text: index.cCodConsecutivo + '-' + index.nConsecutivo },
                { fontSize: 8, text: moment(index.fecha).format('DD/MM/YYYY'), },
                { fontSize: 8, text: index.documento_ven },
                { fontSize: 8, text: index.razonsocial_cliente },
                { fontSize: 8, text: index.vendedor },
                { fontSize: 8, text: index.Simbolo + ' ' + addCommas(redondeodecimale(index.monto_total).toFixed(2)), },
                { fontSize: 8, text: estado, },
                { fontSize: 8, text: index.Simbolo + ' ' + addCommas(redondeodecimale(vREPUESTO).toFixed(2)), },
                { fontSize: 8, text: index.Simbolo + ' ' + addCommas(redondeodecimale(vACEITE).toFixed(2)), },
                { fontSize: 8, text: index.Simbolo + ' ' + addCommas(redondeodecimale(vSERVICIO).toFixed(2)) },
                { fontSize: 8, text: index.Simbolo + ' ' + addCommas(redondeodecimale(vTERCEROS).toFixed(2)), },
                { fontSize: 8, text: index.Simbolo + ' ' + addCommas(redondeodecimale(mostrador).toFixed(2)) },
                { fontSize: 8, text: index.Simbolo + ' ' + addCommas(redondeodecimale(taller).toFixed(2)) },
            ];
            dataBodyReportes.push(subtituloSolesEfec);
        }
    });
    var totales = [
        { fontSize: 7, text: "", border: [false, false, false, false], },
        { fontSize: 7, text: "", border: [false, false, false, false], },
        { fontSize: 7, text: " ", border: [false, false, false, false], },
        { fontSize: 7, text: "", border: [false, false, false, false], },
        { fontSize: 7, text: "", border: [false, false, false, false], },
        { fontSize: 7, text: "", border: [false, false, false, false], },
        { fontSize: 7, text: "", border: [false, false, false, false], },
        { fontSize: 7, text: sim + '' + addCommas(redondeodecimale(cr).toFixed(2)), fillColor: '#eeeeee' },
        { fontSize: 7, text: sim + '' + addCommas(redondeodecimale(ca).toFixed(2)), fillColor: '#eeeeee' },
        { fontSize: 7, text: sim + '' + addCommas(redondeodecimale(cs).toFixed(2)), fillColor: '#eeeeee' },
        { fontSize: 7, text: sim + '' + addCommas(redondeodecimale(ct).toFixed(2)), fillColor: '#eeeeee' },
        { fontSize: 7, text: sim + '' + addCommas(redondeodecimale(cv).toFixed(2)), fillColor: '#eeeeee' },
        { fontSize: 7, text: sim + '' + addCommas(redondeodecimale(cta).toFixed(2)), fillColor: '#eeeeee' },
    ];
    dataBodyReportes.push(totales);
    return dataBodyReportes;
}
function createReporteRepuestoPDF(response) {
    var img = response.img;
    var simboloMoneda = response.simboloMoneda;
    var data = response.data;
    var dataBodyReportes = [];
    var dataBodyReportesDol = [];
    console.log(simboloMoneda);
    console.log(data);




    var dats = crearTablasoles(data, dataBodyReportes, 1);
    var datd = crearTablasoles(data, dataBodyReportesDol, 2);


    var docDefinition = {

        // a string or { width: number, height: number }
        pageSize: "A4",
        // by default we use portrait, you can change it to landscape if you wish
        pageOrientation: 'landscape',
        // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
        // pageMargins: [15, 15, 15, 15],
        content: [
            {
                columns: [
                    {
                        width: 'auto',
                        // normally you could put image directly here, but since you're
                        // setting width to auto, we need an artificial wrapping-node
                        // so that column-width does not interfere with image width
                        stack: [
                            {
                                image: response.img,
                                fit: [150, 150]
                            }
                        ]
                    },
                    { text: "REPORTE DE REPUESTOS", style: 'header' }
                ]
            },
            { text: 'Fecha: ' + moment().format('DD [de] MMMM [de] YYYY, h:mm A'), style: 'subheader' },
            { text: 'SOLES' },
            {
                margin: [0, 0, 0, 0],
                style: 'tableExample',
                table: {
                    widths: [40, 40, 80, 80, 80, 40, 40, 40, 40, 40, 40, 40, 40],
                    body:
                        dats,
                },

            },
            { text: 'DÓLARES' },
            {
                margin: [0, 0, 0, 0],
                style: 'tableExample',
                table: {
                    widths: [40, 40, 80, 80, 80, 40, 40, 40, 40, 40, 40, 40, 40],
                    body:
                        datd,
                },

            },
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [-90, 0, 0, 0],
                alignment: 'center'
            },
            subheader: {
                fontSize: 12,
                bold: true,
                margin: [0, 0, 0, 0],
                alignment: 'center'
            },
            footer: {
                fontSize: 10,
                margin: [0, 10, 40, 0],
                alignment: 'right'
            }
        },
        footer: function (currentPage, pageCount) {
            return {
                columns: [{
                    text: 'Página ' + currentPage.toString() + ' de ' + pageCount,
                    style: 'footer'
                }]
            }
            // return currentPage.toString() + ' de ' + pageCount;
        }
    };

    var win = window.open('', '_blank');
    // if (response.type === 1) {
    //     pdfMake.createPdf(docDefinition).download();
    // } else if (response.type === 2) {
    //     pdfMake.createPdf(docDefinition).open({}, win);
    // } else {
    //     pdfMake.createPdf(docDefinition).print({}, win);
    // }
    pdfMake.createPdf(docDefinition).print({}, win);
}
function createReporteMensualPDF(response) {
    var img = response.img;
    var simboloMoneda = response.simboloMoneda;
    var data = response.data;
    var data_orden = response.data_orden;
    var data_compania = response.data_compania;
    var usuario = response.usuario;
    var cambio = response.cambio;
    var dataBodyReportes = [];
    var dataBodyReportesDol = [];
    var mes = response.mes;
    console.log(simboloMoneda);
    var m1 = 0;
    var m2 = 0;
    var mp = 0;
    var mm = 0;
    var mc = 0;
    var mr = 0;
    var mg = 0;
    var mi = 0;
    var ma = 0;
    var sra = 0;
    var rpa = 0;
    var lua = 0;

    var m1b = 0;
    var m2b = 0;
    var mpb = 0;
    var mmb = 0;
    var mcb = 0;
    var mrb = 0;
    var mgb = 0;
    var mib = 0;
    var mab = 0;
    var srb = 0;
    var rpb = 0;
    var lua = 0;
    var tota = 0;
    var totb = 0;
    var montoRep = 0;
    var montoAcie = 0;
    var montoServi = 0;
    var m1r = 0;
    var m2r = 0;
    var mpr = 0;
    var mmr = 0;
    var mcr = 0;
    var mrr = 0;
    var mgr = 0;
    var mir = 0;
    var mar = 0;

    var m1s = 0;
    var m2s = 0;
    var mps = 0;
    var mms = 0;
    var mcs = 0;
    var mrs = 0;
    var mgs = 0;
    var mis = 0;
    var mas = 0;

    var m1l = 0;
    var m2l = 0;
    var mpl = 0;
    var mml = 0;
    var mcl = 0;
    var mrl = 0;
    var mgl = 0;
    var mil = 0;
    var mal = 0;


    var m1br = 0;
    var m2br = 0;
    var mpbr = 0;
    var mmbr = 0;
    var mcbr = 0;
    var mrbr = 0;
    var mgbr = 0;
    var mibr = 0;
    var mabr = 0;

    var m1bs = 0;
    var m2bs = 0;
    var mpbs = 0;
    var mmbs = 0;
    var mcbs = 0;
    var mrbs = 0;
    var mgbs = 0;
    var mibs = 0;
    var mabs = 0;

    var m1bl = 0;
    var m2bl = 0;
    var mpbl = 0;
    var mmbl = 0;
    var mcbl = 0;
    var mrbl = 0;
    var mgbl = 0;
    var mibl = 0;
    var mabl = 0;

    var totaMoa = 0;
    var totaRea = 0;
    var totaACa = 0;

    var totaMob = 0;
    var totaReb = 0;
    var totaACb = 0;
    var tofinR = 0;
    var tofinL = 0;

    data.map(function (index) {
        // if(index.IdMoneda==1){
        //      montoRep=Number(index.REPUESTO)/Number(cambio[0].Mensaje);
        //      montoAcie=Number(index.ACEITE)/Number(cambio[0].Mensaje);
        //      montoServi=Number(index.totalservicio)/Number(cambio[0].Mensaje);
        // }
        // else{
        montoRep = Number(index.REPUESTO);
        montoAcie = Number(index.ACEITE);
        montoServi = Number(index.MontoSerPro);
        // }
        if (index.id_tipoveh == 1) {
            if (index.id_tipomant == 1) {

                m1r = Number(m1r) + Number(montoRep);
                m1s = Number(m1s) + Number(montoServi);
                m1l = Number(m1l) + Number(montoAcie);
            } else if (index.id_tipomant == 2) {

                m2r = Number(m2r) + Number(montoRep);
                m2s = Number(m2s) + Number(montoServi);
                m2l = Number(m2l) + Number(montoAcie);
            } else if (index.id_tipomant == 3) {

                mpr = Number(mpr) + Number(montoRep);
                mps = Number(mps) + Number(montoServi);
                mpl = Number(mpl) + Number(montoAcie);
            } else if (index.id_tipomant == 4) {

                mmr = Number(mmr) + Number(montoRep);
                mms = Number(mms) + Number(montoServi);
                mml = Number(mml) + Number(montoAcie);
            } else if (index.id_tipomant == 5) {

                mcr = Number(mcr) + Number(montoRep);
                mcs = Number(mcs) + Number(montoServi);
                mcl = Number(mcl) + Number(montoAcie);
            } else if (index.id_tipomant == 6) {

                mrr = Number(mrr) + Number(montoRep);
                mrs = Number(mrs) + Number(montoServi);
                mrl = Number(mrl) + Number(montoAcie);
            } else if (index.id_tipomant == 7) {

                mgr = Number(mgr) + Number(montoRep);
                mgs = Number(mgs) + Number(montoServi);
                mgl = Number(mgl) + Number(montoAcie);
            } else if (index.id_tipomant == 8) {

                mir = Number(mir) + Number(montoRep);
                mis = Number(mis) + Number(montoServi);
                mil = Number(mil) + Number(montoAcie);
            } else if (index.id_tipomant == 8) {

                mar = Number(mar) + Number(montoRep);
                mas = Number(mas) + Number(montoServi);
                mal = Number(mal) + Number(montoAcie);
            }
            totaRea = Number(totaRea) + montoRep;
            console.log("entro bl");
            console.log(totaMoa);
            totaMoa = Number(montoServi) + totaMoa;
            totaACa = Number(montoAcie) + totaACa;
        } else {
            console.log("entro acá");
            if (index.id_tipomant == 1) {

                m1br = Number(m1br) + Number(montoRep);
                m1bs = Number(m1bs) + Number(montoServi);
                m1bl = Number(m1bl) + Number(montoAcie);

            } else if (index.id_tipomant == 2) {

                m2br = Number(m2br) + Number(montoRep);
                m2bs = Number(m2bs) + Number(montoServi);
                m2bl = Number(m2bl) + Number(montoAcie);
            } else if (index.id_tipomant == 3) {

                mpbr = Number(mpbr) + Number(montoRep);
                mpbs = Number(mpbs) + Number(montoServi);
                mpbl = Number(mpbl) + Number(montoAcie);
            } else if (index.id_tipomant == 4) {

                mmbr = Number(mmbr) + Number(montoRep);
                mmbs = Number(mmbs) + Number(montoServi);
                mmbl = Number(mmbl) + Number(montoAcie);
            } else if (index.id_tipomant == 5) {

                mcbr = Number(mcbr) + Number(montoRep);
                mcbs = Number(mcbs) + Number(montoServi);
                mcbl = Number(mcbl) + Number(montoAcie);

            } else if (index.id_tipomant == 6) {

                mrbr = Number(mrbr) + Number(montoRep);
                mrbs = Number(mrbs) + Number(montoServi);
                mrbl = Number(mrbl) + Number(montoAcie);

            } else if (index.id_tipomant == 7) {

                mgbr = Number(mgbr) + Number(montoRep);
                mgbs = Number(mgbs) + Number(montoServi);
                mgbl = Number(mgbl) + Number(montoAcie);
            } else if (index.id_tipomant == 8) {

                mibr = Number(mibr) + Number(montoRep);
                mibs = Number(mibs) + Number(montoServi);
                mibl = Number(mibl) + Number(montoAcie);
            } else if (index.id_tipomant == 8) {

                mabr = Number(mabr) + Number(montoRep);
                mabs = Number(mabs) + Number(montoServi);
                mabl = Number(mabl) + Number(montoAcie);
            }
            totaReb = Number(montoRep) + totaReb;
            totaMob = Number(montoServi) + totaMob;
            totaACb = Number(montoAcie) + totaACb;

        }
    });
    data_orden.map(function (index) {
        // if(index.IdMoneda==1){
        //      montoRep=Number(index.REPUESTO)/Number(cambio[0].Mensaje);
        //      montoAcie=Number(index.ACEITE)/Number(cambio[0].Mensaje);
        //      montoServi=Number(index.totalservicio)/Number(cambio[0].Mensaje);
        // }
        // else{


        montoServi = Number(index.MontoSerOrden);
        // }
        if (index.id_tipoveh == 1) {
            if (index.id_tipomant == 1) {
                m1 = m1 + 1;
                m1s = Number(m1s) + Number(montoServi);
            } else if (index.id_tipomant == 2) {
                m2 = m2 + 1;
                m2s = Number(m2s) + Number(montoServi);
            } else if (index.id_tipomant == 3) {
                mp = mp + 1;

                mps = Number(mps) + Number(montoServi);

            } else if (index.id_tipomant == 4) {
                mm = mm + 1;

                mms = Number(mms) + Number(montoServi);

            } else if (index.id_tipomant == 5) {
                mc = mc + 1;

                mcs = Number(mcs) + Number(montoServi);

            } else if (index.id_tipomant == 6) {
                mr = mr + 1;
                mrs = Number(mrs) + Number(montoServi);

            } else if (index.id_tipomant == 7) {
                mg = mg + 1;

                mgs = Number(mgs) + Number(montoServi);

            } else if (index.id_tipomant == 8) {
                mi = mi + 1;

                mis = Number(mis) + Number(montoServi);

            } else if (index.id_tipomant == 8) {
                ma = ma + 1;

                mas = Number(mas) + Number(montoServi);

            }

            totaMoa = Number(montoServi) + totaMoa;

            tota = tota + 1;
        } else {
            console.log("entro acá");
            if (index.id_tipomant == 1) {
                m1b = m1b + 1;

                m1bs = Number(m1bs) + Number(montoServi);


            } else if (index.id_tipomant == 2) {
                m2b = m2b + 1;

                m2bs = Number(m2bs) + Number(montoServi);

            } else if (index.id_tipomant == 3) {
                mpb = mpb + 1;

                mpbs = Number(mpbs) + Number(montoServi);

            } else if (index.id_tipomant == 4) {
                mmb = mmb + 1;

                mmbs = Number(mmbs) + Number(montoServi);

            } else if (index.id_tipomant == 5) {
                mcb = mcb + 1;

                mcbs = Number(mcbs) + Number(montoServi);


            } else if (index.id_tipomant == 6) {
                mrb = mrb + 1;

                mrbs = Number(mrbs) + Number(montoServi);


            } else if (index.id_tipomant == 7) {
                mgb = mgb + 1;

                mgbs = Number(mgbs) + Number(montoServi);

            } else if (index.id_tipomant == 8) {
                mib = mib + 1;

                mibs = Number(mibs) + Number(montoServi);

            } else if (index.id_tipomant == 8) {
                mab = mab + 1;

                mabs = Number(mabs) + Number(montoServi);

            }

            totaMob = Number(montoServi) + totaMob;
            totb = totb + 1;
        }
    });
    tofinR = Number(totaReb) + Number(totaRea);
    tofinL = Number(totaACb) + Number(totaACa);

    console.log(totaMoa);
    console.log("ddd");
    if (mes == 1) {
        mes = 'Enero';
    } else if (mes == 2) {
        mes = 'Febrero';
    } else if (mes == 3) {
        mes = 'Marzo';
    }
    else if (mes == 4) {
        mes = 'Abril';
    }
    else if (mes == 5) {
        mes = 'Mayo';
    }
    else if (mes == 6) {
        mes = 'Junio';
    }
    else if (mes == 7) {
        mes = 'Julio';
    }
    else if (mes == 8) {
        mes = 'Agosto';
    }
    else if (mes == 9) {
        mes = 'Septiembre';
    } else if (mes == 10) {
        mes = 'Octubre';
    }
    else if (mes == 11) {
        mes = 'Noviembre';
    }
    else if (mes == 12) {
        mes = 'Diciembre';
    }
    var Anio = response.Anio;
    console.log(data);
    console.log(mes);
    console.log(Anio);
    console.log(usuario);
    console.log(cambio);
    // moment().format('DD [de] MMMM [de] YYYY, h:mm A')
    var docDefinition = {

        // a string or { width: number, height: number }
        pageSize: "A4",
        // by default we use portrait, you can change it to landscape if you wish
        pageOrientation: 'portrait',
        pageMargins: [15, 20, 15, 20],
        // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
        // pageMargins: [15, 15, 15, 15],
        content: [
            {
                columns: [
                    {
                        width: 'auto',
                        // normally you could put image directly here, but since you're
                        // setting width to auto, we need an artificial wrapping-node
                        // so that column-width does not interfere with image width
                        stack: [
                            {
                                image: response.img,
                                fit: [120, 120]
                            }
                        ]
                    },
                    { text: "RESUMEN MENSUAL DE ACTIVIDADES", style: 'header' }
                ],

            },
            {
                text: [
                    {
                        fontSize: 10,
                        text: "Conseccionario/STA: ",
                        bold: true,
                        alignment: 'center',
                    },
                    {
                        fontSize: 10,
                        text: data_compania[0].RazonSocial,
                        alignment: 'center',
                    },
                ]
            },
            {
                columns: [
                    {
                        margin: [90, 0, 0, 0],
                        text: [
                            {
                                fontSize: 10,
                                text: "Fecha Reporte: ",
                                bold: true,

                            },
                            {
                                fontSize: 10,
                                text: moment().format('DD [de] MMMM [de] YYYY'),
                            },
                        ]
                    },
                    {
                        text: [
                            {
                                fontSize: 10,
                                text: "Responsable: ",
                                bold: true,
                                margin: [0, 0, 0, 0],
                            },
                            {
                                fontSize: 10,
                                text: usuario[0].name,
                            },
                        ]
                    },

                ],

            },
            {
                columns: [
                    {
                        margin: [90, 0, 0, 0],
                        text: [
                            {
                                fontSize: 10,
                                text: "Año : ",
                                bold: true,

                            },
                            {
                                fontSize: 10,
                                text: Anio,
                            },
                        ]
                    },
                    {
                        margin: [10, 0, 0, 0],
                        text: [
                            {
                                fontSize: 10,
                                text: "Mes: ",
                                bold: true,

                            },
                            {
                                fontSize: 10,
                                text: mes,
                            },
                        ]
                    },
                    {
                        text: [

                            {
                                fontSize: 10,
                                text: "Tipo de cambio: ",
                                bold: true,
                                margin: [0, 0, 0, 0],
                            },
                            {
                                fontSize: 10,
                                text: cambio[0].Mensaje,
                            },
                        ]
                    },

                ],

            },
            {
                fontSize: 8,
                text: '\n',
                style: 'oficinas',
            },
            {
                style: 'tableExample',
                width: '100%',
                table: {
                    widths: [550],
                    body: [
                        [{ text: 'Reporte de Sercicio Técnico', fillColor: '#eeeeee', fontSize: 10, alignment: 'center' }],
                        [{ text: 'Ingresos por Sercicio 2W Taller', fillColor: '#eeeeee', fontSize: 10, alignment: 'center' }],
                    ]
                },

            },
            {
                fontSize: 8,
                text: '\n',
                style: 'oficinas',
            },
            {
                columns: [
                    {
                        style: 'tableExample',
                        width: '50%',
                        table: {
                            widths: [120, 140],
                            body: [
                                [{ border: [false, false, false, false], text: 'Tipo de Mantenimiento', bold: true, fontSize: 10, alignment: 'center' }, { border: [false, false, false, false], text: 'Cantidad de Servicios (Taller)', bold: true, fontSize: 10, alignment: 'center' }],
                                [{ border: [false, false, false, false], text: "\n", fontSize: 10, alignment: 'center', }, { border: [false, false, false, false], text: '', fontSize: 10, alignment: 'center' }],
                                [{ border: [false, false, false, false], text: 'Mantenimiento 1:', fontSize: 10, }, { text: m1, fontSize: 10, alignment: 'center' }],
                                [{ border: [false, false, false, false], text: 'Mantenimiento 2', fontSize: 10, }, { text: m2, fontSize: 10, alignment: 'center' }],
                                [{ border: [false, false, false, false], text: 'Mantenimiento Periódico:', fontSize: 10, }, { text: mp, fontSize: 10, alignment: 'center' }],
                                [{ border: [false, false, false, false], text: 'Reparación (Mecánica):', fontSize: 10, }, { text: mm, fontSize: 10, alignment: 'center' }],
                                [{ border: [false, false, false, false], text: 'Reparación (Colisión):', fontSize: 10, }, { text: mc, fontSize: 10, alignment: 'center' }],
                                [{ border: [false, false, false, false], text: 'Servicio Rápido:', fontSize: 10, }, { text: mr, fontSize: 10, alignment: 'center' }],
                                [{ border: [false, false, false, false], text: 'Reclamo de Garantía:', fontSize: 10, }, { text: mg, fontSize: 10, alignment: 'center' }],
                                [{ border: [false, false, false, false], text: 'Orden de Servicio Interna:', fontSize: 10, }, { text: mi, fontSize: 10, alignment: 'center' }],
                                [{ border: [false, false, false, false], text: 'Accesorios:', fontSize: 10, }, { text: ma, fontSize: 10, alignment: 'center' }],
                                [{ border: [false, false, false, false], text: 'Total:', fontSize: 10, bold: true }, { text: tota, fontSize: 10, alignment: 'center', bold: true }],
                            ]
                        },

                    },
                    {
                        fontSize: 8,
                        text: ' ',
                    },
                    {
                        style: 'tableExample',
                        width: '50%',
                        table: {
                            widths: [83, 83, 83],
                            body: [
                                [{ text: 'Facturación (' + simboloMoneda[0].Simbolo + ')', border: [false, false, false, false], bold: true, fontSize: 10, alignment: 'center', colSpan: 3 }, {}, {}],
                                [{ border: [false, false, false, false], text: 'Mano de Obra', bold: true, fontSize: 10, alignment: 'center' }, { border: [false, false, false, false], text: 'Repuestos', bold: true, fontSize: 10, alignment: 'center' }, { border: [false, false, false, false], text: 'Lubricantes', bold: true, fontSize: 10, alignment: 'center' }],
                                [{ text: addCommas(redondeodecimale(m1s).toFixed(2)), fontSize: 10, alignment: 'center' }, { text: addCommas(redondeodecimale(m1r).toFixed(2)), fontSize: 10, alignment: 'center' }, { text: addCommas(redondeodecimale(m1l).toFixed(2)), fontSize: 10, alignment: 'center' }],
                                [{ text: addCommas(redondeodecimale(m2s).toFixed(2)), fontSize: 10, alignment: 'center' }, { text: addCommas(redondeodecimale(m2r).toFixed(2)), fontSize: 10, alignment: 'center' }, { text: addCommas(redondeodecimale(m2l).toFixed(2)), fontSize: 10, alignment: 'center' }],
                                [{ text: addCommas(redondeodecimale(mps).toFixed(2)), fontSize: 10, alignment: 'center' }, { text: addCommas(redondeodecimale(mpr).toFixed(2)), fontSize: 10, alignment: 'center' }, { text: addCommas(redondeodecimale(mpl).toFixed(2)), fontSize: 10, alignment: 'center' }],
                                [{ text: addCommas(redondeodecimale(mms).toFixed(2)), fontSize: 10, alignment: 'center' }, { text: addCommas(redondeodecimale(mmr).toFixed(2)), fontSize: 10, alignment: 'center' }, { text: addCommas(redondeodecimale(mml).toFixed(2)), fontSize: 10, alignment: 'center' }],
                                [{ text: addCommas(redondeodecimale(mcs).toFixed(2)), fontSize: 10, alignment: 'center' }, { text: addCommas(redondeodecimale(mcr).toFixed(2)), fontSize: 10, alignment: 'center' }, { text: addCommas(redondeodecimale(mcl).toFixed(2)), fontSize: 10, alignment: 'center' }],
                                [{ text: addCommas(redondeodecimale(mrs).toFixed(2)), fontSize: 10, alignment: 'center' }, { text: addCommas(redondeodecimale(mrr).toFixed(2)), fontSize: 10, alignment: 'center' }, { text: addCommas(redondeodecimale(mrl).toFixed(2)), fontSize: 10, alignment: 'center' }],
                                [{ text: addCommas(redondeodecimale(mgs).toFixed(2)), fontSize: 10, alignment: 'center' }, { text: addCommas(redondeodecimale(mgr).toFixed(2)), fontSize: 10, alignment: 'center' }, { text: addCommas(redondeodecimale(mgl).toFixed(2)), fontSize: 10, alignment: 'center' }],
                                [{ text: addCommas(redondeodecimale(mis).toFixed(2)), fontSize: 10, alignment: 'center' }, { text: addCommas(redondeodecimale(mir).toFixed(2)), fontSize: 10, alignment: 'center' }, { text: addCommas(redondeodecimale(mil).toFixed(2)), fontSize: 10, alignment: 'center' }],
                                [{ text: addCommas(redondeodecimale(mas).toFixed(2)), fontSize: 10, alignment: 'center' }, { text: addCommas(redondeodecimale(mar).toFixed(2)), fontSize: 10, alignment: 'center' }, { text: addCommas(redondeodecimale(mal).toFixed(2)), fontSize: 10, alignment: 'center' }],
                                [{ text: addCommas(redondeodecimale(totaMoa).toFixed(2)), fontSize: 10, alignment: 'center', bold: true }, { bold: true, text: addCommas(redondeodecimale(totaRea).toFixed(2)), fontSize: 10, alignment: 'center' }, { bold: true, text: addCommas(redondeodecimale(totaACa).toFixed(2)), fontSize: 10, alignment: 'center' }],
                            ]
                        },

                    },
                ],

            },
            {
                fontSize: 8,
                text: '\n',
                style: 'oficinas',
            },
            {
                style: 'tableExample',
                width: '100%',
                table: {
                    widths: [550],
                    body: [
                        [{ text: 'Ingresos por Sercicio 3W Taller', fillColor: '#eeeeee', fontSize: 10, alignment: 'center' }],
                    ]
                },

            },
            {
                fontSize: 8,
                text: '\n',
                style: 'oficinas',
            },
            {
                columns: [
                    {
                        style: 'tableExample',
                        width: '50%',
                        table: {
                            widths: [120, 140],
                            body: [
                                [{ border: [false, false, false, false], text: 'Tipo de Mantenimiento', bold: true, fontSize: 10, alignment: 'center' }, { border: [false, false, false, false], text: 'Cantidad de Servicios (Taller)', bold: true, fontSize: 10, alignment: 'center' }],
                                [{ border: [false, false, false, false], text: "\n", fontSize: 10, alignment: 'center', }, { border: [false, false, false, false], text: '', fontSize: 10, alignment: 'center' }],
                                [{ border: [false, false, false, false], text: 'Mantenimiento 1:', fontSize: 10, }, { text: m1b, fontSize: 10, alignment: 'center' }],
                                [{ border: [false, false, false, false], text: 'Mantenimiento 2', fontSize: 10, }, { text: m2b, fontSize: 10, alignment: 'center' }],
                                [{ border: [false, false, false, false], text: 'Mantenimiento Periódico:', fontSize: 10, }, { text: mpb, fontSize: 10, alignment: 'center' }],
                                [{ border: [false, false, false, false], text: 'Reparación (Mecánica):', fontSize: 10, }, { text: mmb, fontSize: 10, alignment: 'center' }],
                                [{ border: [false, false, false, false], text: 'Reparación (Colisión):', fontSize: 10, }, { text: mcb, fontSize: 10, alignment: 'center' }],
                                [{ border: [false, false, false, false], text: 'Servicio Rápido:', fontSize: 10, }, { text: mrb, fontSize: 10, alignment: 'center' }],
                                [{ border: [false, false, false, false], text: 'Reclamo de Garantía:', fontSize: 10, }, { text: mgb, fontSize: 10, alignment: 'center' }],
                                [{ border: [false, false, false, false], text: 'Orden de Servicio Interna:', fontSize: 10, }, { text: mib, fontSize: 10, alignment: 'center' }],
                                [{ border: [false, false, false, false], text: 'Accesorios:', fontSize: 10, }, { text: mab, fontSize: 10, alignment: 'center' }],
                                [{ border: [false, false, false, false], text: 'Total:', fontSize: 10, bold: true }, { text: totb, fontSize: 10, alignment: 'center', bold: true }],
                            ]
                        },

                    },
                    {
                        fontSize: 8,
                        text: ' ',
                    },
                    {
                        style: 'tableExample',
                        width: '50%',
                        table: {
                            widths: [83, 83, 83],
                            body: [
                                [{ text: 'Facturación (' + simboloMoneda[0].Simbolo + ')', border: [false, false, false, false], bold: true, fontSize: 10, alignment: 'center', colSpan: 3 }, {}, {}],
                                [{ border: [false, false, false, false], text: 'Mano de Obra', bold: true, fontSize: 10, alignment: 'center' }, { border: [false, false, false, false], text: 'Repuestos', bold: true, fontSize: 10, alignment: 'center' }, { border: [false, false, false, false], text: 'Lubricantes', bold: true, fontSize: 10, alignment: 'center' }],
                                [{ text: addCommas(redondeodecimale(m1bs).toFixed(2)), fontSize: 10, alignment: 'center' }, { text: addCommas(redondeodecimale(m1br).toFixed(2)), fontSize: 10, alignment: 'center' }, { text: addCommas(redondeodecimale(m1bl).toFixed(2)), fontSize: 10, alignment: 'center' }],
                                [{ text: addCommas(redondeodecimale(m2bs).toFixed(2)), fontSize: 10, alignment: 'center' }, { text: addCommas(redondeodecimale(m2br).toFixed(2)), fontSize: 10, alignment: 'center' }, { text: addCommas(redondeodecimale(m2bl).toFixed(2)), fontSize: 10, alignment: 'center' }],
                                [{ text: addCommas(redondeodecimale(mpbs).toFixed(2)), fontSize: 10, alignment: 'center' }, { text: addCommas(redondeodecimale(mpbr).toFixed(2)), fontSize: 10, alignment: 'center' }, { text: addCommas(redondeodecimale(mpbl).toFixed(2)), fontSize: 10, alignment: 'center' }],
                                [{ text: addCommas(redondeodecimale(mmbs).toFixed(2)), fontSize: 10, alignment: 'center' }, { text: addCommas(redondeodecimale(mmbr).toFixed(2)), fontSize: 10, alignment: 'center' }, { text: addCommas(redondeodecimale(mmbl).toFixed(2)), fontSize: 10, alignment: 'center' }],
                                [{ text: addCommas(redondeodecimale(mcbs).toFixed(2)), fontSize: 10, alignment: 'center' }, { text: addCommas(redondeodecimale(mcbr).toFixed(2)), fontSize: 10, alignment: 'center' }, { text: addCommas(redondeodecimale(mcbl).toFixed(2)), fontSize: 10, alignment: 'center' }],
                                [{ text: addCommas(redondeodecimale(mrbs).toFixed(2)), fontSize: 10, alignment: 'center' }, { text: addCommas(redondeodecimale(mrbr).toFixed(2)), fontSize: 10, alignment: 'center' }, { text: addCommas(redondeodecimale(mrbl).toFixed(2)), fontSize: 10, alignment: 'center' }],
                                [{ text: addCommas(redondeodecimale(mgbs).toFixed(2)), fontSize: 10, alignment: 'center' }, { text: addCommas(redondeodecimale(mgbr).toFixed(2)), fontSize: 10, alignment: 'center' }, { text: addCommas(redondeodecimale(mgbl).toFixed(2)), fontSize: 10, alignment: 'center' }],
                                [{ text: addCommas(redondeodecimale(mibs).toFixed(2)), fontSize: 10, alignment: 'center' }, { text: addCommas(redondeodecimale(mibr).toFixed(2)), fontSize: 10, alignment: 'center' }, { text: addCommas(redondeodecimale(mibl).toFixed(2)), fontSize: 10, alignment: 'center' }],
                                [{ text: addCommas(redondeodecimale(mabs).toFixed(2)), fontSize: 10, alignment: 'center' }, { text: addCommas(redondeodecimale(mabr).toFixed(2)), fontSize: 10, alignment: 'center' }, { text: addCommas(redondeodecimale(mabl).toFixed(2)), fontSize: 10, alignment: 'center' }],
                                [{ text: addCommas(redondeodecimale(totaMob).toFixed(2)), fontSize: 10, alignment: 'center', bold: true }, { bold: true, text: addCommas(redondeodecimale(totaReb).toFixed(2)), fontSize: 10, alignment: 'center' }, { bold: true, text: addCommas(redondeodecimale(totaACb).toFixed(2)), fontSize: 10, alignment: 'center' }],
                            ]
                        },

                    },
                ],

            },
            {
                fontSize: 8,
                text: '\n',
                style: 'oficinas',
            },
            {
                style: 'tableExample',
                width: '100%',
                table: {
                    widths: [550],
                    body: [
                        [{ text: 'Ingresos por Venta de Repuestos y Lubricantes ', fillColor: '#eeeeee', fontSize: 10, alignment: 'center' }],
                    ]
                },

            },
            {
                fontSize: 8,
                text: '\n',
                style: 'oficinas',
            },
            {
                style: 'tableExample',
                width: '50%',
                table: {
                    widths: [100, 100, 100],
                    body: [

                        [{ border: [false, false, false, false], text: ' ', bold: true, fontSize: 10, alignment: 'center' }, { border: [false, false, false, false], text: 'Venta de Repuestos', bold: true, fontSize: 10, alignment: 'center' }, { border: [false, false, false, false], text: 'Venta de Lubricantes', bold: true, fontSize: 10, alignment: 'center' }],
                        [{ text: 'Total', fontSize: 10, alignment: 'center' }, { text: addCommas(redondeodecimale(tofinR).toFixed(2)), fontSize: 10, alignment: 'center' }, { text: addCommas(redondeodecimale(tofinL).toFixed(2)), fontSize: 10, alignment: 'center' }],

                    ]
                },

            },



        ],
        styles: {
            header: {
                fontSize: 16,
                bold: true,
                margin: [-90, 0, 0, 0],
                alignment: 'center'
            },
            subheader: {
                fontSize: 12,
                bold: true,
                margin: [0, 0, 0, 0],
                alignment: 'center'
            },
            footer: {
                fontSize: 10,
                margin: [0, 10, 40, 0],
                alignment: 'right'
            }
        },
        footer: function (currentPage, pageCount) {
            return {
                columns: [{
                    text: 'Página ' + currentPage.toString() + ' de ' + pageCount,
                    style: 'footer'
                }]
            }
            // return currentPage.toString() + ' de ' + pageCount;
        }
    };

    var win = window.open('', '_blank');
    // if (response.type === 1) {
    //     pdfMake.createPdf(docDefinition).download();
    // } else if (response.type === 2) {
    //     pdfMake.createPdf(docDefinition).open({}, win);
    // } else {
    //     pdfMake.createPdf(docDefinition).print({}, win);
    // }
    pdfMake.createPdf(docDefinition).print({}, win);
}
function createReporteGuiaRemisionPDF(response) {
    var img = response.img;
    var data = response.data;
    var data_articulo_noser = response.data_articulo_noser;
    var data_articulo_ser = response.data_articulo_ser;
    var data_compania = response.data_compania;
    var total_di = data_compania[0].direcciones_oficinas;
    var tot = total_di.split('|');
    var dataBodyArticulos = [];
    var unto = '';
    var cont = 0;
    console.log(data);
    for (var i = 0; i < tot.length; i++) {
        unto = unto + tot[i] + '\n';
    }
    // var simboloMoneda=response.simboloMoneda;
    // var data=response.data;
    var subtituloSolesEfec = [
        { fontSize: 9, text: "CODIGO", fillColor: '#eeeeee', },
        { fontSize: 9, text: "DESCRIPCIÓN", fillColor: '#eeeeee', },
        { fontSize: 9, text: "CANTIDAD", fillColor: '#eeeeee', },
        { fontSize: 9, text: "UNID. DE MEDIDA", fillColor: '#eeeeee', },
        { fontSize: 9, text: "PESO TOTAL", fillColor: '#eeeeee', },
    ];
    dataBodyArticulos.push(subtituloSolesEfec);

    data_articulo_noser.map(function (index) {
        cont = cont + Number(index.cantidad);
        var subtituloSolesEfec = [
            { fontSize: 9, text: index.code_article, },
            { fontSize: 9, text: index.producto, },
            { fontSize: 9, text: Number(index.cantidad), },
            { fontSize: 9, text: index.unidadMedida, },
            { fontSize: 9, text: "" },
        ];
        dataBodyArticulos.push(subtituloSolesEfec);
    });
    data_articulo_ser.map(function (index) {
        cont = cont + 1;
        var subtituloSolesEfec = [
            { fontSize: 9, text: index.code_article, },
            { fontSize: 9, text: index.producto, },
            { fontSize: 9, text: Number(1), },
            { fontSize: 9, text: index.unidadMedida, },
            { fontSize: 9, text: "" },
        ];
        dataBodyArticulos.push(subtituloSolesEfec);
    });
    var totalfin = [
        { fontSize: 9, text: "", fillColor: '#eeeeee', border: [true, true, false, true] },
        { fontSize: 9, text: "Total:", fillColor: '#eeeeee', border: [false, true, false, true], },
        { fontSize: 9, text: cont, fillColor: '#eeeeee', border: [false, true, false, true], },
        { fontSize: 9, text: "", fillColor: '#eeeeee', border: [false, true, false, true], },
        { fontSize: 9, text: "", fillColor: '#eeeeee', border: [false, true, true, true], },
    ];
    dataBodyArticulos.push(totalfin);

    var docDefinition = {

        // a string or { width: number, height: number }
        pageSize: "A4",
        // by default we use portrait, you can change it to landscape if you wish
        pageOrientation: 'portrait',
        // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
        pageMargins: [15, 20, 15, 20],
        content: [
            {
                columns: [
                    {
                        width: 'auto',
                        // normally you could put image directly here, but since you're
                        // setting width to auto, we need an artificial wrapping-node
                        // so that column-width does not interfere with image width
                        stack: [
                            {
                                image: response.img,
                                fit: [200, 200]
                            }
                        ]
                    },
                    { text: data_compania[0].RazonSocial, style: 'headerTra' },
                ],

            },
            {
                columns: [
                    {
                        text: [
                            {
                                fontSize: 8,
                                text: unto + '\n',
                                style: 'oficinas',
                            },
                            {
                                margin: [0, 30, 0, 0],
                                fontSize: 9,
                                text: data_compania[0].lema1 + '\n',
                                bold: true,
                                alignment: 'center'
                            },
                            {
                                margin: [0, 30, 0, 0],
                                fontSize: 10,
                                text: data_compania[0].lema2,
                                bold: true,
                                alignment: 'center'
                            },
                        ]
                    },
                    {
                        style: 'tableExample',
                        width: '40%',
                        table: {
                            widths: [180],
                            body: [
                                [{ text: 'RUC:' + data_compania[0].Ruc, bold: true, fontSize: 10, alignment: 'center' }],
                                [{ text: 'GUIA RESMISION REMITENTE', bold: true, fontSize: 10, alignment: 'center' }],
                                [{ text: data[0].cCodConsecutivo + '-' + data[0].nConsecutivo, bold: true, fontSize: 10, alignment: 'center' }]
                            ]
                        },

                    },
                ],

            },
            {
                fontSize: 8,
                text: '\n',
                style: 'oficinas',
            },
            {
                text: [
                    {
                        margin: [0, 30, 0, 0],
                        fontSize: 9,
                        text: 'MOTIVO DEL TRASLADO: ',
                        bold: true,
                    },
                    {
                        margin: [0, 30, 0, 0],
                        fontSize: 9,
                        text: data[0].traslado,
                    },
                ]
            },
            {
                fontSize: 8,
                text: '\n',
                style: 'oficinas',
            },
            {
                columns: [
                    {
                        style: 'tableExample',
                        table: {
                            widths: [250],
                            body: [
                                [{
                                    border: [true, true, true, false],
                                    text: [
                                        {
                                            fontSize: 9,
                                            text: "Punto de Partida: ",
                                            bold: true,
                                        },
                                        {
                                            fontSize: 9,
                                            text: data[0].puntoPartida,
                                        },
                                    ]
                                },
                                ],
                                [{
                                    border: [true, false, true, false],
                                    text: [
                                        {
                                            fontSize: 9,
                                            text: "Fecha de Emision: ",
                                            bold: true,
                                        },
                                        {
                                            fontSize: 9,
                                            text: moment(data[0].fechaEmision).format('DD/MM/YYYY'),
                                        },
                                    ]
                                },
                                ],
                                [{
                                    border: [true, false, true, false],
                                    text: [
                                        {
                                            fontSize: 9,
                                            text: "Fecha de Inicio del Traslado: ",
                                            bold: true,
                                        },
                                        {
                                            fontSize: 9,
                                            text: moment(data[0].fechaInicioTraslado).format('DD/MM/YYYY'),
                                        },
                                    ]
                                },
                                ],
                                [{
                                    border: [true, false, true, true],
                                    text: [
                                        {
                                            fontSize: 9,
                                            text: "Costo Minimo: ",
                                            bold: true,
                                        },
                                        {
                                            fontSize: 9,
                                            text: redondeodecimale(data[0].costoMini).toFixed(2),
                                        },
                                    ]
                                },
                                ],

                            ]
                        },

                    },
                    {
                        width: '5%', fontSize: 8,
                        text: '',
                    },
                    {
                        style: 'tableExample',
                        table: {
                            widths: [250],
                            body: [
                                [{
                                    border: [true, true, true, false],
                                    text: [
                                        {
                                            fontSize: 9,
                                            text: "Punto de LLegada: ",
                                            bold: true,

                                        },
                                        {
                                            fontSize: 9,
                                            text: data[0].puntoLlega,

                                        },
                                    ]
                                },
                                ],
                                [{
                                    border: [true, false, true, false],
                                    text: [
                                        {
                                            fontSize: 9,
                                            text: "Nombre o Razon Social del Destinatario: ",
                                            bold: true,
                                        },
                                        {
                                            fontSize: 9,
                                            text: data[0].razonSocialDestinatario,
                                        },
                                    ]
                                },
                                ],
                                [{
                                    border: [true, false, true, false],
                                    text: [
                                        {
                                            fontSize: 9,
                                            text: "R.U.C: ",
                                            bold: true,
                                        },
                                        {
                                            fontSize: 9,
                                            text: data[0].rucDestinatario,
                                        },
                                    ]
                                },
                                ],
                                [{
                                    border: [true, false, true, true],
                                    text: [
                                        {
                                            fontSize: 9,
                                            text: " ",
                                            bold: true,
                                        },
                                        {
                                            fontSize: 9,
                                            text: " ",
                                        },
                                    ]
                                },
                                ],

                            ]
                        },

                    },
                ],

            },
            {
                fontSize: 8,
                text: '\n',
                style: 'oficinas',
            },
            {
                columns: [
                    {
                        style: 'tableExample',
                        table: {
                            widths: [250],
                            body: [
                                [{
                                    border: [true, true, true, true],
                                    fillColor: '#eeeeee',
                                    text: [
                                        {
                                            fontSize: 9,
                                            text: "UNIDAD TRANSPORTE Y CONDUCTOR  ",

                                            bold: true,

                                        },
                                    ]
                                },
                                ],
                                [{
                                    border: [true, true, true, false],
                                    text: [
                                        {
                                            fontSize: 9,
                                            text: "Marca y Número de Placa: ",
                                            bold: true,
                                        },
                                        {
                                            fontSize: 9,
                                            text: data[0].marca + ' , ' + data[0].placa,
                                        },
                                    ]
                                },
                                ],
                                [{
                                    border: [true, false, true, false],
                                    text: [
                                        {
                                            fontSize: 9,
                                            text: "N° de Constancia de Inscripción: ",
                                            bold: true,
                                        },
                                        {
                                            fontSize: 9,
                                            text: data[0].nroConstanciaInscripcion,
                                        },
                                    ]
                                },
                                ],
                                [{
                                    border: [true, false, true, false],
                                    text: [
                                        {
                                            fontSize: 9,
                                            text: "N°(s) de licencia(s) de Conducir : ",
                                            bold: true,
                                        },
                                        {
                                            fontSize: 9,
                                            text: data[0].nroLicenciaConductor,
                                        },
                                    ]
                                },
                                ],
                                [{
                                    border: [true, false, true, true],
                                    text: [
                                        {
                                            fontSize: 9,
                                            text: "",
                                            bold: true,
                                        },
                                        {
                                            fontSize: 9,
                                            text: "",
                                        },
                                    ]
                                },
                                ],

                            ]
                        },

                    },
                    {
                        width: '5%', fontSize: 8,
                        text: '',
                    },
                    {
                        style: 'tableExample',
                        table: {
                            widths: [250],
                            body: [
                                [{
                                    border: [true, true, true, true],
                                    fillColor: '#eeeeee',
                                    text: [
                                        {
                                            fontSize: 9,
                                            text: "EMPRESA DE TRANSPORTE ",
                                            bold: true,


                                        },
                                    ]
                                },
                                ],
                                [{
                                    border: [true, true, true, false],
                                    text: [
                                        {
                                            fontSize: 9,
                                            text: "Nombre o Razon Social: ",
                                            bold: true,

                                        },
                                        {
                                            fontSize: 9,
                                            text: data[0].razonSocialEtransporte,

                                        },
                                    ]
                                },
                                ],
                                [{
                                    border: [true, false, true, false],
                                    text: [
                                        {
                                            fontSize: 9,
                                            text: "R.U.C: ",
                                            bold: true,
                                        },
                                        {
                                            fontSize: 9,
                                            text: data[0].rucEtransporte,
                                        },
                                    ]
                                },
                                ],
                                [{
                                    border: [true, false, true, false],
                                    text: [
                                        {
                                            fontSize: 9,
                                            text: "",
                                            bold: true,
                                        },
                                        {
                                            fontSize: 9,
                                            text: "",
                                        },
                                    ]
                                },
                                ],
                                [{
                                    border: [true, false, true, true],
                                    text: [
                                        {
                                            fontSize: 9,
                                            text: " ",
                                            bold: true,
                                        },
                                        {
                                            fontSize: 9,
                                            text: " ",
                                        },
                                    ]
                                },
                                ],

                            ]
                        },

                    },
                ],

            },
            {
                fontSize: 8,
                text: '\n',
                style: 'oficinas',
            },
            {
                style: 'tableExample',
                table: {
                    widths: [80, 201, 50, 90, 90],
                    body:
                        dataBodyArticulos,
                },

            },
            // {text: '', style: 'subheader',margin: [20, 20, 20, 20]},
            //  {   margin: [0,0,0,0],
            //             style: 'tableExample',
            //             table: {
            //                 widths: [100,40,60,60],
            //                 body:
            //                 dataBodyReportestotales, 
            //             },

            // },
            // {text: 'DÓLARES'},
            // {   margin: [0,0,0,0],
            //             style: 'tableExample',
            //             table: {
            //                 widths: [40,40,80,80,80,40,40,40,40,40,40,40,40],
            //                 body:
            //                 datd, 
            //             },

            // },
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [-90, 0, 0, 0],
                alignment: 'center'
            },
            oficinas: {
                fontSize: 8,
                margin: [20, 0, 0, 0],
                alignment: 'center'
            },
            headerTra: {
                fontSize: 19,
                bold: true,
                margin: [20, 20, 0, 0],
                alignment: 'center'
            },
            subheader: {
                fontSize: 12,
                bold: true,
                margin: [0, 0, 0, 0],
                alignment: 'center'
            },
            footer: {
                fontSize: 10,
                margin: [0, 0, 40, 0],
                alignment: 'right'
            }
        },
        footer: function (currentPage, pageCount) {
            return {
                columns: [{
                    text: 'Página ' + currentPage.toString() + ' de ' + pageCount,
                    style: 'footer'
                }]
            }
            // return currentPage.toString() + ' de ' + pageCount;
        }
    };

    var win = window.open('', '_blank');
    // if (response.type === 1) {
    //     pdfMake.createPdf(docDefinition).download();
    // } else if (response.type === 2) {
    //     pdfMake.createPdf(docDefinition).open({}, win);
    // } else {
    //     pdfMake.createPdf(docDefinition).print({}, win);
    // }
    pdfMake.createPdf(docDefinition).print({}, win);
}
function createReporteCreditosAprobadosPDF(response) {
    var img = response.img;
    var simboloMoneda = response.simboloMoneda;
    var data = response.data;
    var dataBodyReportes = [];
    var dataBodyReportesDol = [];
    var dataBodyReportestotales = [];
    console.log(simboloMoneda);
    console.log(img);
    console.log(data);
    var conpls = 0;
    var conpld = 0;
    var conins = 0;
    var conind = 0;
    var coninis = 0;
    var coninid = 0;
    var tfins = 0;
    var tfind = 0;
    var creds = 0;
    var credd = 0;
    var finas = 0;
    var finad = 0;
    var contc = 0;
    var subtituloSolesEfec = [
        { fontSize: 8, text: "CÓDIGO", fillColor: '#eeeeee' },
        { fontSize: 8, text: "FEC SOL", fillColor: '#eeeeee' },
        { fontSize: 8, text: "TIPO SOL", fillColor: '#eeeeee' },
        { fontSize: 8, text: "CONVENIO", fillColor: '#eeeeee' },
        { fontSize: 8, text: "CLIENTE", fillColor: '#eeeeee' },
        // { fontSize: 8,text:"TIPCLI",fillColor: '#eeeeee'},
        { fontSize: 8, text: "FEC DOC", fillColor: '#eeeeee' },
        { fontSize: 8, text: "SERIE", fillColor: '#eeeeee' },
        { fontSize: 8, text: "N°", fillColor: '#eeeeee' },
        { fontSize: 8, text: "MON", fillColor: '#eeeeee' },
        { fontSize: 8, text: "PRECIO LISTA", fillColor: '#eeeeee' },
        { fontSize: 8, text: "INTERÉS", fillColor: '#eeeeee' },
        { fontSize: 8, text: "CT", fillColor: '#eeeeee' },
        { fontSize: 8, text: "INICIAL", fillColor: '#eeeeee' },
        { fontSize: 8, text: "CUOTA", fillColor: '#eeeeee' },
        { fontSize: 8, text: "T.FINAN", fillColor: '#eeeeee' },
        { fontSize: 8, text: "CRÉDITO", fillColor: '#eeeeee' },
        { fontSize: 8, text: "FINAN", fillColor: '#eeeeee' },
    ];
    dataBodyReportes.push(subtituloSolesEfec);
    var tipo_solicitud = "";
    data.map(function (index) {
       
        switch(index.tipo_solicitud) {
            case '1':
                tipo_solicitud = "Contado";
                break;
            case '2':
                tipo_solicitud = "Crédito Directo";
                break;
            case '3':
                tipo_solicitud = "Crédito Financiero";
                break;
            case '4':
                tipo_solicitud = "Crédito";
                break;
            default:
                tipo_solicitud = "ninguno";
                break;
        }
        
        contc = contc + 1;
        if (index.IdMoneda == 1) {
            conpls = conpls + Number(index.precio_lista);
            conins = conins + Number(index.intereses);
            coninis = coninis + Number(index.inicial);
            tfins = tfins + Number(index.total_financiado);
            creds = creds + Number(index.Credito);
            finas = finas + Number(index.financiado);
        } else {
            conpld = conpld + Number(index.precio_lista);
            conind = conind + Number(index.intereses);
            coninid = coninid + Number(index.inicial);
            tfind = tfind + Number(index.total_financiado);
            credd = credd + Number(index.Credito);
            finad = finad + Number(index.financiado);
        }
        var subtituloSolesEfec = [
            { fontSize: 8, text: index.cCodConsecutivo + '-' + index.nConsecutivo },
            { fontSize: 8, text: moment(index.fecha_solicitud).format('DD/MM/YYYY'), },
            { fontSize: 8, text: tipo_solicitud },
            { fontSize: 8, text: index.convenio },
            { fontSize: 8, text: index.razonsocial_cliente },
            // { fontSize: 8,text:index.tipocliente,},
            { fontSize: 8, text: moment(index.fecdoc).format('DD/MM/YYYY'), },
            { fontSize: 8, text: index.serie_comprobante },
            // { fontSize: 8, text: '5000' },
            { fontSize: 8, text: index.numero_comprobante },
            { fontSize: 8, text: index.Simbolo },
            { fontSize: 8, text: index.Simbolo + ' ' + redondeodecimale(index.precio_lista).toFixed(2), },
            { fontSize: 8, text: index.Simbolo + ' ' + redondeodecimale(index.intereses).toFixed(2) },
            { fontSize: 8, text: index.nro_cuotas },
            { fontSize: 8, text: index.Simbolo + ' ' + redondeodecimale(index.inicial).toFixed(2), },
            { fontSize: 8, text: index.Simbolo + ' ' + redondeodecimale(index.cuota).toFixed(2) },
            { fontSize: 8, text: index.Simbolo + ' ' + redondeodecimale(index.total_financiado).toFixed(2), },
            { fontSize: 8, text: index.Simbolo + ' ' + redondeodecimale(index.Credito).toFixed(2) },
            { fontSize: 8, text: index.Simbolo + ' ' + redondeodecimale(index.financiado).toFixed(2) },
        ];
        dataBodyReportes.push(subtituloSolesEfec);
    });
    var totalsole = [
        { fontSize: 8, text: "TOTAL FINAL:", fillColor: '#eeeeee', colSpan: 2, border: [true, true, false, false] },
        {},
        { fontSize: 8, text: "CRÉDITOS: " + contc, fillColor: '#eeeeee', colSpan: 3, border: [false, true, false, false] },
        {},
        {},
        { fontSize: 8, text: "CLIENTES: " + contc, fillColor: '#eeeeee', colSpan: 3, border: [false, true, false, false] },
        // { fontSize: 8,text:"TIPCLI",fillColor: '#eeeeee'},
        {},
        {},
        { fontSize: 8, text: simboloMoneda[0].Simbolo, fillColor: '#eeeeee' },
        { fontSize: 8, text: redondeodecimale(conpls).toFixed(2), fillColor: '#eeeeee' },
        { fontSize: 8, text: redondeodecimale(conins).toFixed(2), fillColor: '#eeeeee' },
        { fontSize: 8, text: "", fillColor: '#eeeeee' },
        { fontSize: 8, text: redondeodecimale(coninis).toFixed(2), fillColor: '#eeeeee' },
        { fontSize: 8, text: "", fillColor: '#eeeeee' },
        { fontSize: 8, text: redondeodecimale(tfins).toFixed(2), fillColor: '#eeeeee' },
        { fontSize: 8, text: redondeodecimale(creds).toFixed(2), fillColor: '#eeeeee' },
        { fontSize: 8, text: redondeodecimale(finas).toFixed(2), fillColor: '#eeeeee' },
    ];
    dataBodyReportes.push(totalsole);
    var totaldolar = [
        { fontSize: 8, text: "", fillColor: '#eeeeee', colSpan: 8 },
        {},
        {},
        {},
        {},
        // { fontSize: 8,text:"TIPCLI",fillColor: '#eeeeee'},
        {},
        {},
        {},
        { fontSize: 8, text: simboloMoneda[1].Simbolo, fillColor: '#eeeeee' },
        { fontSize: 8, text: redondeodecimale(conpld).toFixed(2), fillColor: '#eeeeee' },
        { fontSize: 8, text: redondeodecimale(conind).toFixed(2), fillColor: '#eeeeee' },
        { fontSize: 8, text: "", fillColor: '#eeeeee' },
        { fontSize: 8, text: redondeodecimale(coninid).toFixed(2), fillColor: '#eeeeee' },
        { fontSize: 8, text: "", fillColor: '#eeeeee' },
        { fontSize: 8, text: redondeodecimale(tfind).toFixed(2), fillColor: '#eeeeee' },
        { fontSize: 8, text: redondeodecimale(credd).toFixed(2), fillColor: '#eeeeee' },
        { fontSize: 8, text: redondeodecimale(finad).toFixed(2), fillColor: '#eeeeee' },
    ];
    dataBodyReportes.push(totaldolar);

    var totatotal = [
        { fontSize: 10, text: "", border: [false, false, false, false] },
        { fontSize: 10, text: "", border: [false, false, false, false] },
        { fontSize: 10, text: "SOLES", bold: true, border: [false, false, false, false] },
        { fontSize: 10, text: "DOLARES", bold: true, border: [false, false, false, false] },
    ];
    dataBodyReportestotales.push(totatotal);
    var totatotal2 = [
        { fontSize: 10, text: "CLIENTES NUEVOS" },
        { fontSize: 10, text: contc },
        { fontSize: 10, text: redondeodecimale(creds).toFixed(2), bold: true, },
        { fontSize: 10, text: redondeodecimale(credd).toFixed(2), bold: true, },
    ];
    dataBodyReportestotales.push(totatotal2);

    var docDefinition = {

        // a string or { width: number, height: number }
        pageSize: "A4",
        // by default we use portrait, you can change it to landscape if you wish
        pageOrientation: 'landscape',
        // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
        // pageMargins: [15, 15, 15, 15],
        content: [
            {
                columns: [
                    {
                        width: 'auto',
                        // normally you could put image directly here, but since you're
                        // setting width to auto, we need an artificial wrapping-node
                        // so that column-width does not interfere with image width
                        stack: [
                            {
                                image: response.img,
                                fit: [150, 150]
                            }
                        ]
                    },
                    { text: "REPORTE DE CRÉDITOS APROBADOS", style: 'header' }
                ]
            },
            { text: 'Fecha: ' + moment().format('DD [de] MMMM [de] YYYY, h:mm A'), style: 'subheader' },
            // {text: 'SOLES'},
            {
                margin: [0, 0, 0, 0],
                style: 'tableExample',
                table: {
                    widths: [45, 40, 35, 30, 70, 40, 20, 20, 15, 40, 40, 15, 40, 40, 40, 40, 40],
                    body:
                        dataBodyReportes,
                },

            },
            { text: '', style: 'subheader', margin: [20, 20, 20, 20] },
            {
                margin: [0, 0, 0, 0],
                style: 'tableExample',
                table: {
                    widths: [100, 40, 60, 60],
                    body:
                        dataBodyReportestotales,
                },

            },
            // {text: 'DÓLARES'},
            // {   margin: [0,0,0,0],
            //             style: 'tableExample',
            //             table: {
            //                 widths: [40,40,80,80,80,40,40,40,40,40,40,40,40],
            //                 body:
            //                 datd, 
            //             },

            // },
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [-90, 0, 0, 0],
                alignment: 'center'
            },
            subheader: {
                fontSize: 12,
                bold: true,
                margin: [0, 0, 0, 0],
                alignment: 'center'
            },
            footer: {
                fontSize: 10,
                margin: [0, 10, 40, 0],
                alignment: 'right'
            }
        },
        footer: function (currentPage, pageCount) {
            return {
                columns: [{
                    text: 'Página ' + currentPage.toString() + ' de ' + pageCount,
                    style: 'footer'
                }]
            }
            // return currentPage.toString() + ' de ' + pageCount;
        }
    };

    var win = window.open('', '_blank');
    // if (response.type === 1) {
    //     pdfMake.createPdf(docDefinition).download();
    // } else if (response.type === 2) {
    //     pdfMake.createPdf(docDefinition).open({}, win);
    // } else {
    //     pdfMake.createPdf(docDefinition).print({}, win);
    // }
    pdfMake.createPdf(docDefinition).print({}, win);
}
function create_pdf_emisionComproCaja(response) {
    var dataDenomicacion = response.dataDenomicacion;
    var simboloMoneda = response.simboloMoneda;
    var dataTienda = response.dataTienda;
    var dataList = response.dataList;
    var dataListCancelaCuotas = response.dataListCancelaCuotas;
    var dataListCancelaMora = response.dataListCancelaMora;
    var dataListAnticipo = response.dataListAnticipo;
    var dataListSeparacion = response.dataListSeparacion;
    var dataListDevolucion = response.dataListDevolucion;
    console.log(dataListCancelaCuotas);
    console.log("cuotaslist");
    var dataListTipoPago = response.dataListTipoPago;
    var simboloMonedaDolar = response.simboloMonedaDolar;
    var usuario = response.usuario;
    console.log(dataDenomicacion);
    var data = response.dataCaDet;
    var fec = response.feca;
    var dataCaja = response.dataMc;
    var totalefectSol = dataCaja[0].totalEfectivo;
    var totalefectDol = dataCaja[0].totalEfectivoDol;
    var fecAct = response.fechacA;
    var dataCajaDetForSol = response.dataCajaDetForSol;
    var dataCajaDetEfeSol = response.dataCajaDetEfeSol;
    var dataCajaDetForDol = response.dataCajaDetForDol;
    var dataCajaDetEfeDol = response.dataCajaDetEfeDol;
    var dataCajaDetEfeSolAper = response.dataCajaDetEfeSolAper;
    var dataCajaDetEfeDolAper = response.dataCajaDetEfeDolAper;
    var dataSolesEfec = [];
    var dataTotalA = [];
    var dataTotalFF = [];
    var tableSolesDenomicacionFS = [];
    var tableSolesDenomicacionFD = [];
    var dataSolesMovimientos = [];
    var dataBody = [];
    var totalSolesEfec = 0;
    var totalSolesForm = 0;
    var dataFecha = '';
    var text = '';
    var textA = '';
    var totalfinsum = 0;

    if (dataList.length > 0) {
        console.log(dataList);
        if (dataCaja[0].estado == 0) {
            dataFecha = moment(dataCaja[0].updated_cajaActual).format('DD/MM/YYYY');
            text = 'FECHA CIERRE';
            textA = 'CIERRE DE CAJA N°';
        } else {
            dataFecha = moment(dataCaja[0].fechaCaja).format('DD/MM/YYYY');
            text = 'FECHA APERTURA';
            textA = 'APERTURA DE CAJA N°';
        }
        var TotalACa = [{ text: 'TIPO DE PAGO', fillColor: '#eeeeee', fontSize: 8 }, { text: 'MONTO SOLES', fillColor: '#eeeeee', fontSize: 8 }, { text: 'MONTO DOLARES', fillColor: '#eeeeee', fontSize: 8 }];
        dataTotalA.push(TotalACa);
        var tot = 0;
        for (var i = 0; i < dataList.length; i++) {
            totalfinsum = Number(dataList[i].monto_pago) + totalfinsum;
            if (i == 0) {
                var dataFechaEmisi = moment(dataList[i].fecha_emision).format('DD/MM/YYYY');
                var monto_pago = Number(dataList[i].monto_pago).toFixed(2);
                monto_pago = addCommas(monto_pago);
                crearCabecera_emision_comprobantes(dataList, i, dataBody);

                var subtituloSolesEfec = [
                    { fontSize: 8, text: "" },
                    { fontSize: 8, text: "Cobranza", },
                    { fontSize: 8, text: dataList[i].serie_comprobante, },
                    { fontSize: 8, text: dataFechaEmisi, },
                    { fontSize: 8, text: dataList[i].razonsocial_cliente, },
                    { fontSize: 8, text: monto_pago, },
                    { fontSize: 8, text: dataList[i].nro_recibo, },
                ];
            }
            else {

                if (dataList[i - 1].codigo_formapago != dataList[i].codigo_formapago) {
                    crearCabecera_emision_comprobantes(dataList, i, dataBody);

                }
                var dataFechaEmisi = moment(dataList[i].fecha_emision).format('DD/MM/YYYY');
                var monto_pago = Number(dataList[i].monto_pago).toFixed(2);
                monto_pago = addCommas(monto_pago);
                var subtituloSolesEfec = [
                    { fontSize: 8, text: "" },
                    { fontSize: 8, text: "Cobranza", },
                    { fontSize: 8, text: dataList[i].serie_comprobante, },
                    { fontSize: 8, text: dataFechaEmisi, },
                    { fontSize: 8, text: dataList[i].razonsocial_cliente, },
                    { fontSize: 8, text: monto_pago, },
                    { fontSize: 8, text: dataList[i].numero_comprobante, },
                ];
            }
            var indf = Number(dataList.length) - 1;
            tot = Number(dataList[i].monto_pago) + tot;
            dataBody.push(subtituloSolesEfec);
            if (i == indf) {
                tot = Number(tot).toFixed(2);
                tot = addCommas(tot);
                var totalfin = [
                    { fontSize: 8, text: "" },
                    { fontSize: 8, text: "", },
                    { fontSize: 8, text: "", },
                    { fontSize: 8, text: "", },
                    { fontSize: 8, text: "Total Nuevos Soles", bold: true, },
                    { fontSize: 8, text: tot, bold: true, },
                    { fontSize: 8, text: "" },
                ];

                var TotalAC = [{ text: dataList[i].descripcion_subtipo, fontSize: 8 }, { text: tot, fontSize: 8 }, { text: '.00', fontSize: 8 }];
                dataBody.push(totalfin);
                dataTotalA.push(TotalAC);
                tot = 0;
            } else if (dataList[i + 1].codigo_formapago != dataList[i].codigo_formapago) {
                tot = Number(tot).toFixed(2);
                tot = addCommas(tot);
                var totalfin = [
                    { fontSize: 8, text: "" },
                    { fontSize: 8, text: "", },
                    { fontSize: 8, text: "", },
                    { fontSize: 8, text: "", },
                    { fontSize: 8, text: "Total Nuevos Soles", bold: true, },
                    { fontSize: 8, text: tot, bold: true, },
                    { fontSize: 8, text: "" },
                ];
                dataBody.push(totalfin);
                var TotalAC = [{ text: dataList[i].descripcion_subtipo, fontSize: 8 }, { text: tot, fontSize: 8 }, { text: '.00', fontSize: 8 }];
                dataTotalA.push(TotalAC);
                tot = 0;
            }

        }
        console.log("dddddddddddd");
        console.log(totalfinsum);
        totalfinsum = Number(totalfinsum).toFixed(2);
        totalfinsum = addCommas(totalfinsum);
        var TotalACf = [{ text: 'TOTAL RECAUDADO', fontSize: 8, bold: true }, { text: totalfinsum, fontSize: 8, bold: true }, { text: '.00', fontSize: 8, bold: true }];
        dataTotalA.push(TotalACf);

        var Totalfc = [{ text: 'TOTAL FINAL', fillColor: '#eeeeee', fontSize: 8 }, { text: "SOLES", fillColor: '#eeeeee', fontSize: 8 }, { text: 'DOLARES', fillColor: '#eeeeee', fontSize: 8 }];
        dataTotalFF.push(Totalfc);
        var totalsFF = 0;
        for (var i = 0; i < dataListTipoPago.length; i++) {
            totalsFF = Number(dataListTipoPago[i].total) + totalsFF;
            var Totalfcuer = [{ text: dataListTipoPago[i].condicionPago, fontSize: 8 }, { text: Number(dataListTipoPago[i].total).toFixed(2), fontSize: 8 }, { text: '0.00', fontSize: 8 }];
            dataTotalFF.push(Totalfcuer);
        }
        var valcuota = '0.00';
        if (dataListCancelaCuotas.length > 0) {
            valcuota = Number(dataListCancelaCuotas[0].total).toFixed(2);
            totalsFF = Number(dataListCancelaCuotas[0].total) + totalsFF;
        }
        var Totalcuota = [{ text: "CANCELACIÓN DE CUOTAS", fontSize: 8 }, { text: valcuota, fontSize: 8 }, { text: '0.00', fontSize: 8 }];
        dataTotalFF.push(Totalcuota);

        var valmora = '0.00';
        if (dataListCancelaMora.length > 0) {
            valmora = Number(dataListCancelaMora[0].total).toFixed(2);
            totalsFF = Number(dataListCancelaMora[0].total) + totalsFF;
        }
        var Totalmora = [{ text: "MORA", fontSize: 8 }, { text: valmora, fontSize: 8 }, { text: '0.00', fontSize: 8 }];
        dataTotalFF.push(Totalmora);

        var valanticipo = '0.00';
        if (dataListAnticipo.length > 0) {
            valanticipo = Number(dataListAnticipo[0].total).toFixed(2);
            totalsFF = Number(dataListAnticipo[0].total) + totalsFF;
        }
        var Totalanticipo = [{ text: "ANTICIPO", fontSize: 8 }, { text: valanticipo, fontSize: 8 }, { text: '0.00', fontSize: 8 }];
        dataTotalFF.push(Totalanticipo);

        var valaSepr = '0.00';
        if (dataListSeparacion.length > 0) {
            valaSepr = Number(dataListSeparacion[0].total).toFixed(2);
            totalsFF = Number(dataListSeparacion[0].total) + totalsFF;
        }
        var TotalSepara = [{ text: "SEPARACIÓN", fontSize: 8 }, { text: valaSepr, fontSize: 8 }, { text: '0.00', fontSize: 8 }];
        dataTotalFF.push(TotalSepara);

        var valaDevolu = '0.00';
        if (dataListDevolucion.length > 0) {
            valaDevolu = Number(dataListDevolucion[0].total).toFixed(2);
            totalsFF = Number(dataListDevolucion[0].total) + totalsFF;
        }
        var TotalDevo = [{ text: "DEVOLUCIÓN", fontSize: 8 }, { text: valaDevolu, fontSize: 8 }, { text: '0.00', fontSize: 8 }];
        dataTotalFF.push(TotalDevo);




        totalsFF = Number(totalsFF).toFixed(2);
        totalsFF = addCommas(totalsFF);
        var Totalfc = [{ text: 'TOTAL ', fontSize: 8, bold: true }, { text: totalsFF, fontSize: 8, bold: true }, { text: '0.00', fontSize: 8, bold: true }];
        dataTotalFF.push(Totalfc);





        var docDefinition = {
            footer: function (currentPage, pageCount) {
                return [
                    {
                        text: "Fecha de Impresión: " + fecAct,
                        fontSize: 9,
                        bold: true,
                        margin: [15, 0, 5, 0],
                    },
                    {
                        fontSize: 9,
                        text: currentPage.toString() + ' de ' + pageCount,
                        alignment: 'right',
                        margin: [0, 0, 5, 0],
                    },
                ];
            },
            background: function (currentPage, pageSize) {
                return [

                    {
                        fontSize: 9,
                        text: dataTienda[0].direccion + ' - ' + dataTienda[0].cDistrito,
                        margin: [15, 10],
                    },
                    {
                        fontSize: 9,
                        text: "REPORTE TIENDA " + dataTienda[0].descripcion,
                        margin: [0, 0],
                        alignment: 'center',
                    },
                    // {  fontSize: 8,
                    //     text:text+' '+ dataFecha,
                    //     margin: [10,5],

                    // },
                    {
                        margin: [15, 0, 0, 5],
                        style: 'tableExample',
                        table: {
                            widths: [100, 100, 100, 100],
                            body: [
                                [
                                    [{
                                        fontSize: 8,
                                        text: text,
                                    },
                                    ],
                                    [{
                                        fontSize: 8,
                                        text: dataFecha,
                                    },
                                    ],
                                    [{
                                        fontSize: 8,
                                        text: textA + ' ' + dataCaja[0].idCajaDiaria,
                                    },
                                    ],
                                    [{
                                        fontSize: 8,
                                        text: "",
                                    },
                                    ]

                                ],
                                [
                                    [{
                                        fontSize: 8,
                                        text: "CAJERO(A)",
                                    },
                                    ],
                                    [{
                                        fontSize: 8,
                                        text: usuario,
                                    },
                                    ],
                                    [{
                                        margin: [50, 0, 0, 0],
                                        fontSize: 8,
                                        text: "COMENTARIO:",
                                    },
                                    ],
                                    [{
                                        style: 'tableExample',

                                        table: {
                                            body: [
                                                [{
                                                    margin: [100, 10, 100, 10],
                                                    fontSize: 8,
                                                    text: "",
                                                },],
                                            ]
                                        }
                                    },
                                    ]

                                ],

                            ],

                        },
                        layout: 'noBorders',
                    },
                    {
                        margin: [15, 0, 0, 0],
                        style: 'tableExample',
                        table: {
                            widths: [20, 100, 100, 190, 50, 50],
                            body: [
                                [{ text: "TIPO", fontSize: 8, fillColor: '#eeeeee' }, { text: "CONCEPTO", fontSize: 8, fillColor: '#eeeeee' }, { text: "FACTURA/BOLETA", fontSize: 8, fillColor: '#eeeeee' }, { text: "CLIENTE", fontSize: 8, fillColor: '#eeeeee' }, { text: "IMPORTE", fontSize: 8, fillColor: '#eeeeee' }, { text: "N° RECIBO", fontSize: 8, fillColor: '#eeeeee' }]
                                // {  fontSize: 8, text:"CAJERO(A)"},
                                // {  fontSize: 8, text:"CAJERO(A)"},

                            ]
                        }
                    }
                ];

            },
            // margin: [0,0,400,30],
            // header:  [
            //            {  fontSize: 8,
            //                     //                                        text:usuario,
            //                     //                                     },         
            //         ],
            content: [
                {
                    margin: [15, 0, 0, 0],
                    style: 'tableExample',
                    table: {
                        widths: [20, 100, 51, 40, 190, 50, 50],
                        body:
                            dataBody,
                    },
                    layout: 'noBorders',
                },
                { text: '', fontSize: 14, bold: true, pageBreak: 'before', margin: [0, 0, 0, 8] },
                {
                    margin: [100, 0, 0, 0],
                    style: 'tableExample',
                    table: {
                        widths: [100, 100, 100],
                        body: dataTotalA,
                    },
                    alignment: 'center'
                },
                {
                    margin: [100, 10, 0, 0],
                    style: 'tableExample',
                    table: {
                        widths: [100, 100, 100],
                        body: dataTotalFF,
                    },
                    alignment: 'center'
                },
                {
                    margin: [100, 400, 0, 0],
                    style: 'tableExample',

                    table: {
                        widths: [200, 50, 200],
                        body: [
                            [{ text: 'TESORERO ENCARGADO', border: [false, true, false, false], fontSize: 10, bold: true }, { text: '', border: [false, false, false, false], fontSize: 10, bold: true }, { text: 'CAJERO(A) DE TURNO', border: [false, true, false, false], fontSize: 10, bold: true }],
                        ]
                    },
                    alignment: 'center'
                },
            ],
            pageMargins: [0, 105, 0, 30],

        };

        var win = window.open('', '_blank');
        // var win = window.open('', '_blank');

        pdfMake.createPdf(docDefinition).print({}, win);
    }

    // }

}
function crearCabecera_emision_comprobantes(dataList, i, dataBody) {
    var tituloSolesEfec = [
        { fontSize: 8, bold: true, text: dataList[i].codigo_formapago, },
        { colSpan: 6, bold: true, fontSize: 8, text: dataList[i].descripcion_subtipo, },
        {},
        {},
        {},
        {},
        {},
    ];
    var subtituloSolesEfec = [
        { fontSize: 8, text: "" },
        { fontSize: 8, text: "EN NUEVOS SOLES", bold: true, },
        { fontSize: 8, text: "", },
        { fontSize: 8, text: "Ingreso", bold: true, },
        { fontSize: 8, text: "", },
        { fontSize: 8, text: "", },
        { fontSize: 8, text: "", },
    ];
    dataBody.push(tituloSolesEfec);
    dataBody.push(subtituloSolesEfec);
}
function create_pdf_movimientoCaja(response) {
    var data = response.dataCaDet;
    var fec = response.feca;
    var dataCaja = response.dataMc;
    var totalefectSol = dataCaja[0].totalEfectivo;
    var totalefectDol = dataCaja[0].totalEfectivoDol;
    var fecAct = response.fechacA;
    var dataCajaDetForSol = response.dataCajaDetForSol;
    var dataCajaDetEfeSol = response.dataCajaDetEfeSol;
    var dataCajaDetForDol = response.dataCajaDetForDol;
    var dataCajaDetEfeDol = response.dataCajaDetEfeDol;
    var dataCajaDetEfeSolAper = response.dataCajaDetEfeSolAper;
    var dataCajaDetEfeDolAper = response.dataCajaDetEfeDolAper;
    var dataSolesEfec = [];
    var dataSolesMovimientos = [];
    var totalSolesEfec = 0;
    var totalSolesForm = 0;
    var tituloSolesEfec = [
        {
            text: 'COMPROBANTES',
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
        {
            text: 'TOTAL',
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
    ];
    var tituloSolesForm = [
        {
            text: 'MOVIMIENTO DE EFECTIVO',
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        {
            text: 'TOTAL',
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
    ];
    dataSolesEfec.push(tituloSolesEfec);
    dataSolesMovimientos.push(tituloSolesForm);


    var dataEfecSolApe = [
        {
            text: 'APERTURA',
            fontSize: 8,

        },
        {
            text: Number(dataCajaDetEfeSolAper[0].monto).toFixed(2),
            fontSize: 8,
            alignment: 'right'

        },
    ];
    dataSolesMovimientos.push(dataEfecSolApe);
    _.each(dataCajaDetEfeSol, function (b) {
        var monto = Number(b.monto).toFixed(2);
        totalSolesEfec = Number(monto) + Number(totalSolesEfec);
        var dataEfecSol = [
            {
                text: b.descripcion_tipo,
                fontSize: 8,

            },
            {
                text: monto,
                fontSize: 8,
                alignment: 'right'

            },
        ];
        dataSolesMovimientos.push(dataEfecSol);
    });

    totalSolesEfec = Number(totalSolesEfec) + Number(dataCajaDetEfeSolAper[0].monto);
    var TotalSolesEfec = [
        {
            text: 'TOTAL EFECTIVO',
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        {
            text: Number(totalefectSol).toFixed(2),
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'right'

        },
    ];
    dataSolesMovimientos.push(TotalSolesEfec);
    ////////////////
    var titulo2SolesForm = [
        {
            text: 'VENTAS FORMA DE PAGO',
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        {
            text: '',
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
    ];
    dataSolesMovimientos.push(titulo2SolesForm);
    //////////
    _.each(dataCajaDetForSol, function (b) {
        var monto = Number(b.monto).toFixed(2);
        totalSolesForm = Number(monto) + Number(totalSolesForm);
        var dataFormSol = [
            {
                text: b.descripcion_subtipo,
                fontSize: 8,


            },
            {
                text: monto,
                fontSize: 8,
                alignment: 'right'

            },
        ];
        dataSolesMovimientos.push(dataFormSol);
    });
    // totalSolesForm=Number(totalSolesForm).toFixed(2);
    var TotalSolesForm = [
        {
            text: 'TOTAL VENTA',
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        {
            text: totalSolesForm.toFixed(2),
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'right'

        },
    ];
    dataSolesMovimientos.push(TotalSolesForm);

    /////////////////////////////////////////////
    var dataDolEfec = [];
    var dataDolMovimientos = [];
    var totalDolEfec = 0;
    var totalDolForm = 0;
    var tituloDolEfec = [
        {
            text: 'COMPROBANTES',
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
        {
            text: 'TOTAL',
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
    ];
    var tituloDolForm = [
        {
            text: 'MOVIMIENTO DE EFECTIVO',
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        {
            text: 'TOTAL',
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
    ];
    dataDolEfec.push(tituloDolEfec);
    dataDolMovimientos.push(tituloDolForm);
    var dataEfecDolApe = [
        {
            text: 'APERTURA',
            fontSize: 8,

        },
        {
            text: Number(dataCajaDetEfeDolAper[0].monto).toFixed(2),
            fontSize: 8,
            alignment: 'right'

        },
    ];
    dataDolMovimientos.push(dataEfecDolApe);

    _.each(dataCajaDetEfeDol, function (b) {
        var monto = Number(b.monto).toFixed(2);
        totalDolEfec = Number(monto) + Number(totalDolEfec);
        var dataEfecSol = [
            {
                text: b.descripcion_tipo,
                fontSize: 8,

            },
            {
                text: monto,
                fontSize: 8,
                alignment: 'right'

            },
        ];
        dataDolMovimientos.push(dataEfecSol);
    });
    totalDolEfec = Number(totalDolEfec) + Number(dataCajaDetEfeDolAper[0].monto);

    var TotalDolEfec = [
        {
            text: 'TOTAL EFECTIVO',
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        {
            text: Number(totalefectDol).toFixed(2),
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'right'

        },
    ];
    dataDolMovimientos.push(TotalDolEfec);
    ////////////////
    var titulo2DolForm = [
        {
            text: 'VENTAS FORMA DE PAGO',
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        {
            text: '',
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
    ];
    dataDolMovimientos.push(titulo2DolForm);
    //////////
    _.each(dataCajaDetForDol, function (b) {
        var monto = Number(b.monto).toFixed(2);
        totalDolForm = Number(monto) + Number(totalDolForm);
        var dataFormSol = [
            {
                text: b.descripcion_subtipo,
                fontSize: 8,


            },
            {
                text: monto,
                fontSize: 8,
                alignment: 'right'

            },
        ];
        dataDolMovimientos.push(dataFormSol);
    });
    // totalDolForm=Number(totalDolForm).toFixed(2);
    var TotalDolForm = [
        {
            text: 'TOTAL VENTA',
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        {
            text: totalDolForm.toFixed(2),
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'right'

        },
    ];
    dataDolMovimientos.push(TotalDolForm);

    var docDefinition = {
        pageOrientation: 'landscape',
        content: [
            {
                text: "Caja: " + fec,
                fontSize: 15,
                bold: true,
                absolutePosition: { x: 40, y: 20 }
            },
            {
                text: "Fecha de Impresión: " + fecAct,
                fontSize: 15,
                bold: true,
                absolutePosition: { x: 460, y: 20 }
            },
            { text: 'SOLES', style: 'header', fontSize: 13 },
            {
                absolutePosition: { x: 40, y: 60 },
                style: 'tableExample',
                table: {
                    widths: [250, 90],
                    body:
                        dataSolesEfec,

                }

            },
            {
                absolutePosition: { x: 460, y: 60 },
                style: 'tableExample',
                table: {
                    widths: [250, 90],
                    body: dataSolesMovimientos,
                }

            },
            {
                text: '',
                absolutePosition: { x: 300, y: 100 },
                pageBreak: 'after'
            },
            { text: 'DOLARES', style: 'header', fontSize: 13 },
            {
                absolutePosition: { x: 40, y: 60 },
                style: 'tableExample',
                table: {
                    widths: [250, 90],
                    body: [
                        [
                            {
                                text: 'COMPROBANTES',
                                fillColor: '#eeeeee',
                                fontSize: 8,
                                alignment: 'center'

                            },
                            {
                                text: 'TOTAL',
                                fillColor: '#eeeeee',
                                fontSize: 8,
                                alignment: 'center'

                            },
                        ],

                    ]
                }

            },
            {
                absolutePosition: { x: 460, y: 60 },
                style: 'tableExample',
                table: {
                    widths: [250, 90],
                    body: dataDolMovimientos,
                }

            },
        ],
        styles: {

            header: {
                fontSize: 18,
                bold: true,
                alignment: 'left',
            },
            subheader: {
                fontSize: 14
            },
            superMargin: {
                margin: [20, 0, 40, 0],
                fontSize: 15
            }
        }
    };

    var win = window.open('', '_blank');
    // var win = window.open('', '_blank');

    pdfMake.createPdf(docDefinition).print({}, win);
    // }

}
function create_pdf_proforma(response) {
    var data = response.data;
    var repus = response.data_repuesto;
    var servi = response.data_servicio;
    var data_cli = response.data_cliente;
    var array_head = [];
    var nConsecutivo = data[0].nConsecutivo;
    var cPlacaVeh = data[0].cPlacaVeh;
    var razonsocial_cliente = data[0].razonsocial_cliente;
    var nEstimadoHoras = Number(data[0].nEstimadoHoras);
    var celular = data_cli[0].celular;
    var dFechaRegistro = moment(data[0].dFechaRegistro).format('DD/MM/YYYY');
    console.log(data);
    console.log(repus);
    console.log(servi);
    console.log(data_cli);

    var mantenimiento_X = "";
    var cambioAciete_X = "";
    var reparacioMotor_x = "";
    var descar_x = "";
    var embrague_x = "";
    var transmi_x = "";
    var sisArras_x = "";
    var fren_x = "";
    var bate_x = "";
    var revisitE_x = "";
    var revisitIN_x = "";
    var suspencio_x = "";
    var aroneu_x = "";
    var sistEsca_x = "";
    var sistDirecc_x = "";
    var otro_x = "";
    array_head.push([
        {
            text: nConsecutivo,
            fontSize: 14,
            bold: true,
            absolutePosition: { x: 479, y: 64 }
        },
        {
            text: cPlacaVeh,
            fontSize: 10,
            bold: true,
            absolutePosition: { x: 118, y: 144 }
        },
        {
            text: razonsocial_cliente,
            fontSize: 10,
            bold: true,
            absolutePosition: { x: 118, y: 163 }
        },
        {
            text: celular,
            fontSize: 10,
            bold: true,
            absolutePosition: { x: 118, y: 181 }
        },
        {
            text: dFechaRegistro,
            fontSize: 10,
            bold: true,
            absolutePosition: { x: 452, y: 181 }
        },
    ]);
    var cont = 0;
    var alt = 239;
    var totalRep = 0;
    _.each(repus, function (b) {
        var desc = b.description;
        var cant = b.nCant;
        var pre = b.nPrecioUnitario;
        var tot = Number(b.nTotal) + Number(b.nImpuesto);
        totalRep = totalRep + tot;
        alt = alt + 13
        cont = cont + 1;
        if (cont < 16) {
            array_head.push([
                {
                    text: desc,
                    fontSize: 10,
                    bold: true,
                    absolutePosition: { x: 66, y: alt }
                },
                {
                    text: cant,
                    fontSize: 10,
                    bold: true,
                    absolutePosition: { x: 336, y: alt }
                },
                {
                    text: pre,
                    fontSize: 10,
                    bold: true,
                    absolutePosition: { x: 417, y: alt }
                },
                {
                    text: tot,
                    fontSize: 10,
                    bold: true,
                    absolutePosition: { x: 498, y: alt }
                }
            ]);
        }
    });
    totalRep = totalRep.toFixed(2);
    array_head.push([
        {
            text: totalRep,
            fontSize: 10,
            bold: true,
            absolutePosition: { x: 501, y: 452 }
        }
    ]);
    var cont = 0;
    var totalRepMo = 0;
    var altu = 492;
    _.each(servi, function (b) {
        var desc = b.description;
        var tota = b.nTotal;
        var tot = Number(b.nTotal) + Number(b.nImpuesto);
        totalRepMo = totalRepMo + tot;
        altu = altu + 13;
        cont = cont + 1;
        if (cont < 6) {
            array_head.push([
                {
                    text: desc,
                    fontSize: 10,
                    bold: true,
                    absolutePosition: { x: 66, y: altu }
                },
                {
                    text: tot,
                    fontSize: 10,
                    bold: true,
                    absolutePosition: { x: 498, y: altu }
                }
            ])
        };
    });
    totalRepMo = totalRepMo.toFixed(2);
    array_head.push([
        {
            text: totalRepMo,
            fontSize: 10,
            bold: true,
            absolutePosition: { x: 498, y: 573 }
        }
    ]);
    var totalcom = Number(totalRep) + Number(totalRepMo);
    totalcom = totalcom.toFixed(2);
    array_head.push([
        {
            text: totalcom,
            fontSize: 10,
            bold: true,
            absolutePosition: { x: 498, y: 594 }
        },
        {
            text: nEstimadoHoras,
            fontSize: 10,
            bold: true,
            absolutePosition: { x: 498, y: 607 }
        }
    ]);
    var docDefinition = {
        content: [
            array_head
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                alignment: 'right',
                margin: [0, 20, 0, 80]
            },
            subheader: {
                fontSize: 14
            },
            superMargin: {
                margin: [20, 0, 40, 0],
                fontSize: 15
            }
        }
    };


    var win = window.open('', '_blank');

    pdfMake.createPdf(docDefinition).print({}, win);
    // }

}
function create_pdf_transfer(response) {
    var data_p = response.data;
    var mov_ar = response.movimiento_Ar;
    var mov_det = response.data_movimiento_serie;
    console.log(mov_ar);
    var data = [];
    var array_head = [];
    var array_dataBody = [];
    var array_dataHead = [];
    var ident = 'I';
    var column1 = [];
    var column2 = [];
    var column3 = [];
    var column4 = [];
    var column5 = [];
    var column6 = [];
    var header = [];
    column1.push({ image: response.img, rowSpan: 3, colSpan: 8, alignment: 'center', width: 120, height: 50 }, {}, {}, {}, {}, {}, {}, {}, { text: 'Movimiento de Transferencia', alignment: 'center', bold: true, colSpan: 39, height: 80 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {});
    column2.push({}, {}, {}, {}, {}, {}, {}, {}, { text: ' \n N° Transferencia:', bold: true, alignment: 'center', fontSize: 10, border: [false, false, false, true], rowSpan: 2, colSpan: 7, height: 200 }, {}, {}, {}, {}, {}, {}, { text: ' \n' + data_p.idTransferencia, border: [false, false, true, true], fontSize: 10, rowSpan: 2, colSpan: 3, height: 200 }, {}, {}, { text: '\n Fecha Transacción: ', bold: true, fontSize: 10, border: [false, false, false, true], alignment: 'center', rowSpan: 2, colSpan: 10, height: 80 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, { text: '\n' + data_p.fecha_proceso, fontSize: 10, border: [false, false, true, true], rowSpan: 2, colSpan: 5, height: 80 }, {}, {}, {}, {}, { text: '\n Fecha Impresión:', bold: true, fontSize: 10, border: [false, false, false, true], alignment: 'center', colSpan: 9, rowSpan: 2, height: 80 }, {}, {}, {}, {}, {}, {}, {}, {}, { text: '\n' + data_p.fecha_impresion, fontSize: 10, border: [false, false, true, true], colSpan: 5, rowSpan: 2, height: 80 }, {}, {}, {}, {});
    column3.push({}, {}, {}, {}, {}, {}, {}, {}, ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1');
    column4.push({ text: ' ', border: [true, false, true, true], fontSize: 6, alignment: 'center', colSpan: 47, height: 100 }, ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1');
    column5.push({ text: 'Item', bold: true, colSpan: 2, fontSize: 10, height: 100 }, {}, { text: 'Artículo', alignment: 'center', bold: true, colSpan: 16, fontSize: 10, height: 100 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { text: 'Alm. Origen', bold: true, colSpan: 5, fontSize: 10, height: 100 }, {}, {}, {}, {}, { text: 'Loc. Origen', bold: true, colSpan: 5, fontSize: 10, height: 100 }, {}, {}, {}, {}, { text: 'Alm. Destino', bold: true, colSpan: 5, fontSize: 10, height: 100 }, {}, {}, {}, {}, { text: 'Loc. Destino', bold: true, colSpan: 5, fontSize: 10, height: 100 }, {}, {}, {}, {}, { text: 'Lote', bold: true, colSpan: 4, fontSize: 10, height: 100 }, {}, {}, {}, { text: 'Unidad', bold: true, colSpan: 2, fontSize: 10, height: 100 }, {}, { text: 'Cantidad', bold: true, colSpan: 3, fontSize: 10, height: 100 }, {}, {});
    header.push(column1);
    header.push(column2);
    header.push(column3);
    header.push(column4);
    header.push(column5);
    var cont = 0;
    mov_ar.map(function (index) {
        var cantidad = Math.trunc(index.cantidad);
        var colunmx = []
        cont = cont + 1;
        colunmx.push({ text: cont, colSpan: 2, fontSize: 10, height: 100 }, {}, { text: index.producto, colSpan: 16, fontSize: 10, height: 100 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { text: index.almacenOrigen, colSpan: 5, fontSize: 10, height: 100 }, {}, {}, {}, {}, { text: index.localizacionOrigen, colSpan: 5, fontSize: 10, height: 100 }, {}, {}, {}, {}, { text: index.almacenDestino, colSpan: 5, fontSize: 10, height: 100 }, {}, {}, {}, {}, { text: index.localizacionDestino, colSpan: 5, fontSize: 10, height: 100 }, {}, {}, {}, {}, { text: index.lote, colSpan: 4, fontSize: 10, height: 100 }, {}, {}, {}, { text: index.unidad, colSpan: 2, fontSize: 10, height: 100 }, {}, { text: cantidad, colSpan: 3, fontSize: 10, height: 100 }, {}, {});
        header.push(colunmx);
        var idenDet = 'I';
        mov_det.map(function (index2) {
            console.log("entro");
            console.log(index.consecutivo);
            if (index.consecutivo == index2.identificador) {
                var columnz = [];
                if (idenDet == 'I') {
                    var columny = [];
                    columny.push({ text: '', colSpan: 2, fontSize: 10, height: 100 }, {}, { text: 'Serie', colSpan: 6, fontSize: 10, height: 100, bold: true }, {}, {}, {}, {}, {}, { text: 'Motor', colSpan: 5, fontSize: 10, height: 100, bold: true }, {}, {}, {}, {}, { text: 'Color', bold: true, colSpan: 5, fontSize: 10, height: 100 }, {}, {}, {}, {}, { text: 'Año de Fabricación', bold: true, colSpan: 5, fontSize: 10, height: 100 }, {}, {}, {}, {}, { text: 'Año Modelo', bold: true, colSpan: 5, fontSize: 10, height: 100 }, {}, {}, {}, {}, { text: '', colSpan: 18, fontSize: 10, height: 100, border: [false, false, false, false] }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { text: '', fontSize: 10, height: 100, border: [false, false, true, true] });
                    header.push(columny);
                    idenDet = 'A';
                };
                columnz.push({ text: '', colSpan: 2, fontSize: 10, height: 100 }, {}, { text: index2.nombreSerie, colSpan: 6, fontSize: 10, height: 100 }, {}, {}, {}, {}, {}, { text: index2.motor, colSpan: 5, fontSize: 10, height: 100 }, {}, {}, {}, {}, { text: index2.color, colSpan: 5, fontSize: 10, height: 100 }, {}, {}, {}, {}, { text: index2.anio_fabricacion, colSpan: 5, fontSize: 10, height: 100 }, {}, {}, {}, {}, { text: index2.anio_modelo, colSpan: 5, fontSize: 10, height: 100 }, {}, {}, {}, {}, { text: '', colSpan: 18, fontSize: 10, height: 100, border: [false, true, false, true] }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { text: '', fontSize: 10, height: 100, border: [false, false, true, true] });
                header.push(columnz);

            }

        });


    });
    for (var i = 0; i < 8; i++) {
        var colum_espacio_blanco = [];
        colum_espacio_blanco.push({ text: ' ', border: [false, false, false, false], fontSize: 6, alignment: 'center', colSpan: 47, height: 100 }, ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1');
        header.push(colum_espacio_blanco);
    }
    var columnfooter = [];
    columnfooter.push({ text: '', border: [false, false, false, false], colSpan: 2, fontSize: 10, height: 100 }, {}, { text: 'ALMACÉN', border: [false, true, false, false], alignment: 'center', colSpan: 6, fontSize: 10, height: 100, bold: true }, {}, {}, {}, {}, {}, { text: '', alignment: 'center', colSpan: 30, border: [false, false, false, false], fontSize: 10, height: 100, bold: true }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { text: 'RECIBÍ CONFORME', border: [false, true, false, false], colSpan: 6, fontSize: 10, height: 100 }, {}, {}, {}, {}, {}, { text: '', border: [false, false, false, false], colSpan: 3, fontSize: 10, height: 100, bold: true }, {}, {});
    header.push(columnfooter);
    // var lote='';
    //    var unidad='UND';
    //    if(index.lote!=''){
    //        lote=index.lote;
    //        unidad='';
    //    }

    // mov_ar.map(function(index) {
    //     array_dataHead.push([
    //             {
    //                table: {
    //                      body: [
    //                         [ {image: response.img,rowSpan: 3, colSpan: 8, alignment: 'center',width:120,height:50}, {}, {}, {},{}, {}, {},{}, {text:'Movimiento de Transferencia',alignment: 'center', bold: true,colSpan: 39,height:80},{}, {},{}, {}, {},{}, {}, {},{}, {}, {},{}, {},{}, {},{}, {}, {},{}, {}, {},{}, {}, {},{}, {},{}, {},{},{}, {},{}, {},{},{}, {},{},{}],
    //                         [ {}, {}, {}, {},{}, {}, {},{}, {text:' \n N° Transferencia:',bold: true,alignment: 'center',fontSize: 10,border: [false, false, false, true],rowSpan: 2, colSpan: 7,height:200},{}, {},{}, {}, {},{}, {text:' \n'+data_p.idTransferencia,border: [false, false, true, true],fontSize: 10,rowSpan: 2, colSpan: 3,height:200}, {},{}, {text:'\n Fecha Transacción: ',bold: true,fontSize: 10,border: [false, false, false, true],alignment: 'center', rowSpan: 2,colSpan: 10,height:80}, {},{}, {},{}, {},{}, {}, {},{},{text:'\n'+data_p.fecha_registro,fontSize: 10,border: [false, false, true, true], rowSpan: 2,colSpan: 5,height:80}, {}, {},{},{}, {text:'\n Fecha Impresión:',bold: true,fontSize: 10,border: [false, false, false, true],alignment: 'center', colSpan: 9,rowSpan: 2,height:80}, {},{}, {},{},{}, {},{}, {},{text:'\n'+data_p.fecha_impresion,fontSize: 10,border: [false, false, true, true], colSpan: 5,rowSpan: 2,height:80},{}, {},{},{}],
    //                         [ {}, {}, {}, {},{}, {}, {},{}, ' 1',' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1',' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1',' 1', ' 1',' 1',' 1', ' 1',' 1', ' 1',' 1',' 1', ' 1',' 1',' 1'],
    //                         [ {text:' ', border: [true, false, true, true], fontSize: 6,alignment: 'center', colSpan: 47,height:100}, ' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1',' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1',' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1', ' 1',' 1', ' 1',' 1', ' 1',' 1',' 1', ' 1',' 1', ' 1',' 1',' 1', ' 1',' 1',' 1'],
    //                         [{text:'Item',bold: true, colSpan: 2, fontSize: 10,height:100}, {}, {text:'Artículo',alignment: 'center',bold: true, colSpan: 16, fontSize: 10,height:100},{}, {}, {},{},{}, {},{}, {},{}, {}, {}, {},{}, {}, {}, {text:'Alm. Origen',bold: true, colSpan: 5, fontSize: 10,height:100}, {},{}, {}, {},{text:'Loc. Origen',bold: true, colSpan: 5, fontSize: 10,height:100}, {}, {},{}, {}, {text:'Alm. Destino',bold: true, colSpan: 5, fontSize: 10,height:100},{}, {},{}, {},{text:'Loc. Destino',bold: true, colSpan: 5, fontSize: 10,height:100},{}, {},{}, {},{text:'Lote',bold: true, colSpan: 4, fontSize: 10,height:100},{},{},{}, {text:'Unidad',bold: true,colSpan: 2, fontSize: 10,height:100},{},{text:'Cantidad', bold: true,colSpan: 3,fontSize: 10,height:100},{},{}],
    //                      ]
    //                }  
    //             }

    //         ]);
    // });

    var docDefinition = {
        pageOrientation: 'landscape',
        content: [{
            table: {
                body: header
            }
        }

        ]
    };


    var win = window.open('', '_blank');
    // if (response.type === 1) {
    //     pdfMake.createPdf(docDefinition).download();
    // } else if (response.type === 2) {
    //     pdfMake.createPdf(docDefinition).open({}, win);
    // } else {
    pdfMake.createPdf(docDefinition).print({}, win);
    // }

}
function create_pdf_Querystock(response) {
    // console.log(response);
    var filtro_art = response.filtro_art;
    var filtro_idAlm = response.filtro_idAlm;
    var filtro_idLoc = response.filtro_idLoc;
    var filtro_cate = response.filtro_cate;
    var data = response.data;
    var fechacA = response.fechacA;
    var simboloMoneda = response.simboloMoneda;
    var img = response.img;
    // console.log(data);
    // console.log(filtro_art);
    // console.log("jsjhsjsjhs");

    if (!filtro_art) {
        filtro_art = 'TODOS'
    };
    if (!filtro_idAlm) {
        filtro_idAlm = 'TODOS'
    };
    if (!filtro_idLoc) {
        filtro_idLoc = 'TODOS'
    };
    if (!filtro_cate) {
        filtro_cate = 'TODOS'
    };


    var dataFiltros = [];
    var datafs = [

        {
            text: 'ARTÍCULO :',
            fontSize: 9,

            bold: true,

        },
        {
            text: filtro_art,
            fontSize: 9,

        },
        {
            text: 'CATEGORÍA :',
            fontSize: 9,
            bold: true,

        },
        {
            text: filtro_cate,
            fontSize: 9,


        },
        {
            text: 'ALMACÉN :',
            fontSize: 9,
            bold: true,

        },

        {
            text: filtro_idAlm,
            fontSize: 9,


        },
        {
            text: 'LOCALIZACIÓN :',
            fontSize: 9,
            bold: true,

        },
        {
            text: filtro_idLoc,
            fontSize: 9,
        },

    ];
    dataFiltros.push(datafs);

    var dataDolMovimienQuery = [];
    var tituloDolFormQuery = [
        {
            text: 'Id',
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        {
            text: 'Cod. Artículo',
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        {
            text: 'Artículo',
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        {
            text: 'Categoría',
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
        {
            text: 'Uni',
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        {
            text: 'Alm.',
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
        {
            text: 'Loc.',
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        {
            text: 'Lote',
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
        {
            text: 'Serie',
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        /* Omitido para que alcance la columna Ingreso
        {
            text: 'Tip.CompraVenta',
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        */
        {
            text: 'Disponible',
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
        {
            text: 'Remitido',
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
        {
            text: 'S.Total',
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        {
            text: 'Tránsito',
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
        {
            text: 'Costo ' + simboloMoneda[0].Simbolo,
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        {
            text: 'Costo Total ' + simboloMoneda[0].Simbolo,
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
        // {
        //     text: 'Chasis',
        //     fillColor: '#eeeeee',
        //     fontSize: 8,
        //     alignment: 'center'

        // },
        //  {
        //     text: 'Motor',
        //     fillColor: '#eeeeee',
        //     fontSize: 8,
        //     alignment: 'center'

        // },
        {
            text: 'Color',
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
        {
            text: 'Año',
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
        {
            text: 'Ingreso',
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'
        }
    ];


    dataDolMovimienQuery.push(tituloDolFormQuery);
    var todol = 0;
    var total_disponible = 0;
    var total_stotal = 0;
    var cont = 0;
    // console.log(data);
    // console.log("FF1");
    data.map(function (index) {
        cont ++;
        todol = Number(todol) + Number(index.Costo_Total);
        var tituloDolFormQueryData = [];
        var cu = Number(index.Costo_Promedio_Unitario).toFixed(2);
        var pu = Number(index.Costo_Total).toFixed(2);
        cu = addCommas(cu);
        pu = addCommas(pu);
        total_disponible += Number(index.Disponible);
        total_stotal += Number(index.Total);
        tituloDolFormQueryData = [
            {
                text: index.id,
                fontSize: 7,

            },
            {
                text: index.code_article,
                fontSize: 7,

            },
            {
                text: index.Articulo,
                fontSize: 7,

            },
            {
                text: index.Categoria,
                fontSize: 7,
                alignment: 'center'

            },
            {
                text: index.Unidad,
                fontSize: 7,

            },
            {
                text: index.Almacen,
                fontSize: 7,
                alignment: 'center'

            },
            {
                text: index.Localizacion,
                fontSize: 7,

            },
            {
                text: index.Lote,
                fontSize: 7,
                alignment: 'center'

            },
            {
                text: index.Serie,
                fontSize: 7,

            },
            /* Omitido para que alcance la columna Ingreso
            {
                text: index.tipoCompraVenta,
                fontSize: 7,

            },
            */
            {
                text: Number(index.Disponible),
                fontSize: 7,
                alignment: 'center'

            },
            {
                text: Number(index.Remitido),
                fontSize: 7,

            },
            {
                text: Number(index.Total),
                fontSize: 7,
                alignment: 'center'

            },
            {
                text: Number(index.Transito),
                fontSize: 7,

            },
            {
                text: cu,
                fontSize: 7,
                alignment: 'center'

            },
            {
                text: pu,
                fontSize: 7,

            },
            // {
            //     text: index.Chasis,
            //     fontSize: 7,

            // },
            // {
            //     text: index.Motor,
            //     fontSize: 7,

            // },
            {
                text: index.Color,
                fontSize: 7,

            },
            {
                text: index.Ano,
                fontSize: 7,

            },
            {
                text: index.Ingreso,
                fontSize: 7,

            }
        ];
        dataDolMovimienQuery.push(tituloDolFormQueryData);
    });
    console.log("FF3");
    var todolt = Number(todol).toFixed(2);
    todolt = addCommas(todolt);
    total_disponible = Number(total_disponible).toFixed(2);
    total_disponible = addCommas(total_disponible);

    total_stotal = Number(total_stotal).toFixed(2);
    total_stotal = addCommas(total_stotal);


    for (var i = 0; i < 5; i++) {
        var tituloDolFormQueryData = [];
        if (i == 4) {
            tituloDolFormQueryData = [
                {
                    text: 'Items',
                    alignment: 'center',
                    fontSize: 7,
                    bold: true,
                },
                {
                    alignment: 'center',
                    text: cont,
                    fontSize: 7,
                    bold: true,
                },
                {
                    text: '',
                    fontSize: 7,
                    border: [false, false, false, false],
                },
                {
                    text: '',
                    fontSize: 7,
                    alignment: 'center',
                    border: [false, false, false, false],
                },
                {
                    text: '',
                    fontSize: 7,
                    border: [false, false, false, false],
                },
                {
                    text: '',
                    fontSize: 7,
                    alignment: 'center',
                    border: [false, false, false, false],

                },
                {
                    text: '',
                    fontSize: 7,
                    border: [false, false, false, false],

                },
                {
                    text: '',
                    fontSize: 7,
                    alignment: 'center',
                    border: [false, false, false, false],

                },
                {
                    text: '',
                    fontSize: 7,
                    border: [false, false, false, false],
                },
                {
                    text: '',
                    fontSize: 7,
                    border: [false, false, false, false],
                },
                {
                    text: total_disponible,
                    fontSize: 7,
                    alignment: 'center',
                    bold: true,
                },
                {
                    text: '',
                    fontSize: 7,
                    bold: true,
                },
                {
                    text: total_stotal,
                    fontSize: 7,
                    alignment: 'center',
                    bold: true,
                },
                {
                    text: '',
                    fontSize: 7,
                    border: [false, false, false, false],
                },
                {
                    text: '',
                    fontSize: 7,
                    border: [false, false, false, false],
                },
                {
                    text: '',
                    fontSize: 7,
                    border: [false, false, false, false],
                },
                // {
                //     text: '',
                //     fontSize: 7,
                //     border: [false, false, false, false],
                // },
                // {
                //     text: '',
                //     fontSize: 7,
                //     border: [false, false, false, false],
                // },
                {
                    text: 'Total costo inventario ' + simboloMoneda[0].Simbolo,
                    fontSize: 7,
                    alignment: 'center',
                    bold: true,

                },
                {
                    text: todolt,
                    fontSize: 7,

                }
            ];
        } else {

            tituloDolFormQueryData = [
                {
                    text: '',
                    fontSize: 7,
                    border: [false, false, false, false],
                },
                {
                    text: '',
                    fontSize: 7,
                    border: [false, false, false, false],
                },
                {
                    text: '',
                    fontSize: 7,
                    border: [false, false, false, false],
                },
                {
                    text: '',
                    fontSize: 7,
                    alignment: 'center',
                    border: [false, false, false, false],

                },
                {
                    text: '',
                    fontSize: 7,
                    border: [false, false, false, false],


                },
                {
                    text: '',
                    fontSize: 7,
                    border: [false, false, false, false],


                },
                {
                    text: '',
                    fontSize: 7,
                    alignment: 'center',
                    border: [false, false, false, false],

                },
                {
                    text: '',
                    fontSize: 7,
                    border: [false, false, false, false],

                },
                {
                    text: '',
                    fontSize: 7,
                    alignment: 'center',
                    border: [false, false, false, false],
                },
                {
                    text: '',
                    fontSize: 7,
                    border: [false, false, false, false],
                },
                {
                    text: '',
                    fontSize: 7,
                    alignment: 'center',
                    border: [false, false, false, false],
                },
                {
                    text: '',
                    fontSize: 7,
                    border: [false, false, false, false],
                },
                {
                    text: '',
                    fontSize: 7,
                    alignment: 'center',
                    border: [false, false, false, false],
                },
                {
                    text: '',
                    fontSize: 7,
                    border: [false, false, false, false],
                },
                {
                    text: '',
                    fontSize: 7,
                    alignment: 'center',
                    border: [false, false, false, false],
                },
                {
                    text: '',
                    fontSize: 7,
                    border: [false, false, false, false],
                },
                {
                    text: '',
                    fontSize: 7,
                    border: [false, false, false, false],
                },
                {
                    text: '',
                    fontSize: 7,
                    border: [false, false, false, false],
                }
                // {
                //     text: '',
                //     fontSize: 7,
                //     border: [false, false, false, false],
                // },
                // {
                //     text: '',
                //     fontSize: 7,
                //     border: [false, false, false, false],
                // },
            ];

        }
        dataDolMovimienQuery.push(tituloDolFormQueryData);
    }
    var docDefinition = {
        pageOrientation: 'landscape',
        pageMargins: [10, 15, 10, 15],
        content: [
            {
                image: img,
                width: 120,
                height: 50,
                absolutePosition: { x: 50, y: 15 }
            },
            { text: 'REPORTE DE STOCK A LA FECHA : ' + fechacA, style: 'subheader', alignment: 'center', margin: [0, 0, 0, 10] },
            {
                fontSize: 8,
                text: '\n',
            },
            {
                fontSize: 8,
                text: '\n',
            },
            {
                fontSize: 8,
                text: '\n',
            },
            {
                style: 'tableExample',
                table: {
                    body: dataFiltros,
                },
                margin: [10, 0, 0, 10],
                layout: 'noBorders',

            },
            {
                style: 'tableExample',
                widths: [60, 60, 60, 60, 60, 60, 40, 60, 60, 40, 60, 60, 60, 60, 60, 60, 40, 40, 40],
                table: {
                    body: dataDolMovimienQuery,
                },


            },



        ]
    };


    var win = window.open('', '_blank');

    pdfMake.createPdf(docDefinition).print({}, win);


}
function create_pdf_QuerystockCierre(response) {
    var data = response.data;
    var fechacA = response.fechacA;
    var simboloMoneda = response.simboloMoneda;
    var img = response.img;
    var periodo = response.periodo;
    var estado = response.estado;
    var dataDolMovimienQuery = [];
    var tituloDolFormQuery = [
        {
            text: 'Id',
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        {
            text: 'Cod. Artículo',
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        {
            text: 'Artículo',
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        {
            text: 'Categoría',
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
        {
            text: 'Uni',
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        {
            text: 'Alm.',
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
        {
            text: 'Loc.',
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        {
            text: 'Lote',
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
        {
            text: 'Serie',
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        {
            text: 'Disponible',
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
        {
            text: 'Remitido',
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
        {
            text: 'Tránsito',
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
        {
            text: 'S.Total',
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        {
            text: 'Costo ' + simboloMoneda[0].Simbolo,
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        {
            text: 'Costo Total ' + simboloMoneda[0].Simbolo,
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
    ];


    dataDolMovimienQuery.push(tituloDolFormQuery);
    var todol = 0;
    data.map(function (index) {
        todol = Number(todol) + Number(index.Costo_Total);
        var tituloDolFormQueryData = [];
        var cu = Number(index.Costo_Promedio_Unitario).toFixed(2);
        var pu = Number(index.Costo_Total).toFixed(2);
        cu = addCommas(cu);
        pu = addCommas(pu);
        tituloDolFormQueryData = [
            {
                text: index.id,
                fontSize: 7,

            },
            {
                text: index.code_article,
                fontSize: 7,

            },
            {
                text: index.Articulo,
                fontSize: 7,

            },
            {
                text: index.Categoria,
                fontSize: 7,
                alignment: 'center'

            },
            {
                text: index.Unidad,
                fontSize: 7,

            },
            {
                text: index.Almacen,
                fontSize: 7,
                alignment: 'center'

            },
            {
                text: index.Localizacion,
                fontSize: 7,

            },
            {
                text: index.Lote,
                fontSize: 7,
                alignment: 'center'

            },
            {
                text: index.Serie,
                fontSize: 7,

            },
            {
                text: Number(index.Disponible),
                fontSize: 7,
                alignment: 'center'

            },
            {
                text: Number(index.Remitido),
                fontSize: 7,

            },
            {
                // text: Number(index.Total),
                text: Number(index.Transito),
                fontSize: 7,
                alignment: 'center'

            },
            {
                // text: Number(index.Transito),
                text: Number(index.Total),
                fontSize: 7,

            },
            {
                text: cu,
                fontSize: 7,
                alignment: 'center'

            },
            {
                text: pu,
                fontSize: 7,

            },
        ];
        dataDolMovimienQuery.push(tituloDolFormQueryData);
    });
    var todolt = Number(todol).toFixed(2);
    todolt = addCommas(todolt);
    for (var i = 0; i < 5; i++) {
        var tituloDolFormQueryData = [];
        if (i == 4) {
            tituloDolFormQueryData = [
                {
                    text: '',
                    fontSize: 7,
                    border: [false, false, false, false],
                },
                {
                    text: '',
                    fontSize: 7,
                    border: [false, false, false, false],
                },
                {
                    text: '',
                    fontSize: 7,
                    border: [false, false, false, false],
                },
                {
                    text: '',
                    fontSize: 7,
                    alignment: 'center',
                    border: [false, false, false, false],
                },
                {
                    text: '',
                    fontSize: 7,
                    border: [false, false, false, false],
                },
                {
                    text: '',
                    fontSize: 7,
                    alignment: 'center',
                    border: [false, false, false, false],

                },
                {
                    text: '',
                    fontSize: 7,
                    border: [false, false, false, false],

                },
                {
                    text: '',
                    fontSize: 7,
                    alignment: 'center',
                    border: [false, false, false, false],

                },
                {
                    text: '',
                    fontSize: 7,
                    border: [false, false, false, false],
                },
                {
                    text: '',
                    fontSize: 7,
                    alignment: 'center',
                    border: [false, false, false, false],
                },
                {
                    text: '',
                    fontSize: 7,
                    border: [false, false, false, false],
                },
                {
                    text: '',
                    fontSize: 7,
                    alignment: 'center',
                    border: [false, false, false, false],
                },
                {
                    text: '',
                    fontSize: 7,
                    border: [false, false, false, false],
                },
                {
                    text: 'Total costo inventario ' + simboloMoneda[0].Simbolo,
                    fontSize: 7,
                    alignment: 'center',
                    bold: true,

                },
                {
                    text: todolt,
                    fontSize: 7,

                },
            ];
        } else {

            tituloDolFormQueryData = [
                {
                    text: '',
                    fontSize: 7,
                    border: [false, false, false, false],
                },
                {
                    text: '',
                    fontSize: 7,
                    border: [false, false, false, false],
                },
                {
                    text: '',
                    fontSize: 7,
                    border: [false, false, false, false],
                },
                {
                    text: '',
                    fontSize: 7,
                    alignment: 'center',
                    border: [false, false, false, false],

                },
                {
                    text: '',
                    fontSize: 7,
                    border: [false, false, false, false],


                },
                {
                    text: '',
                    fontSize: 7,
                    alignment: 'center',
                    border: [false, false, false, false],

                },
                {
                    text: '',
                    fontSize: 7,
                    border: [false, false, false, false],

                },
                {
                    text: '',
                    fontSize: 7,
                    alignment: 'center',
                    border: [false, false, false, false],
                },
                {
                    text: '',
                    fontSize: 7,
                    border: [false, false, false, false],
                },
                {
                    text: '',
                    fontSize: 7,
                    alignment: 'center',
                    border: [false, false, false, false],
                },
                {
                    text: '',
                    fontSize: 7,
                    border: [false, false, false, false],
                },
                {
                    text: '',
                    fontSize: 7,
                    alignment: 'center',
                    border: [false, false, false, false],
                },
                {
                    text: '',
                    fontSize: 7,
                    border: [false, false, false, false],
                },
                {
                    text: '',
                    fontSize: 7,
                    alignment: 'center',
                    border: [false, false, false, false],
                },
                {
                    text: '',
                    fontSize: 7,
                    border: [false, false, false, false],
                },
            ];

        }
        dataDolMovimienQuery.push(tituloDolFormQueryData);
    }
    var docDefinition = {
        pageOrientation: 'landscape',
        content: [
            {
                image: img,
                width: 120,
                height: 50,
                absolutePosition: { x: 50, y: 15 }
            },
            { text: 'REPORTE DE CIERRE DE INVENTARIO PERIODO: ' + periodo + '    ESTADO: ' + estado.toUpperCase(), style: 'subheader', alignment: 'center', margin: [0, 0, 0, 10] },

            {
                style: 'tableExample',
                widths: [60, 60, 60, 60, 60, 60, 40, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60],
                table: {
                    body: dataDolMovimienQuery,
                },
                margin: [10, 0, 0, 10],

            },



        ]
    };


    var win = window.open('', '_blank');

    pdfMake.createPdf(docDefinition).print({}, win);


}
function create_pdf_Querymovimiento(response) {
    var filtro_art = response.filtro_art;
    var filtro_idAlm = response.filtro_idAlm;
    var filtro_idLoc = response.filtro_idLoc;
    var filtro_cate = response.filtro_cate;
    var filtro_nat = response.filtro_nat;
    var filtro_oper = response.filtro_oper;
    var n_movimiento = response.n_movimiento;
    var cod_lote = response.cod_lote;
    var cod_serie = response.cod_serie;
    var fecha_inicio = response.fecha_inicio;
    var fecha_fin = response.fecha_fin;
    var fechacA = response.fechacA;
    var simboloMoneda = response.simboloMoneda;
    var img = response.img;
    // if(fecha_inicio=='')

    if (!filtro_art) {
        filtro_art = 'TODOS'
    };
    if (!filtro_idAlm) {
        filtro_idAlm = 'TODOS'
    };
    if (!filtro_idLoc) {
        filtro_idLoc = 'TODOS'
    };
    if (!filtro_cate) {
        filtro_cate = 'TODOS'
    };
    if (!filtro_nat) {
        filtro_nat = 'TODOS'
    };
    if (!filtro_oper) {
        filtro_oper = 'TODOS'
    };
    if (!n_movimiento) {
        n_movimiento = 'TODOS'
    };
    if (!cod_lote) {
        cod_lote = 'TODOS'
    };
    if (!cod_serie) {
        cod_serie = 'TODOS'
    };
    if (!fecha_inicio) {
        fecha_inicio = 'TODOS'
    };
    if (!fecha_fin) {
        fecha_fin = 'TODOS'
    };
    var data = response.data;

    var dataFiltros = [];
    var datafs = [
        {
            text: 'F.INICIO :',
            fontSize: 9,
            bold: true,
        },
        {
            text: fecha_inicio,
            fontSize: 9,

        },
        {
            text: 'F.FIN :',
            fontSize: 9,

            bold: true,
        },
        {
            text: fecha_fin,
            fontSize: 9,

        },
        {
            text: 'ARTÍCULO :',
            fontSize: 9,

            bold: true,

        },
        {
            text: filtro_art,
            fontSize: 9,

        },
        {
            text: 'OPERACIÓN :',
            fontSize: 9,
            bold: true,

        },
        {
            text: filtro_oper,
            fontSize: 9,

        },
        {
            text: 'NATURALEZA :',
            fontSize: 9,
            bold: true,

        },
        {
            text: filtro_nat,
            fontSize: 9,
        },
        {
            text: 'CATEGORÍA :',
            fontSize: 9,
            bold: true,

        },
        {
            text: filtro_cate,
            fontSize: 9,


        },

    ];
    dataFiltros.push(datafs);

    var dataFiltros2 = [];
    var datafs2 = [
        {
            text: 'ALMACÉN :',
            fontSize: 9,
            bold: true,

        },

        {
            text: filtro_idAlm,
            fontSize: 9,


        },
        {
            text: 'LOCALIZACIÓN :',
            fontSize: 9,
            bold: true,

        },
        {
            text: filtro_idLoc,
            fontSize: 9,
        },
        {
            text: 'N° MOVIMIENTO :',
            fontSize: 9,
            bold: true,

        },
        {
            text: n_movimiento,
            fontSize: 9,

        },
        {
            text: 'COD. LOTE :',
            fontSize: 9,
            bold: true,

        },
        {
            text: cod_lote,
            fontSize: 9,

        },
        {
            text: 'COD. SERIE :',
            fontSize: 9,
            bold: true,

        },
        {
            text: cod_serie,
            fontSize: 9,

        },
    ];
    dataFiltros2.push(datafs2);

    var dataDolMovimienQuery = [];
    var tituloDolFormQuery = [
        {
            text: 'Id Origen',
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        {
            text: 'F.Proceso',
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        {
            text: 'F.Registro',
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
        {
            text: 'Cod. Artículo',
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        {
            text: 'Artículo',
            fillColor: '#eeeeee',
            fontSize: 8,

        },

        {
            text: 'Uni.',
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        {
            text: 'Tip.Ope.',
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
        {
            text: 'Nat',
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        {
            text: 'Ori',
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
        {
            text: 'Alm.',
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
        {
            text: 'Loc.',
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        {
            text: 'Cant.',
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
        {
            text: 'C.Unitario ' + simboloMoneda[0].Simbolo,
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        {
            text: 'P.Unitario ' + simboloMoneda[0].Simbolo,
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
        {
            text: 'C.Total ' + simboloMoneda[0].Simbolo,
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        {
            text: 'P.Total ' + simboloMoneda[0].Simbolo,
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
        {
            text: 'Lote',
            fillColor: '#eeeeee',
            fontSize: 8,

        },
        {
            text: 'Serie',
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
        {
            text: 'Obs',
            fillColor: '#eeeeee',
            fontSize: 8,
            alignment: 'center'

        },
    ];


    dataDolMovimienQuery.push(tituloDolFormQuery);
    var totalCosto = 0;
    data.map(function (index) {
        totalCosto = Number(totalCosto) + Number(index.Costo_Total);
        var tituloDolFormQueryData = [];
        var cu = Number(index.Costo_Unitario).toFixed(2);
        var pu = Number(index.Precio_Unitario).toFixed(2);
        var ct = Number(index.Costo_Total).toFixed(2);
        var pt = Number(index.Precio_Total).toFixed(2);
        cu = addCommas(cu);
        pu = addCommas(pu);
        ct = addCommas(ct);
        pt = addCommas(pt);
        tituloDolFormQueryData = [
            {
                text: index.idOrigen,
                fontSize: 7,

            },
            {
                text: index.fecha_proceso_s,
                fontSize: 7,

            },
            {
                text: index.fecha_registro_s,
                fontSize: 7,
                alignment: 'center'

            },
            {
                text: index.code_article,
                fontSize: 7,

            },
            {
                text: index.Articulo,
                fontSize: 7,

            },
            {
                text: index.Unidad,
                fontSize: 7,

            },
            {
                text: index.Tipo_Operacion,
                fontSize: 7,
                alignment: 'center'

            },
            {
                text: index.Naturaleza,
                fontSize: 7,

            },
            {
                text: index.Origen,
                fontSize: 7,
                alignment: 'center'

            },
            {
                text: index.Almacen,
                fontSize: 7,

            },
            {
                text: index.Localizacion,
                fontSize: 7,
                alignment: 'center'

            },
            {
                text: Number(index.Cantidad),
                fontSize: 7,

            },
            {
                text: cu,
                fontSize: 7,
                alignment: 'center'

            },
            {
                text: pu,
                fontSize: 7,

            },
            {
                text: ct,
                fontSize: 7,
                alignment: 'center'

            },
            {
                text: pt,
                fontSize: 7,

            },
            {
                text: index.Lote,
                fontSize: 7,
                alignment: 'center'

            },
            {
                text: index.Serie,
                fontSize: 7,

            },
            {
                text: index.Obs,
                fontSize: 7,

            },
        ];


        dataDolMovimienQuery.push(tituloDolFormQueryData);

    });

    var docDefinition = {
        pageOrientation: 'landscape',
        content: [
            {
                image: img,
                width: 120,
                height: 50,
                absolutePosition: { x: 50, y: 15 }
            },

            { text: 'REPORTE DE MOVIMIENTO A LA FECHA : ' + fechacA, style: 'subheader', alignment: 'center', margin: [0, 0, 0, 10] },
            {
                style: 'tableExample',
                table: {
                    body: dataFiltros,
                },
                margin: [10, 0, 0, 10],
                layout: 'noBorders',

            },
            {
                style: 'tableExample',
                table: {
                    body: dataFiltros2,
                },
                margin: [10, 0, 0, 10],
                layout: 'noBorders',

            },

            {
                style: 'tableExample',
                widths: [60, 60, 60, 60, 60, 60, 40, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60],
                table: {
                    body: dataDolMovimienQuery,
                },
                margin: [10, 0, 0, 10],

            },


        ]
    };


    var win = window.open('', '_blank');
    // if (response.type === 1) {
    //     pdfMake.createPdf(docDefinition).download();
    // } else if (response.type === 2) {
    //     pdfMake.createPdf(docDefinition).open({}, win);
    // } else {
    pdfMake.createPdf(docDefinition).print({}, win);


}
function create_pdf_movimientoEntrega(response, params) {
    var title_ = (_.isUndefined(params.title)) ? '' : params.title;
    var client_txt_ = (_.isUndefined(params.client_txt)) ? '' : params.client_txt;
    var user_txt_ = (_.isUndefined(params.user_txt)) ? '' : params.user_txt;
    var data_compania = response.data_compania;
    var data_p = response.data;
    var operacion = response.data_movimientoEntrega;
    var codVen = " ";
    var codSol = " ";
    if (operacion[0].serie_comprobante != null) {
        codVen = operacion[0].serie_comprobante + '-' + operacion[0].numero_comprobante;
        codSol = operacion[0].cCodConsecutivo + '-' + operacion[0].nConsecutivo;
    } else if(operacion[0].number_reception != null) {
        codVen = operacion[0].cCodConsecutivo + '-' + operacion[0].nConsecutivo;
        codSol = operacion[0].number_reception;
    }
    var mov_ar = response.data_movimientoEntregaArti;
    var mov_ar2 = response.movimiento_Ar;
    mov_ar = (mov_ar.length === 0 && mov_ar2.length > 0) ? mov_ar2 : mov_ar;
    var mov_det = response.data_movimiento_serie;
    var total_di = data_compania[0].direcciones_oficinas;
    var tot = total_di.split('|');
    var dataBodyArticulos = [];
    var unto = '';
    var cont = 0;
    console.log(data);
    for (var i = 0; i < tot.length; i++) {
        unto = unto + tot[i] + '\n';
    };
    console.log(data_p);
    var data = [];
    var array_head = [];
    var array_dataBody = [];
    var array_dataHead = [];
    var ident = 'I';
    var column1 = [];
    var column2 = [];
    var column3 = [];
    var column4 = [];
    var column5 = [];
    var column6 = [];
    var header = [];
    title_ = (title_ !== '') ? title_ : operacion[0].tipoOperacion;
    column1.push({ text: 'MOVIMIENTO DE ' + title_, alignment: 'center', bold: true, colSpan: 47, height: 70 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {});
    column2.push({ text: ' N° Movimiento:', bold: true, alignment: 'center', fontSize: 9, border: [true, true, false, true], colSpan: 15 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { text: data_p.idMovimiento, border: [false, false, true, true], fontSize: 9, colSpan: 3 }, {}, {}, { text: ' Fecha Transacción: ', bold: true, fontSize: 9, border: [false, false, false, true], alignment: 'center', colSpan: 10 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, { text: data_p.fecha_proceso, fontSize: 9, border: [false, false, true, true], colSpan: 5 }, {}, {}, {}, {}, { text: ' Fecha Impresión:', bold: true, fontSize: 9, border: [false, false, false, true], alignment: 'center', colSpan: 9, height: 80 }, {}, {}, {}, {}, {}, {}, {}, {}, { text: data_p.fecha_impresion, fontSize: 9, border: [false, false, true, true], colSpan: 5 }, {}, {}, {}, {});
    column5.push({ text: 'Item', bold: true, colSpan: 2, fontSize: 9, height: 100 }, {}, { text: 'Artículo', alignment: 'center', bold: true, colSpan: 16, fontSize: 10, height: 100 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { text: 'Almacén', bold: true, colSpan: 7, fontSize: 9, height: 100 }, {}, {}, {}, {}, {}, {}, { text: 'Localización', bold: true, colSpan: 8, fontSize: 10, height: 100 }, {}, {}, {}, {}, {}, {}, {}, { text: 'Lote', bold: true, colSpan: 9, fontSize: 10, height: 100 }, {}, {}, {}, {}, {}, {}, {}, {}, { text: 'Unidad', bold: true, colSpan: 2, fontSize: 9, height: 100 }, {}, { text: 'Cantidad', bold: true, fontSize: 9, height: 100 }, { text: 'Cantidad Requerida', bold: true, fontSize: 9, height: 100 }, { text: 'Cantidad Pendiente', bold: true, fontSize: 9, height: 100 });
    header.push(column1);
    header.push(column2);
    header.push(column5);
    var cont = 0;
    mov_ar.map(function (index) {
        var cantidad = Math.trunc(index.cantidad);
        var cantidad_requerida = Number(index.cantidadRequeridad);
        var cantidad_pendiente = Number(index.nCantidadPendienteEntregar);
        var colunmx = []
        cont = cont + 1;
        colunmx.push({ text: cont, colSpan: 2, fontSize: 9, height: 100 }, {}, { text: index.producto, colSpan: 16, fontSize: 9, height: 100 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { text: index.almacen, colSpan: 7, fontSize: 9, height: 100 }, {}, {}, {}, {}, {}, {}, { text: index.localizacion, colSpan: 8, fontSize: 9, height: 100 }, {}, {}, {}, {}, {}, {}, {}, { text: index.lote, colSpan: 9, fontSize: 9, height: 100 }, {}, {}, {}, {}, {}, {}, {}, {}, { text: index.unidad, colSpan: 2, fontSize: 9, height: 100 }, {}, { text: cantidad, fontSize: 9, height: 100 }, { text: cantidad_requerida, fontSize: 9, height: 100 }, { text: cantidad_pendiente, fontSize: 9, height: 100 });
        header.push(colunmx);
        var idenDet = 'I';
        mov_det.map(function (index2) {
            console.log("entro");
            console.log(index.consecutivo);
            if (index.consecutivo == index2.identificador) {
                var columnz = [];
                if (idenDet == 'I') {
                    var columny = [];
                    columny.push({ text: '', colSpan: 2, fontSize: 9, height: 100 }, {}, { text: 'Serie', colSpan: 6, fontSize: 9, height: 100, bold: true }, {}, {}, {}, {}, {}, { text: 'Motor', colSpan: 5, fontSize: 9, height: 100, bold: true }, {}, {}, {}, {}, { text: 'Color', bold: true, colSpan: 5, fontSize: 9, height: 100 }, {}, {}, {}, {}, { text: 'Año de Fabricación', bold: true, colSpan: 7, fontSize: 9, height: 100 }, {}, {}, {}, {}, {}, {}, { text: 'Año Modelo', bold: true, colSpan: 8, fontSize: 9, height: 100 }, {}, {}, {}, {}, {}, {}, {}, { text: '', colSpan: 13, fontSize: 9, height: 100, border: [false, false, false, false] }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { text: '', fontSize: 9, height: 100, border: [false, false, true, true] });
                    header.push(columny);
                    idenDet = 'A';
                };
                columnz.push({ text: '', colSpan: 2, fontSize: 9, height: 100 }, {}, { text: index2.nombreSerie, colSpan: 6, fontSize: 9, height: 100 }, {}, {}, {}, {}, {}, { text: index2.motor, colSpan: 5, fontSize: 9, height: 100 }, {}, {}, {}, {}, { text: index2.color, colSpan: 5, fontSize: 9, height: 100 }, {}, {}, {}, {}, { text: index2.anio_fabricacion, colSpan: 7, fontSize: 10, height: 100 }, {}, {}, {}, {}, {}, {}, { text: index2.anio_modelo, colSpan: 8, fontSize: 9, height: 100 }, {}, {}, {}, {}, {}, {}, {}, { text: '', colSpan: 13, fontSize: 9, height: 100, border: [false, true, false, true] }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { text: '', fontSize: 9, height: 100, border: [false, false, true, true] });
                header.push(columnz);

            }

        });


    });
    for (var i = 0; i < 8; i++) {
        var colum_espacio_blanco = [];
        colum_espacio_blanco.push({ text: ' ', border: [false, false, false, false], fontSize: 6, alignment: 'center', colSpan: 47, height: 100 }, ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1');
        header.push(colum_espacio_blanco);
    }
    var columnfooter = [];
    columnfooter.push({ text: '', border: [false, false, false, false], colSpan: 2, fontSize: 9, height: 100 }, {}, { text: 'ALMACÉN', border: [false, true, false, false], alignment: 'center', colSpan: 6, fontSize: 9, height: 100, bold: true }, {}, {}, {}, {}, {}, { text: '', alignment: 'center', colSpan: 30, border: [false, false, false, false], fontSize: 9, height: 100, bold: true }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { text: 'RECIBÍ CONFORME', border: [false, true, false, false], colSpan: 6, fontSize: 9, height: 100 }, {}, {}, {}, {}, {}, { text: '', border: [false, false, false, false], colSpan: 3, fontSize: 9, height: 100, bold: true }, {}, {});
    header.push(columnfooter);


    var docDefinition = {
        pageOrientation: 'landscape',
        pageSize: "A4",
        pageMargins: [20, 20, 15, 20],
        content: [
            {
                columns: [
                    {
                        width: '30%',

                        // normally you could put image directly here, but since you're
                        // setting width to auto, we need an artificial wrapping-node
                        // so that column-width does not interfere with image width
                        stack: [
                            {
                                image: response.img,
                                fit: [100, 100]
                            }
                        ],
                        alignment: 'center',
                    },
                    { width: '60%', text: data_compania[0].RazonSocial, style: 'headerTra' },
                ],
            },
            {
                columns: [
                    {
                        width: '70%',
                        text: [
                            {
                                fontSize: 8,
                                text: unto + '\n',
                                style: 'oficinas',
                            },
                            {
                                margin: [0, 30, 0, 0],
                                fontSize: 9,
                                text: data_compania[0].lema1 + '\n',
                                bold: true,
                                alignment: 'center'
                            },
                            {
                                margin: [0, 30, 0, 0],
                                fontSize: 10,
                                text: data_compania[0].lema2,
                                bold: true,
                                alignment: 'center'
                            },
                        ]
                    },
                    {
                        width: '40%',
                        table: {
                            widths: [180],
                            heights: 40,
                            body: [
                                [{ text: 'RUC:' + data_compania[0].Ruc, bold: true, fontSize: 10, alignment: 'center' }],
                                [{ text: codVen, bold: true, fontSize: 10, alignment: 'center' }],
                                [{ text: codSol, bold: true, fontSize: 10, alignment: 'center' }]
                            ]
                        },

                    },
                ],

            },
            {
                margin: [20, 5, 20, 5],
                table: {
                    widths: [250, 250, 220],
                    body: [
                        [{
                            border: [false, true, false, false],
                            text: [
                                {
                                    fontSize: 9,
                                    text: (client_txt_ === '') ? "CLIENTE: " : client_txt_,
                                    bold: true,
                                },
                                {
                                    fontSize: 9,
                                    text: operacion[0].razonsocial_cliente,
                                },
                            ]
                        },
                        {
                            border: [false, true, false, false],
                            text: [
                                {
                                    fontSize: 9,
                                    text: "N° DOCUMENTO: ",
                                    bold: true,
                                },
                                {
                                    fontSize: 9,
                                    text: operacion[0].documento_cliente,
                                },
                            ]
                        },
                        {
                            border: [false, true, false, false],
                            text: [
                                {
                                    fontSize: 9,
                                    text: (user_txt_ === '') ? "VENDEDOR: " : user_txt_,
                                    bold: true,
                                },
                                {
                                    fontSize: 9,
                                    text: operacion[0].vendedor,
                                },
                            ]
                        },
                        ],
                        [{
                            border: [false, false, false, false],
                            text: [
                                {
                                    fontSize: 9,
                                    text: "DIRECCIÓN: ",
                                    bold: true,
                                },
                                {
                                    fontSize: 9,
                                    text: operacion[0].direccion_cliente,
                                },
                            ]
                        },
                        {
                            border: [false, false, false, false],
                            text: [
                                {
                                    fontSize: 9,
                                    text: "TELF: ",
                                    bold: true,
                                },
                                {
                                    fontSize: 9,
                                    text: operacion[0].celular_cliente,
                                },
                            ]
                        },
                        {
                            border: [false, false, false, false],
                            text: [
                                {
                                    fontSize: 9,
                                    text: " ",
                                    bold: true,
                                },
                                {
                                    fontSize: 9,
                                    text: "",
                                },
                            ]
                        }
                        ],

                    ]
                },

            },
            {
                margin: [20, 0, 20, 5],
                table: {
                    widths: [7, 7, 7, 7, 7, 7, 25, 7, 7, 25, 7, 7, 25, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 20, 50, 50, 50, 50],
                    body: header
                }
            }

        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [-90, 0, 0, 0],
                alignment: 'center'
            },
            oficinas: {
                fontSize: 8,
                margin: [20, 0, 0, 0],
                alignment: 'center'
            },
            headerTra: {
                fontSize: 19,
                bold: true,
                margin: [20, 20, 0, 0],
                alignment: 'center'
            },
            subheader: {
                fontSize: 12,
                bold: true,
                margin: [0, 0, 0, 0],
                alignment: 'center'
            },
            footer: {
                fontSize: 10,
                margin: [0, 0, 40, 0],
                alignment: 'right'
            }
        },

    };


    var win = window.open('', '_blank');
    // if (response.type === 1) {
    //     pdfMake.createPdf(docDefinition).download();
    // } else if (response.type === 2) {
    //     pdfMake.createPdf(docDefinition).open({}, win);
    // } else {
    pdfMake.createPdf(docDefinition).print({}, win);
    // }

}

function create_pdf_movimiento(response) {
    var data_p = response.data;
    var operacion = response.operacion;
    var mov_ar = response.movimiento_Ar;
    var mov_det = response.data_movimiento_serie;
    console.log(data_p);
    var data = [];
    var array_head = [];
    var array_dataBody = [];
    var array_dataHead = [];
    var ident = 'I';
    var column1 = [];
    var column2 = [];
    var column3 = [];
    var column4 = [];
    var column5 = [];
    var column6 = [];
    var file_comentario_movement = [];
    var title_comentario_movement = [];
    var header = [];
    column1.push({ image: response.img, rowSpan: 3, colSpan: 8, alignment: 'center', width: 120, height: 50 }, {}, {}, {}, {}, {}, {}, {}, { text: 'MOVIMIENTO DE ' + operacion[0].descripcion, alignment: 'center', bold: true, colSpan: 39, height: 80 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {});
    column2.push({}, {}, {}, {}, {}, {}, {}, {}, { text: ' \n N° Movimiento:', bold: true, alignment: 'center', fontSize: 10, border: [false, false, false, true], rowSpan: 2, colSpan: 7, height: 200 }, {}, {}, {}, {}, {}, {}, { text: ' \n' + data_p.idMovimiento, border: [false, false, true, true], fontSize: 10, rowSpan: 2, colSpan: 3, height: 200 }, {}, {}, { text: '\n Fecha Transacción: ', bold: true, fontSize: 10, border: [false, false, false, true], alignment: 'center', rowSpan: 2, colSpan: 10, height: 80 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, { text: '\n' + data_p.fecha_proceso, fontSize: 10, border: [false, false, true, true], rowSpan: 2, colSpan: 5, height: 80 }, {}, {}, {}, {}, { text: '\n Fecha Impresión:', bold: true, fontSize: 10, border: [false, false, false, true], alignment: 'center', colSpan: 9, rowSpan: 2, height: 80 }, {}, {}, {}, {}, {}, {}, {}, {}, { text: '\n' + data_p.fecha_impresion, fontSize: 10, border: [false, false, true, true], colSpan: 5, rowSpan: 2, height: 80 }, {}, {}, {}, {});
    column3.push({}, {}, {}, {}, {}, {}, {}, {}, ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1');
    column4.push({ text: ' ', border: [true, false, true, true], fontSize: 6, alignment: 'center', colSpan: 47, height: 100 }, ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1');
    column5.push({ text: 'Item', bold: true, colSpan: 2, fontSize: 10, height: 100 }, {}, { text: 'Artículo', alignment: 'center', bold: true, colSpan: 16, fontSize: 10, height: 100 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { text: 'Almacén', bold: true, colSpan: 7, fontSize: 10, height: 100 }, {}, {}, {}, {}, {}, {}, { text: 'Localización', bold: true, colSpan: 8, fontSize: 10, height: 100 }, {}, {}, {}, {}, {}, {}, {}, { text: 'Lote', bold: true, colSpan: 9, fontSize: 10, height: 100 }, {}, {}, {}, {}, {}, {}, {}, {}, { text: 'Unidad', bold: true, colSpan: 2, fontSize: 10, height: 100 }, {}, { text: 'Cantidad', bold: true, colSpan: 3, fontSize: 10, height: 100 }, {}, {});
    title_comentario_movement.push({ text: "Observaciones", bold: true, border: [true, false, true, true], fontSize: 10, alignment: 'center', colSpan: 47, height: 500 }, ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1');
    file_comentario_movement.push({ text: data_p.observaciones, border: [true, false, true, true], fontSize: 10, alignment: 'center', colSpan: 47, height: 500 }, ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1');


    header.push(column1);
    header.push(column2);
    header.push(column3);
    header.push(column4);

    header.push(column5);

    var cont = 0;
    mov_ar.map(function (index) {
        var cantidad = Math.trunc(index.cantidad);
        var colunmx = []
        cont = cont + 1;
        colunmx.push({ text: cont, colSpan: 2, fontSize: 10, height: 100 }, {}, { text: index.producto, colSpan: 16, fontSize: 10, height: 100 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { text: index.almacen, colSpan: 7, fontSize: 9, height: 100 }, {}, {}, {}, {}, {}, {}, { text: index.localizacion, colSpan: 8, fontSize: 10, height: 100 }, {}, {}, {}, {}, {}, {}, {}, { text: index.lote, colSpan: 9, fontSize: 10, height: 100 }, {}, {}, {}, {}, {}, {}, {}, {}, { text: index.unidad, colSpan: 2, fontSize: 10, height: 100 }, {}, { text: cantidad, colSpan: 3, fontSize: 9, height: 100 }, {}, {});
        header.push(colunmx);
        var idenDet = 'I';
        mov_det.map(function (index2) {
            console.log("entro");
            console.log(index.consecutivo);
            if (index.consecutivo == index2.identificador) {
                var columnz = [];
                if (idenDet == 'I') {
                    var columny = [];
                    columny.push({ text: '', colSpan: 2, fontSize: 10, height: 100 }, {}, { text: 'Serie', colSpan: 6, fontSize: 10, height: 100, bold: true }, {}, {}, {}, {}, {}, { text: 'Motor', colSpan: 5, fontSize: 10, height: 100, bold: true }, {}, {}, {}, {}, { text: 'Color', bold: true, colSpan: 5, fontSize: 10, height: 100 }, {}, {}, {}, {}, { text: 'Año de Fabricación', bold: true, colSpan: 7, fontSize: 10, height: 100 }, {}, {}, {}, {}, {}, {}, { text: 'Año Modelo', bold: true, colSpan: 8, fontSize: 10, height: 100 }, {}, {}, {}, {}, {}, {}, {}, { text: '', colSpan: 13, fontSize: 10, height: 100, border: [false, false, false, false] }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { text: '', fontSize: 10, height: 100, border: [false, false, true, true] });
                    header.push(columny);
                    idenDet = 'A';
                };
                columnz.push({ text: '', colSpan: 2, fontSize: 10, height: 100 }, {}, { text: index2.nombreSerie, colSpan: 6, fontSize: 10, height: 100 }, {}, {}, {}, {}, {}, { text: index2.motor, colSpan: 5, fontSize: 10, height: 100 }, {}, {}, {}, {}, { text: index2.color, colSpan: 5, fontSize: 10, height: 100 }, {}, {}, {}, {}, { text: index2.anio_fabricacion, colSpan: 7, fontSize: 10, height: 100 }, {}, {}, {}, {}, {}, {}, { text: index2.anio_modelo, colSpan: 8, fontSize: 10, height: 100 }, {}, {}, {}, {}, {}, {}, {}, { text: '', colSpan: 13, fontSize: 10, height: 100, border: [false, true, false, true] }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { text: '', fontSize: 10, height: 100, border: [false, false, true, true] });
                header.push(columnz);

            }

        });


    });
    header.push(title_comentario_movement);
    header.push(file_comentario_movement);
    for (var i = 0; i < 8; i++) {
        var colum_espacio_blanco = [];
        colum_espacio_blanco.push({ text: ' ', border: [false, false, false, false], fontSize: 6, alignment: 'center', colSpan: 47, height: 100 }, ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1', ' 1');
        header.push(colum_espacio_blanco);
    }
    var columnfooter = [];
    columnfooter.push({ text: '', border: [false, false, false, false], colSpan: 2, fontSize: 10, height: 100 }, {}, { text: 'ALMACÉN', border: [false, true, false, false], alignment: 'center', colSpan: 6, fontSize: 10, height: 100, bold: true }, {}, {}, {}, {}, {}, { text: '', alignment: 'center', colSpan: 30, border: [false, false, false, false], fontSize: 10, height: 100, bold: true }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { text: 'RECIBÍ CONFORME', border: [false, true, false, false], colSpan: 6, fontSize: 10, height: 100 }, {}, {}, {}, {}, {}, { text: '', border: [false, false, false, false], colSpan: 3, fontSize: 10, height: 100, bold: true }, {}, {});
    header.push(columnfooter);


    var docDefinition = {
        pageOrientation: 'landscape',
        content: [{
            table: {
                body: header
            }
        }

        ]
    };


    var win = window.open('', '_blank');
    // if (response.type === 1) {
    //     pdfMake.createPdf(docDefinition).download();
    // } else if (response.type === 2) {
    //     pdfMake.createPdf(docDefinition).open({}, win);
    // } else {
    pdfMake.createPdf(docDefinition).print({}, win);
    // }

}

function create_pdf_ordenCompra(response) {
    var orden = response.orden;
    var detalleOrden = response.detalleOrden;
    var ncolumns = 14;

    // Filas para la informacion de la orden de compra
    var partOrden = [
        [
            { text: 'ORDEN DE COMPRA '  + orden.cCodConsecutivo + orden.nConsecutivo, bold: true, colSpan: ncolumns, alignment: 'center', fontSize: 9 },
            {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
        ],

        [
            { text: 'Consecutivo: '    + orden.cCodConsecutivo + orden.nConsecutivo, bold: true, fontSize: 9, colSpan: 5 },
            {}, {}, {}, {},
            { text: 'Fecha Registro: ' + orden.dFecRegistro,                         bold: true, fontSize: 9, colSpan: 4 },
            {}, {}, {},
            { text: 'Estado: '         + orden.iEstado,                              bold: true, fontSize: 9, colSpan: 5 },
            {}, {}, {}, {},
        ],

        [
            { text: 'Prioridad: '       + orden.prioridad,     bold: true, fontSize: 9, colSpan: 5 },
            {}, {}, {}, {},
            { text: 'Fecha Requerida: ' + orden.dFecRequerida, bold: true, fontSize: 9, colSpan: 4 },
            {}, {}, {},
            { text: 'Moneda: '          + orden.idMoneda,      bold: true, fontSize: 9, colSpan: 5 },
            {}, {}, {}, {}
        ],

        [
            { text: 'Proveedor: '          + orden.idProveedor,      bold: true, fontSize: 9, colSpan: 5 },
            {}, {}, {}, {},
            { text: 'Condición de pago: '  + orden.idcondicion_pago, bold: true, fontSize: 9, colSpan: 4 },
            {}, {}, {},
            { text: 'Fecha de impresión: ' + orden.fecha_impresion,  bold: true, fontSize: 9, colSpan: 5 },
            {}, {}, {}, {}
        ],

        [
            { text: 'Dirección de entrega: '  + orden.direccionEntrega, bold: true, colSpan: ncolumns, fontSize: 9 },
            {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
        ],

        [
            { text: 'Comentarios ', bold: true, colSpan: ncolumns, alignment: 'center', fontSize: 9 },
            {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
        ],

        [
            { text: orden.comentario, colSpan: ncolumns, fontSize: 9 },
            {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
        ],

        [
            { text: 'Comentarios aprobación ', bold: true, colSpan: ncolumns, alignment: 'center', fontSize: 9 },
            {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
        ],

        [
            { text: orden.comentarioAprobacion, colSpan: ncolumns, fontSize: 9 },
            {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
        ],

        [
            { text: 'Impuesto: '  + orden.impuesto, bold: true, colSpan: ncolumns, fontSize: 9 },
            {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
        ]
    ];

    var headerDetail = [
        [
            { text: 'Articulo',               bold: true, alignment: 'center', fontSize: 8 },
            { text: 'Cantidad',               bold: true, alignment: 'center', fontSize: 8 },
            { text: 'Cantidad Pendiente',     bold: true, alignment: 'center', fontSize: 8 },
            { text: 'Cantidad Recibida',      bold: true, alignment: 'center', fontSize: 8 },
            { text: 'Cantidad Devuelta',      bold: true, alignment: 'center', fontSize: 8 },
            { text: 'Precio Unitario',        bold: true, alignment: 'center', fontSize: 8 },
            { text: 'Precio Total',           bold: true, alignment: 'center', fontSize: 8 },
            { text: 'Porcentaje Descuento',   bold: true, alignment: 'center', fontSize: 8 },
            { text: 'Monto Descuento',        bold: true, alignment: 'center', fontSize: 8 },
            { text: 'Valor Compra',           bold: true, alignment: 'center', fontSize: 8 },
            { text: 'Valor Compra Descuento', bold: true, alignment: 'center', fontSize: 8 },
            { text: 'Impuesto',               bold: true, alignment: 'center', fontSize: 8 },
            { text: 'Sub Total',              bold: true, alignment: 'center', fontSize: 8 },
            { text: 'Fecha',                  bold: true, alignment: 'center', fontSize: 8 },
            //{ text: 'Estado',                 bold: true, alignment: 'center', fontSize: 8 }
        ],
    ];

    var bodyDetail = detalleOrden.map((product) => {
        return [
            { text: product.productoDescripcion,                               bold: false, alignment: 'center', fontSize: 7 },
            { text: Number(product.cantidad),                                  bold: false, alignment: 'center', fontSize: 7 },
            { text: Number(product.cantidadPendiente),                         bold: false, alignment: 'center', fontSize: 7 },
            { text: Number(product.cantidadRecibida),                          bold: false, alignment: 'center', fontSize: 7 },
            { text: Number(product.cantidadDevuelta),                          bold: false, alignment: 'center', fontSize: 7 },
            { text: Number(product.precioUnitario).toFixed(2),                 bold: false, alignment: 'center', fontSize: 7 },
            { text: Number(product.precioTotal).toFixed(2),                    bold: false, alignment: 'center', fontSize: 7 },
            { text: Number(product.nPorcDescuento).toFixed(2),                 bold: false, alignment: 'center', fontSize: 7 },
            { text: Number(product.nDescuento).toFixed(2),                     bold: false, alignment: 'center', fontSize: 7 },
            { text: Number(product.valorCompra).toFixed(2),                    bold: false, alignment: 'center', fontSize: 7 },
            { text: Number(product.valorCompraDescuento).toFixed(2),           bold: false, alignment: 'center', fontSize: 7 },
            { text: Number(product.nImpuesto).toFixed(2),                      bold: false, alignment: 'center', fontSize: 7 },
            { text: Number(product.total).toFixed(2),                          bold: false, alignment: 'center', fontSize: 7 },
            { text: (new Date(product.dFecRequerida)).toLocaleDateString(),    bold: false, alignment: 'center', fontSize: 7 }, // NOTE: Convertir desde el controlador?
            //{ text: product.iEstado,                                           bold: false, alignment: 'center', fontSize: 7 }
        ];
    });

    var detail = headerDetail.concat(bodyDetail);
    var table = partOrden.concat(detail);

    var docDefinition = {
        pageSize: 'A3',
        pageOrientation: 'portrait',
        content: [
            {
                table: {
                    body: table
                }
            }
        ]
    };

    var win = window.open('', '_blank');
    pdfMake.createPdf(docDefinition).open({}, win);
}

function create_receptionTransfer_pdf(response) {
    var data = [];
    var array_head = [];
    var array_dataBody = [];
    var valor_image = response.img;
    var array_dataHead = [];
    // data.push(['N°', 'PROVEEDOR', 'DOCUMENTO'])
    var data_header = response.data_header[0];
    var info = response.info[0];
    pag = { text: response.title, style: 'header' };
    array_dataHead.push([
        pag,
        {
            width: 'auto',
            // normally you could put image directly here, but since you're
            // setting width to auto, we need an artificial wrapping-node
            // so that column-width does not interfere with image width
            stack: [
                {
                    image: response.img,
                    fit: [120, 120]
                }
            ]
        },
        { text: 'Fecha: ' + moment().format('DD [de] MMMM [de] YYYY, h:mm A'), style: 'subheader' },
        { text: 'USUARIO° : ' + data_header[0][1], style: 'dataHeader' },
        {
            style: 'dataHeaderAll',
            table: {
                headerRows: 1,
                body: [
                    [{ text: 'ALMACÉN ORIGEN: ', style: 'dataHeader' },
                    { text: data_header[0][2] },
                    { text: 'ALMACÉN DESTINO : ', style: 'dataHeader' },
                    { text: data_header[0][3] }
                    ]
                ]
            },
            layout: 'noBorders'
        },
        {
            widths: 'auto',
            style: 'tableDetail',
            table: {
                headerRows: 1,
                widths: [50, 245, 40, 50, 40],
                body: info
            }
        }
    ])

    var docDefinition = {
        content: [
            {
                columns: [
                    array_dataHead
                ]
            }
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [-120, 0, 0, 0],
                alignment: 'center'
            },
            subheader: {
                fontSize: 12,
                bold: true,
                margin: [0, 5, 0, 5],
                alignment: 'center'
            },
            dataHeader: {
                bold: true,
                fontSize: 8,
                color: 'black'
            },
            dataHeaderAll: {
                fontSize: 10,
                color: 'black',
                margin: [0, 0, 10, 0]
            },

            dataFooter: {
                // bold: true,
                fontSize: 9,
                color: 'black',
                // alignment: 'center',
                margin: [0, 10, 0, 0]
            },
            tableDetail: {
                fontSize: 9,
                // bold: true,
                margin: [0, 5, 0, 1],
                alignment: 'left'
            },
            footer: {
                fontSize: 10,
                margin: [0, 10, 40, 0],
                alignment: 'right'
            }
        },
        pageMargins: [72, 100, 72, 40]
    };


    var win = window.open('', '_blank');
    if (response.type === 1) {
        pdfMake.createPdf(docDefinition).download();
    } else if (response.type === 2) {
        pdfMake.createPdf(docDefinition).open({}, win);
    } else {
        pdfMake.createPdf(docDefinition).print({}, win);
    }

}




function getFormSearchComprobantes(form_id, input_id, btn_id) {
    return '<form class="form-inline" id="' + form_id + '" style="margin-bottom:-3px">' +
        '<div class="form-group">' +

        '<div class="col-md-2 " style="padding: 0;">' +
        '<label class="control-label">Tipo Documento</label>' +
        '<select id="id_tipo_doc"  style="width: 100%" name="id_tipo_doc" class="form-control input-sm "><option value="">TODOS</option><option value="03">BOLETAS</option><option value="01">FACTURAS</option><option value="07">NOTAS DE CRÉDITO</option><option value="08">NOTAS DE DÉBITO</option><option value="12">TICKET</option></select>' +
        '</div>' +
        '<div class="col-md-2">' +
        '<label class="control-label">Fecha Inicio</label>' +
        '<input type="date" class="form-control input-sm"  id="FechaInicioFiltro">' +
        '</div>' +

        '<div class="col-md-2">' +
        '<label class="control-label">Fecha Fin</label>' +
        '<input type="date" class="form-control input-sm"  id="FechaFinFiltro">' +
        '</div>' +
        '<div class="col-md-2 " style="">' +
        '<label class="control-label">Cliente</label>' +
        '<select id="idClienteFiltro"  style="margin-right:5px;width: 100%" name="idClienteFiltro" class="form-control input-sm "></select>' +
        '</div>' +
        '<div class="col-md-1 " style="padding: 0;">' +
        '<label class="control-label">Estado</label>' +
        '<select id="estado_cpe"  style="width: 100%" name="estado_cpe" class="form-control input-sm "><option value="">TODOS</option><option value="PENDIENTE">PENDIENTE</option><option value="EMITIDO">EMITIDO</option><option value="RECHAZADO">RECHAZADO</option><option value="BAJA EMITIDA">BAJA EMITIDA</option><option value="BAJA RECHAZADA">BAJA RECHAZADA</option></select>' +
        '</div>' +
        '<div class="col-md-3 " style="padding-right: 0px;"><br>' +
        '<div class="input-group input-group-sm">' +
        '<input type="text" id="' + input_id + '" name="search" class="form-control" autocomplete="off" placeholder="Buscar..." />' +
        '<span class="input-group-btn">' +
        '<button type="submit" id="' + btn_id + '" class="btn btn-danger-admin">' +
        '<i class="fa fa-search"></i>' +
        '</button>' +
        '<button title="Limpiar Filtro" type="button" id="limpiar-filtro-comprobantes" class="btn btn-warning">' +
        '<i class="fa fa-trash-o"></i>' +
        '</button>' +
        '</span>' +
        '</div>' +
        '</div>' +

        
        '<div class="col-md-2" style="padding: 0;">' +
        '<label class="control-label">Anulado</label>' +
        '<select id="anulado"  style="width: 100%" name="anulado" class="form-control input-sm "><option value="">TODOS</option><option value="S">SI</option><option value="N">NO</option></select>' +
        '</div>' +

        '</div>' +

        '</form>';
}

function codeUniqueTime() {
    var date = new Date();
    var components = [
        date.getYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
    ];
    return components.join('');
}
