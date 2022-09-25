<?php

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 25/07/2017
 * Time: 12:22 PM
 */

namespace App\Http\Recopro\ReferralGuideProduct;

class ReferralGuideProductRepository implements ReferralGuideProductInterface
{

    protected $model;

    public function __construct(ReferralGuideProduct $model)
    {
        $this->model = $model;
    }

    public function deleteByReferralGuide($referral_guide_id, array $ids)
    {
        $this->model->where('referral_guide_id', $referral_guide_id)
            ->whereNotIn('code', $ids)
            ->delete();
    }

    public function createUpdate(array $attributes)
    {
//        return $this->model->firstOrCreate($attributes);
        $model = $this->model->where('referral_guide_id', $attributes['referral_guide_id'])
            ->where('code', $attributes['code'])
            ->withTrashed()
            ->first();

        $attributes['user_updated'] = auth()->id();
        if (isset($model)) {
            if ($model->trashed()) {
                $model->restore();
            }
            $model->update($attributes);
        } else {
            $attributes['user_created'] = auth()->id();
            $model = $this->model->create($attributes);
        }
        return $model;

    }

    public function findByReferralGuide($referral_guide_id, $ids)
    {
        $model = $this->model->where('referral_guide_id', $referral_guide_id)
            ->where('product_id', $ids)->first();

        if (isset($model)) {
            return $model->quantity;
        } else {
            return 0;
        }
        // dd($model->quantity);
    }

    public function deleteByReferralGuideAll($id)
    {
        $attributes = [];
        $attributes['user_deleted'] = auth()->id();
        $model = $this->model->where('referral_guide_id', $id);
        $model->update($attributes);
        $model->delete();
    }
}