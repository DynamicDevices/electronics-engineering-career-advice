// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Pathway tabs functionality
    const pathwayTabs = document.querySelectorAll('.pathway-tab');
    const pathwayPanels = document.querySelectorAll('.pathway-panel');

    pathwayTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetPathway = this.getAttribute('data-pathway');
            
            // Remove active class from all tabs and panels
            pathwayTabs.forEach(t => t.classList.remove('active'));
            pathwayPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            this.classList.add('active');
            const targetPanel = document.getElementById(targetPathway);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // Modal functionality
    const modal = document.getElementById('tool-modal');
    const closeBtn = document.querySelector('.close');
    const toolContent = document.getElementById('tool-content');

    // Close modal when clicking the X
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Tool content templates
    const toolTemplates = {
        'priority-assessment': `
            <h2>Family Priority Assessment</h2>
            <p>Each family member should rank these factors 1-5 (1=most important, 5=least important), then discuss differences.</p>
            
            <div class="assessment-form">
                <div class="priority-item">
                    <label>Financial security</label>
                    <div class="ranking-inputs">
                        <input type="number" min="1" max="5" placeholder="Son" class="ranking-input">
                        <input type="number" min="1" max="5" placeholder="Parent 1" class="ranking-input">
                        <input type="number" min="1" max="5" placeholder="Parent 2" class="ranking-input">
                    </div>
                </div>
                
                <div class="priority-item">
                    <label>Academic achievement</label>
                    <div class="ranking-inputs">
                        <input type="number" min="1" max="5" placeholder="Son" class="ranking-input">
                        <input type="number" min="1" max="5" placeholder="Parent 1" class="ranking-input">
                        <input type="number" min="1" max="5" placeholder="Parent 2" class="ranking-input">
                    </div>
                </div>
                
                <div class="priority-item">
                    <label>Early independence</label>
                    <div class="ranking-inputs">
                        <input type="number" min="1" max="5" placeholder="Son" class="ranking-input">
                        <input type="number" min="1" max="5" placeholder="Parent 1" class="ranking-input">
                        <input type="number" min="1" max="5" placeholder="Parent 2" class="ranking-input">
                    </div>
                </div>
                
                <div class="priority-item">
                    <label>Entrepreneurial opportunity</label>
                    <div class="ranking-inputs">
                        <input type="number" min="1" max="5" placeholder="Son" class="ranking-input">
                        <input type="number" min="1" max="5" placeholder="Parent 1" class="ranking-input">
                        <input type="number" min="1" max="5" placeholder="Parent 2" class="ranking-input">
                    </div>
                </div>
                
                <div class="priority-item">
                    <label>Staying local to Liverpool</label>
                    <div class="ranking-inputs">
                        <input type="number" min="1" max="5" placeholder="Son" class="ranking-input">
                        <input type="number" min="1" max="5" placeholder="Parent 1" class="ranking-input">
                        <input type="number" min="1" max="5" placeholder="Parent 2" class="ranking-input">
                    </div>
                </div>
                
                <div class="priority-item">
                    <label>Prestige/recognition</label>
                    <div class="ranking-inputs">
                        <input type="number" min="1" max="5" placeholder="Son" class="ranking-input">
                        <input type="number" min="1" max="5" placeholder="Parent 1" class="ranking-input">
                        <input type="number" min="1" max="5" placeholder="Parent 2" class="ranking-input">
                    </div>
                </div>
                
                <div class="priority-item">
                    <label>Work-life balance</label>
                    <div class="ranking-inputs">
                        <input type="number" min="1" max="5" placeholder="Son" class="ranking-input">
                        <input type="number" min="1" max="5" placeholder="Parent 1" class="ranking-input">
                        <input type="number" min="1" max="5" placeholder="Parent 2" class="ranking-input">
                    </div>
                </div>
            </div>
            
            <div class="assessment-actions">
                <button class="btn btn-primary" onclick="calculatePriorities()">Calculate Results</button>
                <button class="btn btn-outline" onclick="resetAssessment()">Reset</button>
            </div>
        `,
        
        'budget-planning': `
            <h2>Budget Planning</h2>
            <p>Calculate your family's financial capacity for different pathways.</p>
            
            <div class="budget-form">
                <div class="budget-item">
                    <label>Available education budget over next 5 years (£)</label>
                    <input type="number" id="education-budget" placeholder="e.g., 30000">
                </div>
                
                <div class="budget-item">
                    <label>Monthly support capacity (£)</label>
                    <input type="number" id="monthly-support" placeholder="e.g., 500">
                </div>
                
                <div class="budget-item">
                    <label>Emergency fund (£)</label>
                    <input type="number" id="emergency-fund" placeholder="e.g., 5000">
                </div>
                
                <div class="budget-item">
                    <label>Willing to support relocation?</label>
                    <select id="relocation-support">
                        <option value="">Select...</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                        <option value="depends">Depends on location</option>
                    </select>
                </div>
            </div>
            
            <div class="budget-results" id="budget-results" style="display: none;">
                <h3>Budget Analysis</h3>
                <div id="budget-analysis"></div>
            </div>
            
            <div class="budget-actions">
                <button class="btn btn-primary" onclick="calculateBudget()">Calculate Budget</button>
                <button class="btn btn-outline" onclick="resetBudget()">Reset</button>
            </div>
        `,
        
        'decision-matrix': `
            <h2>Decision Matrix</h2>
            <p>Compare pathways based on your family's priorities.</p>
            
            <div class="matrix-form">
                <div class="matrix-factors">
                    <h3>Rate importance of each factor (1-5)</h3>
                    <div class="factor-item">
                        <label>Financial Security</label>
                        <input type="number" min="1" max="5" class="factor-weight" data-factor="financial">
                    </div>
                    <div class="factor-item">
                        <label>Earning Potential</label>
                        <input type="number" min="1" max="5" class="factor-weight" data-factor="earning">
                    </div>
                    <div class="factor-item">
                        <label>Technical Depth</label>
                        <input type="number" min="1" max="5" class="factor-weight" data-factor="technical">
                    </div>
                    <div class="factor-item">
                        <label>Business Skills</label>
                        <input type="number" min="1" max="5" class="factor-weight" data-factor="business">
                    </div>
                    <div class="factor-item">
                        <label>Industry Connections</label>
                        <input type="number" min="1" max="5" class="factor-weight" data-factor="connections">
                    </div>
                    <div class="factor-item">
                        <label>Flexibility</label>
                        <input type="number" min="1" max="5" class="factor-weight" data-factor="flexibility">
                    </div>
                </div>
            </div>
            
            <div class="matrix-results" id="matrix-results" style="display: none;">
                <h3>Decision Matrix Results</h3>
                <div id="matrix-analysis"></div>
            </div>
            
            <div class="matrix-actions">
                <button class="btn btn-primary" onclick="calculateMatrix()">Calculate Matrix</button>
                <button class="btn btn-outline" onclick="resetMatrix()">Reset</button>
            </div>
        `,
        
        'timeline-planner': `
            <h2>Timeline Planner</h2>
            <p>Create a specific action plan with deadlines for your chosen pathway.</p>
            
            <div class="timeline-form">
                <div class="timeline-item-form">
                    <label>Action</label>
                    <input type="text" placeholder="e.g., Apply to degree apprenticeships" class="timeline-action">
                </div>
                
                <div class="timeline-item-form">
                    <label>Deadline</label>
                    <input type="date" class="timeline-deadline">
                </div>
                
                <div class="timeline-item-form">
                    <label>Priority</label>
                    <select class="timeline-priority">
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>
                
                <button class="btn btn-secondary" onclick="addTimelineItem()">Add Item</button>
            </div>
            
            <div class="timeline-display" id="timeline-display">
                <h3>Your Timeline</h3>
                <div id="timeline-items"></div>
            </div>
            
            <div class="timeline-actions">
                <button class="btn btn-primary" onclick="saveTimeline()">Save Timeline</button>
                <button class="btn btn-outline" onclick="resetTimeline()">Reset</button>
            </div>
        `
    };

    // Global function to open tools
    window.openTool = function(toolType) {
        if (toolTemplates[toolType]) {
            toolContent.innerHTML = toolTemplates[toolType];
            modal.style.display = 'block';
        }
    };

    // Add CSS for tool forms
    const style = document.createElement('style');
    style.textContent = `
        .assessment-form, .budget-form, .matrix-form, .timeline-form {
            margin: 20px 0;
        }
        
        .priority-item, .budget-item, .factor-item, .timeline-item-form {
            margin-bottom: 20px;
        }
        
        .priority-item label, .budget-item label, .factor-item label, .timeline-item-form label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: var(--text-primary);
        }
        
        .ranking-inputs {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
        }
        
        .ranking-input, .budget-item input, .factor-weight, .timeline-action, .timeline-deadline, .timeline-priority {
            width: 100%;
            padding: 10px;
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius);
            font-size: 1rem;
        }
        
        .assessment-actions, .budget-actions, .matrix-actions, .timeline-actions {
            margin-top: 30px;
            display: flex;
            gap: 15px;
            justify-content: center;
        }
        
        .budget-results, .matrix-results {
            margin-top: 30px;
            padding: 20px;
            background: var(--bg-secondary);
            border-radius: var(--border-radius);
        }
        
        .timeline-display {
            margin-top: 30px;
        }
        
        .timeline-item-display {
            background: var(--bg-secondary);
            padding: 15px;
            margin-bottom: 10px;
            border-radius: var(--border-radius);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .priority-high { border-left: 4px solid var(--danger-color); }
        .priority-medium { border-left: 4px solid var(--warning-color); }
        .priority-low { border-left: 4px solid var(--success-color); }
    `;
    document.head.appendChild(style);
});

