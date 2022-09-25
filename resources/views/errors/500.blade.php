<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>RECOPRO | 500 Error</title>

    <link href="{{ url('css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ url('css/font-awesome.css') }}" rel="stylesheet">

    <link href="{{ url('css/animate.min.css') }}" rel="stylesheet">
    <link href="{{ url('css/style.min.css') }}" rel="stylesheet">
</head>
<body class="gray-bg">
<div class="middle-box text-center animated fadeInDown">
    <h1>500</h1>
    <h3 class="font-bold">Error de Servidor Interno</h3>
    <div class="error-desc">
        El servidor encontró algo inesperado que no le permitió completar la solicitud. Pedimos disculpas.
        <br>Puede volver a la página principal:
        <br><br>
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