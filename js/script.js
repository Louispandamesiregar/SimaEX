document.addEventListener("DOMContentLoaded", function () {
  // =======================================================
  // 1. KURSOR KUSTOM & INTERAKSI
  // =======================================================
  const cursor = document.querySelector(".custom-cursor");
  if (cursor) {
    window.addEventListener("mousemove", (e) => {
      cursor.style.top = e.clientY + "px";
      cursor.style.left = e.clientX + "px";
    });

    const interactiveElements = document.querySelectorAll("a, button");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () =>
        cursor.classList.add("hover-active")
      );
      el.addEventListener("mouseleave", () =>
        cursor.classList.remove("hover-active")
      );
    });
  }

  // =======================================================
  // 2. ANIMASI TEKS DINAMIS (VERSI FINAL YANG STABIL)
  // =======================================================
  const animatedTitles = document.querySelectorAll(
    ".main-hero h1, .page-title-area h1"
  );
  if (animatedTitles.length > 0) {
    animatedTitles.forEach((title) => {
      if (title.classList.contains("js-title-animated")) return;

      let newHTML = "";
      let letterIndex = 0;
      for (let i = 0; i < title.innerHTML.length; i++) {
        let letter = title.innerHTML[i];
        if (letter === "<") {
          let closingTagIndex = title.innerHTML.indexOf(">", i);
          newHTML += title.innerHTML.substring(i, closingTagIndex + 1);
          i = closingTagIndex;
        } else {
          if (letter.trim() !== "") {
            newHTML += `<span class="letter" style="transition-delay: ${
              letterIndex * 0.04
            }s">${letter}</span>`;
            letterIndex++;
          } else {
            newHTML += letter;
          }
        }
      }
      title.innerHTML = newHTML;
      title.style.opacity = "1";

      setTimeout(() => {
        const spans = title.querySelectorAll("span.letter");
        spans.forEach((span) => {
          span.style.opacity = "1";
          span.style.transform = "translateY(0) scale(1)";
        });
        title.classList.add("js-title-animated");
      }, 100);
    });
  }

  // =======================================================
  // 3. EFEK PARALLAX PADA VIDEO BACKGROUND
  // =======================================================
  const parallaxVideo = document.querySelector(".fixed-video-background video");
  if (parallaxVideo) {
    let ticking = false;
    function handleScroll() {
      const scrollPosition = window.pageYOffset;
      parallaxVideo.style.transform = `translateY(${scrollPosition * 0.4}px)`;
    }

    document.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // =======================================================
  // 4. STICKY HEADER
  // =======================================================
  const header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 50);
    });
  }

  // =======================================================
  // 5. MOBILE NAVIGATION TOGGLE
  // =======================================================
  const navToggler = document.querySelector(".nav-toggler");
  const navLinks = document.querySelector(".nav-links");
  if (navToggler && navLinks) {
    navToggler.addEventListener("click", () => {
      navToggler.classList.toggle("active");
      navLinks.classList.toggle("active");
    });
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (navLinks.classList.contains("active")) {
          navToggler.classList.remove("active");
          navLinks.classList.remove("active");
        }
      });
    });
  }

  // =======================================================
  // 6. ACTIVE NAVIGATION LINK HIGHLIGHTING (Multi-Page)
  // =======================================================
  const navLinkItems = document.querySelectorAll(".nav-links .nav-link-item");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  if (navLinkItems.length > 0) {
    navLinkItems.forEach((link) => {
      const linkPage =
        link.getAttribute("href").split("/").pop() || "index.html";
      if (linkPage === currentPage) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  // =======================================================
  // 7. REVEAL ON SCROLL
  // =======================================================
  const revealElements = document.querySelectorAll(".content-section");
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    revealElements.forEach((el) => {
      el.classList.add("reveal-on-scroll");
      revealObserver.observe(el);
    });
  }

  // =======================================================
  // 8. FORM SUBMISSION HANDLERS (Placeholder)
  // =======================================================
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Terima kasih! (Fungsi pengiriman email belum diaktifkan)");
      contactForm.reset();
    });
  }
  const trackForm = document.querySelector(".track-form");
  if (trackForm) {
    trackForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const num = trackForm.querySelector("input").value;
      alert(`Sistem pelacakan untuk nomor resi ${num} sedang dikembangkan.`);
    });
  }

  // =======================================================
  // 9. UPDATE TAHUN DI FOOTER
  // =======================================================
  const currentYearSpan = document.getElementById("currentYear");
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // =======================================================
  // <<< KODE BARU DIMULAI DARI SINI >>>
  // =======================================================

  // Fungsi untuk memuat komponen HTML eksternal
  const loadComponent = (selector, url) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Gagal memuat: ${url}`);
        }
        return response.text();
      })
      .then((data) => {
        const element = document.querySelector(selector);
        if (element) {
          element.innerHTML = data;
        }
      })
      .catch((error) => console.error(error));

   
  };

      // Memanggil fungsi untuk memuat header dan footer
  loadComponent("#header-placeholder", "header.html");
  loadComponent("#footer-placeholder", "footer.html");

 
});
