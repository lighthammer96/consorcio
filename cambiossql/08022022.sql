EXEC sp_rename '[dbo].[ERP_VentaDetalle].[unidad]', 'um_id', 'COLUMN';

ALTER TABLE [dbo].[ERP_SolicitudCredito] ADD [cargo_independiente] varchar(100) NULL
GO

ALTER TABLE [dbo].[ERP_SolicitudCredito] ADD [tiempo_laboral_independiente] varchar(100) NULL
GO

ALTER TABLE [dbo].[ERP_SolicitudCredito] ADD [cargo_independiente_fiador] varchar(100) NULL
GO

ALTER TABLE [dbo].[ERP_SolicitudCredito] ADD [tiempo_laboral_independiente_fiador] varchar(100) NULL;


EXEC sp_rename '[dbo].[ERP_SolicitudArticulo].[subtotal]', 'monto_subtotal', 'COLUMN';