document.querySelector('nav a[href="/signup"]').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    
    // Redirect to signup.html
    window.location.href = '회원가입.html';
  });

  document.querySelector('nav a[href="/login"]').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    
    // Redirect to login.html
    window.location.href = '로그인.html';
  });