<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $titulo }}</title>
    <style>
        /* referencia: https://ourcodeworld.co/articulos/leer/687/como-configurar-un-encabezado-y-pie-de-pagina-en-dompdf */
        @page {
            margin: 0cm 0cm;
        }

        /** Defina ahora los márgenes reales de cada página en el PDF **/
        body {
            margin-top: 3cm;
            margin-left: 0.5cm;
            margin-right: 0.5cm;
            margin-bottom: 2cm;
        }

        header {
            position: fixed;
            top: 0.9cm;
            left: 0.5cm;
            right: 0.5cm;
            height: 2.1cm;
            /* border: 1px solid red; */
            /* text-align: center; */
            /* line-height: 0.8cm; */
            font-family: 'Times New Roman' !important;
        }



        * {
            font-family: 'Roboto', sans-serif;
            box-sizing: border-box;
            /* font-weight: bold; */
            font-size: 11px;
        }


        /* #contenido {
            
            width: 696px; */
        /* border: 1px solid gray */

        /* } */

        .row {
            width: 100%;
            height: 30px;
            /* margin-top: 15px; */
            /* clear: both; */
        }

        .row-sm {
            width: 100%;
            height: 20px;
            /* margin-top: 15px; */
            /* clear: both; */
        }

        .clear {
            clear: both;
        }

        .col {
            float: left;
            /* border: 1px solid black; */
        }


        h2,
        h3,
        h4,
        h5 {
            /* text-align: center !important; */
            margin: 2px 0;
            /* padding-botton: 2px; */

        }

        #tabla,
        #tabla tr,
        #tabla td {
            /* width: 100%; */
            border: 1px solid black;
            border-collapse: collapse;
        }

        #tabla_3,
        #tabla_3 tr,
        #tabla_3 td {
            /* width: 100%; */
            border: 1px solid black;
            border-collapse: collapse;
        }


        #tabla_2,
        #tabla_2 td {
            /* width: 100%; */
            border-left: 1px solid black;
            border-right: 1px solid black;
            border-bottom: 1px solid black;
            border-collapse: collapse;
        }

        #tabla_4,
        #tabla_4 tr,
        #tabla_4 td {
            /* width: 100%; */
            border: none;
            border-collapse: none;
        }

        #tabla_5,
        #tabla_5 tr,
        #tabla_5 td {
            /* width: 100%; */
            border: none;
            border-collapse: none;
        }

        
        #tabla_6,
        #tabla_6 tr,
        #tabla_6 td {
            /* width: 100%; */
            border: none;
            border-collapse: none;
        }
    </style>

</head>

