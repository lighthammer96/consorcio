CREATE TABLE ERP_SolicitudCredito(
    cCodConsecutivo varchar(10) not null,
    nConsecutivo int not null,
		idconyugue int,
		idfiador int,
		idfiadorconyugue int,
		monto_venta decimal(18, 5),
		intereses decimal(18, 5),
		cuota_inicial decimal(18, 5),
		fecha_pago_inicial datetime,
		valor_cuota decimal(18, 5),
		nro_cuotas int,
		total_financiado decimal(18, 5),
		dia_pago int,
		fecha_iniciopago datetime,
		tipo_vivienda varchar(50),
		propietario varchar(100),
		monto_alquiler decimal(18, 5),
		profesion varchar(100),
		centra_trabajo varchar(100),
		cargo varchar(100),
		tiempo_laboral varchar(100),
		direccion_trabajo varchar(100),
		razon_social_negocio varchar(100),
		actividad_negocio varchar(100),
		direccion_negocio varchar(100),
		ingreso_neto_mensual decimal(18, 5),
		ingreso_neto_conyugue decimal(18, 5),
		otros_ingresos decimal(18, 5),
		total_ingresos decimal(18, 5),
		comentarios varchar(100),
		tipo_vivienda_fiador varchar(50),
		propietario_fiador varchar(100),
		monto_alquiler_fiador decimal(18, 5),
		profesion_fiador varchar(100),
		centro_trabajo_fiador varchar(100),
		cargo_fiador varchar(100),
		tiempo_laboral_fiador varchar(100),
		direccion_trabajo_fiador varchar(100),
		razon_social_negocio_fiador varchar(100),
		actividad_negocio_fiador varchar(100),
		direccion_negocio_fiador varchar(100),
		ingreso_neto_mensual_fiador decimal(18, 5),
		ingreso_neto_conyugue_fiador decimal(18, 5),
		otros_ingresos_fiador decimal(18, 5),
		total_ingresos_fiador decimal(18, 5),
		[user_created] [int] NULL,
		[user_updated] [int] NULL,
		[user_deleted] [int] NULL,
		[created_at] [datetime] NULL,
		[updated_at] [datetime] NULL,
		[deleted_at] [datetime] NULL,
		constraint pk_SolicitudCredito primary key(cCodConsecutivo, nConsecutivo)
);

CREATE TABLE ERP_SolicitudCronograma(
		cCodConsecutivo varchar(10) not null,
    nConsecutivo int not null,
		nrocuota int,
		fecha_vencimiento datetime,
		valor_cuota decimal(18, 5),
		int_moratorio decimal(18, 5),
		saldo_cuota decimal(18, 5),
		monto_pago decimal(18, 5),
		[user_created] [int] NULL,
		[user_updated] [int] NULL,
		[user_deleted] [int] NULL,
		[created_at] [datetime] NULL,
		[updated_at] [datetime] NULL,
		[deleted_at] [datetime] NULL,
		constraint pk_SolicitudCronograma primary key(cCodConsecutivo, nConsecutivo, nrocuota)

);


CREATE TABLE ERP_FactorCredito(
		idfactor int not null,
		nrocuotas int,
		porcentaje decimal(18,6),
		[user_created] [int] NULL,
		[user_updated] [int] NULL,
		[user_deleted] [int] NULL,
		[created_at] [datetime] NULL,
		[updated_at] [datetime] NULL,
		[deleted_at] [datetime] NULL,
		constraint pk_FactorCredito primary key(idfactor)
);



-- ----------------------------
-- Records of ERP_FactorCredito
-- ----------------------------
INSERT INTO [dbo].[ERP_FactorCredito] ([idfactor], [nrocuotas], [porcentaje], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'1', N'1', N'1.047200', N'1', N'1', NULL, N'2022-01-03 22:40:28.000', N'2022-01-03 22:40:40.000', NULL)
GO

