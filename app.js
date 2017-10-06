var app = angular.module('app',[]);

//filter for to show data in word format on the web page
	app.filter('convertToWords', function() {
	  function isInteger(x) {
			return x % 1 === 0;
		}

	  return function(value) {
		if (value && isInteger(value)){
		  return  valueWithDecimal(value);
	  }
		else if (value && !isInteger(value)){
			return  valueWithDecimal(value);
		}
		return value;
	  };

	});
	
//directive for numbers validation
app.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9^.]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return 'Invalid Input';
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});



 app.directive('textMaxlength', function() {
      return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
          var maxlength = Number(attrs.textMaxlength);
          function fromUser(text) {
          if (text.length > maxlength) {
            var transformedInput = text.substring(0, maxlength);
            ngModelCtrl.$setViewValue(transformedInput);
            ngModelCtrl.$render();
            return transformedInput;
          }else{
			  
		  }
          return text;
          }
          ngModelCtrl.$parsers.push(fromUser);
        }
      }; 
    })

//Function for convert number to word
	function convertAmountToWords(amount) {
    var words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    amount = amount.toString();
    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var n_length = number.length;
    var wordString = "";
    if (n_length <= 9) {
        var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
        var received_n_array = new Array();
        for (var i = 0; i < n_length; i++) {
            received_n_array[i] = number.substr(i, 1);
        }
        for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
            n_array[i] = received_n_array[j];
        }
        for (var i = 0, j = 1; i < 9; i++, j++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                if (n_array[i] == 1) {
                    n_array[j] = 10 + parseInt(n_array[j]);
                    n_array[i] = 0;
                }
            }
        }
        value = "";
        for (var i = 0; i < 9; i++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                value = n_array[i] * 10;
            } else {
                value = n_array[i];
            }
            if (value != 0) {
                wordString += words[value] + " ";
            }
            if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                wordString += "Billon ";
            }
            if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                wordString += "Million ";
            }
            if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                wordString += "Thousand ";
            }
            if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                wordString += "Hundred and ";
            } else if (i == 6 && value != 0) {
                wordString += "Hundred ";
            }
        }
        wordString = wordString.split("  ").join(" ");
    }
    return wordString;
}

//function to convert decimal numbers into words
function valueWithDecimal(n) {
    var number = n.toString().split('.');	
    var whole = convertAmountToWords(number[0])
    if (number.length == 2) {
	if(number[1] == 0){
        return whole + 'dollars only ';
	}else if(number[1] != 0){
        var fraction = number[1] + '/100';
        return whole + 'and ' + fraction;
		}
    } else {
        return whole + 'dollars only ';
    }
}

	console.log(valueWithDecimal(51.32)) //Fifty One and Thirty Two
	console.log(valueWithDecimal(29.0))  //Twenty Nine
