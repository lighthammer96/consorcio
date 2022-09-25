CREATE TABLE ERP_Venta(
		idventa int not null,
		tipo_comprobante varchar(5),
		serie_comprobante varchar(10),
		numero_comprobante varchar(10),
		cCodConsecutivo_solicitud varchar(5),
		nConsecutivo_solicitud int,
		condicion_pago varchar(10),
		fecha_emision datetime,
		idcliente int,
		clase_comprobante varchar(1),
		iddescuento int,
		t_porcentaje_descuento decimal(18,5),
		t_monto_descuento decimal(18,5),
		t_monto_subtotal decimal(18,5),
		t_monto_exonerado decimal(18,5),
		t_monto_afecto decimal(18,5),
		t_monto_inafecto decimal(18,5),
		t_impuestos decimal(18,5),
		t_monto_total decimal(18,5),
		monto_descuento_detalle decimal(18,5),
		user_created int,
		user_updated int,
		user_deleted int,
		created_at datetime,
		updated_at datetime,
		deleted_at datetime,   
    constraint pk_venta PRIMARY key(idventa),
		constraint fk_clientes_venta FOREIGN KEY(idcliente) REFERENCES ERP_Clientes(id)
);


CREATE TABLE ERP_VentaDetalle(
		idventa int not null,
		consecutivo int,
		idarticulo int,
		unidad varchar(20),
		cantidad money,
		precio_unitario decimal(18,5),
		iddescuento int,
		porcentaje_descuento decimal(18,5),
		precio_total  decimal(18,5),
		monto_descuento  decimal(18,5),
		monto_subtotal  decimal(18,5),
		monto_exonerado  decimal(18,5),
		monto_afecto  decimal(18,5),
		monto_inafecto  decimal(18,5),
		impuestos  decimal(18,5),
		monto_total  decimal(18,5),
		cOperGrat varchar(1),
		nOperGratuita decimal(18,5),
    constraint pk_venta_detalle PRIMARY key(idventa, consecutivo),
		constraint fk_productos_venta_detalle FOREIGN KEY(idarticulo) REFERENCES ERP_Productos(id)
);


CREATE TABLE ERP_VentaFormaPago(
		idventa int not null,
		consecutivo int,
		codigo_formapago varchar(5),
		nrotarjeta varchar(100),
		nrooperacion varchar(100),
		monto_pago decimal(18,5),
    constraint pk_venta_forma_pago PRIMARY key(idventa, consecutivo),
		constraint fk_formas_pago_venta_forma_pago FOREIGN KEY(codigo_formapago) REFERENCES ERP_FormasPago(codigo_formapago)
);



ALTER TABLE [dbo].[ERP_ConsecutivosComprobantes] ADD [IdTipoDocumento] varchar(5) NULL
GO

ALTER TABLE [dbo].[ERP_ConsecutivosComprobantes] ADD CONSTRAINT [fk_tipo_documento_consecutivos_comprobantes] FOREIGN KEY ([IdTipoDocumento]) REFERENCES [dbo].[ERP_TipoDocumento] ([IdTipoDocumento]);


ALTER TABLE [dbo].[ERP_Solicitud] ADD [intereses] decimal(18,5) NULL;


ALTER TABLE [dbo].[ERP_VentaDetalle] ADD [IdMoneda] varchar(5) NULL


EXEC sp_rename '[dbo].[ERP_Venta].[tipo_comprobante]', 'IdTipoDocumento', 'COLUMN'
GO

EXEC sp_rename '[dbo].[ERP_Venta].[clase_comprobante]', 'tipo_comprobante', 'COLUMN'
GO

ALTER TABLE [dbo].[ERP_Venta] ALTER COLUMN [tipo_comprobante] varchar(1) COLLATE Modern_Spanish_CI_AS NOT NULL
GO

IF ((SELECT COUNT(*) FROM ::fn_listextendedproperty('MS_Description',
'SCHEMA', N'dbo',
'TABLE', N'ERP_Venta',
'COLUMN', N'tipo_comprobante')) > 0)
  EXEC sp_updateextendedproperty
'MS_Description', N'1 -> anticipo
0 -> normal',
'SCHEMA', N'dbo',
'TABLE', N'ERP_Venta',
'COLUMN', N'tipo_comprobante'
ELSE
  EXEC sp_addextendedproperty
'MS_Description', N'1 -> anticipo
0 -> normal',
'SCHEMA', N'dbo',
'TABLE', N'ERP_Venta',
'COLUMN', N'tipo_comprobante';


ALTER TABLE [dbo].[ERP_Venta] ADD [saldo] decimal(18,5) NULL
GO

ALTER TABLE [dbo].[ERP_Venta] ADD [pagado] decimal(18,5) NULL;


ALTER TABLE [dbo].[ERP_Solicitud] ADD [saldo] decimal(18,5) NULL
GO

ALTER TABLE [dbo].[ERP_Solicitud] ADD [facturado] decimal(18,5) NULL
GO

ALTER TABLE [dbo].[ERP_Solicitud] ADD [pagado] decimal(18,5) NULL;

ALTER TABLE [dbo].[ERP_Venta] ALTER COLUMN [condicion_pago] int NULL;

ALTER TABLE [dbo].[ERP_Venta] ADD CONSTRAINT [fk_condicion_pago_venta] FOREIGN KEY ([condicion_pago]) REFERENCES [dbo].[ERP_CondicionPago] ([id]);

EXEC sp_rename '[dbo].[ERP_Venta].[iddescuento]', 'descuento_id', 'COLUMN';

ALTER TABLE [dbo].[ERP_VentaDetalle] DROP COLUMN [IdMoneda];

ALTER TABLE [dbo].[ERP_VentaFormaPago] ADD [IdMoneda] varchar(5) NULL;


-- Renombra tabla Compania
exec sp_rename 'Compania', 'ERP_Compania'
go