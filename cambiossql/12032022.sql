CREATE TABLE ERP_VisitaCliente(
		id int not null,

		fechareg datetime,
		idcobrador int,
		estado int,
		
		user_created int,
		user_updated int,
		user_deleted int,
		created_at datetime,
		updated_at datetime,
		deleted_at datetime,   
    constraint pk_visita_cliente PRIMARY key(id),
		constraint fk_cobrador_visita_cliente FOREIGN KEY(idcobrador) REFERENCES ERP_Cobrador(id)
);



IF ((SELECT COUNT(*) FROM ::fn_listextendedproperty('MS_Description',
'SCHEMA', N'dbo',
'TABLE', N'ERP_VisitaCliente',
'COLUMN', N'estado')) > 0)
  EXEC sp_updateextendedproperty
'MS_Description', N'1 -> REGISTRADO
2 -> PROCESO
3 -> TERMINADO',
'SCHEMA', N'dbo',
'TABLE', N'ERP_VisitaCliente',
'COLUMN', N'estado'
ELSE
  EXEC sp_addextendedproperty
'MS_Description', N'1 -> REGISTRADO
2 -> PROCESO
3 -> TERMINADO',
'SCHEMA', N'dbo',
'TABLE', N'ERP_VisitaCliente',
'COLUMN', N'estado'


CREATE TABLE ERP_VisitaClienteSolicitud(
		id int not null,
		cCodConsecutivo varchar(10) not null,
    nConsecutivo int not null,
		cObservacion text,
		
		user_created int,
		user_updated int,
		user_deleted int,
		created_at datetime,
		updated_at datetime,
		deleted_at datetime,   
    constraint pk_visita_cliente_solicitud PRIMARY key(id, cCodConsecutivo, nConsecutivo),
		constraint fk_solicitud_visita_cliente_solicitud FOREIGN KEY(cCodConsecutivo, nConsecutivo) REFERENCES ERP_Solicitud(cCodConsecutivo, nConsecutivo)
);

ALTER TABLE [dbo].[ERP_VisitaClienteSolicitud] ADD CONSTRAINT [fk_visita_cliente_visita_cliente_solicitud] FOREIGN KEY ([id]) REFERENCES [dbo].[ERP_VisitaCliente] ([id]);



CREATE TABLE ERP_VisitaClienteCuota(
		id int not null,
		cCodConsecutivo varchar(10) not null,
    nConsecutivo int not null,
		cObservacion text,
		
		nrocuota int,
		fecha_pago datetime,
		monto_pago decimal(18, 5),
		
		user_created int,
		user_updated int,
		user_deleted int,
		created_at datetime,
		updated_at datetime,
		deleted_at datetime,   
    constraint pk_visita_cliente_cuota PRIMARY key(id, cCodConsecutivo, nConsecutivo, nrocuota),
		constraint fk_visita_cliente_solicitud_visita_cliente_cuota FOREIGN KEY(id, cCodConsecutivo, nConsecutivo) REFERENCES ERP_VisitaClienteSolicitud(id, cCodConsecutivo, nConsecutivo)
);


SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[ERP_view_visita_cliente] AS SELECT vc.id, vc.fechareg, c.descripcion AS cobrador, 
CASE WHEN vc.estado=1 THEN 'Registrado' WHEN vc.estado=2 THEN 'Proceso' WHEN vc.estado=3 THEN 'Terminado' END AS estado
FROM ERP_VisitaCliente AS vc
INNER JOIN ERP_Cobrador AS c ON(vc.idcobrador=c.id)
GO

