create procedure VT_Notas_Credito
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

-- hay que actualizar devolucion_producto para que devuelva y por_aplicar 
BEGIN TRY

BEGIN TRANSACTION
	-- Venta con saldo de documento = 0 y que no es anticipo o separacion
	if @Saldo = 0 and @TipoComp = 0
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

	-- Venta con saldo de documento <> 0 y que no es anticipo o separacion
	if @Saldo <> 0 and @TipoComp = 0
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

	-- Venta que es anticipo o separacion
	if @Saldo <> 0 and @TipoComp = 0
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
