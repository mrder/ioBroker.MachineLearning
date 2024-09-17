'use strict';

const utils = require('@iobroker/adapter-core');

class MyMlAdapterAdmin extends utils.Adapter {
    constructor(options) {
        super({
            ...options,
            name: 'MachineLearning-adapter',
        });
        
        // Initialisierung des Admin-Interface
        this.on('ready', this.onReady.bind(this));
    }

    async onReady() {
        this.log.info('Admin-Interface bereit.');

        // Lade die Adapter-Konfiguration
        this.loadAdapterConfig();
    }

    async loadAdapterConfig() {
        try {
            // Lade die Konfiguration der UI
            const config = await this.getAdapterConfig();
            this.setState('config', config, true);
        } catch (error) {
            this.log.error(`Fehler beim Laden der Adapter-Konfiguration: ${error}`);
        }
    }

    // Hier können weitere Funktionen für das Admin-Interface hinzugefügt werden
}

// Exportiere die Admin-Klasse
module.exports = (options) => new MyMlAdapterAdmin(options);
