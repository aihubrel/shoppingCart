var tomatoQty = $('#tomatoQty').val();
var lettuceQty = $('#lettuceQty').val();
var potatoQty = $('#potatoQty').val();
var paprikaQty = $('#paprikaQty').val();
var orangeQty = $('#orangeQty').val();
var strawberryQty = $('#strawberryQty').val();
var pineappleQty = $('#pineappleQty').val();
var grapeQty = $('#grapeQty').val();
var eachPrice = [1.32,2.99,1.61,2.00,1.49,5.99,3.19,3.29];
var itemName = ["Tomato", "Lettuce", "Potato", "Paprika", "Orange", "Strawberry", "Pineapple", "Grape"];
var tomatoPrice = eachPrice[0]; 
var lettucePrice = eachPrice[1]; 
var potatoPrice = eachPrice[2]; 
var paprikaPrice = eachPrice[3]; 
var orangePrice = eachPrice[4]; 
var strawberryPrice = eachPrice[5]; 
var pineapplePrice = eachPrice[6]; 
var grapePrice = eachPrice[7]; 


var newItemName = 0;
var newItemPrice = 0;
var priceId =  "";
var qtyId =  "";
var subId = "";
var newItemQty = 0;
var qty = 0;
var subtraction = 0;


// show item prices on the page
$(document).ready(function(){
    document.getElementById("tomatoPrice").append("$" + tomatoPrice);
    document.getElementById("lettucePrice").append("$" + lettucePrice);
    document.getElementById("potatoPrice").append("$" + potatoPrice);
    document.getElementById("paprikaPrice").append("$" + paprikaPrice);
    document.getElementById("orangePrice").append("$" + orangePrice);
    document.getElementById("strawberryPrice").append("$" + strawberryPrice);
    document.getElementById("pineapplePrice").append("$" + pineapplePrice);
    document.getElementById("grapePrice").append("$" + grapePrice);  
}) 

// show subtotal
$(document).on('input', function(){
        var tomatoQty = parseFloat($("#tomatoQty").val());
        var tomatoTotal = (tomatoQty  * tomatoPrice).toFixed(2);
        $("#tomatoSub").text(tomatoTotal);

        var lettuceQty = parseFloat($("#lettuceQty").val());
        var lettuceTotal = (lettuceQty  * lettucePrice).toFixed(2);
        $("#lettuceSub").text(lettuceTotal);

        var potatoQty = parseFloat($("#potatoQty").val());
        var potatoTotal = (potatoQty  * potatoPrice).toFixed(2);
        $("#potatoSub").text(potatoTotal);

        var paprikaQty = parseFloat($("#paprikaQty").val());
        var paprikaTotal = (paprikaQty  * paprikaPrice).toFixed(2);
        $("#paprikaSub").text(paprikaTotal);

        var orangeQty = parseFloat($("#orangeQty").val());
        var orangeTotal = (orangeQty  * orangePrice).toFixed(2);
        $("#orangeSub").text(orangeTotal);

        var strawberryQty = parseFloat($("#strawberryQty").val());
        var strawberryTotal = (strawberryQty  * strawberryPrice).toFixed(2);
        $("#strawberrySub").text(strawberryTotal);

        var pineappleQty = parseFloat($("#pineappleQty").val());
        var pineappleTotal = (pineappleQty  * pineapplePrice).toFixed(2);
        $("#pineappleSub").text(pineappleTotal);

        var grapesQty = parseFloat($("#grapeQty").val());
        var grapesTotal = (grapesQty  * grapePrice).toFixed(2);
        $("#grapeSub").text(grapesTotal);

})

// remove when "X" is clicked
$(document).ready (function(){
    $("button.close").unbind().click(function(){
        var id = this.id;
        var removedItem = id[0].toUpperCase() + id.slice(1);
        for( var i = 0; i < itemName.length; i++){ 
          if (itemName[i] == removedItem) { 
              itemName.splice(i, 1);
              eachPrice.splice(i, 1); 
          }  
        }
        $('.'+id).remove();
        calculateTotal();
    })     
});

function remove(id) {
 // var itemPrice =  Number($("#"+id+"Price").text().replace(/\$/,""));
  for( var i = 0; i < itemName.length; i++){ 
    if (itemName[i] == id) { 
        itemName.splice(i,1);
        eachPrice.splice(i,1); 
    }                                                                                                                                                                                                                                                                                                                                                7
  }
  $('.'+id).remove();
  calculateTotal();
}

$(document).ready (function(){
    $("button#submit").unbind().click(function(){
        newItemName = $('#newItemName').val();
        newItemPrice = $('#newItemPrice').val();
        priceId =  newItemName + "Price";
        qtyId =  newItemName + "Qty";
        subId = newItemName + "Sub";

        if (checkDuplicate(newItemName) == false) {
            $('#last').append(
            '<div class="main '+ newItemName + ' col-6 col-md-3">' +
              '<p class="itemName" style="display: inline">'+newItemName+'</p>' +
              '<button id = "'+newItemName+'" class="close"  onclick="remove(this.id)" style="display: inline">&#x1F5D9</button>'+
              '<br>' +
              '<img src="images/default.jpg">' +
              '<p >Price: $<span class="item-price" id="'+priceId+'">'+newItemPrice+'</span></p>' + 
              '<p>QTY:<input type="text" inputmode="numeric" oninput="this.value = this.value.replace(/\D+/g, "")"  class ="quantity" type="number" id="'+qtyId+'" name="'+qtyId+'" onkeyup="update(this.id)" min="0" max="100" value ="0"/></p>'+
              '<p>SUBTOTAL:<span class = "subtotal" id="'+subId+'">0.00</span></p>'+
            '</div>');    
            eachPrice.push(newItemPrice);
            itemName.push(newItemName);
            $("#alart").html("");
          } else {
            $("#alart").html("The item is already exist."+"<br>"+"Please enter differnet item.");
          }
    })   
});

function update (id){
    var itemName = id.substr(0, id.length-3);
    newItemQty = parseFloat($('#'+ id).val());
    priceId = itemName + "Price";
    subId = itemName + "Sub";
    newItemPrice = parseFloat($('#' + priceId).text());
    var newItemTotal = (newItemQty  * newItemPrice).toFixed(2);
    $("#"+subId).text(newItemTotal);
}

$(document).on('keyup', function() {
  calculateTotal();
});

function calculateTotal() {
  var quantity = $('.quantity');
  var total = 0;
    for (i = 0; i < quantity.length; i++) {
      var subtotal = (Number($(quantity[i]).val())) * eachPrice[i];
      total += subtotal;
    }
  $('#total').text(total.toFixed(2));
}

function  checkDuplicate(newItem) {
  var upperCaseItemName = newItem[0].toUpperCase() + newItem.slice(1);
$("#test").html(newItem);
 if (itemName.indexOf(newItem) == -1 && itemName.indexOf(upperCaseItemName) == -1 &&
     itemName.indexOf(newItem.toLowerCase())==-1) {
  return false;
 }
 return true;
}

