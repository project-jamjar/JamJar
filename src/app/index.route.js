(function() {
  'use strict';

  angular
    .module('jamjar')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('landing', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'vmMain',
        bindToController: true
      })
      .state('about', {
        url: '/about',
        templateUrl: 'app/main/about/about.html',
        controller: 'AboutController',
        controllerAs: 'vm'
      })
      .state('support', {
        url: '/support',
        templateUrl: 'app/main/support/support.html',
        controller: 'SupportController',
        controllerAs: 'vm'
      })
      .state('team', {
        url: '/team',
        templateUrl: 'app/main/team/team.html',
        controller: 'TeamController',
        controllerAs: 'vm',
        bindToController: true
      })
      .state('dashboard', {
        url: '/dashboard',
        abstract: true,
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'vm'
      })
      .state('dashboard.activate', {
        url: '/auth/activate/',
        templateUrl: 'app/auth/activate.html',
        controller: 'SignupActivateController',
        controllerAs: 'controller'
      })
      .state('dashboard.discover', {
        url: '/discover',
        templateUrl: 'app/dashboard/discover/discover.html',
        controller: 'DiscoverController',
        controllerAs: 'vm'
      })
      .state('dashboard.explore', {
        url: '/explore?genres?artists?uploaders?venues?name',
        templateUrl: 'app/dashboard/explore/explore.html',
        controller: 'ExploreController',
        controllerAs: 'vm'
      })
      .state('dashboard.concert', {
        url: '/concert/:id',
        templateUrl: 'app/dashboard/concert/concert.html',
        controller: 'ConcertController',
        controllerAs: 'vm'
      })
      .state('dashboard.player', {
        url: '/player/:type/:concert_id?:video_id',
        templateUrl: 'app/dashboard/player/player.html',
        controller: 'JamJarPlayerController',
        controllerAs: 'vm',
      })
      .state('dashboard.upload', {
        url: '/upload?artists?date?venueId?',
        templateUrl: 'app/dashboard/upload/upload.html',
        controller: 'UploadController',
        controllerAs: 'vm'
      })
      .state('dashboard.profile', {
        url: '/profile',
        templateUrl: 'app/dashboard/profile/profile.html',
        controller: 'MyProfileController',
        controllerAs: 'vm',
        abstract: true
      })
      .state('dashboard.profile.videos', {
        url: '/videos',
        templateUrl: 'app/dashboard/profile/profile.html',
        controller: 'MyProfileController',
        params: { tab: 0 },
        controllerAs: 'vm'
      })
      .state('dashboard.profile.concerts', {
        url: '/concerts',
        templateUrl: 'app/dashboard/profile/profile.html',
        controller: 'MyProfileController',
        params: { tab:1 },
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
