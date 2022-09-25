USE [Consorcio]
GO

/****** Object:  Table [dbo].[ERP_Solicitud]    Script Date: 28/12/2021 04:38:42 p.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[ERP_Solicitud](
	[cCodConsecutivo] [varchar](10) NOT NULL,
	[nConsecutivo] [int] NOT NULL,
	[fecha_solicitud] [datetime] NULL,
	[tipo_solicitud] [varchar](1) NULL,
	[origen] [varchar](1) NULL,
	[idconvenio] [int] NULL,
	[idvendedor] [int] NULL,
	[idcliente] [int] NULL,
	[idmoneda] [varchar](5) NULL,
	[estado] [varchar](1) NULL,
	[fecha_vencimiento] [datetime] NULL,
	[iddescuento] [int] NULL,
	[porcentaje_descuento] [decimal](18, 5) NULL,
	[monto_descuento] [decimal](18, 5) NULL,
	[subtotal] [decimal](18, 5) NULL,
	[monto_exonerado] [decimal](18, 5) NULL,
	[monto_afecto] [decimal](18, 5) NULL,
	[monto_inafecto] [decimal](18, 5) NULL,
	[impuestos] [decimal](18, 5) NULL,
	[monto_total] [decimal](18, 5) NULL,
	[monto_descuento_detalle] [decimal](18, 5) NULL,
	[subtotal_detalle] [decimal](18, 5) NULL,
	[monto_exonerado_detalle] [decimal](18, 5) NULL,
	[monto_afecto_detalle] [decimal](18, 5) NULL,
	[monto_inafecto_detalle] [decimal](18, 5) NULL,
	[impuestos_detalle] [decimal](18, 5) NULL,
	[monto_total_detalle] [decimal](18, 5) NULL,
	[user_created] [int] NULL,
	[user_updated] [int] NULL,
	[user_deleted] [int] NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[deleted_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[cCodConsecutivo] ASC,
	[nConsecutivo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[ERP_Solicitud]  WITH CHECK ADD FOREIGN KEY([idcliente])
REFERENCES [dbo].[ERP_Clientes] ([id])
GO

ALTER TABLE [dbo].[ERP_Solicitud]  WITH CHECK ADD  CONSTRAINT [fk_moneda_solicitud] FOREIGN KEY([idmoneda])
REFERENCES [dbo].[ERP_Moneda] ([IdMoneda])
GO

ALTER TABLE [dbo].[ERP_Solicitud] CHECK CONSTRAINT [fk_moneda_solicitud]
GO

ALTER TABLE [dbo].[ERP_Solicitud]  WITH CHECK ADD  CONSTRAINT [fk_vendedores_solicitud] FOREIGN KEY([idvendedor])
REFERENCES [dbo].[ERP_Vendedores] ([idvendedor])
GO

ALTER TABLE [dbo].[ERP_Solicitud] CHECK CONSTRAINT [fk_vendedores_solicitud]
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'1 -> Registrado
2 -> Vigente
3 -> Por Aprobar
4 -> Aprobado
5 -> Rechazado
6 -> Facturado
7 -> Despachado

' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'ERP_Solicitud', @level2type=N'COLUMN',@level2name=N'estado'
GO




/****** Object:  Table [dbo].[ERP_SolicitudArticulo]    Script Date: 28/12/2021 04:39:04 p.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[ERP_SolicitudArticulo](
	[id] [int] NOT NULL,
	[cCodConsecutivo] [varchar](10) NOT NULL,
	[nConsecutivo] [int] NOT NULL,
	[idarticulo] [int] NOT NULL,
	[unidad] [varchar](20) NULL,
	[cantidad] [money] NULL,
	[idalmacen] [int] NULL,
	[idlocalizacion] [int] NULL,
	[idlote] [int] NULL,
	[costo] [decimal](18, 5) NULL,
	[costo_total] [decimal](18, 5) NULL,
	[precio_unitario] [decimal](18, 5) NULL,
	[iddescuento] [int] NULL,
	[porcentaje_descuento] [money] NULL,
	[precio_total] [decimal](18, 5) NULL,
	[monto_descuento] [decimal](18, 5) NULL,
	[subtotal] [decimal](18, 5) NULL,
	[monto_exonerado] [decimal](18, 5) NULL,
	[monto_afecto] [decimal](18, 5) NULL,
	[monto_inafecto] [decimal](18, 5) NULL,
	[impuestos] [decimal](18, 5) NULL,
	[monto_total] [decimal](18, 5) NULL,
 CONSTRAINT [pk_solicitud_articulo] PRIMARY KEY CLUSTERED 
(
	[id] ASC,
	[cCodConsecutivo] ASC,
	[nConsecutivo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[ERP_SolicitudArticulo]  WITH CHECK ADD  CONSTRAINT [fk_productos_solicitud_articulo] FOREIGN KEY([idarticulo])
REFERENCES [dbo].[ERP_Productos] ([id])
GO

ALTER TABLE [dbo].[ERP_SolicitudArticulo] CHECK CONSTRAINT [fk_productos_solicitud_articulo]
GO



/****** Object:  Table [dbo].[ERP_SolicitudDetalle]    Script Date: 28/12/2021 04:39:17 p.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[ERP_SolicitudDetalle](
	[id] [int] NOT NULL,
	[cCodConsecutivo] [varchar](10) NOT NULL,
	[nConsecutivo] [int] NOT NULL,
	[idarticulo] [int] NOT NULL,
	[idSerie] [int] NOT NULL,
 CONSTRAINT [pk_solicitud_detalle] PRIMARY KEY CLUSTERED 
(
	[id] ASC,
	[cCodConsecutivo] ASC,
	[nConsecutivo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[ERP_SolicitudDetalle]  WITH CHECK ADD  CONSTRAINT [fk_productos_solicitud_detalle] FOREIGN KEY([idarticulo])
REFERENCES [dbo].[ERP_Productos] ([id])
GO

ALTER TABLE [dbo].[ERP_SolicitudDetalle] CHECK CONSTRAINT [fk_productos_solicitud_detalle]
GO

ALTER TABLE [dbo].[ERP_SolicitudDetalle]  WITH CHECK ADD  CONSTRAINT [fk_serie_solicitud_detalle] FOREIGN KEY([idSerie])
REFERENCES [dbo].[ERP_Serie] ([idSerie])
GO

ALTER TABLE [dbo].[ERP_SolicitudDetalle] CHECK CONSTRAINT [fk_serie_solicitud_detalle]
GO




IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N'ERP_Solicitud', 
'COLUMN', N'tipo_solicitud')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'1: CONTADO
2: CREDITO DIRECTO
3: CREDITO FINANCIERO'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N'ERP_Solicitud'
, @level2type = 'COLUMN', @level2name = N'tipo_solicitud'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'1: CONTADO
2: CREDITO DIRECTO
3: CREDITO FINANCIERO'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N'ERP_Solicitud'
, @level2type = 'COLUMN', @level2name = N'tipo_solicitud'
GO

EXEC sp_rename N'[dbo].[ERP_Solicitud].[porcentaje_descuento]', N't_porcentaje_descuento', 'COLUMN'
GO

EXEC sp_rename N'[dbo].[ERP_Solicitud].[monto_descuento]', N't_monto_descuento', 'COLUMN'
GO

EXEC sp_rename N'[dbo].[ERP_Solicitud].[subtotal]', N't_subtotal', 'COLUMN'
GO

EXEC sp_rename N'[dbo].[ERP_Solicitud].[monto_exonerado]', N't_monto_exonerado', 'COLUMN'
GO

EXEC sp_rename N'[dbo].[ERP_Solicitud].[monto_afecto]', N't_monto_afecto', 'COLUMN'
GO

EXEC sp_rename N'[dbo].[ERP_Solicitud].[monto_inafecto]', N't_monto_inafecto', 'COLUMN'
GO

EXEC sp_rename N'[dbo].[ERP_Solicitud].[impuestos]', N't_impuestos', 'COLUMN'
GO

EXEC sp_rename N'[dbo].[ERP_Solicitud].[monto_total]', N't_monto_total', 'COLUMN'
GO
EXEC sp_rename N'[dbo].[ERP_Solicitud].[iddescuento]', N'descuento_id', 'COLUMN'
GO


EXEC sp_rename '[dbo].[ERP_Solicitud].[t_subtotal]', 't_monto_subtotal', 'COLUMN'
GO

alter table ERP_SolicitudArticulo add constraint fk_solicitud_solicitud_articulo foreign key(cCodConsecutivo, nConsecutivo) 
references ERP_Solicitud(cCodConsecutivo, nConsecutivo);

alter table ERP_SolicitudDetalle add constraint fk_solicitud_solicitud_detalle foreign key(cCodConsecutivo, nConsecutivo) 
references ERP_Solicitud(cCodConsecutivo, nConsecutivo);

--- LLAVES FORÁNEAS
/*

alter table ERP_Solicitud add constraint fk_convenios_solicitud foreign key(idconvenio) 
references ERP_Convenios(idconvenio);

alter table ERP_Solicitud add constraint fk_clientes_solicitud foreign key(idcliente) 
references ERP_Clientes(id);

alter table ERP_Solicitud add constraint fk_descuentos_solicitud foreign key(iddescuento) 
references ERP_Descuentos(id);

*/