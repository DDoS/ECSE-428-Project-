
// using assertions and running using wdio wdio.config-mocha.js
describe('my awesome website', function() {
    it('should do some chai assertions', function() {
        return browser
            .url('http://google.com')
            .getTitle().should.eventually.be.equal('Google');
    });
});