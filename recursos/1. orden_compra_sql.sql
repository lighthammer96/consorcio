CREATE TABLE [dbo].[ERP_OrdenCompraConformidad](
	[nIdConformidad] [int] NOT NULL,
	[cCodConsecutivo] [varchar](10) NOT NULL,
	[nConsecutivo] [int] NOT NULL,
	[nIdAprob] [int] NULL,
	[nOrden] [int] NULL,
	[nIdUsuario] [int] NULL,
	[dFecReg] [datetime] NOT NULL,
	[iEstado] [int] NULL,
	[cObservacion] [varchar](300) NULL,
	[user_created] [int] NOT NULL,
	[created_at] [datetime] NOT NULL,
	[user_updated] [int] NOT NULL,
	[updated_at] [datetime] NOT NULL,
	PRIMARY KEY (nIdConformidad),
	)
go

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
go 
	CREATE TABLE [dbo].[ERP_OrdenCompraArticulo](
	[id] [int] NOT NULL,
	[idArticulo] [int] NOT NULL,
	[idOrden] [int] NOT NULL,
	[codSolicitud] [int] NULL,
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
	[dFecRequerida] [datetime]  NULL,
	[iEstado] [int] NULL,
	[user_created] [varchar](10) NULL,
	[created_at] [datetime] NULL,
	[user_updated] [varchar](10) NULL,
	[updated_at] [datetime] NULL,

	PRIMARY KEY (id,idArticulo,idOrden),
	);
go
alter table ERP_SolicitudCompra
drop COLUMN fecha_proceso, idTipoOperacion, naturaleza,idMoneda,idAlmacen ;
go
alter table ERP_SolicitudCompra_Articulo
drop COLUMN idLote
go
ALTER TABLE ERP_SolicitudCompra_Articulo
ADD observaciones varchar(100);
go
CREATE VIEW ERP_view_solicitudCompraArticulo AS
select CONVERT (DATE,sc.fecha_requerida) as fecha_requerida,pr.impuesto,sc.cCodConsecutivo,sc.nConsecutivo,sc.idMovimiento,sca.consecutivo,sca.idArticulo,pr.description as articulo,ume.Descripcion as unidadMedida,sca.cantidad from ERP_SolicitudCompra as sc inner join ERP_SolicitudCompra_Articulo as sca on (sc.idMovimiento=sca.idMovimiento) inner join ERP_Productos as pr on (sca.idArticulo=pr.id) inner join ERP_UnidadMedida as ume on (pr.um_id=ume.IdUnidadMedida) where sc.estado=1 and sca.estado=1
go
CREATE VIEW ERP_view_OrdenCompra AS
SELECT id, cCodConsecutivo, nConsecutivo,iEstado,concat(id,'*',iEstado) as ident,created_at
FROM ERP_OrdenCompra
go