function saveSettings() {
    const sensor = document.getElementById('sensor').value;
    const actor = document.getElementById('actor').value;
    const output = document.getElementById('output').value;

    if (sensor && actor && output) {
        sendTo(null, 'saveSettings', { sensor, actor, output }, function (result) {
            if (result && result.error) {
                alert('Fehler beim Speichern der Einstellungen');
            } else {
                alert('Einstellungen erfolgreich gespeichert');
            }
        });
    } else {
        alert('Bitte alle Felder ausfüllen');
    }
}
