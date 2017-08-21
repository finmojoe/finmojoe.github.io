

var quantityHTML=document.getElementById("quantity");
var totalPurchaseHTML=document.getElementById("totalPurchase");

//holder variable
var quantity=0;
var totalPrice=0;

//for btn add variable
var grandTotal=0;

var finalCartData=[];



//for checking if value is not a number
var isNaN = function(value) {
    return Number.isNaN(Number(value));
}



//hiding button update from HTML
// for(var i=1;i<3;i++){
// 	document.getElementById("btnUpdate0"+i).style.display="none";
// 	document.getElementById("btnRemove0"+i).disabled=true;

// }

//displaying grand total values to HTML
totalPurchaseHTML.innerHTML=grandTotal.toFixed(2);






(function(){

	var tmpId=[];


	for(var i=0;i<jsonData.length;i++){
		tmpId.push(jsonData[i].categoryId);
	}


	for(var k=0;k<tmpId.length;k++){

		tmpId=tmpId.sort();

		if(tmpId[k]==tmpId[k+1]){

			num=tmpId[k];
		
		}else{

			for(var section=0;section<categoryData.length;section++){
				if(tmpId[k]==categoryData[section].id){
				
					//title of grouped items
					var ctgName = categoryData[section].name;

					var table_head=document.getElementById("ycTable-head"+section);

					table_head.innerHTML+="<tr><th>"+ctgName+"</th>\
										   <th> 10\" </th>\
										   <th> 14\" </th>\
										   <th> 18\" </th>\
										   <th> QTY </th>\
										   <th class='subtotal-head'>Sub Total</th>\
										   <th>Add</th>\
										   <th>Remove</th></tr>";

					var table_body=document.getElementById("ycTable-body"+section);
						
					for(var a=0;a<jsonData.length;a++){
						//content of grouped items

						if(jsonData[a].categoryId==tmpId[k]){
						// 	group.innerHTML+="<p>"+data[a].name+"</p>";

							var itemId=jsonData[a].id;
							var itemName=jsonData[a].item;
							var itemDesc=jsonData[a].description;

							var price10;
							var price14;
							var price18;

							
							for(var size=0;size<jsonData[a].sizes.length;size++){
								 
								 price10=jsonData[a].sizes[size][10];
								 price14=jsonData[a].sizes[size][14];
								 price18=jsonData[a].sizes[size][18];
	
							}

							table_body.innerHTML+="<tr id='row0"+itemId+"'><td><p class='item-name-p'>"+itemName+"</p><p class='item-desc-p'><span id='desc0"+itemId+"'>"+itemDesc+"</span></p></td>\
										   			   <td><div> <input id='radio0"+itemId+"' class='radio0"+itemId+"' type='radio' name='size"+itemId+"' onmouseover='checkButton(this,"+price10+","+itemId+")'></div> </td>\
										               <td> <input id='radio0"+itemId+"' class='radio0"+itemId+"' type='radio' name='size"+itemId+"' onmouseover='checkButton(this,"+price14+","+itemId+")'> </td>\
										               <td> <input id='radio0"+itemId+"' class='radio0"+itemId+"' type='radio' name='size"+itemId+"' onmouseover='checkButton(this,"+price18+","+itemId+")'> </td>\
										               <td> <input class='qtyTxt'  id='quantity0"+itemId+"' type='' name='' value='0'> </td>\
										               <td> <h4 class='subtotal' id='subtotal0"+itemId+"'>0.00</h4> </td>\
										               <td> <button id='btnAdd0"+itemId+"' class='btn' onclick='btnAdd("+itemId+")'>Add</button>\
										               <button id='btnUpdate0"+itemId+"' class='btn' onclick='btnUpdate("+itemId+",event)'>Update</button></td>\
										               <td><button id='btnRemove0"+itemId+"' class='btn' onclick='btnRemove("+itemId+")'>Remove</button></td>\
										          </tr>";

							//hiding buttons
							document.getElementById("btnUpdate0"+itemId).style.display="none";
							document.getElementById("btnRemove0"+itemId).disabled=true;

					

						 }

					

					}


					
				}
			}

		}
	}



})();



function checkButton(element,sizePrice,id){

  var subtotalHTML=document.getElementById("subtotal0"+id);
  element.checked = true;

  // element.className="active-radio";


  subtotalHTML.innerHTML=sizePrice.toFixed(2);

}

var array = [2, 5, 9];
var index = array.indexOf(5);

