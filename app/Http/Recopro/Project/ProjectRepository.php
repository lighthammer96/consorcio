<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 09/06/2017
 * Time: 12:10 PM
 */

namespace App\Http\Recopro\Project;

class ProjectRepository implements ProjectInterface
{
    protected $model;

    public function __construct(Project $model)
    {
        $this->model = $model;
    }

    public function search($filter)
    {
        $s = (isset($filter['search'])) ? $filter['search'] : '';
        $show_state = (isset($filter['state']));
        $show_sub_state = (isset($filter['sub_state']));

        $model = $this->model->where(function ($q) use ($s, $show_state, $show_sub_state) {
            $q->where('code', 'LIKE', '%' . $s . '%');
            $q->orWhere('description', 'LIKE', '%' . $s . '%');
            $q->orWhere('created_at', 'LIKE', '%' . $s . '%');
            $q->orWhereHas('client', function ($p) use ($s) {
                $p->where('NombreEntidad', 'LIKE', '%' . $s . '%');
            });
            if ($show_state) {
                $q->orWhereHas('project_state', function ($p) use ($s) {
                    $p->where('description', 'LIKE', '%' . $s . '%');
                });
            }
            if ($show_sub_state) {
                $q->orWhereHas('project_sub_state', function ($p) use ($s) {
                    $p->where('description', 'LIKE', '%' . $s . '%');
                });
            }
        })->where(function ($q) use ($filter) {
            if (isset($filter['check']) && $filter['check'] == 'true') {
                $from = $filter['from'] . ' 00:00:00';
                $to = $filter['to'] . ' 23:59:59';
                $q->whereBetween('created_at', [$from, $to]);
            }
            $state = (isset($filter['state'])) ? $filter['state'] : '';
            if ($state != '') {
                $q->where('project_state_id', $state);
            }
        });

        if (isset($filter['consolidated'])) {
            $model->whereHas('consolidated', function ($c) {
                $c->where('quantity_served', '>', '0');
            });
        }

        return $model;
    }

    public function searchApproval($filter)
    {
        $s = (isset($filter['search'])) ? $filter['search'] : '';
        $show_state = (isset($filter['sub_state']));

        $model = $this->model->where(function ($q) use ($s, $show_state) {
            $q->where('code', 'LIKE', '%' . $s . '%');
            $q->orWhere('description', 'LIKE', '%' . $s . '%');
            $q->orWhereHas('client', function ($p) use ($s) {
                $p->where('NombreEntidad', 'LIKE', '%' . $s . '%');
            });
            if ($show_state) {
                $q->orWhereHas('project_sub_state', function ($p) use ($s) {
                    $p->where('description', 'LIKE', '%' . $s . '%');
                });
            }
        })->where(function ($q) use ($filter) {
            if (isset($filter['check']) && $filter['check'] == 'true') {
                $from = $filter['from'] . ' 00:00:00';
                $to = $filter['to'] . ' 23:59:59';
                $q->whereBetween('created_at', [$from, $to]);
            }
            $state = (isset($filter['sub_state'])) ? $filter['sub_state'] : '';
            if ($state != '') {
                $q->where('sub_state_id', $state);
            }
        })->where(function ($q) {
            $q->where('sub_state_id', 2);
            $q->orWhere('sub_state_id', 4);
            $q->orWhere('sub_state_id', 6);
            $q->orWhere('sub_state_id', 8);
        })
        ->where('project_state_id', 1)
        ->whereHas('approvers_detail', function ($ad) {
            $ad->whereHas('approver_project', function ($a) {
                $a->where('user_id', auth()->id());
            });
        });

        return $model;
    }

    public function searchSelect($s)
    {
        return $this->model->where(function ($q) use ($s) {
            $q->where('code', 'LIKE', '%' . $s . '%');
            $q->orWhere('description', 'LIKE', '%' . $s . '%');
        });
    }

    public function all()
    {
        return $this->model->all();
    }

    public function create(array $attributes)
    {
        $attributes['user_created'] = auth()->id();
        $attributes['user_updated'] = auth()->id();
        $model = $this->model->create($attributes);
        $count = $this->model->withTrashed()->count();
        $this->update($model->id, [
            'code' => 'P' . str_pad($count, 9, '0', STR_PAD_LEFT)
        ]);
        $model = $this->find($model->id);
        return $model;
    }

    public function update($id, array $attributes)
    {
        $attributes['user_updated'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);

        return $this->find($id);
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function destroy($id)
    {
        $attributes = [];
        $attributes['user_deleted'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
        $model->delete();
    }
}