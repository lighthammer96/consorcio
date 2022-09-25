ALTER TABLE [dbo].[ERP_SolicitudArticulo] DROP CONSTRAINT [pk_solicitud_articulo]
GO

ALTER TABLE [dbo].[ERP_SolicitudArticulo] ADD CONSTRAINT [pk_solicitud_articulo] PRIMARY KEY CLUSTERED ([id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY];


ALTER TABLE [dbo].[ERP_SolicitudDetalle] DROP CONSTRAINT [pk_solicitud_detalle]
GO

ALTER TABLE [dbo].[ERP_SolicitudDetalle] ADD CONSTRAINT [pk_solicitud_detalle] PRIMARY KEY CLUSTERED ([id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY];



ALTER TABLE [dbo].[ERP_SolicitudDetalle] ADD [id_solicitud_articulo] int NULL
GO

ALTER TABLE [dbo].[ERP_SolicitudDetalle] ADD CONSTRAINT [fk_solicitud_articulo_solicitud_detalle] FOREIGN KEY ([id_solicitud_articulo]) REFERENCES [dbo].[ERP_SolicitudArticulo] ([id])