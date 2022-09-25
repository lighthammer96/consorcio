select * from ERP_FormasPago
select * from ERP_CondicionPago
select * from erp_venta
select * from ERP_Moneda
select * from ERP_Modelo
select * from ERP_Clientes
select * from ERP_Serie
select * from ERP_Cobrador
select * from ERP_Solicitud
select * from ERP_Venta
select * from erp_caja
select * from ERP_CajaDiaria
select * from ERP_SolicitudCredito
select * from ERP_SolicitudArticulo
select * from ERP_SolicitudDetalle
select * from ERP_Vendedores
select * from ERP_Categoria
select * from ERP_Productos
select * from ERP_Marcas
select * from ERP_Modelo
select * from ERP_Clientes
select * from ERP_Ubigeo
select * from ERP_Moneda
select top 10 [id], [descripcion], [estado] from [ERP_Empresa] where ([descripcion] LIKE %% or [estado] LIKE %%) order by [created_at DESC] asc, [id] asc

select * from ERP_Consecutivos
select * from ERP_TipoConsecutivos
select * from ERP_Tecnico where estado='A'

select * from ERP_Solicitud where nConsecutivo='73'

SELECT * FROM ERP_Venta
select * from  ERP_VentaDetalle where idventa='98'
select * from ERP_Productos where id='6524'
SELECT * FROM ERP_FormasPago
SELECT * FROM ERP_CondicionPago
select * from ERP_Solicitud
select * from ERP_Moneda
select * from ERP_Vendedores where estado='A'
select * from ERP_Moneda

select * from ERP_Clientes
select * from ERP_Sector
ALTER TABLE ERP_Clientes
ADD idsector int 


drop table ERP_SolicitudCompra_Detalle

alter table ERP_SolicitudCompra
drop COLUMN fecha_proceso, idTipoOperacion, naturaleza,idMoneda,idAlmacen ;

alter table ERP_SolicitudCompra_Articulo
drop COLUMN idLote
	
ALTER TABLE ERP_SolicitudCompra_Articulo
ADD observaciones varchar(100);


select * from ERP_OrdenServicio
select * from ERP_SolicitudCompra

