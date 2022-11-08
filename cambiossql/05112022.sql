
ALTER TABLE dbo.ERP_Periodo ADD estado_cc varchar(1) NULL;

/****** Object:  View [dbo].[ERP_VW_CierreCuentasCobrar]    Script Date: 5/11/2022 10:52:08 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- dbo.ERP_VW_CierreCuentasCobrar source

CREATE VIEW [dbo].[ERP_VW_CierreCuentasCobrar] AS
SELECT periodo, estado_cc AS estado, user_created, created_at, user_updated, updated_at, fechaInicio, fechaFin
FROM dbo.ERP_Periodo
;

GO



CREATE TABLE ERP_Solicitud_cierre (
	cCodConsecutivo varchar(10) COLLATE Modern_Spanish_CI_AS NOT NULL,
	nConsecutivo int NOT NULL,
	fecha_solicitud datetime NULL,
	tipo_solicitud varchar(1) COLLATE Modern_Spanish_CI_AS NULL,
	origen varchar(1) COLLATE Modern_Spanish_CI_AS NULL,
	idconvenio int NULL,
	idvendedor int NULL,
	idcliente int NULL,
	idmoneda varchar(5) COLLATE Modern_Spanish_CI_AS NULL,
	estado varchar(2) COLLATE Modern_Spanish_CI_AS NULL,
	fecha_vencimiento datetime NULL,
	descuento_id int NULL,
	t_porcentaje_descuento decimal(18,5) NULL,
	t_monto_descuento decimal(18,5) NULL,
	t_monto_subtotal decimal(18,5) NULL,
	t_monto_exonerado decimal(18,5) NULL,
	t_monto_afecto decimal(18,5) NULL,
	t_monto_inafecto decimal(18,5) NULL,
	t_impuestos decimal(18,5) NULL,
	t_monto_total decimal(18,5) NULL,
	monto_descuento_detalle decimal(18,5) NULL,
	subtotal_detalle decimal(18,5) NULL,
	monto_exonerado_detalle decimal(18,5) NULL,
	monto_afecto_detalle decimal(18,5) NULL,
	monto_inafecto_detalle decimal(18,5) NULL,
	impuestos_detalle decimal(18,5) NULL,
	monto_total_detalle decimal(18,5) NULL,
	user_created int NULL,
	user_updated int NULL,
	user_deleted int NULL,
	created_at datetime NULL,
	updated_at datetime NULL,
	deleted_at datetime NULL,
	comentarios varchar(100) COLLATE Modern_Spanish_CI_AS NULL,
	IdTipoDocumento varchar(5) COLLATE Modern_Spanish_CI_AS NULL,
	t_nOperGratuita decimal(18,5) NULL,
	cCodConsecutivoO varchar(10) COLLATE Modern_Spanish_CI_AS NULL,
	nConsecutivoO int NULL,
	intereses decimal(18,5) NULL,
	saldo decimal(18,5) NULL,
	facturado decimal(18,5) NULL,
	pagado decimal(18,5) NULL,
	idCobrador int NULL,
	nomora int NULL,
	tipo char(1) COLLATE Modern_Spanish_CI_AS DEFAULT 'N' NULL,
	condicion_pago int NULL,
	comentario_aprobacion text COLLATE Modern_Spanish_CI_AS NULL,
	int_moratorio decimal(18,5) NULL,
	pagado_mora decimal(18,5) NULL,
	saldo_mora decimal(18,5) NULL,
	comentario_facturacion text COLLATE Modern_Spanish_CI_AS NULL,
	descripcion_adicional_clausula text COLLATE Modern_Spanish_CI_AS NULL,
	fecha_calc_mora datetime NULL,
	periodo varchar(7),
	CONSTRAINT pk_solicitud_cierre PRIMARY KEY (cCodConsecutivo,nConsecutivo),
	CONSTRAINT fk_cliente_solicitud_cierre FOREIGN KEY (idcliente) REFERENCES ERP_Clientes(id),
	CONSTRAINT fk_moneda_solicitud_cierre FOREIGN KEY (idmoneda) REFERENCES ERP_Moneda(IdMoneda),
	CONSTRAINT fk_vendedores_solicitud_cierre FOREIGN KEY (idvendedor) REFERENCES ERP_Vendedores(idvendedor),
	CONSTRAINT fk_periodo_solicitud_cierre FOREIGN KEY (periodo) REFERENCES ERP_Periodo(periodo)
);



CREATE TABLE ERP_SolicitudCredito_cierre (
	cCodConsecutivo varchar(10) COLLATE Modern_Spanish_CI_AS NOT NULL,
	nConsecutivo int NOT NULL,
	idconyugue int NULL,
	idfiador int NULL,
	idfiadorconyugue int NULL,
	monto_venta decimal(18,5) NULL,
	intereses decimal(18,5) NULL,
	cuota_inicial decimal(18,5) NULL,
	fecha_pago_inicial datetime NULL,
	valor_cuota decimal(18,5) NULL,
	nro_cuotas int NULL,
	total_financiado decimal(18,5) NULL,
	dia_pago int NULL,
	fecha_iniciopago datetime NULL,
	tipo_vivienda varchar(50) COLLATE Modern_Spanish_CI_AS NULL,
	propietario varchar(100) COLLATE Modern_Spanish_CI_AS NULL,
	monto_alquiler decimal(18,5) NULL,
	profesion varchar(100) COLLATE Modern_Spanish_CI_AS NULL,
	centro_trabajo varchar(100) COLLATE Modern_Spanish_CI_AS NULL,
	cargo varchar(100) COLLATE Modern_Spanish_CI_AS NULL,
	tiempo_laboral varchar(100) COLLATE Modern_Spanish_CI_AS NULL,
	direccion_trabajo varchar(100) COLLATE Modern_Spanish_CI_AS NULL,
	razon_social_negocio varchar(100) COLLATE Modern_Spanish_CI_AS NULL,
	actividad_negocio varchar(100) COLLATE Modern_Spanish_CI_AS NULL,
	direccion_negocio varchar(100) COLLATE Modern_Spanish_CI_AS NULL,
	ingreso_neto_mensual decimal(18,5) NULL,
	ingreso_neto_conyugue decimal(18,5) NULL,
	otros_ingresos decimal(18,5) NULL,
	total_ingresos decimal(18,5) NULL,
	tipo_vivienda_fiador varchar(50) COLLATE Modern_Spanish_CI_AS NULL,
	propietario_fiador varchar(100) COLLATE Modern_Spanish_CI_AS NULL,
	monto_alquiler_fiador decimal(18,5) NULL,
	profesion_fiador varchar(100) COLLATE Modern_Spanish_CI_AS NULL,
	centro_trabajo_fiador varchar(100) COLLATE Modern_Spanish_CI_AS NULL,
	cargo_fiador varchar(100) COLLATE Modern_Spanish_CI_AS NULL,
	tiempo_laboral_fiador varchar(100) COLLATE Modern_Spanish_CI_AS NULL,
	direccion_trabajo_fiador varchar(100) COLLATE Modern_Spanish_CI_AS NULL,
	razon_social_negocio_fiador varchar(100) COLLATE Modern_Spanish_CI_AS NULL,
	actividad_negocio_fiador varchar(100) COLLATE Modern_Spanish_CI_AS NULL,
	direccion_negocio_fiador varchar(100) COLLATE Modern_Spanish_CI_AS NULL,
	ingreso_neto_mensual_fiador decimal(18,5) NULL,
	ingreso_neto_conyugue_fiador decimal(18,5) NULL,
	otros_ingresos_fiador decimal(18,5) NULL,
	total_ingresos_fiador decimal(18,5) NULL,
	user_created int NULL,
	user_updated int NULL,
	user_deleted int NULL,
	created_at datetime NULL,
	updated_at datetime NULL,
	deleted_at datetime NULL,
	valor_cuota_final decimal(18,5) NULL,
	cargo_independiente varchar(100) COLLATE Modern_Spanish_CI_AS NULL,
	tiempo_laboral_independiente varchar(100) COLLATE Modern_Spanish_CI_AS NULL,
	cargo_independiente_fiador varchar(100) COLLATE Modern_Spanish_CI_AS NULL,
	tiempo_laboral_independiente_fiador varchar(100) COLLATE Modern_Spanish_CI_AS NULL,
	dia_vencimiento_cuota int NULL,
	periodo varchar(7),
	CONSTRAINT pk_SolicitudCredito_cierre PRIMARY KEY (cCodConsecutivo, nConsecutivo),
	CONSTRAINT fk_periodo_solicitud_credito_cierre FOREIGN KEY(periodo) REFERENCES ERP_Periodo(periodo)
);




CREATE TABLE ERP_SolicitudCronograma_cierre (
	cCodConsecutivo varchar(10) COLLATE Modern_Spanish_CI_AS NOT NULL,
	nConsecutivo int NOT NULL,
	nrocuota int NOT NULL,
	fecha_vencimiento datetime NULL,
	valor_cuota decimal(18,5) NULL,
	int_moratorio decimal(18,5) NULL,
	saldo_cuota decimal(18,5) NULL,
	monto_pago decimal(18,5) NULL,
	user_created int NULL,
	user_updated int NULL,
	user_deleted int NULL,
	created_at datetime NULL,
	updated_at datetime NULL,
	deleted_at datetime NULL,
	dias_mora int NULL,
	pagado_mora decimal(18,5) NULL,
	saldo_mora decimal(18,5) NULL,
	periodo varchar(7),
	CONSTRAINT pk_SolicitudCronograma_cierre PRIMARY KEY (cCodConsecutivo,nConsecutivo,nrocuota),
	CONSTRAINT fk_periodo_solicitud_cronograma_cierre FOREIGN KEY(periodo) REFERENCES ERP_Periodo(periodo)
);



CREATE TABLE ERP_SolicitudNegociaMora_cierre (
	idsolicitudmora int NOT NULL,
	cCodConsecutivo varchar(10) COLLATE Modern_Spanish_CI_AS NOT NULL,
	nConsecutivo int NOT NULL,
	nrocuota int NULL,
	fechareg datetime NULL,
	monto decimal(18,5) NULL,
	motivo varchar(255) COLLATE Modern_Spanish_CI_AS NULL,
	user_created int NULL,
	user_updated int NULL,
	user_deleted int NULL,
	created_at datetime NULL,
	updated_at datetime NULL,
	deleted_at datetime NULL,
	periodo varchar(7),
	CONSTRAINT pk_solicitud_negocia_mora_cierre PRIMARY KEY (idsolicitudmora),
	CONSTRAINT fk_periodo_solicitud_negocia_mora_cierre FOREIGN KEY(periodo) REFERENCES ERP_Periodo(periodo),
	CONSTRAINT fk_solicitud_cronograma_solicitud_negocia_mora_cierre FOREIGN KEY (cCodConsecutivo,nConsecutivo,nrocuota) 
	REFERENCES Consorcio_Pruebas.dbo.ERP_SolicitudCronograma(cCodConsecutivo,nConsecutivo,nrocuota)
);
