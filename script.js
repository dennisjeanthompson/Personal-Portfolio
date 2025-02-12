var allLinks = document.getElementsByTagName('a');
for(var i = 0; i < allLinks.length; i++) {
  var linkHref = allLinks[i].getAttribute('href');
  if(linkHref && linkHref.charAt(0) === '#') {
    allLinks[i].onclick = function(e) {
      if(e.preventDefault) { e.preventDefault(); } else { e.returnValue = false; }
      var targetId = this.getAttribute('href').substring(1);
      var targetElement = document.getElementById(targetId);
      if(targetElement) {
        var targetPosition = targetElement.offsetTop;
        basicSmoothScroll(targetPosition);
      }
    };
  }
}

function basicSmoothScroll(target) {
  var start = window.pageYOffset;
  var distance = target - start;
  var steps = 30;
  var step = distance / steps;
  var count = 0;
  var interval = setInterval(function() {
    if(count < steps) {
      window.scrollBy(0, step);
      count++;
    } else {
      clearInterval(interval);
    }
  }, 15);
}

// Active Navigation & Skill Bar Animation on Scroll
window.onscroll = function() {
  // Active Navigation Highlighting
  var sections = document.getElementsByTagName('section');
  var navLinks = [];
  for(var i = 0; i < allLinks.length; i++) {
    var href = allLinks[i].getAttribute('href');
    if(href && href.charAt(0) === '#') {
      navLinks.push(allLinks[i]);
    }
  }
  var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  for(var i = 0; i < sections.length; i++) {
    var section = sections[i];
    var sectionTop = section.offsetTop;
    var sectionHeight = section.offsetHeight;
    if(scrollPosition >= sectionTop - sectionHeight / 3) {
      for(var j = 0; j < navLinks.length; j++) {
        navLinks[j].className = navLinks[j].className.replace(" active", "");
      }
      var secId = section.getAttribute('id');
      for(var j = 0; j < navLinks.length; j++) {
        if(navLinks[j].getAttribute('href') === '#' + secId) {
          navLinks[j].className += " active";
        }
      }
    }
  }
  // Animate Skill Bars
  var skillsSection = document.getElementById('skills');
  if(skillsSection) {
    var rect = skillsSection.getBoundingClientRect();
    if(rect.top < window.innerHeight && rect.bottom >= 0) {
      var skillBars = document.getElementsByClassName('skill-bar');
      for(var i = 0; i < skillBars.length; i++) {
       
        if(!skillBars[i].getElementsByClassName('skill-fill').length) {
          var percent = skillBars[i].getAttribute('data-percent');
          var skillName = skillBars[i].getAttribute('data-skill');
          // Create and append label
          var label = document.createElement('div');
          label.className = 'skill-label';
          label.innerHTML = skillName + " " + percent + "%";
          skillBars[i].appendChild(label);
          // Create and append fill div
          var fill = document.createElement('div');
          fill.className = 'skill-fill';
          skillBars[i].appendChild(fill);
          // Set fill width (using a basic transition)
          fill.style.width = percent + "%";
        }
      }
    }
  }
};

// Contact Form Handling
var contactForm = document.getElementById('contact-form');
if(contactForm) {
  contactForm.onsubmit = function(e) {
    if(e.preventDefault) { e.preventDefault(); } else { e.returnValue = false; }
    alert("Thank you for your message! I will get back to you soon.");
    contactForm.reset();
  };
}


var projectCards = document.getElementsByClassName('project-card');
for(var i = 0; i < projectCards.length; i++) {
  projectCards[i].onmouseover = function() {
    this.style.transform = "translateY(-10px)";
  };
  projectCards[i].onmouseout = function() {
    this.style.transform = "translateY(0px)";
  };
}