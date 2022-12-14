alter procedure VT_Notas_Credito
@cSerie varchar(10),
@nNro int 
--@Usuario int,
--@Mensaje varchar(250) output

as

declare @CodSol varchar(10)
declare @NroSol int
declare @TipoComp int
declare @PorSaldo varchar(1) 
declare @IdVentaNC int
declare @IdVentaRef int
declare @TotalDoc money
declare @TotalDocNC money
declare @Saldo money
declare @TipoSol varchar(1)
declare @NroCuo int
declare @Cuota money
declare @Mora money 
declare @MontoAplica money 

begin

-- Obtenemos datos del documento de la nota de crédto
select @IdVentaRef = idventa_referencia, @IdVentaNC = idventa, @TotalDocNC = t_monto_total
from ERP_Venta
where serie_comprobante = @cSerie and numero_comprobante = @nNro

-- Obtenemos datos del documento de venta que aplica la nota de crédito
select @CodSol = cCodConsecutivo_solicitud, @NroSol = nConsecutivo_solicitud, @TipoComp = tipo_comprobante, @PorSaldo = comprobante_x_saldo, 
@TotalDoc = t_monto_total, @Saldo = saldo
from ERP_Venta
where idventa = @IdVentaRef

-- Obtenemos datos de la solicitud
select @TipoSol = tipo_solicitud from erp_solicitud
where cCodConsecutivo = @CodSol and nConsecutivo = @NroSol

BEGIN TRY

