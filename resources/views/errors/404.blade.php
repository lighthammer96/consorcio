<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>RECOPRO | 404 Error</title>

    <link href="{{ url('css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ url('css/font-awesome.css') }}" rel="stylesheet">

    <link href="{{ url('css/animate.min.css') }}" rel="stylesheet">
    <link href="{{ url('css/style.min.css') }}" rel="stylesheet">
</head>
<body class="gray-bg">
<div class="middle-box text-center animated fadeInDown">
    <h1>404</h1>
    <h3 class="font-bold">Página No Encontrada</h3>

    <div class="error-desc">
        Lo sentimos, pero la página que está buscando no ha sido encontrada.
        Prueba a comprobar la URL de error, luego pulsa el botón de actualización en tu navegador.
        <div class="form-inline m-t">
            <a href="{{ route('admin.index') }}" class="btn btn-success">
                Ir al inicio
            </a>
        </div>
    </div>
</div>
</body>
</html>
