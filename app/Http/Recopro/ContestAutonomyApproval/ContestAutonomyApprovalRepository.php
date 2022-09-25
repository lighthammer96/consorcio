<?php

namespace App\Http\Recopro\ContestAutonomyApproval;
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 15/09/2017
 * Time: 03:14 PM
 */
class ContestAutonomyApprovalRepository implements ContestAutonomyApprovalInterface
{

    protected $model;

    public function __construct(ContestAutonomyApproval $model)
    {
        $this->model = $model;
    }

    public function createUpdate(array $attributes)
    {
        $model = $this->model->where('contest_id', $attributes['contest_id'])
            ->where('approval_autonomy_id', $attributes['approval_autonomy_id'])
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

    public function findByContest($id)
    {
        return $this->model->where('contest_id', $id)
            ->where('state', 0)
            ->orderBy('id','asc')
            ->first();
    }

    public function findByContestDetail($id)
    {
        return $this->model->where('contest_id', $id)
            ->where('state', 0)
            ->get();
    }


    public function deleteByContestAutonomy($contest_id, array $ids)
    {
        $this->model->where('contest_id', $contest_id)
            ->whereNotIn('approval_autonomy_id', $ids)
            ->delete();
    }
}