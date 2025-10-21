
// Exercise 6
const validate = () => {
	// Get the input fields
	const fName = document.getElementById("fName");
	const fLastN = document.getElementById("fLastN");
	const fEmail = document.getElementById("fEmail");
	const fPassword = document.getElementById("fPassword");
	const fAddress = document.getElementById("fAddress");
	const fPhone = document.getElementById("fPhone");

	let error = 0;
	const onlyLetter = /^[A-Za-z ]+$/;
	const onlyNumbers = /^[0-9]+$/;
	const valPassw = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/;
	const valMail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	const notOnlyLetter = /^[a-zA-Z0-9/ ]+$/;
	
	const camps = [
		{ input: fName, validateCamp : () => fName.value.trim().length < 3 || !onlyLetter.test(fName.value) },
	 	{ input: fLastN, validateCamp : () => fLastN.value.trim().length < 3 || !onlyLetter.test(fLastN.value) },
	 	{ input: fEmail, validateCamp : () => fEmail.value.trim().length < 3 || !valMail.test(fEmail.value) },
	 	{ input: fPassword, validateCamp : () => fPassword.value.trim().length < 3 || !valPassw.test(fPassword.value) },
	 	{ input: fAddress, validateCamp : () => fAddress.value.trim().length < 3 || !notOnlyLetter.test(fAddress.value) },
	 	{ input: fPhone, validateCamp : () => fPhone.value.trim().length != 9 || !onlyNumbers.test(fPhone.value) }]

	camps.forEach(({input, validateCamp}) => {
		if (validateCamp()) {	
			error ++;
			input.classList.add('is-invalid');
			input.classList.remove('is-valid');
		} else {
			input.classList.remove('is-invalid');
			input.classList.add('is-valid')
		}
	})

	if (error == 0 ) { alert("Form submitted successfully") }
}

const saveForm = document.querySelector('.form');
if (saveForm) { 
	saveForm.addEventListener('submit', (event) => { 
		event.preventDefault();
		validate() }); 
	}