INSERT INTO [dbo].[ERP_FactorCredito] ([idfactor], [nrocuotas], [porcentaje], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'2', N'2', N'.539672', N'1', N'1', NULL, N'2022-01-03 22:41:23.000', N'2022-01-03 22:42:37.000', NULL)
GO

INSERT INTO [dbo].[ERP_FactorCredito] ([idfactor], [nrocuotas], [porcentaje], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'3', N'3', N'.365284', N'1', N'1', NULL, N'2022-01-03 22:41:37.000', N'2022-01-03 22:42:33.000', NULL)
GO

INSERT INTO [dbo].[ERP_FactorCredito] ([idfactor], [nrocuotas], [porcentaje], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'4', N'4', N'.280180', N'1', N'1', NULL, N'2022-01-03 22:42:51.000', N'2022-01-03 22:42:51.000', NULL)
GO

INSERT INTO [dbo].[ERP_FactorCredito] ([idfactor], [nrocuotas], [porcentaje], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'5', N'5', N'.229190', N'1', N'1', NULL, N'2022-01-03 22:43:18.000', N'2022-01-03 22:43:18.000', NULL)
GO

INSERT INTO [dbo].[ERP_FactorCredito] ([idfactor], [nrocuotas], [porcentaje], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'6', N'6', N'.195257', N'1', N'1', NULL, N'2022-01-03 22:43:30.000', N'2022-01-03 22:43:30.000', NULL)
GO

INSERT INTO [dbo].[ERP_FactorCredito] ([idfactor], [nrocuotas], [porcentaje], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'7', N'7', N'.171070', N'1', N'1', NULL, N'2022-01-03 22:43:47.000', N'2022-01-03 22:43:47.000', NULL)
GO

INSERT INTO [dbo].[ERP_FactorCredito] ([idfactor], [nrocuotas], [porcentaje], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'8', N'8', N'.152975', N'1', N'1', NULL, N'2022-01-03 22:44:18.000', N'2022-01-03 22:44:18.000', NULL)
GO

INSERT INTO [dbo].[ERP_FactorCredito] ([idfactor], [nrocuotas], [porcentaje], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'9', N'9', N'.138941', N'1', N'1', NULL, N'2022-01-03 22:48:16.000', N'2022-01-03 22:48:16.000', NULL)
GO

INSERT INTO [dbo].[ERP_FactorCredito] ([idfactor], [nrocuotas], [porcentaje], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'10', N'10', N'.127750', N'1', N'1', NULL, N'2022-01-03 22:48:34.000', N'2022-01-03 22:48:34.000', NULL)
GO

INSERT INTO [dbo].[ERP_FactorCredito] ([idfactor], [nrocuotas], [porcentaje], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'11', N'11', N'.118625', N'1', N'1', NULL, N'2022-01-03 22:49:18.000', N'2022-01-03 22:49:18.000', NULL)
GO

INSERT INTO [dbo].[ERP_FactorCredito] ([idfactor], [nrocuotas], [porcentaje], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'12', N'12', N'.111051', N'1', N'1', NULL, N'2022-01-03 22:49:31.000', N'2022-01-03 22:49:31.000', NULL)
GO

INSERT INTO [dbo].[ERP_FactorCredito] ([idfactor], [nrocuotas], [porcentaje], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'13', N'13', N'.104669', N'1', N'1', NULL, N'2022-01-03 22:49:47.000', N'2022-01-03 22:49:47.000', NULL)
GO

INSERT INTO [dbo].[ERP_FactorCredito] ([idfactor], [nrocuotas], [porcentaje], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'14', N'14', N'.099224', N'1', N'1', NULL, N'2022-01-03 22:50:01.000', N'2022-01-03 22:50:01.000', NULL)
GO

INSERT INTO [dbo].[ERP_FactorCredito] ([idfactor], [nrocuotas], [porcentaje], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'15', N'15', N'.094528', N'1', N'1', NULL, N'2022-01-03 22:50:14.000', N'2022-01-03 22:50:14.000', NULL)
GO

