const Handlebars = require('handlebars/runtime');

Handlebars.registerHelper('if_equals', function(parameter1, parameter2, context) {
    if (parameter1 === parameter2) {
        return context.fn(this);
    } else {
        return context.inverse(this);
    }
});

Handlebars.registerHelper('if_more_than_one', function (parameter, context) {
    if (typeof parameter === 'number' && parameter > 1) {
        return context.fn(this);
    }
    return context.inverse(this);
});

module.exports = Handlebars;
