<style>
    @media all and (max-width: 768px) {
        .navbar-right{
            margin-right: 0 !important;
        }
    }
</style>
<div class="row border-bottom">
    <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
        <div class="navbar-header">
            <a class="navbar-minimalize minimalize-styl-2 btn btn-danger-admin" style="background-color: #ec1415;"  data-target="#" >
                <i class="fa fa-bars"></i>
            </a>
        </div>
        <ul class="nav navbar-top-links navbar-right">
            <li>
                <span class="m-r-sm text-muted welcome-message">
                    Bienvenido,
                    <b>{{ auth()->user()->name }}</b>
                </span>
            </li>
            <li>
                <a class="admin_logout" href="javascript:void(0)" onclick="closeSession()" style="color:#9ea6b9 !important ">
                    <i class="fa fa-sign-out"></i> Cerrar Sesión
                </a>
            </li>
            <li>
                <a class="right-sidebar-toggle">
                    <i class="fa fa-tasks"></i>
                </a>
            </li>
        </ul>
    </nav>
</div>
