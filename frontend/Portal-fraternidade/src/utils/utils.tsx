
export function TemplateDate(){

    function formatForInputDatetimeLocal(isoString:string) {
        if (!isoString) return "";
        const date = new Date(isoString);
        const pad = (n: number) => String(n).padStart(2, "0");

        return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
    }

    function converNewDate(date:string) {
        console.log(date)
        const convertDate = new Date(date);
        const opt: Intl.DateTimeFormatOptions = { 
            timeZone: "America/Sao_Paulo", 
            weekday: "long", 
            month: "long", 
            day: "2-digit" 
        };

        const parte = new Intl.DateTimeFormat("pt-BR", opt).formatToParts(convertDate);
        const dia = parte.find(p => p.type === "day")!.value;
        const mes = parte.find(p => p.type === "month")!.value;
        const semana = parte.find(p => p.type === "weekday")!.value;

        const resultado = `${dia} de ${mes.charAt(0).toUpperCase() + mes.slice(1)} (${semana.charAt(0).toUpperCase() + semana.slice(1)})`;

        console.log(resultado);
        return resultado;
    }

    function capitalizeFirstLetter(text:string) {
        if (!text) return '';
        return text.charAt(0).toUpperCase() + text.slice(1);
    };
    

    return {
        converNewDate,
        capitalizeFirstLetter,
        formatForInputDatetimeLocal
    }
}