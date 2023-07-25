<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 24/04/2018
 * Time: 10:27 AM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\ClassificationAcquisition\ClassificationAcquisitionInterface;
use Illuminate\Http\Request;

class ClassificationAcquisitionController extends Controller
{
    public function getClassificationAcquisition(Request $request, ClassificationAcquisitionInterface $repo)
    {
        try {
            $s = $request->input('search', '');
            $params = ['IdClasificacionBSAdquiridos', 'Descripcion'];
            $info = parseDataList($repo->search($s), $request, 'IdClasificacionBSAdquiridos', $params, 'ASC');
            $data = $info[1];

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