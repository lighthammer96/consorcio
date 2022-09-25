ALTER PROCEDURE COB_CalculaMora  @fecha_proceso DATE
as
DECLARE @porc_mora  MONEY
DECLARE	@dias_gracia int
DECLARE @cCodConsecutivo varchar(10) ,  @nConsecutivo int
DECLARE @int_moratorio  decimal(18,5),@pagado_mora  decimal(18,5),@saldo_mora  decimal(18,5),@dias_mora int,@nrocuota INT
DECLARE @saldo_cuota decimal(18,5)


select @porc_mora = CONVERT(MONEY,value)/100 from ERP_Parametros where id = 15 --%mora
select @dias_gracia = CONVERT(INT,value) from ERP_Parametros where id = 17 --dias gracia mora


DECLARE SOLIC_MORA CURSOR  FOR
select distinct  SC.cCodConsecutivo ,SC.nConsecutivo
from ERP_SolicitudCronograma SC
where saldo_cuota > 0 and 
DATEDIFF(D,fecha_vencimiento,@fecha_proceso) > @dias_gracia
and
exists (
select 1 from ERP_Solicitud S 
where S.cCodConsecutivo = SC.cCodConsecutivo AND S.nConsecutivo = SC.nConsecutivo and
S.estado in (7,8) and S.saldo > 0 and ISNULL(S.nomora,0) = 0 );


OPEN SOLIC_MORA

FETCH NEXT FROM SOLIC_MORA
INTO @cCodConsecutivo,@nConsecutivo

WHILE @@FETCH_STATUS = 0   
BEGIN 

select @pagado_mora = ISNULL(pagado_mora,0),@saldo_cuota = saldo
from ERP_Solicitud  WHERE cCodConsecutivo = @cCodConsecutivo AND nConsecutivo = @nConsecutivo;

SELECT @int_moratorio =  SUM(X.monto_mora) FROM (
select DATEDIFF(D,fecha_vencimiento,@fecha_proceso) - (@dias_gracia + 1) diasvenc, ((SC.saldo_cuota * @porc_mora)/30)*  DATEDIFF(D,fecha_vencimiento,@fecha_proceso) - (@dias_gracia + 1) monto_mora
from ERP_SolicitudCronograma SC
where saldo_cuota > 0 and 
DATEDIFF(D,fecha_vencimiento,@fecha_proceso) > @dias_gracia
and
exists (
select 1 from ERP_Solicitud S 
where S.cCodConsecutivo = SC.cCodConsecutivo AND S.nConsecutivo = SC.nConsecutivo and
S.estado in (7,8) and S.saldo > 0 and ISNULL(S.nomora,0) = 0 )
and SC.cCodConsecutivo = @cCodConsecutivo AND SC.nConsecutivo = @nConsecutivo) X


SELECT @saldo_mora =  ROUND(@int_moratorio,2) - @pagado_mora
select @saldo_cuota = @saldo_cuota + @saldo_mora

UPDATE ERP_Solicitud  
SET int_moratorio =  ROUND(@int_moratorio,2) ,saldo_mora = @saldo_mora,saldo  = @saldo_cuota
WHERE cCodConsecutivo = @cCodConsecutivo AND nConsecutivo = @nConsecutivo;


SET @int_moratorio = 0
SET @pagado_mora = 0
SET @saldo_mora = 0
SET @saldo_cuota = 0

DECLARE CUOTAS_MORA CURSOR FOR
select  ISNULL(SC.pagado_mora,0), SC.nrocuota  ,
DATEDIFF(D,SC.fecha_vencimiento,@fecha_proceso) - (@dias_gracia + 1) diasvenc, 
((SC.saldo_cuota * @porc_mora)/30)*  DATEDIFF(D,fecha_vencimiento,@fecha_proceso) - (@dias_gracia + 1) monto_mora,saldo_cuota

from ERP_SolicitudCronograma SC
where SC.saldo_cuota > 0 and 
DATEDIFF(D,SC.fecha_vencimiento,@fecha_proceso) > @dias_gracia
and
exists (
select 1 from ERP_Solicitud S 
where S.cCodConsecutivo = SC.cCodConsecutivo AND S.nConsecutivo = SC.nConsecutivo and
S.estado in (7,8) and S.saldo > 0 and ISNULL(S.nomora,0) = 0 )
and SC.cCodConsecutivo = @cCodConsecutivo AND SC.nConsecutivo = @nConsecutivo;

	OPEN CUOTAS_MORA

	FETCH NEXT FROM CUOTAS_MORA
	INTO @pagado_mora,@nrocuota,@dias_mora, @int_moratorio,@saldo_cuota

	WHILE @@FETCH_STATUS = 0   
	BEGIN 

	SELECT @saldo_mora =  ROUND(@int_moratorio,2) - @pagado_mora

	SELECT @saldo_cuota = @saldo_cuota + @saldo_mora

	UPDATE ERP_SolicitudCronograma
	SET int_moratorio =  ROUND(@int_moratorio,2) ,saldo_mora = @saldo_mora,dias_mora = @dias_mora,saldo_cuota = @saldo_cuota
	WHERE cCodConsecutivo = @cCodConsecutivo AND nConsecutivo = @nConsecutivo AND nrocuota = @nrocuota



	FETCH NEXT FROM CUOTAS_MORA
	INTO @pagado_mora,@nrocuota,@dias_mora, @int_moratorio,@saldo_cuota
	END

	CLOSE CUOTAS_MORA ;

	DEALLOCATE CUOTAS_MORA ;


FETCH NEXT FROM SOLIC_MORA
INTO @cCodConsecutivo,@nConsecutivo
END

CLOSE SOLIC_MORA;

DEALLOCATE SOLIC_MORA;




