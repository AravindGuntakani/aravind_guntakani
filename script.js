// script.js - navigation, CV-fallback, small UI niceties
document.addEventListener('DOMContentLoaded', function(){
  // nav open/close
  const nav = document.getElementById('mainNav');
  const navToggle = document.getElementById('navToggle');
  const navClose = document.getElementById('navClose');

  navToggle && navToggle.addEventListener('click', ()=> {
    nav.style.display = 'flex';
    nav.style.flexDirection = 'column';
  });

  navClose && navClose.addEventListener('click', ()=> {
    nav.style.display = '';
  });

  // close nav when link clicked (mobile)
  nav.querySelectorAll && nav.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', ()=> {
      if(window.innerWidth <= 980) nav.style.display = '';
    });
  });

  // set year in footer
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // CV download fallback:
  // Primary href is relative 'assets/Aravind_Guntakani_CV.pdf'.
  // If clicking fails (404), open the GitHub Pages absolute path.
  const cvBtn = document.getElementById('cvDownload');
  if(cvBtn){
    cvBtn.addEventListener('click', function(e){
      // try to fetch (HEAD) the relative resource first
      const href = cvBtn.getAttribute('href');
      const fallback = 'https://aravindguntakani.github.io/aravind_guntakani/assets/Aravind_Guntakani_CV.pdf';

      // Use fetch with HEAD to check quickly; if it fails, navigate to fallback.
      fetch(href, { method: 'HEAD' }).then(resp=>{
        if(resp.ok){
          // file exists — allow default download
          return;
        } else {
          // redirect to fallback absolute path
          e.preventDefault();
          window.location.href = fallback;
        }
      }).catch(()=> {
        e.preventDefault();
        window.location.href = fallback;
      });
    });
  }

  // small keyboard accessibility: close nav with escape
  document.addEventListener('keydown', (ev) => {
    if(ev.key === 'Escape' && window.innerWidth <= 980){
      nav.style.display = '';
    }
  });
});
