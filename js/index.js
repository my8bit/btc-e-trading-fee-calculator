/**
 *  index.js, the starter.
 *
 *  @author  my8bit
 *  @date    Jan 21, 2017
 *
 */
'use strict';
require.ensure([
  'splash-screen/dist/splash.min.css',
  'splash-screen'
], require => {
  require('splash-screen/dist/splash.min.css').use();
  require('splash-screen').Splash.enable('circular');
});

require.ensure([
  'less/main.less',
  'splash-screen',
  './fw/Entrance'
], require => {
  require('less/main.less');
  const Entrance = require('./fw/Entrance').default;
  (new Entrance()).run();
});
