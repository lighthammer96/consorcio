<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 9:31 AM
 */

use App\Http\Recopro\Module\Module;
use App\Http\Recopro\Module\ModuleRepository;
use Carbon\Carbon;

function printR($data)
{
    echo '<pre>';
    print_r($data);
    exit;
}

function formatNumberTotal($number, $decimals)
{
    return number_format($number, $decimals, '.', ',');
}

function insertBeforeArray($input, $index, $element) {
    if (!array_key_exists($index, $input)) {
        throw new Exception("Index not found");
    }
    $tmpArray = array();
    $originalIndex = 0;
    foreach ($input as $key => $value) {
        if ($key === $index) {
            $tmpArray[] = $element;
            break;
        }
        $tmpArray[$key] = $value;
        $originalIndex++;
    }
    array_splice($input, 0, $originalIndex, $tmpArray);
    return $input;
}

function insertAfterArray($input, $index, $element) {
    if (!array_key_exists($index, $input)) {
        throw new Exception("Index not found");
    }
    $tmpArray = array();
    $originalIndex = 0;
    foreach ($input as $key => $value) {
        $tmpArray[$key] = $value;
        $originalIndex++;
        if ($key === $index) {
            $tmpArray[] = $element;
            break;
        }
    }
    array_splice($input, 0, $originalIndex, $tmpArray);
    return $input;
}

function removeElementWithValue($array, $key, $value){
    foreach($array as $subKey => $subArray){
        if($subArray[$key] == $value){
            unset($array[$subKey]);
        }
    }
    return $array;
}

function validatePermission($url)
{
    $profile_id = auth()->user()->profile_id;
    $module = new ModuleRepository(new Module());
    $permission = $module->getByProfileUrl($profile_id, $url);

    return (isset($permission));
}

function parseDataList($data, $request, $sort_default, $data_select, $sort_asc_desc = 'ASC')
{
    $search = ($request->has('jtSorting')) ? explode(' ', $request->input('jtSorting')) : [$sort_default, $sort_asc_desc];

    $rows = $data->count();

    $data = $data->select($data_select)
        ->skip($request->input('jtStartIndex'))
        ->take($request->input('jtPageSize'));
    //  print_r($sort_default);
    if (in_array($search[0], $data_select)) {
        $data = $data->orderBy($search[0], $search[1]);
    }
    
    // print_r($data->toSql()); exit;    
    $data = $data->get();


    foreach ($data as $d) {
        if ($d->user_created) {
            $d->user_created = $d->user_c->name;
            unset($d->user_c);
        }
        if ($d->user_updated) {
            $d->user_updated = $d->user_u->name;
            unset($d->user_u);
        }
        if ($d->created_at) {
            $d->created_date = Carbon::parse($d->created_at)->format('d/m/Y');
            unset($d->created_at);
        }
        if ($d->updated_at) {
            $d->updated_date = Carbon::parse($d->updated_at)->format('d/m/Y');
            unset($d->updated_at);
        }
    }
    return [$rows, $data];
}

function parseList($data, $request, $sort_default, $data_select)
{
    $info = parseDataList($data, $request, $sort_default, $data_select);

    return response()->json([
        'Result' => 'OK',
        'TotalRecordCount' => $info[0],
        'Records' => $info[1]
    ]);
}

function parseSelect($data, $key_id, $key_description)
{
    return response()->json([
        'Result' => 'OK',
        'Options' => parseSelectOnly($data, $key_id, $key_description)
    ]);
}

function parseSelectOnly($data, $key_id, $key_description)
{
    $rows = [];

    foreach ($data as $d) {
        $rows[] = [
            'DisplayText' => $d->$key_description,
            'Value' => $d->$key_id
        ];
    }
    return $rows;
}

function parseSelectOption($data, $key_id, $key_description, $key_alternative)
{
    $rows = [];

    foreach ($data as $d) {
        $rows[] = [
            'DisplayText' => (is_null($d->$key_description)) ? $d->$key_alternative : $d->$key_description,
            'Value' => $d->$key_id
        ];
    }
    return $rows;
}

function parseSelectAndCodeOnly($data, $key_id, $key_description, $key_code, $address, $local)
{
    $rows = [];

    foreach ($data as $d) {
        $rows[] = [
            'DisplayText' => $d->$key_code . ' - ' . $d->$key_description,
            'Value' => $d->$key_id,
            'Address' => $d->$address,
            'Local' => $d->$local
        ];
    }
    return $rows;
}