function btnAdd(id){

	if (index > -1) {
    	array.splice(index, 1);
	}

	// console.log(array);

	var btnAdd=document.getElementById("btnAdd0"+id);
	var btnUpdateHTML=document.getElementById("btnUpdate0"+id);	
	

	var subtotalHTML=parseInt(document.getElementById("subtotal0"+id).innerHTML);
	var quantityHTML=parseInt(document.getElementById("quantity0"+id).value);

	

	if(isNaN(quantityHTML) || quantityHTML===0 || subtotalHTML===0){

		if(isNaN(quantityHTML) || quantityHTML===0)
		{
			alert("Please add a quantity");
		}

		else if(subtotalHTML===0)
		{
			alert("Please select your preferred size");

		}
	

	}else{

	document.getElementById("btnRemove0"+id).disabled=false;


	var fixedTotal=subtotalHTML*quantityHTML;
	grandTotal+=fixedTotal;

	//pushing new data to cart data variable
	var cartData = {
		"id" : id,
		"total" : fixedTotal,
		"subtotal" : subtotalHTML,
		"qty":quantityHTML
	}
	

	finalCartData.push(cartData);

	totalPurchaseHTML.innerHTML=grandTotal.toFixed(2);

	//Change button add visibility when clicked!

	btnUpdateHTML.style.display="block";
	btnAdd.style.display="none";

	
	}

}


function btnUpdate(id,event){

	var btnUpdate = document.getElementById("btnUpdate0"+id);
	var subtotalHTML = parseInt(document.getElementById("subtotal0"+id).innerHTML);
	var quantityHTML=parseInt(document.getElementById("quantity0"+id).value);
	
	//quantity num holder
	var quan=$('#quantity0'+id);

	console.log(grandTotal);

	var tmpTotal=subtotalHTML*quantityHTML;
	//checking if quantity rendered is not a number or equal to zero

	if(isNaN(quantityHTML) || quantityHTML===0){
		//statement here

		if(quantityHTML===0){
			quan.val(1);
		}

	}else{

		//temporary variable for data
		var qtyData;
		var subtotalData;
		var total=0;



		for(var i = 0; i<finalCartData.length; i++){

			if(finalCartData[i].id==id){

				//changing final cart data old value to latest values
				finalCartData[i].qty=quantityHTML;
				finalCartData[i].subtotal=subtotalHTML;

				qtyData      = finalCartData[i].qty;
				subtotalData = finalCartData[i].subtotal;

				var prod=qtyData*subtotalData;

				
				if(tmpTotal!=prod){
					
				}else{
					
					//multiplying latest quantity and subtotal for subtotal
					finalCartData[i].total=prod;
						
					//updating grand total values
					total+=finalCartData[i].total;
			
				}

			}

			grandTotal=total;


		}
		
			//rendering grand total values to html
			totalPurchaseHTML.innerHTML=grandTotal.toFixed(2);

	}

}

function btnRemove(id){

	var grndTotal=0;
	var subtotal;
	var result;

	//to be render to HTML when items are removed
	var tmpSub=0;

	

	var btnAdd=document.getElementById("btnAdd0"+id);
	var btnUpdateHTML=document.getElementById("btnUpdate0"+id);	
	var btnRemove = document.getElementById("btnRemove0"+id);
	var subtotalHTML=document.getElementById("subtotal0"+id);
	var qtyHTML=$("#quantity0"+id);



	//Changing remove button accessibility to true
	document.getElementById("btnRemove0"+id).disabled=true;

	$(".radio0"+id).prop('checked', false);
	qtyHTML.val(0);

	
	for(var i=0;i<finalCartData.length;i++){

		if(finalCartData[i].id===id){
			//updating subtotal variable to be fetch from cart item
			subtotal=finalCartData[i].total;
		}

		
	}

	if(isNaN(grandTotal) || grandTotal<0){
		console.log("GrandTotal total not valid");
	}else{


		//subtracting grand total value to subtotal value of paired cart id
		var subTmp=grandTotal-subtotal;

		//Changing unit price to default value
	
		subtotalHTML.innerHTML=tmpSub.toFixed(2);
 

		//updating grand total value from subtracted value
		grandTotal=subTmp;


		//displaying grand total values to html
		totalPurchaseHTML.innerHTML=grandTotal.toFixed(2);


	}

	//Change button add visibility when clicked!
	
	btnUpdateHTML.style.display="none";
	btnAdd.style.display="block";


}