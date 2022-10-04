ALTER VIEW [dbo].[VTA_ReporteComision] AS -- Que salga juntos los soles y dólares
select c.idvendedor IdVendedor, c.vendedor Vendedor, c.idcliente IdCliente ,c.razonsocial_cliente Cliente, c.tipodocven Documento, c.Documento Numero, c.Fecha FechaDoc, c.precio_unitario Monto, c.TipoCambio TipoCambio, c.Moneda Moneda,
convert(decimal(10,2),round(c.Comision/(case c.IdMoneda when 1 then c.precio_unitario else round(c.precio_unitario * c.TipoCambio,0) end)*100,2)) PorcComision, c.Comision ComisionSoles, isnull(c.convenio,c.condicion_pago) CondPago, c.descripcion Vehículo, isnull(c.convenio,'') Convenio, c.PrecioLista PrecioLista, c.Descuento Descuento  
from(
select conv.descripcionconvenio as convenio,s.tipo_solicitud,s.idconvenio,ven.anulado, pr.idCategoria as idCategoria,ven.idtienda as idtienda ,
ved.idvendedor as idvendedor,ved.descripcion as vendedor,ven.idventa,convert(date,ven.fecha_emision) as Fecha,concat(ven.serie_comprobante,'-', RIGHT('00000000' +ven.numero_comprobante,8)) as Documento ,
ven.serie_comprobante, ven.numero_comprobante,cl.correo_electronico,cl.id as idcliente,
cl.documento as DocumentoCliente,cl.razonsocial_cliente as razonsocial_cliente, 
cl.direccion as Direccion,cl.celular,mo.descripcion as Modelo,ser.motor as Motor,ser.nombreSerie as numero_serie,ser.color as Color , ser.idSerie as idSerie,
sc.cuota_inicial as cuota_inicial,sa.precio_unitario as precio_unitario,fp.id as idcondicion_pago,fp.description as condicion_pago,mon.IdMoneda as IdMoneda,
mon.descripcion as Moneda,ven.saldo, ven.pagado, pr.code_article codigo, pr.description descripcion, dbo.FN_Obtiene_TC_CV(0,2,convert(date,ven.fecha_emision),'V') TipoCambio,
round(lpd.nPrecio * dbo.FN_Obtiene_TC_CV(0,2,convert(date,ven.fecha_emision),'V'),0) PrecioLista, td.Descripcion tipodocven, 
(round(lpd.nPrecio * dbo.FN_Obtiene_TC_CV(0,2,convert(date,ven.fecha_emision),'V'),0) - round((case ven.idmoneda when 1 then  sa.precio_unitario else dbo.FN_Obtiene_TC_CV(0,2,convert(date,ven.fecha_emision),'V') * sa.precio_unitario end),0)) Descuento,
case ven.idmoneda when 1 then dbo.FN_Calcula_Comision(pr.idCategoria,fp.id,round(lpd.nPrecio * dbo.FN_Obtiene_TC_CV(0,2,convert(date,ven.fecha_emision),'V'),0),sa.precio_unitario,(round(lpd.nPrecio * dbo.FN_Obtiene_TC_CV(0,2,convert(date,ven.fecha_emision),'V'),0) - sa.precio_unitario)) 
else round(dbo.FN_Calcula_Comision(pr.idCategoria,fp.id,round(lpd.nPrecio * dbo.FN_Obtiene_TC_CV(0,2,convert(date,ven.fecha_emision),'V'),0),sa.precio_unitario,(round(lpd.nPrecio * dbo.FN_Obtiene_TC_CV(0,2,convert(date,ven.fecha_emision),'V'),0) - sa.precio_unitario)) * dbo.FN_Obtiene_TC_CV(0,2,convert(date,ven.fecha_emision),'V'),2) end Comision
from ERP_Venta as ven
INNER JOIN ERP_Solicitud as s on(ven.cCodConsecutivo_solicitud=s.cCodConsecutivo and ven.nConsecutivo_solicitud=s.nConsecutivo and s.estado in (6,7,8))
INNER JOIN ERP_SolicitudArticulo as sa on(sa.cCodConsecutivo=s.cCodConsecutivo and sa.nConsecutivo=s.nConsecutivo)
inner join ERP_Productos as pr on (pr.id=sa.idarticulo)
inner join ERP_Moneda as mon on (mon.IdMoneda=ven.idmoneda)
inner join ERP_Venta as tiket on (ven.idventa=tiket.idventa_comprobante)
left JOIN ERP_SolicitudCredito as sc on(sc.cCodConsecutivo=s.cCodConsecutivo and sc.nConsecutivo=s.nConsecutivo)
left JOIN ERP_SolicitudDetalle as sd on(sd.cCodConsecutivo=sa.cCodConsecutivo and sd.nConsecutivo=sa.nConsecutivo and sa.id=sd.id_solicitud_articulo)
LEFT JOIN ERP_Serie AS ser ON (ser.idSerie=sd.idSerie)
LEFT JOIN ERP_Modelo AS mo ON (pr.idModelo=mo.idModelo)
LEFT JOIN ERP_Clientes AS cl ON (cl.id=s.idcliente)
LEFT JOIN ERP_Vendedores AS ved ON (ved.idvendedor=s.idvendedor)
left join ERP_CondicionPago as fp on (fp.id=ven.condicion_pago)
left join ERP_Convenios as conv  on(conv.idconvenio=s.idconvenio)
inner join ERP_ListaPreciosDetalle lpd on lpd.idProducto = pr.id and exists (select 1 from ERP_ListaPrecios lp where lp.IdMoneda =2 and lp.iEstado = 1 and lp.id = lpd.id_lista)
inner join ERP_TipoDocumento td on td.IdTipoDocumento = ven.IdTipoDocumento
where ven.idVenta not in (select ven.idventa from erp_venta as ven inner join ERP_Venta as nota on(ven.idventa=nota.idventa_referencia))
and ven.tipo_comprobante = 0 
and isnull(ven.anulado,'N') = 'N'
and pr.idCategoria in (1,2)
--and ved.idvendedor = 5
)c

--select * from VTA_ReporteComision