var Thermostat = function() {
  this._temp = 20;
  this._minTemp = 10;
  this._maxTemp = 25;
};

Thermostat.prototype.getTemp = function() {
  return this._temp;
};

Thermostat.prototype.raiseTemp = function(temp) {
  if ((this._temp + temp) > this._maxTemp) {
    throw new Error("Error, over maximum temperature");
  }
  else {
    this._temp += temp;
  };
};

Thermostat.prototype.lowerTemp = function(temp) {
  if ((this._temp - temp) < this._minTemp) {
    throw new Error("Error, under minimum temperature");
  }
  else {
    this._temp -= temp;
  };
};

Thermostat.prototype.powerSaveModeOn = function () {
  this._maxTemp = 25
};

Thermostat.prototype.powerSaveModeOff = function () {
  this._maxTemp = 32
};

Thermostat.prototype.resetTemp = function () {
  this._temp = 20
};

Thermostat.prototype.energyUsage = function() {
  if (this._temp < 18) {
    return "Low Energy Usage";
  }
  else if (this._temp < 25) {
    return "Medium Energy Usage";
  }
  else return "High Energy Usage";
};

// var thermostat = new Thermostat();
// thermostat.lowerTemp(10)
// console.log(thermostat.getTemp())
