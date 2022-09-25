ALTER TABLE [dbo].[ERP_OrdenServicio] ADD [comentario_facturacion] text NULL;

USE [Consorcio]
GO

/****** Object:  StoredProcedure [dbo].[ST_ActualizaOrdenServicio]    Script Date: 09/06/2022 06:08:26 p.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

ALTER procedure [dbo].[ST_ActualizaOrdenServicio]
@cCod varchar(10),
@nCons int, -- Si es nuevo enviar 0
@ntiposer int,
@ntipomant int,
@cMoneda varchar(5),
@dFecRec datetime,
@choraRec varchar(10),
@dFecEntrega datetime,
@choraEnt varchar(10),
@ntipoveh int,
@cPlacaVeh varchar(10),
@cMotor varchar(100),
@cChasis varchar(100),
@nAnioFab int,
@cColor varchar(100),
@nKilometraje decimal(10,3),
@nidCliente int,
@nidTecnico int,
@nidAsesor int,
@nCondicionPago int,
@cObservaciones varchar(255),
@nmo_revision decimal(18,5),
@nmo_mecanica decimal(18,5),
@nterceros decimal(18,5),
@notros_mo decimal(18,5),
@nrespuestos decimal(18,5),
@naccesorios decimal(18,5),
@nlubricantes decimal(18,5),
@notros_rep decimal(18,5),
@nImpuesto decimal (18,5), 
@ntotal decimal(18,5),
@cIdTipoDocumento varchar(5), 
@nDescuento decimal (18,5), -- Monto Descuento
@nPorcDescuento decimal (18,2), -- Porcentaje
@nIdDscto int, -- Código de Descuento
@nOperGratuita decimal (18,5), -- Monto de Operacion Gratuita
@Modo int,
@Usuario int,
@comentario_facturacion varchar(255)
as

declare @nNro int
declare @dFecha datetime = FORMAT(GetDate(), 'yyyy-MM-dd hh:mm:ss.000')
declare @Mensaje varchar(250) = ''
set @dFecRec = FORMAT(@dFecRec, 'yyyy-MM-dd hh:mm:ss.000')
set @dFecEntrega = FORMAT(@dFecEntrega, 'yyyy-MM-dd hh:mm:ss.000')


if @Modo = 0
begin
	if not exists(select cCodConsecutivo  from ERP_Consecutivos where cCodConsecutivo = @cCod)  
	begin        

		 --raiserror ('Debe seleccionar un Consecutivo válido',16,1)        
		 --return @@ERROR        
		 set @Mensaje = 'Debe seleccionar un Consecutivo válido'
	end
	else
	begin

		select @nNro = nConsecutivo from ERP_Consecutivos where cCodConsecutivo = @cCod
		set @nNro = isnull(@nNro,0) + 1

		begin try
			insert into ERP_OrdenServicio (cCodConsecutivo,nConsecutivo,id_tipo,id_tipomant,IdMoneda,dFecRec,horaRec,dFecEntrega,horaEnt,id_tipoveh,cPlacaVeh,cMotor,cChasis,
						iAnioFab,cColor,nKilometraje,idCliente,idTecnico,idAsesor,cObservaciones,iEstado,mo_revision,mo_mecanica,terceros,
						otros_mo,respuestos,accesorios,lubricantes,otros_rep,total,cIdUsuCre,dFecCre,cIdUsuMod,dFecMod,idcCondicionPago,nImpuesto,cFacturado,IdTipoDocumento,
						nDescuento,nPorcDescuento,nIdDscto,nOperGratuita, comentario_facturacion) 
			values(@cCod,@nNro,@ntiposer,@ntipomant,@cMoneda,@dFecRec,@choraRec,@dFecEntrega,@choraEnt,@ntipoveh,@cPlacaVeh,@cMotor,@cChasis,
						@nAnioFab,@cColor,@nKilometraje,@nidCliente,@nidTecnico,@nidAsesor,@cObservaciones,0,@nmo_revision,@nmo_mecanica,@nterceros,
						@notros_mo,@nrespuestos,@naccesorios,@nlubricantes,@notros_rep,@ntotal,@Usuario,@dFecha,@Usuario,@dFecha,@nCondicionPago,@nImpuesto,'N',@cIdTipoDocumento,
						@nDescuento,@nPorcDescuento,@nIdDscto,@nOperGratuita, @comentario_facturacion)

			update ERP_Consecutivos 
			set nConsecutivo = @nNro  
			where cCodConsecutivo = @cCod

			--select @nNro as 'Nro'
			set @Mensaje = @nNro

		end try
		begin catch
			--raiserror ('Error en el registro de información, comuníquese con el área de sistemas',16,1)        
			--return @@ERROR 
			set @Mensaje = 'Error en el registro de información, comuníquese con el área de sistemas'
		end catch
	end
end

if @Modo = 1
begin

	declare @iEstado int

	select @iEstado = iEstado  from ERP_OrdenServicio
	where cCodConsecutivo = @cCod AND nConsecutivo = @nCons

	if @iEstado <> 0  
	begin
		--RAISERROR ('Sólo se pueden modificar Ordenes de Servicio en estado Registrado',16,1)        
		--RETURN @@ERROR       
		set @Mensaje = 'Sólo se pueden modificar Ordenes de Servicio en estado Registrado'
	end                
	else
	begin
		update ERP_OrdenServicio
		set id_tipo = @ntiposer,
			id_tipomant = @ntipomant,
			IdMoneda = @cMoneda,
			dFecRec = @dFecRec,
			horaRec = @choraRec,
			dFecEntrega = @dFecEntrega,
			horaEnt = @choraEnt,
			id_tipoveh = @ntipoveh,
			cPlacaVeh = @cPlacaVeh,
			cMotor = @cMotor,
			cChasis = @cChasis,
			iAnioFab = @nAnioFab,
			cColor = @cColor,
			nKilometraje = @nKilometraje,
			idCliente = @nidCliente,
			idTecnico = @nidTecnico,
			idAsesor = @nidAsesor,
			cObservaciones = @cObservaciones,
			mo_revision = @nmo_revision,
			mo_mecanica = @nmo_mecanica,
			terceros = @nterceros,
			otros_mo = @notros_mo,
			respuestos = @nrespuestos,
			accesorios = @naccesorios,
			lubricantes = @nlubricantes,
			otros_rep = @notros_rep,
			nImpuesto = @nImpuesto,
			total = @ntotal,
			idcCondicionPago = @nCondicionPago,
			IdTipoDocumento = @cIdTipoDocumento,
			nDescuento = @nDescuento,
			nPorcDescuento = @nPorcDescuento,
			nIdDscto = @nIdDscto,
			nOperGratuita = @nOperGratuita,
			cIdUsuMod = @Usuario,
			dFecMod = @dFecha,
			comentario_facturacion = @comentario_facturacion
		where cCodConsecutivo = @cCod and nConsecutivo = @nCons

		--select @nCons as 'Nro'
		set @Mensaje = @nCons
	end
end

select @Mensaje as 'Mensaje'
GO;


/****** Object:  View [dbo].[ERP_view_proforma]    Script Date: 09/06/2022 06:49:59 p.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[ERP_view_proforma] AS select p.cCodConsecutivo, p.nConsecutivo, p.cCodConsecutivoOS, p.nConsecutivoOS, p.dFechaRegistro, p.nTotalMO, p.nTotalDetalle, p.nSubTotal,p.nImpuesto, p.nTotal, p.iEstado,  p.cIdUsuCre, p.cIdUsuMod, c.razonsocial_cliente, p.dFecCre from ERP_Proforma AS p 
inner join ERP_Clientes AS c on(c.id=p.idCliente)
GO


ALTER TABLE [dbo].[ERP_Descuentos] ADD [todos_articulos] varchar(1) NULL
GO

EXEC sp_addextendedproperty
'MS_Description', N'S -> se listaran todos los descuentos para cualquier articulo del detalle de la solicitud, proforma, orden de servicio
N -> solo se listara el descuento si el articulo esta asignado en el detalle del maestro de descuentos, esto para el detalle de la solicitud, proforma, orden de servicio',
'SCHEMA', N'dbo',
'TABLE', N'ERP_Descuentos',
'COLUMN', N'todos_articulos';





/****** Object:  StoredProcedure [dbo].[ST_ActualizaDescuento]    Script Date: 12/06/2022 09:30:45 a.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

ALTER procedure [dbo].[ST_ActualizaDescuento]
@Id int, -- Si es nuevo enviar 0
@descripcion varchar(150),
@idTipo varchar(1), -- P:Porcentaje, M:Monto 
@nPorcDescuento decimal (18,2),
@idMoneda varchar(5),
@nMonto decimal (18,5),
@estado varchar(1), -- A:Activo I:Inactivo
@dFecIni datetime,
@dFecFin datetime,
@nLimiteUso int, -- 0: Infinito, si es mayor a 0 se controla (10)
@nCantUso int, 
@nSaldoUso int, 
@nTodosUsusarios int, -- 0: Elegir Usuarios, 1: Todos los Usuarios (Check)
@cTipoAplica varchar(1), -- T:Total, L:Por Línea
@Modo int, -- 0: Inserta, 1: Actualiza
@Usuario int,
@todos_articulos varchar(1)
as

declare @nNro int
declare @dFecha datetime = FORMAT(GetDate(), 'yyyy-MM-dd hh:mm:ss.000')
declare @Mensaje varchar(250) = ''
set @dFecIni = FORMAT(@dFecIni, 'yyyy-MM-dd hh:mm:ss.000')
set @dFecFin = FORMAT(@dFecFin, 'yyyy-MM-dd hh:mm:ss.000')

if @Modo = 0
begin
	-- Calcula el nro de la transación
	select @nNro = max(id) from ERP_Descuentos
	set @nNro = isnull(@nNro,0) + 1
		
	begin try
		insert into ERP_Descuentos(id,descripcion,idTipo,nPorcDescuento,idMoneda,nMonto,estado,dFecIni,dFecFin,nLimiteUso,nCantUso,nSaldoUso,
					nTodosUsusarios,cTipoAplica,user_created,user_updated,created_at,updated_at, todos_articulos) 
		values(@nNro,@descripcion,@idTipo,@nPorcDescuento,@idMoneda,@nMonto,@estado,@dFecIni,@dFecFin,@nLimiteUso,@nCantUso,@nSaldoUso,
					@nTodosUsusarios,@cTipoAplica,@Usuario,@Usuario,@dFecha,@dFecha, @todos_articulos)

		set @Mensaje = @nNro

	end try
	begin catch
		set @Mensaje = 'Error en el registro de información, comuníquese con el área de sistemas'
	end catch
end

if @Modo = 1
begin

	declare @iEstado varchar(1)

	select @iEstado = estado  from ERP_Descuentos
	where id = @Id

	declare @Val int
	select @Val = count (nIdDscto) from (
											select nIdDscto from ERP_OrdenServicio where iEstado <> 4 and nIdDscto = @Id
											union all
											select d.nIdDscto from ERP_OrdenServicioDetalle D 
											inner join ERP_OrdenServicio O 
											on O.iEstado <> 4 and d.cCodConsecutivo = o.cCodConsecutivo and d.nConsecutivo = o.nConsecutivo
											where d.nIdDscto = @Id
											union all
											select nIdDscto from ERP_Proforma where iEstado <> 6 and nIdDscto = @Id
											union all
											select de.nIdDscto from ERP_ProformaDetalle De
											inner join ERP_Proforma P 
											on P.iEstado <> 4 and de.cCodConsecutivo = p.cCodConsecutivo and de.nConsecutivo = p.nConsecutivo
											where de.nIdDscto = @Id
											union all
											select dem.nIdDscto from ERP_ProformaMO Dem
											inner join ERP_Proforma P 
											on P.iEstado <> 4 and dem.cCodConsecutivo = p.cCodConsecutivo and dem.nConsecutivo = p.nConsecutivo
											where dem.nIdDscto = @Id) Val

	set @val = isnull(@val,0)

	if @iEstado <> 'A'  
	begin    
		set @Mensaje = 'Sólo se pueden modificar Descuentos en estado Activo'  
	end                
	else
	begin
		if @Val <> 0
		begin
			set @Mensaje = 'El Descuento ha sido utilizado y no se puede modificar'  
		end
		else
		begin
			update ERP_Descuentos
			set descripcion = @descripcion,
				idTipo = @idTipo,
				nPorcDescuento = @nPorcDescuento,
				idMoneda = @idMoneda,
				nMonto = @nMonto,
				estado = @estado,
				dFecIni = @dFecIni,
				dFecFin = @dFecFin,
				nLimiteUso = @nLimiteUso,
				--nCantUso = @nCantUso, No deben modificarse
				--nSaldoUso = @nSaldoUso, No deben modificarse
				nTodosUsusarios = @nTodosUsusarios,
				cTipoAplica = @cTipoAplica,
				user_updated = @Usuario,
				updated_at = @dFecha,
				todos_articulos = @todos_articulos
			where id = @Id

			--select @nCons as 'Nro'
			set @Mensaje = @Id
		end
	end
end 

select @Mensaje as 'Mensaje'
GO


