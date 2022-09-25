<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>C & A | Actualizar contraseña</title>

    <link href="{{ url('css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ url('css/font-awesome.css') }}" rel="stylesheet">

    <link href="{{ url('css/animate.min.css') }}" rel="stylesheet">
    <link href="{{ url('css/i-check/icheck.css') }}" rel="stylesheet"/>
    <link href="{{ url('css/style.min.css') }}" rel="stylesheet">

    <style>
        .form-control:focus {
            border-color: #5bc0de !important;
        }
        .header-form {
            padding-top: 0;
        }
    </style>
    <link href="{{ url('css/admin.css') }}" rel="stylesheet"/>
</head>
<body class="gray-bg">
<div class="middle-box header-form text-center loginscreen animated fadeInDown">
    <div>
        <h1 class="logo-name">
            <img src="{{ url('img/logo.jpg') }}" alt="" width="300">
        </h1>
        <h3>Cambiar Contraseña</h3>
        @if($text != '')
        <div class="well well-sm">
            <small>{!! $text !!}</small>
        </div>
        @endif
    </div>
    @if ($errors->has('error'))
        <div class="alert alert-danger alert-dismissable">
            <button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>
            {{ $errors->first('error') }}
        </div>
    @endif
    <form class="m-t" role="form" action="{{ route('change_password_post') }}" method="POST">
        {{ csrf_field() }}
        <div class="form-group">
            <input type="password" class="form-control" placeholder="Nueva Contraseña"
                   name="new_pass" required minlength="6" autofocus>
            @if ($errors->has('new_pass'))
                <span class="help-block">
                        <strong>{{ $errors->first('new_pass') }}</strong>
                    </span>
            @endif
        </div>
        <div class="form-group">
            <input type="password" class="form-control" placeholder="Confirme Contraseña"
                   name="re_pass" required minlength="6">
            @if ($errors->has('re_pass'))
                <span class="help-block">
                        <strong>{{ $errors->first('re_pass') }}</strong>
                    </span>
            @endif
        </div>
        <button type="submit" class="btn btn-danger-admin block full-width m-b">Guardar</button>
    </form>
</div>
</body>
</html>