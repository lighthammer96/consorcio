<?php
/**
 * Created by PhpStorm.
 * User: Jair
 * Date: 08/06/2017
 * Time: 12:39 PM
 */

namespace App\Http\Recopro\Requirement;

class RequirementRepository implements RequirementInterface
{
    protected $model;

    public function __construct(Requirement $model)
    {
        $this->model = $model;
    }

    public function search($filter)
    {
        $items = (isset($filter['items'])) ? $filter['items'] : [];

        $s = (isset($filter['search'])) ? $filter['search'] : '';
        $show_buyer = (isset($filter['show_buyer']) && $filter['show_buyer'] == 'true');
        $show_state = (isset($filter['state']));
        $show_state_line = (isset($filter['state_line']));
        $project_id = (isset($filter['project_id']));

        return $this->model
            ->where(function ($q) use ($s, $show_buyer, $show_state, $show_state_line) {
                $q->where('code', 'LIKE', '%' . $s . '%');
                $q->orWhere('date_registration', 'LIKE', '%' . $s . '%');
                $q->orWhere('date_required', 'LIKE', '%' . $s . '%');
                $q->orWhere('requested_by', 'LIKE', '%' . $s . '%');
                $q->orWhereHas('project', function ($p) use ($s) {
                    $p->where('code', 'LIKE', '%' . $s . '%');
                    $p->orWhere('description', 'LIKE', '%' . $s . '%');
                });
                if ($show_state) {
                    $q->orWhereHas('requirement_state', function ($rs) use ($s) {
                        $rs->where('description', 'LIKE', '%' . $s . '%');
                    });
                }
                if ($show_state_line) {
                    $q->orWhereHas('requirement_state_line', function ($rs) use ($s) {
                        $rs->where('description', 'LIKE', '%' . $s . '%');
                    });
                }
                if ($show_buyer) {
                    $q->orWhereHas('buyer', function ($rs) use ($s) {
                        $rs->where('description', 'LIKE', '%' . $s . '%');
                    });
                }

            })->where(function ($q) use ($filter) {
                if (isset($filter['check']) && $filter['check'] == 'true') {
                    $from = $filter['from'] . ' 00:00:00';
                    $to = $filter['to'] . ' 23:59:59';
                    $q->whereBetween('date_registration', [$from, $to]);
                }
                $state = (isset($filter['state'])) ? $filter['state'] : '';
                if ($state != '') {
                    $q->where('requirement_state_id', $state);
                }
                $state_line = (isset($filter['state_line'])) ? $filter['state_line'] : '';
                if ($state_line != '') {
                    $q->where('requirement_line_state_id', $state_line);
                }
                $supervisor = (isset($filter['supervisor']) && $filter['supervisor'] == 'true');
                if ($supervisor) {
                    $super = auth()->user()->id;
                    $q->whereHas('user_c', function ($u) use ($super) {
                        $u->where('supervisor', $super);
                    });
                }
                $assignment_req = (isset($filter['assignment_req']) && $filter['assignment_req'] != '');
                if ($assignment_req) {
                    $ar = $filter['assignment_req'];
                    if ($ar == '1') {
                        if (isset($filter['is_assignment']) && $filter['is_assignment'] == '1') {
                            $q->whereHas('buyer', function ($b) {
                                $b->where('user_id', auth()->id());
                            });
                        } else {
                            $q->where('buyer_id', '<>', '');
                        }
                    } else {
                        $q->whereNull('buyer_id');
                    }
                }
            })->whereNotIn('id', $items);
    }

    public function search_project($filter)
    {
        $s = (isset($filter['search'])) ? $filter['search'] : '';
        $show_buyer = (isset($filter['show_buyer']) && $filter['show_buyer'] == 'true');
        $show_state = (isset($filter['state']));
        $show_state_line = (isset($filter['state_line']));
        $project_id = $filter['project_id'];
        return $this->model
            ->where(function ($q) use ($s, $show_buyer, $show_state, $show_state_line) {
                $q->where('code', 'LIKE', '%' . $s . '%');
                $q->orWhere('date_registration', 'LIKE', '%' . $s . '%');
                $q->orWhere('date_required', 'LIKE', '%' . $s . '%');
                $q->orWhere('requested_by', 'LIKE', '%' . $s . '%');
                $q->orWhereHas('project', function ($p) use ($s) {
                    $p->where('code', 'LIKE', '%' . $s . '%');
                    $p->orWhere('description', 'LIKE', '%' . $s . '%');
                });
                if ($show_state) {
                    $q->orWhereHas('requirement_state', function ($rs) use ($s) {
                        $rs->where('description', 'LIKE', '%' . $s . '%');
                    });
                }
                if ($show_state_line) {
                    $q->orWhereHas('requirement_state_line', function ($rs) use ($s) {
                        $rs->where('description', 'LIKE', '%' . $s . '%');
                    });
                }
                if ($show_buyer) {
                    $q->orWhereHas('buyer', function ($rs) use ($s) {
                        $rs->where('description', 'LIKE', '%' . $s . '%');
                    });
                }

            })->where(function ($q) use ($filter) {
                if (isset($filter['check']) && $filter['check'] == 'true') {
                    $from = $filter['from'] . ' 00:00:00';
                    $to = $filter['to'] . ' 23:59:59';
                    $q->whereBetween('date_registration', [$from, $to]);
                }
                $state = (isset($filter['state'])) ? $filter['state'] : '';
                if ($state != '') {
                    $q->where('requirement_state_id', $state);
                }
                $state_line = (isset($filter['state_line'])) ? $filter['state_line'] : '';
                if ($state_line != '') {
                    $q->where('requirement_line_state_id', $state_line);
                }
                $supervisor = (isset($filter['supervisor']) && $filter['supervisor'] == 'true');
                if ($supervisor) {
                    $super = auth()->user()->id;
                    $q->whereHas('user_c', function ($u) use ($super) {
                        $u->where('supervisor', $super);
                    });
                }
                $assignment_req = (isset($filter['assignment_req']) && $filter['assignment_req'] != '');
                if ($assignment_req) {
                    $ar = $filter['assignment_req'];
                    if ($ar == '1') {
                        if (isset($filter['is_assignment']) && $filter['is_assignment'] == '1') {
                            $q->whereHas('buyer', function ($b) {
                                $b->where('user_id', auth()->id());
                            });
                        } else {
                            $q->where('buyer_id', '<>', '');
                        }
                    } else {
                        $q->whereNull('buyer_id');
                    }
                }
            })->Where('project_id', $project_id);
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
            'code' => 'RQ' . str_pad($count, 8, "0", STR_PAD_LEFT)
        ]);
        return $model;
    }

    public function update($id, array $attributes)
    {
        $attributes['user_updated'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function findByState($id)
    {
//        return $this->model->where('requirement_state_id', '<>', 4)
//            ->where('id', $id)
//            ->get();
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