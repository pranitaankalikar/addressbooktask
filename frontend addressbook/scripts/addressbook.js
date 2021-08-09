window.onload = function(){
	// Divs etc
	var totalpg;
	var addBookDiv = document.querySelector('.addbook');
    addBookDiv.innerHTML = '';
	var pageno =document.getElementById("pgnum");
	var prev =document.getElementById("prenum");
	var next =document.getElementById("nxtnum");
	loadData(0);
	function loadData(pg){
		
		addBookDiv.innerHTML = '';
	axios.get(`http://localhost:1000/contact/getcontact?page=${pg}&size=5`).then(response => {
        if(response.status === 200){
			response.data.contacts.forEach(element => {
				console.log(element);
                showAddressBook(element);
            });
			totalpg=response.data.totalpages;
        } else {
            throw new Error();
        }
    }).catch((err)=>{console.log(err)});
}
	// Buttons
	var quickAddBtn = document.getElementById('QuickAdd');
	var quickAddFormDiv = document.querySelector('.quickaddForm')
	var cancelBtn = document.getElementById('Cancel');
	var AddBtn = document.getElementById('Add');
	var cancleitem=document.getElementById("cancleitem");
	// Form Fields
	var filter=document.getElementById('filter');
	var fullname = document.getElementById('fullname');
	var phone = document.getElementById('phone');
	var address = document.getElementById('address');
	var city = document.getElementById('city');
	var email = document.getElementById('email');
	
	quickAddBtn.addEventListener("click", function(){
		// display the form div
		quickAddFormDiv.style.display = "block";
	});

	cancelBtn.addEventListener("click", function(){
		quickAddFormDiv.style.display = "none";
	});
	prev.addEventListener("click", function(){
		console.log("prev");
		if(Number(pageno.innerHTML)>1){
			pageno.innerHTML=Number(pageno.innerHTML)-1;
			loadData(Number(pageno.innerHTML)-1);
		}
	});
	next.addEventListener("click", function(){
		if(Number(pageno.innerHTML)<totalpg){
			pageno.innerHTML=Number(pageno.innerHTML)+1;
			loadData(Number(pageno.innerHTML)-1);
		}
		
	});
	cancleitem.addEventListener("click", function(){
		loadData();
		filter.value='';
		cancleitem.style.display="none";
	});

	AddBtn.addEventListener("click", addToBook);

	addBookDiv.addEventListener("click", removeEntry);
	// filter event
    filter.addEventListener('keyup',filterItemes);
	filter.addEventListener('click',filterItemesdown);



	// Storage Array
	var addressBook = [];


	//localStorage['addbook'] = '[{"fullname":"Sachin B","email":"sachin@frameboxx.in","phone":"93828292","address":"something","city":"Chandigarh"}]';

	function jsonStructure(fullname,phone,address,city,email){
		this.fullname = fullname;
		this.phone = phone;
		this.address = address;
		this.city = city;
		this.email = email;
	}

	function addToBook(){
		
		var isNull = fullname.value!='' && phone.value!='' && address.value!='' && city.value!='' && email.value!='';
		if(isNull){
			const contactInfo={
				fullname: fullname.value,
				phone: phone.value,
				address: address.value,
				city:city.value,
				email:email.value
			};
			console.log(contactInfo);
			axios.post('http://localhost:1000/contact/addcontact',contactInfo).then(result=>{

            console.log('added successfully');
			clearForm();
			quickAddFormDiv.style.display = "none";
            console.log(result.data.contact);
			showAddressBook(result.data.contact);
            //addNewExpenseto(result.data.expense);
            //console.log(document.querySelector('form'))
            //document.querySelector('form').reset();

        }).catch(err=>console.log(err));


			// format the input into a valid JSON structure
			// var obj = new jsonStructure(fullname.value,phone.value,address.value,city.value,email.value);
			// addressBook.push(obj);
			// localStorage['addbook'] = JSON.stringify(addressBook);
			// quickAddFormDiv.style.display = "none";
			
			// showAddressBook();
		}
	}

	function removeEntry(e){
		// Remove an entry from the addressbook
		if(e.target.classList.contains('delbutton')){
			var remID = e.target.getAttribute('data-id');
			console.log(remID);


			axios.delete(`http://localhost:1000/contact/deletecontact/${remID}`).then((response) => {
                if(response.status === 204){
                     removeExpensefromUI(remID);
                } 
				else {
                     throw new Error('Failed to delete');
                }
                })
				.catch((err => {showError(err);}));
			//addressBook.splice(remID,1);
			
			// localStorage['addbook'] = JSON.stringify(addressBook);
			// showAddressBook();
		}
	}
	function removeExpensefromUI(id){
		const contactElemId = `contact-${id}`;
            document.getElementById(contactElemId).remove();
	}

	function clearForm(){
		var formFields = document.querySelectorAll('.formFields');
		for(var i in formFields){
			formFields[i].value = '';
		}
	}

	function showAddressBook(element){
		const contactElemId = `contact-${element.id}`;
			// Loop over the array addressBook and insert into the page
				var str = `<div class="entry" id="${contactElemId}">`;
					str += '<div class="name"><p>' + element.fullname + '</p></div>';
					str += '<div class="email"><p>' + element.email + '</p></div>';
					str += '<div class="phone"><p>' + element.phone + '</p></div>';
					str += '<div class="address"><p>' + element.address + '</p></div>';
					str += '<div class="city"><p>' + element.city + '</p></div>';
					str += '<div class="del"><a href="#" class="delbutton" data-id="' + element.id + '">Delete</a></div>';
					str += '</div><br>';
				addBookDiv.innerHTML += str;
			
		
	}
	
	/////////////filter/////
    function filterItemes(e){
        ///convert text to lower case
        var text=e.target.value.toLowerCase();
        console.log(text);
		var formcontrol=document.getElementsByClassName("form-control");
		console.log(formcontrol);
		axios.post(`http://localhost:1000/contact/search/${text}`).then((response) => {
                console.log("successfull sent !!!");
				if(response.status === 200){
					addBookDiv.innerHTML = '';
					response.data.contacts.forEach(element => {
						//console.log(element);
						showAddressBook(element);
					});
				   
				} else {
					throw new Error();
				}
                
			
			})
				.catch((err => {showError(err);}));
        return console.log("heloooo")
}
    function filterItemesdown(){
		console.log("keydown");
		cancleitem.style.display="block";
		
	}

}