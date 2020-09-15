$(document).ready(function() {
    
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

            this.components.set('finalPrice', new FinalPrice());
        }

        updateFinalPrice() {
            let resultPrice = 0;
            for (let el of this.components.values()) {
                if (el.$priceDisplay) {
                    const elementPrice = +el.$priceDisplay.attr('data-price-display');
                    resultPrice += elementPrice;
                }
            }
            let a = this.components.get('finalPrice')
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
            console.log('sss');
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

        }

        updatePrice(value=100) {
            this.$el.text(value + ' руб.');
            this.$el.attr('data-result-price-calculator', value);
        }
    }





    const calculator = new Calculator();
    calculator.setDefaultOption();
});