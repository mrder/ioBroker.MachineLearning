'use strict';

const utils = require('@iobroker/adapter-core'); // Importiert ioBroker-Basismodul
const brain = require('brain.js');

class MyMlAdapter extends utils.Adapter {
    constructor(options = {}) {
        super({
            ...options,
            name: 'MachineLearning-adapter',
        });

        this.on('ready', this.onReady.bind(this));
        this.on('stateChange', this.onStateChange.bind(this));
        this.on('unload', this.onUnload.bind(this));
    }

    async onReady() {
        this.log.info('Adapter gestartet, Konfiguration wird geladen...');

        // Neural Network initialisieren
        this.net = new brain.NeuralNetwork();
        
        // Beispieltraining (Anpassbar)
        this.net.train([{ input: { temp: 20 }, output: { light: 1 } }]);

        // Dynamische Sensoren abonnieren
        this.config.sensoren.split(',').forEach(sensor => {
            this.subscribeStates(sensor.trim());
        });
    }

    async onStateChange(id, state) {
        if (state && !state.ack) {
            this.log.info(`Sensor ${id} hat sich geändert: ${state.val}`);
            
            // Sensorwerte abrufen
            const sensorValues = {};
            for (const sensor of this.config.sensoren.split(',')) {
                const value = await this.getStateAsync(sensor.trim());
                sensorValues[sensor] = value ? value.val : null;
            }

            // Machine Learning Vorhersage
            const output = this.net.run(sensorValues);

            // Aktoren setzen basierend auf der Vorhersage
            this.config.aktoren.split(',').forEach(async aktor => {
                await this.setStateAsync(aktor.trim(), { val: output.light ? true : false, ack: true });
            });

            // Alexa-Ausgabe
            if (this.config.alexa) {
                this.config.alexa.split(',').forEach(async alexaDevice => {
                    await this.setStateAsync(`${alexaDevice}.Commands.speak`, 'Aktion ausgeführt');
                });
            }

            // WhatsApp Nachricht
            if (this.config.whatsapp) {
                await this.setStateAsync(`whatsapp.${this.config.whatsapp}.message`, 'Automatisierung wurde ausgeführt.');
            }
        }
    }

    onUnload(callback) {
        try {
            this.log.info('Adapter wird heruntergefahren...');
            callback();
        } catch (e) {
            callback();
        }
    }
}

if (module.parent) {
    module.exports = (options) => new MyMlAdapter(options);
} else {
    new MyMlAdapter();
}
