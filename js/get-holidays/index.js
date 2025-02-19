const Holidays = require('date-holidays');
const hd = new Holidays('BR'); // Define o país (Brasil neste caso)

const holidays = hd.getHolidays(2024); // Obtém todos os feriados de 2024
console.log(holidays);

function isWeekend(date) {
    const day = date.getDay();
    return day === 0 || day === 6; // Retorna true para sábado e domingo
  }
  
// Exemplo de uso:
const today = new Date(); // Data de hoje
console.log(isWeekend(today)); // true se for fim de semana, false caso contrário
  