CREATE TABLE [dbo].[ERP_OrdenCompra](
	[id] [int] NOT NULL,
	[cCodConsecutivo] [varchar](10) NOT NULL,
	[nConsecutivo] [int] NOT NULL,
	[dFecRegistro] [datetime] NULL,
	[prioridad] [varchar](1) NULL,
	[dFecRequerida] [datetime]  NULL,
	[idProveedor] [int]  NULL,
	[idMoneda] [int] NULL,
	[idcondicion_pago] [int]  NULL,
	[subtotal] [decimal](18, 5) NULL,
	[nDescuento] [decimal](18, 5) NULL,
	[nPorcDescuento] [decimal](18, 2) NULL,
	[nIdDscto] [int] NULL,
	[valorCompra] [decimal](18, 5) NULL,
	[impuesto] varchar(1) NULL,
	[nImpuesto] [decimal](18, 5) NULL,
	[total] [decimal](18, 5) NULL,
	[direccionEntrega] [varchar](255) NULL,
	[iEstado] [int] NULL,
	[user_created] [varchar](10) NULL,
	[created_at] [datetime] NULL,
	[user_updated] [varchar](10) NULL,
	[updated_at] [datetime] NULL,
	 PRIMARY KEY (id,cCodConsecutivo,nConsecutivo)
	 )
	
	CREATE TABLE [dbo].[ERP_OrdenCompraArticulo](
	[id] [int] NOT NULL,
	[idArticulo] [int] NOT NULL,
	[idOrden] [int] NOT NULL,
	[cantidad] [money] NULL,
	[cantidadPendiente] [money] NULL,
	[cantidadRecibida] [money] NULL,
	[cantidadDevuelta] [money] NULL,
	[precioUnitario] [decimal](18, 5) NULL,
	[precioTotal] [decimal](18, 5) NULL,
	[nImpuesto] [decimal](18, 5) NULL,
	[nIdDscto] [int] NULL,
	[nDescuento] [decimal](18, 5) NULL,
	[nPorcDescuento] [decimal](18, 5) NULL,
	[valorCompra] [decimal](18, 5) NULL,
		[total] [decimal](18, 5) NULL,
	[user_created] [varchar](10) NULL,
	[created_at] [datetime] NULL,
	[user_updated] [varchar](10) NULL,
	[updated_at] [datetime] NULL,
	[observaciones] [varchar](100) NULL,

CREATE TABLE [dbo].[ERP_OrdenCompraArticulo](
	[id] [int] NOT NULL,
	[cCodConsecutivo] [varchar](10) NOT NULL,
	[nConsecutivo] [int] NOT NULL,
	[dFecRegistro] [datetime] NULL,
	[prioridad] [varchar](1) NULL,
	[dFecRequerida] [datetime]  NULL,
	[idProveedor] [int]  NULL,
	[idMoneda] [int] NULL,
	[idcondicion_pago] [int]  NULL,
	[subtotal] [decimal](18, 5) NULL,
	[nDescuento] [decimal](18, 5) NULL,
	[nPorcDescuento] [decimal](18, 2) NULL,
	[nIdDscto] [int] NULL,
	[valorCompra] [decimal](18, 5) NULL,
	[nImpuesto] [decimal](18, 5) NULL,
	[total] [decimal](18, 5) NULL,
	[direccionEntrega] [varchar](255) NULL,
	[iEstado] [int] NULL,
	 PRIMARY KEY (id,cCodConsecutivo,nConsecutivo)
	 )


SELECT * FROM ERP_SolicitudCompra_Articulo

select * from ERP_SolicitudCompra




 
	select * from ERP_SolicitudCompra_Articulo

delete from ERP_SolicitudCompra_Articulo

select * from erp_s


CREATE TABLE ERP_Sector (
		id int not null,
    descripcion varchar(255)  null,
		ubigeo varchar(10) null,
		estado varchar(1)  null,
		user_created varchar(10) null,
		created_at datetime null,
		user_updated varchar(10) null,
		updated_at datetime null,
	  PRIMARY KEY (id)
);

SELECT * FROM ERP_Sector where ubigeo='220901'

select * from ERP_TipoProveedor

SELECT * FROM ERP_SolicitudCompra_Articulo

ALTER TABLE ERP_TipoProveedor
ADD cCostoCuentaPagar varchar(25),
 cCostoCuentaCieDev varchar(25),
 cCostoCuentaCieCre varchar(25)

ALTER TABLE ERP_SolicitudCompra_Articulo
ADD cCostoCuentaPagar varchar(25),
 cCostoCuentaCieDev varchar(25),
 cCostoCuentaCieCre varchar(25)
 
 select * from ERP_SolicitudCompra_Detalle

select * from ERP_Productos

select * from ERP_UnidadMedida

select * from ERP_Productos as pr inner join ERP_UnidadMedida as un on (pr.um_id=un.IdUnidadMedida) where pr.id='01'


CREATE VIEW [dbo].[ERP_view_solicitud_Asignacion] AS 
SELECT sect.descripcion as sector,c.idsector,ubi.cDepartamento,ubi.cProvincia,ubi.cDistrito,v.idventa,v.IdTipoDocumento,v.serie_comprobante,v.numero_comprobante,co.id as idCobrador ,c.id as idCliente ,c.razonsocial_cliente as cliente , tdoc.Descripcion as tipoComprobanteText,co.descripcion as Cobrador, con.nCodTienda, v.tipo_comprobante,s.cCodConsecutivo, s.nConsecutivo, s.fecha_solicitud, s.tipo_solicitud, s.estado, s.idconvenio, s.descuento_id, tc.cDescripcion AS tipo_documento, c.documento AS numero_documento, m.Descripcion AS moneda, s.t_monto_total,
CASE WHEN s.saldo IS NULL THEN 0 ELSE s.saldo END AS saldo,
CASE WHEN s.pagado IS NULL THEN 0 ELSE s.pagado END AS pagado,
CASE WHEN s.facturado IS NULL THEN 0 ELSE s.facturado END AS facturado
FROM ERP_Solicitud AS s
INNER JOIN ERP_Clientes AS c ON(s.idcliente=c.id)
left join ERP_Ubigeo as ubi on (ubi.cCodUbigeo=c.ubigeo)
INNER JOIN ERP_TABLASUNAT AS tc ON(cnombretabla = 'TIPO_DOCUMENTO' AND tc.cCodigo=c.tipodoc)
INNER JOIN ERP_Moneda AS m ON(m.IdMoneda=s.idmoneda)
INNER JOIN ERP_Venta AS v on(v.cCodConsecutivo_solicitud=s.cCodConsecutivo and v.nConsecutivo_solicitud=s.nConsecutivo and v.tipo_comprobante = 0 and v.IdTipoDocumento in ('03','01'))
INNER JOIN ERP_Consecutivos AS con on (con.cCodConsecutivo=s.cCodConsecutivo)
INNER JOIN ERP_TipoDocumento AS tdoc on (v.IdTipoDocumento=tdoc.IdTipoDocumento)
left  join ERP_Cobrador as co on(s.idCobrador=co.id)
left join erp_sector as sect on (sect.id=c.idsector)
WHERE S.saldo > 0 AND S.estado > 5

GO

























alter VIEW [dbo].[ERP_VW_VentaClientes] AS
select ven.anulado, pr.idCategoria as idCategoria,ven.idtienda as idtienda ,ved.idvendedor as idvendedor,ved.descripcion as usuario,ven.idventa,ven.fecha_emision as Fecha,concat(ven.serie_comprobante,'-', ven.numero_comprobante) as Documento ,ven.serie_comprobante, ven.numero_comprobante,cl.correo_electronico,cl.id as idcliente,cl.documento as DocumentoCliente,cl.razonsocial_cliente as razonsocial_cliente, cl.direccion as Direccion,cl.celular,mo.descripcion as Modelo,ser.motor as Motor,ser.nombreSerie as numero_serie,ser.color as Color , ser.idSerie as idSerie,
sc.cuota_inicial as cuota_inicial,sa.precio_unitario as precio_unitario,fp.id as idcondicion_pago,fp.description as condicion_pago,mon.IdMoneda as IdMoneda,mon.descripcion as Moneda,ven.saldo, ven.pagado
from ERP_Venta as ven
INNER JOIN ERP_Solicitud as s on(ven.cCodConsecutivo_solicitud=s.cCodConsecutivo and ven.nConsecutivo_solicitud=s.nConsecutivo)
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
where ven.idVenta not in (select ven.idventa from erp_venta as ven inner join ERP_Venta as nota on(ven.idventa=nota.idventa_referencia)
)

alter VIEW [dbo].[ERP_VW_VentaClientes] AS
select ven.anulado, pr.idCategoria as idCategoria,ven.idtienda as idtienda ,ved.idvendedor as idvendedor,ved.descripcion as usuario,ven.idventa,ven.fecha_emision as Fecha,concat(ven.serie_comprobante,'-', ven.numero_comprobante) as Documento ,ven.serie_comprobante, ven.numero_comprobante,cl.correo_electronico,cl.id as idcliente,cl.documento as DocumentoCliente,cl.razonsocial_cliente as razonsocial_cliente, cl.direccion as Direccion,cl.celular,mo.descripcion as Modelo,ser.motor as Motor,ser.nombreSerie as numero_serie,ser.color as Color , ser.idSerie as idSerie,
sc.cuota_inicial as cuota_inicial,sa.precio_unitario as precio_unitario,fp.id as idcondicion_pago,fp.description as condicion_pago,mon.IdMoneda as IdMoneda,mon.descripcion as Moneda,ven.saldo, ven.pagado
from ERP_Venta as ven
INNER JOIN ERP_Solicitud as s on(ven.cCodConsecutivo_solicitud=s.cCodConsecutivo and ven.nConsecutivo_solicitud=s.nConsecutivo)
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
where ven.idVenta not in (select ven.idventa from erp_venta as ven inner join ERP_Venta as nota on(ven.idventa=nota.idventa_referencia)
)
select * from ERP_view_solicitud_Asignacion


ALTER VIEW [dbo].[ERP_view_solicitud_Asignacion] AS 
SELECT v.idventa,v.IdTipoDocumento,v.serie_comprobante,v.numero_comprobante,co.id as idCobrador ,c.id as idCliente ,c.razonsocial_cliente as cliente , tdoc.Descripcion as tipoComprobanteText,co.descripcion as Cobrador, con.nCodTienda, v.tipo_comprobante,s.cCodConsecutivo, s.nConsecutivo, s.fecha_solicitud, s.tipo_solicitud, s.estado, s.idconvenio, s.descuento_id, tc.cDescripcion AS tipo_documento, c.documento AS numero_documento, m.Descripcion AS moneda, s.t_monto_total,
CASE WHEN s.saldo IS NULL THEN 0 ELSE s.saldo END AS saldo,
CASE WHEN s.pagado IS NULL THEN 0 ELSE s.pagado END AS pagado,
CASE WHEN s.facturado IS NULL THEN 0 ELSE s.facturado END AS facturado
FROM ERP_Solicitud AS s
INNER JOIN ERP_Clientes AS c ON(s.idcliente=c.id)
INNER JOIN ERP_TABLASUNAT AS tc ON(cnombretabla = 'TIPO_DOCUMENTO' AND tc.cCodigo=c.tipodoc)
INNER JOIN ERP_Moneda AS m ON(m.IdMoneda=s.idmoneda)
INNER JOIN ERP_Venta AS v on(v.cCodConsecutivo_solicitud=s.cCodConsecutivo and v.nConsecutivo_solicitud=s.nConsecutivo and v.tipo_comprobante = 0 and v.IdTipoDocumento in ('03','01'))
INNER JOIN ERP_Consecutivos AS con on (con.cCodConsecutivo=s.cCodConsecutivo)
INNER JOIN ERP_TipoDocumento AS tdoc on (v.IdTipoDocumento=tdoc.IdTipoDocumento)
left  join ERP_Cobrador as co on(s.idCobrador=co.id)
WHERE S.saldo > 0 


SELECT * FROM ERP_Almacen

ALTER VIEW [dbo].[ERP_view_solicitud_Asignacion] AS 
SELECT v.idventa,v.IdTipoDocumento,v.serie_comprobante,v.numero_comprobante,co.id as idCobrador ,c.id as idCliente ,c.razonsocial_cliente as cliente , tdoc.Descripcion as tipoComprobanteText,co.descripcion as Cobrador, con.nCodTienda, v.tipo_comprobante,s.cCodConsecutivo, s.nConsecutivo, s.fecha_solicitud, s.tipo_solicitud, s.estado, s.idconvenio, s.descuento_id, tc.cDescripcion AS tipo_documento, c.documento AS numero_documento, m.Descripcion AS moneda, s.t_monto_total,
CASE WHEN s.saldo IS NULL THEN 0 ELSE s.saldo END AS saldo,
CASE WHEN s.pagado IS NULL THEN 0 ELSE s.pagado END AS pagado,
CASE WHEN s.facturado IS NULL THEN 0 ELSE s.facturado END AS facturado
FROM ERP_Solicitud AS s
INNER JOIN ERP_Clientes AS c ON(s.idcliente=c.id)
INNER JOIN ERP_TABLASUNAT AS tc ON(cnombretabla = 'TIPO_DOCUMENTO' AND tc.cCodigo=c.tipodoc)
INNER JOIN ERP_Moneda AS m ON(m.IdMoneda=s.idmoneda)
INNER JOIN ERP_Venta AS v on(v.cCodConsecutivo_solicitud=s.cCodConsecutivo and v.nConsecutivo_solicitud=s.nConsecutivo and v.tipo_comprobante = 0 and v.IdTipoDocumento in ('03','01'))
INNER JOIN ERP_Consecutivos AS con on (con.cCodConsecutivo=s.cCodConsecutivo)
INNER JOIN ERP_TipoDocumento AS tdoc on (v.IdTipoDocumento=tdoc.IdTipoDocumento)
left  join ERP_Cobrador as co on(s.idCobrador=co.id)
WHERE S.saldo > 0 AND S.estado > 5 and S.estado <9

GO
SELECT * from [ERP_view_solicitud_Asignacion]

ALTER VIEW [dbo].[ERP_VWStockDetalle]
as
SELECT tcv.descripcion as tipoCompraVenta,P.code_article,SLD.idArticulo id, P.description Articulo,C.descripcion Categoria,UM.Abreviatura Unidad, A.description Almacen,L.descripcion Localizacion,
isnull(LO.Lote,'') Lote,isnull(S.nombreSerie,'') Serie,
SLD.disponible Disponible,SLD.remitido Remitido,SLD.total Total,SLD.en_transito Transito,
convert(decimal(10,2),ROUND(p.costo,2)) Costo_Promedio_Unitario,convert(decimal(10,2),round((SLD.total * p.costo),2)) Costo_Total
FROM ERP_almacen_stock_localizacion_detalle  SLD
INNER JOIN ERP_Productos P ON P.id = SLD.idArticulo
INNER JOIN ERP_Categoria C ON C.idCategoria = P.idCategoria
INNER JOIN ERP_UnidadMedida UM ON UM.IdUnidadMedida = P.um_id
INNER JOIN ERP_Almacen A ON A.id = SLD.idAlmacen
INNER JOIN ERP_Localizacion L ON L.idAlmacen = SLD.idAlmacen AND L.idLocalizacion = SLD.idLocalizacion
LEFT JOIN ERP_Lote LO ON LO.idLote = SLD.idDetalle AND LO.idArticulo = SLD.idArticulo and SLD.TipoId = 'L'
LEFT JOIN ERP_Serie S ON S.idSerie = SLD.idDetalle AND S.idArticulo = SLD.idArticulo and SLD.TipoId = 'S' 
Left join ERP_TipoCompraVenta as tcv on(tcv.idTipoCompraVenta=S.idTipoCompraVenta);

select pc.Id as idProveedorCuentaBanco,pc.Descripcion as prb_descripcion,b.descripcion as bancos_descripcion,mo.Descripcion as moneda_descripcion,* from ERP_ProveedorCuentaBanco as pc inner join ERP_Bancos as b on (b.IdBanco=pc.idbanco) inner join ERP_Moneda as mo on (mo.IdMoneda=pc.IdMoneda) where pc.idProveedor='11'

select * from ERP_ProveedorCuentaBanco
select * from ERP_Bancos
select * from ERP_Moneda
select * from ERP_Persona

select * from ERP_Proveedor
select * from ERP_Persona
select * from ERP_Clientes

ALTER TABLE ERP_Clientes ALTER COLUMN razonsocial_cliente varchar(500) 
ALTER TABLE ERP_Proveedor ALTER COLUMN razonsocial varchar(500) 
ALTER TABLE ERP_Persona ALTER COLUMN cRazonSocial varchar(500) 
select * from ERP_Compania
select * from ERP_VW_VentaClientes

alter VIEW [dbo].[ERP_VW_VentaClientes] AS
select pr.idCategoria as idCategoria,ven.idtienda as idtienda ,ved.idvendedor as idvendedor,ved.descripcion as usuario,ven.idventa,ven.fecha_emision as Fecha,concat(ven.serie_comprobante,'-', ven.numero_comprobante) as Documento ,ven.serie_comprobante, ven.numero_comprobante,cl.correo_electronico,cl.id as idcliente,cl.documento as DocumentoCliente,cl.razonsocial_cliente as razonsocial_cliente, cl.direccion as Direccion,cl.celular,mo.descripcion as Modelo,ser.motor as Motor,ser.nombreSerie as numero_serie,ser.color as Color , ser.idSerie as idSerie,
sc.cuota_inicial as cuota_inicial,sa.precio_unitario as precio_unitario,fp.id as idcondicion_pago,fp.description as condicion_pago,mon.IdMoneda as IdMoneda,mon.descripcion as Moneda,ven.saldo, ven.pagado
from ERP_Venta as ven
INNER JOIN ERP_Solicitud as s on(ven.cCodConsecutivo_solicitud=s.cCodConsecutivo and ven.nConsecutivo_solicitud=s.nConsecutivo)
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
GO



	

////////////////////
select * from ERP_Compradores

CREATE TABLE [dbo].[ERP_AprobacionCompraDetalle](
	[nIdAprob] [int] NOT NULL,
	[nIdUsuario] [int] NOT NULL,
	[nOrden] [int] NOT NULL,
	[cIdUsuCre] [varchar](30) NOT NULL,
	[dFecCre] [datetime] NOT NULL,
	[cIdUsuMod] [varchar](30) NOT NULL,
	[dFecMod] [datetime] NOT NULL,
	 PRIMARY KEY (nIdAprob,nIdUsuario)
)


ALTER TABLE ERP_Venta
ADD anulado varchar(1)


CREATE TABLE [dbo].[ERP_AprobacionCompraDetalle](
	[nIdAprob] [int] NOT NULL,
	[nIdUsuario] [int] NOT NULL,
	[nOrden] [int] NOT NULL,
	[cIdUsuCre] [varchar](30) NOT NULL,
	[dFecCre] [datetime] NOT NULL,
	[cIdUsuMod] [varchar](30) NOT NULL,
	[dFecMod] [datetime] NOT NULL,
	 PRIMARY KEY (nIdAprob,nIdUsuario)
)
	
select * from ERP_AprobacionCompra
select * from ERP_SolicitudCompra_Detalle

delete from ERP_AprobacionCompra
delete from ERP_AprobacionCompraDetalle
drop table ERP_SolicitudCompra

select * from ERP_SolicitudCompra
select * from ERP_SolicitudCompra_Articulo where estado='A'

select * from ERP_Consecutivos 
select * from ERP_TipoConsecutivos
select * from ERP_Tienda
select * from ERP_AlmacenUsuario
select * from ERP_Almacen
SELECT * FROM ERP_SolicitudDetalle
select * from ERP_SolicitudCompra
SELECT * FROM ERP_solici
drop table ERP_SolicitudCompra
CREATE TABLE [dbo].[ERP_SolicitudCompra](
	[idMovimiento] [int] NOT NULL,
	[fecha_registro] [datetime] NULL,
	[fecha_requerida] [datetime] NULL,
	[fecha_proceso] [datetime] NULL,
	[idUsuario] [int] NULL,
	[idTipoOperacion] [int] NULL,
	[naturaleza] [varchar](1) NULL,
	[observaciones] [varchar](100) NULL,
	[idMoneda] [int] NULL,
	[idAlmacen] [int] NULL,
	[prioridad] [varchar](1) NULL,
	[idArea] [int] NULL,
	[estado] [int] NULL,
	[user_created] [varchar](10) NULL,
	[created_at] [datetime] NULL,
	[user_updated] [varchar](10) NULL,
	[updated_at] [datetime] NULL,
	[cCodConsecutivo] [varchar](10) not NULL,
	[nConsecutivo] [int] not NULL,
	PRIMARY KEY (idMovimiento,cCodConsecutivo,nConsecutivo)
)
select * from ERP_Productos
select * from ERP_Lote
delete from ERP_SolicitudCompra_Articulo
select * from ERP_SolicitudCompra_Articulo
drop table ERP_SolicitudCompra_Articulo
CREATE TABLE [dbo].[ERP_SolicitudCompra_Articulo](
	[idMovimiento] [int] NOT NULL,
	[idArticulo] [int] NOT NULL,
	[consecutivo] [int] NOT NULL,
	[idLote] [int] NULL,
	[fecha_requerida] [datetime] NULL,
	[estado] [varchar](1) NULL,
	[cantidad] [money] NULL,
	[user_created] [varchar](10) NULL,
	[created_at] [datetime] NULL,
	[user_updated] [varchar](10) NULL,
	[updated_at] [datetime] NULL,
	PRIMARY KEY (idMovimiento,idArticulo,consecutivo)
)
select * from ERP_Lote

select FORMAT(Mo.fecha_requerida, 'yyyy-MM-dd') AS fecha_requerida_ad,* from ERP_SolicitudCompra_Articulo as Mo inner join ERP_Productos as pr on mo.idArticulo=pr.id where mo.idMovimiento='72'

delete from ERP_SolicitudCompra_Detalle
select * from ERP_SolicitudCompra_Detalle
CREATE TABLE [dbo].[ERP_SolicitudCompra_Detalle](
	[idMovimiento] [int] NOT NULL,
	[idArticulo] [int] NOT NULL,
	[consecutivo] [int] NOT NULL,
	[serie] [int] NOT NULL,
	[user_created] [varchar](10) NULL,
	[created_at] [datetime] NULL,
	[user_updated] [varchar](10) NULL,
	[updated_at] [datetime] NULL,
	PRIMARY KEY (idMovimiento,idArticulo,consecutivo,serie)
)
	
//////////////////////////////
select * from ERP_Moneda
drop table ERP_AprobacionCompra
CREATE TABLE [dbo].[ERP_AprobacionCompra](
	[nIdAprob] [int] NOT NULL,
	[nIdTienda] [int]  NULL,
	[nIdMoneda] [int]  NULL,
	[nIdArea] [int]  NULL,
	[montoInicio] decimal(10,4)  NULL,
	[montoFin] decimal(10,4)  NULL,
	[dFecIni] [datetime]  NULL,
	[dFecFin] [datetime]  NULL,
	[cIdUsuCre] [varchar](30) NOT NULL,
	[dFecCre] [datetime] NOT NULL,
	[cIdUsuMod] [varchar](30) NOT NULL,
	[dFecMod] [datetime] NOT NULL
	 PRIMARY KEY (nIdAprob)
	)
select * from erp_area	
select * from ERP_Moneda
///
CREATE TABLE ERP_Empresa (
		id int not null,
    descripcion varchar(255)  null,
		estado varchar(1)  null,
		user_created varchar(10) null,
		created_at datetime null,
		user_updated varchar(10) null,
		updated_at datetime null,
	  PRIMARY KEY (id)
);
CREATE TABLE ERP_Area (
		id int not null,
    descripcion varchar(255)  null,
		estado varchar(1)  null,
		user_created varchar(10) null,
		created_at datetime null,
		user_updated varchar(10) null,
		updated_at datetime null,
	  PRIMARY KEY (id)
);

DROP TABLE ERP_CompraArticulo
	
DROP TABLE ERP_CompraArticulo	

CREATE TABLE [dbo].[ERP_ProveedorCuentaBanco](
	[Id][int] NOT NULL,
	[idProveedor] [int] NOT NULL,
	[IdBanco] [varchar](5) NULL,
	[IdMoneda] [varchar](5) NULL,
	[Descripcion] [varchar](100) NULL,
	[Nrocuenta] [varchar](25) NULL,
	[user_created] [int] NULL,
	[user_updated] [int] NULL,
	[user_deleted] [int] NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[deleted_at] [datetime] NULL,
	PRIMARY KEY (Id)
)


insert into [ERP_ProveedorCuentaBanco] ([idProveedor], [IdBanco], [IdMoneda], [Descripcion], [Nrocuenta], [user_created], [user_updated], [updated_at], [created_at]) values (20, 1, 3, 123213, 3213213, 1006, 1006, 2022-04-07 23:49:15.000, 2022-04-07 23:49:15.000))

