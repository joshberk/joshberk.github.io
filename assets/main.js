        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            lucide.createIcons();
        } else {
            document.addEventListener('DOMContentLoaded', () => {
                if (window.lucide && typeof window.lucide.createIcons === 'function') {
                    lucide.createIcons();
                }
            });
        }

        // Browser compatibility and debugging
        
        // Check for common styling issues
        
        // Security monitoring and XSS protection
        (function() {
            // Input sanitization function
            function sanitizeInput(input) {
                if (typeof input !== 'string') return '';
                return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                            .replace(/[<>&"']/g, function(match) {
                                const escape = {
                                    '<': '&lt;',
                                    '>': '&gt;',
                                    '&': '&amp;',
                                    '"': '&quot;',
                                    "'": '&#x27;'
                                };
                                return escape[match];
                            });
            }
            
            // Make sanitization globally available
            window.sanitizeInput = sanitizeInput;
            
            // XSS protection - monitor document.write
            const originalWrite = document.write;
            document.write = function(content) {
                if (/<script|javascript:|data:/i.test(content)) {
                    return;
                }
                originalWrite.apply(document, arguments);
            };
            
            // Monitor for suspicious DOM modifications
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeName === 'SCRIPT' && 
                            !node.src.includes('cdn.tailwindcss.com') && 
                            !node.src.includes('unpkg.com') &&
                            !node.src.includes('fonts.googleapis.com') &&
                            node.src && !node.src.includes(window.location.hostname)) {
                        }
                    });
                });
            });
            
            if (document.body) {
                observer.observe(document.body, {
                    childList: true,
                    subtree: true
                });
            }
        })();

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    if (entry.target.querySelector('.progress-fill')) {
                        const progressBars = entry.target.querySelectorAll('.progress-fill');
                        progressBars.forEach((bar, index) => {
                            setTimeout(() => {
                                bar.classList.add('animate');
                            }, index * 200);
                        });
                    }
                    
                    if (entry.target.classList.contains('timeline-content')) {
                        entry.target.classList.add('visible');
                    }
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .timeline-content');
        animatedElements.forEach(el => observer.observe(el));

        function createParticles() {
            const particlesContainer = document.querySelector('.particles');
            if (!particlesContainer) return;
            
            const particleCount = 15;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                const size = Math.random() * 8 + 4;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                
                // Random position
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
                
                particlesContainer.appendChild(particle);
            }
        }

        class CyberSecurityAnimation {
            constructor() {
                this.nodes = [];
                this.connections = [];
                this.terminals = [];
                this.isActive = true;
                this.nodeCount = 20;
                
                this.matrixChars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*(){}[]<>?/\\|~`';
                this.cryptoSymbols = ['AES', 'RSA', 'SHA', 'MD5', 'DES', 'SSL', 'TLS', 'PKI', 'DSA', 'ECC', 'PGP', 'GPG', 'HMAC', 'PBKDF', 'ECDSA', 'X509', 'CA', 'CSR', 'CRL', 'OCSP', 'HSM', 'KDF', 'IV', 'SALT', 'NONCE'];
                
                this.terminalCommands = [
                    {
                        title: 'Network Scanner',
                        commands: [
                            { type: 'prompt', text: 'root@kali:~# ' },
                            { type: 'command', text: 'nmap -sS -O 192.168.1.0/24' },
                            { type: 'success', text: 'Starting Nmap 7.94 ( https://nmap.org )' },
                            { type: 'success', text: 'Host is up (0.001s latency).' },
                            { type: 'warning', text: '22/tcp   open  ssh' },
                            { type: 'warning', text: '80/tcp   open  http' },
                            { type: 'error', text: '443/tcp  open  https' }
                        ]
                    },
                    {
                        title: 'Threat Hunter',
                        commands: [
                            { type: 'prompt', text: 'analyst@soc:~$ ' },
                            { type: 'command', text: 'python3 threat_hunter.py --scan' },
                            { type: 'success', text: 'Initializing threat detection...' },
                            { type: 'warning', text: 'Suspicious process detected: PID 1337' },
                            { type: 'error', text: 'ALERT: Potential lateral movement' },
                            { type: 'success', text: 'IOC analysis complete' }
                        ]
                    },
                    {
                        title: 'Cryptography',
                        commands: [
                            { type: 'prompt', text: 'crypto@lab:~$ ' },
                            { type: 'command', text: 'openssl enc -d -aes-256-cbc -in secret.enc' },
                            { type: 'success', text: 'Decryption successful' },
                            { type: 'command', text: 'hashcat -m 1000 hash.txt wordlist.txt' },
                            { type: 'warning', text: 'Cracking NTLM hashes...' },
                            { type: 'success', text: 'Password recovered: [REDACTED]' }
                        ]
                    },
                    {
                        title: 'Penetration Testing',
                        commands: [
                            { type: 'prompt', text: 'pentester@kali:~# ' },
                            { type: 'command', text: 'msfconsole -q' },
                            { type: 'success', text: 'Metasploit Framework loaded' },
                            { type: 'command', text: 'use exploit/multi/handler' },
                            { type: 'warning', text: 'Payload set to windows/meterpreter/reverse_tcp' },
                            { type: 'error', text: 'Session 1 opened (192.168.1.10:4444)' }
                        ]
                    }
                ];
            }
            
            init() {
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    return;
                }
                
                this.initMatrixRain();
                this.initNetworkGraph();
                this.initCryptoLayer();
                this.initTerminalWindows();
                this.initDataStreams();
                this.initNodeTooltips();
                
                this.startAnimationLoop();
            }
            
            initMatrixRain() {
                const matrixContainer = document.getElementById('matrixRain');
                if (!matrixContainer) return;
                
                const columnCount = Math.floor(window.innerWidth / 20);
                
                for (let i = 0; i < columnCount; i++) {
                    this.createMatrixColumn(matrixContainer, i);
                }
            }
            
            createMatrixColumn(container, index) {
                const column = document.createElement('div');
                column.className = 'matrix-column';
                column.style.left = (index * 20) + 'px';
                
                const height = Math.random() * 200 + 100;
                const speed = Math.random() * 3 + 2;
                
                let text = '';
                for (let i = 0; i < height / 20; i++) {
                    text += this.matrixChars[Math.floor(Math.random() * this.matrixChars.length)] + '\n';
                }
                
                column.textContent = text;
                column.style.animationDuration = speed + 's';
                column.style.animationDelay = Math.random() * 2 + 's';
                column.style.opacity = Math.random() * 0.5 + 0.3;
                
                container.appendChild(column);
                
                setTimeout(() => {
                    if (column.parentNode && this.isActive) {
                        column.remove();
                        this.createMatrixColumn(container, index);
                    }
                }, (speed + Math.random() * 2) * 1000);
            }
            
            initNetworkGraph() {
                const networkContainer = document.getElementById('networkGraph');
                if (!networkContainer) return;
                
                for (let i = 0; i < this.nodeCount; i++) {
                    this.createNetworkNode(networkContainer, i);
                }
                
                setTimeout(() => {
                    this.createConnections(networkContainer);
                }, 100);
            }
            
            createNetworkNode(container, index) {
                const node = document.createElement('div');
                const types = ['endpoint', 'server', 'router', 'compromised'];
                const type = types[Math.floor(Math.random() * types.length)];
                
                node.className = `network-node ${type}`;
                node.dataset.nodeId = index;
                node.dataset.nodeType = type;
                
                const x = Math.random() * 90 + 5;
                const y = Math.random() * 90 + 5;
                
                node.style.left = x + '%';
                node.style.top = y + '%';
                
                const ip = `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
                const os = ['Windows 10', 'Ubuntu 20.04', 'CentOS 7', 'macOS 12.0'][Math.floor(Math.random() * 4)];
                
                node.dataset.ip = ip;
                node.dataset.os = os;
                node.dataset.status = type === 'compromised' ? 'COMPROMISED' : 'ONLINE';
                
                this.nodes.push({
                    element: node,
                    x: x,
                    y: y,
                    type: type,
                    ip: ip,
                    os: os
                });
                
                container.appendChild(node);
            }
            
            createConnections(container) {
                const maxConnections = Math.min(this.nodes.length * 2, 30);
                
                for (let i = 0; i < maxConnections; i++) {
                    const node1 = this.nodes[Math.floor(Math.random() * this.nodes.length)];
                    const node2 = this.nodes[Math.floor(Math.random() * this.nodes.length)];
                    
                    if (node1 !== node2) {
                        this.createConnection(container, node1, node2);
                    }
                }
            }
            
            createConnection(container, node1, node2) {
                const connection = document.createElement('div');
                connection.className = 'network-connection';
                
                const deltaX = node2.x - node1.x;
                const deltaY = node2.y - node1.y;
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
                
                connection.style.left = node1.x + '%';
                connection.style.top = node1.y + '%';
                connection.style.width = distance + '%';
                connection.style.transform = `rotate(${angle}deg)`;
                connection.style.animationDelay = Math.random() * 3 + 's';
                
                container.appendChild(connection);
                this.connections.push(connection);
            }
            
            initCryptoLayer() {
                const cryptoContainer = document.getElementById('cryptoLayer');
                if (!cryptoContainer) return;
                
                this.createCryptoSymbols(cryptoContainer);
            }
            
            createCryptoSymbols(container) {
                const symbol = document.createElement('div');
                symbol.className = 'crypto-symbol';
                symbol.textContent = this.cryptoSymbols[Math.floor(Math.random() * this.cryptoSymbols.length)];
                symbol.style.top = Math.random() * 100 + '%';
                symbol.style.animationDuration = (Math.random() * 10 + 10) + 's';
                
                container.appendChild(symbol);
                
                setTimeout(() => {
                    if (symbol.parentNode && this.isActive) {
                        symbol.remove();
                        this.createCryptoSymbols(container);
                    }
                }, 15000);
            }
            
            initTerminalWindows() {
                this.createTerminalWindow();
            }
            
            createTerminalWindow() {
                const container = document.getElementById('terminalWindows');
                if (!container || !this.isActive) return;
                
                const terminalData = this.terminalCommands[Math.floor(Math.random() * this.terminalCommands.length)];
                const terminal = document.createElement('div');
                terminal.className = 'terminal-window';
                
                // Random position
                terminal.style.left = Math.random() * 60 + 20 + '%';
                terminal.style.top = Math.random() * 60 + 20 + '%';
                
                // Create header
                const header = document.createElement('div');
                header.className = 'terminal-header';
                header.innerHTML = `
                    <div class="terminal-button close"></div>
                    <div class="terminal-button minimize"></div>
                    <div class="terminal-button maximize"></div>
                    <div class="terminal-title">${terminalData.title}</div>
                `;
                
                // Create content
                const content = document.createElement('div');
                content.className = 'terminal-content';
                
                terminal.appendChild(header);
                terminal.appendChild(content);
                container.appendChild(terminal);
                
                // Type commands with delay
                let delay = 0;
                terminalData.commands.forEach((cmd, index) => {
                    setTimeout(() => {
                        const line = document.createElement('div');
                        line.className = `terminal-line terminal-${cmd.type}`;
                        line.textContent = cmd.text;
                        line.style.animationDelay = (index * 0.1) + 's';
                        content.appendChild(line);
                    }, delay);
                    delay += cmd.type === 'command' ? 1000 : 500;
                });
                
                // Remove terminal after animation
                setTimeout(() => {
                    if (terminal.parentNode) {
                        terminal.remove();
                        // Create next terminal
                        setTimeout(() => {
                            this.createTerminalWindow();
                        }, Math.random() * 5000 + 5000);
                    }
                }, 20000);
            }
            
            initDataStreams() {
                this.createDataStream();
            }
            
            createDataStream() {
                const container = document.getElementById('cyberAnimation');
                if (!container || !this.isActive) return;
                
                const stream = document.createElement('div');
                stream.className = 'data-stream';
                stream.style.top = Math.random() * 100 + '%';
                stream.style.width = '100px';
                stream.style.animationDelay = Math.random() * 2 + 's';
                
                container.appendChild(stream);
                
                setTimeout(() => {
                    if (stream.parentNode) {
                        stream.remove();
                    }
                }, 4000);
                
                // Create next stream
                setTimeout(() => {
                    this.createDataStream();
                }, Math.random() * 3000 + 2000);
            }
            
            initNodeTooltips() {
                const tooltip = document.getElementById('nodeTooltip');
                if (!tooltip) return;
                
                // Add hover listeners to nodes
                document.addEventListener('mouseover', (e) => {
                    if (e.target.classList.contains('network-node')) {
                        const node = e.target;
                        tooltip.innerHTML = `
                            <strong>IP:</strong> ${node.dataset.ip}<br>
                            <strong>OS:</strong> ${node.dataset.os}<br>
                            <strong>Status:</strong> ${node.dataset.status}<br>
                            <strong>Type:</strong> ${node.dataset.nodeType.toUpperCase()}
                        `;
                        tooltip.style.left = e.pageX + 10 + 'px';
                        tooltip.style.top = e.pageY - 50 + 'px';
                        tooltip.classList.add('visible');
                    }
                });
                
                document.addEventListener('mouseout', (e) => {
                    if (e.target.classList.contains('network-node')) {
                        tooltip.classList.remove('visible');
                    }
                });
            }
            
            startAnimationLoop() {
                // Continuously create new crypto symbols
                setInterval(() => {
                    if (this.isActive) {
                        const cryptoContainer = document.getElementById('cryptoLayer');
                        if (cryptoContainer && cryptoContainer.children.length < 5) {
                            this.createCryptoSymbols(cryptoContainer);
                        }
                    }
                }, 3000);
                
                // Update network node animations
                setInterval(() => {
                    if (this.isActive) {
                        this.nodes.forEach(node => {
                            if (Math.random() < 0.1) {
                                node.element.style.animationDuration = (Math.random() * 2 + 1) + 's';
                            }
                        });
                    }
                }, 5000);
            }
            
            destroy() {
                this.isActive = false;
                const container = document.getElementById('cyberAnimation');
                if (container) {
                    container.innerHTML = '';
                }
            }
        }
        
        let cyberAnimation;

        function initTypingAnimation() {
            const typingElement = document.querySelector('.typing-animation');
            if (!typingElement) return;
            
            function startTypingCycle() {
                // Reset
                typingElement.classList.remove('typing-active', 'erasing-active');
                typingElement.style.width = '0';
                
                // Start typing
                setTimeout(() => {
                    typingElement.classList.add('typing-active');
                }, 500);
                
                // Start erasing after typing completes + pause
                setTimeout(() => {
                    typingElement.classList.remove('typing-active');
                    typingElement.classList.add('erasing-active');
                }, 7500); // 6s typing + 1.5s pause
                
                // Start next cycle after erasing completes + pause
                setTimeout(() => {
                    typingElement.classList.remove('erasing-active');
                    startTypingCycle(); // Restart the cycle
                }, 11500); // Previous 7.5s + 3s erasing + 1s pause
            }
            
            // Start the first cycle after page loads
            setTimeout(startTypingCycle, 1000);
        }

        function initProjectInteractions() {
            const projectCards = document.querySelectorAll('.project-card');
            
            projectCards.forEach(card => {
                // Add ripple effect on click
                card.addEventListener('click', function(e) {
                    const ripple = document.createElement('div');
                    ripple.style.position = 'absolute';
                    ripple.style.borderRadius = '50%';
                    ripple.style.background = 'rgba(79, 70, 229, 0.3)';
                    ripple.style.transform = 'scale(0)';
                    ripple.style.animation = 'ripple 0.6s linear';
                    ripple.style.left = (e.clientX - card.getBoundingClientRect().left) + 'px';
                    ripple.style.top = (e.clientY - card.getBoundingClientRect().top) + 'px';
                    
                    card.style.position = 'relative';
                    card.style.overflow = 'hidden';
                    card.appendChild(ripple);
                    
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                });
            });
        }

        // Add ripple animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // --- Smooth Section Transitions ---
        function enhanceNavigation() {
            const navLinks = document.querySelectorAll('.nav-link');
            
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    const loader = document.createElement('div');
                    loader.style.position = 'fixed';
                    loader.style.top = '0';
                    loader.style.left = '0';
                    loader.style.width = '100%';
                    loader.style.height = '3px';
                    loader.style.background = 'linear-gradient(90deg, #4f46e5, #7c3aed)';
                    loader.style.transform = 'translateX(-100%)';
                    loader.style.transition = 'transform 0.3s ease';
                    loader.style.zIndex = '9999';
                    
                    document.body.appendChild(loader);
                    
                    setTimeout(() => {
                        loader.style.transform = 'translateX(0)';
                    }, 10);
                    
                    setTimeout(() => {
                        loader.style.transform = 'translateX(100%)';
                        setTimeout(() => loader.remove(), 300);
                    }, 400);
                });
            });
        }

        // --- Performance Optimizations ---
        function initLazyLoading() {
            const images = document.querySelectorAll('img[loading="lazy"]');
            
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            if (img.dataset.src) {
                                img.src = img.dataset.src;
                                img.removeAttribute('data-src');
                            }
                            imageObserver.unobserve(img);
                        }
                    });
                });
                
                images.forEach(img => imageObserver.observe(img));
            }
        }

        // --- Preload Critical Resources ---
        function preloadCriticalResources() {
            // Preload fonts
            const fontLinks = [
                'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
            ];
            
            fontLinks.forEach(href => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.href = href;
                link.as = 'style';
                link.onload = function() { this.rel = 'stylesheet'; };
                document.head.appendChild(link);
            });
        }

        document.addEventListener('DOMContentLoaded', function() {
            cyberAnimation = new CyberSecurityAnimation();
            cyberAnimation.init();
            
            createParticles();
            initTypingAnimation();
            initProjectInteractions();
            enhanceNavigation();
            initLazyLoading();
            
            setTimeout(() => {
                lucide.createIcons();
            }, 100);
        });

        window.addEventListener('load', function() {
            preloadCriticalResources();
            
            const remainingElements = document.querySelectorAll('.fade-in:not(.visible)');
            remainingElements.forEach((el, index) => {
                setTimeout(() => {
                    if (el.getBoundingClientRect().top < window.innerHeight) {
                        el.classList.add('visible');
                    }
                }, index * 100);
            });
        });

        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');
        const mobileNavLinks = document.querySelectorAll('#mobile-menu a');

        function navigate(event, pageId) {
            if(event) event.preventDefault();
            
            sections.forEach(section => {
                section.classList.remove('active');
            });

            const targetSection = document.getElementById(pageId);
            if (targetSection) {
                targetSection.classList.add('active');
            }

            const allLinks = [...navLinks, ...mobileNavLinks];
            allLinks.forEach(link => {
                link.classList.remove('active');
                 if (link.getAttribute('href') === `#${pageId}`) {
                    link.classList.add('active');
                }
            });
            
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenu.classList.add('hidden');
            
            const testimonialsSection = document.querySelector('.testimonials-section');
            if (testimonialsSection) {
                if (pageId === 'home') {
                    testimonialsSection.style.display = 'block';
                } else {
                    testimonialsSection.style.display = 'none';
                }
            }
            
            if (window.location.hash !== `#${pageId}`) {
                window.location.hash = pageId;
            }

            window.scrollTo(0, 0);
        }
        
        window.addEventListener('load', () => {
            const hash = window.location.hash.substring(1);
            if (hash) {
                navigate(null, hash);
            } else {
                navigate(null, 'home');
            }
        });
        
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.substring(1);
            if(hash) {
                navigate(null, hash);
            }
        });

        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        const contactForm = document.getElementById('contact-form');
        const formSubmissionMessage = document.getElementById('form-submission-message');
        
        // Rate limiting for form submissions
        let lastSubmission = 0;
        const RATE_LIMIT = 60000; // 1 minute
        let submissionCount = 0;
        const MAX_SUBMISSIONS_PER_HOUR = 5;

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const now = Date.now();
            
            // Rate limiting check
            if (now - lastSubmission < RATE_LIMIT) {
                alert('Please wait before submitting again. (Rate limit: 1 minute)');
                return;
            }
            
            // Hourly submission limit
            const hourlyKey = 'submissions_' + Math.floor(now / 3600000);
            let hourlyCount = parseInt(localStorage.getItem(hourlyKey) || '0');
            if (hourlyCount >= MAX_SUBMISSIONS_PER_HOUR) {
                alert('Too many submissions. Please wait an hour before trying again.');
                return;
            }
            
            // Input validation and sanitization
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            const name = window.sanitizeInput(nameInput.value.trim());
            const email = window.sanitizeInput(emailInput.value.trim());
            const message = window.sanitizeInput(messageInput.value.trim());
            
            // Validation checks
            if (name.length < 2 || name.length > 100) {
                alert('Name must be between 2 and 100 characters.');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            if (message.length < 10 || message.length > 1000) {
                alert('Message must be between 10 and 1000 characters.');
                return;
            }
            
            // Check for suspicious content
            const suspiciousPatterns = [
                /<script/i, /javascript:/i, /data:/i, /vbscript:/i,
                /onclick/i, /onerror/i, /onload/i
            ];
            
            const allContent = name + email + message;
            for (let pattern of suspiciousPatterns) {
                if (pattern.test(allContent)) {
                    alert('Invalid content detected. Please check your input.');
                    return;
                }
            }
            
            // Update rate limiting
            lastSubmission = now;
            localStorage.setItem(hourlyKey, (hourlyCount + 1).toString());
            
            // Clear old hourly counters
            for (let i = localStorage.length - 1; i >= 0; i--) {
                const key = localStorage.key(i);
                if (key && key.startsWith('submissions_')) {
                    const timestamp = parseInt(key.split('_')[1]);
                    if (now - (timestamp * 3600000) > 86400000) { // 24 hours
                        localStorage.removeItem(key);
                    }
                }
            }
            
            // Update form with sanitized values
            nameInput.value = name;
            emailInput.value = email;
            messageInput.value = message;
            
            if (formSubmissionMessage) {
                formSubmissionMessage.classList.remove('hidden');
            }
            
            contactForm.reset();

            setTimeout(() => {
                if (formSubmissionMessage) {
                    formSubmissionMessage.classList.add('hidden');
                }
            }, 5000);
        });

        // --- Dark Mode Toggle ---
        const themeToggle = document.getElementById('theme-toggle');
        const htmlElement = document.documentElement;
        
        // Check for saved theme or default to light mode
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            htmlElement.classList.add('dark');
        }
        
        themeToggle.addEventListener('click', () => {
            if (htmlElement.classList.contains('dark')) {
                htmlElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            } else {
                htmlElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            }
        });

        // --- Project Filtering ---
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                
                // Update active button
                filterBtns.forEach(b => {
                    b.classList.remove('active', 'bg-indigo-600', 'text-white');
                    b.classList.add('bg-gray-200', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-gray-300');
                });
                btn.classList.add('active', 'bg-indigo-600', 'text-white');
                btn.classList.remove('bg-gray-200', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-gray-300');
                
                // Filter projects
                projectCards.forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.5s ease-in-out';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
        
        // --- Blog Filtering and Load More Functionality ---
        const blogFilterBtns = document.querySelectorAll('.blog-filter-btn');
        const blogCards = document.querySelectorAll('.blog-card');
        const loadMoreBtn = document.getElementById('load-more-blogs');
        const showLessBtn = document.getElementById('show-less-blogs');
        const hiddenBlogPosts = document.querySelectorAll('.blog-post-hidden');
        
        let showingMore = false;
        
        // Blog filtering functionality
        blogFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                
                // Update active button
                blogFilterBtns.forEach(b => {
                    b.classList.remove('active', 'bg-indigo-600', 'text-white');
                    b.classList.add('bg-gray-200', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-gray-300');
                });
                btn.classList.add('active', 'bg-indigo-600', 'text-white');
                btn.classList.remove('bg-gray-200', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-gray-300');
                
                // Filter blog posts
                blogCards.forEach(card => {
                    const shouldShow = filter === 'all' || card.dataset.category === filter;
                    const isHidden = card.classList.contains('blog-post-hidden');
                    
                    if (shouldShow) {
                        // Show if it's a visible post, or if showing more and it's a hidden post
                        if (!isHidden || showingMore) {
                            card.style.display = 'block';
                            card.style.animation = 'fadeIn 0.5s ease-in-out';
                        }
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
        
        // Load More functionality
        loadMoreBtn.addEventListener('click', () => {
            showingMore = true;
            
            // Get current active filter
            const activeFilter = document.querySelector('.blog-filter-btn.active').dataset.filter;
            
            // Show hidden posts that match the current filter
            hiddenBlogPosts.forEach(card => {
                if (activeFilter === 'all' || card.dataset.category === activeFilter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-in-out';
                }
            });
            
            // Toggle button visibility
            loadMoreBtn.style.display = 'none';
            showLessBtn.style.display = 'inline-block';
        });
        
        // Show Less functionality
        showLessBtn.addEventListener('click', () => {
            showingMore = false;
            
            // Hide additional posts
            hiddenBlogPosts.forEach(card => {
                card.style.display = 'none';
            });
            
            // Toggle button visibility
            loadMoreBtn.style.display = 'inline-block';
            showLessBtn.style.display = 'none';
            
            // Scroll back to blog section
            document.getElementById('blog').scrollIntoView({ behavior: 'smooth' });
        });

        // --- Blog Search Functionality ---
        const blogSearchInput = document.getElementById('blog-search');
        const clearSearchBtn = document.getElementById('clear-search');
        const noResultsMessage = document.getElementById('no-results-message');
        const loadMoreContainer = document.querySelector('.text-center.mt-12');
        const clearAllFiltersBtn = document.getElementById('clear-all-filters');
        
        function filterBlogsBySearch(searchTerm) {
            const activeFilter = document.querySelector('.blog-filter-btn.active').dataset.filter;
            let visibleCount = 0;
            
            blogCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const excerpt = card.querySelector('p').textContent.toLowerCase();
                const tags = Array.from(card.querySelectorAll('.bg-gray-100')).map(tag => tag.textContent.toLowerCase());
                const category = card.dataset.category;
                
                const matchesSearch = searchTerm === '' || 
                    title.includes(searchTerm) || 
                    excerpt.includes(searchTerm) ||
                    tags.some(tag => tag.includes(searchTerm));
                
                const matchesFilter = activeFilter === 'all' || category === activeFilter;
                const isHidden = card.classList.contains('blog-post-hidden');
                
                if (matchesSearch && matchesFilter) {
                    // Show if it's a visible post, or if showing more and it's a hidden post
                    if (!isHidden || showingMore) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.5s ease-in-out';
                        visibleCount++;
                    }
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show/hide no results message
            if (visibleCount === 0) {
                noResultsMessage.style.display = 'block';
                loadMoreContainer.style.display = 'none';
            } else {
                noResultsMessage.style.display = 'none';
                loadMoreContainer.style.display = 'block';
            }
            
            // Show/hide clear button
            clearSearchBtn.style.display = searchTerm ? 'flex' : 'none';
        }
        
        blogSearchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            filterBlogsBySearch(searchTerm);
        });
        
        clearSearchBtn.addEventListener('click', () => {
            blogSearchInput.value = '';
            filterBlogsBySearch('');
            blogSearchInput.focus();
        });
        
        // Clear all filters functionality
        clearAllFiltersBtn.addEventListener('click', () => {
            // Clear search
            blogSearchInput.value = '';
            
            // Reset to "All Posts" filter
            blogFilterBtns.forEach(b => {
                b.classList.remove('active', 'bg-indigo-600', 'text-white');
                b.classList.add('bg-gray-200', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-gray-300');
            });
            const allPostsBtn = document.querySelector('[data-filter="all"]');
            allPostsBtn.classList.add('active', 'bg-indigo-600', 'text-white');
            allPostsBtn.classList.remove('bg-gray-200', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-gray-300');
            
            // Show all visible posts
            blogCards.forEach(card => {
                const isHidden = card.classList.contains('blog-post-hidden');
                if (!isHidden || showingMore) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-in-out';
                }
            });
            
            // Hide no results message
            noResultsMessage.style.display = 'none';
            loadMoreContainer.style.display = 'block';
        });
        
        // Update search when filter changes
        const originalFilterLogic = blogFilterBtns.forEach;
        blogFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Small delay to ensure filter is applied first
                setTimeout(() => {
                    const searchTerm = blogSearchInput.value.toLowerCase().trim();
                    if (searchTerm) {
                        filterBlogsBySearch(searchTerm);
                    }
                }, 50);
            });
        });
        
        // --- Enhanced Keyboard Navigation ---
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
        
        // --- Service Worker Registration ---
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                    })
                    .catch(registrationError => {
                    });
            });
        }