// Tool calculation functions
function calculatePriorities() {
    const inputs = document.querySelectorAll('.ranking-input');
    let results = [];
    
    inputs.forEach((input, index) => {
        if (input.value) {
            const factorIndex = Math.floor(index / 3);
            const familyMember = index % 3;
            const factorNames = ['Financial security', 'Academic achievement', 'Early independence', 
                               'Entrepreneurial opportunity', 'Staying local to Liverpool', 
                               'Prestige/recognition', 'Work-life balance'];
            
            if (!results[factorIndex]) {
                results[factorIndex] = {
                    factor: factorNames[factorIndex],
                    rankings: []
                };
            }
            
            results[factorIndex].rankings[familyMember] = parseInt(input.value);
        }
    });
    
    // Display results
    let analysis = '<h4>Priority Analysis</h4><ul>';
    results.forEach(result => {
        if (result.rankings.length > 0) {
            const avg = result.rankings.reduce((a, b) => a + b, 0) / result.rankings.length;
            const variance = Math.max(...result.rankings) - Math.min(...result.rankings);
            
            analysis += `<li><strong>${result.factor}</strong>: Average ${avg.toFixed(1)}`;
            if (variance > 0) {
                analysis += ` (Family variance: ${variance})`;
            }
            analysis += '</li>';
        }
    });
    analysis += '</ul>';
    
    const resultsDiv = document.createElement('div');
    resultsDiv.innerHTML = analysis;
    document.querySelector('.assessment-actions').before(resultsDiv);
}

