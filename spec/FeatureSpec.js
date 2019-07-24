'use strict';

// Thermostat starts at 20 degrees
// You can increase the temperature with an up function
// You can decrease the temperature with a down function
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


  // });
  //
  // describe('under stormy conditions',function(){
  //
  //   it('blocks takeoff when weather is stormy', function(){
  //     airport.land(plane)
  //     spyOn(Math,'random').and.returnValue(8);
  //     expect(function(){ airport.takeOff(plane);}).toThrowError('Sorry, inclement weather!');
  //     expect(airport._hangar).toContain(plane);
  //   });
  //
  //   it('blocks landing when weather is stormy', function(){
  //     spyOn(Math,'random').and.returnValue(8);
  //     expect(function(){ airport.land(plane); }).toThrowError('Sorry, inclement weather!');
  //     expect(airport._hangar).toEqual([]);
  //   });
  });
});
