fetch('http://localhost:3000/auth/logout');

const logout = document.querySelector('#logout-btn');
if (logout) {
  logout.addEventListener('click', async () => {
    try {
      await fetch('/auth/logout', { method: 'POST' });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  });
}