INSERT INTO [dbo].[ERP_FactorCredito] ([idfactor], [nrocuotas], [porcentaje], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'16', N'16', N'.090440', N'1', N'1', NULL, N'2022-01-03 22:50:41.000', N'2022-01-03 22:50:41.000', NULL)
GO

INSERT INTO [dbo].[ERP_FactorCredito] ([idfactor], [nrocuotas], [porcentaje], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'17', N'17', N'.086854', N'1', N'1', NULL, N'2022-01-03 22:50:57.000', N'2022-01-03 22:50:57.000', NULL)
GO

INSERT INTO [dbo].[ERP_FactorCredito] ([idfactor], [nrocuotas], [porcentaje], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'18', N'18', N'.083685', N'1', N'1', NULL, N'2022-01-03 22:51:11.000', N'2022-01-03 22:51:11.000', NULL)
GO

INSERT INTO [dbo].[ERP_FactorCredito] ([idfactor], [nrocuotas], [porcentaje], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'19', N'19', N'.080868', N'1', N'1', NULL, N'2022-01-03 22:51:23.000', N'2022-01-03 22:51:23.000', NULL)
GO

INSERT INTO [dbo].[ERP_FactorCredito] ([idfactor], [nrocuotas], [porcentaje], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'20', N'20', N'.078349', N'1', N'1', NULL, N'2022-01-03 22:51:44.000', N'2022-01-03 22:51:44.000', NULL)
GO

INSERT INTO [dbo].[ERP_FactorCredito] ([idfactor], [nrocuotas], [porcentaje], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'21', N'21', N'.076085', N'1', N'1', NULL, N'2022-01-03 22:52:07.000', N'2022-01-03 22:52:07.000', NULL)
GO

INSERT INTO [dbo].[ERP_FactorCredito] ([idfactor], [nrocuotas], [porcentaje], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'22', N'22', N'.074043', N'1', N'1', NULL, N'2022-01-03 22:52:43.000', N'2022-01-03 22:52:43.000', NULL)
GO

INSERT INTO [dbo].[ERP_FactorCredito] ([idfactor], [nrocuotas], [porcentaje], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'23', N'23', N'.072193', N'1', N'1', NULL, N'2022-01-03 22:52:56.000', N'2022-01-03 22:52:56.000', NULL)
GO

INSERT INTO [dbo].[ERP_FactorCredito] ([idfactor], [nrocuotas], [porcentaje], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'24', N'24', N'.070510', N'1', N'1', NULL, N'2022-01-03 22:53:09.000', N'2022-01-03 22:53:09.000', NULL)
GO

INSERT INTO [dbo].[ERP_FactorCredito] ([idfactor], [nrocuotas], [porcentaje], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'25', N'25', N'.068974', N'1', N'1', NULL, N'2022-01-03 22:53:21.000', N'2022-01-03 22:53:21.000', NULL)
GO


ALTER TABLE [dbo].[ERP_SolicitudCredito] DROP COLUMN [comentarios];
ALTER TABLE [dbo].[ERP_Solicitud] ADD [comentarios] varchar(100) NULL;
ALTER TABLE [dbo].[ERP_Solicitud] ADD [IdTipoDocumento] varchar(5) NULL;


alter table ERP_Solicitud add t_nOperGratuita decimal (18,5) -- Monto de Operacion Gratuita
alter table ERP_SolicitudArticulo add cOperGrat varchar(1) -- Check operacion gratuita (si esta checkeado no puede ingresar descuento)
go
alter table ERP_SolicitudArticulo add nOperGratuita decimal (18,5) 
go


ALTER TABLE [dbo].[ERP_Solicitud] ADD [cCodConsecutivoO] varchar(10) NULL
GO

ALTER TABLE [dbo].[ERP_Solicitud] ADD [nConsecutivoO] int NULL
go