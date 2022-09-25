<div class="modal" id="modalExcel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="modalLabelExcel"></h4>
            </div>
            <div class="modal-body">
                {{--<iframe id="frame_excel" src="" width="100%" height="500"></iframe>--}}
                {{--<div id="show_excel" style="width: 100%; height: 500px"></div>--}}
                <object id="frame_excel"
                        src="{{ url('warehouses/excel') }}" width="100%" height="500" ></object>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>