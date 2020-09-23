$(document).ready(function() {

    class EventListener {
        constructor(listeners = [], $el) {
            this.listeners = listeners;
            this.addListeners($el);
        }

        addListeners($el) {
            this.listeners.forEach((listener) => {
                const methodName = this.getOn(listener);
                $el.on(listener, this[methodName].bind(this))
            })
        }

        getOn(eventName) {
            return 'on' + eventName[0].toUpperCase() + eventName.slice(1)
        }
    }

    class Calculator {
        constructor() {
            this.$el = $('[data-application="calculator"]');
            this.components = [];
            this.initComponents();
        }

        initComponents() {
            this.components = new Map();
            this.components.set('router', new Router());
            this.components.set('antenna', new Antenna());
            this.components.set('tariff', new Tariff());
            this.components.set('modem', new Modem());
            this.components.set('pigtail', new Pigtail());
            this.components.set('cable', new Cable());
            this.components.set('install', new Install());
            this.components.set('order', new OrderModal());

            this.components.set('finalPrice', new FinalPrice());
            this.components.set('oreder-btn', new OrderBtn());
            this.components.set('oreder-form', new OrderForm());
        }

        getPrice(elemName) {
            return +this.components.get(elemName).
            $priceDisplay.attr('data-price-display');
        }

        updateFinalPrice() {
            let resultPrice = 0;
            for (let el of this.components.values()) {
                const isFinalPrice = el.$el.attr('data-calculate-component') === "finalPrice";
                if (el.$priceDisplay && !isFinalPrice) {
                    const elementPrice = +el.$priceDisplay.attr('data-price-display');
                    resultPrice += elementPrice;
                }
            }
            this.components.get('finalPrice').updatePrice(resultPrice);
        }

        setDefaultOption() {
            const router = this.components.get('router');
            router.setByDefault(router.options.standart);

            const antenna = this.components.get('antenna');
            antenna.setByDefault(antenna.options.weak);
        }
    }

    class Router {
        constructor() {
            this.$el = $('[data-calculate-component="router"]');
            this.$priceDisplay = this.$el.find('[data-price-display]');
            this.$image = this.$el.find('[data-router-img]');
            this.options = {};
            this.initOptions();
        }

        addElement(elementName, price, imgSrc) {
            this.options[elementName] = {price, imgSrc};
            this.options[elementName].$el = 
                this.$el.find(`[data-router-component="${elementName}"]`);
            this.options[elementName].$el.on('change', () => {
                this.setOption(this.options[elementName]);
            });
        }

        initOptions() {
            this.initWithoutRouter(0, './img/con_router1.jpg');
            this.initStandart(2500, './img/con_router2.png');
            this.initPower(4500, './img/con_router3.png'); 
        }

        initWithoutRouter(price, imgSrc) {
            this.addElement('without', price, imgSrc);
        }

        initStandart(price, imgSrc) {
            this.addElement('standart', price, imgSrc);
        }

        initPower(price, imgSrc) {
            this.addElement('power', price, imgSrc);
        }

        setByDefault(option) {
            option.$el.attr('checked', '');
            this.setOption(option);
        }

        updateImage(path) {
            this.$image.attr('src', path);
        }

        setOption(option) {
            this.$priceDisplay.text(`${option.price} руб.`);
            this.$priceDisplay.attr('data-price-display', option.price);
            this.updateImage(option.imgSrc);
            calculator.updateFinalPrice();
        }
    }

    class Antenna {
        constructor() {
            this.$el = $('[data-calculate-component="antenna"]');
            this.$priceDisplay = this.$el.find('[data-price-display]');
            this.$image = this.$el.find('[data-antenna-img]');
            this.options = {};
            this.initOptions();
        }

        addElement(elementName, price, imgSrc) {
            this.options[elementName] = {price, imgSrc};
            this.options[elementName].$el = 
                this.$el.find(`[data-router-component="${elementName}"]`);

            this.options[elementName].$el.on('change', () => {
                this.setOption(this.options[elementName]);
            });
        }

        initOptions() {
            this.initWeak(3500, './img/con_antenna4.png');
            this.initMedium(6500, './img/con_antenna2.png');
            this.initStrong(15500, './img/con_antenna1.png');
        }

        initWeak(price, imgSrc) {
            this.addElement('weak', price, imgSrc);
        }

        initMedium(price, imgSrc) {
            this.addElement('medium', price, imgSrc);
        }

        initStrong(price, imgSrc) {
            this.addElement('strong', price, imgSrc);
        }

        setByDefault(option) {
            option.$el.attr('checked', '');
            this.setOption(option);
        }

        updateImage(path) {
            this.$image.attr('src', path);
        }

        setOption(option) {
            this.$priceDisplay.text(`${option.price} руб.`);
            this.$priceDisplay.attr('data-price-display', option.price);
            this.updateImage(option.imgSrc);
            calculator.updateFinalPrice();
        }
    }

    class Tariff {
        constructor() {
            this.$el = $('[data-calculate-component="tariff"]');
            this.$priceDisplay = this.$el.find('[data-price-display]');
        }
    }

    class Modem {
        constructor() {
            this.$el = $('[data-calculate-component="modem"]');
            this.$priceDisplay = this.$el.find('[data-price-display]');
        }
    }

    class Pigtail {
        constructor() {
            this.$el = $('[data-calculate-component="pigtail"]');
            this.$priceDisplay = this.$el.find('[data-price-display]');
        }
    }

    class Cable {
        constructor() {
            this.$el = $('[data-calculate-component="cable"]');
            this.$priceDisplay = this.$el.find('[data-price-display]');
        }
    }

    class Install {
        constructor() {
            this.$el = $('[data-calculate-component="install"]');
            this.$priceDisplay = this.$el.find('[data-price-display]');
        }
    }

    class FinalPrice {
        constructor() {
            this.$el = $('[data-calculate-component="finalPrice"]');
            this.$priceDisplay = this.$el;
        }

        updatePrice(value = 100) {
            this.$el.text(value + ' руб.');
            this.$el.attr('data-price-display', value);
        }
    }

    class OrderModal extends EventListener{
        constructor() {
            const listeners = ['click'];
            const $el = $('[data-application="modal-order"]');
            super(listeners, $el);
            this.$el = $el;
            this.initComponents();
        }

        initComponents() {
            this.initBody();
            this.initCloseBtn();
            this.initTable();
        }

        initBody() {
            this.$body = $('[data-order-component="body"]');
            this.$body.on('click', (e) => {
                e.stopPropagation();
            })
        }

        initCloseBtn() {
            this.$closeBtn = $('[data-order-component="close-btn"]');
            this.$closeBtn.on('click', (e) => {
                const order = calculator.components.get('order');
                order.hide();
            })
        }

        initTable() {
            this.$table = $('[data-order-component="table"]');
        }

        updateTable() {
            const routerPrice = calculator.getPrice('router');
            const antennaPrice = calculator.getPrice('antenna');
            const tariffPrice = calculator.getPrice('tariff');
            const modemPrice = calculator.getPrice('modem');
            const pigtailPrice = calculator.getPrice('pigtail');
            const cablePrice = calculator.getPrice('cable');
            const installPrice = calculator.getPrice('install');
            const finalPrice = calculator.getPrice('finalPrice');

            this.$table.find('[data-order-component="table-router"]')
                .text(`${routerPrice} руб.`);
            this.$table.find('[data-order-component="table-antenna"]')
                .text(`${antennaPrice} руб.`);
            this.$table.find('[data-order-component="table-tariff"]')
                .text(`${tariffPrice} руб.`);
            this.$table.find('[data-order-component="table-modem"]')
                .text(`${modemPrice} руб.`);
            this.$table.find('[data-order-component="table-pigtail"]')
                .text(`${pigtailPrice} руб.`);
            this.$table.find('[data-order-component="table-cable"]')
                .text(`${cablePrice} руб.`);
            this.$table.find('[data-order-component="table-install"]')
                .text(`${installPrice} руб.`);
            this.$table.find('[data-order-component="table-finalPrice"]')
                .text(`${finalPrice} руб.`);
        }

        onClick() {
            this.hide();
        }

        show() {
            this.updateTable();
            this.$el.addClass('open');
        }

        hide() {
            this.$el.removeClass('open');
        }
    }

    class OrderBtn extends EventListener {
        constructor() {
            const listeners = ['click'];
            const $el = $('[data-calculate-component="oreder-btn"]');
            super(listeners, $el);
            this.$el = $el;
        }

        onClick() {
            const order = calculator.components.get('order');
            order.show();
        }
    }

    class OrderForm extends EventListener {
        constructor() {
            const listeners = ['submit'];
            const $el = $('[data-order-component="form"]');
            super(listeners, $el);
            this.$el = $el;
            this.initComponents();
        }
        
        initComponents() {
            this.$nameField = $('[data-order-component="name-field"]');
            this.$phoneField = $('[data-order-component="phone-field"]');
            this.$submitBtn = $('[data-order-component="btn-field"]');
            this.$thanksMsg = $('[data-order-component="thanks-form"]');
            this.$errorMsg = $('[data-order-component="error-form"]');

            this.$nameField.on('input', () => {
                this.deleteMark(this.$nameField);
            });

            this.$phoneField.on('input', () => {
                this.deleteMark(this.$phoneField);
            });
        }

        onSubmit(event) {
            event.preventDefault();
            this.handlerForm();
        }
        
        handlerForm() {
            const phone = this.getValidPhone();
            const name = this.getValidName();

            const isValidPhone = phone.length > 0;
            const isValidName = name.length > 0;
            
            if (!isValidPhone) {
                this.markError(this.$phoneField);
                this.$submitBtn.attr('disabled', true);
            }
            
            if (!isValidName) {
                this.markError(this.$nameField);
                this.$submitBtn.attr('disabled', true);
            }

            if (isValidName && isValidPhone) {
                ajax(this.$el, 
                    this.successSend.bind(this),
                    this.errorSend.bind(this));
            }
        }

        getValidPhone() {
            const phone = this.$phoneField.val().match(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/);
            return (phone === null || phone.length == 0) ? '' : phone[0];
        }

        getValidName() {
            const name = this.$nameField.val().match(/^[_a-zA-Zа-яА-Я ]+$/);
            return (name === null || name.length == 0) ? '' : name[0];
        }

        markError($field) {
            $field.addClass('notValid');
        }

        deleteMark($field) {
            $field.removeClass('notValid');
            this.$submitBtn.attr('disabled', false);
        }

        successSend() {
            this.clearForm();
            this.showThanks();
            this.$submitBtn.attr('disabled', true);
        }

        errorSend() {
            this.showError();
            this.$submitBtn.attr('disabled', true);
        }

        showThanks() {
            this.$thanksMsg.addClass('active');
        }

        showError() {
            this.$errorMsg.addClass('active');
        }

        clearForm() {
            this.$nameField.val('');
            this.$phoneField.val('');
        }
    }

    function ajax($form, success, error) {
        const data = $form.serialize();
        $.ajax({
            url: './php/mail.php',
            method: 'POST',
            data,
            complete: function(data) {
                if (data.responseText === '1') {
                    success();
                } else {
                    error();
                }
            }
        }) 
    }

    const calculator = new Calculator();
    calculator.setDefaultOption();
});