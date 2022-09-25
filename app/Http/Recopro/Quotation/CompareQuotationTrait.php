<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 28/08/2017
 * Time: 11:12 AM
 */

namespace App\Http\Recopro\Quotation;


trait CompareQuotationTrait
{
    public function getCompareQuotation($contest_id, $array_provider, $repo, $datProvider)
    {
        try {
            $items = [];
            $dat_all = [];
            $data_provider = [];

            $data = $repo->find($contest_id);
            $type_change = isset($data->type_change->Compra) ? $data->type_change->Compra : 0.00;
            $data->product_consolidated = $data->compare_contest_consolidated;
            foreach ($data->product_consolidated as $d) {
                $d->description = $d->article->description;
                $d->detail = $d->compare_contest_provider_detail;
                $items = [];
                $consolidated_provider = [];
                $i = 0;
                foreach ($d->detail as $det) {
                    $items[] = [
                        'id' => $det->id,
                        'contest_provider_id' => $det->contest_provider_id,
                        'quantity' => $det->quantity,
                        'description' => $det->description,
                        'price' => $det->price,
                        'total' => $det->total,
                        'total_local' => $det->total_local,
                        'total_dollar' => $det->total_dollar,
                        'price_buyer' => $det->price_buyer,
                        'price_system' => $det->price_system
                    ];
                    $consolidated_provider[$i] = $det->contest_provider_id;
                    $i++;
                }
                $condition = false;
                foreach ($array_provider as $provider) {
                    if (in_array($provider, $consolidated_provider)) {
                    } else {
                        $items[] = [
                            'id' => '',
                            'contest_provider_id' => $provider,
                            'quantity' => 0,
                            'description' => '-',
                            'price' => '-',
                            'total' => 0
                        ];
                        $condition = true;
                    }
                }
                $array_item = (array)$items;
                $arrAux = array();
                foreach ($array_item as $key => $row) {
                    $arrAux[$key] = is_object($row) ? $arrAux[$key] = $row->contest_provider_id : $row['contest_provider_id'];
                }
                array_multisort($arrAux, SORT_ASC, $array_item);


                $dat_all[] = [
                    'id' => $d->id,
                    'quantity' => $d->quantity,
                    'description' => $d->description,
                    'data_detail' => $array_item,
                    'state' => $data->state,
                    'total_provider' => count($array_provider),
                    'provider' => $datProvider,
                    'type_change_purchase' => $type_change
                ];
                unset($d->compare_contest_provider_detail, $d->article);
            }
            unset($data->compare_contest_consolidated);


            return $dat_all;


        } catch (\Exception $e) {
            throw new \Exception($e);

        }

    }


}