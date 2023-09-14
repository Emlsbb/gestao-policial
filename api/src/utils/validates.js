class Validacoes {
    
    static validDate(date) {
        const dateFormated = new Date(date.split('/').reverse().join('-'))
        return dateFormated.toString() !== 'Invalid Date' && dateFormated <= new Date();
    }

    static validCPF(cpf) {
        const regexCPF = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
        return regexCPF.test(cpf);
    }

    static validHour(hour) {
        const hourFormated = hour.split(':');
        return hourFormated.length === 3 &&
            hourFormated[0] <= 24 &&
            hourFormated[0] >= 0 &&
            hourFormated[1] < 60 &&
            hourFormated[1] >= 0 &&
            hourFormated[2] < 60 &&
            hourFormated[2] >= 0;
    }

    static validEmail (email) {
        var re = /\S+@\S+\.|S+/;
        return re.test(email);
    }
}

module.exports = { Validacoes };
