'use strict';


var form = document.querySelector('.request_form'),	
	validateBtn = form.querySelector('.request_form__btn'),
	form_email = form.querySelector('.request_form__email'),
	form_name = form.querySelector('.request_form__name'),
	form_country = form.querySelector('.request_form__country'),
	form_checkbox = form.querySelector('.request_form__checkbox'),
	fields = form.querySelectorAll('.field'),
	errors_count = 0;


var email_regxp = /^\w+@\w+\.\w{2,4}$/i;
var name_regxp = /^[a-zа-яё -]*$/i;


var genError = function (text, obj) {
	var error = document.createElement('div');

	error.className = 'error';
	error.innerHTML = text;
	obj.parentElement.insertBefore(error, obj);
	obj.parentElement.parentElement.classList.remove('request_form__field-success');
	obj.parentElement.parentElement.classList.add('request_form__field-error');
	errors_count += 1;
}

form.addEventListener('keyup', function (event) {
	for (var i = 0; i < fields.length; i++) { //check blank fields
		if (!fields[i].value) {
			fields[i].parentElement.parentElement.classList.remove('request_form__field-notempty');
		} else {
			fields[i].parentElement.parentElement.classList.add('request_form__field-notempty');
		}
	}
})

form.addEventListener('submit', function (event) {
	var errors = form.querySelectorAll('.error')

	for (var i = 0; i < errors.length; i++) { // remove old errors
	    errors[i].parentElement.parentElement.classList.remove('request_form__field-error');
	    errors[i].parentElement.parentElement.classList.remove('request_form__field-success');
	    errors[i].remove();
	}


	for (var i = 0; i < fields.length; i++) { //check blank fields
		if (!fields[i].value) {
			var error = genError('Field cannot be blank', fields[i]);
		} else {
			fields[i].parentElement.parentElement.classList.add('request_form__field-success');
		}
	}


	if (!email_regxp.test(form_email.value)) { //check email field
		var error = genError('Enter correct E-Mail', form_email);
	} else {
		form_email.parentElement.parentElement.classList.add('request_form__field-success');
	}


	if (!name_regxp.test(form_name.value) || !form_name.value ) { //check name field
		var error = genError('Enter correct name', form_name);
	} else {
		form_name.parentElement.parentElement.classList.add('request_form__field-success');
	}


	if (!form_checkbox.checked) { //check checkbox
		var error = genError('Enter correct E-Mail', form_checkbox);
	} else {
		form_checkbox.parentElement.parentElement.classList.add('request_form__field-success');
	}


	if (errors_count > 0) {
		console.log(errors_count)
		event.preventDefault()
	} else { 
		form.submit()
	}
		
});


$(function(){ // Clear input
	$('.clear_field').on('click', function(){
		$(this).prev().val('');
		$(this).closest('.request_form__field-notempty').removeClass('request_form__field-notempty')
	})
})

$(function(){ // Close errors
	$(document).mouseup(function (e){
		var div = $(".request_form .error");
		if (!div.is(e.target) 
		    && div.has(e.target).length === 0) { 
			div.fadeOut();
		}
	});
})


$(function(){ // modals
	$('.posts_item__link').on('click', function(){
		$('#modal .modal-content').empty();

		$('#modal .modal-content').load('modal_content.html', function() {
			$('#modal').modal('show')
		});
	})
})

$(function(){ // Init styled secects
	$('select').selectbox();
})

