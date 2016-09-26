$(document).ready(function () {
  $('#employee-info').on('submit', function (event) {
    event.preventDefault();

    //Empty employee object
    var employee = {};
    //Serialized array from input fields to match html name
    //and input value in an element (object)
    var fields = $('#employee-info').serializeArray();
    //Log through each element (object) in the fields array
    //and take the value of 'name'property and the value
    //of 'value' property and assign them in the employee
    //object as new property: value pairs
    fields.forEach(function (element, index) {
      employee[element.name] = element.value;
    });

    //Clear inputs.
    $('#employee-info').find('input[type="text"]').val('');
    $('#employee-info').find('input[type="number"]').val('');

    //function to append the DOM and add info from the just
    //made employee object.
    addToDom(employee);

  });


  var totalSalary = 0;
  //Function to append employee's submitted info to the DOM
  function addToDom(empObject) {
    var $salary = parseInt(empObject.salary).toFixed(2);
    totalSalary += Number($salary);
    //function to change salary numbers into a pretty $ display
    //var $monthlyComp = makeDollars(totalSalary/12);
    var $monthlyComp = (totalSalary/12).toFixed(2);
    //variable used to add a unique class to all appended elements
    var tracker = empObject.idNumber;
    var $deleteButton = $('<button class=\"' + tracker + '\" id =\"delete\" type="button">Fire this one?</button>');
    //New li elements to be added.  Using class of idNumber to group all for removing them later.
    var $empFirst = $('<li class=\"' + tracker + '\">' + empObject.firstName + '</li>');
    var $empLast = $('<li class=\"' + tracker + '\">' + empObject.lastName + '</li>');
    var $empID = $('<li class=\"' + tracker + '\">' + empObject.idNumber + '</li>');
    var $empTitle = $('<li class=\"' + tracker + '\">' + empObject.jobTitle + '</li>');
    //var $empSalary = $('<li class=\"' + tracker + '\">' + makeDollars(empObject.salary) + '</li>');
    var $empSalary = $('<li class=\"' + tracker + '\">' + makeDollars($salary) + '</li>');


    //Add values to each column in Employee list area
    $('#firstName').append($empFirst);
    $('#lastName').append($empLast);
    $('#idNumber').append($empID);
    $('#jobTitle').append($empTitle);
    $('#salary').append($empSalary);
    $('#deleteList').append($deleteButton);
    //replace the value of the total salary
    $('#going-broke').text(makeDollars($monthlyComp));

    //Using .data() method to keep track of each employee's salary
    $('#salary').data(tracker, $salary);

  }

  //function to change salary numbers into a pretty version
  function makeDollars(moneyString) {
    //split up moenyString into dollars and sense
    var length = moneyString.length;
    var ending = moneyString.slice(-3, length);
    var moneyString = moneyString.substring(0, length - 3);

    //check dollars portion to see if commas must be added
    var moneyArray = moneyString.split('').reverse();
    var newArray = [];
    var counter = 0;
    for (var i = 0; i < moneyArray.length; i++) {
      newArray.push(moneyArray[i]);
      counter++;
      if (counter % 3 === 0 && counter !== moneyArray.length) {
        newArray.push(',');
      }
    }
    moneyArray = newArray.reverse();
    moneyArray.push(ending);
    moneyArray.unshift('$');
    moneyString = moneyArray.join('');
    return moneyString;
  }
  //Note!  This one cannot access a dynamically created button
  //because #delete does not yet exist in the DOM
  //Must anchor it to a pre-existing element to access
  //dynamic jQuery elements
  // $('#delete').click(function () {
  //   console.log("Some Button was clicked here");
  // })

  //This allows you to delete an entire class of dynamically created HTML data
  //including the delete button.
  $('#deleteList').on('click', '#delete', function () {
    // find the class of this button and delete it.
    var $trackerClass = $(this).attr('class');
    var $myClass = '.' + $trackerClass;
    var $myID = '#' + $(this).attr('id');

    var $mySalary = $('#salary').data($trackerClass);
    //using the .data() method instead of the below method to keep track of
    //each person's salary.
    //var mySalary = $('#salary').children(myClass).text();

    totalSalary -= parseInt($mySalary);
    var $monthlyComp = (totalSalary/12).toFixed(2);

    $('#going-broke').text(makeDollars($monthlyComp));
    $($myClass).remove();

  });

});
