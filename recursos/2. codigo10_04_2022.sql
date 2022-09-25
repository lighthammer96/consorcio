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
Left join ERP_TipoCompraVenta as tcv on(tcv.idTipoCompraVenta=S.idTipoCompraVenta)
go

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
go
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
go
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
go
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
go
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
go
--CREATE TABLE ERP_Empresa (
--		id int not null,
--    descripcion varchar(255)  null,
--		estado varchar(1)  null,
--		user_created varchar(10) null,
--		created_at datetime null,
--		user_updated varchar(10) null,
--		updated_at datetime null,
--	  PRIMARY KEY (id)
-- );
go
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

go
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
go
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
go
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
go


ALTER TABLE ERP_OrdenCompra
ADD comentario varchar(300), comentarioAprobacion varchar(300)
go

alter VIEW COM_VWPorAprobarOrden
AS
SELECT OC.id idOrdenCompra,OCC.nIdConformidad Conformidad, OCC.cCodConsecutivo Codigo, OCC.nConsecutivo Consecutivo, OCC.nIdUsuario IdUsuario, U.username Usuario,OCC.iEstado EstadoAprob,
OC.dFecRegistro Fecha, OC.dFecRequerida FechaReq,
TC.cDescripcion TipoDoc,P.documento NumeroDoc, P.razonsocial Proveedor, M.Descripcion Moneda, OC.total Total, 
CASE OC.iestado WHEN 1 THEN 'Registrado' WHEN 2 THEN 'Por Aprobar' WHEN 3 THEN 'Aprobado' WHEN 4 THEN 'Recibido' WHEN 5 THEN 'Backorder' WHEN 6 THEN 'Cerrado' WHEN 7 THEN 'Cancelado' WHEN 8 THEN 'Rechazado' ELSE 'No Definido' END  EstadoOC
FROM ERP_OrdenCompraConformidad OCC
INNER JOIN ERP_OrdenCompra OC ON OC.cCodConsecutivo = OCC.cCodConsecutivo AND OC.nConsecutivo = OCC.nConsecutivo and OC.iEstado = 2
INNER JOIN ERP_Usuarios U ON U.id = OCC.nIdUsuario
INNER JOIN ERP_Proveedor P ON P.id = OC.idProveedor
INNER JOIN ERP_Moneda M ON M.IdMoneda = OC.idmoneda
INNER JOIN ERP_TABLASUNAT TC ON TC.cNombretabla = 'TIPO_DOCUMENTO' AND TC.cCodigo = P.tipodoc
WHERE EXISTS(
SELECT 1 FROM (
				SELECT cCodConsecutivo,nConsecutivo, MIN(nOrden ) orden
				FROM ERP_OrdenCompraConformidad 
				WHERE iEstado = 0
				GROUP BY  cCodConsecutivo,nConsecutivo) X
				WHERE X.cCodConsecutivo = OCC.cCodConsecutivo AND X.nConsecutivo = OCC.nConsecutivo  AND X.orden = OCC.nOrden
)
GO


create  VIEW ERP_view_OrdenCompraAnulacion AS
select oc.iEstado as iEstado ,concat(oc.id,'*',oc.iEstado) as ident,oc.total as Total,mo.IdMoneda as IdMoneda,mo.Descripcion as Moneda,prv.razonsocial as razonsocialProveedor,oc.idProveedor as idProveedor,oc.id as idOrden,oc.cCodConsecutivo as cCodConsecutivo,oc.nConsecutivo as nConsecutivo,
FORMAT(oc.dFecRegistro,'dd/MM/yyyy') as dFecRegistro,CASE oc.prioridad WHEN 'A' THEN 'ALTA' WHEN 'B' THEN 'BAJA' WHEN 'M' THEN 'MEDIA'  END  prioridad,
FORMAT(oc.dFecRequerida,'dd/MM/yyyy') as dFecRequerida
from ERP_OrdenCompra as oc  left join ERP_Moneda as mo on (mo.IdMoneda=oc.idMoneda) left join  ERP_Proveedor as prv on (prv.id=oc.idProveedor) left join ERP_CondicionPago as cp on(oc.idcondicion_pago=cp.id) where oc.id in (select idOrden from ERP_OrdenCompraArticulo where cantidadRecibida>0)
go

create VIEW ERP_View_Movimiento_Conformidad_Compra as
SELECT idMovimiento,
idTipoOperacion,
idUsuario,
estado,cCodConsecutivo,
nConsecutivo,created_at,updated_at,user_created,
user_updated FROM ERP_Movimiento WHERE idMovimiento in (select  idMovimiento from ERP_Movimiento_Articulo as mo inner join ERP_Productos as pr on (pr.id=mo.idArticulo) where pr.type_id='2') and  idTipoOperacion='1' and cCodConsecutivo='ORDC'