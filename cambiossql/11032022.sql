ALTER TABLE [dbo].[ERP_Solicitud] ADD [tipo] char(1) DEFAULT 'N' NULL
GO

EXEC sp_addextendedproperty
'MS_Description', N'N -> NORMAL
R -> REFINANCIADO',
'SCHEMA', N'dbo',
'TABLE', N'ERP_Solicitud',
'COLUMN', N'tipo';

IF ((SELECT COUNT(*) FROM ::fn_listextendedproperty('MS_Description',
'SCHEMA', N'dbo',
'TABLE', N'ERP_Solicitud',
'COLUMN', N'estado')) > 0)
  EXEC sp_updateextendedproperty
'MS_Description', N'1 -> Registrado
2 -> Vigente
3 -> Por Aprobar
4 -> Aprobado
5 -> Rechazado
6 -> Facturado
7 -> Despachado


8 -> Despachado Parcial
9 -> Refinanciado',
'SCHEMA', N'dbo',
'TABLE', N'ERP_Solicitud',
'COLUMN', N'estado'
ELSE
  EXEC sp_addextendedproperty
'MS_Description', N'1 -> Registrado
2 -> Vigente
3 -> Por Aprobar
4 -> Aprobado
5 -> Rechazado
6 -> Facturado
7 -> Despachado


8 -> Despachado Parcial
9 -> Refinanciado',
'SCHEMA', N'dbo',
'TABLE', N'ERP_Solicitud',
'COLUMN', N'estado';


ALTER TABLE [dbo].[ERP_Venta] ADD [aplicado_separacion] char(1) NULL
GO

EXEC sp_addextendedproperty
'MS_Description', N'S -> SI
N -> NO',
'SCHEMA', N'dbo',
'TABLE', N'ERP_Venta',
'COLUMN', N'aplicado_separacion'