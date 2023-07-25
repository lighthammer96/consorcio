<style>
    @page {
        margin: 0;
    }
    body {
        font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
        font-size: 10px;
        font-weight: normal;
        line-height: 1.5;
        color: #292b2c;
        margin: 45px;
    }

    footer {
        /*border: 1px solid red;*/
        font-size: 12px;
        position: fixed;
        bottom: 40px;
        left: 45px;
        right: 45px;
        text-align: right;
    }

    div {
        display: block;
    }

    h1 {
        font-size: 36px;
    }

    h2 {
        font-size: 30px;
    }

    h3 {
        font-size: 24px;
        margin: 7px;
    }

    h4 {
        font-size: 18px;
        margin: 5px;
    }

    h5 {
        font-size: 12px;
        margin: 5px;
    }

    table {
        background-color: transparent;
        border-spacing: 0;
        border-collapse: collapse;
    }

    .bg-green {
        background-color: #00ff80;
    }

    .bg-yellow {
        background-color: #ffff7f;
    }

    .border {
        border: 1px solid #AAA;
    }

    .border-none {
        border: 0 !important;
    }

    .padding-none {
        padding: 0 !important;
    }

    .border-round {
        border-radius: 5px;
    }

    .table {
        width: 100%;
        max-width: 100%;
        font-size: 10px;
    }

    .pad_new {
        padding: 0.15rem 0.25rem;
        border: 1px solid #AAA;
    }

    .table th,
    .table td {
        padding: 0.15rem 0.25rem;
        border: 1px solid #AAA;
        vertical-align: middle;
    }

    .table th.no-pad,
    .table td.no-pad {
        padding: 0;
    }

    .table thead th, .table tfoot th {
        text-align: center;
    }

    .table-min {
        font-size: 9px;
    }

    .table-min2 {
        font-size: 7px;
    }
    .table-min2 th,
    .table-min2 td {
        padding: 0.1rem 0.15rem;
    }

    .table-min  th,
    .table-min  td {
        padding: 0.10rem 0.20rem;
    }

    .table-active,
    .table-active > th,
    .table-active > td {
        background-color: rgba(0, 0, 0, 0.075);
    }

    th.table-active-grey , td.table-active-grey {
        background-color: rgba(0, 0, 0, 0.2) !important;
    }

    th.box-active, td.box-active {
        background-color: rgba(0, 0, 0, 0.1);
    }

    th.box-active-min, td.box-active-min {
        background-color: rgba(0, 0, 0, 0.075);
    }

    .table-no-border th,
    .table-no-border td {
        /*border: 0 !important;*/
        border: 1px solid #FFF !important;
    }
    .table-striped>tbody>tr:nth-of-type(odd) {
        background-color: #f9f9f9
    }

    .text-center {
        text-align: center !important;
    }

    .text-left {
        text-align: left !important;
    }

    .text-right {
        text-align: right !important;
    }

    .title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 15px;
    }
    .page-break {
        page-break-after: always;
    }
    .absolute {
        position: absolute;
    }
    .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12 {
        position: relative;
        min-height: 1px;
        float: left;
    }
    .col-3 {
        width: 25%;
    }
    .col-6 {
        width: 50%;
    }
    .col-9 {
        width: 75%;
    }
    .fs-16 {
        font-size: 16px;
    }
    .mb-5 {
        margin-bottom: 5px;
    }
    .mb-15 {
        margin-bottom: 15px !important;
    }
    .separator {
        height: 5px;
    }
    .ind_separated {
        padding-left: 10px;
        padding-right: 10px;
    }
    .ind_ {
        padding: 3px 0;
        border: 1px solid #bbb;
    }
    .ind_orange_med {
        background: #ffe0b3;
    }
    .ind_blue {
        color: white;
        background: #d4e4f3;
    }
    .ind_blue_med {
        background: #c3daee;
    }
    .ind_blue.ind_active {
        background: #337ab7;
    }
    .ind_red {
        color: white;
        background: #f7dddc;
    }
    .ind_red_med {
        background: #f1c2c0;
    }
    .ind_red.ind_active {
        background: #d9534f;
    }
    .ind_green {
        color: white;
        background: #def1de;
    }
    .ind_green.ind_active {
        background: #5cb85c;
    }
    .color-blue {
        color: #286090;
    }
</style>