// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有交互效果
    initNavbar();
    initScrollAnimations();
    initSmoothScroll();
    initSkillBars();
    initProjectCards();
    initContactForm();
});

// 导航栏交互
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');

    // 滚动时导航栏样式变化
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 移动端菜单切换
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // 汉堡菜单动画
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'rotate(0) translate(0, 0)';
        spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translate(5px, -5px)' : 'rotate(0) translate(0, 0)';
    });

    // 点击导航链接后关闭菜单
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            
            // 重置汉堡菜单样式
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'rotate(0) translate(0, 0)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0) translate(0, 0)';
        });
    });
}

// 滚动动画
function initScrollAnimations() {
    try {
        // 使用Intersection Observer API实现元素进入视口时的动画
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // 观察所有需要动画的元素
        const animatedElements = document.querySelectorAll('.fade-in');
        animatedElements.forEach(el => {
            observer.observe(el);
        });

        // 使用GSAP实现更复杂的滚动动画
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            
            // 首页标题动画
            gsap.from('.home-title', {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power2.out'
            });
            
            gsap.from('.home-subtitle', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                delay: 0.2,
                ease: 'power2.out'
            });
            
            gsap.from('.home-description', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                delay: 0.4,
                ease: 'power2.out'
            });
            
            gsap.from('.home-buttons', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                delay: 0.6,
                ease: 'power2.out'
            });
            
            gsap.from('.profile-img', {
                scale: 0.8,
                opacity: 0,
                duration: 1,
                delay: 0.3,
                ease: 'back.out(1.7)'
            });
            
            // 技能条动画
            gsap.from('.skill-progress', {
                width: 0,
                duration: 1.5,
                ease: 'power2.out',
                stagger: 0.1,
                scrollTrigger: {
                    trigger: '.skills',
                    start: 'top 70%',
                    end: 'bottom 30%',
                    toggleActions: 'play none none reverse'
                }
            });
            
            // 项目卡片动画
            gsap.from('.project-card', {
                y: 50,
                opacity: 1, // 保持初始可见，只做位置动画
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.projects',
                    start: 'top 80%', // 调整触发位置，确保动画能正确触发
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            });
            
            // 时间线项目动画
            gsap.from('.timeline-item', {
                x: -50,
                opacity: 1, // 保持初始可见，只做位置动画
                duration: 0.8,
                stagger: 0.3,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.education-timeline, .experience-timeline',
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            });
        }
    } catch (error) {
        console.error('滚动动画初始化失败:', error);
        // 确保所有关键元素可见
        const visibleElements = document.querySelectorAll('.project-card, .timeline-item, .skill-item');
        visibleElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.transform = 'translateX(0)';
        });
    }
}

// 平滑滚动
function initSmoothScroll() {
    // 为所有锚点链接添加平滑滚动
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // 考虑导航栏高度
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 技能条动画
function initSkillBars() {
    // 当技能部分进入视口时，为技能条添加动画类
    const skillsSection = document.querySelector('.skills');
    const skillProgresses = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillProgresses.forEach(progress => {
                    const width = progress.style.width;
                    progress.style.width = '0';
                    
                    // 使用setTimeout确保样式更新
                    setTimeout(() => {
                        progress.style.width = width;
                    }, 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    observer.observe(skillsSection);
}

// 项目卡片交互
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // 添加点击效果
        card.addEventListener('click', function() {
            this.style.transform = 'translateY(-5px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            }, 150);
        });
    });
}

// 联系表单交互 - 已删除表单，保留函数结构以避免错误
function initContactForm() {
    // 联系表单已删除，此函数保留以避免初始化错误
    return;
}

// 添加滚动进度指示器
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        z-index: 9999;
        width: 0%;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// 初始化滚动进度指示器
addScrollProgress();

// 为所有可交互元素添加悬停效果
function initHoverEffects() {
    const interactiveElements = document.querySelectorAll('.nav-link, .btn, .skill-tag, .social-link, .project-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// 初始化悬停效果
initHoverEffects();

// 响应式调整
function initResponsiveAdjustments() {
    function adjustLayout() {
        const width = window.innerWidth;
        
        // 根据屏幕宽度调整某些元素样式
        if (width < 768) {
            // 移动端特定调整
            document.documentElement.style.setProperty('--font-size-base', '16px');
        } else {
            document.documentElement.style.setProperty('--font-size-base', '18px');
        }
    }
    
    // 初始调整
    adjustLayout();
    
    // 窗口大小变化时调整
    window.addEventListener('resize', adjustLayout);
}

// 初始化响应式调整
initResponsiveAdjustments();

// 添加页面加载动画
window.addEventListener('load', function() {
    // 隐藏加载指示器（如果有的话）
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
    
    // 页面加载完成后的动画
    document.body.style.opacity = '1';
});

// 键盘导航支持
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC键关闭菜单
        if (e.key === 'Escape') {
            const navLinks = document.querySelector('.nav-links');
            const hamburger = document.querySelector('.hamburger');
            
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                
                // 重置汉堡菜单样式
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'rotate(0) translate(0, 0)';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'rotate(0) translate(0, 0)';
            }
        }
    });
}

// 初始化键盘导航
initKeyboardNavigation();

// 图片懒加载
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src || image.src;
                    image.classList.remove('lazy');
                    imageObserver.unobserve(image);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img.lazy');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// 初始化图片懒加载
initLazyLoading();

// 添加页面访问统计（可选）
function addPageViewTracking() {
    // 这里可以添加Google Analytics或其他统计代码
    console.log('Page viewed:', window.location.pathname);
}

// 初始化页面访问统计
addPageViewTracking();