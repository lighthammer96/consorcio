<!DOCTYPE html>
<!--[if IE 9 ]><html lang="es" class="ie9" ng-app="sys"><![endif]-->
<![if IE 9 ]><html lang="es" ng-app="sys"><![endif]>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>RECOPRO</title>

        <!-- Vendor CSS -->
        <link href="{{ url('css/jquery-ui.min.css') }}" rel="stylesheet" />
        <link href="{{ url('css/bootstrap.min.css') }}" rel="stylesheet">
        <link href="{{ url('css/font-awesome.css') }}" rel="stylesheet">
        <link href="{{ url('css/select2.min.css') }}" rel="stylesheet">
        <link href="{{ url('css/daterangepicker.css') }}" rel="stylesheet">
        <link href="{{ url('css/animate.min.css') }}" rel="stylesheet">
        <link href="{{ url('css/style.min.css') }}" rel="stylesheet">
        <link href="{{ url('css/sweet-alert.css') }}" rel="stylesheet">
        <link href="{{ url('css/jtable/jtable.css') }}" rel="stylesheet" />
        <link href="{{ url('css/jtable/jtable_jqueryui.min.css') }}" rel="stylesheet" />
        <link href="{{ url('css/jtable/jquery-ui.css') }}" rel="stylesheet" />
        <link href="{{ url('css/admin.css') }}" rel="stylesheet" />

        <script>
            var width_page = (screen.width > 600) ? 600 : 420;
            var base_url = '{{ url('/') }}';
        </script>
    </head>
    <body class="skin-1">
        <div growl limit-messages="1"></div>
        <div id="wrapper">
            <nav class="navbar-default navbar-static-side" role="navigation">
                <div class="sidebar-collapse">
                    <ul class="nav metismenu" id="side-menu">
                        <li class="nav-header">
                            <div class="dropdown profile-element text-center">
                                <span>
                                    <a href="">
                                        <img class="System_img" style="width: 60%" src=""
                                        alt="RECOPRO">
                                    </a>
                                    <h2 class="text-center">RECOPRO</h2>
                                </span>
                                <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                                    <span class="clear"> <span class="block m-t-xs">
                                        <strong class="font-bold"></strong>
                                     </span>
                                    </span>
                                </a>
                            </div>
                        </li>
                        <li id="init">
                            <a href="{{ url('/') }}/#/home/my">
                                <i class="fa fa-home"></i>
                                <span class="nav-label">Inicio</span>
                            </a>
                        </li>
                        <li id="profiles_url">
                            <a href="{{ url('/') }}/#/profiles/my">
                                <i class="fa fa-user"></i>
                                <span class="nav-label">Perfiles</span>
                            </a>
                        </li>
                        @foreach($modules as $module)
                        <li id="{{ $module->id }}">
                            <a href="{{ $module->url }}">
                                <i class="fa fa-{{ $module->icon }}"></i>
                                <span class="nav-label">{{ $module->name }}</span>
                                <span class="fa arrow"></span>
                            </a>
                            <ul class="nav nav-second-level">
                                @foreach($module->children as $child)
                                <li><a href="{{ $child->url }}">{{ $child->name }}</a></li>
                                @endforeach
                            </ul>
                        </li>
                        @endforeach
                    </ul>
                </div>
            </nav>
            @include('partials.menu')
            <div id="page-wrapper" class="gray-bg dashbard-1 br-white position-relative" ng-controller="OverloadCtrl">
                @include('partials.header')
                <div class="Overlay_room" ng-show="show_loading">
                    <div class="over_room">
                        <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                <div ui-view></div>
                @include('partials.footer')
            </div>
        </div>

        <!-- Core -->
        <script src="{{ url('js/jquery.min.js') }}"></script>
        <script src="{{ url('js/jquery-ui.min.js') }}"></script>
        <script src="{{ url('js/bootstrap.min.js') }}"></script>
        <script src="{{ url('js/moment/moment.js') }}"></script>
        <script src="{{ url('js/moment/locale/es.js') }}"></script>
        <script src="{{ url('js/daterangepicker.js') }}"></script>
        <script src="{{ url('js/jquery.metisMenu.js') }}"></script>
        <script src="{{ url('js/jquery.slimscroll.min.js') }}"></script>

        <!-- Angular -->
        <script src="{{ url('js/underscore-min.js') }}"></script>
        <script src="{{ url('js/angular/angular.min.js') }}"></script>
        <script src="{{ url('js/angular/angular-resource.min.js') }}"></script>
        <script src="{{ url('js/angular/angular-ui-router.min.js') }}"></script>
        <script src="{{ url('js/angular/angular-animate.min.js') }}"></script>
        <script src="{{ url('js/angular/loading-bar.js') }}"></script>
        <script src="{{ url('js/ocLazyLoad.min.js') }}"></script>
        <script src="{{ url('js/angular/ui-bootstrap-tpls.min.js') }}"></script>

        <!-- Librerias -->
        <script src="{{ url('js/ngSweetAlert.min.js') }}"></script>
        <script src="{{ url('js/sweet-alert.min.js') }}"></script>
        <script src="{{ url('js/angular/angular-growl.min.js') }}"></script>
        <script src="{{ url('js/angucomplete-alt.js') }}"></script>
        <script src="{{ url('js/angular.panels.js') }}"></script>
        <script src="{{ url('js/ui-bootstrap.min.js') }}"></script>


        <!-- Placeholder for IE9 -->
        <!--[if IE 9 ]>
        <script src="{{ url('js/vendors/bower_components/jquery-placeholder/jquery.placeholder.min.js') }}"></script>
        <![endif]-->

        <!-- Scripts -->
        <script src="{{ url('js/admin.js') }}"></script>
        <script src="{{ url('js/inspinia.js') }}"></script>
        <script src="{{ url('js/select2.min.js') }}"></script>
        <script src="{{ url('js/jquery.jtable.js') }}"></script>
        <script src="{{ url('js/jquery.jtable.es.js') }}"></script>

        <!-- App level -->
        <script src="{{ url('js/recopro.min.js') }}"></script>

    </body>
</html>
