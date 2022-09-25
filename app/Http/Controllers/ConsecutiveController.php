<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Consecutive\ConsecutiveTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Consecutive\ConsecutiveInterface;
use App\Http\Recopro\Shop\ShopInterface;
use App\Http\Recopro\TypeConsecutive\TypeConsecutiveInterface;
use App\Http\Requests\ConsecutiveRequest;
class ConsecutiveController extends Controller
{
     use ConsecutiveTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, ConsecutiveInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['cCodConsecutivo', 'cCodTipoCons','cDetalle','nCodTienda','nConsecutivo'];
        return parseList($repo->search($s), $request, 'cCodConsecutivo', $params);
    }

    public function create(ConsecutiveInterface $repo, ConsecutiveRequest $request)
    {
        $data = $request->all();
        $data['cDetalle'] = strtoupper($data['cDetalle']);
        $data['cCodConsecutivo'] = strtoupper($data['cCodConsecutivo']);
        $repo->create($data);
        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);
    }

    public function update(ConsecutiveInterface $repo, Request $request)
    {
        $data = $request->all();
        $id = $data['cCodConsecutivo'];
        $data['cDetalle'] = strtoupper($data['cDetalle']);
        $data['cCodConsecutivo'] = strtoupper($data['cCodConsecutivo']);
        $repo->update($id, $data);
        return response()->json(['Result' => 'OK']);
    }

    public function destroy(ConsecutiveInterface $repo, Request $request)
    {
        $id = $request->input('cCodConsecutivo');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(ConsecutiveInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE CONSECUTIVOS', 'Consecutivos');
    }
    public function getTipoConsecutivo(TypeConsecutiveInterface $repo)
    {
        return parseSelect($repo->all(), 'cCodTipoCons', 'cTipoConsecutivo');
    }
    public function getTienda(ShopInterface $repo)
    {
        return parseSelect($repo->all(), 'idTienda', 'descripcion');
    }
}