select * from ERP_ProveedorCuentaBanco
select * from ERP_TipoProveedor
select * from ERP_Moneda
drop table ERP_Proveedor

select * from ERP_Proveedor 
CREATE TABLE [dbo].[ERP_Proveedor](
	[id] [int] NOT NULL,
	[id_tipoProveedor] [int] NOT NULL,
	[tipodoc] [varchar](5) NULL,
	[documento] [varchar](50) NULL,
	[razonsocial] [varchar](255) NULL,
	[contacto] [varchar](255) NULL,
	[direccion] [varchar](255) NULL,
	[correo_electronico] [varchar](255) NULL,
	[celular] [varchar](100) NULL,
	[cIdUsuCre] [varchar](30) NOT NULL,
	[dFecCre] [datetime] NOT NULL,
	[cIdUsuMod] [varchar](30) NOT NULL,
	[dFecMod] [datetime] NOT NULL,
	[telefono] [varchar](100) NULL,
	[ubigeo] [varchar](10) NULL,
	[IdTipoDocumento] [varchar](5) NULL,
	[idPersona] [int] NULL,
	[cEstadoCivil] [varchar](1) NULL,
	[impuesto] [varchar](1) NULL,
	[activo] [varchar](1) NULL,
  [congelado] [varchar](1) NULL,
	[idcCondicionPago] [INT]NULL,
	PRIMARY KEY (id)
)

select * from ERP_Serie
select * from ERP_TipoCompraVenta

SELECT * FROM ERP_Persona
drop TABLE ERP_TipoProveedor


SELECT ti.*, p.*, FORMAT(p.dFechanacimiento, 'dd/MM/yyyy') AS dFechanacimiento , ub.* FROM ERP_Proveedor as ti 
        left join ERP_Ubigeo as ub on ti.ubigeo=ub.cCodUbigeo 
        LEFT JOIN ERP_Persona AS p ON(p.idPersona=ti.idPersona)
        where ti.id='1'
				
				
CREATE TABLE [dbo].[ERP_TipoProveedor](
	[id] [int] NOT NULL,
	[descripcion] [varchar](100) NULL,
	[cuentaPagar] [varchar](100) NULL,
	[cuentaCierreDevito] [varchar](100) NULL,
	[cuentaCierreCredito] [varchar](100) NULL,
	[estado] [varchar](1) NOT NULL,
	[cIdUsuCre] [varchar](30) NOT NULL,
	[dFecCre] [datetime] NOT NULL,
	[cIdUsuMod] [varchar](30) NOT NULL,
	[dFecMod] [datetime] NOT NULL,
	PRIMARY KEY (id)
	)



///view creditos aprobados///
alter VIEW [dbo].[ERP_view_reporte_creditos_aprobados] AS 
select s.estado,vend.descripcion as vendedor,concat(v.serie_comprobante,'-',RIGHT('00000' + CAST(FLOOR(v.numero_comprobante) AS VARCHAR), 5),'-',RIGHT('00000' + CAST(FLOOR(tike.numero_comprobante) AS VARCHAR), 5) ) as documento_ven,v.idtienda,sc.total_financiado+sc.intereses as financiado,sc.intereses+sc.monto_venta as Credito,total_financiado as total_financiado,sc.valor_cuota as cuota,sc.cuota_inicial as inicial,sc.monto_venta as precio_lista,sc.intereses,sc.nro_cuotas,mon.IdMoneda, mon.Descripcion as moneda,mon.Simbolo, s.cCodConsecutivo, s.nConsecutivo,s.fecha_solicitud,s.idvendedor,s.idcliente,cli.razonsocial_cliente,cli.id_tipocli as idTipoCliente,tcl.descripcion as tipocliente,v.fecha_emision as fecdoc,v.serie_comprobante,v.numero_comprobante from ERP_Solicitud as s 
inner join ERP_SolicitudCredito as sc on (sc.cCodConsecutivo=s.cCodConsecutivo and sc.nConsecutivo=s.nConsecutivo)
INNER JOIN  ERP_Clientes as cli on (cli.id=s.idcliente) 
inner join  ERP_Venta as v on (v.cCodConsecutivo_solicitud=s.cCodConsecutivo and v.nConsecutivo_solicitud=s.nConsecutivo  and v.IdTipoDocumento in ('03','01'))
inner join ERP_Moneda as mon on (mon.IdMoneda=v.idmoneda)
inner join 	ERP_Venta as tike on(tike.idventa_comprobante=v.idventa)
inner join ERP_Vendedores as vend on(vend.idvendedor=s.idvendedor) 
left join ERP_TipoCliente as tcl on (tcl.id=cli.id_tipocli)
where s.estado='4'

SELECT * FROM ERP_TipoCliente
select * from ERP_Vendedores
//VIEW ASIGNACION COBRADOR ///
ALTER VIEW [dbo].[ERP_view_solicitud_Asignacion] AS 
SELECT v.idventa,v.IdTipoDocumento,v.serie_comprobante,v.numero_comprobante,co.id as idCobrador ,c.id as idCliente ,c.razonsocial_cliente as cliente , tdoc.Descripcion as tipoComprobanteText,co.descripcion as Cobrador, con.nCodTienda, v.tipo_comprobante,s.cCodConsecutivo, s.nConsecutivo, s.fecha_solicitud, s.tipo_solicitud, s.estado, s.idconvenio, s.descuento_id, tc.cDescripcion AS tipo_documento, c.documento AS numero_documento, m.Descripcion AS moneda, s.t_monto_total,
CASE WHEN s.saldo IS NULL THEN 0 ELSE s.saldo END AS saldo,
CASE WHEN s.pagado IS NULL THEN 0 ELSE s.pagado END AS pagado,
CASE WHEN s.facturado IS NULL THEN 0 ELSE s.facturado END AS facturado
FROM ERP_Solicitud AS s
INNER JOIN ERP_Clientes AS c ON(s.idcliente=c.id)
INNER JOIN ERP_TABLASUNAT AS tc ON(cnombretabla = 'TIPO_DOCUMENTO' AND tc.cCodigo=c.tipodoc)
INNER JOIN ERP_Moneda AS m ON(m.IdMoneda=s.idmoneda)
INNER JOIN ERP_Venta AS v on(v.cCodConsecutivo_solicitud=s.cCodConsecutivo and v.nConsecutivo_solicitud=s.nConsecutivo and v.tipo_comprobante = 0 and v.IdTipoDocumento in ('03','01'))
INNER JOIN ERP_Consecutivos AS con on (con.cCodConsecutivo=s.cCodConsecutivo)
INNER JOIN ERP_TipoDocumento AS tdoc on (v.IdTipoDocumento=tdoc.IdTipoDocumento)
left  join ERP_Cobrador as co on(s.idCobrador=co.id)
WHERE S.saldo > 0 AND S.estado > 5

GO


/// vie reporte repuesto 16/03/2022/ ///////////
select * from ERP_VW_REPORTE_REPUESTO
alter VIEW ERP_VW_REPORTE_REPUESTO AS 
SELECT * FROM (select mo.IdMoneda, mo.Simbolo,v.idtienda,s.idvendedor,s.idcliente,v.fecha_emision as fecha,s.origen,v.idventa as idventa_ca,v.t_monto_total as monto_total,s.estado as estado,concat(v.serie_comprobante,'-',RIGHT('00000' + CAST(FLOOR(v.numero_comprobante) AS VARCHAR), 5),'-',RIGHT('00000' + CAST(FLOOR(tic.numero_comprobante) AS VARCHAR), 5) ) as documento_ven,s.cCodConsecutivo as cCodConsecutivo, s.nConsecutivo as nConsecutivo,v.serie_comprobante as serie_comprobante,v.numero_comprobante as numero_comprobante,cl.razonsocial_cliente,vend.descripcion as vendedor
from ERP_Solicitud as s inner join erp_venta as v on (v.cCodConsecutivo_solicitud=s.cCodConsecutivo and v.nConsecutivo_solicitud=s.nConsecutivo)
inner join ERP_Moneda as mo on mo.idmoneda=v.IdMoneda
inner join ERP_Clientes as cl on (s.idcliente=cl.id)		
inner join ERP_Venta as tic on (tic.idventa_comprobante=v.idventa)
inner join ERP_Vendedores as vend on(vend.idvendedor=s.idvendedor) ) AS T1 right join
(select v.idventa as idventa_cu,sum(CASE  
             WHEN p.idCategoria =3 THEN sa.monto_total 
              ELSE 0 
           END) as REPUESTO, sum(CASE  
             WHEN p.idCategoria =4 THEN sa.monto_total 
              ELSE 0 
           END) as ACEITE,
					 sum(CASE  
             WHEN p.idCategoria =6 THEN sa.monto_total 
              ELSE 0 
           END) as SERVICIO,
					 sum(CASE  
             WHEN p.idCategoria =7 THEN sa.monto_total 
              ELSE 0 
           END) as TERCEROS			
from ERP_Solicitud as s inner join erp_venta as v on (v.cCodConsecutivo_solicitud=s.cCodConsecutivo and v.nConsecutivo_solicitud=s.nConsecutivo)
			inner join ERP_VentaDetalle as sa on (sa.idventa=v.idventa) inner join ERP_Clientes as cl on (s.idcliente=cl.id)
inner join ERP_Venta as tic on (tic.idventa_comprobante=v.idventa)
inner join ERP_Vendedores as vend on(vend.idvendedor=s.idvendedor)
inner join ERP_Productos as p on (p.id=sa.idArticulo) where  p.idCategoria IN (3,4,6,7) GROUP BY v.idventa ) AS T2 ON T1.idventa_ca=T2.idventa_cu  ORDER BY T1.IdMoneda  where t2.idventa_cu='98'


//////// NO SE ////////
select SUM(vp.monto_pago) as total,cp.id as idCondicionPago,cp.description as condicionPago from ERP_VentaFormaPago as vp inner join erp_venta as v on vp.idventa=v.idventa inner join ERP_Clientes as cl on v.idcliente=cl.id inner join ERP_FormasPago as fp on fp.codigo_formapago=vp.codigo_formapago inner join ERP_CondicionPago as cp on cp.id=v.condicion_pago GROUP BY v.condicion_pago ,cp.id,cp.description

select cp.id as idCondicionPago,cp.description as condicionPago , v.fecha_emision,vp.codigo_formapago,fp.descripcion_subtipo,vp.monto_pago,v.idventa,v.serie_comprobante,v.numero_comprobante,v.idcliente,cl.razonsocial_cliente from ERP_VentaFormaPago as vp inner join erp_venta as v on vp.idventa=v.idventa inner join ERP_Clientes as cl on v.idcliente=cl.id inner join ERP_FormasPago as fp on fp.codigo_formapago=vp.codigo_formapago inner join ERP_CondicionPago as cp on cp.id=v.condicion_pago inner join erp_venta as tiket on (tiket.idventa_comprobante=v.idventa) where convert(date,v.fecha_emision)='$date' and v.idcajero='$usuario' ORDER BY codigo_formapago
select * from ERP_Venta

