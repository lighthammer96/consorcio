IF ((SELECT COUNT(*) FROM ::fn_listextendedproperty('MS_Description',
'SCHEMA', N'dbo',
'TABLE', N'ERP_Solicitud',
'COLUMN', N'tipo_solicitud')) > 0)
  EXEC sp_updateextendedproperty
'MS_Description', N'1: CONTADO

2: CREDITO DIRECTO

3: CREDITO FINANCIERO
4: CREDITO',
'SCHEMA', N'dbo',
'TABLE', N'ERP_Solicitud',
'COLUMN', N'tipo_solicitud'
ELSE
  EXEC sp_addextendedproperty
'MS_Description', N'1: CONTADO

2: CREDITO DIRECTO

3: CREDITO FINANCIERO
4: CREDITO',
'SCHEMA', N'dbo',
'TABLE', N'ERP_Solicitud',
'COLUMN', N'tipo_solicitud';


ALTER TABLE [dbo].[ERP_Solicitud] ADD [condicion_pago] int NULL;