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
            
            // 头像动画 - 使用更稳定的方式
            const profileImg = document.querySelector('.profile-img');
            if (profileImg) {
                // 确保头像初始可见
                profileImg.style.opacity = '1';
                profileImg.style.visibility = 'visible';
                profileImg.style.display = 'block';
                
                gsap.from('.profile-img', {
                    scale: 0.8,
                    opacity: 1, // 保持初始可见
                    duration: 1,
                    delay: 0.3,
                    ease: 'back.out(1.7)',
                    onComplete: function() {
                        // 动画完成后确保头像可见
                        if (profileImg) {
                            profileImg.style.opacity = '1';
                            profileImg.style.visibility = 'visible';
                            profileImg.style.display = 'block';
                        }
                    }
                });
            }
            
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

// 项目数据
const projectData = {
    '企业级生成式AI销售助手': {
        fullContent: [
            '针对传统CRM操作复杂、一线销售信息零散、记录效率低的痛点，搭建企业级 AI 销售助手',
            '通过智能线索分发与客户跟进助手，线索转化率提升 20%，客户运营效率提升 40%',
            '在客户问答场景中应用 Few Shots + CoT 策略，经8轮迭代将回答准确率从 78% 提升至 91%',
            '构建覆盖 2 万+ 销售对话的评测集，建立准确率、召回率、用户采纳率等多维指标',
            '建立关键错误场景收集与诊断机制，联合算法团队优化核心模块，系统稳定性提升至 99%'
        ],
        results: [
            { value: '60%', label: '信息获取耗时缩短' },
            { value: '80%', label: '纪要自动生成覆盖率' },
            { value: '91%', label: '回答准确率' },
            { value: '99%', label: '系统稳定性' }
        ]
    },
    'AI商机查重系统': {
        fullContent: [
            '主导设计并落地 AI 商机查重系统，覆盖商机新建、审批及查重环节',
            '成为各事业部标准化流程工具，商机审批平均耗时缩短70%',
            '重复商机录入率显著下降，提升数据质量和销售效率',
            '系统支持大规模并发处理，满足企业级应用需求'
        ],
        results: [
            { value: '70%', label: '审批耗时缩短' },
            { value: '显著', label: '重复录入率下降' },
            { value: '标准化', label: '流程工具化' }
        ]
    },
    '考前全真练': {
        fullContent: [
            '面向中考英语听说备考场景，打造家庭端全真模拟产品',
            '解决学生练习时间有限、缺乏真实考试环境的痛点',
            '产品上线首月销售额80万（单地市级），会员转化1万单',
            '提供个性化学习路径和智能评估反馈'
        ],
        results: [
            { value: '80万', label: '首月销售额' },
            { value: '1万单', label: '会员转化' },
            { value: '单地市级', label: '覆盖范围' }
        ]
    },
    '智能英语听说考试系统': {
        fullContent: [
            '响应教育部英语听说改革政策，解决机房兼容性差、人工评分效率低、缺乏全场景数据闭环问题',
            '系统覆盖12省、2800万考生、380万场考试',
            '市场占有率从17%升至29%，成为行业领先产品',
            '引入多引擎评分系统，评分准确率提升至95%'
        ],
        results: [
            { value: '12省', label: '覆盖省份' },
            { value: '2800万', label: '服务考生' },
            { value: '29%', label: '市场占有率' },
            { value: '95%', label: '评分准确率' }
        ]
    },
    'AI英语口语对话系统': {
        fullContent: [
            '针对 K12 学生"哑巴英语"、教师批改效率低及评估体系单一的问题',
            '打造行业首个全场景沉浸式 AI 口语教练',
            '学生口语能力提升15%，留存率提升25%，教师批改效率提升35%',
            '提供实时语音交互和个性化反馈'
        ],
        results: [
            { value: '15%', label: '口语能力提升' },
            { value: '25%', label: '留存率提升' },
            { value: '35%', label: '批改效率提升' }
        ]
    },
    'CRM内部系统优化': {
        fullContent: [
            '主导全链路优化与智能化升级，提升销售、服务效率及客户留存',
            '财务审核周期由72小时缩短至15分钟',
            '工单人工干预率降至5%，新商机模块人均销售产出提升18%',
            '优化跨部门协作流程，提升整体运营效率'
        ],
        results: [
            { value: '15分钟', label: '审核周期' },
            { value: '5%', label: '人工干预率' },
            { value: '18%', label: '销售产出提升' }
        ]
    },
    '智慧作业平台': {
        fullContent: [
            '打造 AI 驱动智慧作业平台，覆盖作业布置、批改、分析与反馈全流程',
            '教师平均批改时长由50分钟降至30分钟',
            '客观题自动批改准确率达98%，高频错题掌握率提升30%',
            '引入OCR+NLP技术，实现智能化作业处理'
        ],
        results: [
            { value: '30分钟', label: '平均批改时长' },
            { value: '98%', label: '自动批改准确率' },
            { value: '30%', label: '错题掌握率提升' }
        ]
    },
    '题库组卷系统': {
        fullContent: [
            '打造集题库管理、智能组卷与学情分析于一体的教育系统',
            '解决教师组卷效率低、题目版权分散及家长辅导资源不足问题',
            '上线3个月，DAU提升30%，教师MAU达1.2万，单月流水增长25%',
            '支持智能推荐和个性化组卷功能'
        ],
        results: [
            { value: '30%', label: 'DAU提升' },
            { value: '1.2万', label: '教师MAU' },
            { value: '25%', label: '流水增长' }
        ]
    }
};

// 打开项目弹窗
function openProjectModal(card) {
    const modal = document.getElementById('project-modal');
    const title = card.querySelector('h3').textContent;
    const description = card.querySelector('.project-description').textContent;
    const image = card.querySelector('img').src;
    const tags = Array.from(card.querySelectorAll('.project-tag')).map(tag => tag.textContent);
    
    const data = projectData[title] || { fullContent: [], results: [] };
    
    // 填充弹窗内容
    document.getElementById('modal-img').src = image;
    document.getElementById('modal-img').alt = title;
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-desc').textContent = description;
    
    // 填充标签
    const tagsContainer = document.getElementById('modal-tags');
    tagsContainer.innerHTML = tags.map(tag => `<span class="modal-tag">${tag}</span>`).join('');
    
    // 填充详细内容
    const detailsContainer = document.getElementById('modal-full-content');
    detailsContainer.innerHTML = `<ul>${data.fullContent.map(item => `<li>${item}</li>`).join('')}</ul>`;
    
    // 填充成果指标
    const resultsContainer = document.getElementById('modal-results');
    resultsContainer.innerHTML = data.results.map(result => `
        <div class="metric-item">
            <div class="metric-value">${result.value}</div>
            <div class="metric-label">${result.label}</div>
        </div>
    `).join('');
    
    // 显示弹窗
    modal.classList.add('active');
    document.body.classList.add('modal-open');
}

// 关闭项目弹窗
function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
}

// 项目卡片交互
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // 移除内联样式，让CSS控制hover效果
        card.style.transform = '';
        
        // 添加点击效果 - 打开弹窗
        card.addEventListener('click', function() {
            openProjectModal(this);
        });
    });
    
    // 绑定关闭弹窗事件
    const modal = document.getElementById('project-modal');
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    closeBtn.addEventListener('click', closeProjectModal);
    overlay.addEventListener('click', closeProjectModal);
    
    // ESC键关闭弹窗
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeProjectModal();
        }
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