<body>

    <header style="">
        <table style="width: 730px !important;">

            <tr>
                <td style="width: 15%;"><strong>Compañia </strong></td>
                <td colspan="2" style="width: 45%;"><strong>{{ $empresa[0]->RazonSocial }}</strong></td>
                <td style="width: 10%;">Fecha </td>
                <td colspan="2" style="width: 30%;"><?php echo date("d/m/Y"); ?></td>
            </tr>
            <tr>
                <td style="width: 15%;">R.U.C. </td>
                <td colspan="5" style="width: 85%;">{{ $empresa[0]->Ruc }}</td>

            </tr>
            <tr>
                <td style="width: 15%;">Dirección </td>
                <td colspan="5" style="width: 85%;">{{ $empresa[0]->Direccion }}</td>

            </tr>
            <tr>
                <td style="width: 15%;">Teléfono </td>
                <td style="width: 15%;">{{ $empresa[0]->Telefono1 }}</td>
                <td style="width: 10%;">Estado </td>
                <td style="width: 10%;">{{ $solicitud[0]->estado_user }}</td>
                <td style="width: 30%;"><strong>NÚMERO SOLICITUD: </strong></td>
                <td style="width: 20%;"><strong>{{ $solicitud[0]->cCodConsecutivo }}-{{ $solicitud[0]->nConsecutivo }}</strong></td>

            </tr>

        </table>




    </header>
    <main>

        <table id="tabla" style="width: 776px !important;">

            <tr>
                <td style="width: 22%;"><strong>Fecha Solicitud </strong>{{ $solicitud[0]->fecha_solicitud_user }}</td>
                <td style="width: 25%;"><strong>Tipo Solicitud: </strong>{{ $titulo }}</td>
                <td style="width: 25%;"><strong>Convenio: </strong>{{ $solicitud[0]->convenio }}</td>
                <td style="width: 28%;"><strong>Vendedor </strong>{{ $solicitud[0]->vendedor }}</td>

            </tr>


        </table>



        <table id="tabla_2" style="width: 776px !important;">
            <tr style="">
                <td style=""><strong>Lista de Precios</strong></td>
                <td style=""><strong>Código</strong></td>
                <td style=""><strong>Cantidad</strong></td>
                <td style=""><strong>Descripción Producto</strong></td>


            </tr>

            <?php


            foreach ($solicitud_articulo as $key => $value) {
                echo '<tr>';
                echo '  <td>' . number_format($value->precio_unitario, 2) . '</td>';
                echo '  <td>' . $value->code_article . '</td>';
                echo '  <td>' . $value->cantidad . '</td>';
                // if(empty($value->descripcion_articulo)) {

                //     echo '  <td>' . $value->producto . '</td>';
                // } else {
                    echo '  <td>' . $value->producto. "-". $value->descripcion_articulo . '</td>';
                // }
                echo '</tr>';
            }

            ?>
        </table>


        <br>
        <table id="tabla_3" style="width: 730px !important;">
            <tr>
                <td colspan="6" style="font-weight: bold; width: 50%;">COMENTARIOS:</td>
                <td colspan="6" style="font-weight: bold; text-align: center; width: 50%;">V°B° GERENCIA:</td>

            </tr>
            <tr>
                <td colspan="6" style="height: 50px; width: 50%;">{{ $solicitud[0]->comentarios }}</td>
                <td colspan="6" style="height: 50px; width: 50%;"></td>

            </tr>
            <tr>
                <td colspan="6" style="font-weight: bold; text-align: center; width: 50%;">INFORMACION DEL CRÉDITO:</td>
                <td colspan="3" style="font-weight: bold; text-align: center; width: 25%">V°B° JEFE DE TIENDA:</td>
                <td colspan="3" style="font-weight: bold; text-align: center; width: 25%">V°B° CREDITOS:</td>

            </tr>
            <tr>
                <td colspan="6"  style="height: 50px; width: 50%;">
                    <table id="tabla_6">
                        <tr>
                            <td style="height: 50px; width: 25%;">
                                <table id="tabla_4">
                                    <tr>
                                        <td style="font-weight: bold; width: 60%;">Lista de Precios: </td>
                                        <td style="width: 40%;" align="right">{{ $solicitud[0]->Simbolo }} <?php echo number_format($solicitud_credito[0]->monto_venta, 2); ?></td>


                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold; width: 60%;">Intereses: </td>
                                        <td style="width: 40%;" align="right">{{ $solicitud[0]->Simbolo }} 
                                    <?php echo number_format($solicitud_credito[0]->intereses, 2)?></td>

                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold; width: 60%;">&nbsp;</td>
                                        <td style="width: 40%;">&nbsp;</td>

                                    </tr>


                                </table>
                            </td>
                            <td style="height: 50px; width: 25%;">
                                <table id="tabla_5">
                                    <tr>


                                        <td style="font-weight: bold; width: 60%;">Cuota Inicial: </td>
                                        <td style="width: 40%;" align="right">{{ $solicitud[0]->Simbolo }} 
                                    <?php echo number_format($solicitud_credito[0]->cuota_inicial, 2); ?></td>
                                    </tr>
                                    <tr>

                                        <td style="font-weight: bold; width: 60%;">Valor de Cuota: </td>
                                        <td style="width: 40%;" align="right">{{ $solicitud[0]->Simbolo }} <?php echo number_format($solicitud_credito[0]->valor_cuota, 2)?></td>
                                    </tr>
                                    <tr>

                                        <td style="font-weight: bold; width: 60%;">Nro Cuotas: </td>
                                        <td style="width: 40%;" align="right">{{ $solicitud_credito[0]->nro_cuotas }}</td>
                                    </tr>

                                </table>
                            </td>
                        </tr>
                        <tr style="">
                            <td style="border-top: 1px solid black; font-weight: bold;">TOTAL FINANCIADO</td>
                            <td style="border-top: 1px solid black; font-weight: bold;" align="right">
                                {{ $solicitud[0]->Simbolo }} 
                                <?php 
                                    $total_financiado = $solicitud_credito[0]->monto_venta + $solicitud_credito[0]->intereses;  

                                    echo number_format($total_financiado , 2);
                                ?>
                            </td>
                        </tr>
                    </table>
                </td>
                <td colspan="3" style="height: 50px; width: 25%;"></td>
                <td colspan="3" style="height: 50px; width: 25%;"></td>

            </tr>

            <tr>
                <td colspan="6" style="font-weight: bold; text-align: center;">DATOS DEL COMPRADOR</td>
                <td colspan="6" style="font-weight: bold; text-align: center;">DATOS DEL FIADOR</td>
            </tr>

       
            <tr>
                <td colspan="3" style="text-align: center;"><strong>R.U.C.</strong><br>{{ $cliente[0]->documento }}</td>
                <td colspan="3" style="text-align: center;"><strong>Correo Electrónico</strong><br>{{ $cliente[0]->correo_electronico }}</td>
                <td colspan="3" style="text-align: center;"><strong>R.U.C.</strong><br><?php echo (isset($fiador[0])) ? $fiador[0]->cNumerodocumento : ""; ?></td>
                <td colspan="3" style="text-align: center;"><strong>Correo Electrónico</strong><br><?php echo (isset($fiador[0])) ? $fiador[0]->cEmail : ""; ?></td>
            </tr>
            <tr>
                <td colspan="4" style=""><strong>Apellidos y Nombres o Razon Social</strong><br>{{ $cliente[0]->razonsocial_cliente }}</td>
                <td colspan="2" style=""><strong>Fec. Nacimiento</strong><br><?php echo (isset($fiador[0])) ? $cliente[0]->dFechanacimiento : ""; ?></td>
                <td colspan="4" style=""><strong>Apellidos y Nombres o Razon Social</strong><br><?php echo (isset($fiador[0])) ? $fiador[0]->cNombrePersona : ""; ?></td>
                <td colspan="2" style=""><strong>Fec. Nacimiento</strong><br><?php echo (isset($fiador[0])) ? $fiador[0]->dFechanacimiento : ""; ?></td>
            </tr>
            <tr>
                <td colspan="1" style=""><strong>D.N.I. Conyugue</strong><br><?php echo (isset($conyugue[0])) ? $conyugue[0]->cNumerodocumento : ""; ?></td>
                <td colspan="1" style=""><strong>Edad</strong><br><?php echo (isset($cliente[0])) ? $cliente[0]->edad : ""; ?></td>
                <td colspan="1" style=""><strong>Est. Civil</strong><br><?php echo (isset($cliente[0])) ? $cliente[0]->cEstadoCivil : ""; ?></td>
                <td colspan="1" style=""><strong>C.F.</strong></td>
                <td colspan="2" style=""><strong>Teléfono</strong><br><?php echo (isset($cliente[0])) ? $cliente[0]->cCelular : ""; ?></td>

                <td colspan="1" style=""><strong>D.N.I. Conyugue</strong><br><?php echo (isset($fiadorconyugue[0])) ? $fiadorconyugue[0]->cNumerodocumento : ""; ?></td>
                <td colspan="1" style=""><strong>Edad</strong><br><?php echo (isset($fiador[0])) ? $fiador[0]->edad : ""; ?></td>
                <td colspan="1" style=""><strong>Est. Civil</strong><br><?php echo (isset($fiador[0])) ? $fiador[0]->cEstadoCivil : ""; ?></td>
                <td colspan="1" style=""><strong>C.F.</strong></td>
                <td colspan="2" style=""><strong>Teléfono</strong><br><?php echo (isset($fiador[0])) ? $fiador[0]->cCelular : ""; ?></td>
            </tr>

            <tr>
                <td colspan="6" style=""><strong>Apellidos y Nombres del Conyugue</strong><br><?php echo (isset($conyugue[0])) ? $conyugue[0]->cNombrePersona : ""; ?></td>
                <td colspan="6" style=""><strong>Apellidos y Nombres del Conyugue</strong><br><?php echo (isset($fiadorconyugue[0])) ? $fiadorconyugue[0]->cNombrePersona : ""; ?></td>
                
            </tr>

            <tr>
                <td colspan="6" style="">
                    <strong>Departamento: </strong><?php echo (isset($cliente[0])) ? $cliente[0]->cDepartamento : ""; ?><br>
                    <strong>Provincia: </strong><?php echo (isset($cliente[0])) ? $cliente[0]->cProvincia : ""; ?><br>
                    <strong>Distrito: </strong><?php echo (isset($cliente[0])) ? $cliente[0]->cDistrito : ""; ?><br>
                </td>
                <td colspan="6" style="">
                    <strong>Departamento: </strong><?php echo (isset($fiador[0])) ? $fiador[0]->cDepartamento : ""; ?><br>
                    <strong>Provincia: </strong><?php echo (isset($fiador[0])) ? $fiador[0]->cProvincia : ""; ?><br>
                    <strong>Distrito: </strong><?php echo (isset($fiador[0])) ? $fiador[0]->cDistrito : ""; ?><br>
                </td>
                
            </tr>
            <tr>
                <td colspan="6" style="">
                    <strong>Barrio / Sector: </strong><br>
                    <strong>Zona / Lugar: </strong><br>
                    <strong>Domicilio: </strong><?php echo (isset($cliente[0])) ? $cliente[0]->direccion : ""; ?><br>
                    <strong>Referencia: </strong><?php echo (isset($cliente[0])) ? $cliente[0]->cReferencia : ""; ?><br>
                </td>
                <td colspan="6" style="">
                    <strong>Barrio / Sector: </strong><br>
                    <strong>Zona / Lugar: </strong><br>
                    <strong>Domicilio: </strong><?php echo (isset($fiador[0])) ? $fiador[0]->cDireccion : ""; ?><br>
                    <strong>Referencia: </strong><?php echo (isset($fiador[0])) ? $fiador[0]->cReferencia : ""; ?><br>
                </td>
                
            </tr>

            <tr>
                <td colspan="6" style="">
                    <strong>Vivienda: </strong><?php echo (isset($solicitud_credito[0])) ? $solicitud_credito[0]->tipo_vivienda : ""; ?><br>
                    <strong>Propietario: </strong><?php echo (isset($solicitud_credito[0])) ? $solicitud_credito[0]->propietario : ""; ?><br>
                    <strong>Mnt. Alquiler: </strong><?php echo (isset($solicitud_credito[0])) ? $solicitud_credito[0]->monto_alquiler : ""; ?><br>
                  
                </td>
                <td colspan="6" style="">
                    <strong>Vivienda: </strong><?php echo (isset($solicitud_credito[0])) ? $solicitud_credito[0]->tipo_vivienda_fiador : ""; ?><br>
                    <strong>Propietario: </strong><?php echo (isset($solicitud_credito[0])) ? $solicitud_credito[0]->propietario_fiador : ""; ?><br>
                    <strong>Mnt. Alquiler: </strong><?php echo (isset($solicitud_credito[0])) ? $solicitud_credito[0]->monto_alquiler_fiador : ""; ?><br>
                </td>
                
            </tr>

            <tr>
                <td colspan="6" style="">
                    <strong>Profesión / Ocupación: </strong><br><?php echo (isset($solicitud_credito[0])) ? $solicitud_credito[0]->profesion : ""; ?><br>
                   
                </td>
                <td colspan="6" style="">
                    <strong>Profesión / Ocupación: </strong><br><?php echo (isset($solicitud_credito[0])) ? $solicitud_credito[0]->profesion_fiador : ""; ?><br>
                </td>
                
            </tr>   
            <tr>
                <td colspan="6" style="">
                    <strong>Dependiente: </strong><br>
                    <strong>Centro Trabajo: </strong><?php echo (isset($solicitud_credito[0])) ? $solicitud_credito[0]->centro_trabajo : ""; ?><br>
                    <strong>Cargo: </strong><?php echo (isset($solicitud_credito[0])) ? $solicitud_credito[0]->cargo : ""; ?>&nbsp;&nbsp;&nbsp;<strong>T.Lab.</strong><?php echo (isset($solicitud_credito[0])) ? $solicitud_credito[0]->tiempo_laboral : ""; ?><br>
                    <strong>Dirección: </strong><?php echo (isset($solicitud_credito[0])) ? $solicitud_credito[0]->direccion_trabajo : ""; ?><br>
                   
                </td>
                <td colspan="6" style="">
                    <strong>Dependiente: </strong><br>
                    <strong>Centro Trabajo: </strong><?php echo (isset($solicitud_credito[0])) ? $solicitud_credito[0]->centro_trabajo_fiador : ""; ?><br>
                    <strong>Cargo: </strong><?php echo (isset($solicitud_credito[0])) ? $solicitud_credito[0]->cargo_fiador : ""; ?>&nbsp;&nbsp;&nbsp;<strong>T.Lab.</strong><?php echo (isset($solicitud_credito[0])) ? $solicitud_credito[0]->tiempo_laboral_fiador : ""; ?><br>
                    <strong>Dirección: </strong><?php echo (isset($solicitud_credito[0])) ? $solicitud_credito[0]->direccion_trabajo_fiador : ""; ?><br>
                </td>
                
            </tr>  
            <tr>
                <td colspan="6" style="">
                <strong>Independiente: </strong><br>
                    <strong>Centro Trabajo: </strong><?php echo (isset($solicitud_credito[0])) ? $solicitud_credito[0]->razon_social_negocio : ""; ?><br>
                    <strong>Cargo: </strong><?php echo (isset($solicitud_credito[0])) ? $solicitud_credito[0]->cargo_independiente : ""; ?>&nbsp;&nbsp;&nbsp;<strong>T.Lab.</strong><?php echo (isset($solicitud_credito[0])) ? $solicitud_credito[0]->tiempo_laboral_independiente : ""; ?><br>
                    <strong>Dirección: </strong><?php echo (isset($solicitud_credito[0])) ? $solicitud_credito[0]->direccion_negocio : ""; ?><br>
                   
                </td>
                <td colspan="6" style="">
                    <strong>Independiente: </strong><br>
                    <strong>Centro Trabajo: </strong><?php echo (isset($solicitud_credito[0])) ? $solicitud_credito[0]->razon_social_negocio_fiador : ""; ?><br>
                    <strong>Cargo: </strong><?php echo (isset($solicitud_credito[0])) ? $solicitud_credito[0]->cargo_independiente_fiador : ""; ?>&nbsp;&nbsp;&nbsp;<strong>T.Lab.</strong><?php echo (isset($solicitud_credito[0])) ? $solicitud_credito[0]->tiempo_laboral_independiente_fiador : ""; ?><br>
                    <strong>Dirección: </strong><?php echo (isset($solicitud_credito[0])) ? $solicitud_credito[0]->direccion_negocio_fiador : ""; ?><br>
                </td>
                
            </tr>  
          

            <tr>
                <td colspan="3" style="">
                    <strong>Ingreso Neto Mensual: </strong><?php echo (isset($solicitud_credito[0])) ? number_format($solicitud_credito[0]->ingreso_neto_mensual, 2) : ""; ?><br>    
                    <strong>Ingreso Conyugue: </strong><?php echo (isset($solicitud_credito[0])) ? number_format($solicitud_credito[0]->ingreso_neto_conyugue, 2) : ""; ?>
                </td>
                <td colspan="3" style="">
                    <strong>Otros Ingresos: </strong><?php echo (isset($solicitud_credito[0])) ? number_format($solicitud_credito[0]->otros_ingresos, 2): ""; ?><br>  
                    <strong>Total Ingresos: </strong><?php echo (isset($solicitud_credito[0])) ? number_format($solicitud_credito[0]->total_ingresos, 2) : ""; ?>
                </td>
                <td colspan="3" style="">
                    <strong>Ingreso Neto Mensual: </strong><?php echo (isset($solicitud_credito[0])) ? number_format($solicitud_credito[0]->ingreso_neto_mensual_fiador, 2) : ""; ?><br>    
                    <strong>Ingreso Conyugue: </strong><?php echo (isset($solicitud_credito[0])) ? number_format($solicitud_credito[0]->ingreso_neto_conyugue_fiador, 2) : ""; ?>
                </td>
                <td colspan="3" style="">
                    <strong>Otros Ingresos: </strong><?php echo (isset($solicitud_credito[0])) ? number_format($solicitud_credito[0]->otros_ingresos_fiador, 2) : ""; ?><br>  
                    <strong>Total Ingresos: </strong><?php echo (isset($solicitud_credito[0])) ? number_format($solicitud_credito[0]->total_ingresos_fiador, 2) : ""; ?>
                </td>
                
                
            </tr>  
           
        </table>

        <table style="width: 730px !important; ">
            <tr>
                <td style="border: none !important; text-align: center;"><strong>DECLARO BAJO JURAMENTO QUE LA INFORMACIÓN PROPORCIONADA ES VERDADERA AUTORIZO A QUE SE VERIFIQUE LOS DATOS CONSIGNADOS EN LA PRESENTE.</strong></td>
            </tr>>
        </table>

            
       
            
        <table style="width: 730px !important; margin-top: 75px;">
            <tr>
                <td style="text-align: center; border-top: 1px solid black;"><strong>Firma de Solicitante</strong></td>
                <td></td>
                <td style="text-align: center; border-top: 1px solid black;"><strong>Firma del Conyugue</strong></td>
                <td></td>
                <td style="text-align: center; border-top: 1px solid black;"><strong>Firma del Fiador Solidario</strong></td>
                <td></td>
                <td style="text-align: center; border-top: 1px solid black;"><strong>Firma del Conyugue del Fiador</strong></td>
            </tr>>
        </table>






    </main>

</body>

</html>