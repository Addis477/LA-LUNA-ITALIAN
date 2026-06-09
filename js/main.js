document.addEventListener('DOMContentLoaded', function() {
    
    // Page Transitions
    const transitionOverlay = document.querySelector('.page-transition');
    
    document.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href !== '#' && !href.startsWith('http') && !href.startsWith('https') && !href.startsWith('tel') && !href.startsWith('mailto')) {
            if (!link.classList.contains('whatsapp-float')) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    if (transitionOverlay) {
                        transitionOverlay.classList.add('active');
                        setTimeout(() => { window.location.href = href; }, 300);
                    } else {
                        window.location.href = href;
                    }
                });
            }
        }
    });
    
    if (transitionOverlay) {
        setTimeout(() => transitionOverlay.classList.remove('active'), 100);
    }
    
    window.addEventListener('pageshow', function() {
        if (transitionOverlay) transitionOverlay.classList.remove('active');
    });
    
    // AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true, offset: 100 });
    }
    
    // Mobile Sidebar
    const mobileSidebar = document.getElementById('mobileSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    
    function openSidebar() {
        mobileSidebar.classList.add('open');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeSidebar() {
        mobileSidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openSidebar);
    if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);
    
    document.querySelectorAll('.sidebar-nav a, .sidebar-order-btn').forEach(link => {
        link.addEventListener('click', closeSidebar);
    });
    
    // Toast
    window.showToast = function(message) {
        let toast = document.getElementById('toastMsg');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toastMsg';
            toast.className = 'toast-msg';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
    };
    
    // Active nav
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.desktop-nav a, .sidebar-nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) link.classList.add('active');
    });
});