BEGIN TRANSACTION
	-- Venta con saldo de documento = 0, que no es anticipo o separacion 
	if @Saldo = 0 and @TipoComp = 0  
	begin
		if @TotalDoc = @TotalDocNC -- y es por todo el documento
		begin
			update ERP_Venta -- Con la NC se devuelve el producto y queda pendiente para devolver el dinero
			set devolucion_producto = 1, por_aplicar = 'S'
			where idventa = @IdVentaNC

			update ERP_Solicitud -- Se anula la solicitud
			set estado = 10
			where cCodConsecutivo = @CodSol and nConsecutivo = @NroSol

			delete ERP_SolicitudDetalle -- Se elimina la serie asociada
			where cCodConsecutivo = @CodSol and nConsecutivo = @NroSol
		end
		else -- y es por una parte del documento (rebaja o descuento)
		begin
			update ERP_Venta -- Con la NC no se devuelve el producto y queda pendiente para devolver el dinero
			set devolucion_producto = 0, por_aplicar = 'S'
			where idventa = @IdVentaNC
		end
	end

	-- Venta con saldo de documento <> 0, que no es anticipo o separacion
	if @Saldo <> 0 and @TipoComp = 0 
	begin
		if @TotalDoc = @TotalDocNC -- y es por todo el documento
		begin
			update ERP_Venta -- Al documento de venta que aplica la nota de crédito se disminuye el saldo y se aumenta el pagado
			set saldo = saldo - @TotalDocNC, pagado = pagado + @TotalDocNC
			where idventa = @IdVentaRef

			update ERP_Venta -- Con la NC se devuelve el producto y no queda pendiente para devolver el dinero
			set devolucion_producto = 1, por_aplicar = 'N'
			where idventa = @IdVentaNC

			update ERP_Solicitud -- Se anula la solicitud
			set estado = 10
			where cCodConsecutivo = @CodSol and nConsecutivo = @NroSol

			delete ERP_SolicitudDetalle -- Se elimina la serie asociada
			where cCodConsecutivo = @CodSol and nConsecutivo = @NroSol
		end
		else -- y es por una parte del documento (rebaja o descuento)
		begin
			update ERP_Venta -- Al documento de venta que aplica la nota de crédito se disminuye el saldo y se aumenta el pagado
			set saldo = saldo - @TotalDocNC, pagado = pagado + @TotalDocNC
			where idventa = @IdVentaRef

			update ERP_Venta -- Con la NC no se devuelve el producto y no queda pendiente para devolver el dinero
			set devolucion_producto = 0, por_aplicar = 'N'
			where idventa = @IdVentaNC

			update ERP_Solicitud -- Se disminuye el saldo y se aumenta el pagado
			set saldo = saldo - @TotalDocNC, pagado = pagado + @TotalDocNC
			where cCodConsecutivo = @CodSol and nConsecutivo = @NroSol

			if @TipoSol = 2 -- Se disminuye el saldo de las cuotas
			begin
				set @MontoAplica = @TotalDocNC
				
				-- Revisa cada cuota
				declare cCuota cursor for      
				select nrocuota,isnull(saldo_cuota,0),isnull(saldo_mora,0) 
				from ERP_SolicitudCronograma
				where cCodConsecutivo = @CodSol and nConsecutivo = @NroSol and saldo_cuota > 0;  
 
				open cCuota  
	
				fetch next from cCuota  
				into @NroCuo, @Cuota, @Mora  

				while @MontoAplica > 0
				begin 
					-- Actualiza cada cuota
					if @MontoAplica > @Cuota -- Si la cuota es menor que el saldo @MontoAplica
					begin
						update ERP_SolicitudCronograma
						set saldo_cuota = saldo_cuota - @Cuota, monto_pago = monto_pago + @Cuota, pagado_mora = pagado_mora + @Mora, saldo_mora = saldo_mora - @Mora
						where cCodConsecutivo = @CodSol and nConsecutivo = @NroSol and nrocuota = @NroCuo
					end
					else -- Si la cuota es mayor que el saldo @MontoAplica rebaja la cuota con el monto aplica y primero disminuye la mora
					begin 
						if @MontoAplica > @Mora -- Rebaja primero la mora y luego la cuota
						begin
							update ERP_SolicitudCronograma
							set saldo_cuota = saldo_cuota - @MontoAplica, monto_pago = monto_pago + @MontoAplica, 
								pagado_mora = pagado_mora + @Mora, saldo_mora = saldo_mora - @Mora
							where cCodConsecutivo = @CodSol and nConsecutivo = @NroSol and nrocuota = @NroCuo						
						end
						else -- Rebaja sólo mora
						begin
							update ERP_SolicitudCronograma
							set saldo_cuota = saldo_cuota - @MontoAplica, monto_pago = monto_pago + @MontoAplica, 
								pagado_mora = pagado_mora + @MontoAplica, saldo_mora = saldo_mora - @MontoAplica
							where cCodConsecutivo = @CodSol and nConsecutivo = @NroSol and nrocuota = @NroCuo						
						end
					end
				
					set @MontoAplica = @MontoAplica -  @Cuota

					fetch next from cCuota  
					into @NroCuo, @Cuota, @Mora  
				end 
				close cCuota  
				deallocate cCuota 

			end
		end
	end

	-- Venta que es anticipo o separacion  y es por todo el documento
	if @TipoComp = 1 and @PorSaldo = 'N' and @TotalDoc = @TotalDocNC
	begin
		update ERP_Venta -- Con la NC no devuelve el producto y se queda pendiente para devolver el dinero
		set devolucion_producto = 0, por_aplicar = 'S'
		where idventa = @IdVentaNC

		update ERP_Solicitud -- Se anula la solicitud
		set estado = 10
		where cCodConsecutivo = @CodSol and nConsecutivo = @NroSol

		delete ERP_SolicitudDetalle -- Se elimina la serie asociada
		where cCodConsecutivo = @CodSol and nConsecutivo = @NroSol
	end

COMMIT TRAN   

END TRY
  
BEGIN CATCH
IF @@TRANCOUNT > 0   
BEGIN   
ROLLBACK TRAN   
END   

DECLARE @nLinea INT = Error_line()   
DECLARE @cError VARCHAR(8000) = Error_message()   

SELECT @nLinea , @cError 


END CATCH   

--set @Mensaje = 'OK'

end

/*

DECLARE @cSerie VARCHAR(10) = 'BB10'
DECLARE @nNro INT = 124

EXEC VT_Notas_Credito  @cSerie , @nNro;

*/


/*
DECLARE @cCodConsecutivo VARCHAR(10) = 'SOL'
DECLARE @nConsecutivoBase INT = 1000644

EXEC VTA_CopiarSolicitudVenta  @cCodConsecutivo , @nConsecutivoBase;
*/

