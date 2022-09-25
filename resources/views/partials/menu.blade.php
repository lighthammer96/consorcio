
<nav class="navbar-default navbar-static-side" role="navigation">
    <div class="sidebar-collapse">
        <ul class="nav metismenu" id="side-menu">
            <li class="nav-header" >
                <div class="dropdown profile-element">
                    <span>
                        <img alt="image" class="img-circle" src="{{ url('img/profile_small.jpg') }}" />
                    </span>
                    <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                        <span class="clear">
                            <span class="block m-t-xs">
                                <strong class="font-bold">{{ auth()->user()->name }}</strong>
                            </span>
                            <span class="text-muted text-xs block">
                                {{ auth()->user()->profile->description }}
                            </span>
                        </span>
                    </a>
                </div>
                <div class="logo-element">
                    C&A
                </div>
            </li>

            <li class="li_home active active_url">
                <a href="{{ url('/') }}/home" onclick="activeURL()">
                    <i class="fa fa-home"></i>
                    <span class="nav-label">Inicio</span>
                </a>
            </li>
            @foreach($menu_system as $module)
                <?php $cmodule = count($module['links']); ?>
                <li>
                    <a href="{{ ($cmodule > 0) ? '#' : url('/').'/'.$module['url'] }}">
                        <i class="fa fa-{{ $module['icon'] }}"></i>
                        <span class="nav-label">{{ $module['description'] }}</span>
                        @if($cmodule > 0)<span class="fa arrow"></span>@endif
                    </a>
                    @if($cmodule > 0)
                        <ul class="nav nav-second-level collapse">
                            @foreach($module['links'] as $child)
                                <li class="mod{{$child['url']}} ffffffffff" >
                                    <a href="{{ url('/').'/'.$child['url'] }}" onclick="activeURL()">
                                        {{ $child['description'] }}
                                    </a>
                                </li>
                            @endforeach
                        </ul>
                    @endif
                </li>
            @endforeach
        </ul>
    </div>
</nav>