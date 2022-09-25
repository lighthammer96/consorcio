ALTER TABLE [dbo].[ERP_Venta] ADD [documento_cpe] varchar(255) NULL;

ALTER TABLE [dbo].[ERP_Solicitud] ADD [comentario_facturacion] text NULL;
GO

ALTER TABLE [dbo].[ERP_Solicitud] ALTER COLUMN [comentario_aprobacion] text COLLATE Modern_Spanish_CI_AS NULL;