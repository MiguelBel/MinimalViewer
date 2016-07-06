var current_story = 0
var stories;

aja()
  .url('http://hn.algolia.com/api/v1/search?tags=front_page')
  .on('success', function(all_stories){
    stories = all_stories;
    loadFirstStory();
  })
  .go();

document.onkeydown = checkKey;

function loadFirstStory(){
  loadStory(0);
}

function loadNextStory(){
  current_story = current_story + 1;
  loadStory(current_story);
}

function loadPreviousStory(){
  current_story = current_story - 1;
  loadStory(current_story);
}

function loadStory(index){
  story = stories['hits'][index]
  var story_view = Monkberry.getView('story');
  story_view.update({ url: story['url'], domain: getDomain(story['url']), title: story['title'] });

  var counter_view = Monkberry.getView('counter');
  counter_view.update({ current: current_story + 1, total: stories['hits'].length });
}

function openCurrentStory(){
  document.getElementById("story-link").click();
}

function checkKey(e) {
  left_arrow_code = '37'
  up_arrow_code = '38'
  right_arrow_code = '39'

  e = e || window.event;

  if(e.keyCode == left_arrow_code){
    loadPreviousStory();
  }

  if(e.keyCode == up_arrow_code){
    openCurrentStory();
  }

  if(e.keyCode == right_arrow_code){
    loadNextStory();
  }
}

function getDomain(url){
  var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
  var domain = matches && matches[1];

  return domain;
}
