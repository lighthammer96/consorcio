<?php

namespace App\Http\Recopro\ReceptionPurchaseOrderDetail;

interface ReceptionPurchaseOrderDetailInterface
{
    public function create(array $data);

    public function update($id, array $attributes);

    public function createUpdate(array $attributes);

    public function deleteByProduct($roc_id, $ids);

    public function deleteByPOD($roc_id, $ids);

    public function find($id);

    public function findByOC($purchase_id, $article_id);

    public function destroy($id);

    public function destroyExcept($id, $ids);

    public function getExcept($id, $ids);
}