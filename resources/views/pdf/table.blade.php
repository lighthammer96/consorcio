<!DOCTYPE html>
<html lang="es">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>{{ $data['title'] }}</title>
    @include('pdf.css')
</head>
<body>
    <div class="text-center">
        <div class="title">RECOPRO - {{ $data['title'] }}</div>
    </div>
    <table class="table">
        <thead>
        <tr class="table-active">
            <th class="text-center">ITEM</th>
            @foreach($data['data'][0] as $d)
                <th class="text-center">{{ $d }}</th>
            @endforeach
        </tr>
        </thead>
        <tbody>
        <?php unset($data['data'][0]) ?>
        @foreach($data['data'] as $item => $d)
            <tr>
                <td class="text-center">{{ $item }}</td>
                @foreach($d as $i)
                    <td class="text-{{ $i[0] }}">{{ $i[1] }}</td>
                @endforeach
            </tr>
        @endforeach
        </tbody>
    </table>
</body>
