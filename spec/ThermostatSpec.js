'use strict';
// Thermostat starts at 20 degrees
// You can increase the temperature with an raiseTemp function
// You can decrease the temperature with a lowerTemp function
// The minimum temperature is 10 degrees
// If power saving mode is on, the maximum temperature is 25 degrees
// If power saving mode is off, the maximum temperature is 32 degrees
// Power saving mode is on by default
// You can reset the temperature to 20 with a reset function
// You can ask about the thermostat's current energy usage: < 18 is low-usage, < 25 is medium-usage, anything else is high-usage.
// (In the challenges where we add an interface, low-usage will be indicated with green, medium-usage indicated with black, high-usage indicated with red.)
describe('Feature Test: ', function(){
 var thermostat;
 beforeEach(function(){
   thermostat = new Thermostat();
 });
 describe('thermostat',function(){
 // beforeEach(function(){
 // });
   it('starts at 20 degrees', function(){
     expect(thermostat.getTemp()).toEqual(20);
   });
   it('increases in temperature with raiseTemp()', function() {
     thermostat.raiseTemp(1);
     expect(thermostat.getTemp()).toEqual(21);
   });
   it('decreases in temperature with lowerTemp()', function() {
     thermostat.lowerTemp(1)
     expect(thermostat.getTemp()).toEqual(19);
   });
   it("can't decrease temp below minimum temp", function(){
     for (var i = 0; i < 11; i++) {
       thermostat.lowerTemp(1);
       }
     expect(thermostat.getTemp()).toEqual(10);
   });
   it('has power saving mode on by default', function() {
     expect(thermostat.isPowerSavingModeOn()).toBe(true);
   });
   it('can switch PSM off', function() {
     thermostat.switchPowerSavingModeOff();
     expect(thermostat.isPowerSavingModeOn()).toBe(false);
   });
   it('can switch PSM back on', function() {
     thermostat.switchPowerSavingModeOff();
     expect(thermostat.isPowerSavingModeOn()).toBe(false);
     thermostat.switchPowerSavingModeOn();
     expect(thermostat.isPowerSavingModeOn()).toBe(true);
   });
   describe('when power saving mode is on', function() {
     it('has a maximum temperature of 25 degrees', function() {
       for (var i = 0; i < 6; i++) {
         thermostat.raiseTemp(1);
       }
       expect(thermostat.getTemp()).toEqual(25);
     });
   });
   describe('when power saving mode is off', function() {
     it('has a maximum temperature of 32 degrees', function() {
       thermostat.switchPowerSavingModeOff();
       for (var i = 0; i < 13; i++) {
         thermostat.raiseTemp(1);
       }
       expect(thermostat.getTemp()).toEqual(32);
     });
   });
   it('can be reset to the default temperature', function() {
     for (var i = 0; i < 6; i++) {
       thermostat.raiseTemp(1);
       }
     thermostat.resetTemperature();
     expect(thermostat.getTemp()).toEqual(20);
   });
   describe('displaying usage levels', function() {
     describe('when the temperature is below 18 degrees', function() {
       it('it is considered low-usage', function() {
         for (var i = 0; i < 3; i++) {
           thermostat.lowerTemp(1);
         }
         expect(thermostat.energyUsage()).toEqual('low-usage');
       });
     });
     describe('when the temperature is between 18 and 25 degrees', function() {
       it('it is considered medium-usage', function() {
         expect(thermostat.energyUsage()).toEqual('medium-usage');
       });
     });
     describe('when the temperature is anything else', function() {
       it('it is considered high-usage', function() {
         thermostat.powerSavingMode = false;
         for (var i = 0; i < 6; i++) {
           thermostat.raiseTemp(1);
         }
         expect(thermostat.energyUsage()).toEqual('high-usage');
       });
     });
   });
 });
});
