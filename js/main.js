/* ==========================================================================
   🏥 main.js - السكربت الرئيسي وتفاعلات المستخدم
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. شاشة التحميل (Preloader)
    const loader = document.querySelector('.loader-wrapper');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
            }, 600);
        });
    }

    // 2. التحكم بالقائمة المتجاوبة للموبايل
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.className = 'fas fa-times';
                } else {
                    icon.className = 'fas fa-bars';
                }
            }
        });
        
        // إغلاق القائمة عند الضغط على أي رابط
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            });
        });
    }

    // 3. تأثير الهيدر عند التمرير (Navbar Scroll Effect)
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 4. تفعيل الوضع الداكن/الفاتح (Dark/Light Theme Toggle)
    const themeBtn = document.querySelector('.theme-toggle');
    if (themeBtn) {
        const icon = themeBtn.querySelector('i');
        
        // التحقق من التفضيل المحفوظ سابقاً أو الافتراضي للنظام
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        if (icon) {
            icon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
        
        themeBtn.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            let newTheme = 'light';
            
            if (theme === 'light') {
                newTheme = 'dark';
                if (icon) icon.className = 'fas fa-sun';
            } else {
                if (icon) icon.className = 'fas fa-moon';
            }
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // 5. تأثيرات الظهور عند التمرير (Scroll Reveal)
    const fadeElements = document.querySelectorAll('.fade-in');
    const revealOnScroll = () => {
        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top < windowHeight - 100) {
                el.classList.add('appear');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // تشغيل أولي لعناصر تظهر مباشرة بدون تمرير

    // 6. عداد الأرقام التفاعلي للإحصائيات (Counter Animation)
    const counters = document.querySelectorAll('.counter-val');
    const speed = 200; // سرعة العداد

    const runCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // تشغيل العداد فقط عند ظهور قسم الإحصائيات في الشاشة
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    runCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
});
