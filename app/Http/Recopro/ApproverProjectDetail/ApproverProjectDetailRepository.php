<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 28/08/2017
 * Time: 12:05 PM
 */

namespace App\Http\Recopro\ApproverProjectDetail;

class ApproverProjectDetailRepository implements ApproverProjectDetailInterface
{
    protected $model;

    public function __construct(ApproverProjectDetail $model)
    {
        $this->model = $model;
    }

    public function deleteExcept($approver_project_id, array $sub_state_id)
    {
        $this->model->where('approver_project_id', $approver_project_id)
            ->whereNotIn('sub_state_id', $sub_state_id)
            ->delete();
    }

    public function createUpdate(array $attributes)
    {
        $model = $this->getByApprovalState($attributes['approver_project_id'], $attributes['sub_state_id']);

        if (!isset($model)) {
            $model = $this->model->create($attributes);
        }
        return $model;
    }

    public function getByApprovalState($approver_id, $sub_state_id)
    {
        return $this->model->where('approver_project_id', $approver_id)
                            ->where('sub_state_id', $sub_state_id)
                            ->first();
    }
}