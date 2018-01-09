// Book Constructor

function Book(title, author, isbn){

    this.title =title;
    this.author = author;
    this.isbn = isbn;


}



// UI Constructor

function UI(){}


UI.prototype.addBookToList = function(book){

const list = document.getElementById('book-list');

//Create tr element
const row = document.createElement('tr')

//Insert Colls

row.innerHTML =     `<td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td><a href="#" class="delete">X<a></td>`;

list.appendChild(row);

}

// Show Alert

UI.prototype.showAlert = function(message, className){

    //create div
    const div = document.createElement('div');
    //Add classes
    div.className = `alert ${className}`;
    //Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.container');
    //Get form
    const form = document.querySelector('#book-form');

    //Insert alert
    container.insertBefore(div, form);

    // Dissapear Time out
    setTimeout(function(){

        document.querySelector('.alert').remove();
    }, 3000);
}


// Delete Book
UI.prototype.deleteBook = function(target){

    if(target.className === 'delete'){

        target.parentElement.parentElement.remove();


    }

}


//Clear fields

UI.prototype.clearFields = function(){

document.getElementById('title').value = '';
document.getElementById('author').value = '';
document.getElementById('isbn').value = '';

}

// Event Listeners for add book

document.getElementById('book-form').addEventListener('submit', function(e){

// Form Values
const   title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

//Instantiate Book
    const book = new Book(title, author, isbn);

//Instantiate UI
const ui = new UI();

if(title === '' || author === ''|| isbn === ''){

//Error Altert
ui.showAlert('Please fill in al fields', 'error')

}else {

    // ADD book to list
ui.addBookToList(book);

//Show success

ui.showAlert('Book added!', 'success');

//clear fields
ui.clearFields();

}



  

e.preventDefault();


});

//Event Listener for delete

document.getElementById('book-list').addEventListener('click',function(e){

//Instantiate UI
const ui = new UI();

ui.deleteBook(e.target);

ui.showAlert('Book Removed!', 'success');

e.preventDefault();




});