//////////////////// 14/03/2022 info_reporte_comprobantes///////////////////////////////////////////
select * from ERP_Venta 



//////// 14/03/2022 info_reporte_cuentasxcliente///////////////////////////////////////////////////
select max(v.fecha_emision) as fecha_ultimo_pago,C.cCodConsecutivo,C.nConsecutivo,cl.razonsocial_cliente,ub.cDepartamento,ub.cProvincia,ub.cDistrito from ERP_SolicitudCronograma C
inner join ERP_Venta V on v.cCodConsecutivo_solicitud = c.cCodConsecutivo and v.nConsecutivo_solicitud = c.nConsecutivo
inner join ERP_Clientes as cl on cl.id=v.idCliente
left join ERP_Ubigeo as ub on ub.cCodUbigeo=cl.ubigeo
inner join ERP_VentaDetalle VD on VD.idventa = v.idventa and c.nrocuota = vd.nrocuota GROUP BY C.cCodConsecutivo,C.nConsecutivo,cl.razonsocial_cliente,ub.cDepartamento,ub.cProvincia,ub.cDistrito

select mo.Descripcion as moneda ,concat(ve.serie_comprobante,'-',RIGHT('00000' + CAST(FLOOR(ve.numero_comprobante) AS VARCHAR), 5),'-',RIGHT('00000' + CAST(FLOOR(sc.nrocuota) AS VARCHAR), 5) ) as documento_ven, * from ERP_SolicitudCronograma as sc INNER JOIN ERP_Venta as ve on (sc.cCodConsecutivo=ve.cCodConsecutivo_solicitud and sc.nConsecutivo=ve.nConsecutivo_solicitud)
inner join ERP_Moneda as mo on (mo.IdMoneda=ve.IdMoneda)
inner join ERP_Venta as tiket on(tiket.idventa_comprobante=ve.idventa) where sc.saldo_cuota>0 order BY ve.idmoneda


//////////////////// 14/03/2022 info_reporte_guia///////////////////////////////////////////////////

select * from ERP_GuiaRemision
select gp.cantidad,pr.description as producto,mo.descripcion as modelo,mar.description as marca,ser.color as color,ser.chasis as chasis,ser.nombreSerie as serie from ERP_GuiaRemisionProducto as gp inner JOIN ERP_GuiaRemisionDetalle as gd on (gp.cCodConsecutivo=gp.cCodConsecutivo and gp.nConsecutivo=gd.nConsecutivo and gp.consecutivo=gd.consecutivo)
inner join ERP_Productos as pr on (pr.id=gp.idarticulo)
LEFT JOIN ERP_Marcas AS mar ON (mar.id=pr.idMarca)LEFT JOIN ERP_Serie AS ser ON (ser.idSerie=gd.idSerie)
LEFT JOIN ERP_Modelo AS mo ON (pr.idModelo=mo.idModelo)

//////////////////// 14/03/2022 info_reporte_tarjeta////////////////////////////////////////////////////       
select mo.descripcion as modelo,ser.color as color,ser.cPlacaVeh as placa,ser.motor as motor,ser.chasis as chasis,cob.descripcion as cobrador ,ved.descripcion as vendedor,ven.fecha_emision as fecha_venta,sc.monto_venta as precio_lista, sc.cuota_inicial as cuota_inicial ,cl.cNumerodocumento as documento_cl,CONCAT(cl.cApePat,' ',cl.cApemat) as apellidos_cl, cl.cNombres as nombres_cl,cl.cCelular as celular_cl,
f.cNumerodocumento as documento_f,CONCAT(f.cApePat,' ',f.cApemat) as apellidos_f, f.cNombres as nombres_f,f.cCelular as celular_f,
cy.cNumerodocumento as documento_cy,CONCAT(cy.cApePat,' ',cy.cApemat) as apellidos_cy, cy.cNombres as nombres_cy,cy.cCelular as celular_cy,
fc.cNumerodocumento as documento_fc,CONCAT(fc.cApePat,' ',fc.cApemat) as apellidos_fc, fc.cNombres as nombres_fc,fc.cCelular as celular_fc
from ERP_Solicitud as s inner join ERP_SolicitudCredito as sc on (s.cCodConsecutivo=sc.cCodConsecutivo and s.nConsecutivo=sc.nConsecutivo)
INNER JOIN ERP_Venta as ven on(ven.cCodConsecutivo_solicitud=s.cCodConsecutivo and ven.nConsecutivo_solicitud=s.nConsecutivo)
INNER JOIN ERP_SolicitudArticulo as sa on(sa.cCodConsecutivo=s.cCodConsecutivo and sa.nConsecutivo=s.nConsecutivo)
INNER JOIN ERP_SolicitudDetalle as sd on(sd.cCodConsecutivo=sa.cCodConsecutivo and sd.nConsecutivo=sa.nConsecutivo and sa.id=sd.id_solicitud_articulo)
inner join ERP_Productos as pr on (pr.id=sa.idarticulo)
LEFT JOIN ERP_Clientes AS clp ON(clp.id=s.idcliente)
LEFT JOIN ERP_Persona AS cl ON(cl.idPersona=clp.idPersona)
LEFT JOIN ERP_Persona AS f ON(f.idPersona=sc.idfiador)
LEFT JOIN ERP_Persona AS cy ON (cy.idPersona=sc.idconyugue)
LEFT JOIN ERP_Persona AS fc ON(fc.idPersona=sc.idfiadorconyugue)
LEFT JOIN ERP_Vendedores AS ved ON (ved.idvendedor=s.idvendedor)
LEFT JOIN ERP_Cobrador AS cob ON (cob.id=s.idCobrador)
LEFT JOIN ERP_Serie AS ser ON (ser.idSerie=sd.idSerie)
LEFT JOIN ERP_Modelo AS mo ON (pr.idModelo=mo.idModelo)  where s.cCodConsecutivo='SOL' and s.nConsecutivo='65'

select * from ERP_Solicitud as s where s.cCodConsecutivo='SOL' and s.nConsecutivo='65'
select * from ERP_Clientes where id='5'
select * from ERP_Persona 

select * from ERP_Venta
select * from er
///////////////////////////////////////// info_view reporte_venta_cliente////////////////////////////////////////////////

create VIEW ERP_VW_VentaClientes AS
select pr.idCategoria as idCategoria,ven.idtienda as idtienda ,ved.idvendedor as idvendedor,ved.descripcion as usuario,ven.idventa,ven.fecha_emision as Fecha,concat(ven.serie_comprobante,'-', ven.numero_comprobante) as Documento ,ven.serie_comprobante, ven.numero_comprobante,cl.id as idcliente,cl.documento as DocumentoCliente,cl.razonsocial_cliente as razonsocial_cliente, cl.direccion as Direccion,cl.celular,mo.descripcion as Modelo,ser.motor as Motor,ser.nombreSerie as numero_serie,ser.color as Color , ser.idSerie as idSerie,
sc.cuota_inicial as cuota_inicial,sa.precio_unitario as precio_unitario,fp.id as idcondicion_pago,fp.description as condicion_pago,mon.IdMoneda as IdMoneda,mon.descripcion as Moneda,ven.saldo, ven.pagado
from ERP_Venta as ven
INNER JOIN ERP_Solicitud as s on(ven.cCodConsecutivo_solicitud=s.cCodConsecutivo and ven.nConsecutivo_solicitud=s.nConsecutivo)
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


select *
from ERP_Venta as ven
INNER JOIN ERP_Solicitud as s on(ven.cCodConsecutivo_solicitud=s.cCodConsecutivo and ven.nConsecutivo_solicitud=s.nConsecutivo)
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


///
CREATE TABLE ERP_TipoTraslado (
		id int not null,
    descripcion varchar(255)  null,
		estado varchar(1)  null,
		user_created varchar(10) null,
		created_at datetime null,
		user_updated varchar(10) null,
		updated_at datetime null,
	  PRIMARY KEY (id)
);
select * from ERP_Clientes
select * from ERP_Solicitud
select v.idtienda,sc.total_financiado+sc.intereses as financiado,sc.intereses+sc.monto_venta as Credito,total_financiado as total_financiado,sc.valor_cuota as cuota,sc.cuota_inicial as inicial,sc.monto_venta as precio_lista,sc.intereses,sc.nro_cuotas,mon.IdMoneda, mon.Descripcion as moneda,mon.Simbolo, s.cCodConsecutivo, s.nConsecutivo,s.fecha_solicitud,s.idvendedor,s.idcliente,cli.razonsocial_cliente,cli.id_tipocli as idTipoCliente,tcl.descripcion as tipocliente,v.fecha_emision as fecdoc,v.serie_comprobante,v.numero_comprobante from ERP_Solicitud as s 
inner join ERP_SolicitudCredito as sc on (sc.cCodConsecutivo=s.cCodConsecutivo and sc.nConsecutivo=s.nConsecutivo)
INNER JOIN  ERP_Clientes as cli on (cli.id=s.idcliente) 
inner join  ERP_Venta as v on (v.cCodConsecutivo_solicitud=s.cCodConsecutivo and v.nConsecutivo_solicitud=s.nConsecutivo  and v.IdTipoDocumento in ('03','01'))
inner join ERP_Moneda as mon on (mon.IdMoneda=v.idmoneda)
inner join 	ERP_Venta as tike on(tike.idventa_comprobante=v.idventa)left join ERP_TipoCliente as tcl on (tcl.id=cli.id_tipocli)
where s.estado='4'

select * from ERP_SolicitudCredito
select * from erp_venta
select * from ERP_Moneda
s

select * from ERP_Solicitud as s 
inner join ERP_SolicitudCredito as sc on (sc.cCodConsecutivo=s.cCodConsecutivo and sc.nConsecutivo=s.nConsecutivo)
INNER JOIN  ERP_Clientes as cli on (cli.id=s.idcliente) 
inner join  ERP_Venta as v on (v.cCodConsecutivo_solicitud=s.cCodConsecutivo and v.nConsecutivo_solicitud=s.nConsecutivo  and v.IdTipoDocumento in ('03','01'))
inner join 	ERP_Venta as tike on(tike.idventa_comprobante=v.idventa)
left join ERP_TipoCliente as tcl on (tcl.id=cli.id_tipocli)
where s.estado='4'


select * from ERP_GuiaRemision
select * from ERP_Compania
select * from ERP_GuiaRemisionDetalle
select * from ERP_Marcas
select * from ERP_Productos 
select * from ERP_Marcas
select * from ERP_Modelo
select pr.code_article,concat(pr.description,', Marca: ',mar.description,', Modelo: ',mod.descripcion, ', Color: ',se.color,', Chasis: ',se.chasis,',Motor: ',se.motor) as producto,gp.cantidad,un.descripcion as unidadMedida from ERP_GuiaRemisionProducto as gp inner join ERP_Productos as pr on (pr.id =gp.idarticulo) inner join ERP_GuiaRemisionDetalle as gd on (gp.cCodConsecutivo=gd.cCodConsecutivo and gp.nConsecutivo=gd.nConsecutivo and gd.consecutivo=gp.consecutivo) inner join ERP_UnidadMedida as un on(un.IdUnidadMedida=pr.um_id) left join ERP_Modelo as mod on(mod.idModelo=pr.idModelo) left join ERP_Marcas as mar on(mar.id=pr.idMarca) inner join ERP_Serie as se on (se.idSerie=gd.idSerie)  WHERE gp.cCodConsecutivo='G001' and gp.nConsecutivo='2' and pr.serie=1

select * from ERP_Serie
select * from ERP_UnidadMedida
select * from ERP_GuiaRemisionProducto as p left join ERP_GuiaRemisionDetalle as gd on (p.cCodConsecutivo=gd.cCodConsecutivo and p.nConsecutivo=gd.nConsecutivo and gd.consecutivo=p.consecutivo) inner join ERP_Serie as se on (se.idSerie=gd.idSerie) WHERE p.cCodConsecutivo='G001' and p.nConsecutivo='2' 

select pr.code_article,pr.description as producto,gp.cantidad,un.descripcion as unidadMedida from ERP_GuiaRemisionProducto as gp inner join ERP_Productos as pr on (pr.id =gp.idarticulo) inner join ERP_UnidadMedida as un on(un.IdUnidadMedida=pr.um_id) WHERE gp.cCodConsecutivo='G001' and gp.nConsecutivo='3' and pr.serie=0

SELECT *,tt.descripcion as traslado , FORMAT(g.fechaEmision, 'yyyy-MM-dd') AS fechaEmision, FORMAT(g.fechaInicioTraslado, 'yyyy-MM-dd') AS fechaInicioTraslado from ERP_GuiaRemision as g inner join ERP_TipoTraslado as tt on (tt.id=g.idtraslado) WHERE g.cCodConsecutivo='{$cCodConsecutivo}' AND g.nConsecutivo={$nConsecutivo}

