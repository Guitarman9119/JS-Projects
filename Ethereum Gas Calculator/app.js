// Listen for submit
document.getElementById('transaction-form').addEventListener('submit', function(e){

    //Hide Results

    document.getElementById('results').style.display = 'none';


    //Show the loader

    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

// Calculate Results
function calculateResults(){
  

  //UI Variables
  const UIethprice =  document.getElementById('ethereum-price');
  const UIgwei = document.getElementById('gwei-amount');
  const UIgasprice = document.getElementById('gas-amount');
  // Result
  const UIamount = document.getElementById('amount');



const Gwei = (parseFloat(UIgwei.value)/1000000000) * parseFloat(UIgasprice.value);

if(isFinite(Gwei)){



const amount = Gwei * parseFloat(UIethprice.value);


UIamount.value = amount.toFixed(2) ;

//Show results
document.getElementById('results').style.display = 'block';

//Hide Spinner

document.getElementById('loading').style.display = 'none';

} else{

    showError('Please check your numbers');
}


  


 
}

function showError(error){

    //Show results
document.getElementById('results').style.display = 'none';

//Hide Spinner

document.getElementById('loading').style.display = 'none';
    
    //Create a div
    const errorDiv = document.createElement('div');

    // Get elemtns

    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //Add class
    errorDiv.className = 'alert alert-danger';

    //Create text node and append to Div

    errorDiv.appendChild(document.createTextNode(error));

    // Insert Error above the heading
    card.insertBefore(errorDiv, heading);

    //Clear Error
    setTimeout(clearError, 2000);
}

//Clear ERror
function clearError(){

    document.querySelector('.alert').remove();
}
