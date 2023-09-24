<?php

namespace App\Http\Controllers;

use App\Http\Recopro\Localizacion\LocalizacionInterface;
use Illuminate\Http\Request;

class LocalizationController extends Controller
{
    public function __construct()
    {
        $this->middleware('ajax', ['only' => ['all']]);
    }

    public function all(Request $request, LocalizacionInterface $repo)
    {
        try {
            $filter = $request->all();
            $params = ['idLocalizacion', 'codigo', 'descripcion'];
            $info = parseDataList($repo->search($filter), $request, 'idLocalizacion', $params);

            $data = $info[1];

            foreach ($data as $d) {
                $d->id = $d->idLocalizacion;
                unset($d->idLocalizacion);
            }
            return response()->json([
                'Result' => 'OK',
                'TotalRecordCount' => $info[0],
                'Records' => $data
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'Result' => 'ERROR',
                'Message' => [$e->getMessage()]
            ]);
        }
    }
}