select * from ERP_TipoTraslado


select sum(od.nTotal) as MontoSerOrden,os.cCodConsecutivo,os.nConsecutivo from ERP_OrdenServicio as os inner join ERP_OrdenServicioDetalle as od on (od.cCodConsecutivo=os.cCodConsecutivo and od.nConsecutivo=os.nConsecutivo) where os.iEstado=3  AND MONTH(os.dFecRec) = 2 AND YEAR(OS.dFecRec) = 2022 GROUP BY os.cCodConsecutivo,os.nConsecutivo,od.nCant 



select oser.id_tipoveh,prog.IdMoneda,tOr.MontoSerOrden+tSpr.MontoSerPro as totalservicio ,oser.id_tipomant,tdra.REPUESTO,TDRA.ACEITE,prog.cCodConsecutivo,prog.nConsecutivo,tOr.MontoSerOrden,tSpr.MontoSerPro from ERP_Proforma as prog left join (select sum(od.nTotal) as MontoSerOrden,os.cCodConsecutivo,os.nConsecutivo from ERP_OrdenServicio as os inner join ERP_OrdenServicioDetalle as od on (od.cCodConsecutivo=os.cCodConsecutivo and od.nConsecutivo=os.nConsecutivo) where os.iEstado=3  GROUP BY os.cCodConsecutivo,os.nConsecutivo,od.nCant) as tOr on (prog.cCodConsecutivoOS=tOr.cCodConsecutivo and prog.nConsecutivoOS=tOr.nConsecutivo) left join (select sum( prMo.nTotal) as MontoSerPro,pro.cCodConsecutivo,pro.nConsecutivo from ERP_Proforma as pro inner join ERP_ProformaMO as prMo on (pro.cCodConsecutivo=prMo.cCodConsecutivo and pro.nConsecutivo=prMo.nConsecutivo) where pro.iEstado=5 GROUP BY prMo.nCant, pro.cCodConsecutivo,pro.nConsecutivo) as tSpr on (tspr.cCodConsecutivo=prog.cCodConsecutivo and tspr.nConsecutivo=prog.nConsecutivo) left join (select prf.cCodConsecutivo, prf.nConsecutivo,sum(CASE  
             WHEN p.idCategoria =3 THEN prf.nTotal 
              ELSE 0 
           END) as REPUESTO, sum(CASE  
             WHEN p.idCategoria =4 THEN prf.nTotal 
              ELSE 0 
           END) as ACEITE
from ERP_ProformaDetalle as prf inner join ERP_Productos as p on (p.id=prf.idProducto) 
where  p.idCategoria IN (3,4) GROUP BY prf.cCodConsecutivo, prf.nConsecutivo) as tdra on (tdra.cCodConsecutivo=prog.cCodConsecutivo and tdra.nConsecutivo=prog.nConsecutivo) INNER JOIN ERP_OrdenServicio AS oser on(oser.cCodConsecutivo=prog.cCodConsecutivoOS and oser.nConsecutivo=prog.nConsecutivoOS) where prog.iEstado=5 AND MONTH(oser.dFecRec) = 2 AND YEAR(oser.dFecRec) = 2022

select oser.id_tipoveh,prog.IdMoneda,oser.id_tipomant,tdra.REPUESTO,TDRA.ACEITE,prog.cCodConsecutivo,prog.nConsecutivo,tSpr.MontoSerPro from ERP_Proforma as prog  left join (select sum( prMo.nTotal) as MontoSerPro,pro.cCodConsecutivo,pro.nConsecutivo from ERP_Proforma as pro inner join ERP_ProformaMO as prMo on (pro.cCodConsecutivo=prMo.cCodConsecutivo and pro.nConsecutivo=prMo.nConsecutivo) where pro.iEstado=5 GROUP BY prMo.nCant, pro.cCodConsecutivo,pro.nConsecutivo) as tSpr on (tspr.cCodConsecutivo=prog.cCodConsecutivo and tspr.nConsecutivo=prog.nConsecutivo) left join (select prf.cCodConsecutivo, prf.nConsecutivo,sum(CASE  
             WHEN p.idCategoria =3 THEN prf.nTotal 
              ELSE 0 
           END) as REPUESTO, sum(CASE  
             WHEN p.idCategoria =4 THEN prf.nTotal 
              ELSE 0 
           END) as ACEITE
from ERP_ProformaDetalle as prf inner join ERP_Productos as p on (p.id=prf.idProducto) 
where  p.idCategoria IN (3,4) GROUP BY prf.cCodConsecutivo, prf.nConsecutivo) as tdra on (tdra.cCodConsecutivo=prog.cCodConsecutivo and tdra.nConsecutivo=prog.nConsecutivo) INNER JOIN ERP_OrdenServicio AS oser on(oser.cCodConsecutivo=prog.cCodConsecutivoOS and oser.nConsecutivo=prog.nConsecutivoOS) where prog.iEstado=5 

select * from ERP_OrdenServicio

select sum(od.nTotal) as MontoSerOrden,os.id_tipoveh,os.id_tipomant,os.cCodConsecutivo,os.nConsecutivo from ERP_OrdenServicio as os inner join ERP_OrdenServicioDetalle as od on (od.cCodConsecutivo=os.cCodConsecutivo and od.nConsecutivo=os.nConsecutivo) where  os.iEstado=3 AND MONTH(os.dFecRec) = 2 AND YEAR(os.dFecRec) = 2022 GROUP BY os.cCodConsecutivo,os.nConsecutivo,od.nCant,os.id_tipomant,os.id_tipoveh

SELECT datename (month,activitydate) AS nombre, MIN(activitydate) AS activitydate

FROM tabla 

GROUP BY datename (month,activitydate)

)
select * from ERP_TipoObjetivos where estado='A'

select  datename(month,oser.dFecRec) AS mes from ERP_OrdenServicio as oser

where iEstado='3' and  YEAR(oser.dFecRec) = 2022 ORDER BY   month(oser.dFecRec)

select DISTINCT (month(oser.dFecRec)) AS mes from ERP_OrdenServicio as oser where iEstado='3' and  YEAR(oser.dFecRec) = 2022 ORDER BY   month(oser.dFecRec)

DATENAME(datepart, date)

select obd.nCant,obd.nMonto,obd.nPeriodo as Mes,obd.id_Persona as id_Persona from ERP_Tecnico as tec left join ERP_ObjetivosDetalle as obd on (obd.id_Persona=tec.id and obd.id_TipoPers=2) inner join ERP_Objetivos as ob on (ob.id=obd.id_obj) where ob.iEstado='1' and IdMoneda=1  and nAno='2022'

select * from ERP_Objetivos
select * from ERP_ObjetivosDetalle
select  Day(oser.dFecRec) AS dia,month(oser.dFecRec) AS mes,* from ERP_OrdenServicio as oser where iEstado='3' and  YEAR(oser.dFecRec) =2022 ORDER BY   month(oser.dFecRec)
select * from ERP_Tecnico


select  Day(oser.dFecRec) AS dia,month(oser.dFecRec) AS mes,* from ERP_OrdenServicio as oser where iEstado='3' and  YEAR(oser.dFecRec) =$Anio ORDER BY   month(oser.dFecRec)

select * from ERP_Tecnico
select * from ERP_Mantenimientos
select * from ERP_TipoMantenimiento where estado='A' 

select DISTINCT (month(oser.dFecRec)) AS mes from ERP_OrdenServicio as oser where iEstado='3' and  YEAR(oser.dFecRec) =2022 ORDER BY  month(oser.dFecRec)


select  Day(oser.dFecRec) AS dia,month(oser.dFecRec) AS mes,* from ERP_OrdenServicio as oser where iEstado='3' and  YEAR(oser.dFecRec) =2022 ORDER BY   month(oser.dFecRec)


select obd.nCant,obd.nMonto,obd.nPeriodo as Mes,obd.id_Persona as id_Persona from ERP_Tecnico as tec left join ERP_ObjetivosDetalle as obd on (obd.id_Persona=tec.id and obd.id_TipoPers=2) inner join ERP_Objetivos as ob on (ob.id=obd.id_obj) where ob.iEstado='1' and IdMoneda=1  and nAno=2022

select obd.nCant,obd.nMonto,obd.nPeriodo as Mes,obd.id_Persona as id_Persona from ERP_Tecnico as tec left join ERP_ObjetivosDetalle as obd on (obd.id_Persona=tec.id and obd.id_TipoPers=2) inner join ERP_Objetivos as ob on (ob.id=obd.id_obj) where ob.iEstado='1' and IdMoneda=1



select * from ERP_VW_CierreInventarioPeriodo


update ERP_SolicitudConformidad set iEstado = 0 where nConsecutivo = 47

update ERP_Solicitud set estado = 3 where nConsecutivo = 47


select * from ERP_Movimiento


select * from ERP_Proforma
select * from ERP_ProformaDetalle
SELECT * FROM ERP_ProformaMO

SELECT * FROM ERP_OrdenServicio
SELECT * FROM ERP_OrdenServicioDetalle


select des.nPorcDescuento as porDes , des.nMonto as montoDes, ore.IdTipoDocumento as idDocumentoVenta, cdp.description as condicionPago, ase.descripcion as asesor,tcn.descripcion as tecnico , tv.descripcion as tipoVehiculo,mn.Descripcion as moneda ,tm.descripcion as TipoMantenimiento,tsm.descripcion as servicioMante, * from ERP_OrdenServicio as ore inner join ERP_TipoServicioMant as tsm on ore.id_tipo=tsm.id inner join ERP_TipoMantenimiento as tm on ore.id_tipomant=tm.id inner join ERP_Moneda as mn on mn.IdMoneda=ore.IdMoneda inner join ERP_TipoVehiculo as tv on tv.id=ore.id_tipoveh inner join ERP_Clientes as cli on cli.id=ore.idCliente LEFT JOIN ERP_Tecnico as tcn on ore.idTecnico=tcn.id left join ERP_Asesores as ase on ase.id=ore.idAsesor inner join ERP_CondicionPago as cdp on cdp.id=ore.idcCondicionPago  left join ERP_Descuentos as des on des.id=ore.nIdDscto



select * from ERP_Movimiento where idMovimiento='142'
select * from ERP_Movimiento_Articulo where idMovimiento='143'
select * from ERP_Movimiento_Detalle where idMovimiento='143'
select * from ERP_Movimiento where idMovimiento='143'


select  pr.type_id as type_id,pr.serie as serie,pr.lote as lote,pr.kit as kit,pd.nCantidadPendienteDevolver as nCantidadPendienteDevolver, pd.nCantidadPendienteEntregar as nCantidadPendienteEntregar ,mov.cCodConsecutivo as cCodConsecutivo, mov.nConsecutivo as nConsecutivo ,lot.Lote  as cod_lote,Mo.costo as costo2,Mo.idArticulo as idArticulo,Mo.idAlmacen as idAlmacen,Mo.idLocalizacion as idLocalizacion,Mo.idLote as idLote,Mo.cantidad as cantidad, Mo.costo as costo, Mo.costo_total as costo_total,Mo.consecutivo  as consecutivo,Mo.precio  as precio,Mo.precio_total  as precio_total,pr.description as description  from 
ERP_Movimiento_Articulo as Mo inner join ERP_Productos as pr on mo.idArticulo=pr.id LEFT JOIN ERP_Lote as lot on lot.idLote=Mo.idLote inner join ERP_Movimiento as mov on mov.idMovimiento=Mo.idMovimiento LEFT JOIN  ERP_ProformaDetalle as pd on pd.nConsecutivo=Mo.consecutivo where Mo.idMovimiento='142'

select vt.numero_comprobante as tiket, ve.idventa as idventa,ve.serie_comprobante as serie_comprobante,ve.numero_comprobante as numero_comprobante,m.Descripcion as moneda ,so.idmoneda as IdMoneda, so.cCodConsecutivo as cCodConsecutivo,so.nConsecutivo as nConsecutivo,cli.razonsocial_cliente as razonsocial_cliente,ve.idcliente as idCliente,cli.id_tipocli as idTipoCliente,cli.documento as documento from ERP_Venta as ve  inner join ERP_Solicitud as so on (so.cCodConsecutivo=ve.cCodConsecutivo_solicitud and so.nConsecutivo=ve.nConsecutivo_solicitud) INNER JOIN ERP_Clientes as cli on (ve.idcliente=cli.id) inner join ERP_Moneda as m on m.IdMoneda=so.idmoneda inner join erp_venta as vt on(vt.idventa_comprobante=ve.idventa)  where so.estado>=6 and so.t_monto_total=so.facturado ORDER BY numero_comprobante DESC

select * from ERP_Venta
select * from ERP_Solicitud


