<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 05/06/2018
 * Time: 12:05 PM
 */

namespace App\Http\Controllers;


use App\Http\Recopro\CostCenter\CostCenterInterface;
use Illuminate\Http\Request;

class CostCenterController extends Controller
{
    public function all(Request $request, CostCenterInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['IdCentroCosto', 'Descripcion'];
        return parseList($repo->search($s), $request, 'IdCentroCosto', $params);
    }
}