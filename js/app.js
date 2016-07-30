var current_story = 0
var stories;
var mock_enabled = false;
if(mock_enabled){
  var API_URL = 'http://localhost:9292';
}else{
  var API_URL = 'https://polar-ridge-70990.herokuapp.com/';
}

aja()
  .url(API_URL)
  .on('success', function(all_stories){
    stories = non_read_stories(all_stories);
    loadFirstStory();
  })
  .go();

document.onkeydown = checkKey;

function non_read_stories(stories){
  non_read = []
  stories.forEach(function(story){
    if(!localStorage.getItem(story['url'])){
     non_read.push(story)
    }
  })

  return non_read;
}

function loadFirstStory(){
  document.getElementById('loading-image').style.visibility = 'hidden';
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
  story = stories[index]
  if(story == undefined){
    alert('There is nothing new for you');
    return;
  }
  localStorage.setItem(story['url'], true);
  var story_view = Monkberry.getView('story');
  story_view.update({ url: story['url'], domain: getDomain(story['url']), title: story['title'] });

  var counter_view = Monkberry.getView('counter');
  counter_view.update({ current: current_story + 1, total: stories.length });
}

function openCurrentStory(){
  document.getElementById("story-url").click();
}

function checkKey(e){
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
