'use strict';

var searchModule = angular.module('searchModule', []);

require('./search--directive')(searchModule);
require('./search--service')(searchModule);
