
CREATE PROCEDURE COM_EnvioAprobarOrd  -- Se ejecuta cuando se cambia el estado a Por Aprobar de la Orden
--ALTER PROCEDURE COM_EnvioAprobarOrd
@cCodConsecutivo varchar(10),  
@nConsecutivo integer,  
@Usuario integer,  
@sMensaje varchar(250) OUTPUT  

AS  
DECLARE @nCodTienda integer -- Tienda 
DECLARE @nCodMoneda integer -- Moneda 
DECLARE @nCodAprob  integer  
DECLARE @nNivelConformidad  integer  
DECLARE @UsuarioDet integer  
DECLARE @OrdenDet integer  
DECLARE @nTotal decimal(18,5)
DECLARE @Fecha_Proceso datetime = FORMAT(GetDate(), 'yyyy-MM-dd hh:mm:ss.000')

SET @sMensaje = 'OK'  

select @nCodMoneda = idMoneda, @nTotal = total
from ERP_OrdenCompra
WHERE cCodConsecutivo = @cCodConsecutivo AND nConsecutivo = @nConsecutivo ;  

select @nCodTienda = nCodTienda   
from ERP_Consecutivos   
where cCodConsecutivo = @cCodConsecutivo ;   

select @nCodAprob  = nIdAprob   
from ERP_AprobacionCompra   
where nIdMoneda = @nCodMoneda and nIdTienda = @nCodTienda
AND (dFecIni <= GETDATE() and dFecFin >= GETDATE())
AND (montoInicio <= @nTotal and montoFin >= @nTotal)  
  

SET @nCodAprob = ISNULL(@nCodAprob,0)    

IF @nCodAprob > 0  
BEGIN  

	SELECT @nNivelConformidad =  MAX(nIdConformidad ) FROM ERP_OrdenCompraConformidad

	SET @nNivelConformidad =  ISNULL(@nNivelConformidad,0) + 1  
   
	DECLARE cUsuarios CURSOR FAST_FORWARD FOR      

	select nIdUsuario,nOrden
	from ERP_AprobacionCompraDetalle   
	where nIdAprob = @nCodAprob ;  

	OPEN cUsuarios  

	FETCH NEXT FROM cUsuarios  
	INTO @UsuarioDet,@OrdenDet

	WHILE (@@FETCH_STATUS = 0)      
	BEGIN  

		INSERT INTO ERP_OrdenCompraConformidad(nIdConformidad,cCodConsecutivo,nConsecutivo,nIdAprob,nOrden,nIdUsuario,dFecReg,iEstado,cObservacion,user_created,created_at,user_updated,updated_at )  
		VALUES (@nNivelConformidad,@cCodConsecutivo,@nConsecutivo,@nCodAprob,@OrdenDet,@UsuarioDet,@Fecha_Proceso,0,null,@Usuario,@Fecha_Proceso,@Usuario,@Fecha_Proceso)  
		 
		SET @nNivelConformidad =  @nNivelConformidad + 1  
			
	FETCH NEXT FROM cUsuarios  
	INTO @UsuarioDet,@OrdenDet

	END  

	UPDATE ERP_OrdenCompra -- Actualiza a  Por Aprobar
	SET iEstado = 2, user_updated = @Usuario, updated_at = @Fecha_Proceso
	WHERE cCodConsecutivo = @cCodConsecutivo AND nConsecutivo = @nConsecutivo;  
 
CLOSE cUsuarios  
DEALLOCATE cUsuarios  

END  

ELSE  
BEGIN  

	SET @sMensaje = 'No existe un nivel de aprobación configurado para esta Orden de Compra, comuniquese con su Adminstrador'  

END  
GO

CREATE PROCEDURE COM_AprobarRechazarOrd -- Para ejecutar con el botón Aprobar/Rechazar
--ALTER PROCEDURE COM_AprobarRechazarOrd -- Para ejecutar con el botón Aprobar/Rechazar
@nCodConformidad integer,
@Usuario integer,
@iEstado integer, -- 1: Aprobado, 2:Rechazado
@cComentarios varchar(300),
@sMensaje varchar(200) output

as

DECLARE @cCodConsecutivo varchar(10)
DECLARE @nConsecutivo integer
DECLARE @iConteo integer = 0
DECLARE @iConteoOS integer = 0
DECLARE @Fecha_Proceso datetime = FORMAT(GetDate(), 'yyyy-MM-dd hh:mm:ss.000')

SET @sMensaje  = 'OK'

select @iConteo = COUNT(*) from ERP_OrdenCompraConformidad 
where nIdConformidad = @nCodConformidad 
AND nIdUsuario = @Usuario 

SELECT @iConteo = ISNULL(@iConteo,0)


IF @iConteo=0
BEGIN

	SET @sMensaje  = 'El usuario actual no tiene permisos para aprobar la Orden de Compra'

END

ELSE IF @iConteo > 1 
BEGIN

	SET @sMensaje  = 'Existe una inconsistencia en los permisos de aprobación, comuniquese con el administrador'

END

ELSE -- Si todo está correcto
BEGIN
	
	--SET @sMensaje  = ''

	SELECT @cCodConsecutivo = cCodConsecutivo , @nConsecutivo = nConsecutivo  
	FROM ERP_OrdenCompraConformidad 
	WHERE nIdConformidad = @nCodConformidad 
	AND nIdUsuario = @Usuario 

	UPDATE ERP_OrdenCompraConformidad 
	SET iEstado = @iEstado, user_updated = @Usuario, updated_at =  @Fecha_Proceso, cObservacion = @cComentarios
	WHERE nIdConformidad = @nCodConformidad ;

	IF @iEstado = 2 --Orden Rechazada
	BEGIN
		
		UPDATE ERP_OrdenCompra 
		SET iEstado = 8, user_updated = @Usuario, updated_at = @Fecha_Proceso
		WHERE cCodConsecutivo =  @cCodConsecutivo and nConsecutivo = @nConsecutivo 

		SET @sMensaje  = 'Rechazada'

	END	

	ELSE -- Orden Aprobada
	BEGIN

		SELECT @iConteoOS = COUNT(*)
		FROM ERP_OrdenCompraConformidad 
		WHERE cCodConsecutivo = @cCodConsecutivo AND nConsecutivo = @nConsecutivo AND iEstado = 0;	

		SELECT @iConteoOS = ISNULL(@iConteoOS,0)

		SET @sMensaje  = 'Pendiente de Aprobar'

		IF @iConteoOS = 0 -- Si no hay visto bueno pendiente
		BEGIN

			UPDATE ERP_OrdenCompra
			SET iEstado = 3, user_updated = @Usuario, updated_at = @Fecha_Proceso
			WHERE cCodConsecutivo =  @cCodConsecutivo and nConsecutivo = @nConsecutivo 

			SET @sMensaje  = 'Aprobada'

		END
	END
END
GO
