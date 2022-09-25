ALTER TABLE [dbo].[ERP_SolicitudCredito] ADD [valor_cuota_final] decimal(18,5) NULL;

ALTER TABLE [dbo].[ERP_Venta] ADD [anticipo] decimal(18,5) NULL;

ALTER TABLE [dbo].[ERP_SolicitudArticulo] ADD [monto_descuento_prorrateado] decimal(18,5) NULL;


ALTER TABLE [dbo].[ERP_VentaFormaPago] ADD [monto_moneda_documento] decimal(18,5) NULL
GO

ALTER TABLE [dbo].[ERP_VentaFormaPago] ADD [monto_aplicado_moneda_documento] decimal(18,5) NULL
GO

ALTER TABLE [dbo].[ERP_VentaFormaPago] ADD [monto_tipo_cambio_soles] decimal(18,5) NULL
GO

ALTER TABLE [dbo].[ERP_VentaFormaPago] ADD [vuelto] decimal(18,5) NULL;


ALTER TABLE [dbo].[ERP_CajaDiariaDetalle] ADD [naturaleza] varchar(1) NULL
GO

EXEC sp_addextendedproperty
'MS_Description', N'E -> ENTRADA
S -> SALIDA
',
'SCHEMA', N'dbo',
'TABLE', N'ERP_CajaDiariaDetalle',
'COLUMN', N'naturaleza';