function calculateBudget() {
    const educationBudget = parseFloat(document.getElementById('education-budget').value) || 0;
    const monthlySupport = parseFloat(document.getElementById('monthly-support').value) || 0;
    const emergencyFund = parseFloat(document.getElementById('emergency-fund').value) || 0;
    const relocationSupport = document.getElementById('relocation-support').value;
    
    const totalBudget = educationBudget + (monthlySupport * 60) + emergencyFund;
    
    let analysis = `
        <h4>Budget Analysis</h4>
        <p><strong>Total Available Budget:</strong> £${totalBudget.toLocaleString()}</p>
        <p><strong>Relocation Support:</strong> ${relocationSupport}</p>
        
        <h5>Pathway Affordability:</h5>
        <ul>
            <li><strong>University Route:</strong> ${totalBudget >= 60000 ? '✅ Affordable' : '❌ Insufficient funds'}</li>
            <li><strong>Entrepreneurial Focus:</strong> ${totalBudget >= 15000 ? '✅ Affordable' : '❌ Insufficient funds'}</li>
            <li><strong>Degree Apprenticeship:</strong> ✅ Always affordable (earn while learning)</li>
            <li><strong>Liverpool UTC:</strong> ✅ Always affordable (minimal cost)</li>
            <li><strong>Traditional Apprenticeship:</strong> ✅ Always affordable (earn while learning)</li>
        </ul>
    `;
    
    document.getElementById('budget-analysis').innerHTML = analysis;
    document.getElementById('budget-results').style.display = 'block';
}

