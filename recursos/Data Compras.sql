INSERT INTO ERP_TipoConsecutivos(cCodTipoCons,cTipoConsecutivo,cObservación,cIdUsuCre,dFecCre,cIdUsuMod,dFecMod)
VALUES ('SOLCOMPRA','SOLICITUDES COMPRA','PARA LAS SOLICITUDES DE COMPRA',1,FORMAT(GetDate(), 'yyyy-MM-dd hh:mm:ss.000'),1,FORMAT(GetDate(), 'yyyy-MM-dd hh:mm:ss.000'))


INSERT INTO ERP_Consecutivos(cCodConsecutivo,cCodTipoCons,cDetalle,nCodTienda,nConsecutivo,cIdUsuCre,dFecCre,cIdUsuMod,dFecMod)
VALUES ('SOLC','SOLCOMPRA','SOLICITUDES DE COMPRA TARAPOTO',1,0,1,FORMAT(GetDate(), 'yyyy-MM-dd hh:mm:ss.000'),1,FORMAT(GetDate(), 'yyyy-MM-dd hh:mm:ss.000'))

select * from ERP_TipoConsecutivos

INSERT INTO ERP_TipoConsecutivos(cCodTipoCons,cTipoConsecutivo,cObservación,cIdUsuCre,dFecCre,cIdUsuMod,dFecMod)
VALUES ('ORDCOMPRA','ORDENES DE COMPRA','PARA LAS ORDENES DE COMPRA',1,FORMAT(GetDate(), 'yyyy-MM-dd hh:mm:ss.000'),1,FORMAT(GetDate(), 'yyyy-MM-dd hh:mm:ss.000'))

INSERT INTO ERP_Consecutivos(cCodConsecutivo,cCodTipoCons,cDetalle,nCodTienda,nConsecutivo,cIdUsuCre,dFecCre,cIdUsuMod,dFecMod)
VALUES ('ORDC','ORDCOMPRA','ORDENES DE COMPRA TARAPOTO',1,0,1,FORMAT(GetDate(), 'yyyy-MM-dd hh:mm:ss.000'),1,FORMAT(GetDate(), 'yyyy-MM-dd hh:mm:ss.000'))


insert into ERP_TipoOperacion
values (10,'DEVOLUCION COMP','A',1,FORMAT(GetDate(), 'yyyy-MM-dd hh:mm:ss.000'),1,FORMAT(GetDate(), 'yyyy-MM-dd hh:mm:ss.000'),'S')
go