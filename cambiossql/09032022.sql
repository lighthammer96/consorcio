CREATE TABLE ERP_SolicitudNegociaMora(
		idsolicitudmora int not null,
    cCodConsecutivo varchar(10) not null,
    nConsecutivo int not null,
		nrocuota int,
		fechareg datetime,
		monto decimal(18,5),
		motivo varchar(255),
		
		user_created int,
		user_updated int,
		user_deleted int,
		created_at datetime,
		updated_at datetime,
		deleted_at datetime,   
    constraint pk_solicitud_negocia_mora PRIMARY key(idsolicitudmora),
		constraint fk_solicitud_cronograma_solicitud_negocia_mora FOREIGN KEY(cCodConsecutivo, nConsecutivo, nrocuota) REFERENCES ERP_SolicitudCronograma(cCodConsecutivo, nConsecutivo, nrocuota)
);



ALTER TABLE [dbo].[ERP_Solicitud] ADD [nomora] int NULL
GO

EXEC sp_addextendedproperty
'MS_Description', N'1: No calcula mora',
'SCHEMA', N'dbo',
'TABLE', N'ERP_Solicitud',
'COLUMN', N'nomora';



ALTER TABLE [dbo].[ERP_Venta] ADD [idventa_referencia] int NULL;