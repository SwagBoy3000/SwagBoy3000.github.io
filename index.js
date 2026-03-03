// Wait for SimpleBar to initialize
window.addEventListener('load', function() {
    const pageWrapper = document.querySelector('.page-wrapper');
    
    if (pageWrapper) {
        // Initialize SimpleBar
        const simpleBarInstance = new SimpleBar(pageWrapper, {
            autoHide: false
        });
        
        // Wait for SimpleBar to create its elements
        setTimeout(function() {
            const scrollContainer = document.querySelector('.simplebar-content-wrapper');
            
            if (scrollContainer) {
                // Initialize AOS
                AOS.init({
                    duration: 800,
                    easing: 'ease-in-out',
                    once: false,
                    mirror: true,
                    offset: 120,
                    scrollContainer: scrollContainer
                });
                
                // Refresh AOS on scroll
                scrollContainer.addEventListener('scroll', function() {
                    AOS.refresh();
                });
                
                AOS.refresh();
            }
            
            // Now run all your other scripts
            initializeFloatNav(scrollContainer || pageWrapper);
            initializeSmoothScroll(scrollContainer || pageWrapper);
            initializeResume();
            initializeDarkTheme(); // ✅ Add dark theme
            
        }, 300);
    }
});

// Dark theme toggle
// Dark theme toggle with localStorage
function initializeDarkTheme() {
    const themeBtn = document.querySelector('.nav_btn');
    
    // Check for saved theme preference on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme-variables');
        const icon = themeBtn.querySelector('i');
        icon.classList.remove('uil-moon');
        icon.classList.add('uil-sun');
    }
    
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme-variables');
            
            // Change icon
            const icon = themeBtn.querySelector('i');
            if (document.body.classList.contains('dark-theme-variables')) {
                icon.classList.remove('uil-moon');
                icon.classList.add('uil-sun');
                // Save preference
                localStorage.setItem('theme', 'dark');
            } else {
                icon.classList.remove('uil-sun');
                icon.classList.add('uil-moon');
                // Save preference
                localStorage.setItem('theme', 'light');
            }
        });
    }
}

// Float nav functionality
function initializeFloatNav(scrollContainer) {
    const FloatNavsBtn = document.querySelectorAll('.float_nav a');
    const sections = document.querySelectorAll('section, header');
    
    const removeActiveClass = () => {
        FloatNavsBtn.forEach(Btn => {
            Btn.classList.remove('active');
        });
    };
    
    FloatNavsBtn.forEach((Btn) => {
        Btn.addEventListener('click', () => {
            removeActiveClass();
            Btn.classList.add('active');
        });
    });
    
    if (scrollContainer) {
        scrollContainer.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                
                if (scrollContainer.scrollTop >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            FloatNavsBtn.forEach(link => {
                link.classList.remove('active');
                
                if (link.getAttribute('href') === `#${current}` || 
                    (current === '' && link.getAttribute('href') === '#home')) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// Smooth scroll functionality
function initializeSmoothScroll(scrollContainer) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target && scrollContainer) {
                scrollContainer.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Resume section functionality
function initializeResume() {
    const right = document.querySelector('.right');
    
    const expContent = `<h4>Experience</h4>
                    <p>Practical experience and leadership roles.</p>
                    <ul>
                        <li><h6>2024</h6><h5>NAOI Competition Monitor</h5><p>National C++ Programming Competition (NAOI) - Supervised participants, detected prohibited libraries and ensured programming standards compliance. Developed attention to detail and understanding of best practices.</p></li>
                        <li><h6>Previous</h6><h5>Mobile Repair Training</h5><p>Technical training that reinforced problem-solving methodologies. Skills now applied to software debugging and optimization.</p></li>
                    </ul>`;
    
    const eduContent = `<h4>Education</h4>
                    <p>Academic background and qualifications.</p>
                    <ul>
                        <li><h6>2021 - Present</h6><h5>Computer Science</h5><p>Université des Sciences et de la Technologie Houari Boumediene (USTHB), Algiers, Algeria. Focusing on software development and system architecture.</p></li>
                    </ul>`;
    
    const skillsContent = `<h4>Technical Skills</h4>
                    <p>Technologies and tools I work with.</p>
                    <ul>
                        <li><h5>Languages</h5><p>C, C++, Java, Python, JavaScript, HTML/CSS</p></li>
                        <li><h5>Frameworks</h5><p>React.js, Express.js, Node.js</p></li>
                        <li><h5>Databases</h5><p>MySQL, MongoDB</p></li>
                        <li><h5>Tools</h5><p>VS Code, Git, GitHub, Office Suite</p></li>
                    </ul>`;
    
    const aboutContent = `<h4>About Me</h4>
                    <p>More about who I am.</p>
                    <ul>
                        <li><h5>Passion</h5><p>Passionate about coding since childhood, enjoy helping colleagues with programming and sharing knowledge</p></li>
                        <li><h5>Interests</h5><p>Full-stack development, Python tools, and open source contributions</p></li>
                    </ul>`;
    
    const left = document.querySelectorAll('.left button');
    
    const removePrimaryClass = () => {
        left.forEach(Btn => {
            Btn.classList.remove('primary');
        });
    };
    
    left.forEach((Btn) => {
        Btn.addEventListener('click', () => {
            removePrimaryClass();
            Btn.classList.add('primary');
            
            if (Btn.classList.contains('Experience')) {
                right.innerHTML = expContent;
            } else if (Btn.classList.contains('education')) {
                right.innerHTML = eduContent;
            } else if (Btn.classList.contains('skills')) {
                right.innerHTML = skillsContent;
            } else if (Btn.classList.contains('about')) {
                right.innerHTML = aboutContent;
            }
        });
    });
    
    if (right) {
        right.innerHTML = expContent;
    }
}

// MixItUp functionality - Disabled
// function initializeMixItUp() {
//     const containerEl = document.querySelector('.projects_container');
//     if (containerEl && typeof mixitup !== 'undefined') {
//         let mixer = mixitup(containerEl);
//     }
// }