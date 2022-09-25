<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 18/09/2017
 * Time: 12:57 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Level\LevelInterface;
use App\Http\Recopro\Project\ProjectInterface;
use App\Http\Recopro\ProjectConsolidated\ProjectConsolidatedClientTrait;
use App\Http\Recopro\ProjectConsolidated\ProjectConsolidatedMetaTrait;
use App\Http\Recopro\ProjectConsolidated\ProjectConsolidatedTrait;
use Illuminate\Http\Request;

class ConsolidatedProjectsController extends Controller
{
    use ProjectConsolidatedClientTrait;
    use ProjectConsolidatedMetaTrait;
    use ProjectConsolidatedTrait;

    public function generate($id, ProjectInterface $repo, LevelInterface $levelRepo, Request $request)
    {
        try {
            $data = [];
            $option = (int)$request->input('option');
            $p = $repo->find($id);

            if ($option == 1) {
                $data = $this->generateReportClient($p);
            } else if ($option == 2) {
                $data = $this->generateReportMeta($p, $levelRepo);
            }

            return response()->json([
                'status' => true,
                'state' => $this->stateProject($p),
                'data' => $data
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
}