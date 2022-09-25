UPDATE ERP_UnidadMedida SET [Abreviatura] = 'NIU' WHERE [IdUnidadMedida] = '07';
ALTER TABLE [dbo].[ERP_Venta] ADD [statusCode] varchar(10) NULL
GO

ALTER TABLE [dbo].[ERP_Venta] ADD [statusMessage] text NULL;