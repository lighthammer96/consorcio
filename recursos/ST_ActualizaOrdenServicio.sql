DROP procedure [dbo].[ST_ActualizaOrdenServicio]
go

CREATE procedure [dbo].[ST_ActualizaOrdenServicio]
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

	if @iEstado = 0 -- Registrado 
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
	if @iEstado in (1,2) -- Con Proforma, En Ejecución  
	begin
			
		update ERP_OrdenServicio
		set cObservaciones = @cObservaciones,
			cIdUsuMod = @Usuario,
			dFecMod = @dFecha,
			comentario_facturacion = @comentario_facturacion
		where cCodConsecutivo = @cCod and nConsecutivo = @nCons

		--select @nCons as 'Nro'
		set @Mensaje = @nCons
	end
	if @iEstado in (3,4) -- Terminada Cancelada  
	begin
			
		set @Mensaje = 'Las Ordenes de Servicio en estado Cancelada o Terminada no se pueden modificas'
	end
end

select @Mensaje as 'Mensaje'
go
