ALTER TABLE Consorcio.dbo.ERP_Venta ADD enviado_cpe int NULL;

EXEC Consorcio.sys.sp_addextendedproperty 'MS_Description', N'1 -> ya sido enviado al portal
0 -> aun no ha sido enviado al portal', 'schema', N'dbo', 'table', N'ERP_Venta', 'column', N'statusMessage';
