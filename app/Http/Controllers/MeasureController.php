<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017 
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Measure\MeasureTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Measure\MeasureInterface;
use App\Http\Requests\MeasureRequest;

class MeasureController extends Controller
{

 	use MeasureTrait;
    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, MeasureInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['IdUnidadMedida', 'Descripcion as Medida','EquivalenciaSunat as Equivalencia','Abreviatura'];
        return parseList($repo->search($s), $request, 'IdUnidadMedida', $params);
    }
      public function create(MeasureInterface $repo, MeasureRequest $request)
    {
        $data = $request->all();
        $table='ERP_UnidadMedida';
        $id='IdUnidadMedida';
        $data['IdUnidadMedida'] = $repo->get_consecutivo($table,$id);
        $data['Descripcion'] = strtoupper($data['Medida']); 
        $data['EquivalenciaSunat'] = $data['Equivalencia'];
        $repo->create($data);
        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);
    }

    public function update(MeasureInterface $repo, MeasureRequest $request)
    {
        $data = $request->all();
        $id = $data['IdUnidadMedida'];
        $data['Descripcion'] = $data['Medida'];
        $data['EquivalenciaSunat'] = $data['Equivalencia'];
        $repo->update($id, $data);
        return response()->json(['Result' => 'OK']);
    }
      public function destroy(MeasureInterface $repo, Request $request)
    {
        $id = $request->input('IdUnidadMedida');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }
        public function excel(MeasureInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE UNIDADES DE MEDIDA', 'UNIDAD DE MEDIDA');
    }

}
