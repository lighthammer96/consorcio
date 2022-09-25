ALTER TABLE Consorcio.dbo.ERP_Venta ADD enviado_pdf int DEFAULT 0 NULL;
EXEC Consorcio.sys.sp_updateextendedproperty 'MS_Description', N'', 'schema', N'dbo', 'table', N'ERP_Venta', 'column', N'statusMessage';
EXEC Consorcio.sys.sp_addextendedproperty 'MS_Description', N'1 -> ya sido enviado al portal
0 -> aun no ha sido enviado al portal', 'schema', N'dbo', 'table', N'ERP_Venta', 'column', N'enviado_cpe';


update erp_venta set enviado_pdf=0;