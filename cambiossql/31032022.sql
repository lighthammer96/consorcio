ALTER TABLE [dbo].[ERP_Venta] ADD [comprobante_x_saldo] char(1) DEFAULT 'N' NULL
GO

EXEC sp_addextendedproperty
'MS_Description', N'S -> si,  es el comprobante que se hace de una solicitud a credito por el saldo
N - > no',
'SCHEMA', N'dbo',
'TABLE', N'ERP_Venta',
'COLUMN', N'comprobante_x_saldo';