select pr.kit as kit,lot.Lote  as cod_lote,sa.idLote as idLote, pr.serie,pr.lote, sa.costo as costo2,sa.costo_total,sa.precio_unitario as precio,sa.precio_total,sa.nCantidadPendienteEntregar,sa.idarticulo as idArticulo, pr.description as description, sa.cantidad,sa.id as consecutivo,sa.idAlmacen as idAlmacen,sa.idLocalizacion from erp_venta as v inner join ERP_SolicitudArticulo as sa on (v.cCodConsecutivo_solicitud=sa.cCodConsecutivo and v.nConsecutivo_solicitud=sa.nConsecutivo) inner join ERP_Productos as pr on(pr.id=sa.idArticulo) LEFT JOIN ERP_Lote as lot on lot.idLote=sa.idlote where   pr.type_id ='1' and sa.nCantidadPendienteEntregar>0


select pr.costo as costo2,pr.costo as costo_total,pr.id as idProducto, od.id as idDetalleRepues,* from ERP_ProformaDetalle as od inner join ERP_Productos as pr on pr.id=od.idProducto  where   pr.type_id ='1' and od.nCantidadPendienteEntregar >0 and od.cCodConsecutivo='$conse' and od.nConsecutivo='$nro'


select * from ERP_Proforma


 SELECT os.iEstado as est ,os.idCliente as idCliente,os.cPlacaVeh as cPlacaVeh, os.cMotor as cMotor,os.nKilometraje as nKilometraje, os.cColor as cColor,  cl.id_tipocli as idTipoCliente,cl.documento as documento,cl.razonsocial_cliente as razonsocial_cliente, os.cCodConsecutivo as cCodConsecutivo, os.nConsecutivo as nConsecutivo, os.IdMoneda as IdMoneda,mo.Descripcion as moneda,os.idcCondicionPago as idcCondicionPago,cp.description as condicionPago,os.idAsesor as idAsesor,ase.descripcion as asesor FROM ERP_OrdenServicio as os inner join ERP_Moneda as mo on os.IdMoneda=mo.IdMoneda inner join ERP_CondicionPago as cp on cp.id=os.idcCondicionPago INNER JOIN ERP_Clientes as cl on cl.id=os.idCliente INNER JOIN ERP_TipoCliente as tc on tc.id=cl.id_tipocli left join ERP_Asesores as ase on ase.id=os.idAsesor
 
 
 select * from ERP_Naturaleza_Operacion
 
 select * from ERP_TiposMovimiento 
 
 select * from ERP_TipoOperacion
 
 select * from erp_opera
 select * from ERP_Clientes
 
 
 select * from ERP_CajaDiariaDetalle
 
 select cd.codigoTipo as codigoTipo,sum(cd.monto) as monto ,tm.descripcion_tipo as descripcion_tipo from ERP_CajaDiariaDetalle as cd inner join ERP_TiposMovimiento as tm on cd.codigoTipo=tm.codigo_tipo INNER JOIN ERP_FormasPago as fp on cd.codigoFormaPago=fp.codigo_formapago inner join ERP_CajaDiaria as c on cd.idCajaDiaria=c.idCajaDiaria where c.fechaCaja='$date' and c.idUsuario='1006' and cd.idMoneda='1' and cd.codigoFormaPago='EFE' GROUP BY cd.codigoTipo,tm.descripcion_tipo
 
 
select * from ERP_CajaDiaria as cd inner join ERP_Cajas as c on cd.idCaja=c.idcaja
select * from ERP_CajaDiariaDetalle
 
 select * from ERP_CuentasBancarias
 
 
select cd.codigoTipo as codigoTipo,sum(CASE  
             WHEN cd.naturaleza='E' THEN cd.monto 
              ELSE 0 
           END)-sum(CASE  
             WHEN cd.naturaleza='S' THEN cd.monto 
              ELSE 0 
           END) as monto ,tm.descripcion_tipo as descripcion_tipo from ERP_CajaDiariaDetalle as cd inner join ERP_TiposMovimiento as tm on cd.codigoTipo=tm.codigo_tipo INNER JOIN ERP_FormasPago as fp on cd.codigoFormaPago=fp.codigo_formapago inner join ERP_CajaDiaria as c on cd.idCajaDiaria=c.idCajaDiaria where c.fechaCaja='2022-03-27' and c.idUsuario='1006' and cd.idMoneda='1' and cd.codigoFormaPago='EFE'  GROUP BY cd.codigoTipo,tm.descripcion_tipo
 

 
 select cd.codigoTipo as codigoTipo,sum(cd.monto) as monto ,tm.descripcion_tipo as descripcion_tipo from ERP_CajaDiariaDetalle as cd inner join ERP_TiposMovimiento as tm on cd.codigoTipo=tm.codigo_tipo INNER JOIN ERP_FormasPago as fp on cd.codigoFormaPago=fp.codigo_formapago inner join ERP_CajaDiaria as c on cd.idCajaDiaria=c.idCajaDiaria where c.fechaCaja='2022-03-27' and c.idUsuario='1006' and cd.idMoneda='1' and cd.codigoFormaPago='EFE' and cd.naturaleza='S' GROUP BY cd.codigoTipo,tm.descripcion_tipo
 
 
 
 

 
 
alter  VIEW [dbo].[ERP_view_reporte_creditos_aprobados] AS 
select s.estado,vend.descripcion as vendedor,concat(v.serie_comprobante,'-',RIGHT('00000' + CAST(FLOOR(v.numero_comprobante) AS VARCHAR), 5),'-',RIGHT('00000' + CAST(FLOOR(tike.numero_comprobante) AS VARCHAR), 5) ) as documento_ven,v.idtienda,sc.total_financiado+sc.intereses as financiado,sc.intereses+sc.monto_venta as Credito,total_financiado as total_financiado,sc.valor_cuota as cuota,sc.cuota_inicial as inicial,sc.monto_venta as precio_lista,sc.intereses,sc.nro_cuotas,mon.IdMoneda, mon.Descripcion as moneda,mon.Simbolo, s.cCodConsecutivo, s.nConsecutivo,s.fecha_solicitud,s.idvendedor,s.idcliente,cli.razonsocial_cliente,cli.id_tipocli as idTipoCliente,tcl.descripcion as tipocliente,v.fecha_emision as fecdoc,v.serie_comprobante,v.numero_comprobante from ERP_Solicitud as s 
inner join ERP_SolicitudCredito as sc on (sc.cCodConsecutivo=s.cCodConsecutivo and sc.nConsecutivo=s.nConsecutivo)
INNER JOIN  ERP_Clientes as cli on (cli.id=s.idcliente) 
inner join  ERP_Venta as v on (v.cCodConsecutivo_solicitud=s.cCodConsecutivo and v.nConsecutivo_solicitud=s.nConsecutivo  and v.tipo_comprobante = 0 and v.IdTipoDocumento in ('03','01'))
inner join ERP_Moneda as mon on (mon.IdMoneda=v.idmoneda)
inner join 	ERP_Venta as tike on(tike.idventa_comprobante=v.idventa)
inner join ERP_Vendedores as vend on(vend.idvendedor=s.idvendedor) 
left join ERP_TipoCliente as tcl on (tcl.id=cli.id_tipocli)
where s.estado in (4,6,7,8,9)

select * from ERP_Venta
select * from ERP_Solicitud
select * from ERP_SolicitudCredito




SELECT so.idcliente,usv.descripcion as vendedor,usc.descripcion as cobrador,vent.fecha_emision as fecha_venta,cli.cReferencia,mone.Simbolo as simbolo, mo.descripcion as Modelo,ser.color as Color,ser.cPlacaVeh as Placa, ser.motor as Motor, ser.chasis as Chasis ,s.monto_venta as precio_lista,s.cuota_inicial as inicial,cli.cNumerodocumento AS documento_cliente,cli.cApePat+' '+cli.cApeMat as Apellidos_cliente,cli.cNombres as nombres_cliente,cli.cCelular as celular_cliente,cli.cDireccion as direccion_cliente, f.cNumerodocumento AS documento_fiador,f.cApePat+' '+f.cApeMat as Apellidos_fiador,f.cNombres as nombres_fiador,f.cCelular as celular_fiador,f.cDireccion as direccion_fiador, cy.cNumerodocumento AS documento_conyugue,cy.cApePat+' '+cy.cApeMat as Apellidos_conyugue,cy.cNombres as nombres_conyugue,cy.cCelular as celular_conyugue,cy.cDireccion as direccion_conyugue,fc.cNumerodocumento AS documento_fiadorconyugue,fc.cApePat+' '+fc.cApeMat as Apellidos_fiadorconyugue,fc.cNombres as nombres_fiadorconyugue,fc.cCelular as celular_fiadorconyugue,fc.cDireccion as direccion_fiadorconyugue,s.tipo_vivienda as tipo_vivienda   FROM ERP_Solicitud as so inner join ERP_SolicitudCredito  AS s on  (so.cCodConsecutivo=s.cCodConsecutivo and so.nConsecutivo=s.nConsecutivo)
inner join ERP_SolicitudArticulo as sola on (sola.cCodConsecutivo=s.cCodConsecutivo and sola.nConsecutivo=s.nConsecutivo)
inner join ERP_Productos as pro on sola.idarticulo = pro.id
left join ERP_Modelo as mo on pro.idModelo=mo.idModelo
left join ERP_SolicitudDetalle as sold on (sold.cCodConsecutivo=s.cCodConsecutivo and sold.nConsecutivo=s.nConsecutivo)
inner join ERP_Moneda as mone on mone.IdMoneda=so.idmoneda
left join erp_venta as vent on(vent.cCodConsecutivo_solicitud=s.cCodConsecutivo and vent.nConsecutivo_solicitud=s.nConsecutivo)
left join ERP_Serie as ser on ser.idSerie=sold.idSerie
left join ERP_Vendedores as usv on usv.idvendedor=so.idvendedor
left join ERP_Cobrador as usc on usc.id=so.idCobrador
        LEFT JOIN ERP_Persona AS f ON(f.idPersona=s.idfiador)
        LEFT JOIN ERP_Persona AS cy ON(cy.idPersona=s.idconyugue)
        LEFT JOIN ERP_Persona AS fc ON(fc.idPersona=s.idfiadorconyugue)
        LEFT JOIN ERP_Clientes AS clp ON(clp.id=so.idCliente)
        LEFT JOIN ERP_Persona AS cli ON(cli.idPersona=clp.idPersona)
        where s.cCodConsecutivo='SOL' and s.nConsecutivo='55'
				
				
select * from ERP_Solicitud

select * from ERP_Clientes
select * from ERP_Persona where idPersona='2'


select pr.idCategoria as idCategoria,ven.idtienda as idtienda ,ved.idvendedor as idvendedor,ved.descripcion as usuario,ven.idventa,ven.fecha_emision as Fecha,concat(ven.serie_comprobante,'-', ven.numero_comprobante) as Documento ,ven.serie_comprobante, ven.numero_comprobante,cl.id as idcliente,cl.documento as DocumentoCliente,cl.razonsocial_cliente as razonsocial_cliente, cl.direccion as Direccion,cl.celular,mo.descripcion as Modelo,ser.motor as Motor,ser.nombreSerie as numero_serie,ser.color as Color , ser.idSerie as idSerie,
sc.cuota_inicial as cuota_inicial,sa.precio_unitario as precio_unitario,fp.id as idcondicion_pago,fp.description as condicion_pago,mon.IdMoneda as IdMoneda,mon.descripcion as Moneda,ven.saldo, ven.pagado
from ERP_Venta as ven
INNER JOIN ERP_Solicitud as s on(ven.cCodConsecutivo_solicitud=s.cCodConsecutivo and ven.nConsecutivo_solicitud=s.nConsecutivo)
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


 SET NOCOUNT ON; EXEC CO_Obtiene_TC_CV_Msj '0','2','2022-03-27','V'
 
 EXEC CO_Obtiene_TC_CV_Msj '0','2','2022-03-27','V'
 
 select tiket.numero_comprobante as nro_recibo,cp.id as idCondicionPago,cp.description as condicionPago , v.fecha_emision,vp.codigo_formapago,fp.descripcion_subtipo,vp.monto_pago,v.idventa,concat(v.serie_comprobante,'-',v.numero_comprobante),v.numero_comprobante,v.idcliente,cl.razonsocial_cliente from ERP_VentaFormaPago as vp inner join erp_venta as v on vp.idventa=v.idventa inner join ERP_Clientes as cl on v.idcliente=cl.id inner join ERP_FormasPago as fp on fp.codigo_formapago=vp.codigo_formapago inner join ERP_CondicionPago as cp on cp.id=v.condicion_pago  inner join erp_venta as tiket on (tiket.idventa_comprobante=v.idventa)  where convert(date,v.fecha_emision)='2022-02-15' and v.idcajero='1006' ORDER BY codigo_formapago
 
