const Regex = {
	persianAlphabets: new RegExp(/[\s\u0600-\u06FF]/),
	englishAlphabets: new RegExp(/[A-Za-z\xf6-\xf8\xe5]+[A-Za-z\xf6-\xf8\xe50-9]*/),
	email: new RegExp(/(^\s*$)|(^([\w.-]+)@([\w-]+)((\.(\w){2,3})+)$)/),
	phoneNumber: new RegExp(/(^\s*$)|(^0\d{2,3}\d{8}$)/),
	mobileNumber: new RegExp(/(^\s*$)|(^09[0-9]{9}$)/),
	postCode: new RegExp(/(^\s*$)|(^\d{10}$)/),
	firstSpaceBlock: new RegExp(/^[^ ](.*|\n|\r|\r\n)*/),
	number: new RegExp(/(^[\s/0-9]*$)/),
	password: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/),
};

export default Regex;
