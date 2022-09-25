ALTER TABLE [dbo].[ERP_Venta] ADD [aplicado_nota] char(1) NULL
GO

EXEC sp_addextendedproperty
'MS_Description', N'S -> SI
N -> NO',
'SCHEMA', N'dbo',
'TABLE', N'ERP_Venta',
'COLUMN', N'aplicado_nota';


ALTER TABLE [dbo].[ERP_Venta] ADD [idventa_separacion] int NULL
GO

ALTER TABLE [dbo].[ERP_Venta] ADD [idventa_nota] varchar(255) NULL
GO

EXEC sp_addextendedproperty
'MS_Description', N'es el id de la venta por separacion que se esta aplicando a esta venta.',
'SCHEMA', N'dbo',
'TABLE', N'ERP_Venta',
'COLUMN', N'idventa_separacion'
GO

EXEC sp_addextendedproperty
'MS_Description', N'es el id de la nota que se esta aplicando a esta venta.',
'SCHEMA', N'dbo',
'TABLE', N'ERP_Venta',
'COLUMN', N'idventa_nota';



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
9 -> Refinanciado
10 ->  Anulado',
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
9 -> Refinanciado
10 ->  Anulado',
'SCHEMA', N'dbo',
'TABLE', N'ERP_Solicitud',
'COLUMN', N'estado'


ALTER TABLE [dbo].[ERP_Solicitud] ALTER COLUMN [estado] varchar(2) COLLATE Modern_Spanish_CI_AS NULL;