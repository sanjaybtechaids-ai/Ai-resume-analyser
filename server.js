function analyzeResume() {
            const fileInput = document.getElementById('resumeUpload');
            const output = document.getElementById('output');
            output.innerHTML = '';
     if (fileInput.files.length === 0) {
           output.textContent = 'Please upload a resume file.';
                return;
            }
const file = fileInput.files[0];
    const reader = new FileReader();
     reader.onload = function(e) {
        const text = e.target.result.toLowerCase();
        const results = analyzeText(text);
                displayResults(results);
            };

    reader.onerror = function() {
    output.textContent = 'Error reading file. Please use a text file for demo analysis.';
            };
    reader.readAsText(file);
        }

    function clearResume() {
     const fileInput = document.getElementById('resumeUpload');
     const output = document.getElementById('output');
            fileInput.value = '';
            output.innerHTML = '';
        }

        function analyzeText(text) {
            const experienceMatch = text.match(/(\d+)\s+years?/);
            const experience = experienceMatch ? Number(experienceMatch[1]) : 0;

            const skills = [];
            if (/\b(java(script)?|react|node|angular|vue|typescript)\b/.test(text)) skills.push('Frontend / Full-stack');
            if (/\b(python|data science|machine learning|ai|ml|deep learning|tensorflow|pytorch)\b/.test(text)) skills.push('Data & AI');
            if (/\b(sql|mysql|postgres|database|nosql|mongodb)\b/.test(text)) skills.push('Data Engineering');
            if (/\b(c\+\+|c#|dotnet|java|spring|kotlin|swift|flutter)\b/.test(text)) skills.push('Software Engineering');
            if (/\b(project management|scrum|agile|leadership|team lead|manager)\b/.test(text)) skills.push('Management / PM');

            const eligibleCompanies = [];
            if (skills.includes('Frontend / Full-stack')) {
                eligibleCompanies.push({company: 'TechBridge', salary: '₹7L - ₹12L PA'});
                if (experience >= 3) eligibleCompanies.push({company: 'CloudWave', salary: '₹10L - ₹15L PA'});
            }
            if (skills.includes('Data & AI')) {
                eligibleCompanies.push({company: 'NeuroLabs', salary: '₹8L - ₹14L PA'});
                if (experience >= 4) eligibleCompanies.push({company: 'InsightWorks', salary: '₹12L - ₹18L PA'});
            }
            if (skills.includes('Data Engineering')) {
                eligibleCompanies.push({company: 'PipelinePro', salary: '₹6L - ₹11L PA'});
            }
            if (skills.includes('Management / PM')) {
                eligibleCompanies.push({company: 'Orbit Solutions', salary: '₹9L - ₹16L PA'});
            }
            if (eligibleCompanies.length === 0) {
                eligibleCompanies.push({company: 'Entry-level roles', salary: '₹3L - ₹6L PA'});
            }

            const improvements = [];
            if (!/\b(achieved|completed|delivered|improved|reduced|increased)\b/.test(text)) {
                improvements.push('Use action words and quantify achievements (e.g. improved sales by 20%).');
            }
            if (!/\b(management|leadership|team|mentor|owned)\b/.test(text)) {
                improvements.push('Highlight any leadership, team collaboration, or ownership experiences.');
            }
            if (!/\b(java(script)?|python|sql|machine learning|aws|azure|docker|kubernetes)\b/.test(text)) {
                improvements.push('Add the technical tools, languages, or platforms you have used.');
            }
            if (experience === 0) {
                improvements.push('Include internships, projects, or certifications to show relevant experience.');
            }
            if (text.length < 300) {
                improvements.push('Expand your resume with more details about each role and measurable results.');
            }
            if (improvements.length === 0) {
                improvements.push('Your resume looks strong. Keep tailoring it for each job application.');
            }

            const quotes = [
                'Believe in yourself and all that you are capable of.',
                'Success is not final, failure is not fatal; it is the courage to continue that counts.',
                'Your career is your business; invest in yourself.'];
            const quote = quotes[Math.floor(Math.random() * quotes.length)];

            return {
                experience,
                skills: skills.length > 0 ? skills : ['General professional skills'],
                companies: eligibleCompanies,
                improvements,
                quote,
            };
        }

        function displayResults(results) {
            const quote = ["Mudiyadhu nu sonnavanga niraya peru; mudichu kaatturavan oruthan pothum.","Thammathundu anchor dhaan... avlo periya kappalaiyum nikka vaikkudhu.","Size mukkiyam illa, skill dhaan mukkiyam.","Unnai nee nambinaal, ulagame unnai nambum."];
            const ran = Math.floor(Math.random() * quote.length);

            const output = document.getElementById('output');
            output.innerHTML = '';

            const summary = document.createElement('div');
            summary.innerHTML = '<strong>Eligibility Summary</strong>' +
                '<p>Detected skills: ' + results.skills.join(', ') + '.</p>' +
                '<p>Estimated experience: ' + (results.experience > 0 ? results.experience + ' years' : 'Not specified') + '.</p>';

            const companyList = results.companies.map(item => '<li>' + item.company + ' — ' + item.salary + '</li>').join('');
            const companiesHtml = '<strong>Company eligibility and salary range</strong><ul>' + companyList + '</ul>';

            const improvementList = results.improvements.map(item => '<li>' + item + '</li>').join('');
            const improvementsHtml = '<strong>Improvements needed</strong><ul>' + improvementList + '</ul>';

            const quoteHtml = '<strong>Motivational quote</strong><p>"' + quote[ran] + '"</p>';

            output.appendChild(summary);
            output.innerHTML += companiesHtml + improvementsHtml + quoteHtml;
        }