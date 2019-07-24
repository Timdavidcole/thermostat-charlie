var Thermostat = function() {
  this.MINIMUM_TEMPERATURE = 10;
  this._maxTemp = 25;
  this.powerSavingMode = true;
  this.MAX_LIMIT_PSM_ON = 25;
  this.MAX_LIMIT_PSM_OFF = 32;
  this.DEFAULT_TEMPERATURE = 20;
  this._temp = this.DEFAULT_TEMPERATURE;
  this.MEDIUM_ENERGY_USAGE_LIMIT = 18;

};

Thermostat.prototype.getTemp = function() {
  return this._temp;
};

Thermostat.prototype.isMinimumTemperature = function() {
  return this._temp === this.MINIMUM_TEMPERATURE;
}

Thermostat.prototype.isMaximumTemperature = function() {
  if (this.isPowerSavingModeOn() === false) {
  return this._temp === this.MAX_LIMIT_PSM_OFF;
}
  return this._temp === this.MAX_LIMIT_PSM_ON;
}

Thermostat.prototype.isPowerSavingModeOn = function() {
  return this.powerSavingMode === true;
}

Thermostat.prototype.switchPowerSavingModeOff = function() {
  this.powerSavingMode = false;
}

Thermostat.prototype.switchPowerSavingModeOn = function() {
  this.powerSavingMode = true;
}

Thermostat.prototype.raiseTemp = function(temp) {
  if (this.isMaximumTemperature()) {
    return;
  }
  this._temp += temp;
};

Thermostat.prototype.lowerTemp = function(temp) {
  if (this.isMinimumTemperature()) {
    return;
  }
  else {
    this._temp -= temp;
  };
};


Thermostat.prototype.resetTemperature = function () {
  this._temp = this.DEFAULT_TEMPERATURE
};


Thermostat.prototype.energyUsage = function() {

  if (this._temp < this.MEDIUM_ENERGY_USAGE_LIMIT){
    return 'low-usage';
  }
  if (this._temp >= this.MEDIUM_ENERGY_USAGE_LIMIT && this._temp <= this.MAX_LIMIT_PSM_ON){
    return 'medium-usage'
  }
  return 'high-usage'
};