function parseSelectAttributesTwo($data, $key_id, $key_one, $key_two)
{
    $rows = [];

    foreach ($data as $d) {
        $rows[] = [
            'from' => $d->$key_one,
            'to' => $d->$key_two,
            'code' => $d->$key_id,
        ];
    }
    return $rows;
}

function parseSelectAndSerialOnly($data, $key_id, $key_number, $key_serial)
{
    $rows = [];

    foreach ($data as $d) {
        $rows[] = [
            'DisplayText' => $d->$key_serial,
            'DisplayNumber' => $d->$key_number,
            'Value' => $d->$key_id
        ];
    }
    return $rows;
}

function parseSelectTwoOnly($data, $key_id, $key_one, $key_two)
{
    $rows = [];

    foreach ($data as $d) {
        $rows[] = [
            'DisplayTextOne' => $d->$key_one,
            'DisplayTextTwo' => $d->$key_two,
            'Value' => $d->$key_id
        ];
    }
    return $rows;
}

function setIdTableByMax($max, $attributes)
{
    $id = ($max) ? (int)$max + 1 : 1;
    $attributes['id'] = $id;
    return $attributes;
}
 
function generateExcelCuentasxCobrar($data_cabe,$simboloMoneda,$cambio,$file_name, $sheet_name)
{
    // echo "<pre>";
    // print_r($data); exit;
    $file = Excel::create($file_name, function ($excel) use ($data_cabe,$simboloMoneda,$cambio,$sheet_name) {
        $excel->sheet($sheet_name, function ($sheet) use ($data_cabe,$simboloMoneda,$cambio) {
            $sheet->loadView('excel.viewCuentasxCobrar')->with('data_cabe', $data_cabe)->with('simboloMoneda', $simboloMoneda)->with('cambio', $cambio);
        });
    });

    $file = $file->string('xlsx');

    $response = [
        'name' => $file_name,
        'file' => "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," . base64_encode($file)
    ];

    return response()->json($response);
}

function generateExcel($data, $file_name, $sheet_name, $view = 'view')
{
    $file = Excel::create($file_name, function ($excel) use ($data, $sheet_name, $view) {
        $excel->sheet($sheet_name, function ($sheet) use ($data, $view) {
            $sheet->setColumnFormat(array(
                'J' =>  \PHPExcel_Style_NumberFormat::FORMAT_NUMBER_00,
                'K' =>  \PHPExcel_Style_NumberFormat::FORMAT_NUMBER_00
               
            ));
            $sheet->loadView('excel.' . $view)->with('data', $data);
        });
    });

    $file = $file->string('xlsx');

    $response = [
        'name' => $file_name,
        'file' => "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," . base64_encode($file)
    ];

    return response()->json($response);
}


function generateExcelComisiones($data, $file_name, $sheet_name)
{
    // echo "<pre>";
    // print_r($data); exit;
    $file = Excel::create($file_name, function ($excel) use ($data, $sheet_name) {
        $excel->sheet($sheet_name, function ($sheet) use ($data) {
            $sheet->setColumnFormat(array(
                'J' =>  \PHPExcel_Style_NumberFormat::FORMAT_NUMBER_00,
                'K' =>  \PHPExcel_Style_NumberFormat::FORMAT_NUMBER_00
               
            ));
            $sheet->loadView('excel.comisiones')->with('data', $data);
        });
    });

    $file = $file->string('xlsx');

    $response = [
        'name' => $file_name,
        'file' => "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," . base64_encode($file)
    ];

    return response()->json($response);
}      

// Generar el excel del modulo Reporte de Documentos Emitidos
function generateExcelRDE($data, $file_name, $sheet_name)
{
    $file = Excel::create($file_name, function ($excel) use ($data, $sheet_name) {
        $excel->sheet($sheet_name, function ($sheet) use ($data) {
            $sheet->setColumnFormat(array(
                'C' =>  \PHPExcel_Style_NumberFormat::FORMAT_TEXT,
                'G' =>  \PHPExcel_Style_NumberFormat::FORMAT_TEXT,
                'O' =>  \PHPExcel_Style_NumberFormat::FORMAT_TEXT

            ));
            $sheet->loadView('excel.view')->with('data', $data);


        });
    });

    $file = $file->string('xlsx');

    $response = [
        'name' => $file_name,
        'file' => "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," . base64_encode($file)
    ];

    return response()->json($response);
}

