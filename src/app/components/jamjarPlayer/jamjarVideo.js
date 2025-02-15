
function Video(video, edges, $sce, $document, $element) {
  var self = this;

  self.$sce = $sce;
  self.video = video;
  self.API = null;
  self.edges = edges;

  self.ready = false;

  self.offset = 0;
  self.presentation = {
    offset: 0,
    width: 0,
    playable: false,
    preload: 'none',
  }

  self.config = self.getConfig();
}

Video.prototype.updatePlayable = function(globalPosition, maxOffset) {
  var self = this;

  var screen_width = $(".now-playing-video").width() * 0.95;

  // add 0.5 to remove flicker when video ends
  self.presentation.playable = self.offset <= globalPosition && (self.offset + self.video.length) > (globalPosition + 0.5);

  self.presentation.offset = (self.offset / maxOffset) * screen_width;
  self.presentation.width  = (self.video.length / maxOffset) * screen_width;
}


Video.prototype.setPresentationDetails = function(nowPlaying, edgeToPrimary, currentOffset, maxOffset) {
  var self = this;


  self.offset = self.calcOffsetMargin(nowPlaying, edgeToPrimary);
  self.updatePlayable(currentOffset, maxOffset);

  if (self.presentation.playable) {
    self.presentation.preload = 'preload';
  }
};

Video.prototype.calcOffsetMargin = function(nowPlaying, edgeToPrimary) {
  var self = this;

  if (nowPlaying == self) {
    return 0;
  }

  var offset = edgeToPrimary.offset;
  if (offset < 0) {
    return 0;
  }

  var margin = offset - nowPlaying.time();
  return Math.max(margin, 0);
}

Video.prototype.setAPI = function(API) {
  var self = this;

  self.ready = true;
  self.API = API;
}

Video.prototype.time = function() {
  var self = this;

  if (self.API) {
    return self.API.currentTime / 1000.0;
  } else {
    return 0; //hack
  }
};

Video.prototype.volume = function(vol) {
  var self = this;

  if (self.API)
    self.API.setVolume(vol);
};

Video.prototype.play = function() {
  var self = this;

  if (!self.API)
    return

  if (self.API.currentState != 'play')
    _.defer(self.API.play.bind(self.API));
}

Video.prototype.pause = function(reason) {
  var self = this;

  if (!self.API)
    return

  if (self.API.currentState != 'pause' && self.API.currentState != 'stop') {
    //console.log("pausing, reason: ", reason, self.video.id);
    _.defer(self.API.pause.bind(self.API));
  }
}

Video.prototype.setOffset = function(seconds) {
  var self = this;

  if (!self.API) return;

  self.API.seekTime(seconds);
}

Video.prototype.getConfig = function() {
  var self = this;

  var url = self.$sce.trustAsResourceUrl(self.video.web_src);

  return {
    sources: [{src: url, type: 'video/mp4'}],
    theme: "bower_components/videogular-themes-default/videogular.css",
  };
};

