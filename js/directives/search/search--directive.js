module.exports = function(ngModule) {
  console.log('require worked.');
  return function() {
    console.log('require worked.');
  }
}