function generateExcelOrdenSer($data, $file_name,$Marca,$tipoveh,$FechaInicioFiltro,$FechaFinFiltro,$idMarca,$idtipoveh,$fechacAc, $sheet_name)
{
    $file = Excel::create($file_name, function ($excel) use ($data,$idMarca,$idtipoveh,$FechaInicioFiltro,$FechaFinFiltro,$Marca,$tipoveh,$fechacAc,$sheet_name) {
        $excel->sheet($sheet_name, function ($sheet) use ($data,$idMarca,$idtipoveh,$FechaInicioFiltro,$FechaFinFiltro,$Marca,$tipoveh,$fechacAc) {
            $sheet->loadView('excel.view_orden_diario')->with('data', $data)->with('idMarca', $idMarca)->with('idtipoveh', $idtipoveh)->with('FechaInicioFiltro', $FechaInicioFiltro)->with('FechaFinFiltro', $FechaFinFiltro)->with('Marca', $Marca)->with('tipoveh', $tipoveh)->with('fechacAc', $fechacAc);
        });
    });

    $file = $file->string('xlsx');

    $response = [
        'name' => $file_name,
        'file' => "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," . base64_encode($file)
    ];

    return response()->json($response);
}
function generateExcelMovimientoCierre($data, $file_name, $sheet_name,$fechacA,$simboloMoneda,$periodo,$estado)
{
    $file = Excel::create($file_name, function ($excel) use ($data, $sheet_name,$fechacA,$simboloMoneda,$periodo,$estado) {
        $excel->sheet($sheet_name, function ($sheet) use ($data,$fechacA,$simboloMoneda,$periodo,$estado) {
            $sheet->loadView('excel.viewReporteCierre')->with('data', $data)->with('fechacA',$fechacA)->with('simboloMoneda',$simboloMoneda)->with('periodo',$periodo)->with('estado',$estado);
        });
    });

    $file = $file->string('xlsx');

    $response = [
        'name' => $file_name,
        'file' => "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," . base64_encode($file)
    ];

    return response()->json($response);
}


function generateExcelMensualCompleto($data, $file_name, $sheet_name,$data_info,$anio,$data_tecnico,$data_metas)
{
    
    $file = Excel::create($file_name, function ($excel) use ($data, $sheet_name,$data_info,$anio,$data_tecnico,$data_metas) {
         $name="XXX";
        foreach ($sheet_name as $valor) {
              if($valor==1){
                $name="ENERO";
              }else if ($valor==2){
                 $name="FEBRERO";
              }else if ($valor==3){
                 $name="MARZO";
              }else if ($valor==4){
                 $name="ABRIL";
              }else if ($valor==5){
                 $name="MAYO";
              }else if ($valor==6){
                 $name="JUNIO";
              }else if ($valor==7){
                 $name="JULIO";
              }else if ($valor==8){
                 $name="AGOSTO";
              }else if ($valor==9){
                 $name="SEPTIEMBRE";
              }else if ($valor==10){
                 $name="OCTUBRE";
              }else if ($valor==11){
                 $name="NOVIEMBRE";
              }else if ($valor==12){
                 $name="DICIEMBRE";
              }
              
        }
        $namea='RESUMEN';
        $nameb='DETALLADO';
        $excel->sheet($namea, function ($sheet) use ($data,$data_info,$anio,$name,$data_tecnico,$data_metas,$sheet_name) {
                 $sheet->loadView('excel.viewReporteMensualCompleto')->with('data', $data)->with('mesName',$name)->with('data_info',$data_info)->with('anio',$anio)->with('data_tecnico',$data_tecnico)->with('data_metas',$data_metas)->with('meses_array',$sheet_name);
        });
        if(count($data_info)>0){
           $excel->sheet($nameb, function ($sheet) use ($data,$data_info,$anio,$name,$data_tecnico,$data_metas,$sheet_name) {
                 $sheet->loadView('excel.viewReportePaginaDetallada')->with('data', $data)->with('mesName',$name)->with('data_info',$data_info)->with('anio',$anio)->with('data_tecnico',$data_tecnico)->with('data_metas',$data_metas)->with('meses_array',$sheet_name);
          });     
        }
          
    });

    $file = $file->string('xlsx');

    $response = [
        'name' => $file_name,
        'file' => "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," . base64_encode($file)
    ];

    return response()->json($response);
}

