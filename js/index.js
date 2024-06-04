// -------------------------------------------clock start-------------------------//
const displayTime = document.querySelector(".display-time");
// Time
function showTime() {
  let time = new Date();
  displayTime.innerText = time.toLocaleTimeString("en-US", { hour12: false });
  setTimeout(showTime, 1000);
}

showTime();

// Date
function updateDate() {
  let today = new Date();

  // return number
  let dayName = today.getDay(),
    dayNum = today.getDate(),
    month = today.getMonth(),
    year = today.getFullYear();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayWeek = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
  
    // Get the suffix for the day number
    function getDaySuffix(day) {
      if (day >= 11 && day <= 13) {
        return "th";
      }
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    }

  // value -> ID of the html element
  const IDCollection = ["day", "daynum", "month", "year"];
  // return value array with number as a index
  const val = [dayWeek[dayName], dayNum + getDaySuffix(dayNum), months[month], year];
  for (let i = 0; i < IDCollection.length; i++) {
    document.getElementById(IDCollection[i]).firstChild.nodeValue = val[i];
  }
}

updateDate();
//-------------------------------------------clock ends-------------------------------------//
//----------------------------------offline------------------------//
const check =document.getElementById("status");
if(navigator.onLine){
  // check.innerHTML='<div class="online"> you are  back online</div>';
}else{
  // alert("you are offline");
  check.innerHTML='<div class="offline"> you are offline</div>';
  setTimeout(() => {
    check.innerHTML="";
  }, "3000");
  
}
//----------------------------------offline------------------------//

//-------------------------------------------------animations-------------------------------//
const Observer =new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    if(entry.isIntersecting){
      entry.target.classList.add('show');

    }else{
      entry.target.classList.remove('show');
    }
  });
});
const hiddenelements1 =document.querySelectorAll('.hidden1');
const hiddenelements =document.querySelectorAll('.hidden');
hiddenelements.forEach(
  (el)=> Observer.observe(el)
);
hiddenelements1.forEach(
  (el)=> Observer.observe(el)
);
//------------------------------------ animations ends------------------------------------------//

// ------------------------------------send mail-----------------------------------------------//
const scriptURL = 'https://script.google.com/macros/s/AKfycbz261LqFxIzgTLWuDxeJlyUEyAN71gtDS_nKFSrZrt-k7owPUyySUlU-NNBtgvY42G9/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")
form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
      msg.innerHTML ="message sent successfully"
      setTimeout(function(){
        msg.innerHTML=""
      },5000)
      form.reset()
})
    .catch(error => console.error('Error!', error.message))
})
//--------------------------------------Sens send mail-------------------------------------------//
//---------------------To TOP -------------------------------------------------------------//
// Get the button
let mybutton = document.getElementById("top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
//--------------------------end of top-------------------------------------------------//