select tiket.numero_comprobante as nro_recibo,cp.id as idCondicionPago,cp.description as condicionPago , v.fecha_emision,vp.codigo_formapago,fp.descripcion_subtipo,vp.monto_pago,v.idventa,concat(v.serie_comprobante,'-',v.numero_comprobante),v.numero_comprobante,v.idcliente,cl.razonsocial_cliente from ERP_VentaFormaPago as vp inner join erp_venta as v on vp.idventa=v.idventa inner join ERP_Clientes as cl on v.idcliente=cl.id inner join ERP_FormasPago as fp on fp.codigo_formapago=vp.codigo_formapago inner join ERP_CondicionPago as cp on cp.id=v.condicion_pago  inner join erp_venta as tiket on (tiket.idventa_comprobante=v.idventa)  where convert(date,v.fecha_emision)='2022-02-15' and v.idcajero='1006' and v.idmoneda='1' ORDER BY codigo_formapago



select * from ERP_VentaDetalle where idArticulo='1859'
select * from ERP_FormasPago
select * from ERP_TipoDocumento

select * from ERP_Productos where id='1862'

select * from ERP_Venta

select tiket.numero_comprobante as nro_recibo,cp.id as idCondicionPago,cp.description as condicionPago , v.fecha_emision,vp.codigo_formapago,fp.descripcion_subtipo,vp.monto_pago,v.idventa,concat(v.serie_comprobante,'-',v.numero_comprobante) as serie_comprobante,v.numero_comprobante,v.idcliente,cl.razonsocial_cliente from ERP_VentaFormaPago as vp inner join erp_venta as v on vp.idventa=v.idventa inner join ERP_Clientes as cl on v.idcliente=cl.id inner join ERP_FormasPago as fp on fp.codigo_formapago=vp.codigo_formapago inner join ERP_CondicionPago as cp on cp.id=v.condicion_pago  inner join erp_venta as tiket on (tiket.idventa_comprobante=v.idventa)  where convert(date,v.fecha_emision)='$date' and v.idcajero='$usuario'  and ORDER BY codigo_formapago


select SUM(vp.monto_pago) as total,cp.id as idCondicionPago,cp.description as condicionPago,v.idmoneda from ERP_VentaFormaPago as vp inner join erp_venta as v on vp.idventa=v.idventa inner join ERP_Clientes as cl on v.idcliente=cl.id inner join ERP_FormasPago as fp on fp.codigo_formapago=vp.codigo_formapago inner join ERP_CondicionPago as cp on cp.id=v.condicion_pago inner join erp_venta as tiket on (tiket.idventa_comprobante=v.idventa)  where convert(date,v.fecha_emision)='2022-02-15' and v.idcajero='1006' and  v.idTipoDocumento in (03,01) and v.condicion_pago='1' GROUP BY v.idmoneda,v.condicion_pago ,cp.id,cp.description


select sum(vd.monto_total) as total ,v.idmoneda from ERP_VentaDetalle as vd INNER JOIN erp_venta as v on (v.idventa=vd.idventa) where    v.idcajero='1006'  and v.idTipoDocumento in (03,01) and vd.idarticulo='1859' GROUP BY v.idmoneda

select * from ERP_Venta
select * from ERP_VentaDetalle

select SUM(vp.monto_pago) as total,sum(),cp.id as idCondicionPago,cp.description as condicionPago,v.idmoneda from ERP_VentaFormaPago as vp inner join erp_venta as v on vp.idventa=v.idventa inner join ERP_Clientes as cl on v.idcliente=cl.id inner join ERP_FormasPago as fp on fp.codigo_formapago=vp.codigo_formapago inner join ERP_CondicionPago as cp on cp.id=v.condicion_pago inner join erp_venta as tiket on (tiket.idventa_comprobante=v.idventa)  where convert(date,v.fecha_emision)='$date' and v.idcajero='$usuario' and  v.idTipoDocumento in (03,01) and v.condicion_pago='1' GROUP BY v.idmoneda,v.condicion_pago ,cp.id,cp.description

select sum(vd.monto_total) as total ,v.idmoneda from ERP_VentaDetalle as vd INNER JOIN erp_venta as v on (v.idventa=vd.idventa)  where  convert(date,v.fecha_emision)='$date'    v.idcajero='$usuario'  and v.idTipoDocumento in (03,01) and vd.idarticulo='$idarticulo' GROUP BY v.idmoneda


select * from ERP_Parametros where id='7'



select sum(vd.monto_total) as total ,v.idmoneda from ERP_VentaDetalle as vd INNER JOIN erp_venta as v on (v.idventa=vd.idventa)  where  convert(date,v.fecha_emision)='$date' and    v.idcajero='$usuario'  and v.idTipoDocumento in (03,01) and vd.idarticulo='$idarticulo' GROUP BY v.idmoneda




select sum(vd.monto_total) as total ,v.idmoneda from ERP_VentaDetalle as vd INNER JOIN erp_venta as v on (v.idventa=vd.idventa)  where     v.idcajero='1006'  and v.idTipoDocumento in (07)  and v.idmotivo in (06,07)  GROUP BY v.idmoneda

 SELECT os.iEstado as est ,os.idCliente as idCliente,os.cPlacaVeh as cPlacaVeh, os.cMotor as cMotor,os.nKilometraje as nKilometraje, os.cColor as cColor,  cl.id_tipocli as idTipoCliente,cl.documento as documento,cl.razonsocial_cliente as razonsocial_cliente, os.cCodConsecutivo as cCodConsecutivo, os.nConsecutivo as nConsecutivo, os.IdMoneda as IdMoneda,mo.Descripcion as moneda,os.idcCondicionPago as idcCondicionPago,cp.description as condicionPago,os.idAsesor as idAsesor,ase.descripcion as asesor FROM ERP_OrdenServicio as os inner join ERP_Moneda as mo on os.IdMoneda=mo.IdMoneda inner join ERP_CondicionPago as cp on cp.id=os.idcCondicionPago INNER JOIN ERP_Clientes as cl on cl.id=os.idCliente INNER JOIN ERP_TipoCliente as tc on tc.id=cl.id_tipocli left join ERP_Asesores as ase on ase.id=os.idAsesor where os.iEstado='2'
select * from ERP_OrdenServicio


select * from ERP_CajaDiariaDetalle


select * from ERP_FormasPago

select * from ERP_CajaDiariaDetalle

select * from ERP_TipoCompraVenta

select * from erp_venta where cCodConsecutivo_solicitud='SOL' and nConsecutivo_solicitud='82'


select * from ERP_SolicitudCredito

select * from ERP_Solicitud

select * from ERP_TipoDocumento

select * from ERP_Venta

select * from ERP_CondicionPago

CREATE VIEW ERP_view_comprobantes_caja AS
select sum(v.pagado) as monto,CONVERT(DATE,v.fecha_emision) as fecha,v.idcajero,v.idmoneda,td.Descripcion as comprobante,v.IdTipoDocumento from ERP_Venta as v inner join ERP_Venta  as t on (v.idventa=t.idventa_comprobante) inner join ERP_TipoDocumento as td on(td.IdTipoDocumento=v.IdTipoDocumento) GROUP BY v.IdTipoDocumento,td.Descripcion,v.idcajero,CONVERT(DATE,v.fecha_emision),v.idmoneda




create VIEW ERP_view_comprobantes_caja_detalle AS
select cli.documento,cli.razonsocial_cliente,v.serie_comprobante,v.numero_comprobante,v.pagado as monto,CONVERT(DATE,v.fecha_emision) as fecha,v.idcajero,v.idmoneda,td.Descripcion as comprobante,v.IdTipoDocumento from ERP_Venta as v inner join ERP_Venta  as t on (v.idventa=t.idventa_comprobante) inner join ERP_TipoDocumento as td on(td.IdTipoDocumento=v.IdTipoDocumento) inner join ERP_Solicitud as so on (so.cCodConsecutivo=v.cCodConsecutivo_solicitud and so.nConsecutivo=v.nConsecutivo_solicitud) inner join ERP_Clientes as cli on (cli.id=so.idCliente)


select * from ERP_view_comprobantes_caja_detalle
select * from ERP_Venta


select * from ERP_OrdenServicio
select * from ERP_OrdenServicioDetalle

select * from ERP_SolicitudArticulo

select * from ERP_Solicitud

select vt.numero_comprobante as tiket, ve.idventa as idventa,ve.serie_comprobante as serie_comprobante,ve.numero_comprobante as numero_comprobante,m.Descripcion as moneda ,so.idmoneda as IdMoneda, so.cCodConsecutivo as cCodConsecutivo,so.nConsecutivo as nConsecutivo,cli.razonsocial_cliente as razonsocial_cliente,ve.idcliente as idCliente,cli.id_tipocli as idTipoCliente,cli.documento as documento from ERP_Venta as ve  inner join ERP_Solicitud as so on (so.cCodConsecutivo=ve.cCodConsecutivo_solicitud and so.nConsecutivo=ve.nConsecutivo_solicitud) INNER JOIN ERP_Clientes as cli on (ve.idcliente=cli.id) inner join ERP_Moneda as m on m.IdMoneda=so.idmoneda inner join erp_venta as vt on(vt.idventa_comprobante=ve.idventa) inner join ERP_SolicitudArticulo as soa on (soa.cCodConsecutivo=so.cCodConsecutivo and soa.nConsecutivo=so.nConsecutivo) where soa.nCantidadPendienteEntregar>0 and so.estado in (6,8) and so.t_monto_total=so.facturado ORDER BY numero_comprobante DESC

select cli.razonsocial_cliente,sd.id_solicitud_articulo  as identificador,sa.cantidad as cantiTotal ,* from erp_venta as v inner join ERP_SolicitudArticulo as sa on (v.cCodConsecutivo_solicitud=sa.cCodConsecutivo and v.nConsecutivo_solicitud=sa.nConsecutivo) inner join ERP_Productos as pr on(pr.id=sa.idArticulo) inner JOIN ERP_SolicitudDetalle as sd on(sa.id=sd.id_solicitud_articulo) inner join ERP_Serie as s on sd.idSerie=s.idserie inner join ERP_Solicitud as soli on (v.cCodConsecutivo_solicitud=soli.cCodConsecutivo and v.nConsecutivo_solicitud=soli.nConsecutivo) inner join ERP_Clientes as cli on (cli.id = soli.idcliente )

select ,* from ERP_Movimiento as m inner join erp_venta as v on m.cCodConsecutivo=v.serie_comprobante and m.nConsecutivo=v.numero_comprobante inner join ERP_Solicitud as soli on (v.cCodConsecutivo_solicitud=soli.cCodConsecutivo and v.nConsecutivo_solicitud=soli.nConsecutivo) inner join ERP_Clientes as cli on (cli.id = soli.idcliente )

se
select * from ERP_OrdenServicioMantenimiento
select * from ERP_OrdenServicioDetalle
select * from ERP_TipoVehiculo

select 
  STUFF(
    (SELECT ', '  + CAST(pr.description AS varchar(255))
    FROM ERP_OrdenServicio as odo
    inner join ERP_OrdenServicioDetalle as odmo on (odmo.cCodConsecutivo=odo.cCodConsecutivo AND    odmo.nConsecutivo=odo.nConsecutivo and od.cCodConsecutivo=odo.cCodConsecutivo AND    od.nConsecutivo=odo.nConsecutivo  ) inner join ERP_Productos as pr on (pr.id=odmo.idProducto)
    FOR XML PATH('')),
    1, 2, '') As servicios
,

FORMAT(od.dFecRec, 'yyyy-MM-dd') AS dFecRec,od.cCodConsecutivo,od.nConsecutivo,concat(od.cCodConsecutivo,'-',od.nConsecutivo) as codigo_consecutivo,od.nKilometraje,od.total as odMo,profo.pro_totaSer,profo.pro_totalRepu,mo.descripcion as modelo_serie,mar.description as marca_serie,mar.id as idMarca_serie ,modt.descripcion as modelo_vet,mart.id as idMarca_vet,mart.description as marca_vet,od.id_tipoveh,tiv.descripcion,od.cChasis,od.iAnioFab,od.cPlacaVeh,cli.razonsocial_cliente,cli.celular,cli.telefono,cli.correo_electronico,cli.direccion

from  ERP_OrdenServicio as od left JOIN (select sum(pro.nTotalMO) as pro_totaSer,sum(pro.nTotalDetalle) as pro_totalRepu, pro.cCodConsecutivoOS , pro.nConsecutivoOS  from ERP_Proforma as pro GROUP BY pro.cCodConsecutivoOS , pro.nConsecutivoOS) as profo on(od.cCodConsecutivo=profo.cCodConsecutivoOS AND od.nConsecutivo=profo.nConsecutivoOS) left join ERP_Serie as seri on (seri.cPlacaVeh = od.cPlacaVeh) left join ERP_Productos as pr on (pr.id=seri.idArticulo) left join ERP_Modelo as mo on (pr.idModelo=mo.idModelo) left join ERP_Marcas as mar on (mar.id=pr.idMarca) left join ERP_VehTerceros as vet on (vet.placa=od.cPlacaVeh) left join ERP_Modelo as modt on (vet.idModelo=modt.idModelo) left join ERP_Marcas as mart on (vet.idMarca=mart.id) inner join ERP_TipoVehiculo as tiv on (od.id_tipoveh=tiv.id) inner join ERP_Clientes as cli on (cli.id=od.idCliente)



