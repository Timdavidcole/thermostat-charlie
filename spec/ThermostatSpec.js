
'use strict';

describe('Thermostat', function() {

  var thermostat

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  describe('temperature', function() {

    it('is 20 degrees', function() {
      expect(thermostat.getTemp()).toEqual(20);
    });

    it('increases the temp by 3 degrees', function(){
      thermostat.raiseTemp(3)
      expect(thermostat.getTemp()).toEqual(23);
    });

    it('decreases the temp by 10 degrees', function(){
      thermostat.lowerTemp(10)
      expect(thermostat.getTemp()).toEqual(10);
    });

    it("can't decrease temp below minimum temp", function(){
      expect(function(){ thermostat.lowerTemp(11); }).toThrowError("Error, under minimum temperature");
    });

    it("can't increase temp above 25 degrees if PS mode is on", function(){
      thermostat.powerSaveModeOn()
      expect(function(){ thermostat.raiseTemp(6); }).toThrowError("Error, over maximum temperature");
    });

    it("can't increase temp above 32 degrees if PS mode is off", function(){
      thermostat.powerSaveModeOff()
      expect(function(){ thermostat.raiseTemp(13); }).toThrowError("Error, over maximum temperature");
    });

    it("power saving is on my default", function(){
      expect(function(){ thermostat.raiseTemp(6); }).toThrowError("Error, over maximum temperature");
    });

    it("resets the temperature back to 20 if reset function is called", function(){
      thermostat.raiseTemp(3)
      thermostat.resetTemp()
      expect(thermostat.getTemp()).toEqual(20);;
    });

    it("returns low usage if temperature is under 18", function(){
      thermostat.lowerTemp(10)
      expect(thermostat.energyUsage()).toEqual("Low Energy Usage");
    });

    it("returns medium usage if temperature is under 25", function(){
      expect(thermostat.energyUsage()).toEqual("Medium Energy Usage");
    });

    it("returns high usage if temperature is 25 or over", function(){
      thermostat.powerSaveModeOff()
      thermostat.raiseTemp(5)
      expect(thermostat.energyUsage()).toEqual("High Energy Usage");
    });

    // beforeEach(function() {
    //   weather.isStormy.and.returnValue(false);
    // });
    //
    // it('can clear planes for landing', function() {
    //   airport.land(plane, weather)
    //   expect(airport._hangar).toContain(plane)
    // });
    //
    // it('allow a plane to take off and leave its hangar', function() {
    //   airport.land(plane, weather)
    //   airport.takeOff(plane, weather)
    //   expect(airport._hangar).not.toContain(plane)
    // });

  });

});
