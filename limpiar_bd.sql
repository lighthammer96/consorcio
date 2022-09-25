---- SOLICITUD

delete from ERP_SolicitudDetalle;
delete from ERP_SolicitudCredito;
delete from ERP_SolicitudArticulo;
delete from ERP_Solicitud;      

--- VENTAS


delete from ERP_VentaDetalle;
delete from ERP_VentaFormaPago;
delete from ERP_Venta;






select * from ERP_Moneda;
select * from ERP_Venta;
select * from ERP_VentaDetalle;
select * from ERP_VentaFormaPago;
select * from ERP_SolicitudCronograma;

select * from ERP_CajaDiaria;
select * from ERP_CajaDiariaDetalle;

select * from ERP_FormasPago;

update ERP_Solicitud set saldo=0, facturado=0, pagado=0 where cCodConsecutivo='SOL' AND nConsecutivo=38
select * from ERP_Solicitud where cCodConsecutivo='SOL' AND nConsecutivo=38
select * from ERP_SolicitudCredito where cCodConsecutivo='SOL' AND nConsecutivo=38