alter VIEW [ERP_view_reporte_ordenes_diarios] AS
select moned.IdMoneda,moned.Descripcion as moneda ,moned.Simbolo, 
  STUFF(
    (SELECT ', '  + CAST(pr.description AS varchar(255))
    FROM ERP_OrdenServicio as odo
    inner join ERP_OrdenServicioDetalle as odmo on (odmo.cCodConsecutivo=odo.cCodConsecutivo AND    odmo.nConsecutivo=odo.nConsecutivo and od.cCodConsecutivo=odo.cCodConsecutivo AND    od.nConsecutivo=odo.nConsecutivo  ) inner join ERP_Productos as pr on (pr.id=odmo.idProducto)
    FOR XML PATH('')),
    1, 2, '') As servicios
,

FORMAT(od.dFecRec, 'yyyy-MM-dd') AS dFecRec,od.cCodConsecutivo,od.nConsecutivo,concat(od.cCodConsecutivo,'-',od.nConsecutivo) as codigo_consecutivo,od.nKilometraje,od.total as odMo,profo.pro_totaSer,profo.pro_totalRepu,mo.descripcion as modelo_serie,mar.description as marca_serie,mar.id as idMarca_serie ,modt.descripcion as modelo_vet,mart.id as idMarca_vet,mart.description as marca_vet,od.id_tipoveh,tiv.descripcion,od.cChasis,od.iAnioFab,od.cPlacaVeh,cli.razonsocial_cliente,cli.celular,cli.telefono,cli.correo_electronico,cli.direccion

from  ERP_OrdenServicio as od left JOIN (select sum(pro.nTotalMO) as pro_totaSer,sum(pro.nTotalDetalle) as pro_totalRepu, pro.cCodConsecutivoOS , pro.nConsecutivoOS  from ERP_Proforma as pro GROUP BY pro.cCodConsecutivoOS , pro.nConsecutivoOS) as profo on(od.cCodConsecutivo=profo.cCodConsecutivoOS AND od.nConsecutivo=profo.nConsecutivoOS) left join ERP_Serie as seri on (seri.cPlacaVeh = od.cPlacaVeh) left join ERP_Productos as pr on (pr.id=seri.idArticulo) left join ERP_Modelo as mo on (pr.idModelo=mo.idModelo) left join ERP_Marcas as mar on (mar.id=pr.idMarca) left join ERP_VehTerceros as vet on (vet.placa=od.cPlacaVeh) left join ERP_Modelo as modt on (vet.idModelo=modt.idModelo) left join ERP_Marcas as mart on (vet.idMarca=mart.id) inner join ERP_TipoVehiculo as tiv on (od.id_tipoveh=tiv.id) inner join ERP_Clientes as cli on (cli.id=od.idCliente) inner join ERP_Moneda as moned on(moned.IdMoneda=od.IdMoneda) where od.iEstado=3


select * from ERP_view_reporte_ordenes_diarios

select * from ERP_Moneda


select * from ERP_TipoVehiculo where estado='A'
select * from ERP_Marcas
select * from ERP_VehTerceros
select * from ERP_Clientes

select * from ERP_view_reporte_ordenes_diarios
sel


(IF EXISTS (SELECT * FROM ERP_Serie WHERE cPlacaVeh =od.cPlacaVeh) 
BEGIN
  SELECT mo.descripcion as modelo FROM ERP_Serie as s inner join ERP_Productos as pr on (pr.id=s.idArticulo) inner join ERP_Modelo as mo on (pr.idModelo=mo.idModelo)  WHERE cPlacaVeh =od.cPlacaVeh
END
ELSE
BEGIN
    SELECT mo.descripcion as modelo FROM ERP_VehTerceros as s  inner join ERP_Modelo as mo on (s.idModelo=mo.idModelo)  WHERE placa=od.cPlacaVeh
END),select * from ERP_Modelo
select * from ERP_Serie
select * from ERP_VehTerceros
select * from ERP_Productos
select * from ERP_Proforma inner join ERP_ProformaDetalle 
select * from ERP_OrdenServicioDetalle

select * from ERP_ProformaDetalle where nConsecutivo='19'
select sum(nTotalMO) as pro_totaSer,sum(nTotalDetalle) as pro_totalRepu from ERP_Proforma 
inner join ERP_OrdenServicioMantenimiento as odm on (odm.cCodConsecutivo=od.cCodConsecutivo AND odm.nConsecutivo=od.nConsecutivo)


select * from ERP_ProformaDetalle
select * from ERP_ProformaMO
select * from ERP_Proforma
select * from ERP_Solicitud
select * from ERP_SolicitudArticulo

select * from ERP_OrdenServicio

select * from ERP_view_solicitud_Asignacion

ALTER TABLE ERP_Venta
ADD anulado varchar(1)


select * from ERP_Proforma


ALTER VIEW [dbo].[ERP_view_venta] AS SELECT v.anulado,v.idventa, v.serie_comprobante, v.numero_comprobante, v.fecha_emision, tc.cDescripcion AS tipo_documento, c.documento AS numero_documento, m.Descripcion AS moneda, v.t_monto_total, v.tipo_comprobante,
CASE WHEN v.saldo IS NULL THEN 0 ELSE v.saldo END AS saldo,
CASE WHEN v.pagado IS NULL THEN 0 ELSE v.pagado END AS pagado, v.cCodConsecutivo_solicitud, v.nConsecutivo_solicitud, s.tipo_solicitud, s.estado, v.IdTipoDocumento, v.anticipo, v.idventa_referencia

FROM ERP_Venta AS v
INNER JOIN ERP_Clientes AS c ON(v.idcliente=c.id)
INNER JOIN ERP_TABLASUNAT AS tc ON(tc.cnombretabla = 'TIPO_DOCUMENTO' AND tc.cCodigo=c.tipodoc)
LEFT JOIN ERP_Solicitud AS s ON(s.cCodConsecutivo=v.cCodConsecutivo_solicitud AND s.nConsecutivo=v.nConsecutivo_solicitud)
INNER JOIN ERP_Moneda AS m ON(m.IdMoneda=v.idmoneda)


select * from erp_soli

INSERT INTO ERP_TipoConsecutivos(cCodTipoCons,cTipoConsecutivo,cObservación,cIdUsuCre,dFecCre,cIdUsuMod,dFecMod)
VALUES ('SOLCOMPRA','SOLICITUDES COMPRA','PARA LAS SOLICITUDES DE COMPRA',1,FORMAT(GetDate(), 'yyyy-MM-dd hh:mm:ss.000'),1,FORMAT(GetDate(), 'yyyy-MM-dd hh:mm:ss.000'))

INSERT INTO ERP_Consecutivos(cCodConsecutivo,cCodTipoCons,cDetalle,nCodTienda,nConsecutivo,cIdUsuCre,dFecCre,cIdUsuMod,dFecMod)
VALUES ('SOLC','SOLCOMPRA','SOLICITUDES DE COMPRA TARAPOTO',1,0,1,FORMAT(GetDate(), 'yyyy-MM-dd hh:mm:ss.000'),1,FORMAT(GetDate(), 'yyyy-MM-dd hh:mm:ss.000'))

select * from ERP_SolicitudCompra_Articulo as Mo inner join ERP_Productos as pr on mo.idArticulo=pr.id where mo.idMovimiento='69'
CREATE VIEW [dbo].[ERP_VW_VentaClientes] AS
select pr.idCategoria as idCategoria,ven.idtienda as idtienda ,ved.idvendedor as idvendedor,ved.descripcion as usuario,ven.idventa,ven.fecha_emision as Fecha,concat(ven.serie_comprobante,'-', ven.numero_comprobante) as Documento ,ven.serie_comprobante, ven.numero_comprobante,cl.correo_electronico,cl.id as idcliente,cl.documento as DocumentoCliente,cl.razonsocial_cliente as razonsocial_cliente, cl.direccion as Direccion,cl.celular,mo.descripcion as Modelo,ser.motor as Motor,ser.nombreSerie as numero_serie,ser.color as Color , ser.idSerie as idSerie,
sc.cuota_inicial as cuota_inicial,sa.precio_unitario as precio_unitario,fp.id as idcondicion_pago,fp.description as condicion_pago,mon.IdMoneda as IdMoneda,mon.descripcion as Moneda,ven.saldo, ven.pagado
from ERP_Venta as ven
INNER JOIN ERP_Solicitud as s on(ven.cCodConsecutivo_solicitud=s.cCodConsecutivo and ven.nConsecutivo_solicitud=s.nConsecutivo)
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
GO



alter  VIEW [dbo].[ERP_VW_VentaClientes] AS
select ven.anulado ,pr.idCategoria as idCategoria,ven.idtienda as idtienda ,ved.idvendedor as idvendedor,ved.descripcion as usuario,ven.idventa,ven.fecha_emision as Fecha,concat(ven.serie_comprobante,'-', ven.numero_comprobante) as Documento ,ven.serie_comprobante, ven.numero_comprobante,cl.correo_electronico,cl.id as idcliente,cl.documento as DocumentoCliente,cl.razonsocial_cliente as razonsocial_cliente, cl.direccion as Direccion,cl.celular,mo.descripcion as Modelo,ser.motor as Motor,ser.nombreSerie as numero_serie,ser.color as Color , ser.idSerie as idSerie,
sc.cuota_inicial as cuota_inicial,sa.precio_unitario as precio_unitario,fp.id as idcondicion_pago,fp.description as condicion_pago,mon.IdMoneda as IdMoneda,mon.descripcion as Moneda,ven.saldo, ven.pagado
from ERP_Venta as ven
INNER JOIN ERP_Solicitud as s on(ven.cCodConsecutivo_solicitud=s.cCodConsecutivo and ven.nConsecutivo_solicitud=s.nConsecutivo)
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


GO

select * from ERP_Venta
SELECT * FROM ERP_Solicitud



select vt.numero_comprobante as tiket, ve.idventa as idventa,ve.serie_comprobante as serie_comprobante,ve.numero_comprobante as numero_comprobante,m.Descripcion as moneda ,so.idmoneda as IdMoneda, so.cCodConsecutivo as cCodConsecutivo,so.nConsecutivo as nConsecutivo,cli.razonsocial_cliente as razonsocial_cliente,ve.idcliente as idCliente,cli.id_tipocli as idTipoCliente,cli.documento as documento from ERP_Venta as ve  inner join ERP_Solicitud as so on (so.cCodConsecutivo=ve.cCodConsecutivo_solicitud and so.nConsecutivo=ve.nConsecutivo_solicitud) INNER JOIN ERP_Clientes as cli on (ve.idcliente=cli.id) inner join ERP_Moneda as m on m.IdMoneda=so.idmoneda inner join erp_venta as vt on(vt.idventa_comprobante=ve.idventa) inner join ERP_SolicitudArticulo as soa on (soa.cCodConsecutivo=so.cCodConsecutivo and soa.nConsecutivo=so.nConsecutivo) where soa.nCantidadPendienteEntregar>0 and so.estado in (6,8) and so.t_monto_total=so.facturado ORDER BY numero_comprobante DESC

select vt.numero_comprobante as tiket, ve.idventa as idventa,ve.serie_comprobante as serie_comprobante,ve.numero_comprobante as numero_comprobante,m.Descripcion as moneda ,so.idmoneda as IdMoneda, so.cCodConsecutivo as cCodConsecutivo,so.nConsecutivo as nConsecutivo,cli.razonsocial_cliente as razonsocial_cliente,ve.idcliente as idCliente,cli.id_tipocli as idTipoCliente,cli.documento as documento from ERP_Venta as ve  inner join ERP_Solicitud as so on (so.cCodConsecutivo=ve.cCodConsecutivo_solicitud and so.nConsecutivo=ve.nConsecutivo_solicitud) INNER JOIN ERP_Clientes as cli on (ve.idcliente=cli.id) inner join ERP_Moneda as m on m.IdMoneda=so.idmoneda inner join erp_venta as vt on(vt.idventa_comprobante=ve.idventa)  where ve.idventa IN (69,70) ORDER BY numero_comprobante DESC

select * from ERP_view_solicitud_Asignacion

select * from ERP_VW_VentaClientes WHERE anulado IS NULL  OR anulado !='S' OR 

