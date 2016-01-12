'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /heatMap when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/heatMap");
  });


  describe('heatMap', function() {

    beforeEach(function() {
      browser.get('index.html#/heatMap');
    });


    it('should render heatMap when user navigates to /heatMap', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('rawData', function() {

    beforeEach(function() {
      browser.get('index.html#/rawData');
    });


    it('should render rawData when user navigates to /rawData', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
