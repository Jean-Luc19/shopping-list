var state = {
  items: [
    {title: 'apples', done: false},
    {title: 'oranges', done: false},
    {title: 'milk', done: true},
    {title: 'bread', done: false},
  ]
};
//modify state function to add items to list
function addItem(state, item) {
  state.items.push({title:item, done:false});
}
//render function to display state on page
function renderList(state, element) {
  var itemsHTML = state.items.map(function(item, index){
    var toggleClass = '';
    if (item.done) toggleClass = 'shopping-item__checked';

    return `
        <li id="${index}">
          <span class="shopping-item ${toggleClass}"> ${item.title} </span>
          <div class="shopping-item-controls">
            <button class="shopping-item-toggle">
              <span class="button-label">check</span>
            </button>
            <button class="shopping-item-delete">
              <span class="button-label">delete</span>
            </button>
          </div>
        </li>
      `;
  });
  element.html(itemsHTML);
}
//render function to toggle checked clicks
function toggleCheck(elem) {
  if (state.items[elem].done === false){
    state.items[elem].done = true;
  }
  else {
    state.items[elem].done = false;
  }
}
//delete items from state
function deleteItems(item){
  state.items.splice(item, 1);
}

function eventListeners() {
  //listen for checked clicks
  $('.shopping-list').on('click', '.shopping-item-toggle', function(event){
    var $elem = $(this).closest('li').attr('id');
    toggleCheck($elem);
    renderList(state, $('.shopping-list'));
    console.log($elem);
  });
  //listen for delete clicks
  $('.shopping-list').on('click', '.shopping-item-delete', function(event) {
    var $item = $(this).closest('li').attr('id');
    deleteItems($item);
    renderList(state, $('.shopping-list'));
  });
  //event listener function for adding new items
  $('#js-shopping-list-form').submit(function(event){
    event.preventDefault();
    var $input = $('#shopping-list-entry').val();
    //var $elem = $('.shopping-list');
    addItem(state, $input);
    renderList(state, $('.shopping-list'));
    // clears input field afer submission
    $('#shopping-list-entry').val("");
  });
}
function clearDefaults() {
  $('.shopping-list').empty();
  renderList(state, $('.shopping-list'));
}
$(function(){
  eventListeners();
  clearDefaults();
});
//$( event.currentTarget ).closest( "li" ).children('span')
