<?php

/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 12:31 PM
 */
namespace App\Http\Composers;

use App\Http\Recopro\Module\ModuleInterface;
use Illuminate\View\View;

class MenuComposer
{
    protected $module;

    public function __construct(ModuleInterface $moduleInterface)
    {
        $this->module = $moduleInterface;
    }

    /**
     * Bind data to the view.
     *
     * @param  View $view
     * @return void
     */
    public function compose(View $view)
    {
        $menu = [];

        if (auth()->check()) {
            $profile_id = auth()->user()->profile_id;

            $parent_menu = $this->module->getParents();

            foreach ($parent_menu as $parent) {
                $parent_id = $parent->id;
                $child_menu = $this->module->getByProfileParent($profile_id, $parent_id);

                if (count($child_menu) > 0) {
                    $links = [];
                    foreach ($child_menu as $child) {
                        $links[] = [
                            'description' => $child->description,
                            'url' => $child->url
                        ];
                    }
                    $menu[] = [
                        'description' => $parent->description,
                        'url' => $parent->url,
                        'links' => $links,
                        'icon' => $parent->icon
                    ];
                }
            }
        }
        $view->with('menu_system', $menu);
    }
}