function generateExcelMensual($data, $file_name, $sheet_name,$data_info,$anio,$data_tecnico,$data_metas,$mantenimientos)
{
    ini_set('max_execution_time', '3000');
    set_time_limit(3000);
    $file = Excel::create($file_name, function ($excel) use ($data, $sheet_name,$data_info,$anio,$data_tecnico,$data_metas,$mantenimientos) {
         $name="XXX";
        foreach ($sheet_name as $valor) {
              if($valor==1){
                $name="ENERO";
              }else if ($valor==2){
                 $name="FEBRERO";
              }else if ($valor==3){
                 $name="MARZO";
              }else if ($valor==4){
                 $name="ABRIL";
              }else if ($valor==5){
                 $name="MAYO";
              }else if ($valor==6){
                 $name="JUNIO";
              }else if ($valor==7){
                 $name="JULIO";
              }else if ($valor==8){
                 $name="AGOSTO";
              }else if ($valor==9){
                 $name="SEPTIEMBRE";
              }else if ($valor==10){
                 $name="OCTUBRE";
              }else if ($valor==11){
                 $name="NOVIEMBRE";
              }else if ($valor==12){
                 $name="DICIEMBRE";
              }
              $excel->sheet($name, function ($sheet) use ($data,$valor,$data_info,$anio,$name,$data_tecnico,$data_metas,$mantenimientos) {
                // print_r($data);
                // print_r($name);
                // print_r($valor);
                // print_r($data_info);
                // print_r($anio);
                // print_r($data_tecnico);
                // print_r($data_metas);
                // print_r($mantenimientos); 
                // exit;
                 $sheet->loadView('excel.viewReporteMensual')->with('data', $data)->with('mesName',$name)->with('mes',$valor)->with('data_info',$data_info)->with('anio',$anio)->with('data_tecnico',$data_tecnico)->with('data_metas',$data_metas)->with('mantenimientos',$mantenimientos);
           
              });    
            
        }
        // for ($i = 0; $i < $sheet_name; ++$i){
              
              
        // }
       
        //  $excel->sheet($sheet_name, function ($sheet) use ($data) {
        //     $sheet->loadView('excel.viewReporteMensual')->with('data', $data);
        // });
      
    });

    $file = $file->string('xlsx');
    
    $response = [
        'name' => $file_name,
        'file' => "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," . base64_encode($file)
    ];
   

    return response()->json($response);
}

function generateExcelMetas($data, $file_name, $sheet_name,$idusu,$usuario,$fecha_actual,$cambio,$Anio,$mes,$data_mensual,$data_orden,$data_compania,$simboloMoneda)
{
    
    $file = Excel::create($file_name, function ($excel) use ($sheet_name,$idusu,$usuario,$fecha_actual,$cambio,$Anio,$mes,$data_mensual,$data_orden,$data_compania,$simboloMoneda) {
          $excel->sheet($sheet_name, function ($sheet) use ($idusu,$usuario,$fecha_actual,$cambio,$Anio,$mes,$data_mensual,$data_orden,$data_compania,$simboloMoneda) {
             $sheet->loadView('excel.viewReporteMeta')->with('idusu', $idusu)->with('usuario', $usuario)->with('fecha_actual', $fecha_actual)->with('cambio', $cambio)->with('Anio', $Anio)->with('mes', $mes)->with('data_orden', $data_orden)->with('data_compania', $data_compania)->with('simboloMoneda', $simboloMoneda)->with('data_mensual', $data_mensual);
          });    
    });

    $file = $file->string('xlsx');

    $response = [
        'name' => $file_name,
        'file' => "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," . base64_encode($file)
    ];

    return response()->json($response);
}

function generatePDF($data, $file_name, $type)
{
//    $pdf = PDF::loadView('pdf.table', compact('data'))->setPaper('a4', $type)->setWarnings(false);
//    $pdf->output();
//    $dom_pdf = $pdf->getDomPDF();
//
//    $canvas = $dom_pdf ->get_canvas();
//    $x = $canvas->get_width() - 90;
//    $y = $canvas->get_height() - 25;
//    $canvas->page_text($x, $y, "Página {PAGE_NUM} de {PAGE_COUNT}", null, 9, array(0, 0, 0));
//    $pdf = $pdf->stream();
//    return $pdf;
//
//    $response =  [
//        'name' => $file_name,
//        'file' => "data:application/pdf;base64,".base64_encode($pdf)
//    ];
//
//    return response()->json($response);
}


function fieldReport($data, $bold, $config)
{
    $info = [];
    foreach ($data as $item => $d) {
        $info[] = [
            'text' => (string)$d,
            'fontSize' => 8,
            'bold' => $bold,
            'alignment' => $config[$item]
        ];
    }
    return $info;
}
function fieldReportVC($data, $bold, $config)
{
    $info = [];
    foreach ($data as $item => $d) {
        $info[] = [
            'text' => (string)$d,
            'fontSize' => 7,
            'bold' => $bold,
            'alignment' => $config[$item]
        ];
    }
    return $info;
}

