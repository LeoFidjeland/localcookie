define(['lib/localCookie'], function(localStorage) {

  describe('localCookie', function() {

    it('doesn\'t return prototypical things', function(done) {
      expect(localStorage.getItem('key')).to.equal(null);
      done();
    });

    it('can\'t make assuptions about key positioning', function(done) { 
      localStorage.setItem('a', 1);
      expect(localStorage.key(0)).to.equal('a');
      done();
    }); 
 
    it('sets multiple items', function(done) {
      localStorage.setItem('b', '2');
      expect(localStorage.getItem('a')).to.equal('1');
      expect(localStorage.getItem('b')).to.equal('2');
      expect(localStorage.length).to.equal(2);
      done();
    });

    it('doesnt set thing by itself', function(done) { 
      expect(localStorage['c']).to.equal(undefined);
      expect(localStorage.getItem('c')).to.equal(null);
      done();
    });

    it('sets undefines', function(done) { 
      localStorage.setItem('c');
      expect(localStorage.getItem('c')).to.equal("undefined");
      expect(localStorage.length).to.equal(3);
      done();
    });

    it('removes items', function(done) { 
      localStorage.removeItem('c');
      expect(localStorage.getItem('c'),null);
      expect(localStorage.length).to.equal(2);
      done();
    });

    it('clears', function(done) { 
      localStorage.clear();
      expect(localStorage.getItem('a'),null);
      expect(localStorage.getItem('b'),null);
      expect(localStorage.length).to.equal(0);
      done();
    });

    //These tests can't be run from inside the browser
    //Write tests to check that the cookie has been correctly generated
    //The phantomJS cookie is in tests/cookies.txt
    //It can also be manually checked by running the tests in Chrome and checking the resources tab
    it('sets expire');
    it('sets domain');
    it('sets path');
    it('sets Expiration Unit');
    it('sets secure');

    it('manually tests the configs',function(done){
      localStorage.config({expires: 21});
      localStorage.setItem('a',1);
      done();
    });

  });

});