function calculateMatrix() {
    const weights = {};
    document.querySelectorAll('.factor-weight').forEach(input => {
        const factor = input.getAttribute('data-factor');
        weights[factor] = parseInt(input.value) || 0;
    });
    
    // Pathway scores (example data)
    const pathways = {
        'Degree Apprenticeship': { financial: 9, earning: 8, technical: 8, business: 7, connections: 10, flexibility: 4 },
        'University Route': { financial: 6, earning: 8, technical: 10, business: 4, connections: 6, flexibility: 8 },
        'Entrepreneurial Focus': { financial: 4, earning: 10, technical: 6, business: 10, connections: 5, flexibility: 10 },
        'Liverpool UTC': { financial: 7, earning: 6, technical: 7, business: 8, connections: 9, flexibility: 6 },
        'Traditional Apprenticeship': { financial: 8, earning: 6, technical: 5, business: 6, connections: 8, flexibility: 5 }
    };
    
    let results = [];
    Object.keys(pathways).forEach(pathway => {
        let score = 0;
        Object.keys(weights).forEach(factor => {
            score += weights[factor] * pathways[pathway][factor];
        });
        results.push({ pathway, score });
    });
    
    results.sort((a, b) => b.score - a.score);
    
    let analysis = '<h4>Matrix Results</h4><ol>';
    results.forEach(result => {
        analysis += `<li><strong>${result.pathway}</strong>: ${result.score} points</li>`;
    });
    analysis += '</ol>';
    
    document.getElementById('matrix-analysis').innerHTML = analysis;
    document.getElementById('matrix-results').style.display = 'block';
}

// Timeline functions
let timelineItems = [];

function addTimelineItem() {
    const action = document.querySelector('.timeline-action').value;
    const deadline = document.querySelector('.timeline-deadline').value;
    const priority = document.querySelector('.timeline-priority').value;
    
    if (action && deadline) {
        timelineItems.push({ action, deadline, priority });
        displayTimeline();
        
        // Clear inputs
        document.querySelector('.timeline-action').value = '';
        document.querySelector('.timeline-deadline').value = '';
        document.querySelector('.timeline-priority').value = 'high';
    }
}

function displayTimeline() {
    const container = document.getElementById('timeline-items');
    container.innerHTML = '';
    
    timelineItems.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = `timeline-item-display priority-${item.priority}`;
        itemDiv.innerHTML = `
            <div>
                <strong>${item.action}</strong><br>
                <small>Deadline: ${item.deadline}</small>
            </div>
            <button onclick="removeTimelineItem(${index})" class="btn btn-outline" style="padding: 5px 10px; font-size: 0.8rem;">Remove</button>
        `;
        container.appendChild(itemDiv);
    });
}

function removeTimelineItem(index) {
    timelineItems.splice(index, 1);
    displayTimeline();
}

function saveTimeline() {
    localStorage.setItem('timeline', JSON.stringify(timelineItems));
    alert('Timeline saved!');
}

function resetTimeline() {
    timelineItems = [];
    displayTimeline();
}

// Reset functions
function resetAssessment() {
    document.querySelectorAll('.ranking-input').forEach(input => input.value = '');
    const resultsDiv = document.querySelector('.assessment-actions').previousElementSibling;
    if (resultsDiv && resultsDiv.tagName === 'DIV') {
        resultsDiv.remove();
    }
}

function resetBudget() {
    document.getElementById('education-budget').value = '';
    document.getElementById('monthly-support').value = '';
    document.getElementById('emergency-fund').value = '';
    document.getElementById('relocation-support').value = '';
    document.getElementById('budget-results').style.display = 'none';
}

function resetMatrix() {
    document.querySelectorAll('.factor-weight').forEach(input => input.value = '');
    document.getElementById('matrix-results').style.display = 'none';
}

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.pathway-card, .stat-card, .resource-card, .tool-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Initialize animations when page loads
window.addEventListener('load', animateOnScroll); 