function generateDataPDF($data, $orientation, $img, $type_pdf = 1)
{
    $title = $data['title'];
    $data = $data['data'];
    $info = [];

    $header1[] = 'ITEM';
    $header2[] = 'center';
    foreach ($data[0] as $d) {
        $header1[] = $d;
        $header2[] = 'center';
    }
    unset($data[0]);

    $info[] = fieldReport($header1, true, $header2);

    foreach ($data as $item => $d) {
        $body1 = [];
        $body2 = [];
        $body1[] = $item;
        $body2[] = 'center';
        foreach ($d as $i) {
            $body1[] = $i[1];
            $body2[] = $i[0];
        }
        $info[] = fieldReport($body1, false, $body2);
    }

    $path = public_path('img/' . $img);
    $type_image = pathinfo($path, PATHINFO_EXTENSION);
    $image = file_get_contents($path);
    $image = 'data:image/' . $type_image . ';base64,' . base64_encode($image);

    return response()->json([
        'status' => true,
        'type' => $type_pdf,
        'pageSize' => 'A4',
        'pageOrientation' => $orientation,
        'img' => $image,
        'title' => $title,
        'info' => $info 
    ]);
}
function generateDataPDFVC($data, $orientation, $img, $type_pdf = 1)
{
    $title = $data['title'];
    $data = $data['data'];
    $info = [];

    $header1[] = 'ITEM';
    $header2[] = 'center';
    foreach ($data[0] as $d) {
        $header1[] = $d;
        $header2[] = 'center';
    }
    unset($data[0]);

    $info[] = fieldReportVC($header1, true, $header2);

    foreach ($data as $item => $d) {
        $body1 = [];
        $body2 = [];
        $body1[] = $item;
        $body2[] = 'center';
        foreach ($d as $i) {
            $body1[] = $i[1];
            $body2[] = $i[0];
        }
        $info[] = fieldReportVC($body1, false, $body2);
    };

    // $path = public_path('img/' . $img);
    // $type_image = pathinfo($path, PATHINFO_EXTENSION);
    // $image = file_get_contents($path);
    $image = $img;

    return response()->json([
        'status' => true,
        'type' => $type_pdf,
        'pageSize' => 'A4',
        'pageOrientation' => $orientation,
        'img' => $image,
        'title' => $title,
        'info' => $info 
    ]);
}

function generateDataReferralGuidePDF($data, $orientation, $img, $type_pdf = 1)
{
    $data_header = [];
    $data_body = [];
    foreach ($data as $item => $k) {
        $data_header[] = $data[$item]['data'];
        $data_body[] = $data[$item]['data_detail'];
    }
    $title = $data[0]['title'];


    $path = public_path('img/' . $img);
    $type_image = pathinfo($path, PATHINFO_EXTENSION);
    $image = file_get_contents($path);
    $image = 'data:image/' . $type_image . ';base64,' . base64_encode($image);

    return response()->json([
        'status' => true,
        'type' => $type_pdf,
        'pageSize' => 'A4',
        'pageOrientation' => $orientation,
        'img' => $image,
        'title' => $title,
        'info' => $data_body,
        'data_header' => $data_header
    ]);

}


function generateDataReceptionTransfer($data, $orientation, $img, $type_pdf = 1)
{
//    dd($data);
    $data_header = [];
    $data_body = [];
    $data_header[] = $data['data'];
    $data_body[] = $data['data_detail'];

//    dd($data_header);
    $title = $data['title'];
    $path = public_path('img/' . $img);
    $type_image = pathinfo($path, PATHINFO_EXTENSION);
    $image = file_get_contents($path);
    $image = 'data:image/' . $type_image . ';base64,' . base64_encode($image);

    return response()->json([
        'status' => true,
        'type' => $type_pdf,
        'pageSize' => 'A4',
        'pageOrientation' => $orientation,
        'img' => $image,
        'title' => $title,
        'info' => $data_body,
        'data_header' => $data_header
    ]);

}

function separateNSC($number)
{
    $nro_doc = explode('-', $number);
    $series = (count($nro_doc) > 1) ? substr($nro_doc[0], -5) : null;
    $series = trim($series);
    $series = explode(' ', $series);
    $series = end($series);
    $series = trim($series);
    if (count($nro_doc) > 1) {
        unset($nro_doc[0]);
    }
    $nro_doc = implode('-', $nro_doc);
    return [$series, $nro_doc];
}

function array_orderBy()
{
    $args = func_get_args();
    $data = array_shift($args);
    foreach ($args as $n => $field) {
        if (is_string($field)) {
            $tmp = array();
            foreach ($data as $key => $row)
                $tmp[$key] = $row[$field];
            $args[$n] = $tmp;
        }
    }
    $args[] = &$data;
    call_user_func_array('array_multisort', $args);
    return array_pop($args);
}
