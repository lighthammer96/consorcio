<!DOCTYPE html>
<html lang="es" ng-app="sys">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <base href="/">

    <title>CONSORCIO & ASOCIADOS</title>

    <!-- Vendor CSS -->
    <link href="{{ url('css/jquery-ui.min.css') }}" rel="stylesheet"/>
    <link href="{{ url('css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ url('css/font-awesome.css') }}" rel="stylesheet">
    <link href="{{ url('css/select2.min.css') }}" rel="stylesheet">
    <link href="{{ url('css/daterangepicker.css') }}" rel="stylesheet">
    <link href="{{ url('css/animate.min.css') }}" rel="stylesheet">
    <link href="{{ url('css/style.min.css') }}" rel="stylesheet">
    <link href="{{ url('css/sweet-alert.css') }}" rel="stylesheet">
    <link href="{{ url('css/jtable/jtable.css') }}" rel="stylesheet"/>
    <link href="{{ url('css/jtable/jtable_jqueryui.min.css') }}" rel="stylesheet"/>
    <link href="{{ url('css/jtable/jquery-ui.css') }}" rel="stylesheet"/>
    <link href="{{ url('css/angular-growl.min.css') }}" rel="stylesheet"/>
    <link href="{{ url('css/cropper.min.css') }}" rel="stylesheet"/>
    <link href="{{ url('css/crop.css') }}" rel="stylesheet"/>
    <link href="{{ url('css/i-check/icheck.css') }}" rel="stylesheet"/>
    <link href="{{ url('css/fileinput.min.css') }}" rel="stylesheet"/>
    <link href="{{ url('css/admin.css') }}" rel="stylesheet"/>

    <script>
        var width_page = (screen.width > 480) ? 480 : 320;
        var base_url = '{{ url('/') }}';
        var user_default = '{{ auth()->user()->name }}';

        var show_list_ = !( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

    </script>
</head>


<body class="skin-1 fixed-sidebar-admin">
<div growl limit-messages="1"></div>
<div id="wrapper" ng-controller="OverloadCtrl">
    <div class="Overlay_room" id="show_loading" ng-show="show_loading">
        <div class="over_room">
            <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
            <span class="sr-only">Cargando...</span>
        </div>
    </div>
    @include('partials.menu')
    <div id="page-wrapper" class="gray-bg dashbard-1">
        @include('partials.header')
        @include('partials.alert')
        <div class="separator"></div>
        <div ui-view></div>
        @include('partials.footer')
    </div>
</div>
{{--@include('partials.theme')--}}
@include('partials.config')
@include('partials.modal')
<div id="printDiv" class="hide"></div>

<!-- Core -->
<script src="{{ url('js/jquery.min.js') }}"></script>
<script src="{{ url('js/jquery-ui.min.js') }}"></script>
<script src="{{ url('js/bootstrap.min.js') }}"></script>
<script src="{{ url('js/moment/moment.js') }}"></script>
<script src="{{ url('js/moment/locale/es.js') }}"></script>
<script src="{{ url('js/moment/moment-timezone.js') }}"></script>
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
{{--<script src="{{ url('js/angular/ui-bootstrap-tpls.min.js') }}"></script>--}}

<!-- Librerias -->
<script src="{{ url('js/ngSweetAlert.min.js') }}"></script>
<script src="{{ url('js/sweet-alert.min.js') }}"></script>
<script src="{{ url('js/angular/angular-growl.min.js') }}"></script>
<script src="{{ url('js/angucomplete-alt.js') }}"></script>
<script src="{{ url('js/angular.panels.js') }}"></script>
{{--<script src="{{ url('js/ui-bootstrap.min.js') }}"></script>--}}

<!-- Flot -->
<script src="{{ url('js/flot/jquery.flot.js') }}"></script>
<script src="{{ url('js/flot/jquery.flot.tooltip.min.js') }}"></script>
<script src="{{ url('js/flot/jquery.flot.spline.js') }}"></script>
<script src="{{ url('js/flot/jquery.flot.resize.js') }}"></script>
<script src="{{ url('js/flot/jquery.flot.pie.js') }}"></script>

<!-- Chart -->
<script src="{{ url('js/chartJs/Chart.min.js') }}"></script>


<!-- Placeholder for IE9 -->
<!--[if IE 9 ]>
<script src="{{ url('js/vendors/bower_components/jquery-placeholder/jquery.placeholder.min.js') }}"></script>
<![endif]-->

<!-- Scripts -->
<script src="{{ url('js/pdf/pdfmake.min.js') }}"></script>
<script src="{{ url('js/pdf/vfs_fonts.js') }}"></script>
<script src="{{ url('js/inspinia.js') }}"></script>
<script src="{{ url('js/select2.min.js') }}"></script>
<script src="{{ url('js/select2.es.js') }}"></script>
<script src="{{ url('js/jquery.jtable.js') }}"></script>
<script src="{{ url('js/jquery.jtable.es.js') }}"></script>
<script src="{{ url('js/bootstrap-treeview.js') }}"></script>
<script src="{{ url('js/treed.js') }}"></script>
<script src="{{ url('js/icheck.min.js') }}"></script>
<script src="{{ url('js/fileinput.min.js') }}"></script>
<script src="{{ url('js/fileinput.es.js') }}"></script>
<script src="{{ url('js/project_functions.js') }}"></script>
<script src="{{ url('js/admin.js') }}"></script>

<!-- Crop -->
<script src="{{ url('js/crop/cropper.min.js') }}"></script>
<script src="{{ url('js/crop/StackBlur.js') }}"></script>
<script src="{{ url('js/crop/crop.js') }}"></script>

<!-- App level -->
<script src="{{ url('js/recopro.min.js') }}"></script>

</body>
</html>
