<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>C & A | Error de Conexión de Base de Datos</title>

    <link href="{{ url('css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ url('css/font-awesome.css') }}" rel="stylesheet">

    <link href="{{ url('css/animate.min.css') }}" rel="stylesheet">
    <link href="{{ url('css/style.min.css') }}" rel="stylesheet">
</head>
<body class="gray-bg">
<div class="middle-box text-center animated fadeInDown">
    <h1 class="logo-name">
        <img src="{{ url('img/logo.jpg') }}" alt="">
    </h1>
    <h3 class="font-bold">Error en la conexión a la base de datos</h3>

    <div class="error-desc">
        Lo sentimos, hubo un error en la conexión a la base de datos.
        Por favor recargue la página y si el error persiste comuníquese con el administrador del sistema.
        <div class="well">
            {{ $error }}
        </div>
        <div class="form-inline m-t">
            <a href="{{ route('admin.index') }}" class="btn btn-success">
                Ir al inicio
            </a>
        </div>
    </div>
</div>
</body>
</html>
