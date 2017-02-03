var state = {
  items: [
    {title: 'apples', done: 'true'},
    {title: 'oranges', done: 'false'},
    {title: 'milk', done: 'false'},
    {title: 'bread', done: 'false'},
  ]
};
//modify state function to add items to list
function addItem(state, item) {
  state.items.push({title:item, done:'false'});
}
//render function to display state on page
function renderList(state, element) {
  var itemsHTML = state.items.map(function(item){
      return `<li>
        <span class="shopping-item"> ${item.title} </span>
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle">
            <span class="button-label">check</span>
          </button>
          <button class="shopping-item-delete">
            <span class="button-label">delete</span>
          </button>
        </div>
      </li>`;
  });
  element.html(itemsHTML);

}
//render function to toggle checked clicks
function toggleCheck(elem) {
  return elem.toggleClass('shopping-item__checked');
}
//delete items from state
function deleteItems(item){
  var itemIndex = 0;
  state.items.map(function(x, i){
    if (x.title === item) {
      itemIndex = i;
    }
  });
  state.items.splice(itemIndex, 1);
  console.log(state);
}

function eventListeners() {
  //listen for checked clicks
  $('.shopping-list').on('click', '.shopping-item-toggle', function(event){
    var $elem = $(this).closest('li').children('span');
    toggleCheck($elem);
  });
  //listen for delete clicks
  $('.shopping-list').on('click', '.shopping-item-delete', function(event) {
    var $item = $(this).closest('li').children('span').text();
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
