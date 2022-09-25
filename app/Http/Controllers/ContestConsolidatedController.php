<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 07/07/2017
 * Time: 04:10 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\ContestConsolidated\ContestConsolidatedInterface;
use App\Http\Recopro\Project\ProjectInterface;
use App\Http\Recopro\Quotation\QuotationTrait;
use App\Http\Recopro\Requirement\RequirementInterface;
use Illuminate\Http\Request;

class ContestConsolidatedController extends Controller
{
    use QuotationTrait;

    public function getData($requirements, RequirementInterface $repo)
    {
        $data = [];
        $articles = [];

        foreach ($requirements as $req) {
            $r = $repo->find($req);
            foreach ($r->detail as $d) {
                $article = $d->project_consolidated->article;
                if (in_array($article->id, $articles)) {
                    $key = array_search($article->id, array_column($data, 'id'));
                    $data[$key]['quantity'] += $d->quantity_requested;
                } else {
                    $brands = [];
                    foreach ($article->brandsProduct as $bp) {
                        $b = $bp->brand;
                        $brands[] = [
                            'id' => $b->id,
                            'description' => $b->description
                        ];
                    }
                    $data[] = [
                        'id' => $article->id,
                        'code' => $article->code_matrix,
                        'description' => $article->description,
                        'um' => ($article->unity) ? $article->unity->Descripcion : '',
                        'quantity' => $d->quantity_requested,
                        'brands' => $brands
                    ];
                    $articles[] = $article->id;
                }
            }
        }
        return $data;
    }

    public function itemsList(Request $request, ContestConsolidatedInterface $repo)
    {
        try {
            $filter = $request->all();
            $params = ['id', 'article_id', 'quantity'];

            $info = parseDataList($repo->search($filter), $request, 'id', $params);

            $data = $info[1];

            foreach ($data as $d) {
                $article = $d->article;
                $d->product = $article->description;
                $d->model = $article->model;
                $d->code = $article->code_matrix;
                $d->um = ($article->unity) ? $article->unity->Descripcion : '';
                $d->average_price = (is_null($article->average_cost)) ?
                    '' : number_format($article->average_cost, 2, '.', '');
                unset($d->article);
            }

            return response()->json([
                'Result' => 'OK',
                'TotalRecordCount' => $info[0],
                'Records' => $data
            ]);

        } catch (\Exception $e) {
            throw new \Exception($e);
        }
    }

    public function all(Request $request, RequirementInterface $requirementRepo)
    {
        try {
            $data = [];
            if (!empty($request->input('requirements'))) {
                $requirements = explode('-', $request->input('requirements'));
                $data = $this->getData($requirements, $requirementRepo);
            }
            return response()->json([
                'status' => true,
                'data' => $data
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function excel(Request $request, RequirementInterface $requirementRepo)
    {
        try {
            $requirements = $request->input('requirements');
            $data = $this->getData($requirements, $requirementRepo);

            return generateExcel($this->excelConsolidated($data), 'CONSOLIDADO DE REQUERIMIENTOS', 'cONSOLIDADO');

        } catch (\Exception $e) {
//            throw new \Exception($e);
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function pdf(Request $request, RequirementInterface $requirementRepo)
    {
        $requirements = $request->input('requirements');
        $data = $this->getData($requirements, $requirementRepo);

        $data = $this->excelConsolidated($data);
        return generateDataPDF($data, 'portrait', 'logo.jpg', 2);
    } 
}