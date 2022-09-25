<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>C & A | Login</title>

    <link href="{{ url('css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ url('css/font-awesome.css') }}" rel="stylesheet">

    <link href="{{ url('css/animate.min.css') }}" rel="stylesheet">
    <link href="{{ url('css/style.min.css') }}" rel="stylesheet">
    <link href="{{ url('css/admin.css') }}" rel="stylesheet"/>
   
</head>
<body class="gray-bg">
<div class="middle-box text-center loginscreen animated fadeInDown">
    <div>
        <div>
            <h1 class="logo-name">
                <img src="{{ url('img/logo.jpg') }}" alt="" width="300">
            </h1>
        </div>
        @if ($errors->has('error'))
            <div class="alert alert-danger alert-dismissable">
                <button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>
                {{ $errors->first('error') }}
            </div>
        @endif
        <form class="m-t" role="form" action="{{ url('login') }}" method="POST">
            {{ csrf_field() }}
            {{--<input type="hidden" name="_token" value="{!! csrf_token() !!}">--}}
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Usuario" name="username"
                       autocomplete="off" value="{{ old('username') }}" required autofocus>
                @if ($errors->has('username'))
                    <span class="help-block">
                        <strong>{{ $errors->first('username') }}</strong>
                    </span>
                @endif
            </div>
            <div class="form-group">
                <input type="password" class="form-control" placeholder="Contraseña" name="password" required>
                @if ($errors->has('password'))
                    <span class="help-block">
                        <strong>{{ $errors->first('password') }}</strong>
                    </span>
                @endif
            </div>
            <button type="submit" class="btn btn-danger-admin block full-width m-b">Iniciar Sesión</button>
        </form>
    </div>
</div>
</body>
</html>